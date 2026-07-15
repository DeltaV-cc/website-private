# Delta V — Website

Public site for **[Delta V](https://deltav.cc)**: sovereign AI engineering, Web3, and OpSec.

**Live (GitHub Pages):** [deltav-cc.github.io/website-private](https://deltav-cc.github.io/website-private/)  
**Repository:** [github.com/DeltaV-cc/website-private](https://github.com/DeltaV-cc/website-private)

Open source under [MIT](./LICENSE). Third-party media credits: [ATTRIBUTION.md](./ATTRIBUTION.md).

---

## Stack

| Piece | Choice |
|--------|--------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist |
| Deploy shape | **Static export** (`output: 'export'`) |
| Current base path | `/website-private` (GitHub Pages project site) |

No analytics. No third-party trackers. Security headers in [`_headers`](./_headers) for static hosts (e.g. Cloudflare Pages).

---

## Quick start

**Requirements:** Node.js 20+, [pnpm](https://pnpm.io) (preferred), Python 3 for data/RSS scripts.

```bash
pnpm install
pnpm dev
```

Open:

```
http://localhost:3000/website-private/
```

> The app is configured with `basePath: '/website-private'`. Routes always include that prefix in local and production builds.

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Copy data → generate IntelHub RSS → static export → basePath patch |
| `pnpm lint` | ESLint |

---

## Project layout

```
app/                 App Router pages & components
  ai/ web3/ forge/ opsec/ tutorials/ blog/ intelhub/ contact/
  components/        Shared UI (nav, PageShell, diagrams, OpSec)
components/          Blog/tutorial layout (TOC, copy buttons, progress)
public/              Static assets (images, data JSON, feeds)
design-system/       Tokens, page templates, OpSec product map
scripts/             Data copy, RSS, basePath patch helpers
content/wiki/        Internal wiki source notes
_headers             Security headers for static hosting
```

### Highlights

- **Homepage / pillars** — AI, Web3, Forge, OpSec
- **SOTA Operator Stack** — `/opsec/sota-stack/` (DeFi treasury + key management blueprint)
- **Top-tier pointers** — Taurus (institutional custody), Opsek (HNW security)
- **Tutorials** — local AI stacks, optional x402 reference
- **IntelHub** — static data dashboards + feeds

---

## Configuration notes

- **Static only:** no server APIs in page routes; client fetches use the `/website-private` prefix for public JSON.
- **Windows + Turbopack:** avoid multi-byte box-drawing characters in source comments (can crash the codeframe highlighter). Prefer ASCII in comments.
- **Install env:** do not mix WSL and Windows `pnpm install` on the same `node_modules` tree (permission / native binary issues).

Migrating off GitHub Pages to `deltav.cc` on Cloudflare: set `basePath` (and asset paths) to `''` or the production path, then rebuild.

---

## Contributing

1. Fork or branch from `main`
2. Keep marketing copy changes intentional — prefer structure, a11y, and polish unless content is requested
3. Run `pnpm lint` / smoke-check critical routes before opening a PR
4. Respect [ATTRIBUTION.md](./ATTRIBUTION.md) for third-party assets

Issues and PRs welcome on the GitHub repo.

---

## License & credits

- **Code:** [MIT](./LICENSE) © 2026 Delta V  
- **Third-party assets:** [ATTRIBUTION.md](./ATTRIBUTION.md) — includes **Amaranth** credit for `lotusbloom.gif`

Contact: [engage@deltav.cc](mailto:engage@deltav.cc)
