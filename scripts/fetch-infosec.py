#!/usr/bin/env python3
"""Fresh Infosec snapshots — CISA KEV, recent HIGH/CRITICAL CVEs, recent HIBP, news watchlist.

NVD without a date window returns CVE-1999. HIBP without a sort returns 000webhost 2015.
This writer is the SSOT so the dashboard never falls back to museum data.
"""
from __future__ import annotations

import json
import os
import re
import ssl
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

USER_AGENT = "Mozilla/5.0 (compatible; DeltaV-Infosec/1.1)"
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

NEWS_FEEDS = [
    ("BleepingComputer", "https://www.bleepingcomputer.com/feed/"),
    ("Krebs on Security", "https://krebsonsecurity.com/feed/"),
    ("Dark Reading", "https://www.darkreading.com/rss.xml"),
    ("The Hacker News", "https://feeds.feedburner.com/TheHackersNews"),
    ("CISA Advisories", "https://www.cisa.gov/cybersecurity-advisories/all.xml"),
]


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def fetch_json(url: str, timeout: int = 25):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        print(f"  ⚠ {url[:80]} → {e}", file=sys.stderr)
        return None


def fetch_text(url: str, timeout: int = 18) -> str | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, */*"})
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            body = r.read(600_000)
            if body[:20].lstrip().lower().startswith(b"<!doctype") or body[:6].lstrip().lower().startswith(b"<html"):
                return None
            return body.decode("utf-8", "replace")
    except Exception as e:
        print(f"  ⚠ {url[:70]} → {e}", file=sys.stderr)
        return None


def strip_html(text: str) -> str:
    s = unescape(text or "")
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def parse_iso(raw: str) -> datetime | None:
    if not raw:
        return None
    s = raw.strip().replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(s[:32])
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except Exception:
        return None


def kev_rows(data: dict, limit: int = 12) -> list[dict]:
    rows = []
    for v in data.get("vulnerabilities") or []:
        rows.append({
            "cve": v.get("cveID") or "",
            "product": (v.get("product") or "").strip(),
            "vendor": v.get("vendorProject") or "",
            "name": v.get("vulnerabilityName") or "",
            "dateAdded": v.get("dateAdded") or "",
            "dueDate": v.get("dueDate") or "",
            "knownRansomware": v.get("knownRansomwareCampaignUse") or "",
        })
    rows.sort(key=lambda r: r.get("dateAdded") or "", reverse=True)
    return [r for r in rows if r.get("cve")][:limit]


def cve_rows(data: dict, limit: int = 12) -> list[dict]:
    out = []
    cutoff = datetime.now(timezone.utc) - timedelta(days=400)
    for v in data.get("vulnerabilities") or []:
        cve = v.get("cve") or {}
        metrics = cve.get("metrics") or {}
        cvss = {}
        for key in ("cvssMetricV31", "cvssMetricV40", "cvssMetricV30", "cvssMetricV2"):
            arr = metrics.get(key) or []
            if arr and isinstance(arr[0], dict):
                cvss = arr[0].get("cvssData") or {}
                if cvss:
                    break
        desc = next((d.get("value") or "" for d in (cve.get("descriptions") or []) if d.get("lang") == "en"), "")
        published = cve.get("published") or ""
        dt = parse_iso(published)
        score = float(cvss.get("baseScore") or 0)
        sev = (cvss.get("baseSeverity") or "N/A").upper()
        if score < 7 and sev not in ("HIGH", "CRITICAL"):
            continue
        if dt and dt < cutoff:
            continue
        out.append({
            "id": cve.get("id") or "",
            "severity": sev if sev != "N/A" else ("CRITICAL" if score >= 9 else "HIGH" if score >= 7 else "N/A"),
            "score": score,
            "description": strip_html(desc)[:220],
            "published": published,
        })
    out.sort(key=lambda r: (r.get("published") or ""), reverse=True)
    # Prefer CRITICAL, then recency
    out.sort(key=lambda r: (0 if r["severity"] == "CRITICAL" else 1, -(r.get("score") or 0)))
    return [r for r in out if r.get("id")][:limit]


def breach_rows(data: list, limit: int = 12) -> list[dict]:
    cutoff = (datetime.now(timezone.utc) - timedelta(days=800)).date().isoformat()
    rows = []
    for b in data:
        date = b.get("BreachDate") or ""
        if date and date < cutoff:
            continue
        rows.append({
            "name": b.get("Name") or b.get("Title") or "",
            "domain": b.get("Domain") or "",
            "date": date,
            "count": b.get("PwnCount") or 0,
            "data": ", ".join((b.get("DataClasses") or [])[:5]),
        })
    rows.sort(key=lambda r: r.get("date") or "", reverse=True)
    return [r for r in rows if r.get("name")][:limit]


def watchlist_rows() -> list[dict]:
    items = []
    for source, url in NEWS_FEEDS:
        xml = fetch_text(url)
        if not xml:
            continue
        try:
            root = ET.fromstring(xml)
        except ET.ParseError:
            continue
        n = 0
        for block in root.findall(".//item"):
            title = strip_html(block.findtext("title") or "")
            link = (block.findtext("link") or "").strip()
            pub = block.findtext("pubDate") or ""
            desc = strip_html(block.findtext("description") or "")[:220]
            if not title or not link:
                continue
            try:
                dt = parsedate_to_datetime(pub)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                iso = dt.astimezone(timezone.utc).isoformat()
            except Exception:
                iso = utc_now()
            items.append({
                "title": title[:220],
                "url": link,
                "source": source,
                "summary": desc,
                "added": iso,
                "expires": (datetime.now(timezone.utc) + timedelta(days=14)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            })
            n += 1
            if n >= 5:
                break
        print(f"  · watch {source}: {n}")
    seen = set()
    unique = []
    for it in items:
        k = (it["title"] or "").lower()[:80]
        if k in seen:
            continue
        seen.add(k)
        unique.append(it)
    unique.sort(key=lambda r: r.get("added") or "", reverse=True)
    return unique[:16]


def main() -> int:
    now = datetime.now(timezone.utc)
    start = (now - timedelta(days=10)).strftime("%Y-%m-%dT00:00:00.000")
    end = now.strftime("%Y-%m-%dT23:59:59.999")

    kev = []
    cisa = fetch_json("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json")
    if isinstance(cisa, dict):
        kev = kev_rows(cisa, 14)
        print(f"  · KEV {len(kev)} newest")

    nvd = fetch_json(
        "https://services.nvd.nist.gov/rest/json/cves/2.0"
        f"?pubStartDate={start}&pubEndDate={end}&resultsPerPage=40"
    )
    cves = cve_rows(nvd, 12) if isinstance(nvd, dict) else []
    print(f"  · CVE {len(cves)} HIGH/CRIT last 10d")

    hibp = fetch_json("https://haveibeenpwned.com/api/v3/breaches")
    breaches = breach_rows(hibp, 12) if isinstance(hibp, list) else []
    print(f"  · HIBP {len(breaches)} recent")

    watch = watchlist_rows()
    print(f"  · watchlist {len(watch)}")

    infosec = {
        "updatedAt": utc_now(),
        "kev": kev,
        "cves": cves,
        "breaches": breaches,
    }
    watch_text = json.dumps(watch, indent=2, ensure_ascii=False)
    infosec_text = json.dumps(infosec, indent=2, ensure_ascii=False)

    here = Path(__file__).resolve().parent.parent / "public" / "data"
    ops = Path(os.environ.get("HERMES_CRON_WORKDIR") or "C:/Users/Admin/DeltaV-ops/website") / "public" / "data"
    for dest in (here, ops):
        try:
            dest.mkdir(parents=True, exist_ok=True)
            (dest / "infosec.json").write_text(infosec_text, encoding="utf-8")
            (dest / "cybersec-watchlist.json").write_text(watch_text, encoding="utf-8")
        except Exception:
            pass

    try:
        from _gh_pages_push import push_data_files
        push_data_files(
            {"infosec.json": infosec_text, "cybersec-watchlist.json": watch_text},
            commit_prefix="data: infosec",
        )
    except Exception as e:
        print(f"  ⚠ gh-pages: {e}", file=sys.stderr)

    ok = bool(kev or cves or breaches)
    print(f"✓ infosec kev={len(kev)} cves={len(cves)} breaches={len(breaches)} watch={len(watch)}")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
