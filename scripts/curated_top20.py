#!/usr/bin/env python3
"""Derive the slim payload the homepage strip actually reads.

`CuratedIntel` downloads a feed file on every visit. Serving the full
~200-item snapshot for that costs ~120 KB per page view, so we write a
20-item file next to it.

This is not "first 20 of raw". Raw is a firehose (Tom's Hardware deals,
Science Daily, HN, nitter). The homepage copy promises high-signal AI /
Web3 / OpSec — so we score, cap per source, mix pillars, and strip RSS
HTML before writing.

Used by:
  - copy-data.py / preserve-live-data.py at site build
  - Hermes sync-intel-to-site.py on the 15-minute intel cron
"""
from __future__ import annotations

import html as html_lib
import json
import os
import re
from collections import defaultdict

FIELDS = ("title", "url", "source", "category", "published_at")
LIMIT = 20
FILENAME = "curated-top20.json"
PER_SOURCE_CAP = 2

# Title junk that makes the strip look like a shopping/blog dump.
NOISE_TITLE = re.compile(
    r"(?i)("
    r"save \$|just \$|for just|combo deal|discount on|"
    r"motherboard review|pc building|gaming build|"
    r"who is hiring|ask hn:|tell hn:|show hn:|"
    r"send their pee|beer drinkers|"
    r"mummies|crocodylian|coffee drinkers have less fat|"
    r"^blog review:"
    r")"
)

# Hardware deal/review sources — keep only when the title is actually a chip/AI/geopolitics story.
HARDWARE_BLOGS = {
    "tom's hardware",
    "tom’s hardware",
    "phoronix",
    "servethehome",
}
HARDWARE_KEEP = re.compile(
    r"(?i)(nvidia|tsmc|asml|foundry|semiconductor|hbm|export control|"
    r"lithography|wafer|chip|gpu|datacenter|quantum)"
)
HARDWARE_DROP = re.compile(
    r"(?i)(save \$|just \$|review:|combo|cooler for|ram, motherboard)"
)

# Always-keep publishers (homepage identity).
TIER1 = (
    "coindesk", "decrypt", "the block", "the defiant", "bankless",
    "mit technology review", "lesswrong", "alignment forum",
    "bleepingcomputer", "kreb", "cisa", "nist",
    "anthropic", "openai", "deepmind", "hugging face", "arxiv",
    "semiengineering", "hpcwire", "ieee spectrum",
    "simon willison", "the batch", "stanford hai",
    "vitalik", "ethereum foundation",
)

PILLAR_KW = {
    "AI": (
        "ai", "llm", "gpt", "claude", "model", "inference", "agent",
        "transformer", "deepseek", "openai", "anthropic", "hugging",
        "alignment", "rlhf", "gpu", "nvidia", "training", "benchmark",
    ),
    "Web3": (
        "bitcoin", "ethereum", "crypto", "defi", "stablecoin", "etf",
        "solana", "l2", "rollup", "dex", "on-chain", "validator",
        "zk", "mev", "tvl", "eth ", "btc",
    ),
    "OpSec": (
        "cve", "exploit", "ransomware", "breach", "phishing", "opsec",
        "vulnerability", "cisa", "malware", "zero-day", "0-day", "mfa",
        "hardening", "infosec", "patch",
    ),
    "Hardware": (
        "semiconductor", "tsmc", "foundry", "asml", "hbm", "chip",
        "wafer", "lithography", "quantum", "photonic", "gpu", "cpu",
    ),
}

TARGET_MIX = {"AI": 7, "Web3": 6, "OpSec": 4, "Hardware": 3}


def strip_html(text: str) -> str:
    if not text:
        return ""
    s = html_lib.unescape(str(text))
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"&[#a-zA-Z0-9]+;", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    # HN / RSS prefix artifacts: "pArticle URL: a href=..."
    s = re.sub(r"^(p)?Article URL:.*", "", s, flags=re.I).strip()
    s = re.sub(r"^p([A-Z])", r"\1", s)
    return s


def rewrite_nitter(url: str) -> str:
    if not url:
        return url
    m = re.search(r"nitter\.[^/]+/([^/]+)/status/(\d+)", url, re.I)
    if m:
        return f"https://x.com/{m.group(1)}/status/{m.group(2)}"
    return url


def pillar_of(title: str, source: str, summary: str = "") -> str:
    blob = f"{title} {source} {summary}".lower()
    src = (source or "").lower()
    scores = {}
    for cat, kws in PILLAR_KW.items():
        scores[cat] = sum(2 if k in blob else 0 for k in kws)
    if any(t in src for t in ("arxiv", "lesswrong", "alignment", "openai", "anthropic", "hugging", "deepmind")):
        scores["AI"] = scores.get("AI", 0) + 4
    if any(t in src for t in ("coindesk", "decrypt", "defiant", "bankless", "the block")):
        scores["Web3"] = scores.get("Web3", 0) + 4
    if any(t in src for t in ("bleeping", "kreb", "cisa", "dark reading", "the hacker news")):
        scores["OpSec"] = scores.get("OpSec", 0) + 4
    if any(t in src for t in ("hpcwire", "semiengineering", "ieee")):
        scores["Hardware"] = scores.get("Hardware", 0) + 3
    best = max(scores, key=scores.get) if scores else "AI"
    if scores.get(best, 0) <= 0:
        return "Intel"
    return best


