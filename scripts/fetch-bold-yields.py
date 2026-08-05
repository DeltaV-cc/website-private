#!/usr/bin/env python3
"""
fetch-bold-yields.py — Snapshot Liquity BOLD / stable yields for IntelHub.

Source of truth for live rates is DefiLlama Yields (CORS/API free), which
tracks Liquity V2 Stability Pool APYs and BOLD LP/vault venues. The Liquity
team surfaces the same Stability Pool story on:
  https://dune.com/liquity/bold-yields
(Dune API requires a key; Hermes can swap to Dune later via DUNE_API_KEY.)

Run: python3 scripts/fetch-bold-yields.py
Output: public/data/bold-yields.json
"""
from __future__ import annotations

import json
import os
import ssl
import sys
import time
import urllib.request

USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-BOLD-Yields/1.0)"
ctx = ssl.create_default_context()
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
OUT_PATH = os.path.join(OUT_DIR, "bold-yields.json")

# Primary Liquity V2 Stability Pools (BOLD Earn) — DefiLlama pool IDs
# These match the collateral markets shown on the Dune BOLD yields board.
STABILITY_POOL_IDS = {
    "dac71f4f-7b97-463a-b19f-9796c56c21f1": "wstETH",
    "326739f2-4650-4992-a8eb-a400e7790499": "rETH",
    "a635df9a-4cfc-4d17-86d0-934ea441e79f": "WETH",
}


def fetch_json(url: str, timeout: int = 60):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        return json.loads(r.read().decode())


def is_bold_related(p: dict) -> bool:
    project = (p.get("project") or "").lower()
    symbol = (p.get("symbol") or "").upper()
    meta = (p.get("poolMeta") or "") or ""
    if project in ("liquity-v2", "liquity-v1"):
        return True
    if "BOLD" in symbol:
        return True
    if "bold" in meta.lower() and "stability" in meta.lower():
        return True
    return False


def classify(p: dict) -> str:
    project = (p.get("project") or "").lower()
    meta = (p.get("poolMeta") or "") or ""
    symbol = (p.get("symbol") or "").upper()
    if project == "liquity-v2" and "stability pool" in meta.lower():
        return "stability_pool"
    if project == "liquity-v2" and symbol == "BOLD":
        return "stability_pool"
    if "YBOLD" in symbol or symbol.startswith("YBOLD"):
        return "vault"
    if project in ("yearn-finance", "beefy", "stake-dao", "convex-finance"):
        return "vault"
    if "-" in symbol or project.endswith("dex") or "uniswap" in project or "curve" in project or "velodrome" in project:
        return "lp"
    return "other"


def collateral_label(p: dict) -> str:
    pid = p.get("pool") or ""
    if pid in STABILITY_POOL_IDS:
        return STABILITY_POOL_IDS[pid]
    meta = (p.get("poolMeta") or "") or ""
    m = meta.upper()
    for tag in ("WSTETH", "RETH", "WETH", "ETH"):
        if tag in m:
            return "WETH" if tag == "ETH" else tag
    return p.get("symbol") or "?"


def slim(p: dict) -> dict:
    return {
        "poolId": p.get("pool"),
        "project": p.get("project"),
        "symbol": p.get("symbol"),
        "chain": p.get("chain"),
        "collateral": collateral_label(p),
        "kind": classify(p),
        "apy": p.get("apy"),
        "apyBase": p.get("apyBase"),
        "apyReward": p.get("apyReward"),
        "tvlUsd": p.get("tvlUsd"),
        "meta": p.get("poolMeta"),
        "url": f"https://defillama.com/yields/pool/{p.get('pool')}" if p.get("pool") else None,
    }


def main() -> int:
    print("Fetching DefiLlama yields pools…")
    try:
        raw = fetch_json("https://yields.llama.fi/pools", timeout=90)
    except Exception as e:
        print(f"FATAL: yields.llama.fi failed: {e}", file=sys.stderr)
        return 1

    pools = raw.get("data") if isinstance(raw, dict) else raw
    if not isinstance(pools, list):
        print("FATAL: unexpected pools payload", file=sys.stderr)
        return 1

    bold = [p for p in pools if is_bold_related(p)]
    print(f"  BOLD-related pools: {len(bold)}")

    stability = []
    venues = []
    for p in bold:
        row = slim(p)
        if row["kind"] == "stability_pool" and (row.get("apy") or 0) > 0:
            stability.append(row)
        elif (row.get("tvlUsd") or 0) > 50_000 and (row.get("apy") or 0) > 0:
            venues.append(row)

    stability.sort(key=lambda r: -(r.get("tvlUsd") or 0))
    venues.sort(key=lambda r: -(r.get("tvlUsd") or 0))

    # TVL-weighted average Stability Pool APY (the "headline" Earn yield)
    sp_tvl = sum((r.get("tvlUsd") or 0) for r in stability)
    weighted_apy = None
    if sp_tvl > 0:
        weighted_apy = sum((r.get("apy") or 0) * (r.get("tvlUsd") or 0) for r in stability) / sp_tvl

    out = {
        "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "DefiLlama Yields (Liquity V2 BOLD)",
        "dune_dashboard": "https://dune.com/liquity/bold-yields",
        "docs": "https://docs.liquity.org/v2-faq/bold-and-earn",
        "headline": {
            "weighted_stability_apy": weighted_apy,
            "stability_tvl_usd": sp_tvl,
            "pool_count": len(stability),
        },
        "stability_pools": stability[:8],
        "venues": venues[:12],
        "notes": (
            "Stability pools = Liquity V2 Earn (BOLD deposited against WETH/wstETH/rETH). "
            "Venues = external BOLD LP/vault yields. Dune board is the Liquity team view; "
            "DefiLlama supplies free live APY/TVL for the site snapshot."
        ),
    }

    os.makedirs(OUT_DIR, exist_ok=True)
    payload = json.dumps(out, indent=2) + "\n"
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(payload)

    print(f"✓ bold-yields.json — SP weighted APY {weighted_apy:.2f}% · TVL ${sp_tvl:,.0f}" if weighted_apy is not None else "✓ bold-yields.json")
    print(f"  stability={len(stability)} venues={len(venues)}")

    # Push SSOT for IntelHub (Pages), not only local public/
    try:
        sys.path.insert(0, os.path.dirname(__file__))
        from _gh_pages_push import push_data_files  # type: ignore

        push_data_files({"bold-yields.json": payload}, commit_prefix="data: bold-yields")
    except Exception as e:
        print(f"  ⚠ gh-pages push skipped: {e}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
