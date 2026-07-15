# Audit qualité — Site Delta V

> Audit page par page réalisé sur la branche `refonte-qualite`.
> Stack : Next.js 16 / React 19 / TypeScript / Tailwind v4, export statique (`output: 'export'`, basePath `/website-private`).
> Chaque page est notée sur **5 critères /5, total /25**.

## Grille de scoring

| Critère | Ce qu'il mesure |
|---|---|
| **Nav** | Liens corrects, bouton retour cohérent, page joignable depuis la navbar |
| **Vis** | Respect du design system (variables CSS) vs hex codé en dur / hors-charte |
| **Lis** | Contraste texte/fond, lisibilité (cible WCAG AA) |
| **SEO** | H1 unique, hiérarchie H2/H3, métadonnées |
| **Fon** | Aucun 404, aucun état bloqué, CTA et données fonctionnels |

---

## Tableau récapitulatif

| Page / Route | Nav | Vis | Lis | SEO | Fon | **Total** | Correctif |
|---|:-:|:-:|:-:|:-:|:-:|:-:|---|
| `/` (home) | 4 | 5 | 4 | 5 | 4 | **22** | A |
| `/ai/` | 5 | 5 | 4 | 5 | 5 | **24** | A (contraste) |
| `/web3/` | 5 | 5 | 3 | 5 | 5 | **23** | A (orange terne) |
| `/forge/` | 5 | 5 | 4 | 5 | 5 | **24** | A |
| `/contact/` | 5 | 5 | 4 | 5 | 4 | **23** | — |
| `/opsec/` (hub) | 3 | 4 | 4 | 5 | 4 | **20** | A, B, F |
| `/opsec/linux/` | 3 | 2 | 3 | 4 | 3 | **15** | D |
| `/opsec/macos/` | 3 | 2 | 3 | 4 | 3 | **15** | D |
| `/opsec/windows/` | 3 | 2 | 3 | 4 | 3 | **15** | D |
| `/tutorials/` | 3 | 4 | 4 | 4 | 4 | **19** | B, C |
| `/intelhub/` | 4 | 3 | 2 | 4 | 2 | **15** | A, E |
| `/blog/` (listing) | 3 | 5 | 4 | 5 | 3 | **20** | B, C |
| `/blog/defi-weekly/` (hub) | 3 | 4 | 4 | 5 | 3 | **19** | B (à supprimer), F |
| Articles blog — *pattern standard* (16) | 3 | 4 | 4 | 5 | 4 | **20** | B, C |
| Articles blog — *bespoke* (3) | 3 | 2 | 3 | 5 | 4 | **17** | B, C |
| Éditions *DeFi Weekly* (4) | 3 | 3 | 3 | 5 | 2 | **16** | B, C, E |

**Pages les plus faibles :** les 3 sous-pages OS (15), l'IntelHub (15), les éditions DeFi Weekly (16), les 3 articles bespoke (17).

---

## Problèmes transverses (chrome global — impactent toutes les pages)

Ces défauts ne sont pas propres à une page ; ils sont dans les composants partagés ou la config.

