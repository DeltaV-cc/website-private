#!/usr/bin/env python3
"""
Fetch Bitcoin + Ethereum ETF daily net flows from the Farside GitHub mirror
(haturatu/crypto-etf-flow).  Writes public/data/etf-flows.json for the
IntelHub Web3Dashboard.

Source: Farside Investors (same data that powers defillama.com/etfs)
Mirror: https://github.com/haturatu/crypto-etf-flow
"""
import csv, io, json, os, sys, urllib.request, ssl
from datetime import datetime

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
BTC_CSV_URL = 'https://raw.githubusercontent.com/haturatu/crypto-etf-flow/main/etf_btc.csv'
ETH_CSV_URL = 'https://raw.githubusercontent.com/haturatu/crypto-etf-flow/main/etf_eth.csv'

os.makedirs(PUBLIC_DIR, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_csv(url, timeout=15):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'DeltaV-IntelHub/1.0'})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return r.read().decode('utf-8')
    except Exception as e:
        print(f'  ⚠ ETF fetch failed ({url[-15:]}): {e}', file=sys.stderr)
        return None

def parse_total_column(text):
    """Parse CSV rows, returning list of {date, total} from the 'Total' column."""
    rows = []
    reader = csv.DictReader(io.StringIO(text))
    for row in reader:
        date_str = (row.get('Date') or '').strip()
        total_str = (row.get('Total') or '').strip()
        if not date_str or not total_str or total_str == '':
            continue
        try:
            total = float(total_str)
        except ValueError:
            continue
        # Parse date (format: "22 Jul 2026")
        try:
            dt = datetime.strptime(date_str, '%d %b %Y')
        except ValueError:
            continue
        rows.append({'date': dt.strftime('%Y-%m-%d'), 'total': total})
    return rows

def main():
    btc_csv = fetch_csv(BTC_CSV_URL)
    eth_csv = fetch_csv(ETH_CSV_URL)

    btc_rows = parse_total_column(btc_csv) if btc_csv else []
    eth_rows = parse_total_column(eth_csv) if eth_csv else []

    # Drop rows with 0 total (unreported / weekend days)
    btc_nonzero = [r for r in btc_rows if r['total'] != 0]
    eth_nonzero = [r for r in eth_rows if r['total'] != 0]

    # Latest data point
    btc_latest = btc_nonzero[-1] if btc_nonzero else None
    eth_latest = eth_nonzero[-1] if eth_nonzero else None

    # Previous day (for change calc)
    btc_prev = btc_nonzero[-2]['total'] if len(btc_nonzero) >= 2 else 0
    eth_prev = eth_nonzero[-2]['total'] if len(eth_nonzero) >= 2 else 0

    # Sparkline: last 30 data points (or all if fewer)
    btc_spark = [{'d': r['date'], 'v': r['total']} for r in btc_nonzero[-30:]]
    eth_spark = [{'d': r['date'], 'v': r['total']} for r in eth_nonzero[-30:]]

    # Cumulative YTD flows (approximate: sum of all rows in current year)
    current_year = str(datetime.now().year)
    btc_ytd = sum(r['total'] for r in btc_rows if r['date'].startswith(current_year))
    eth_ytd = sum(r['total'] for r in eth_rows if r['date'].startswith(current_year))

    output = {
        'updated_at': datetime.utcnow().isoformat() + 'Z',
        'source': 'Farside Investors via haturatu/crypto-etf-flow',
        'btc': {
            'latest_total': btc_latest['total'] if btc_latest else None,
            'latest_date': btc_latest['date'] if btc_latest else None,
            'prev_total': btc_prev if btc_prev != 0 else None,
            'change': (btc_latest['total'] - btc_prev) if btc_latest and btc_prev else None,
            'ytd_flows': btc_ytd,
            'sparkline': btc_spark,
        },
        'eth': {
            'latest_total': eth_latest['total'] if eth_latest else None,
            'latest_date': eth_latest['date'] if eth_latest else None,
            'prev_total': eth_prev if eth_prev != 0 else None,
            'change': (eth_latest['total'] - eth_prev) if eth_latest and eth_prev else None,
            'ytd_flows': eth_ytd,
            'sparkline': eth_spark,
        },
    }

    out_path = os.path.join(PUBLIC_DIR, 'etf-flows.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)

    btc_str = f"${btc_latest['total']:+.1f}M" if btc_latest else 'N/A'
    eth_str = f"${eth_latest['total']:+.1f}M" if eth_latest else 'N/A'
    print(f'✓ ETF flows cached: BTC {btc_str} ({btc_latest["date"] if btc_latest else "?"})  ETH {eth_str} ({eth_latest["date"] if eth_latest else "?"})')
    print(f'  BTC YTD: ${btc_ytd:+,.1f}M  |  ETH YTD: ${eth_ytd:+,.1f}M')

if __name__ == '__main__':
    main()
