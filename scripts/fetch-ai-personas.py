#!/usr/bin/env python3
"""Nitter RSS for ML / agent / gen-AI / local-LLM personas → ai-personas.json.

Tries nitter.net then xcancel.com. Per-handle cap so firehoses cannot starve quiet accounts.
Hermes no_agent (~30m watchdog bundle). Zero LLM tokens.
"""
from __future__ import annotations

import json
import os
import re
import ssl
import sys
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
INSTANCES = ["https://nitter.net", "https://xcancel.com"]
PER_HANDLE = 4

# handle, lane
PERSONAS = [
    # Frontier labs / founders
    ("sama", "frontier"), ("karpathy", "frontier"), ("ylecun", "frontier"),
    ("DarioAmodei", "frontier"), ("demishassabis", "frontier"), ("gdb", "frontier"),
    ("DrJimFan", "frontier"), ("fchollet", "frontier"), ("AndrewYNg", "frontier"),
    ("ClementDelangue", "frontier"), ("osanseviero", "frontier"),
    ("OpenAI", "frontier"), ("AnthropicAI", "frontier"), ("GoogleDeepMind", "frontier"),
    ("xai", "frontier"), ("huggingface", "frontier"),
    ("deepseek_ai", "frontier"), ("Alibaba_Qwen", "frontier"), ("Kimi_Moonshot", "frontier"),
    ("MiniMax__AI", "frontier"),
    # Agents
    ("yoheinakajima", "agents"), ("hwchase17", "agents"), ("LangChainAI", "agents"),
    ("jxnlco", "agents"), ("HamelHusain", "agents"), ("lateinteraction", "agents"),
    ("RLanceMartin", "agents"), ("swyx", "agents"), ("LeRobotHF", "agents"),
    # Local / uncensored / nerds
    ("ggerganov", "local"), ("ollama", "local"), ("lmstudioAI", "local"),
    ("unslothai", "local"), ("NousResearch", "local"), ("teknium1", "local"),
    ("elder_plinius", "local"), ("TheBloke", "local"),
    ("teortaxesTex", "nerds"), ("ESYudkowsky", "nerds"), ("goodside", "nerds"),
    ("emollick", "nerds"), ("nearcyan", "nerds"), ("bindureddy", "nerds"),
    ("levelsio", "nerds"), ("rasbt", "nerds"), ("jeremyphoward", "nerds"),
    # Film / gen media
    ("runwayml", "film"), ("LumaLabsAI", "film"), ("StabilityAI", "film"),
    ("midjourney", "film"), ("EMostaque", "film"),
]


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def strip_html(text: str) -> str:
    s = unescape(text or "")
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"https://nitter\.[^/\s]+/\S+", "", s)
    return re.sub(r"\s+", " ", s).strip()


def rewrite_status(url: str, handle: str) -> str:
    m = re.search(r"(?:nitter\.[^/]+|xcancel\.com)/([^/]+)/status/(\d+)", url or "", re.I)
    if m:
        return f"https://x.com/{m.group(1)}/status/{m.group(2)}"
    if url and "x.com/" in url:
        return url
    return f"https://x.com/{handle}"


def fetch_text(url: str, timeout: int = 14) -> str | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, */*"})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            body = r.read(400_000)
            if b"<rss" not in body[:500] and b"<feed" not in body[:500]:
                return None
            return body.decode("utf-8", "replace")
    except Exception:
        return None


def parse_date(raw: str) -> str:
    if not raw:
        return utc_now()
    try:
        dt = parsedate_to_datetime(raw)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).isoformat()
    except Exception:
        return raw


def parse_rss(xml: str, handle: str, lane: str) -> list[dict]:
    items = []
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return []
    for block in root.findall(".//item"):
        title = strip_html(block.findtext("title") or "")
        link = (block.findtext("link") or "").strip()
        pub = block.findtext("pubDate") or ""
        desc = strip_html(block.findtext("description") or "")[:240]
        if not title:
            continue
        items.append({
            "title": title[:280],
            "url": rewrite_status(link, handle),
            "source": f"X: @{handle}",
            "handle": handle,
            "lane": lane,
            "published_at": parse_date(pub),
            "summary": desc,
            "tag": "ai",
        })
        if len(items) >= PER_HANDLE:
            break
    return items


def fetch_handle(handle: str, lane: str) -> list[dict]:
    for inst in INSTANCES:
        xml = fetch_text(f"{inst}/{handle}/rss")
        if xml:
            items = parse_rss(xml, handle, lane)
            if items:
                return items
    return []


def main() -> int:
    items: list[dict] = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futs = {pool.submit(fetch_handle, h, lane): (h, lane) for h, lane in PERSONAS}
        for fut in as_completed(futs):
            h, lane = futs[fut]
            try:
                got = fut.result()
            except Exception:
                got = []
            print(f"  · @{h} [{lane}]: {len(got)}")
            items.extend(got)

    seen = set()
    unique = []
    for it in items:
        k = f"{it.get('handle')}|{(it.get('title') or '')[:80].lower()}"
        if k in seen:
            continue
        seen.add(k)
        unique.append(it)
    unique.sort(key=lambda it: it.get("published_at") or "", reverse=True)

    payload = {
        "updated": utc_now(),
        "items": unique[:80],
        "handles": [h for h, _ in PERSONAS],
    }
    text = json.dumps(payload, indent=2, ensure_ascii=False)

    here = Path(__file__).resolve().parent.parent / "public" / "data" / "ai-personas.json"
    try:
        here.parent.mkdir(parents=True, exist_ok=True)
        here.write_text(text, encoding="utf-8")
    except Exception:
        pass
    ops = Path(os.environ.get("HERMES_CRON_WORKDIR") or "C:/Users/Admin/DeltaV-ops/website") / "public" / "data"
    try:
        ops.mkdir(parents=True, exist_ok=True)
        (ops / "ai-personas.json").write_text(text, encoding="utf-8")
    except Exception:
        pass

    try:
        from _gh_pages_push import push_data_files
        push_data_files({"ai-personas.json": text}, commit_prefix="data: ai-personas")
    except Exception as e:
        print(f"  ⚠ gh-pages: {e}", file=sys.stderr)

    print(f"✓ ai-personas.json {len(unique)} posts from {len({i.get('handle') for i in unique})} handles")
    return 0 if unique else 1


if __name__ == "__main__":
    raise SystemExit(main())
