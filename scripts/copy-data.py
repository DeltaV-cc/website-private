#!/usr/bin/env python3
"""
Pre-build script: copies workspace data into public/data/
for static site deployment (GitHub Pages)
"""
import json, os, shutil, re

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), 'public', 'data')
WORKSPACE_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'DeltaV-persistent-workspace', 'intel')

os.makedirs(PUBLIC_DIR, exist_ok=True)

# Copy raw items
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
                                all_items.append({
                                    'title': str(item[0])[:200],
                                    'url': str(item[1])[:500],
                                    'source': str(item[2])[:100],
                                    'timestamp': str(item[3]) if len(item) > 3 else '',
                                    'summary': str(item[4])[:300] if len(item) > 4 else '',
                                })
            except: pass
    # Deduplicate by URL
    seen = set()
    unique = []
    for item in all_items:
        url = item.get('url', '')
        if url and url not in seen:
            seen.add(url)
            unique.append(item)
    with open(os.path.join(PUBLIC_DIR, 'raw-items.json'), 'w', encoding='utf-8') as f:
        json.dump(unique[-200:], f)  # last 200 items
    print(f'Copied {len(unique[-200:])} raw items to public/data/')

# Copy picks
picks_file = os.path.join(WORKSPACE_DIR, 'picks.json')
if os.path.exists(picks_file):
    shutil.copy(picks_file, os.path.join(PUBLIC_DIR, 'picks.json'))
    print('Copied picks.json to public/data/')
else:
    with open(os.path.join(PUBLIC_DIR, 'picks.json'), 'w') as f:
        json.dump({'picks': [], 'updatedAt': ''}, f)
    print('Created empty picks.json')
