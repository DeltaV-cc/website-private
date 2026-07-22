# Delta V design system

This file is the visual source of truth for new pages, articles, tutorials and courses. Reuse the shared components and tokens before adding page-specific CSS.

## Foundations

- **Fonts:** Geist for interface and display text; Geist Mono for indexes, labels and metadata.
- **Page shell:** `PageContainer` provides the `1440px` maximum width and `px-6 md:px-8` horizontal padding.
- **Page hero:** use `PageHero` from `app/components/PageShell.tsx`. It owns the back link, label, title scale, description spacing, spotlight and three accent bars.
- **Accents:** cyan for AI, orchid/orange for Web3, purple for Forge, amber for OpSec. The first hero bar uses the page accent; the two shorter bars stay cyan/purple.
- **Motion:** use the existing duration/easing tokens. Respect `prefers-reduced-motion`; never add a continuous animation to a content card.

## Surfaces and cards

The background must remain visible through content surfaces without sacrificing contrast.

- `--surface-card`: canonical dark card surface, currently `rgba(8, 11, 10, .76)`.
- `--surface-card-hover`: slightly lighter hover surface, currently `rgba(8, 11, 10, .68)`.
- `--surface-card-strong`: featured/listing surface, currently `rgba(8, 11, 10, .82)`.
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
