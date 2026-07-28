# Scripts

Build and data helpers for the static site. Prefer `pnpm build` over calling these by hand unless you are refreshing a single pipeline.

| Script | When it runs | Inputs | Outputs |
|--------|--------------|--------|---------|
| `copy-data.py` | `prebuild` / `build` | Optional sibling workspaces (`wiki/signals`, `DeltaV-persistent-workspace/intel`); otherwise uses committed snapshots under `public/data/` | Copies/merges into `public/data/` |
| `generate-intelhub-rss.py` | `prebuild` / `build` | `public/data/raw-items.json`, `picks.json` | `public/intelhub/feed/*.xml`, `feeds.opml` |
| `patch-basepath.py` | end of `build` | Static export under `out/` | Rewrites root-relative paths with `basePath` from `site.config.json` |
| `fetch-*.py` | Manual / ops refresh | Live APIs | Updates specific `public/data/*.json` files |
| `fetch-bold-yields.py` | Hermes / manual | DefiLlama Yields (Liquity V2 BOLD SP + venues) | `public/data/bold-yields.json` — mirrors [Dune BOLD Yields](https://dune.com/liquity/bold-yields) without a Dune API key |
| `refresh-data.py` | Ops only (may be local-only) | Full external pipeline | Regenerates data snapshots |

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
