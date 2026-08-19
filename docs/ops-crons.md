# How Delta V site crons work

**Audience:** a teammate who needs to understand (or babysit) IntelHub data refresh — without needing the full ops laptop.

**Rule of thumb:** crons refresh **JSON data only**. They do **not** rebuild the Next.js site. Full site deploys refresh **HTML**, and must **preserve** the live JSON so we never roll market data backwards.

---

## 60-second mental model

```
┌─────────────────────────────────────────────────────────────────┐
│  Your machine (or Hermes agent host)                            │
│                                                                 │
│   Hermes Desktop  ──no_agent cron──►  python3 scripts/*.py      │
│   (scheduler only; 0 LLM tokens)          │                     │
│                                           ▼                     │
│                              fetch public APIs (Yahoo, CG, …)   │
│                                           │                     │
│                              write public/data/*.json (local)   │
│                                           │                     │
│                              git push ONLY data/* ──► gh-pages  │
└───────────────────────────────────────────┼─────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitHub: DeltaV-cc/website-private                              │
│                                                                 │
│   branch main      = source code (Next.js app)                  │
│   branch gh-pages  = live static site + data/*.json  ◄── SSOT   │
│                      for IntelHub dashboards                    │
└───────────────────────────────────────────┼─────────────────────┘
                                            │
                    GitHub Pages serves     │
                    deltav-cc.github.io/website-private/
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Browser (IntelHub)                                             │
│   fetch https://deltav-cc.github.io/website-private/data/*.json │
│   (see app/intelhub/hooks.ts → DATA_BASE)                       │
│   client re-polls ~every 5 minutes                              │
└─────────────────────────────────────────────────────────────────┘
```

**Two pipelines, one branch tip:**

| Pipeline | Who runs it | What it updates on `gh-pages` | LLM? |
|----------|-------------|-------------------------------|------|
| **Layer 0 — data crons** | Hermes `no_agent` jobs (or you by hand) | `data/*.json` only | **No** |
| **Layer 1 — site deploy** | GitHub Actions on push to `main` | HTML/JS/CSS under `out/` | No |
| **Preserve step** | Same Actions job | Overlays *live* `data/*` onto the new export so HTML deploy does not clobber cron JSON | No |

If you remember only one thing: **crons own `data/`; deploys own the site shell.**

---

## Why Hermes? What is `no_agent`?

- Crons are registered on a **Hermes** agent (Desktop or gateway host).
- Schedule uses Hermes **`no_agent` / script mode**: run a shell/Python command on a timer.
- That means: **no chat model, no tool-calling agent, no token burn** — just `python3 scripts/….py`.
- Official Hermes docs call this the safe pattern for recurring ops work (same idea as the Open Harness cron module).

You do **not** need the colleague’s Hermes to understand the data flow. They only need Hermes if they will **host** the same schedule.

---

## Job schedule (what runs when)

Times are approximate. Exact cron expressions live in Hermes on the ops machine (not committed — host-specific).

| Cadence | Command (from website checkout root) | Script | Purpose |
|---------|--------------------------------------|--------|---------|
| **Every ~15 min** (`:01`) | intel `pipeline.py` | ops Hermes | Ingest RSS/X → `intel/raw/` |
| **Every ~15 min** (`:08`) | `sync-intel-to-site.py` | ops Hermes | Score + cap → `raw-items.json`, **`curated-top20.json`**, `picks.json` → gh-pages |
| **Every ~15 min** | `python3 scripts/refresh-data.py` | [`refresh-data.py`](../scripts/refresh-data.py) | Macro / **trending HF** / crypto / liquid movers → `gh-pages/data/` |
| **Hourly** | `python3 scripts/refresh-dashboard-snapshots.py` | [`refresh-dashboard-snapshots.py`](../scripts/refresh-dashboard-snapshots.py) | Fill Macro/Web3 holes (indices merge, stables, TVL, **chain-movers**) |
| **Every ~30 min** | `layer0_watch.py` | ops Hermes | Intel ingest watchdog + AI-source staleness + **AI persona nitter fetch** |
| **Every 6h** | `layer0_6h.py` | ops Hermes | HF watch, Artemis, arena, wiki backup, MetaMask phish, ETF, **abliterated recs**, **lab RSS** |
| **Every 12h** | `layer0_12h.py` | ops Hermes | DEX matrix + BOLD yields |
| **On every `main` deploy** | Actions → `pnpm build` → `preserve-live-data.py` → publish | [`deploy.yml`](../.github/workflows/deploy.yml) | New HTML; **keep** live JSON |

