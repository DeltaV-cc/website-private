#!/usr/bin/env python3
"""
macro-pull.py — Generates macro-economic calendar JSON for the IntelHub.
Filters to major currencies only: USD, EUR, GBP, JPY, CHF, CNY.
Output: public/data/macro-calendar.json

Recurring events are date-computed every 6h via cron — always shows next 45 days.
"""

import json, os, sys
from datetime import datetime, date, timedelta

import pathlib
WEBSITE_DIR = str(pathlib.Path(__file__).resolve().parent.parent) if "scripts" in str(pathlib.Path(__file__).resolve()) else str(pathlib.Path(__file__).resolve().parent)
PUBLIC_DIR = os.path.join(WEBSITE_DIR, "public", "data")
OUT = os.path.join(PUBLIC_DIR, "macro-calendar.json")

def nth_weekday(year: int, month: int, weekday: int, n: int) -> date:
    """Return the nth occurrence of weekday in month (0=Mon, 6=Sun, n=1-based)."""
    first = date(year, month, 1)
    days_ahead = (weekday - first.weekday()) % 7
    return first + timedelta(days=days_ahead + (n - 1) * 7)

def last_weekday(year: int, month: int, weekday: int) -> date:
    """Return the last occurrence of weekday in month."""
    last_day = date(year, month + 1, 1) - timedelta(days=1) if month < 12 else date(year, 12, 31)
    days_back = (last_day.weekday() - weekday) % 7
    return last_day - timedelta(days=days_back)

def next_fomc(ref: date) -> date | None:
    fomc_2026 = [
        date(2026, 1, 28), date(2026, 3, 18), date(2026, 5, 6),
        date(2026, 6, 17), date(2026, 7, 29), date(2026, 9, 16),
        date(2026, 11, 4), date(2026, 12, 16),
    ]
    for d in fomc_2026:
        if d > ref: return d
    return None

def weekday_in_range(start: date, end: date, wd: int) -> list[date]:
    """Return all dates with a given weekday between start and end."""
    result = []
    d = start
    while d.weekday() != wd:
        d += timedelta(days=1)
    while d <= end:
        result.append(d)
        d += timedelta(days=7)
    return result

