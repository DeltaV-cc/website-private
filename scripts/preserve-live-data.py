#!/usr/bin/env python3
"""
Before publishing out/ → gh-pages, overlay LIVE data/*.json from the current
gh-pages branch so a full HTML deploy never rolls intel/market JSON backwards.

Layer 0 crons (refresh-data, sync-intel-to-site) are the SSOT for data/*.
Site builds own HTML only; they must not clobber fresher cron payloads.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


REPO = os.environ.get("GITHUB_REPOSITORY", "DeltaV-cc/website-private")
BRANCH = "gh-pages"
# Prefer HTTPS for Actions
CLONE_URL = f"https://github.com/{REPO}.git"


def parse_dt(raw: str) -> datetime:
    if not raw:
        return datetime.min.replace(tzinfo=timezone.utc)
    s = raw.strip().replace("Z", "+00:00")
    try:
        d = datetime.fromisoformat(s)
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        return d
    except ValueError:
        pass
    for fmt in (
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S GMT",
        "%Y-%m-%dT%H:%M:%S.%f",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d",
    ):
        try:
            d = datetime.strptime(s[:31], fmt)
            if d.tzinfo is None:
                d = d.replace(tzinfo=timezone.utc)
            return d
        except ValueError:
            continue
    return datetime.min.replace(tzinfo=timezone.utc)


# Intel / Layer-0 files: always prefer non-empty live over empty build.
INTEL_ALWAYS_LIVE = {
    "raw-items.json",
    "picks.json",
    "artemis-newsletter.json",
    "artemis-research.json",
}


def is_effectively_empty(path: Path) -> bool:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return True
    if data is None:
        return True
    if isinstance(data, list):
        return len(data) == 0
    if isinstance(data, dict):
        if "picks" in data and isinstance(data["picks"], list):
            return len(data["picks"]) == 0 and not data.get("updatedAt")
        if not data:
            return True
    return False


def freshness_score(path: Path) -> datetime:
    """Best-effort 'how new is this JSON file' for conflict resolution."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return datetime.min.replace(tzinfo=timezone.utc)

    if isinstance(data, dict):
        for key in ("fetched_at", "updatedAt", "updated_at", "generated_at", "timestamp"):
            if data.get(key):
                return parse_dt(str(data[key]))
        lw = data.get("latest_weekly") or {}
        if isinstance(lw, dict) and lw.get("date"):
            return parse_dt(str(lw["date"]))
    if isinstance(data, list) and data:
        # raw-items: first item is newest
        item = data[0]
        if isinstance(item, dict):
            for key in ("published_at", "date", "pubDate"):
                if item.get(key):
                    return parse_dt(str(item[key]))
    try:
        return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    except OSError:
        return datetime.min.replace(tzinfo=timezone.utc)


def main() -> int:
    out_data = Path(sys.argv[1] if len(sys.argv) > 1 else "out/data")
    out_data.mkdir(parents=True, exist_ok=True)

    tmp = tempfile.mkdtemp(prefix="preserve-ghp-")
    try:
        r = subprocess.run(
            ["git", "clone", "--depth", "1", "--branch", BRANCH, CLONE_URL, tmp],
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            print(f"WARN: could not clone {BRANCH}: {r.stderr.strip()}", file=sys.stderr)
            print("Continuing with build data only.")
            return 0

        live = Path(tmp) / "data"
        if not live.is_dir():
            print("WARN: no data/ on gh-pages yet")
            return 0

        kept, skipped, added = 0, 0, 0
        for src in sorted(live.glob("*.json")):
            dst = out_data / src.name
            if not dst.exists():
                shutil.copy2(src, dst)
                added += 1
                print(f"  + {src.name} (from live gh-pages)")
                continue

            # Never replace non-empty live intel with empty build snapshots
            if src.name in INTEL_ALWAYS_LIVE and not is_effectively_empty(src):
                if is_effectively_empty(dst) or freshness_score(src) >= freshness_score(dst):
                    shutil.copy2(src, dst)
                    kept += 1
                    print(f"  ✓ {src.name} kept LIVE (intel SSOT, non-empty)")
                    continue

            live_t = freshness_score(src)
            build_t = freshness_score(dst)
            # Live wins on tie or newer — cron is SSOT
            if live_t >= build_t and not is_effectively_empty(src):
                shutil.copy2(src, dst)
                kept += 1
                print(f"  ✓ {src.name} kept LIVE ({live_t.isoformat()} ≥ build {build_t.isoformat()})")
            elif is_effectively_empty(dst) and not is_effectively_empty(src):
                shutil.copy2(src, dst)
                kept += 1
                print(f"  ✓ {src.name} kept LIVE (build was empty)")
            else:
                skipped += 1
                print(f"  · {src.name} kept BUILD ({build_t.isoformat()} > live {live_t.isoformat()})")

        print(f"preserve-live-data: kept_live={kept} kept_build={skipped} added={added}")
        # The homepage strip reads a slim derivative of raw-items.json. Rebuild
        # it here so it always matches whichever snapshot won above.
        raw = out_data / "raw-items.json"
        if raw.exists():
            sys.path.insert(0, str(Path(__file__).parent))
            from curated_top20 import derive as derive_top20
            derive_top20(str(raw), str(out_data))
        return 0
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
