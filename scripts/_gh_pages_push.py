#!/usr/bin/env python3
"""Shared gh-pages data/* push for Hermes no_agent scripts (no secrets)."""
from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
import time
from pathlib import Path


def push_data_files(
    files: dict[str, str],
    *,
    repo: str | None = None,
    branch: str = "gh-pages",
    commit_prefix: str = "data:",
) -> list[str]:
    """
    files: { 'etf-flows.json': '<json string>', ... }
    Returns list of changed filenames pushed (may be empty).
    """
    if not files:
        return []
    repo = repo or os.environ.get(
        "DASHBOARD_DATA_REPO", "https://github.com/deltaVgit/website-private.git"
    )
    tmpdir = tempfile.mkdtemp(prefix="dv-data-push-")
    try:
        subprocess.run(
            ["git", "clone", "--depth", "1", "--branch", branch, repo, tmpdir],
            check=True,
            capture_output=True,
            timeout=90,
        )
        changed: list[str] = []
        for name, content in files.items():
            dest = Path(tmpdir) / "data" / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            old = dest.read_text(encoding="utf-8") if dest.exists() else None
            if old != content:
                dest.write_text(content, encoding="utf-8")
                changed.append(name)
        if not changed:
            print("  · no gh-pages data changes")
            return []

        git_email = os.environ.get("DASHBOARD_GIT_EMAIL", "noreply@deltav.cc")
        git_name = os.environ.get("DASHBOARD_GIT_NAME", "Delta V Bot")
        subprocess.run(["git", "-C", tmpdir, "config", "user.email", git_email], check=True)
        subprocess.run(["git", "-C", tmpdir, "config", "user.name", git_name], check=True)
        subprocess.run(
            ["git", "-C", tmpdir, "add"] + [f"data/{n}" for n in changed],
            check=True,
        )
        msg = f"{commit_prefix} {time.strftime('%H:%M')} ({', '.join(changed)})"
        subprocess.run(["git", "-C", tmpdir, "commit", "-m", msg], check=True)

        for attempt in range(3):
            try:
                subprocess.run(
                    ["git", "-C", tmpdir, "push", "--force-with-lease", "origin", branch],
                    check=True,
                    capture_output=True,
                    timeout=60,
                )
                print(f"✓ gh-pages pushed: {', '.join(changed)}")
                return changed
            except subprocess.CalledProcessError:
                if attempt >= 2:
                    print("  ⚠ gh-pages push failed", flush=True)
                    return []
                # Hard reset to origin, then rewrite only data/*. A --soft
                # reset kept the stale clone's HTML tree and the next commit
                # wiped newly deployed pages (FR course, 2026-08-19).
                subprocess.run(
                    ["git", "-C", tmpdir, "fetch", "origin", branch],
                    capture_output=True,
                    timeout=30,
                )
                subprocess.run(
                    ["git", "-C", tmpdir, "reset", "--hard", f"origin/{branch}"],
                    capture_output=True,
                )
                for name in changed:
                    dest = Path(tmpdir) / "data" / name
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_text(files[name], encoding="utf-8")
                subprocess.run(
                    ["git", "-C", tmpdir, "add"] + [f"data/{n}" for n in changed],
                    check=True,
                )
                subprocess.run(
                    ["git", "-C", tmpdir, "commit", "-m", f"{msg} (retry {attempt+2})"],
                    capture_output=True,
                )
        return changed
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)
