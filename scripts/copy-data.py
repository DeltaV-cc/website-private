#!/usr/bin/env python3
"""
Pre-build script: copies workspace data + fetches external APIs
for static site deployment (GitHub Pages). Falls back gracefully.
"""
import json, os, shutil, re, urllib.request, ssl

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
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
    with open(os.path.join(PUBLIC_DIR, 'raw-items.json'), 'w', encoding='utf-8') as f:
        json.dump(unique[-200:], f)
    print(f'✓ {len(unique[-200:])} raw items cached')

# --- Copy picks ---
picks_file = os.path.join(WORKSPACE_DIR, 'picks.json')
if os.path.exists(picks_file):
    shutil.copy(picks_file, os.path.join(PUBLIC_DIR, 'picks.json'))
    print('✓ Picks copied')
else:
    with open(os.path.join(PUBLIC_DIR, 'picks.json'), 'w') as f:
        json.dump({'picks': [], 'updatedAt': ''}, f)

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
