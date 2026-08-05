#!/usr/bin/env python3
"""
refresh-dashboard-snapshots.py — Fill Macro/Web3 empty slots with reliable gh-pages JSON.

Produces / merges:
  - indices.json  (spx, csi, smi, stoxx, dax) — never drops keys on partial Yahoo fail
  - oil.json      (WTI CL=F)
  - gold.json / us10y.json (optional refresh)
  - stables.json  (DeFi Llama top stables + by-chain)
  - tvl-top.json  (top chains by TVL + 1d change when available)
  - chain-movers.json (top gainers/losers by 1d TVL %)
  - cnn-fg.json   (best-effort TradFi F&G for Macro fallback)

Designed for Hermes no_agent cron (every 15–30m) alongside refresh-data.py.
Does not use LLM tokens. Pushes to gh-pages with force-with-lease + retry.

Usage:
  python3 scripts/refresh-dashboard-snapshots.py
"""
from __future__ import annotations

import json
import os
import shutil
import ssl
import subprocess
import sys
import tempfile
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

REPO = os.environ.get("DASHBOARD_DATA_REPO", "https://github.com/DeltaV-cc/website-private.git")
BRANCH = "gh-pages"
PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public" / "data"
USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-DashboardSnap/1.0)"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

DATA_OUT = [
    "indices.json",
    "oil.json",
    "gold.json",
    "us10y.json",
    "stables.json",
    "tvl-top.json",
    "chain-movers.json",
    "cnn-fg.json",
]


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def fetch_json(url: str, timeout: int = 15):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ {url[:70]}… → {e}", file=sys.stderr)
        return None


def fetch_chart(symbol: str, range_days: str = "5d"):
    d = fetch_json(
        f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range={range_days}"
    )
    if not d:
        return None
    res = (d.get("chart", {}).get("result") or [{}])[0]
    meta = res.get("meta") or {}
    q = (res.get("indicators", {}).get("quote") or [{}])[0]
    closes = [c for c in (q.get("close") or []) if c is not None]
    now = closes[-1] if closes else meta.get("regularMarketPrice") or 0
    prev = closes[-2] if len(closes) >= 2 else meta.get("previousClose") or 0
    if not now:
        return None
    return {"now": float(now), "prev": float(prev) if prev else 0.0}


def index_row(c: dict) -> dict:
    now, prev = c["now"], c["prev"]
    return {
        "price": f"{now:.0f}",
        "change": now - prev,
        "changePct": f"{(now - prev) / prev * 100:+.2f}%" if prev else "…",
    }


def commodity_row(c: dict, decimals: int = 2) -> dict:
    now, prev = c["now"], c["prev"]
    return {
        "price": f"{now:.{decimals}f}",
        "change": now - prev,
        "changePct": f"{(now - prev) / prev * 100:+.2f}%" if prev else "…",
    }


def load_prev_from_tip(tmpdir: Path, name: str):
    p = tmpdir / "data" / name
    if not p.exists():
        return None
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return None


def merge_indices(prev: dict | None, fresh: dict) -> dict:
    """Never drop keys: keep last-good value when a symbol fails this run."""
    out = dict(prev or {})
    out.update({k: v for k, v in fresh.items() if v})
    out["updated_at"] = utc_now()
    return out


def build_indices() -> dict:
    fresh = {}
    for sym, key in [
        ("%5EGSPC", "spx"),
        ("000001.SS", "csi"),
        ("%5ESSMI", "smi"),
        ("%5ESTOXX50E", "stoxx"),
        ("%5EGDAXI", "dax"),
    ]:
        c = fetch_chart(sym, "5d")
        if c:
            fresh[key] = index_row(c)
            print(f"  ✓ index {key}={fresh[key]['price']}")
        else:
            print(f"  ⚠ index {key} failed", file=sys.stderr)
    return fresh


def build_oil() -> dict | None:
    c = fetch_chart("CL=F", "5d")
    if not c:
        return None
    row = commodity_row(c, 2)
    row["updated_at"] = utc_now()
    print(f"  ✓ oil WTI={row['price']}")
    return row


def build_gold() -> dict | None:
    c = fetch_chart("GC=F", "5d")
    if not c:
        return None
    row = commodity_row(c, 2)
    row["updated_at"] = utc_now()
    return row


def build_us10y() -> dict | None:
    c = fetch_chart("%5ETNX", "5d")
    if not c:
        return None
    now, prev = c["now"], c["prev"]
    return {
        "price": f"{now:.2f}%",
        "change": now - prev,
        "changePct": f"{(now - prev) / prev * 100:+.2f}%" if prev else "…",
        "updated_at": utc_now(),
    }


