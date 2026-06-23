#!/usr/bin/env python3
"""
Post-build script: rewrites all internal href paths in the static export
so they include the GitHub Pages basePath prefix.

This is needed because Next.js basePath doesn't apply to plain <a> tags
in static export output. Since our site is served from /website-private/,
internal links like <a href="/ai"> must become <a href="/website-private/ai">.
"""

import os, re, sys

OUT_DIR = "out"
BASE_PATH = "/website-private"

# Exclude these from rewriting — they're external or special
EXCLUDE_PREFIXES = [
    "http://", "https://", "#", "mailto:", "tel:", "data:", "javascript:",
    BASE_PATH,        # /website-private — already prefixed (with leading slash)
    "website-private",  # already prefixed (without leading slash — regex strips it)
    "/_next",         # handled by assetPrefix
]

def fix_hrefs(html_content):
    """Replace href="/X" with href="/website-private/X" for internal links."""
    def _replace(match):
        href = match.group(1)
        for prefix in EXCLUDE_PREFIXES:
            if href.startswith(prefix):
                return match.group(0)
        return f'href="{BASE_PATH}/{href}"'
    
    return re.sub(r'href="/([^"]*)"', _replace, html_content)


def main():
    if not os.path.isdir(OUT_DIR):
        print(f"❌ {OUT_DIR}/ not found. Run next build first.")
        sys.exit(1)

    count = 0
    for root, dirs, files in os.walk(OUT_DIR):
        for fname in files:
            if not fname.endswith(".html"):
                continue
            path = os.path.join(root, fname)
            original = open(path, "r", encoding="utf-8").read()
            fixed = fix_hrefs(original)
            if fixed != original:
                open(path, "w", encoding="utf-8").write(fixed)
                count += 1

    print(f"✓ {count} HTML files patched with basePath prefix")


if __name__ == "__main__":
    main()