def gen_events(ref: date) -> list[dict]:
    events = []
    end = ref + timedelta(days=45)
    current = date(ref.year, ref.month, 1)

    while current <= end:
        y, m = current.year, current.month

        def add(d: date, label: str, ccy: str, impact: str, country: str):
            if d > ref and d <= end:
                events.append({"date": d.isoformat(), "label": label, "currency": ccy, "impact": impact, "country": country})

        # ── USD: Monthly ──
        add(nth_weekday(y, m, 4, 1), "US Non-Farm Payrolls", "USD", "high", "US")
        add(nth_weekday(y, m, 2, 2), "US CPI (MoM)", "USD", "high", "US")
        add(nth_weekday(y, m, 2, 2) + timedelta(days=2), "US PPI (MoM)", "USD", "medium", "US")
        retail = date(y, m, 15)
        if retail.weekday() >= 5: retail += timedelta(days=(7 - retail.weekday()))
        add(retail, "US Retail Sales (MoM)", "USD", "medium", "US")
        gdp = date(y, m, 27)
        if gdp.weekday() >= 5: gdp -= timedelta(days=gdp.weekday() - 4)
        add(gdp, "US GDP (QoQ advance)", "USD", "high", "US")
        add(nth_weekday(y, m, 1, 4), "US ISM Manufacturing PMI", "USD", "medium", "US")
        add(nth_weekday(y, m, 3, 3), "US ISM Services PMI", "USD", "medium", "US")
        add(last_weekday(y, m, 1), "US Consumer Confidence", "USD", "medium", "US")
        add(nth_weekday(y, m, 4, 3), "US Durable Goods Orders", "USD", "medium", "US")
        add(nth_weekday(y, m, 3, 4), "US New Home Sales", "USD", "low", "US")
        add(nth_weekday(y, m, 2, 4), "US Existing Home Sales", "USD", "low", "US")

        # ── USD: Weekly ──
        for thu in weekday_in_range(ref, end, 3):  # Thursday = 3
            add(thu, "US Initial Jobless Claims", "USD", "medium", "US")

        # ── USD: Treasury auctions (Wednesdays) ──
        for wed in weekday_in_range(ref, end, 2):
            if wed.day <= 7 or wed.day >= 22:
                add(wed, "US Treasury Auction", "USD", "low", "US")

        # ── EUR ──
        ecb_months = [1, 3, 4, 6, 7, 9, 10, 12]
        if m in ecb_months:
            add(nth_weekday(y, m, 3, 2), "ECB Rate Decision", "EUR", "high", "EU")
        add(nth_weekday(y, m, 4, 2), "EU CPI Flash (YoY)", "EUR", "high", "EU")
        add(nth_weekday(y, m, 3, 3), "EU GDP (QoQ flash)", "EUR", "medium", "EU")
        add(nth_weekday(y, m, 2, 4), "EU Industrial Production", "EUR", "low", "EU")

        # ── GBP ──
        boe_months = [2, 3, 5, 6, 8, 9, 11, 12]
        if m in boe_months:
            add(nth_weekday(y, m, 3, 3), "BoE Rate Decision", "GBP", "high", "UK")
        add(nth_weekday(y, m, 2, 3), "UK CPI (YoY)", "GBP", "high", "UK")
        add(nth_weekday(y, m, 4, 2), "UK GDP (MoM)", "GBP", "medium", "UK")
        add(nth_weekday(y, m, 1, 3), "UK Unemployment Rate", "GBP", "medium", "UK")

        # ── JPY ──
        boj_months = [1, 3, 4, 6, 7, 9, 10, 12]
        if m in boj_months:
            add(nth_weekday(y, m, 4, 3), "BoJ Rate Decision", "JPY", "high", "JP")
        add(nth_weekday(y, m, 4, 3), "Japan CPI (YoY)", "JPY", "medium", "JP")
        add(nth_weekday(y, m, 3, 2), "Japan GDP (QoQ)", "JPY", "medium", "JP")

        # ── CHF ──
        snb_months = [3, 6, 9, 12]
        if m in snb_months:
            add(nth_weekday(y, m, 3, 3), "SNB Rate Decision", "CHF", "high", "CH")
        add(nth_weekday(y, m, 2, 1), "Swiss CPI (YoY)", "CHF", "medium", "CH")

        # ── CNY ──
        pboc = date(y, m, 20)
        if pboc.weekday() >= 5: pboc += timedelta(days=(7 - pboc.weekday()))
        add(pboc, "PBoC Loan Prime Rate", "CNY", "high", "CN")
        cn_cpi = date(y, m, 9)
        if cn_cpi.weekday() >= 5: cn_cpi += timedelta(days=(7 - cn_cpi.weekday()))
        add(cn_cpi, "China CPI (YoY)", "CNY", "medium", "CN")
        add(date(y, m, 15), "China Industrial Production", "CNY", "medium", "CN")
        add(nth_weekday(y, m, 3, 4), "China Trade Balance", "CNY", "medium", "CN")

        # Advance to next month
        if m == 12: current = date(y + 1, 1, 1)
        else: current = date(y, m + 1, 1)

    # ── FOMC ──
    fomc = next_fomc(ref)
    if fomc:
        events.append({"date": fomc.isoformat(), "label": "FOMC Rate Decision", "currency": "USD", "impact": "high", "country": "US"})
        events.append({"date": (fomc + timedelta(days=21)).isoformat(), "label": "FOMC Meeting Minutes", "currency": "USD", "impact": "medium", "country": "US"})

    return events

def main():
    today = date.today()
    events = gen_events(today)

    # Dedupe by (date, label)
    seen = set()
    unique = []
    for e in events:
        key = (e["date"], e["label"])
        if key not in seen:
            seen.add(key)
            unique.append(e)

    unique.sort(key=lambda x: x["date"])
    cutoff = today + timedelta(days=45)
    upcoming = [e for e in unique if date.fromisoformat(e["date"]) <= cutoff]

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    payload = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "period": f"{today.isoformat()} → {cutoff.isoformat()}",
        "events": upcoming[:30],
    }

    with open(OUT, "w") as f:
        json.dump(payload, f, indent=2)

    print(f"macro-pull: wrote {len(upcoming)} events to {OUT}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
