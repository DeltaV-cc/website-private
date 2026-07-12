#!/usr/bin/env python3
"""
Live Intel Sync — copies latest pipeline output to the website's public dir.
Runs as a cron job every 15 min alongside the intel pipeline.
Only copies raw items + picks — no external API calls (those happen at build time).
"""
import json, os, shutil, re
from pathlib import Path
from datetime import datetime

INTEL_ROOT = Path("C:/Users/Admin/DeltaV-persistent-workspace/intel")
WEBSITE_DATA = Path("C:/Users/Admin/DeltaV/website/public/data")
RAW_DIR = INTEL_ROOT / "raw"

os.makedirs(WEBSITE_DATA, exist_ok=True)

# ── Copy raw items ──────────────────────────────────────────────────────
all_items = []
if RAW_DIR.exists():
    for fname in sorted(os.listdir(RAW_DIR)):
        if not fname.endswith('.json'):
            continue
        try:
            with open(RAW_DIR / fname, 'r', encoding='utf-8') as f:
                data = json.load(f)
            if isinstance(data, list):
                for item in data:
                    if isinstance(item, list) and len(item) >= 3:
                        all_items.append({
                            'title': str(item[0])[:200],
                            'url': str(item[1])[:500],
                            'source': str(item[2])[:100],
                            'published_at': str(item[3]) if len(item) > 3 else '',
                            'summary': str(item[4])[:300] if len(item) > 4 else ''
                        })
        except Exception as e:
            print(f"  ⚠ {fname}: {e}")

# Deduplicate and sort by published_at descending (newest first)
seen = set()
unique = []
for item in all_items:
    url = item.get('url', '')
    if url and url not in seen:
        seen.add(url)
        unique.append(item)

# Sort: newest published_at first — so homepage shows freshest items
from datetime import datetime, timezone
import re

def parse_date(item):
    raw = item.get('published_at', '')
    if not raw:
        return datetime.min.replace(tzinfo=timezone.utc)
    
    # Strip timezone name suffix (GMT, UTC, etc.) for parsing
    clean = raw.strip()
    clean = re.sub(r'\s+(GMT|UTC|EST|EDT|CST|CDT|PST|PDT)$', '', clean, flags=re.I)
    # Strip +00:00 style offset
    clean = re.sub(r'[+-]\d{2}:\d{2}$', '', clean)
    # Strip Z suffix
    clean = re.sub(r'Z$', '', clean)
    # Truncate fractional seconds to 6 digits max
    clean = re.sub(r'\.(\d{6})\d+', r'.\1', clean)
    
    # Try ISO format first (most common)
    for fmt in ['%Y-%m-%dT%H:%M:%S.%f', '%Y-%m-%dT%H:%M:%S', '%Y-%m-%d']:
        try:
            return datetime.strptime(clean[:26], fmt).replace(tzinfo=timezone.utc)
        except ValueError:
            continue
    
    # Try RFC 2822 / RSS format: "Thu, 18 Jun 2026 17:03:02"
    try:
        return datetime.strptime(clean[:25], '%a, %d %b %Y %H:%M:%S').replace(tzinfo=timezone.utc)
    except ValueError:
        pass
    
    # Try short RFC: "18 Jun 2026 17:03:02"
    try:
        return datetime.strptime(clean[:20], '%d %b %Y %H:%M:%S').replace(tzinfo=timezone.utc)
    except ValueError:
        pass
    
    return datetime.min.replace(tzinfo=timezone.utc)

unique.sort(key=parse_date, reverse=True)

# Keep latest 200
with open(WEBSITE_DATA / 'raw-items.json', 'w', encoding='utf-8') as f:
    json.dump(unique[:200], f)
print(f"✓ raw-items.json: {len(unique[:200])} items synced (newest first)")

# ── Copy artemis research ────────────────────────────────────────────────
artemis_src = INTEL_ROOT / "artemis.json"
if artemis_src.exists():
    shutil.copy(artemis_src, WEBSITE_DATA / 'artemis-research.json')
    with open(artemis_src) as f:
        artemis = json.load(f)
    print(f"✓ artemis-research.json: {len(artemis)} articles synced")
else:
    print("  · no artemis research to sync")

# ── Copy picks ──────────────────────────────────────────────────────────
picks_src = INTEL_ROOT / "picks.json"
if picks_src.exists():
    shutil.copy(picks_src, WEBSITE_DATA / 'picks.json')
    with open(picks_src) as f:
        picks = json.load(f)
    print(f"✓ picks.json: {len(picks.get('picks', []))} picks synced")
else:
    print("  · no picks.json to sync")

print(f"  ({datetime.now().strftime('%H:%M:%S')})")
# ══ Push to gh-pages ══════════════════════════════════════════════════════
import subprocess, tempfile, time

REPO = 'https://github.com/DeltaV-cc/website-private.git'
BRANCH = 'gh-pages'

DATA_FILES = ['raw-items.json', 'picks.json', 'artemis-research.json']
tmpdir = tempfile.mkdtemp(prefix='dv-sync-')
try:
    subprocess.run(['git', 'clone', '--depth', '1', '--branch', BRANCH, REPO, tmpdir],
                   check=True, capture_output=True, timeout=30)
    changed = False
    for fname in DATA_FILES:
        src = WEBSITE_DATA / fname
        if not src.exists():
            continue
        with open(src, 'r') as f:
            new_content = f.read()
        fpath = os.path.join(tmpdir, 'website-private', 'data', fname)
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
        existing = [f for f in ['website-private/data/' + f for f in DATA_FILES] if os.path.exists(os.path.join(tmpdir, f))]
        if existing:
            subprocess.run(['git', '-C', tmpdir, 'add'] + existing, check=True)
            subprocess.run(['git', '-C', tmpdir, 'commit', '-m',
                            'intel sync: items+picks+artemis ' + time.strftime('%H:%M')], check=True)
            subprocess.run(['git', '-C', tmpdir, 'push', '-f', 'origin', BRANCH], check=True,
                           capture_output=True, timeout=30)
        print('  pushed to gh-pages')
    else:
        print('  no changes')
finally:
    import shutil
    shutil.rmtree(tmpdir, ignore_errors=True)

