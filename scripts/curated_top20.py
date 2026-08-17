#!/usr/bin/env python3
"""Derive the slim payload the homepage strip actually reads.

`CuratedIntel` downloads a feed file on every visit, then keeps the first 20
items and five fields of each and throws the rest away. Serving the full
200-item snapshot for that costs ~120 KB per page view, so we write this slim
file next to it instead.

It lives in its own module because two different steps produce
`raw-items.json`: `copy-data.py` during the build, and `preserve-live-data.py`
when CI overlays the fresher cron snapshot from `gh-pages`. Both call `derive`,
so the strip can never end up showing a stale top 20.
"""
import json
import os

FIELDS = ('title', 'url', 'source', 'category', 'published_at')
LIMIT = 20
FILENAME = 'curated-top20.json'


def derive(raw_path, out_dir=None):
    """Write FILENAME beside raw_path (or into out_dir). Returns the item count, or None if it could not be built."""
    try:
        with open(raw_path, 'r', encoding='utf-8') as f:
            raw = json.load(f)
    except (OSError, ValueError) as exc:
        print(f'[warn] {FILENAME} not derived: {exc}')
        return None

    items = raw if isinstance(raw, list) else raw.get('items', [])
    slim = [
        {k: it[k] for k in FIELDS if it.get(k) is not None}
        for it in items[:LIMIT]
        if isinstance(it, dict) and it.get('title') and it.get('url')
    ]

    target_dir = out_dir if out_dir else os.path.dirname(raw_path)
    out_path = os.path.join(str(target_dir), FILENAME)
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(slim, f)

    saved = os.path.getsize(raw_path) - os.path.getsize(out_path)
    print(f'[ok] {FILENAME}: {len(slim)} items ({saved // 1024} KB lighter than raw-items.json)')
    return len(slim)


if __name__ == '__main__':
    import sys
    derive(sys.argv[1] if len(sys.argv) > 1 else 'public/data/raw-items.json')
