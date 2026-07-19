#!/usr/bin/env python3
"""
fetch-dex-matrix.py — Build EVM DEX × Chain cross-table from DeFiLlama per-chain APIs.
Equivalent to the Dune EVM DEX Landscape dashboard (x_drome_analytics/evm-dex-landscape).

Run: python fetch-dex-matrix.py
Output: dex-matrix.json  →  public/data/dex-matrix.json
"""
import json, urllib.request, ssl, sys, time, urllib.parse

USER_AGENT = 'Mozilla/5.0 (compatible; DeltaV-DEX-Matrix/1.0)'
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_json(url, timeout=12):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ {url.split('/')[-1]} → {e}", file=sys.stderr)
        return None

# 1. Get top chains by TVL
print("Fetching top chains...")
chains_data = fetch_json('https://api.llama.fi/v2/chains')
if not chains_data:
    print("FATAL: Could not fetch chains", file=sys.stderr)
    sys.exit(1)

top_chains = [c['name'] for c in sorted(chains_data, key=lambda x: x.get('tvl', 0), reverse=True)[:8]]
print(f"  Top 8 chains: {', '.join(top_chains)}")

# 2. Fetch per-chain DEX data
chain_dex_data = {}
for chain in top_chains:
    time.sleep(0.3)  # rate limit courtesy
    encoded_chain = urllib.parse.quote(chain)
    dex = fetch_json(f'https://api.llama.fi/overview/dexs/{encoded_chain}?dataType=dailyVolume')
    if dex:
        protocols = []
        for p in (dex.get('protocols') or [])[:8]:
            vol = p.get('total24h') or 0
            if vol > 0:
                protocols.append({
                    'name': p.get('displayName') or p.get('name', '?'),
                    'volume24h': vol
                })
        chain_dex_data[chain] = {
            'total24h': dex.get('total24h', 0),
            'change_1d': dex.get('change_1d', 0),
            'protocols': sorted(protocols, key=lambda x: -x['volume24h'])[:5]
        }
        print(f"  {chain}: ${dex.get('total24h', 0):,.0f} vol, {len(protocols)} protocols")
    else:
        print(f"  {chain}: FAILED")
        chain_dex_data[chain] = {'total24h': 0, 'change_1d': 0, 'protocols': []}

# 3. Build cross-table matrix
# Rows = unique protocols across all chains (top 15 by total volume)
all_protocols = {}
for chain, data in chain_dex_data.items():
    for p in data['protocols']:
        name = p['name']
        if name not in all_protocols:
            all_protocols[name] = {'total_vol': 0, 'chains': {}}
        all_protocols[name]['chains'][chain] = p['volume24h']
        all_protocols[name]['total_vol'] += p['volume24h']

top_protocols = sorted(all_protocols.items(), key=lambda x: -x[1]['total_vol'])[:15]

# Build matrix
matrix = []
for proto_name, proto_data in top_protocols:
    row = {'protocol': proto_name, 'total_vol': proto_data['total_vol']}
    for chain in top_chains:
        row[chain] = proto_data['chains'].get(chain, 0)
    matrix.append(row)

# Chain totals
chain_totals = []
for chain in top_chains:
    cd = chain_dex_data.get(chain, {})
    chain_totals.append({
        'chain': chain,
        'total24h': cd.get('total24h', 0),
        'change_1d': cd.get('change_1d', 0)
    })

output = {
    'updated_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
    'chains': chain_totals,
    'matrix': matrix,
    'source': 'DeFiLlama (per-chain DEX endpoints)',
    'excludes': 'Protocols with <$1 volume filtered out'
}

# 4. Write output
import os
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
os.makedirs(OUT_DIR, exist_ok=True)
out_path = os.path.join(OUT_DIR, 'dex-matrix.json')
with open(out_path, 'w') as f:
    json.dump(output, f, indent=2)

print(f"\n✓ dex-matrix.json written: {len(matrix)} protocols × {len(top_chains)} chains")
print(f"  Total DEX volume across chains: ${sum(c['total24h'] for c in chain_totals):,.0f}")
