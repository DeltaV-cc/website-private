#!/usr/bin/env python3
"""
macro-pull.py — Generates macro-economic calendar JSON for the IntelHub.
Filters to major currencies only: USD, EUR, GBP, JPY, CHF, CNY.
Output: public/data/macro-calendar.json

Recurring events are date-computed. Manual overrides in EVENTS override list.
Runs every 6h via cron — always shows next 30 days of events.
"""

import json, os, sys
from datetime import datetime, date, timedelta

# Paths — resolve from website root, not script location
import pathlib
WEBSITE_DIR = str(pathlib.Path(__file__).resolve().parent.parent) if "scripts" in str(pathlib.Path(__file__).resolve()) else str(pathlib.Path(__file__).resolve().parent)
PUBLIC_DIR = os.path.join(WEBSITE_DIR, "public", "data")
OUT = os.path.join(PUBLIC_DIR, "macro-calendar.json")

# ── Recurring events (date-computed) ──
# Format: (label, schedule_rule, currency, impact, country)
# schedule_rule: "monthly:N" = Nth occurrence of weekday, "fixed:DD" = fixed day
# "fomc" = 3rd Wednesday of FOMC months

CURRENCIES = {"USD", "EUR", "GBP", "JPY", "CHF", "CNY"}

def next_fomc(ref: date) -> date | None:
    """FOMC meets ~every 6 weeks. 2026 known dates (approximate Wednesdays)."""
    fomc_2026 = [
        date(2026, 1, 28), date(2026, 3, 18), date(2026, 5, 6),
        date(2026, 6, 17), date(2026, 7, 29), date(2026, 9, 16),
        date(2026, 11, 4), date(2026, 12, 16),
    ]
    for d in fomc_2026:
        if d > ref:
            return d
    return None

def nth_weekday(year: int, month: int, weekday: int, n: int) -> date:
    """Return the nth occurrence of weekday in month (0=Mon, 6=Sun, n=1-based)."""
    first = date(year, month, 1)
    days_ahead = (weekday - first.weekday()) % 7
    candidate = first + timedelta(days=days_ahead + (n - 1) * 7)
    return candidate

