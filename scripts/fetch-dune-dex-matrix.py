#!/usr/bin/env python3
"""
fetch-dune-dex-matrix.py — Build EVM DEX × Chain cross-table from Dune Analytics API.
Queries on-chain dex.trades data for true cross-chain protocol breakdown.

Replaces: fetch-dex-matrix.py (DeFiLlama per-chain — chain-native DEXes only)
Output:    dex-matrix.json → public/data/dex-matrix.json

Requires:  DUNE_API_KEY env var or hardcoded key
Queries:   8029504 = Chain × Protocol Volume cross-table
           8029496 = DEX TVL by Chain
           8029503 = DEX Volume by Protocol (global)
"""
import json, os, sys, time, urllib.request, ssl

DUNE_KEY = "HD3XiM5cX5e3JOFwi7bmWIk4t3nXaL2w"
DUNE_API = "https://api.dune.com/api/v1"
USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-Dune/1.0)"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def dune_post(path, body=None):
    url = f"{DUNE_API}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, headers={
        "X-Dune-Api-Key": DUNE_KEY,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
    }, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ Dune POST {path} → {e}", file=sys.stderr)
        return None

def dune_get(path):
    url = f"{DUNE_API}{path}"
    req = urllib.request.Request(url, headers={
        "X-Dune-Api-Key": DUNE_KEY,
        "User-Agent": USER_AGENT,
    })
    try:
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ Dune GET {path} → {e}", file=sys.stderr)
        return None

def execute_and_fetch(query_id, label="query"):
    """Execute a Dune query and poll for results."""
    exec_resp = dune_post(f"/query/{query_id}/execute")
    if not exec_resp:
        return None
    exec_id = exec_resp.get("execution_id")
    if not exec_id:
        print(f"  ⚠ {label}: no execution_id", file=sys.stderr)
        return None
    
    # Poll for completion (max 30s)
    for attempt in range(15):
        time.sleep(2)
        res = dune_get(f"/execution/{exec_id}/results")
        if not res:
            continue
        if res.get("is_execution_finished"):
            rows = res.get("result", {}).get("rows", [])
            print(f"  {label}: {len(rows)} rows ({res.get('result',{}).get('metadata',{}).get('execution_time_millis',0)}ms)")
            return rows
        state = res.get("state", "?")
        if "FAILED" in state:
            print(f"  ⚠ {label}: {state}", file=sys.stderr)
            return None
    
    print(f"  ⚠ {label}: timeout", file=sys.stderr)
    return None

# ── 1. Cross-table: Chain × Protocol Volume ──
print("Fetching DEX cross-table (query 8029504)...")
cross_rows = execute_and_fetch(8029504, "cross-table")

# ── 2. TVL by Chain ──
print("Fetching DEX TVL by chain (query 8029496)...")
tvl_rows = execute_and_fetch(8029496, "tvl")

if not cross_rows:
    print("FATAL: No cross-table data", file=sys.stderr)
    sys.exit(1)

# ── Build matrix ──
# Group by protocol → chain → volume
proto_data = {}
chain_set = set()
for row in cross_rows:
    chain = row.get("chain", "?")
    protocol = row.get("protocol", "?")
    vol = row.get("volume_usd", 0) or 0
    if vol <= 0:
        continue
    chain_set.add(chain)
    if protocol not in proto_data:
        proto_data[protocol] = {"total": 0, "chains": {}}
    proto_data[protocol]["chains"][chain] = proto_data[protocol]["chains"].get(chain, 0) + vol
    proto_data[protocol]["total"] += vol

# Top 15 protocols by total volume
top_protocols = sorted(proto_data.items(), key=lambda x: -x[1]["total"])[:15]

# Top 8 chains by total volume
chain_totals = {}
for proto, data in proto_data.items():
    for chain, vol in data["chains"].items():
        chain_totals[chain] = chain_totals.get(chain, 0) + vol
top_chains = sorted(chain_totals.items(), key=lambda x: -x[1])[:8]
top_chain_names = [c[0] for c in top_chains]

# Build TVL data from TVL query
chain_tvl = {}
if tvl_rows:
    for row in tvl_rows:
        chain_tvl[row.get("chain", "")] = row.get("tvl", 0)

# Build matrix rows
matrix = []
for proto_name, data in top_protocols:
    row = {"protocol": proto_name, "total_vol": data["total"]}
    for chain in top_chain_names:
        row[chain] = data["chains"].get(chain, 0)
    matrix.append(row)

# Chain metadata
chains_meta = []
for chain_name in top_chain_names:
    chains_meta.append({
        "chain": chain_name,
        "total24h": chain_totals.get(chain_name, 0),
        "tvl": chain_tvl.get(chain_name, 0),
    })

output = {
    "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "source": "Dune Analytics (dex.trades — on-chain data)",
    "query_ids": {"cross_table": 8029504, "tvl_by_chain": 8029496},
    "chains": chains_meta,
    "matrix": matrix,
}

# ── Write output ──
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
os.makedirs(OUT_DIR, exist_ok=True)
out_path = os.path.join(OUT_DIR, "dex-matrix.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2)

total_vol = sum(c["total24h"] for c in chains_meta)
print(f"\n✓ dex-matrix.json written: {len(matrix)} protocols × {len(top_chain_names)} chains")
print(f"  Total DEX volume: ${total_vol:,.0f}")
print(f"  Top chain: {top_chain_names[0]} (${chain_totals.get(top_chain_names[0],0):,.0f})")
print(f"  Top protocol: {matrix[0]['protocol']} (${matrix[0]['total_vol']:,.0f})")
