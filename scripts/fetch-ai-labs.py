#!/usr/bin/env python3
"""Lab / research RSS → ai-labs.json (per-source cap so Google cannot dominate).

Hermes no_agent (6h bundle). Zero LLM tokens.
"""
from __future__ import annotations

import json
import os
import re
import ssl
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-AILabs/1.0)"
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Per-source cap. Google is prolific — hard-cap at 3.
FEEDS = [
    ("arXiv cs.AI", "https://rss.arxiv.org/rss/cs.AI", 4),
    ("arXiv cs.LG", "https://rss.arxiv.org/rss/cs.LG", 3),
    ("arXiv cs.CL", "https://rss.arxiv.org/rss/cs.CL", 3),
    ("Hugging Face Blog", "https://huggingface.co/blog/feed.xml", 4),
    ("OpenAI", "https://openai.com/news/rss.xml", 4),
    ("Google DeepMind", "https://www.deepmind.com/blog/rss.xml", 4),
    ("Google AI Blog", "https://blog.google/technology/ai/rss/", 3),
    ("NVIDIA AI", "https://blogs.nvidia.com/blog/category/deep-learning/feed/", 3),
    ("Meta Engineering", "https://engineering.fb.com/feed/", 3),
    ("Qwen (Alibaba)", "https://qwenlm.github.io/blog/index.xml", 4),
    ("EleutherAI", "https://blog.eleuther.ai/index.xml", 3),
    ("LessWrong", "https://www.lesswrong.com/feed.xml?view=curated-rss", 3),
    ("Alignment Forum", "https://www.alignmentforum.org/feed.xml", 3),
    ("Simon Willison", "https://simonwillison.net/atom/everything/", 3),
    ("Interconnects", "https://interconnects.ai/feed/", 3),
    ("Import AI", "https://jack-clark.net/feed/", 2),
]


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def strip_html(text: str) -> str:
    s = unescape(text or "")
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def fetch_text(url: str, timeout: int = 18) -> str | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, application/atom+xml, */*"})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            body = r.read(800_000)
            if body[:20].lstrip().lower().startswith(b"<!doctype") or body[:15].lstrip().lower().startswith(b"<html"):
                return None
            return body.decode("utf-8", "replace")
    except Exception as e:
        print(f"  ⚠ {url[:70]} → {e}", file=sys.stderr)
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
        pass
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00")).isoformat()
    except Exception:
        return raw


def parse_feed(xml: str, source: str, limit: int) -> list[dict]:
    items = []
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return []
    ns = {"atom": "http://www.w3.org/2005/Atom"}
    blocks = list(root.findall(".//item")) or list(root.findall(".//atom:entry", ns)) or list(root.findall(".//{http://www.w3.org/2005/Atom}entry"))
    for block in blocks:
        title = strip_html(
            (block.findtext("title") or block.findtext("{http://www.w3.org/2005/Atom}title") or "")
        )
        link = (block.findtext("link") or "").strip()
        if not link:
            el = block.find("link") or block.find("{http://www.w3.org/2005/Atom}link")
            if el is not None:
                link = (el.get("href") or (el.text or "")).strip()
        pub = (
            block.findtext("pubDate")
            or block.findtext("{http://www.w3.org/2005/Atom}updated")
            or block.findtext("{http://www.w3.org/2005/Atom}published")
            or ""
        )
        desc = strip_html(
            block.findtext("description")
            or block.findtext("{http://www.w3.org/2005/Atom}summary")
            or ""
        )[:280]
        if not title or not link:
            continue
        items.append({
            "title": title[:220],
            "url": link,
            "source": source,
            "published_at": parse_date(pub),
            "summary": desc,
            "tag": "ai",
        })
        if len(items) >= limit:
            break
    return items


def main() -> int:
    all_items: list[dict] = []
    for source, url, cap in FEEDS:
        xml = fetch_text(url)
        got = parse_feed(xml, source, cap) if xml else []
        print(f"  · {source}: {len(got)}")
        all_items.extend(got)

    seen = set()
    unique = []
    for it in all_items:
        k = (it["title"] or "").lower()[:80]
        if not k or k in seen:
            continue
        seen.add(k)
        unique.append(it)
    unique.sort(key=lambda it: it.get("published_at") or "", reverse=True)

    payload = {"updated": utc_now(), "items": unique[:40], "sources": [f[0] for f in FEEDS]}
    text = json.dumps(payload, indent=2, ensure_ascii=False)

    here = Path(__file__).resolve().parent.parent / "public" / "data" / "ai-labs.json"
    try:
        here.parent.mkdir(parents=True, exist_ok=True)
        here.write_text(text, encoding="utf-8")
    except Exception:
        pass
    ops = Path(os.environ.get("HERMES_CRON_WORKDIR") or "C:/Users/Admin/DeltaV-ops/website") / "public" / "data"
    try:
        ops.mkdir(parents=True, exist_ok=True)
        (ops / "ai-labs.json").write_text(text, encoding="utf-8")
    except Exception:
        pass

    try:
        from _gh_pages_push import push_data_files
        push_data_files({"ai-labs.json": text}, commit_prefix="data: ai-labs")
    except Exception as e:
        print(f"  ⚠ gh-pages: {e}", file=sys.stderr)

    print(f"✓ ai-labs.json {len(unique)} items")
    return 0 if unique else 1


if __name__ == "__main__":
    raise SystemExit(main())