def _is_x(source: str, url: str) -> bool:
    s = (source or "").lower()
    u = (url or "").lower()
    return s.startswith("x:") or "nitter" in s or "nitter." in u or "x.com/" in u


def score_item(it: dict) -> float:
    title = strip_html(it.get("title") or "")
    source = (it.get("source") or "").strip()
    url = it.get("url") or ""
    summary = strip_html(it.get("summary") or "")
    src_l = source.lower()

    if not title or not url:
        return -1
    if NOISE_TITLE.search(title):
        return -1
    if src_l in HARDWARE_BLOGS or "tom" in src_l and "hardware" in src_l:
        if HARDWARE_DROP.search(title) or not HARDWARE_KEEP.search(title):
            return -1
    if "science daily" in src_l and not re.search(r"(?i)(ai|chip|quantum|model|gpu)", title):
        return -1
    if _is_x(source, url):
        # Keep a few high-signal accounts; drop firehose.
        if not re.search(r"(?i)(karpathy|sama|vitalik|zachxbt|pcaversaccio|ylecun)", source):
            return -1

    score = 1.0
    if any(t in src_l for t in TIER1):
        score += 8
    cat = pillar_of(title, source, summary)
    if cat == "Intel":
        score -= 3
    else:
        score += 2
    # Recency is already encoded by input order (newest first) — slight bias
    # to earlier items so we don't only pick old tier-1.
    return score


def select(items: list, limit: int = LIMIT) -> list:
    ranked = []
    for it in items:
        if not isinstance(it, dict):
            continue
        s = score_item(it)
        if s < 0:
            continue
        ranked.append((s, it))
    ranked.sort(key=lambda x: -x[0])

    per_src = defaultdict(int)
    seen_title = set()
    mix = defaultdict(int)
    picked = []

    def take(it: dict, cat: str) -> bool:
        src = (it.get("source") or "").lower()
        if per_src[src] >= PER_SOURCE_CAP:
            return False
        norm = re.sub(r"[^a-z0-9]+", " ", strip_html(it.get("title") or "").lower())[:80]
        if norm in seen_title:
            return False
        per_src[src] += 1
        seen_title.add(norm)
        mix[cat] += 1
        picked.append(it)
        return True

    # Pass 1: fill mix targets from highest score.
    for s, it in ranked:
        if len(picked) >= limit:
            break
        cat = pillar_of(strip_html(it.get("title") or ""), it.get("source") or "", it.get("summary") or "")
        if mix[cat] >= TARGET_MIX.get(cat, 4) and cat != "Intel":
            continue
        take(it, cat)

    # Pass 2: fill remaining slots regardless of mix.
    if len(picked) < limit:
        have = {id(x) for x in picked}
        for s, it in ranked:
            if len(picked) >= limit:
                break
            if id(it) in have:
                continue
            cat = pillar_of(strip_html(it.get("title") or ""), it.get("source") or "", "")
            take(it, cat)

    slim = []
    for it in picked[:limit]:
        title = strip_html(it.get("title") or "")
        row = {
            "title": title,
            "url": rewrite_nitter(it.get("url") or ""),
            "source": it.get("source") or "",
            "category": it.get("category") or pillar_of(title, it.get("source") or ""),
            "published_at": it.get("published_at") or "",
        }
        slim.append({k: row[k] for k in FIELDS if row.get(k)})
    return slim


def derive(raw_path, out_dir=None):
    """Write FILENAME beside raw_path (or into out_dir). Returns the item count, or None if it could not be built."""
    try:
        with open(raw_path, "r", encoding="utf-8") as f:
            raw = json.load(f)
    except (OSError, ValueError) as exc:
        print(f"[warn] {FILENAME} not derived: {exc}")
        return None

    items = raw if isinstance(raw, list) else raw.get("items", [])
    slim = select(items, LIMIT)

    target_dir = out_dir if out_dir else os.path.dirname(raw_path)
    out_path = os.path.join(str(target_dir), FILENAME)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(slim, f, ensure_ascii=False)

    try:
        saved = os.path.getsize(raw_path) - os.path.getsize(out_path)
        print(f"[ok] {FILENAME}: {len(slim)} items ({max(saved, 0) // 1024} KB lighter than raw-items.json)")
    except OSError:
        print(f"[ok] {FILENAME}: {len(slim)} items")
    return len(slim)


if __name__ == "__main__":
    import sys
    derive(sys.argv[1] if len(sys.argv) > 1 else "public/data/raw-items.json")
