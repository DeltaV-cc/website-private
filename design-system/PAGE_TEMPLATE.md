# Delta V — Page Template (Reusable Structure)

Use this pattern for every new or incomplete page (`/web3`, `/forge`, `/opsec`, `/contact`, tutorials, etc.) so the site stays cohesive with the homepage and AI page.

**Rules:** never invent new marketing copy unless asked. Structure and presentation only.

---

## 1. Imports

```tsx
'use client';

import Link from 'next/link';
import { PageHero, PageContainer, ServiceCard } from '../components/PageShell';
// Optional: Button from '../components/ui'
```

---

## 2. Pillar / service page skeleton

```tsx
export default function ExamplePage() {
  return (
    <>
      <PageHero
        label="Pillar 0N · Name"          // existing label text only
        title="Page Title"                // existing H1 text only
        description="Existing subtitle."  // existing body only
        accent="cyan" | "orange" | "purple" | "amber"
        backFallback="/"                  // or parent: /opsec/, /tutorials/
        backLabel="Home"                  // or "OpSec", "Tutorials"
      />

      <PageContainer className="pb-24 space-y-5" as="section">
        <ServiceCard title="Existing service name" accent="cyan">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            {/* existing paragraphs — do not rewrite */}
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors"
          >
            {/* existing CTA label */} →
          </Link>
        </ServiceCard>
        {/* more ServiceCards… */}
      </PageContainer>
    </>
  );
}
```

---

## 3. Accent map (brand language)

| Domain        | Accent token | Typical use                          |
|---------------|--------------|--------------------------------------|
| AI / primary  | `cyan`       | AI pillar, primary CTAs, focus rings |
| Web3 / action | `orange`     | Web3 pillar, strong action CTAs      |
| Highlights    | `purple`     | Forge, blog accents, secondary CTAs  |
| OpSec / warn  | `amber`      | Security, secondary service cards    |

---

## 4. Learning / long-form pages (tutorials, opsec guides, blog)

1. **BackLink** via `PageHero` or standalone `<BackLink fallback="/tutorials/" label="Tutorials" />`.
2. **Document outline:** one `h1`, section `h2`s, subsection `h3`s — never skip levels.
3. **Article body:** wrap markdown/HTML in `className="article-prose"` (see `globals.css`).
4. **Copy buttons:** already injected for `<pre>` by `BlogPostLayout` — reuse that layout for tutorials when possible.
5. **Optional TOC:** sticky side nav listing `h2` anchors; labels must match existing headings exactly.
6. **Reduced motion:** do not add autoplay carousels without `prefers-reduced-motion` guards.

---

## 5. Visual tokens (do not hardcode random colors)

- Backgrounds: `var(--bg-deep)`, `var(--bg-surface)`, `var(--bg-elevated)`
- Text: `var(--text-primary)` → `var(--text-disabled)` ramp
- Borders: `var(--border-default)`, hover → `var(--border-hover)`
- Cards: `rounded-2xl border … p-8 md:p-10` or `ServiceCard` / `card-interactive`
- Max width: `max-w-[1440px]` via `PageContainer`
- Nav offset: main already has `pt-16`; page heroes use `pt-12 md:pt-16`

---

## 6. Accessibility checklist

- [ ] Skip link works (`#main-content`)
- [ ] Active nav item has `aria-current="page"`
- [ ] Interactive cards/links have visible `:focus-visible`
- [ ] Images have meaningful `alt` (logos: brand name)
- [ ] Decorative SVGs: `aria-hidden="true"`
- [ ] Headings sequential
- [ ] Contrast ≥ WCAG AA on body text (use design tokens)

---

## 7. Static export constraints

- `output: 'export'`, `basePath: '/website-private'`
- Client `fetch` to public assets **must** prefix `/website-private`
- Prefer `<Link href="/path/">` (trailing slash) for internal routes
- No server-only APIs in page components
- Images: static paths under `public/` (already unoptimized)

---

## 8. File placement

| Page type     | Path                         |
|---------------|------------------------------|
| Pillar        | `app/<name>/page.tsx`        |
| Nested guide  | `app/<name>/<sub>/page.tsx`  |
| Shared chrome | `app/components/PageShell.tsx`, `Navbar`, `Footer` |
| Tokens        | `app/globals.css`            |

When in doubt: open `app/ai/page.tsx` and mirror structure, then paste existing copy into the slots.
