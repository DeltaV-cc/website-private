# Scripts

Build and data helpers for the static site. Prefer `pnpm build` over calling these by hand unless you are refreshing a single pipeline.

> **Colleague / ops onboarding:** how Hermes crons refresh IntelHub data (diagram, schedule, files, smoke test, what not to commit) is documented in **[`docs/ops-crons.md`](../docs/ops-crons.md)**. Start there.

**Intel volume budget (per-source caps):** SSOT is ops `DeltaV-ops/intel/sync-intel-to-site.py` — caps limit export slots only (not source deletion). This repo does not vendor that script.

| Script | When it runs | Inputs | Outputs |
|--------|--------------|--------|---------|
| `copy-data.py` | `prebuild` / `build` | Optional sibling workspaces (`wiki/signals`, `DeltaV-persistent-workspace/intel`); otherwise uses committed snapshots under `public/data/` | Copies/merges into `public/data/` |
| `generate-intelhub-rss.py` | `prebuild` / `build` | `public/data/raw-items.json`, `picks.json` | `public/intelhub/feed/*.xml`, `feeds.opml` |
| `patch-basepath.py` | end of `build` | Static export under `out/` | Rewrites root-relative paths with `basePath` from `site.config.json` |
| `preserve-live-data.py` | CI after `pnpm build` | Live `gh-pages` `data/*` + `out/data` | Overlays fresher JSON so HTML deploys never roll tickers backwards |
| `fetch-*.py` | Manual / ops refresh | Live APIs | Updates specific `public/data/*.json` files |
| `fetch-bold-yields.py` | Hermes / manual | DefiLlama Yields (Liquity V2 BOLD SP + venues) | `public/data/bold-yields.json` — mirrors [Dune BOLD Yields](https://dune.com/liquity/bold-yields) without a Dune API key |
| `fetch-etf-flows.py` | Hermes / manual | Public ETF flow sources | `etf-flows.json` on gh-pages |
| `refresh-data.py` | Ops / Hermes `no_agent` cron `*/15` | Yahoo, CoinGecko, HF, … | Market snapshots → local `public/data/` + **push `data/*` to `gh-pages`**. Includes **`top-movers.json`** (equity + crypto **price** movers for Macro) and **`macro-calendar.json`**. **Zero LLM tokens.** |
| `refresh-dashboard-snapshots.py` | Ops / Hermes `no_agent` ~15–30m | Yahoo, DefiLlama, … | Fills Macro/Web3 gaps (`indices` merge, `stables`, `tvl-top`, `chain-movers`, …) → gh-pages |
| `collect-abliterated.py` | Hermes 6h bundle | HF search + curated ids | `hf-abliterated.json` — trending families + recs for **local / cybersecurity / film** |
| `fetch-ai-labs.py` | Hermes 6h bundle | Lab RSS (DeepMind, OpenAI, Qwen, NVIDIA, …) | `ai-labs.json` — per-source cap so Google cannot dominate |
| `fetch-ai-personas.py` | Hermes ~30m watchdog | Nitter / xcancel | `ai-personas.json` — ML / agent / local / gen-AI X handles |
| `_gh_pages_push.py` | Imported by fetch helpers | In-memory JSON map | Shared shallow-clone push of `data/*` only (`force-with-lease` + retry) |
| `macro-pull.py` | Optional daily / manual (often local-only) | None (pure date math) | Regenerates `macro-calendar.json` and can invoke refresh push |
| — | Optional Hermes job `*/30` | DefiLlama historical TVL | `chain-movers.json` — **chain TVL** movers for **Web3** only (not Macro price movers) |

## Deploy config

`site.config.json` at the repo root is the single source of truth for:

- `basePath` (GitHub Pages project prefix, currently `/website-private`)
- `siteUrl` (canonical public origin)
- `repoUrl`

Python loaders: `scripts/_site_config.py`. TypeScript: `lib/site.ts`.

## Clone-only builds

A plain clone of this repo can build without external workspaces. Missing sibling paths are skipped; committed JSON/RSS under `public/data/` and `public/intelhub/feed/` act as snapshots so the site still exports.

Treat those directories as **build outputs that are also committed for clone-only deploys**. Prefer regenerating via scripts rather than hand-editing for UI fixes.

## CORS proxy (not a build script)

`workers/proxy.js` is a Cloudflare Worker deployed separately (`wrangler.toml` → `proxy.hub.deltav.cc`). See [docs/proxy.md](../docs/proxy.md).
