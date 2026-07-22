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
| `pnpm exec tsc --noEmit` | TypeScript validation |
| `git diff --check` | Whitespace check before commit |

---

## Project layout

```
app/                 App Router pages and route-local components
  ai/ web3/ forge/ opsec/ tutorials/ blog/ intelhub/ contact/
  components/        Shared UI (navigation, heroes, cards, booking)
components/          Shared reading layouts (TOC, copy buttons, progress)
public/              Static assets, images, JSON data and RSS feeds
scripts/             Data copy, RSS generation and basePath helpers
DESIGN_SYSTEM.md     Canonical visual and content conventions
_headers             Security headers for static hosting
```

### Highlights

- **Homepage / pillars** — AI, Web3, Forge, OpSec
- **SOTA Operator Stack** — `/opsec/sota-stack/` (DeFi treasury + key management blueprint)
- **Top-tier pointers** — Taurus (institutional custody), Opsek (HNW security)
- **Tutorials** — local AI stacks, optional x402 reference
- **IntelHub** — static data dashboards + feeds

### Shared UI contracts

Reuse the existing shared components before adding page-specific markup:

- `PageShell` and `PageHero` for the common page background and pillar hero.
- `CapabilityCard` for homepage and Forge capability cards.
- `BlogPostLayout` for blog, tutorial and course reading pages.
- `BookingCalendar` for the contact booking flow.

The visual source of truth is [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). It defines
the color tokens, typography, spacing, card surfaces, accents and motion rules.
New pages should use those tokens and contracts instead of introducing one-off
backgrounds, opacity values or hover treatments.

### Content workflow

Blog posts and tutorials are route-based static pages. To add one:

1. Create a route under `app/blog/<slug>/` or `app/tutorials/<slug>/`.
2. Follow the existing `BlogPostLayout` structure and add the entry to the relevant index.
3. Reuse the design tokens and reading-page conventions from `DESIGN_SYSTEM.md`.
4. Run the checks below before committing.

The contact page uses a native date calendar and loads availability in the
selected-date modal. Provider failures fall back to the official Cal.com link;
no Cal.com secret is required in the browser bundle.

### Data and generated files

`public/data/` and `public/intelhub/feed/` are generated during the build by the
Python data/RSS scripts. Treat them as build outputs: review changes when data
is refreshed, but do not hand-edit them to fix UI code.

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
- **Third-party assets:** [ATTRIBUTION.md](./ATTRIBUTION.md) — includes lotus GIF credit: [Aaron Rolston](https://www.aaronrolston.com/) for [Amaranth Foundation](https://amaranth.foundation/)

Contact: [engage@deltav.cc](mailto:engage@deltav.cc)
