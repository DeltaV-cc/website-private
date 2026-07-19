#!/usr/bin/env python3
"""
fetch-dune-dex-matrix.py — Build EVM DEX data from Dune Analytics API.
Outputs:
  dex-matrix.json   — Chain × Protocol cross-table (queries 8029504, 8029496)
  dex-metrics.json  — Volume charts + per-chain metrics (queries 8024914, 7950834)

Replaces DeFiLlama volume sections with Dune-powered graphs.
"""
import json, os, sys, time, urllib.request, ssl

DUNE_KEY = "HD3XiM5cX5e3JOFwi7bmWIk4t3nXaL2w"
DUNE_API = "https://api.dune.com/api/v1"
USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-Dune/2.0)"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "data")
os.makedirs(OUT_DIR, exist_ok=True)

def dune_post(path, body=None):
    url = f"{DUNE_API}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, headers={
        "X-Dune-Api-Key": DUNE_KEY, "Content-Type": "application/json", "User-Agent": USER_AGENT,
    }, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ POST {path} → {e}", file=sys.stderr)
        return None

def dune_get(path):
    req = urllib.request.Request(f"{DUNE_API}{path}", headers={"X-Dune-Api-Key": DUNE_KEY, "User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ GET {path} → {e}", file=sys.stderr)
        return None

def execute_and_fetch(query_id, label="query"):
    exec_resp = dune_post(f"/query/{query_id}/execute")
    if not exec_resp: return None
    exec_id = exec_resp.get("execution_id")
    if not exec_id: return None
    for attempt in range(15):
        time.sleep(2)
        res = dune_get(f"/execution/{exec_id}/results")
        if not res: continue
        if res.get("is_execution_finished"):
            rows = res.get("result", {}).get("rows", [])
            ms = res.get("result", {}).get("metadata", {}).get("execution_time_millis", 0)
            print(f"  {label}: {len(rows)} rows ({ms}ms)")
            return rows
        if "FAILED" in res.get("state", ""):
            print(f"  ⚠ {label}: {res['state']}", file=sys.stderr)
            return None
    print(f"  ⚠ {label}: timeout", file=sys.stderr)
    return None

# ═══════════════════════════════════════════════════════════════
# PART 1 — DEX Matrix (existing)
# ═══════════════════════════════════════════════════════════════
print("── DEX Matrix ──")
print("Fetching cross-table (8029504)...")
cross_rows = execute_and_fetch(8029504, "cross-table")
print("Fetching TVL by chain (8029496)...")
tvl_rows = execute_and_fetch(8029496, "tvl")

if cross_rows:
    proto_data = {}
    chain_set = set()
    for row in cross_rows:
        chain = row.get("chain", "?")
        protocol = row.get("protocol", "?")
        vol = row.get("volume_usd", 0) or 0
        if vol <= 0: continue
        chain_set.add(chain)
        proto_data.setdefault(protocol, {"total": 0, "chains": {}})
        proto_data[protocol]["chains"][chain] = proto_data[protocol]["chains"].get(chain, 0) + vol
        proto_data[protocol]["total"] += vol

    top_protocols = sorted(proto_data.items(), key=lambda x: -x[1]["total"])[:15]
    chain_totals = {}
    for _, data in proto_data.items():
        for chain, vol in data["chains"].items():
            chain_totals[chain] = chain_totals.get(chain, 0) + vol
    top_chains = sorted(chain_totals.items(), key=lambda x: -x[1])[:8]
    top_chain_names = [c[0] for c in top_chains]

    chain_tvl = {}
    if tvl_rows:
        for row in tvl_rows:
            chain_tvl[row.get("chain", "")] = row.get("tvl", 0)

    matrix = []
    for proto_name, data in top_protocols:
        row = {"protocol": proto_name, "total_vol": data["total"]}
        for chain in top_chain_names:
            row[chain] = data["chains"].get(chain, 0)
        matrix.append(row)

    chains_meta = [{"chain": c, "total24h": chain_totals.get(c, 0), "tvl": chain_tvl.get(c, 0)} for c in top_chain_names]

    with open(os.path.join(OUT_DIR, "dex-matrix.json"), "w") as f:
        json.dump({
            "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "source": "Dune Analytics (dex.trades — on-chain data)",
            "query_ids": {"cross_table": 8029504, "tvl_by_chain": 8029496},
            "chains": chains_meta,
            "matrix": matrix,
        }, f, indent=2)

    total_vol = sum(c["total24h"] for c in chains_meta)
    print(f"  ✓ dex-matrix.json: {len(matrix)} protocols × {len(top_chain_names)} chains (${total_vol:,.0f})")

# ═══════════════════════════════════════════════════════════════
# PART 2 — Volume Metrics (new — for charts)
# ═══════════════════════════════════════════════════════════════
print("\n── Volume Metrics ──")
print("Fetching chain volume (8024914)...")
chain_vol_rows = execute_and_fetch(8024914, "chain-volume")
print("Fetching weekly volume (7950834)...")
weekly_rows = execute_and_fetch(7950834, "weekly-volume")

chains = []
if chain_vol_rows:
    for row in chain_vol_rows:
        chains.append({
            "chain": row.get("chain", "?"),
            "volume_24h": row.get("wtd_curated", 0) or 0,
            "delta_pct": round((row.get("delta_vs_prior_same_pct", 0) or 0), 2),
        })
    chains.sort(key=lambda x: -x["volume_24h"])

weekly = []
if weekly_rows:
    for row in weekly_rows:
        weekly.append({
            "week": row.get("week", "")[:10],  # YYYY-MM-DD
            "curated": row.get("curated_vol", 0) or 0,
            "filtered": row.get("filtered_vol", 0) or 0,
            "raw": row.get("raw_vol", 0) or 0,
        })
    weekly.sort(key=lambda x: x["week"])

with open(os.path.join(OUT_DIR, "dex-metrics.json"), "w") as f:
    json.dump({
        "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "Dune Analytics (queries 8024914, 7950834)",
        "chains": chains,
        "weekly": weekly,
    }, f, indent=2)

print(f"  ✓ dex-metrics.json: {len(chains)} chains, {len(weekly)} weekly rows")

total_chain_vol = sum(c["volume_24h"] for c in chains)
print(f"\n✓ All done. Chain volume: ${total_chain_vol:,.0f}")
print(f"  Top chain: {chains[0]['chain']} (${chains[0]['volume_24h']:,.0f}, {chains[0]['delta_pct']:+.1f}%)" if chains else "  No chain data")
print(f"  Weekly range: {weekly[0]['week']} → {weekly[-1]['week']}" if weekly else "  No weekly data")
