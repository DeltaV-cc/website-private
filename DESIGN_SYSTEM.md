# Delta V design system

This file is the visual source of truth for new pages, articles, tutorials and courses. Reuse the shared components and tokens before adding page-specific CSS.

## Foundations

- **Fonts:** Geist for interface and display text; Geist Mono for indexes, labels and metadata.
- **Page shell:** `PageContainer` provides the `1440px` maximum width and `px-6 md:px-8` horizontal padding.
- **Page hero:** use `PageHero` from `app/components/PageShell.tsx`. It owns the back link, label, title scale, description spacing, spotlight and three accent bars.
- **Accents:** cyan for AI, orchid/orange for Web3, purple for Forge, amber for OpSec. The first hero bar uses the page accent; the two shorter bars stay cyan/purple.
- **Motion:** use the existing duration/easing tokens. Respect `prefers-reduced-motion`; never add a continuous animation to a content card.

## Themes

The site ships a dark and a light palette. The reader's choice is `system` (the default), `light` or `dark`, stored under `dv-theme`; `system` is resolved against `prefers-color-scheme` and only the resolved value is written to `<html data-theme>`, before first paint, by `THEME_INIT_SCRIPT` (`lib/theme.ts`). CSS therefore never queries `prefers-color-scheme` — it reads `:root[data-theme='light']` in `app/globals.css`.

Rules for new work:

- **Never write a literal colour.** Every hex or `rgba()` in a component is a colour that only works in one theme. Use the tokens — including `--overlay-weak/-soft/--overlay/--overlay-strong` instead of `bg-white/[0.06]`, `--on-accent` for text on a filled accent, and `rgb(var(--shade-rgb) / .3)` for page shades and veils.
- **Accents are re-cut, not reused.** The light palette darkens every brand hue so links, eyebrows and rails clear 4.5:1 on paper. Keep new accents in both blocks.
- **Anything drawn in JS** (canvas, Mermaid, charts) has to be told the theme: read `document.documentElement.dataset.theme` and observe it for changes, as `app/components/Mermaid.tsx` does.

## Surfaces and cards

The background must remain visible through content surfaces without sacrificing contrast.

- `--surface-card`: canonical card surface, currently `rgba(8, 11, 10, .76)` dark / `rgba(255, 255, 255, .82)` light.
- `--surface-card-hover`: hover surface — lifts off the page on dark, settles into it on light.
- `--surface-card-strong`: featured/listing surface.
- `--surface-overlay`: near-opaque sheet for menus and floating panels.
- `capability-card`: use for the three homepage pillars and Forge entry cards. It owns the number, optional mono label, title, text/link, border, surface, left accent rail and hover treatment.
- `listing-card` / `listing-card-featured`: use for Blog and Tutorials content listings.
- `listing-filter-panel`: use for listing filters; labels and counts must remain at least `text-secondary` contrast.

Use `CapabilityCard` for capability cards instead of copying markup. Do not add a second `bg-*`, opaque gradient or pseudo-element behind the card. Parent grids may provide only the shared border color.

Dashboard tiles and dense data panels may retain `--bg-surface` when their information density requires a stronger separation from the Ink Garden background.

## Page authoring contract

1. Put the page inside the global `MainLayout` and use `PageContainer` for horizontal alignment.
2. Use `PageHero` for AI, Web3, Forge and other pillar pages. Pass existing copy; do not add manual `<br>` tags to imitate another page.
3. Use the semantic heading sequence: one page `h1`, then section `h2`, then card `h3`.
4. Use eyebrow labels for section context and the page accent for links, metadata and borders.
5. Keep interactive targets keyboard accessible and provide an accessible name for icon-only controls.
6. Images are local, optimized formats where available, with dimensions, `loading="lazy"` and `decoding="async"` for below-the-fold content.

## Booking and external services

The Contact page uses a local date-selection shell and Cal.com only for live availability and booking confirmation. No Cal.com secret or API token may be included in the static client bundle. External embeds must be lazy or client-only and must not introduce an internal page-sized scroll area.

## Legal content

Legal pages are static, English, internally rendered pages. Keep the company identity, contact address and update date synchronized across Terms of Use, Privacy Policy and the footer. Content is editorially adapted for this site and must receive final legal validation before production publication.

## Blog and tutorial reading pages

Shared chrome lives in `components/BlogPostLayout.tsx`. Domain and format badge colors come from `lib/content-accents.ts` (listing pages and article headers must use the same map).

### Article primitives

Prefer components in `components/article/primitives.tsx` over one-off hex colors inside posts:

- `ArticleStat` / `ArticleStatGrid` — metric tiles
- `ArticleCallout` — quotes and key-principle boxes
- `ArticleTimeline` — IR / event timelines
- `ArticleSourceFooter` — source lines
- `ArticleNote` — short italic caveats (tutorials)

### Content authoring checklist

1. Copy an existing page of the same **format** (Deep Dive / Thought / Tool / Tutorial / Dashboard).
2. Register the page in `app/data/content-index.ts` (`domain`, `format`, pretty `date`, `readingMinutes`, tags, excerpt).
3. Export page metadata: `export const metadata = contentMetadata('<id>')` from `lib/content-meta.ts`.
4. Pass accurate `readingTime` and pretty dates into `BlogPostLayout` (ISO dates are normalized, but prefer `Month D, YYYY`).
5. Multi-part posts: set `series` prev/next; do not paste the same incident narrative into both parts.
6. Tutorials: `footerVariant="tutorial"`; weeklies: `footerVariant="weekly"`.
7. Use design tokens / article primitives — no raw `#111` / `#00f0ff` surface chrome.
8. Run `pnpm check` before opening a PR.

Leave strong prose alone. Prefer mechanical polish over rewrites.
