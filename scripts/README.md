# Scripts

Build and data helpers for the static site. Prefer `pnpm build` over calling these by hand unless you are refreshing a single pipeline.

**Intel volume budget (per-source caps):** SSOT is ops `DeltaV-ops/intel/sync-intel-to-site.py` — caps limit export slots only (not source deletion). This repo does not vendor that script.

| Script | When it runs | Inputs | Outputs |
|--------|--------------|--------|---------|
| `copy-data.py` | `prebuild` / `build` | Optional sibling workspaces (`wiki/signals`, `DeltaV-persistent-workspace/intel`); otherwise uses committed snapshots under `public/data/` | Copies/merges into `public/data/` |
| `generate-intelhub-rss.py` | `prebuild` / `build` | `public/data/raw-items.json`, `picks.json` | `public/intelhub/feed/*.xml`, `feeds.opml` |
| `patch-basepath.py` | end of `build` | Static export under `out/` | Rewrites root-relative paths with `basePath` from `site.config.json` |
| `fetch-*.py` | Manual / ops refresh | Live APIs | Updates specific `public/data/*.json` files |
| `fetch-bold-yields.py` | Hermes / manual | DefiLlama Yields (Liquity V2 BOLD SP + venues) | `public/data/bold-yields.json` — mirrors [Dune BOLD Yields](https://dune.com/liquity/bold-yields) without a Dune API key |
| `refresh-data.py` | Hermes **IntelHub Market Data Refresh** `*/15` | Yahoo, CoinGecko, HF, CNN/F&G, Artemis RSS | **Tracked** market SSOT → `public/data/` + gh-pages. Full **indices** (spx/csi/smi/stoxx/dax, merge never drops keys), gold/oil/us10y, forex, crypto, hf, cnn-fg, btc-trend, exchange-vol, **top-movers**, artemis-newsletter, **macro-calendar**. No LLM tokens. |
| **`refresh-dashboard-snapshots.py`** | Hermes **IntelHub Dashboard Snapshots** `*/30` | Yahoo + DeFi Llama | Defensive fill: indices merge, oil/gold/us10y, **stables**, **tvl-top**, **chain-movers**, cnn-fg. Complements refresh-data (Web3 TVL/stables). |
| `fetch-bold-yields.py` | Hermes cron `0 */12` (recommended) | DefiLlama Yields | `bold-yields.json` + gh-pages push |
| `fetch-etf-flows.py` | Hermes ETF `*/15` | Farside CSV mirror | `etf-flows.json` + gh-pages push |
| `audit-dashboard-data.py` | Manual / watchdog | Pages `data/*` | Scorecard PASS/WARN/FAIL for Macro·AI·Web3 (no Infosec). Exit 1 on FAIL. |
| `_gh_pages_push.py` | Library | — | Shared force-with-lease push for data files |
| `macro-pull.py` | Optional / Hermes 6h | Date math | macro-calendar only; prefers invoking refresh-data when present |

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