def gen_recurring(ref: date) -> list[dict]:
    """Generate recurring events for the next 90 days from ref."""
    events = []
    end = ref + timedelta(days=90)
    current = ref

    while current <= end:
        y, m = current.year, current.month

        # CPI (US) — 2nd week of month, Wednesday or Thursday
        cpi_day = nth_weekday(y, m, 2, 2)  # 2nd Wednesday
        if cpi_day > ref and cpi_day <= end:
            events.append({
                "date": cpi_day.isoformat(), "label": "US CPI (MoM)",
                "currency": "USD", "impact": "high", "country": "US",
            })

        # NFP (US) — 1st Friday
        nfp_day = nth_weekday(y, m, 4, 1)
        if nfp_day > ref and nfp_day <= end:
            events.append({
                "date": nfp_day.isoformat(), "label": "US Non-Farm Payrolls",
                "currency": "USD", "impact": "high", "country": "US",
            })

        # PPI (US) — ~2 days after CPI
        ppi_day = cpi_day + timedelta(days=2)
        if ppi_day > ref and ppi_day <= end:
            events.append({
                "date": ppi_day.isoformat(), "label": "US PPI (MoM)",
                "currency": "USD", "impact": "medium", "country": "US",
            })

        # Retail Sales (US) — mid-month, ~15th
        retail = date(y, m, 15)
        if retail.weekday() >= 5:
            retail += timedelta(days=(7 - retail.weekday()))
        if retail > ref and retail <= end:
            events.append({
                "date": retail.isoformat(), "label": "US Retail Sales (MoM)",
                "currency": "USD", "impact": "medium", "country": "US",
            })

        # GDP (US) — last week of month (advance), ~27th
        gdp = date(y, m, 27)
        if gdp.weekday() >= 5:
            gdp -= timedelta(days=gdp.weekday() - 4)
        if gdp > ref and gdp <= end:
            events.append({
                "date": gdp.isoformat(), "label": "US GDP (QoQ advance)",
                "currency": "USD", "impact": "high", "country": "US",
            })

        # ECB rate decision — ~every 6 weeks, approximate
        ecb_months = [1, 3, 4, 6, 7, 9, 10, 12]
        if m in ecb_months:
            ecb = nth_weekday(y, m, 3, 2)  # 2nd Wednesday
            if ecb > ref and ecb <= end:
                events.append({
                    "date": ecb.isoformat(), "label": "ECB Rate Decision",
                    "currency": "EUR", "impact": "high", "country": "EU",
                })

        # BOE rate decision
        boe_months = [2, 3, 5, 6, 8, 9, 11, 12]
        if m in boe_months:
            boe = nth_weekday(y, m, 3, 3)  # 3rd Wednesday
            if boe > ref and boe <= end:
                events.append({
                    "date": boe.isoformat(), "label": "BoE Rate Decision",
                    "currency": "GBP", "impact": "high", "country": "UK",
                })

        # PBoC LPR (China) — 20th of each month
        pboc = date(y, m, 20)
        if pboc.weekday() >= 5:
            pboc += timedelta(days=(7 - pboc.weekday()))
        if pboc > ref and pboc <= end:
            events.append({
                "date": pboc.isoformat(), "label": "PBoC Loan Prime Rate",
                "currency": "CNY", "impact": "high", "country": "CN",
            })

        # China CPI — ~9th
        cn_cpi = date(y, m, 9)
        if cn_cpi.weekday() >= 5:
            cn_cpi += timedelta(days=(7 - cn_cpi.weekday()))
        if cn_cpi > ref and pboc <= end:
            events.append({
                "date": cn_cpi.isoformat(), "label": "China CPI (YoY)",
                "currency": "CNY", "impact": "medium", "country": "CN",
            })

        # SNB rate decision — quarterly: Mar, Jun, Sep, Dec
        snb_months = [3, 6, 9, 12]
        if m in snb_months:
            snb = nth_weekday(y, m, 3, 3)  # 3rd Wednesday
            if snb > ref and snb <= end:
                events.append({
                    "date": snb.isoformat(), "label": "SNB Rate Decision",
                    "currency": "CHF", "impact": "high", "country": "CH",
                })

        # BOJ rate decision — ~every 6 weeks
        boj_months = [1, 3, 4, 6, 7, 9, 10, 12]
        if m in boj_months:
            boj = nth_weekday(y, m, 4, 3)  # 3rd Thursday
            if boj > ref and boj <= end:
                events.append({
                    "date": boj.isoformat(), "label": "BoJ Rate Decision",
                    "currency": "JPY", "impact": "high", "country": "JP",
                })

        # Advance to next month
        if m == 12:
            current = date(y + 1, 1, 1)
        else:
            current = date(y, m + 1, 1)

    return events

def main():
    today = date.today()

    # Generate recurring events
    events = gen_recurring(today)

    # FOMC
    fomc = next_fomc(today)
    if fomc:
        events.append({
            "date": fomc.isoformat(), "label": "FOMC Rate Decision",
            "currency": "USD", "impact": "high", "country": "US",
        })
        # FOMC minutes — 3 weeks after
        minutes = fomc + timedelta(days=21)
        events.append({
            "date": minutes.isoformat(), "label": "FOMC Meeting Minutes",
            "currency": "USD", "impact": "medium", "country": "US",
        })

    # Deduplicate by (date, label)
    seen = set()
    unique = []
    for e in events:
        key = (e["date"], e["label"])
        if key not in seen:
            seen.add(key)
            unique.append(e)

    # Sort by date, filter next 30 days
    unique.sort(key=lambda x: x["date"])
    cutoff = today + timedelta(days=30)
    upcoming = [e for e in unique if date.fromisoformat(e["date"]) <= cutoff]

    # Write output
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    payload = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "period": f"{today.isoformat()} → {cutoff.isoformat()}",
        "events": upcoming[:25],  # Max 25 events
    }

    with open(OUT, "w") as f:
        json.dump(payload, f, indent=2)

    print(f"macro-pull: wrote {len(upcoming)} events to {OUT}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
