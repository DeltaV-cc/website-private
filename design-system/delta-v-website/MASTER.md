# Delta V — Jungle Mist / Acceleration

Design system generated and refined with UI/UX Pro Max on 2026-07-16. The implementation keeps the existing Geist family and content/routes while moving the visual language from dashboard cards to an editorial engineering studio.

## Direction

- Graphite and deep forest backgrounds; mist green/cyan for primary signal, amber for action and macro context.
- ASCII is decorative, organic and schematic: fronds, roots, paths and signal lines. Never a literal tropical forest or retro terminal.
- Use open panels, thin rules, asymmetrical grids and annotated metadata. Avoid repeated rounded rectangles and neon gradients.
- Motion is concentrated in the hero canopy, signal feeds and short reveals. Hover/focus pauses feeds; `prefers-reduced-motion` disables continuous movement.

## Tokens

The source of truth is `app/globals.css`: `--bg-deep`, `--bg-surface`, `--bg-elevated`, `--accent-cyan`, `--accent-orange`, `--accent-purple`, `--accent-mist`, `--border-default`, `--font-sans`, and `--font-mono`.

## Patterns

- Homepage hero: 12-column asymmetrical layout with a `AsciiMist` schematic and a three-point status rail.
- Capability map: one dominant capability plus two supporting branches, not three identical product cards.
- IntelHub: signal canopy, editorial tabs, open data panels, controlled horizontal pulse feed.
- CTA: two intentional actions maximum; missions and systems language, never ecommerce language.

## Accessibility and QA

- Visible `:focus-visible` states and keyboard-operable tab navigation.
- Body and secondary text chosen for WCAG AA contrast on the dark palette.
- Test at 375, 768 and 1440px. Check keyboard focus, reduced motion and no horizontal overflow on mobile.
- Continuous feeds stop on hover and focus. Users can still scroll them manually.

## 21st.dev reference use

21st.dev was used as a reference source for targeted ASCII/schematic and motion patterns only. No external component dependency or second design system was introduced; `AsciiMist` is local and tokenized for Delta V.