def circ_of(s: dict) -> float:
    c = s.get("circulating")
    if isinstance(c, (int, float)):
        return float(c)
    if isinstance(c, dict):
        if isinstance(c.get("peggedUSD"), (int, float)):
            return float(c["peggedUSD"])
        cur = c.get("current") or {}
        if isinstance(cur.get("peggedUSD"), (int, float)):
            return float(cur["peggedUSD"])
    if isinstance(s.get("mcap"), (int, float)):
        return float(s["mcap"])
    return 0.0


def build_stables() -> dict | None:
    d = fetch_json("https://stablecoins.llama.fi/stablecoins?includePrices=false", timeout=20)
    if not d:
        return None
    assets = d.get("peggedAssets") or []
    chain_map: dict[str, float] = {}
    for s in assets:
        for chain, data in (s.get("chainCirculating") or {}).items():
            cd = data or {}
            circ = (
                (cd.get("circulating") or {}).get("peggedUSD")
                or ((cd.get("current") or {}).get("circulating") or {}).get("peggedUSD")
                or 0
            )
            try:
                circ = float(circ or 0)
            except (TypeError, ValueError):
                circ = 0
            if circ > 0:
                chain_map[chain] = chain_map.get(chain, 0) + circ

    stables = sorted(
        [
            {
                "name": s.get("name") or s.get("symbol"),
                "symbol": s.get("symbol"),
                "circulating": circ_of(s),
            }
            for s in assets
        ],
        key=lambda x: -x["circulating"],
    )
    stables = [s for s in stables if s["circulating"] > 0][:12]
    chains = sorted(
        [{"chain": k, "circulating": v} for k, v in chain_map.items()],
        key=lambda x: -x["circulating"],
    )[:12]
    total = sum(s["circulating"] for s in stables)
    print(f"  ✓ stables n={len(stables)} total≈${total/1e9:.1f}B")
    return {
        "updated_at": utc_now(),
        "source": "https://stablecoins.llama.fi/stablecoins",
        "stablecoins": stables,
        "stablecoinChains": chains,
        "total_circulating": total,
    }


def build_tvl_and_movers() -> tuple[dict | None, dict | None]:
    chains = fetch_json("https://api.llama.fi/v2/chains", timeout=20)
    if not isinstance(chains, list):
        return None, None
    ranked = sorted(
        [c for c in chains if (c.get("tvl") or 0) > 0 and c.get("name")],
        key=lambda c: -float(c.get("tvl") or 0),
    )[:20]

    # Derive 1d change from historical when missing (cap fan-out)
    top = ranked[:12]
    rows = []
    for c in top:
        name = c["name"]
        tvl = float(c.get("tvl") or 0)
        chg = c.get("change_1d")
        if chg is None:
            hist = fetch_json(
                f"https://api.llama.fi/v2/historicalChainTvl/{urllib_quote(name)}",
                timeout=10,
            )
            if isinstance(hist, list) and len(hist) >= 2:
                prev = hist[-2].get("tvl")
                if prev:
                    try:
                        chg = (tvl - float(prev)) / float(prev) * 100
                    except (TypeError, ValueError, ZeroDivisionError):
                        chg = 0
            else:
                chg = 0
        rows.append(
            {
                "name": name,
                "tvl": tvl,
                "change_1d": float(chg or 0),
            }
        )
        time.sleep(0.15)  # be polite to Llama

    tvl_top = {
        "updated_at": utc_now(),
        "source": "https://api.llama.fi/v2/chains",
        "chains": rows,
    }
    by_chg = sorted(rows, key=lambda r: -r["change_1d"])
    movers = {
        "updated_at": utc_now(),
        "source": "defillama historicalChainTvl",
        "gainers": [r for r in by_chg if r["change_1d"] > 0][:8],
        "losers": sorted([r for r in by_chg if r["change_1d"] < 0], key=lambda r: r["change_1d"])[:8],
    }
    print(f"  ✓ tvl-top n={len(rows)} movers g={len(movers['gainers'])} l={len(movers['losers'])}")
    return tvl_top, movers


def urllib_quote(s: str) -> str:
    from urllib.parse import quote

    return quote(s, safe="")


def build_cnn_fg() -> dict | None:
    # Best-effort; often bot-blocked — still try for snapshot
    try:
        req = urllib.request.Request(
            "https://production.dataviz.cnn.io/index/fearandgreed/graphdata",
            headers={"User-Agent": "Mozilla/5.0"},
        )
        with urllib.request.urlopen(req, timeout=10, context=ctx) as r:
            cnn = json.loads(r.read().decode())
        if cnn and cnn.get("fear_and_greed"):
            latest = cnn["fear_and_greed"][-1] if isinstance(cnn["fear_and_greed"], list) else cnn["fear_and_greed"]
            if isinstance(latest, dict):
                return {
                    "value": int(latest.get("y") or latest.get("score") or 0),
                    "label": latest.get("rating") or latest.get("label") or "neutral",
                    "updated_at": utc_now(),
                }
    except Exception as e:
        print(f"  ⚠ cnn-fg: {e}", file=sys.stderr)
    return None


