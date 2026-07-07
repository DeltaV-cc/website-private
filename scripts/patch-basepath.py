#!/usr/bin/env python3
"""
Post-build script: rewrites all internal paths in the static export
so they include the GitHub Pages basePath prefix.

Fixes both <a href> in HTML and absolute paths in JS (fetch, import, etc.)
Also handles Turbopack's escaped double-quote output: \"/data/...\"
"""

import os, re, sys

OUT_DIR = "out"
BASE_PATH = "/website-private"

EXCLUDE_PREFIX = [
    "http://", "https://", "#", "mailto:", "tel:", "data:", "javascript:",
    BASE_PATH,
    "website-private",
    "/_next",
    "/__next",
]

def should_skip(path):
    for p in EXCLUDE_PREFIX:
        if path.startswith(p):
            return True
    return False

def fix_html(content):
    def repl(m):
        href = m.group(1)
        if should_skip(href):
            return m.group(0)
        # Add basePath
        new_href = f'{BASE_PATH}/{href}'
        # Add trailing slash for internal routes (no file extension, not empty, not already ending with /)
        if new_href != f'{BASE_PATH}/' and '/' not in new_href.rsplit('/', 1)[-1] and not new_href.endswith('/'):
            new_href += '/'
        return f'href="{new_href}"'
    return re.sub(r'href="/([^"]*)"', repl, content)

def fix_js(content):
    # 1) escaped double-quoted paths: Turbopack outputs \" /data/... \"
    #    Pattern in raw bytes: backslash + double-quote + / + path + backslash + double-quote
    def repl_edq(m):
        p = m.group(1)
        return m.group(0) if should_skip(p) else '\\"/{}/{}\\"'.format(BASE_PATH[1:], p)
    # Regex: \\ matches literal backslash, \" matches literal double-quote
    content = re.sub(r'\\"/\s*([a-zA-Z0-9_./-]+)\\"', repl_edq, content)

    # 2) plain double-quoted paths like "/data/..."
    def repl_dq(m):
        p = m.group(1)
        return m.group(0) if should_skip(p) else f'"/{BASE_PATH[1:]}/{p}"'
    content = re.sub(r'"/\s*([a-zA-Z0-9_./-]+)"', repl_dq, content)

    # 3) single-quoted paths like '/data/...'
    def repl_sq(m):
        p = m.group(1)
        return m.group(0) if should_skip(p) else f"'/{BASE_PATH[1:]}/{p}'"
    content = re.sub(r"'/\s*([a-zA-Z0-9_./-]+)'", repl_sq, content)

    return content

def main():
    if not os.path.isdir(OUT_DIR):
        print(f"out/ not found. Run next build first.")
        sys.exit(1)

    html_count = 0
    js_count = 0
    for root, dirs, files in os.walk(OUT_DIR):
        for fname in files:
            path = os.path.join(root, fname)
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                original = f.read()

            if fname.endswith(".html"):
                fixed = fix_html(original)
            elif fname.endswith(".js"):
                fixed = fix_js(original)
            else:
                continue

            if fixed != original:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(fixed)
                if fname.endswith(".html"):
                    html_count += 1
                else:
                    js_count += 1

    print(f"{html_count} HTML + {js_count} JS files patched")


if __name__ == "__main__":
    main()
