#!/usr/bin/env python3
"""
refresh-data.py — Fetch live market data and push to gh-pages (no site rebuild).
Runs standalone via Hermes no_agent cron. Zero tokens. ~3s per run.

Trigger: every 15 min
Output: stdout goes to cron delivery (silent when no changes)
"""
import json, os, shutil, tempfile, subprocess, sys, time, urllib.request, ssl

REPO = 'https://github.com/DeltaV-cc/website-private.git'
BRANCH = 'gh-pages'
DATA_FILES = ['indices.json', 'forex.json', 'hf.json', 'crypto.json', 'btc-trend.json', 'exchange-vol.json']
USER_AGENT = 'Mozilla/5.0 (compatible; DeltaV-Refresh/1.0)'

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_json(url, timeout=12):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ {url[:60]}... → {e}", file=sys.stderr)
        return None

def fetch_chart(symbol, range_days='5d'):
    """Fetch Yahoo Finance chart data, return {now, prev, closes, timestamps} or None."""
    d = fetch_json(f'https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range={range_days}')
    if not d:
        return None
    r = (d.get('chart', {}).get('result', [{}]) or [{}])[0]
    meta = r.get('meta', {})
    q = (r.get('indicators', {}).get('quote', [{}]) or [{}])[0]
    closes = [c for c in q.get('close', []) if c is not None]
    timestamps = r.get('timestamp', [])
    now = closes[-1] if closes else meta.get('regularMarketPrice', 0)
    prev = closes[-2] if len(closes) >= 2 else meta.get('previousClose', 0)
    return {'now': now, 'prev': prev, 'closes': closes, 'timestamps': timestamps}

# ── 1. Fetch indices ──
indices = {}
for sym, key in [('%5EGSPC', 'spx'), ('000001.SS', 'csi')]:
    c = fetch_chart(sym, '5d')
    if c and c['now']:
        indices[key] = {
            'price': f"{c['now']:.0f}",
            'change': c['now'] - c['prev'],
            'changePct': f"{(c['now'] - c['prev']) / c['prev'] * 100:+.2f}%" if c['prev'] else '...'
        }

# ── 2. Fetch forex ──
forex = {}
pairs = [
    ('EURUSD=X', 'EUR', True), ('USDJPY=X', 'JPY', False),
    ('GBPUSD=X', 'GBP', True), ('USDCHF=X', 'CHF', False),
    ('USDCNY=X', 'CNY', False),
]
for symbol, label, usdLeft in pairs:
    c = fetch_chart(symbol, '10y')
    if c and c['now']:
        closes = c['closes']
        ts = c['timestamps']
        now = c['now']
        prevClose = c['prev']
        chgPct = f'{((now - prevClose) / prevClose * 100):+.2f}%' if prevClose else '···'

        def find_close(days_back):
            cutoff = time.time() - (days_back * 86400)
            for i in range(len(ts) - 1, -1, -1):
                if ts[i] <= cutoff: return closes[i]
            return closes[0] if closes else 0

        m1 = find_close(22)
        y1 = find_close(252)
        y10 = closes[0] if closes else 0

        def pct(v): return ((now - v) / v * 100) if v else None
        rate = (1 / now) if usdLeft else now
        rateStr = f'{rate:.4f}' if usdLeft else f'{rate:.2f}'

        forex[label] = {
            'rate': rate, 'rateStr': rateStr, 'chgPct': chgPct,
            'p1M': pct(m1), 'p1Y': pct(y1), 'p10Y': pct(y10),
        }

# ── 3. Fetch HF ──
hf_data = {}
models = fetch_json('https://huggingface.co/api/models?sort=downloads&direction=-1&limit=6')
if models and isinstance(models, list):
    hf_data['models'] = [{
        'name': m.get('modelId') or m.get('id', ''),
        'author': m.get('author', ''), 'likes': m.get('likes', 0),
        'downloads': m.get('downloads', 0),
        'url': f"https://huggingface.co/{m.get('modelId') or m.get('id', '')}"
    } for m in models]

spaces = fetch_json('https://huggingface.co/api/spaces?sort=likes&direction=-1&limit=5')
if spaces and isinstance(spaces, list):
    hf_data['spaces'] = [{
        'name': s.get('id', ''), 'author': s.get('author', ''),
        'likes': s.get('likes', 0),
        'url': f"https://huggingface.co/spaces/{s.get('id', '')}"
    } for s in spaces]

