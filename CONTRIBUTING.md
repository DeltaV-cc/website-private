# Contributing

Thanks for helping improve the Delta V public website.

## Prerequisites

- **Node.js 20+**
- **pnpm 9** (required; pinned via `packageManager` in `package.json`)
- **Python 3** for build-time data/RSS scripts

```bash
pnpm install
pnpm dev
```

Dev server: `http://localhost:3000/website-private/` (base path from `site.config.json`).

Do **not** use `npm install` / `yarn` for this repo. Dual lockfiles cause divergent dependency trees.

## Before you open a PR

```bash
pnpm check          # lint + typecheck
# optional smoke:
pnpm build
```

Also useful: `git diff --check` for whitespace.

CI runs lint + typecheck on pull requests. Deploy to GitHub Pages runs from `main` after a green path.

## What to change where

| Goal | Where |
|------|--------|
| New blog / tutorial page | `app/blog/<slug>/` or `app/tutorials/<slug>/` **and** register in `app/data/content-index.ts` |
| Shared chrome / cards | Prefer `app/components/` |
| Long-form reading chrome | `components/BlogPostLayout.tsx` |
| Visual tokens / patterns | `DESIGN_SYSTEM.md` first, then `app/globals.css` |
| Deploy path / public URL | `site.config.json` only (then rebuild) |
| IntelHub data snapshots | regenerate via `scripts/` — see `scripts/README.md` |
| CORS proxy Worker | `workers/proxy.js` + `wrangler.toml` — see `docs/proxy.md` |

## Content norms

- Prefer intentional marketing copy; avoid drive-by slogan rewrites.
- Reuse design tokens and shared components — no one-off colors/hover hacks.
- Third-party media must stay consistent with [ATTRIBUTION.md](./ATTRIBUTION.md).
- Generated files under `public/data/` and `public/intelhub/feed/` are snapshots: regenerate rather than hand-patching for UI bugs.

## PR hygiene

- Small, reviewable PRs beat mega-diffs.
- Describe *why* and how to verify.
- Link related issues when applicable.
- Use the PR template checklist.

## Security

Do not open public issues for vulnerabilities. See [SECURITY.md](./SECURITY.md).

## Code of conduct

By participating you agree to the [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License

Contributions are accepted under the repository [MIT](./LICENSE) license.