Scripts folded into the 6h/12h/watch bundles still live in Hermes `scripts/` — they are not deleted. Individual cron rows are paused so they cannot race the bundle.

> **Intel feed items** (`raw-items.json`, curated pulse, etc.) are produced by a **separate ops intel pipeline** (`DeltaV-ops/intel/…`, not fully vendored here). Caps and source lists live there. This repo only *displays* the JSON that ends up on `gh-pages/data/`.

---

## What each core script writes

### `refresh-data.py` (main 15‑minute heart)

Public APIs only (Yahoo Finance charts, CoinGecko, Hugging Face **trending**, CNN F&G, …).  
`hf.json` is **never** sort-by-downloads (that used to surface BERT / MiniLM).  
Pushes to **`gh-pages` branch → `data/`**:

| File | Used roughly for |
|------|------------------|
| `indices.json` | SPX, CSI, SMI, STOXX, DAX |
| `forex.json` | Major FX pairs |
| `gold.json` / `us10y.json` / `oil.json` | Macro commodities / rates |
| `crypto.json` / `btc-trend.json` / `exchange-vol.json` | Crypto mcap / BTC series / CEX vols |
| `hf.json` | Hugging Face models + spaces |
| `cnn-fg.json` | Fear & Greed style reading |
| `top-movers.json` | **Price** movers (equities + crypto) for **Macro** |
| `artemis-newsletter.json` | Artemis newsletter slice |
| `macro-calendar.json` | Rolling economic calendar (date math + light enrichment) |

Also copies into local `public/data/` when the script can see a website checkout (nice for local previews).

### `refresh-dashboard-snapshots.py` (companion)

Designed to **fill holes** when Yahoo/CG partially fail:

| File | Notes |
|------|--------|
| `indices.json` | Merge — never drop SMI/STOXX/DAX keys on partial fail |
| `stables.json` / `tvl-top.json` / `chain-movers.json` | DeFi Llama style Web3 panels |
| `dex-metrics.json` | DEX metrics when available |
| plus oil/gold/us10y/cnn-fg | Best-effort refresh |

### Shared push helper

[`scripts/_gh_pages_push.py`](../scripts/_gh_pages_push.py) — clone shallow `gh-pages`, write only changed `data/<file>.json`, commit, **`git push --force-with-lease`** with retries.  
No secrets in the file; auth is whatever `git` already has on the machine (HTTPS credential helper, SSH key, or env-configured remote).

### Deploy preserve (must not skip)

[`scripts/preserve-live-data.py`](../scripts/preserve-live-data.py) runs in CI **after** `pnpm build`:

1. Build exports HTML + whatever snapshot JSON is on `main` into `out/data/`.
2. Preserve script overlays **newer / live** files from the current `gh-pages` `data/`.
3. Publish `out/` to `gh-pages`.

So a content deploy never “rewinds” the market tickers to yesterday’s commit.

---

## Where the browser reads it

```ts
// app/intelhub/hooks.ts
const DATA_BASE = 'https://deltav-cc.github.io/website-private';
// then: `${DATA_BASE}/data/indices.json` etc.
```

- Prefer **Pages URL**, not `raw.githubusercontent.com` (raw CDN has been multi-day stale).
- UI auto-refreshes client-side about every **5 minutes** — even if crons are 15 minutes, the tab will pick up new JSON when Pages updates.

---

## Environment variables (optional)

None are required for a default public run. All are **names only** here — put real values in the host secret store / shell profile, never in git.

| Variable | Default | Meaning |
|----------|---------|---------|
| `DASHBOARD_DATA_REPO` | `https://github.com/DeltaV-cc/website-private.git` | Repo the push targets |
| `DASHBOARD_GIT_EMAIL` | `noreply@deltav.cc` | Commit author email on data commits |
| `DASHBOARD_GIT_NAME` | `Delta V Bot` | Commit author name |
| `HERMES_CRON_WORKDIR` | (empty) | If set, prefer `<workdir>/public/data` for local writes |

**Auth for push:** the process user must be allowed to push to `gh-pages` (deploy key, fine-scoped PAT in credential helper, or `gh` auth). Tokens are **not** stored in this repository.

