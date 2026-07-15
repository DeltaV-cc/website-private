#!/usr/bin/env python3
"""Add an item to the Cybersec Watchlist (7-day TTL).

Usage:
    python add-to-watchlist.py "Title" "https://url" "Source" ["Summary"]
    
Or pipe from clipboard / item data. Updates the watchlist JSON and auto-expires old items.
"""

import json, sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

WATCHLIST_PATH = Path(r"C:\Users\Admin\DeltaV\website\public\data\cybersec-watchlist.json")

def load():
    if WATCHLIST_PATH.exists():
        return json.loads(WATCHLIST_PATH.read_text(encoding="utf-8"))
    return []

def save(data):
    WATCHLIST_PATH.write_text(json.dumps(data, indent=2), encoding="utf-8")

def clean_expired(data):
    now = datetime.now(timezone.utc)
    return [d for d in data if datetime.fromisoformat(d["expires"]).replace(tzinfo=timezone.utc) > now]

def add(title, url, source, summary=""):
    data = clean_expired(load())
    # Avoid duplicates by URL
    if any(d["url"] == url for d in data):
        print(f"⚠️  Already in watchlist: {url}")
        return
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    expires = (datetime.now(timezone.utc) + timedelta(days=7)).strftime("%Y-%m-%dT%H:%M:%SZ")
    data.append({
        "title": title,
        "url": url,
        "source": source,
        "summary": summary,
        "added": now,
        "expires": expires
    })
    save(data)
    print(f"✅ Added to Cybersec Watchlist (expires {expires[:10]}):")
    print(f"   {title}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python add-to-watchlist.py 'Title' 'URL' 'Source' ['Summary']")
        sys.exit(1)
    add(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "")
