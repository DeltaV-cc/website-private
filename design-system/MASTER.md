# Delta V — Design System

> Generated with [UI/UX Pro Max](https://uupm.cc)  
> Profile: AI Engineering + Web3 OpSec Consulting  
> Style: Dark Mode (OLED) + Cyberpunk UI + Trust & Authority

---

## Brand Identity

Delta V is a sovereign AI and Web3 opsec consulting firm. The design language reflects precision, depth, and authority — deep blacks with neon accents, technical but polished.

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0a0a0a` | Page background |
| `--bg-surface` | `#111111` | Cards, sections |
| `--bg-elevated` | `#1a1a1a` | Hover states |
| `--bg-card` | `#0d0d0d` | Card default |
| `--text-primary` | `#ededed` | Body text |
| `--text-secondary` | `rgba(237,237,237,0.6)` | Secondary text |
| `--accent-cyan` | `#00f0ff` | AI / primary accent |
| `--accent-purple` | `#a855f7` | Web3 accent |
| `--accent-amber` | `#f59e0b` | Macro/intel accent |
| `--accent-orange` | `#C2410C` | Cybersec accent |
| `--border-default` | `#222222` | Card borders |

### Typography

- **Headings**: Geist Sans (variable font)
- **Body**: Geist Sans
- **Code**: Geist Mono
- **Scale**: 12px → 72px

### Effects

- **Card borders**: 1px solid `#222` with hover transition to `rgba(255,255,255,0.15)`
- **Glows**: `0 0 20px rgba(color, 0.15)` for accent colors
- **Transitions**: 200ms ease (base), 300ms ease (slow)

---

## Page Architecture

### Homepage
```
Nav (sticky, backdrop-blur)
├── Logo + Navigation links
└── Live indicator + RSS badge

Hero
├── Headline: "We don't sell tools. We forge capabilities."
└── Subtitle: Positioning statement

Three Pillars (clickable cards)
├── AI Engineering — cyan (#00f0ff)
├── Web3 — orange (#C2410C)
└── Skill Forge — purple (#a855f7)

> **Page scaffolding:** use `app/components/PageShell.tsx` (`PageHero`, `PageContainer`, `ServiceCard`) and follow `design-system/PAGE_TEMPLATE.md` for every new page.

Curated Intel (auto-scrolling feed)
└── Latest signals from pipeline

Footer
```

### Component Patterns

| Component | Style | States |
|-----------|-------|--------|
| Navigation link | `text-sm` with hover color | hover → accent color |
| Pillar card | `bg-[#111] border-[#222] rounded-3xl` | hover → accent border |
| Button | `px-6 py-2.5 rounded-xl` | hover → bg white/black |
| Intel card | `w-[260px] rounded-2xl border` | hover → border lighter |
| Badge | `px-2 py-0.5 rounded text-[10px]` | color-coded per category |

### Responsive Breakpoints

- `375px` — Mobile
- `768px` — Tablet
- `1024px` — Desktop
- `1440px` — Wide

---

## Accessibility

- Color contrast: minimum 4.5:1 for text
- Focus-visible outlines on all interactive elements
- `prefers-reduced-motion` respected
- Alt text on all images

## Anti-Patterns to Avoid

- ❌ AI purple/pink gradients (overused in Web3)
- ❌ Generic stock imagery
- ❌ Neon on neon (ensure contrast)
- ❌ Emojis as icons (use SVG: Heroicons/Lucide)
- ❌ Autoplay video/audio
- ❌ Harsh animations