---

## Run it yourself (smoke test)

From a clone of this repo (with Python 3 + `git` push rights to `gh-pages`):

```bash
cd /path/to/website-private

# One full market refresh + push
python3 scripts/refresh-data.py

# Companion snapshots
python3 scripts/refresh-dashboard-snapshots.py

# Optional panels
python3 scripts/fetch-etf-flows.py
python3 scripts/fetch-bold-yields.py
```

**Expect:**

- Console lines like `✓ Data refreshed: SPX …` / `✓ gh-pages pushed: indices.json, …`
- New commits on branch `gh-pages` with messages like `data: 14:30 (indices.json, forex.json, …)`
- Within a minute or two,  
  `https://deltav-cc.github.io/website-private/data/indices.json` shows a fresh `updated` / price field

**If push fails:** usually git auth or branch protection — not the fetch logic. Data may still be written under local `public/data/`.

**If Yahoo/CoinGecko rate-limit (HTTP 429):** script keeps last good file when possible; companion snapshot job helps fill gaps. Partial failure is normal; total empty payload returns exit code 1.

---

## How to read the Hermes side (for the colleague)

On the machine that hosts crons (ops owner):

1. Open **Hermes Desktop** (or the agent that owns crons).
2. Open the **cron / jobs** list (Hermes UI or `cron` skill — see Open Harness module on cron).
3. Look for jobs whose command is essentially:
   - `python3 …/website-private/scripts/refresh-data.py`
   - `python3 …/website-private/scripts/refresh-dashboard-snapshots.py`
4. Confirm:
   - schedule ≈ `*/15 * * * *` (or Hermes equivalent)
   - mode = **no_agent** / script (not a chat prompt)
   - working directory points at the website checkout (or `HERMES_CRON_WORKDIR` is set)
5. Check last run status + logs if IntelHub looks stale.

Exact job IDs and absolute paths stay on that host — they are environment-specific and should not be pasted into the public repo.

---

## Failure modes (quick triage)

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| IntelHub empty / old prices | Cron not running or push failed | Run `refresh-data.py` by hand; check `gh-pages` recent commits |
| HTML deploy “reset” numbers | Preserve step skipped / broken | Check Actions log for `preserve-live-data.py`; do not force-orphan wipe of `data/` |
| Only some indices missing | Yahoo partial fail | Run `refresh-dashboard-snapshots.py`; check logs for ⚠ lines |
| `raw.githubusercontent` looks stale | Wrong URL | Site should use Pages (`hooks.ts` DATA_BASE) — not raw |
| Git push rejected | Auth / force-with-lease race | Re-run; ensure credential can push `gh-pages`; two crons racing is OK with lease retries |

---

## What never goes in this repo

- API keys, GitHub PATs, deploy keys  
- Hermes SOUL / allowlists / Telegram bot tokens  
- Host absolute paths that embed usernames if avoidable  
- Private intel DB dumps (`*.sqlite`, `intel.db`)  
- Artemis private config (`artemis-config.json` is gitignored)

Public market APIs + architecture docs = fine. Credentials = host env only.

---

## Related files

| Path | Role |
|------|------|
| [`scripts/README.md`](../scripts/README.md) | Short script index |
| [`scripts/refresh-data.py`](../scripts/refresh-data.py) | Main 15m refresh |
| [`scripts/refresh-dashboard-snapshots.py`](../scripts/refresh-dashboard-snapshots.py) | Companion fill-ins |
| [`scripts/_gh_pages_push.py`](../scripts/_gh_pages_push.py) | Shared data push helper |
| [`scripts/preserve-live-data.py`](../scripts/preserve-live-data.py) | Deploy-time JSON preserve |
| [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) | Site deploy + preserve |
| [`app/intelhub/hooks.ts`](../app/intelhub/hooks.ts) | Browser data base URL |

---

## One-slide summary for a colleague

1. **Hermes** wakes up every ~15 minutes in **script mode** (no LLM).  
2. Scripts hit **public APIs**, write JSON, push **only** `data/*` to **`gh-pages`**.  
3. **IntelHub** in the browser loads that JSON from **GitHub Pages**.  
4. When we ship a **code** change on `main`, CI rebuilds HTML and **merges live data back in** so tickers stay fresh.  
5. Secrets never live in git; only the schedule + push rights live on the ops host.