# ── 4. Fetch crypto market cap ──
crypto = {}
cg = fetch_json('https://api.coingecko.com/api/v3/global')
if cg and cg.get('data'):
    d = cg['data']
    crypto['total_mcap'] = d.get('total_market_cap', {}).get('usd', 0)
    crypto['total_volume'] = d.get('total_volume', {}).get('usd', 0)
    crypto['btc_dominance'] = d.get('market_cap_percentage', {}).get('btc', 0)
    crypto['eth_dominance'] = d.get('market_cap_percentage', {}).get('eth', 0)
    crypto['mcap_change_24h'] = d.get('market_cap_change_percentage_24h_usd', 0)
    crypto['active_cryptos'] = d.get('active_cryptocurrencies', 0)

# ── 5. Clone gh-pages, update files, push ──
# ── 5. Fetch BTC trend + exchange volumes ──
btc_trend = []
exchange_vol = {'vol_history': []}
try:
    btcd = fetch_json('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365')
    if btcd:
        # BTC mcap trend
        if btcd.get('market_caps'):
            caps = btcd['market_caps']
            step = max(1, len(caps) // 150)
            btc_trend = [{'t': caps[i][0], 'v': caps[i][1]} for i in range(0, len(caps), step)]
        # Volume history — convert BTC volume to USD using prices
        if btcd.get('total_volumes') and btcd.get('prices'):
            vols = btcd['total_volumes']
            px = {p[0]: p[1] for p in btcd['prices']}
            step = max(1, len(vols) // 100)
            for i in range(0, len(vols), step):
                t, v = vols[i]
                p = px.get(t, px.get(min(px.keys(), key=lambda k: abs(k-t)), 0))
                exchange_vol['vol_history'].append({'t': t, 'v': v * p})
except: pass

# Exchange rankings
try:
    ex = fetch_json('https://api.coingecko.com/api/v3/exchanges?per_page=10')
    exchanges = []
    total_btc = 0
    if ex and isinstance(ex, list):
        for e in ex[:10]:
            vb = e.get('trade_volume_24h_btc', 0) or 0
            exchanges.append({'name': e.get('name','')[:30], 'score': e.get('trust_score',0), 'vol_btc': vb})
            total_btc += vb
    exchange_vol['exchanges'] = exchanges
    exchange_vol['total_vol_btc_24h'] = total_btc
except: pass

new_data = {
    'indices.json': json.dumps(indices, indent=2) if indices else None,
    'forex.json': json.dumps(forex) if forex else None,
    'hf.json': json.dumps(hf_data) if hf_data else None,
    'crypto.json': json.dumps(crypto) if crypto else None,
    'btc-trend.json': json.dumps(btc_trend) if btc_trend else None,
    'exchange-vol.json': json.dumps(exchange_vol) if exchange_vol else None,
}

tmpdir = tempfile.mkdtemp(prefix='dv-refresh-')
try:
    subprocess.run(['git', 'clone', '--depth', '1', '--branch', BRANCH, REPO, tmpdir],
                   check=True, capture_output=True, timeout=30)
    changed = False
    for fname in DATA_FILES:
        new_content = new_data.get(fname)
        if not new_content:
            continue
        fpath = os.path.join(tmpdir, 'data', fname)
        old_content = None
        if os.path.exists(fpath):
            with open(fpath, 'r') as f:
                old_content = f.read()
        if old_content != new_content:
            os.makedirs(os.path.dirname(fpath), exist_ok=True)
            with open(fpath, 'w') as f:
                f.write(new_content)
            changed = True

    if changed:
        subprocess.run(['git', '-C', tmpdir, 'config', 'user.email', 'deltav.go@gmail.com'], check=True)
        subprocess.run(['git', '-C', tmpdir, 'config', 'user.name', 'Delta V ZHC'], check=True)
        subprocess.run(['git', '-C', tmpdir, 'add'] + [f'data/{f}' for f in DATA_FILES], check=True)
        subprocess.run(['git', '-C', tmpdir, 'commit', '-m',
                        f'data refresh: indices+forex+HF {time.strftime("%H:%M")}'], check=True)
        subprocess.run(['git', '-C', tmpdir, 'push', '-f', 'origin', BRANCH], check=True,
                       capture_output=True, timeout=30)
        spx = indices.get('spx', {}).get('price', '?')
        csi = indices.get('csi', {}).get('price', '?')
        print(f'✓ Data refreshed: SPX {spx} CSI {csi} | Forex {len(forex)}p | HF {len(hf_data.get("models",[]))}m+{len(hf_data.get("spaces",[]))}s')
    else:
        # Silent — no changes, nothing delivered to user
        pass
finally:
    shutil.rmtree(tmpdir, ignore_errors=True)
