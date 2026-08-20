#!/usr/bin/env python3
"""
Select a deploy target in site.config.json before a build.

The site ships to two hosts with different path shapes:

  ghpages     deltavgit.github.io/website-private   basePath "/website-private"
  cloudflare  deltav.cc                             basePath "" (root domain)

Everything that needs those values — next.config.ts, lib/site.ts,
scripts/_site_config.py — reads the TOP-LEVEL basePath/siteUrl of
site.config.json. This script copies the chosen target's values up to the
top level so the whole build agrees, with no parallel env-var code path.

Only ever run this in CI or a throwaway checkout: it rewrites a tracked file.

    python3 scripts/set-deploy-target.py cloudflare
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parent.parent / "site.config.json"

# Keys copied from the target entry up to the top level. `notes` is
# per-target documentation and deliberately stays out of this list.
PROMOTED_KEYS = ("basePath", "siteUrl")


def main() -> int:
    if len(sys.argv) != 2:
        print(f"usage: {sys.argv[0]} <target>", file=sys.stderr)
        return 2

    target = sys.argv[1]

    with CONFIG_PATH.open(encoding="utf-8") as fh:
        config = json.load(fh)

    targets = config.get("targets") or {}
    if target not in targets:
        known = ", ".join(sorted(targets)) or "(none defined)"
        print(
            f"unknown deploy target {target!r}; known targets: {known}",
            file=sys.stderr,
        )
        return 1

    entry = targets[target]
    for key in PROMOTED_KEYS:
        if key not in entry:
            print(
                f"target {target!r} is missing required key {key!r}",
                file=sys.stderr,
            )
            return 1
        config[key] = entry[key]

    with CONFIG_PATH.open("w", encoding="utf-8") as fh:
        # ensure_ascii=False so em-dashes in the notes survive the round-trip
        # as themselves rather than turning into — escapes.
        json.dump(config, fh, indent=2, ensure_ascii=False)
        fh.write("\n")

    base = config["basePath"] or "(root)"
    print(f"deploy target: {target} — basePath {base}, siteUrl {config['siteUrl']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
