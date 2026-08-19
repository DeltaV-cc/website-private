#!/usr/bin/env python3
"""HF abliterated / uncensored models, tagged for local / cybersecurity / film.

Writes public/data/hf-abliterated.json and pushes gh-pages.
Hermes no_agent (6h bundle). Zero LLM tokens.
"""
from __future__ import annotations

import json
import math
import os
import re
import ssl
import sys
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-Abliterated/1.1)"
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Curated recs — fetched by id so a noisy search cannot empty a lane.
CURATED = {
    "local": [
        "huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF",
        "0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF",
        "huihui-ai/Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF",
        "huihui-ai/Huihui-GLM-5.2-abliterated-GGUF",
        "SC117/Ling-3.0-tiny-abliterated-APEX-GGUF",
    ],
    "cybersecurity": [
        "0bserverx/Qwen3.8-27B-Heretic-Abliterated-Uncensored-GGUF",
        "huihui-ai/Huihui-Qwen3.8-27B-abliterated",
        "TheBloke/WhiteRabbitNeo-33B-v1-GGUF",
        "WhiteRabbitNeo/WhiteRabbitNeo-V3",
    ],
    "film": [
        "Blackfrost-AI/Muse-Glimmer-30B-Abliterated-GGUF",
        "Lightricks/LTX-Video",
        "Wan-AI/Wan2.1-T2V-14B",
        "Wan-AI/Wan2.2-I2V-A14B",
        "tencent/HunyuanVideo",
        "black-forest-labs/FLUX.1-dev",
        "Qwen/Qwen-Image",
    ],
}

WHY = {
    "local": "GGUF / workstation-sized uncensored checkpoint — llama.cpp, LM Studio, Ollama",
    "cybersecurity": "Refusal-removed / heretic — red-team, jailbreak eval, uncensored research",
    "film": "Image / video / creative generation — local film & VFX pipelines",
}

FILM_RE = re.compile(
    r"(video|i2v|t2v|flux|wan|ltx|hunyuan|cogvideo|muse|glimmer|kolors|"
    r"diffusion|cinema|animate|image-edit|text-to-image|text-to-video|image-to-video)",
    re.I,
)
CYBER_RE = re.compile(
    r"(heretic|jailbreak|uncensor|pentest|cyber|red.?team|whiterabbit|abliterat)",
    re.I,
)
LOCAL_RE = re.compile(
    r"(gguf|q4_|q5_|q8_|mlx|exl2|awq|llama\.cpp|\b7b\b|\b8b\b|\b9b\b|\b12b\b|"
    r"\b14b\b|\b24b\b|\b27b\b|\b30b\b|\b32b\b|tiny|small)",
    re.I,
)
STRIP_FAMILY = re.compile(
    r"(huihui-|_abliterated|_uncensored|-abliterated.*|-uncensored.*|-heretic.*|"
    r"-gguf.*|-awq.*|-nvfp4.*|-bf16.*|-i1.*|-mtp.*|-optimized.*)$",
    re.I,
)


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def fetch_json(url: str, timeout: int = 20):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ {url[:80]} → {e}", file=sys.stderr)
        return None


def family_key(mid: str) -> str:
    name = (mid or "").split("/")[-1]
    name = STRIP_FAMILY.sub("", name)
    name = re.sub(r"[-_]+", "-", name).strip("-").lower()
    return name or (mid or "").lower()


def row_from_api(m: dict, mid: str | None = None) -> dict | None:
    rid = mid or m.get("id") or m.get("modelId") or m.get("name") or ""
    if not rid or "/" not in rid:
        return None
    author, short = rid.split("/", 1)
    last = m.get("lastModified") or m.get("createdAt")
    days = None
    if last:
        try:
            days = max(0, int((time.time() - datetime.fromisoformat(str(last).replace("Z", "+00:00")).timestamp()) / 86400))
        except Exception:
            days = None
    pipe = (m.get("pipeline_tag") or m.get("pipeline") or "").lower()
    tags = m.get("tags") or []
    return {
        "id": rid,
        "name": short,
        "author": author,
        "likes": m.get("likes") or 0,
        "downloads": m.get("downloads") or 0,
        "url": f"https://huggingface.co/{rid}",
        "pipeline": pipe,
        "tags": tags if isinstance(tags, list) else [],
        "lastModified": last,
        "daysAgo": days,
        "family": family_key(rid),
    }


def uses_for(row: dict) -> list[str]:
    blob = f"{row.get('id','')} {row.get('name','')} {row.get('pipeline','')} {' '.join(row.get('tags') or [])}"
    pipe = (row.get("pipeline") or "").lower()
    uses = []
    if FILM_RE.search(blob) or pipe in (
        "text-to-image", "text-to-video", "image-to-video", "image-to-image", "image-text-to-image",
    ):
        uses.append("film")
    if CYBER_RE.search(blob) and "film" not in uses:
        uses.append("cybersecurity")
    if LOCAL_RE.search(blob) or "gguf" in blob.lower():
        uses.append("local")
    if not uses and "abliterat" in blob.lower():
        uses.append("local")
        uses.append("cybersecurity")
    return uses