def push_to_gh_pages(payloads: dict[str, str]) -> None:
    tmpdir = tempfile.mkdtemp(prefix="dv-dash-snap-")
    try:
        subprocess.run(
            ["git", "clone", "--depth", "1", "--branch", BRANCH, REPO, tmpdir],
            check=True,
            capture_output=True,
            timeout=60,
        )
        # Merge indices with tip so we never drop keys
        prev_idx = load_prev_from_tip(Path(tmpdir), "indices.json")
        if "indices.json" in payloads:
            fresh = json.loads(payloads["indices.json"])
            # strip updated_at for merge of series keys
            series = {k: v for k, v in fresh.items() if k != "updated_at" and isinstance(v, dict)}
            merged = merge_indices(prev_idx if isinstance(prev_idx, dict) else None, series)
            payloads["indices.json"] = json.dumps(merged, indent=2)

        changed = []
        for name, content in payloads.items():
            if not content:
                continue
            dest = Path(tmpdir) / "data" / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            old = dest.read_text(encoding="utf-8") if dest.exists() else None
            # For indices compare without caring only about updated_at churn? include it.
            if old != content:
                dest.write_text(content, encoding="utf-8")
                changed.append(name)

        if not changed:
            print("  · no dashboard snapshot changes")
            return

        # Prefer env overrides; never hardcode personal emails in the public repo.
        git_email = os.environ.get("DASHBOARD_GIT_EMAIL", "noreply@deltav.cc")
        git_name = os.environ.get("DASHBOARD_GIT_NAME", "Delta V Bot")
        subprocess.run(["git", "-C", tmpdir, "config", "user.email", git_email], check=True)
        subprocess.run(["git", "-C", tmpdir, "config", "user.name", git_name], check=True)
        subprocess.run(
            ["git", "-C", tmpdir, "add"] + [f"data/{n}" for n in changed],
            check=True,
        )
        msg = f"data: dashboard snapshots {time.strftime('%H:%M')} ({', '.join(changed)})"
        subprocess.run(["git", "-C", tmpdir, "commit", "-m", msg], check=True)

        for attempt in range(3):
            try:
                subprocess.run(
                    ["git", "-C", tmpdir, "push", "--force-with-lease", "origin", BRANCH],
                    check=True,
                    capture_output=True,
                    timeout=45,
                )
                print(f"✓ pushed: {', '.join(changed)}")
                break
            except subprocess.CalledProcessError:
                if attempt >= 2:
                    print("  ⚠ push failed after retries", file=sys.stderr)
                    break
                subprocess.run(
                    ["git", "-C", tmpdir, "fetch", "origin", BRANCH],
                    capture_output=True,
                    timeout=20,
                )
                subprocess.run(
                    ["git", "-C", tmpdir, "reset", "--soft", f"origin/{BRANCH}"],
                    capture_output=True,
                )
                for name in changed:
                    dest = Path(tmpdir) / "data" / name
                    dest.write_text(payloads[name], encoding="utf-8")
                subprocess.run(
                    ["git", "-C", tmpdir, "add"] + [f"data/{n}" for n in changed],
                    check=True,
                )
                subprocess.run(
                    ["git", "-C", tmpdir, "commit", "-m", f"{msg} (retry {attempt+2})"],
                    capture_output=True,
                )

        # Local public/ for clone builds
        PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
        for name in changed:
            (PUBLIC_DIR / name).write_text(payloads[name], encoding="utf-8")
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


def main() -> int:
    print(f"dashboard snapshots @ {utc_now()}")
    payloads: dict[str, str] = {}

    idx = build_indices()
    if idx:
        payloads["indices.json"] = json.dumps(idx, indent=2)

    oil = build_oil()
    if oil:
        payloads["oil.json"] = json.dumps(oil, indent=2)

    gold = build_gold()
    if gold:
        payloads["gold.json"] = json.dumps(gold, indent=2)

    us10y = build_us10y()
    if us10y:
        payloads["us10y.json"] = json.dumps(us10y, indent=2)

    stables = build_stables()
    if stables:
        payloads["stables.json"] = json.dumps(stables, indent=2)

    tvl_top, movers = build_tvl_and_movers()
    if tvl_top:
        payloads["tvl-top.json"] = json.dumps(tvl_top, indent=2)
    if movers:
        payloads["chain-movers.json"] = json.dumps(movers, indent=2)

    cnn = build_cnn_fg()
    if cnn:
        payloads["cnn-fg.json"] = json.dumps(cnn, indent=2)

    if not payloads:
        print("  ⚠ nothing fetched", file=sys.stderr)
        return 1

    push_to_gh_pages(payloads)
    return 0


if __name__ == "__main__":
    sys.exit(main())
