#!/usr/bin/env python3
"""Load deploy constants from site.config.json (single source of truth)."""
from __future__ import annotations

import json
from pathlib import Path

_ROOT = Path(__file__).resolve().parent.parent
_CONFIG_PATH = _ROOT / "site.config.json"


def load_site_config() -> dict:
    with _CONFIG_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)


def base_path() -> str:
    return str(load_site_config().get("basePath") or "")


def site_url() -> str:
    return str(load_site_config().get("siteUrl") or "").rstrip("/")


def repo_url() -> str:
    return str(load_site_config().get("repoUrl") or "")
