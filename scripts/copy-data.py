#!/usr/bin/env python3
"""
Pre-build script: copies workspace data + fetches external APIs
for static site deployment (GitHub Pages). Falls back gracefully.
"""
import json, os, shutil, re, urllib.request, ssl

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
SIGNALS_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'wiki', 'signals')
WORKSPACE_DIR = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'DeltaV-persistent-workspace', 'intel')

os.makedirs(PUBLIC_DIR, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_json(url, timeout=15):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'DeltaV-IntelHub/1.0'})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ {url[:60]}... → {e}")
        return None

# --- Copy raw items from workspace ---
raw_dir = os.path.join(WORKSPACE_DIR, 'raw')
if os.path.exists(raw_dir):
    all_items = []
    for fname in sorted(os.listdir(raw_dir)):
        if fname.endswith('.json'):
            try:
                with open(os.path.join(raw_dir, fname), 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        for item in data:
                            if isinstance(item, list) and len(item) >= 3:
                                all_items.append({'title': str(item[0])[:200], 'url': str(item[1])[:500], 'source': str(item[2])[:100], 'published_at': str(item[3]) if len(item) > 3 else '', 'summary': str(item[4])[:300] if len(item) > 4 else ''})
            except: pass
    seen = set()
    unique = []
    for item in all_items:
        url = item.get('url', '')
        if url and url not in seen:
            seen.add(url)
            unique.append(item)
    # Sort by published_at descending (newest first) before taking top 200
    import re as _re
    from datetime import datetime as _dt, timezone as _tz
    def _parse_date(item):
        raw = item.get('published_at', '')
        if not raw: return _dt.min.replace(tzinfo=_tz.utc)
        clean = raw.strip()
        clean = _re.sub(r'\s+(GMT|UTC|EST|EDT|CST|CDT|PST|PDT)$', '', clean, flags=_re.I)
        clean = _re.sub(r'[+-]\d{2}:\d{2}$', '', clean)
        clean = _re.sub(r'Z$', '', clean)
        clean = _re.sub(r'\.(\d{6})\d+', r'.\1', clean)
        for fmt in ['%Y-%m-%dT%H:%M:%S.%f', '%Y-%m-%dT%H:%M:%S', '%Y-%m-%d',
                     '%a, %d %b %Y %H:%M:%S', '%d %b %Y %H:%M:%S']:
            try: return _dt.strptime(clean[:26], fmt).replace(tzinfo=_tz.utc)
            except ValueError: continue
        return _dt.min.replace(tzinfo=_tz.utc)
    unique.sort(key=_parse_date, reverse=True)
    top200 = unique[:200]
    # Only overwrite if file is stale (>30 min) or doesn't exist — trust sync-intel-to-site.py
    out_path = os.path.join(PUBLIC_DIR, 'raw-items.json')
    if os.path.exists(out_path):
        age_min = (os.path.getmtime(__file__) - os.path.getmtime(out_path)) / 60 if os.path.getmtime(out_path) else 999
        # Always write during build — this is the authoritative snapshot
        pass
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(top200, f)
    print(f'✓ {len(top200)} raw items cached (newest first)')
    os.makedirs(SIGNALS_DIR, exist_ok=True)
    shutil.copy(os.path.join(PUBLIC_DIR, 'raw-items.json'), os.path.join(SIGNALS_DIR, 'raw-items.json'))
    print(f'✓ raw-items.json copied to signals/')
    
    # --- Assign tags to raw items via source matching ---
    import re as _r
    SOURCE_TAG_MAP = [
        # (regex pattern, tag)
        (r'(?i)coindesk|decrypt|defiant|santiment|cryptoquant|lookonchain|glassnode|l2beat|defillama|polymarket|theblock|cointelegraph|hypernativelabs|polymutex', 'crypto'),
        (r'(?i)bleepingcomputer|dark.reading|krebs|schneier|threatpost|pcaversaccio|dinosn', 'cybersec'),
        (r'(?i)arxiv\s|hugging\s?face|lesswrong|anthropic|openai|deepmind|lerobothf', 'ai'),
        (r'(?i)mit\s|science\sdaily|ieee|ars\stechnica|nature|researchgate|sciencedaily', 'science'),
        (r'(?i)nvidia|intel|amd|tsmc|semiconductor', 'hardware'),
        (r'(?i)federal\s?reserve|bloomberg|reuters|wsj\b|financial\stimes|michaeljburry|hacker\snews', 'macro'),
    ]
    for item in top200:
        src = (item.get('source') or item.get('feedTitle') or '').strip()
        for pattern, tag in SOURCE_TAG_MAP:
            if _r.search(pattern, src):
                item['tag'] = tag
                break
    # Re-write with tags
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(top200, f)
    # Re-copy to signals
    shutil.copy(os.path.join(PUBLIC_DIR, 'raw-items.json'), os.path.join(SIGNALS_DIR, 'raw-items.json'))
    tagged = sum(1 for it in top200 if it.get('tag'))
    print(f'✓ tags assigned: {tagged}/{len(top200)} items')

# --- Copy picks ---
picks_file = os.path.join(WORKSPACE_DIR, 'picks.json')
if os.path.exists(picks_file):
    shutil.copy(picks_file, os.path.join(PUBLIC_DIR, 'picks.json'))
    print('✓ Picks copied')
else:
    with open(os.path.join(PUBLIC_DIR, 'picks.json'), 'w') as f:
        json.dump({'picks': [], 'updatedAt': ''}, f)
os.makedirs(SIGNALS_DIR, exist_ok=True)
shutil.copy(os.path.join(PUBLIC_DIR, 'picks.json'), os.path.join(SIGNALS_DIR, 'picks.json'))
print('✓ picks.json copied to signals/')

# --- Fetch CISA KEV ---
print('Fetching CISA KEV...')
kev = fetch_json('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json')
if kev:
    cached = {'kev': [], 'updatedAt': kev.get('dateReleased', '')}
    for v in (kev.get('vulnerabilities') or [])[:8]:
        cached['kev'].append({'cve': v.get('cveID'), 'product': v.get('product'), 'vendor': v.get('vendorProject'), 'name': v.get('vulnerabilityName'), 'dateAdded': v.get('dateAdded'), 'dueDate': v.get('dueDate')})
    with open(os.path.join(PUBLIC_DIR, 'infosec.json'), 'w') as f:
        json.dump(cached, f)
    print(f'✓ {len(cached["kev"])} KEVs cached')

# --- Fetch NVD CVEs ---
print('Fetching NVD CVEs...')
nvd = fetch_json('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=8')
if nvd:
    cves = []
    for v in (nvd.get('vulnerabilities') or []):
        cve = v.get('cve') or {}
        m = (cve.get('metrics') or {}).get('cvssMetricV31') or [{}]
        cvss = m[0].get('cvssData') or {}
        desc = next((d.get('value','') for d in (cve.get('descriptions') or []) if d.get('lang')=='en'), '')
        cves.append({'id': cve.get('id'), 'severity': cvss.get('baseSeverity','N/A'), 'score': cvss.get('baseScore', 0), 'description': desc[:140], 'published': cve.get('published')})
    # Update infosec.json with CVEs
    existing = {}
    if os.path.exists(os.path.join(PUBLIC_DIR, 'infosec.json')):
        with open(os.path.join(PUBLIC_DIR, 'infosec.json')) as f:
            existing = json.load(f)
    existing['cves'] = cves
    with open(os.path.join(PUBLIC_DIR, 'infosec.json'), 'w') as f:
        json.dump(existing, f)
    print(f'✓ {len(cves)} CVEs cached')

# --- Fetch HIBP breaches ---
print('Fetching HIBP breaches...')
hibp = fetch_json('https://haveibeenpwned.com/api/v3/breaches')
if hibp and isinstance(hibp, list):
    breaches = []
    for b in hibp[:8]:
        breaches.append({'name': b.get('Name') or b.get('Title',''), 'domain': b.get('Domain',''), 'date': b.get('BreachDate',''), 'count': b.get('PwnCount',0), 'data': ', '.join((b.get('DataClasses') or [])[:5])})
    existing = {}
    if os.path.exists(os.path.join(PUBLIC_DIR, 'infosec.json')):
        with open(os.path.join(PUBLIC_DIR, 'infosec.json')) as f:
            existing = json.load(f)
    existing['breaches'] = breaches
    with open(os.path.join(PUBLIC_DIR, 'infosec.json'), 'w') as f:
        json.dump(existing, f)
    print(f'✓ {len(breaches)} breaches cached')

print('\nPre-build complete.')