1. **Logo cassé (bouton "play")** — le logo dans la navbar et le footer est un triangle SVG inline (`M9 20V8l10 6-10 6z`), pas le vrai `ΔV`. Fichiers : [Navbar.tsx:16](app/components/Navbar.tsx#L16), [Footer.tsx:13](app/components/Footer.tsx#L13). Assets `delta-v-logo.svg` (racine + `public/`) faux et inutilisés. Favicon à régénérer. → **WS-A**
2. **Bouton retour incohérent** — aucun `router.back()` dans le code ; tous les "retour" sont des liens codés en dur vers une destination fixe (souvent `/` ou `/blog/`). Depuis une page profonde, "retour" ne ramène jamais à la page précédente. → **WS-B**
3. **Navbar incomplète** — [Navbar.tsx:6](app/components/Navbar.tsx#L6) n'expose ni `/opsec/` ni `/tutorials/` (joignables seulement via footer / page Forge). → **WS-A**
4. **Contraste faible** — [globals.css](app/globals.css) : `--text-muted` (α 0.22) et `--text-disabled` (α 0.12) échouent WCAG AA sur fond `#0a0a0a` ; rampe de fonds trop resserrée (`--bg-deep #0a0a0a` → `--bg-elevated #161616`), les cartes se détachent mal. Usages inline `text-[#ededed]/15../30` dans l'IntelHub. → **WS-A**
5. **Artefacts de build périmés commités** — `*.html`, `*.txt`, `_next/` à la racine : vieux export hors-charte (titre "Create Next App", liens sans basePath). **Non servis en prod** (le CI reconstruit), mais polluent le repo et prêtent à confusion. → **WS-G**
6. **Config locale cassée** — [next.config.ts:11](next.config.ts#L11) : `turbopack.root` figé sur un chemin d'une autre machine, casse `next dev` en local. → **WS-G**

---

## Détail par page

### `/` — Home ([app/page.tsx](app/page.tsx)) — 22/25
Solide, entièrement sur le design system. H1 unique, CTAs fonctionnels (`/intelhub/`, `/contact/`), logos "Trusted By" présents dans `public/images/`. Pénalité : logo global cassé (Nav/Fon). Bon point de référence pour l'homogénéisation.

### `/ai/`, `/web3/`, `/forge/` — 24 / 23 / 24
Propres (0 hex codé en dur), H1 unique, cohérents. `/web3/` : l'orange `--accent-orange #C2410C` en texte/pills sur fond sombre est un peu terne (Lis 3). Tous les CTA pointent vers `/contact/` (cohérent).

### `/contact/` — 23/25
Seul vrai formulaire du site (2 `<input>`). Propre. À vérifier en exécution : comportement de soumission en export statique (`form-action 'self'` dans `_headers`).

### `/opsec/` (hub) — 20/25
Globalement sur charte, mais **bouton retour → home** codé en dur ([opsec/page.tsx:11](app/opsec/page.tsx#L11)), une section "Key References" (source) et des liens vers 3 sous-pages OS hors-charte.

### `/opsec/linux/`, `/macos/`, `/windows/` — 15/25 (les plus faibles)
**Hors design system** : hex codé en dur, `prose max-w-3xl` au lieu des variables et de la largeur du site ([opsec/linux/page.tsx:4](app/opsec/linux/page.tsx#L4)). C'est ce qu'Alexandre décrit comme "template différent". Le texte tronqué/centré vient en plus des vieux HTML périmés (`opsec/linux.html` etc.). Ligne "Source: …" à retirer. → reconstruire via le futur `TutorialLayout` (**WS-D**).

### `/tutorials/` — 19/25
Fichier **monolithique** ([tutorials/page.tsx](app/tutorials/page.tsx)) : 3 tutos en accordéon inline, **aucune route individuelle**, **aucun bouton copier** sur les blocs de commande, eyebrows "Source", retour → home. Titres en `<h4>` dans les cartes (à normaliser). → découpage en pages + template (**WS-C**).

### `/intelhub/` — 15/25
**Bug Rekt Watch** : aucun filtre de date, les labels "Last 24h" sont cosmétiques → de vieilles news restent affichées ([CryptoFrontierSignals.tsx:5](app/intelhub/components/CryptoFrontierSignals.tsx#L5), [AIFrontierSignals.tsx:8](app/intelhub/components/AIFrontierSignals.tsx#L8), [PulseFeed.tsx:71](app/intelhub/components/PulseFeed.tsx#L71)). **Contraste faible** : nombreux `text-[#ededed]/15../30`. → **WS-E** (filtre 7 jours) + **WS-A** (contraste).

### `/blog/` (listing) — 20/25
Le filtre par catégorie global fonctionne, mais **les tags de chaque carte ne sont pas cliquables** (simples `<span>`), **pas de sidebar** de filtres (date/thème), **retour → home** codé en dur ([blog/page.tsx:191](app/blog/page.tsx#L191)), et la carte "DeFi Weekly" pointe sur le **hub intermédiaire** ([blog/page.tsx:224](app/blog/page.tsx#L224)) au lieu de l'article. → **WS-C** + **WS-B**.

### `/blog/defi-weekly/` (hub) — 19/25 — **à supprimer**
Page intermédiaire "historique" qui ajoute un clic entre le listing et l'édition. Contient le tableau `SOURCES` rendu en "Data Sources" et "What We Track" (stack d'outils exposée). → supprimer la page (**WS-B**) et ses blocs sources (**WS-F**).

### Articles blog — pattern standard (16, via `BlogPostLayout`) — 20/25
Chrome partagé correct, H1 unique. Défauts communs : **retour toujours vers `/blog/`** (pas contextuel), **liens/blocs "Sources"**, **blocs de code en hex codé en dur** (ex. `github-security-audit` `#111`/`#222`), **aucun sommaire**, **aucun bouton copier**. → enrichir le template (**WS-C**).

### Articles blog — bespoke (3 : first-principles, lessons-from-kpk-war-room, risk-dashboards-opsec) — 17/25
N'utilisent pas `BlogPostLayout` : coquille propre, hex codé en dur (13 à 46 occurrences), retour cyan codé en dur. À migrer sur le template partagé (**WS-C**).

### Éditions DeFi Weekly (4) — 16/25
Très dépendantes d'un **fetch externe** (`artemis-newsletter.json`) : en cas d'échec, blocage permanent sur "Loading Artemis newsletter…" ([defi-weekly-july-10/page.tsx:157](app/blog/defi-weekly-july-10/page.tsx#L157)). Beaucoup de hex codé en dur (jusqu'à 149). Contiennent le **bon** pattern visuel "Rekt Watch — Last 7 Days" à réutiliser pour harmoniser l'IntelHub (**WS-E**). **Route orpheline** : `defi-weekly-july-13` est en ligne mais absente du listing (**WS-B**).

---

## Synthèse & priorités

| Priorité | Workstream | Impact |
|---|---|---|
| 1 | **WS-A** Branding & fondations | Logo, contraste, navbar : visible sur 100% des pages |
| 1 | **WS-G** Nettoyage config/artefacts | Débloque `next dev` local, assainit le repo |
| 2 | **WS-B** Navigation & liens | Bouton retour, hub intermédiaire, CTA newsletter, route orpheline |
| 3 | **WS-C** 4 templates dynamiques | Le gros morceau : homogénéise blog + tutos, ajoute sommaire/copier/filtres |
| 4 | **WS-D** Pages OpSec OS | Remet les 3 pages les plus faibles sur charte |
| 4 | **WS-E** Rekt Watch 7 jours | Corrige le bug de fenêtre temporelle |
| 5 | **WS-F** Sources | Retire les blocs "Data Sources" / "What We Track" |

Aucun lien interne cassé (404) détecté statiquement ; les risques 404 réels sont la route orpheline et l'ancienne navbar des HTML périmés (non servis en prod).