def search_models(q: str, extra: str = "", limit: int = 40) -> list[dict]:
    url = f"https://huggingface.co/api/models?search={urllib.request.quote(q)}&limit={limit}&full=true&sort=downloads{extra}"
    data = fetch_json(url)
    out = []
    if isinstance(data, list):
        for m in data:
            row = row_from_api(m)
            if row:
                out.append(row)
    return out


def fetch_id(mid: str) -> dict | None:
    d = fetch_json(f"https://huggingface.co/api/models/{mid}")
    if not isinstance(d, dict):
        return None
    return row_from_api(d, mid)


def rank(rows: list[dict]) -> list[dict]:
    if not rows:
        return []
    max_pop = max(1.0, max(math.log10(r["downloads"] + 1) for r in rows))
    scored = []
    for r in rows:
        pop = math.log10(r["downloads"] + 1) / max_pop
        rec = 0.2 if r.get("daysAgo") is None else 1 / (1 + r["daysAgo"] / 30)
        scored.append({**r, "pop": round(pop, 4), "rec": round(rec, 4), "combo": round(0.65 * pop + 0.35 * rec, 4)})
    scored.sort(key=lambda r: r["combo"], reverse=True)
    return scored


def unique_families(rows: list[dict], limit: int) -> list[dict]:
    seen = set()
    out = []
    for r in rows:
        k = r.get("family") or r["id"]
        if k in seen:
            continue
        seen.add(k)
        out.append(r)
        if len(out) >= limit:
            break
    return out


def main() -> int:
    found: dict[str, dict] = {}

    for q, extra in (
        ("abliterated", ""),
        ("heretic abliterated", ""),
        ("uncensored", "&pipeline_tag=text-generation"),
        ("uncensored", "&pipeline_tag=text-to-video"),
        ("uncensored", "&pipeline_tag=text-to-image"),
        ("uncensored", "&pipeline_tag=image-to-video"),
        ("LTX-Video", ""),
        ("HunyuanVideo", ""),
        ("Wan2.1", ""),
    ):
        print(f"  · search {q} {extra}")
        for row in search_models(q, extra):
            found[row["id"]] = row
        time.sleep(0.25)

    for use, ids in CURATED.items():
        for mid in ids:
            if mid in found:
                continue
            row = fetch_id(mid)
            if row:
                found[row["id"]] = row
            time.sleep(0.15)

    all_rows = rank(list(found.values()))
    for r in all_rows:
        r["uses"] = uses_for(r)

    by_use = {k: [] for k in ("local", "cybersecurity", "film")}
    # Seed curated first (stable recs), then fill from ranked unique families.
    for use, ids in CURATED.items():
        for mid in ids:
            row = found.get(mid)
            if not row:
                continue
            if row["id"] not in {x["id"] for x in by_use[use]}:
                by_use[use].append({**row, "why": WHY[use], "recommended": True})
        for row in unique_families([r for r in all_rows if use in r.get("uses", [])], 8):
            if row["id"] not in {x["id"] for x in by_use[use]}:
                by_use[use].append({**row, "why": WHY[use], "recommended": False})
        by_use[use] = by_use[use][:8]

    trending = unique_families(all_rows, 10)
    payload = {
        "updated": utc_now(),
        "rank": "popularity (log downloads) × recency (30d half-life); families deduped",
        "models": trending,  # back-compat with current UI
        "trending": trending,
        "by_use": by_use,
    }

    text = json.dumps(payload, indent=2)
    # Local snapshot next to website checkout if present
    here = Path(__file__).resolve().parent.parent
    local = here / "public" / "data" / "hf-abliterated.json"
    try:
        local.parent.mkdir(parents=True, exist_ok=True)
        local.write_text(text, encoding="utf-8")
        print(f"  ✓ local {local}")
    except Exception as e:
        print(f"  · local skip: {e}")

    ops = Path(os.environ.get("HERMES_CRON_WORKDIR") or "C:/Users/Admin/DeltaV-ops/website") / "public" / "data"
    try:
        ops.mkdir(parents=True, exist_ok=True)
        (ops / "hf-abliterated.json").write_text(text, encoding="utf-8")
    except Exception:
        pass

    try:
        from _gh_pages_push import push_data_files
        push_data_files({"hf-abliterated.json": text}, commit_prefix="data: abliterated")
    except Exception as e:
        print(f"  ⚠ gh-pages: {e}", file=sys.stderr)

    print(f"✓ abliterated trending={len(trending)} local={len(by_use['local'])} cyber={len(by_use['cybersecurity'])} film={len(by_use['film'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
