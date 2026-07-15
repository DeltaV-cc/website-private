
+---------------------------------------+
|          Hermes PowerTools            |
+---------------------------------------+
| paperclip  -> paperclipai run         |
| oc         -> OpenCode Zen chat       |
| oc-zen     -> OpenCode Zen chat       |
| oc-go      -> OpenCode Go chat        |
| oc-run     -> OpenCode run (1 cmd)    |
| gem        -> Gemini CLI              |
| wacom      -> restart Wacom tablet    |
| aliases    -> cette liste             |
+---------------------------------------+

# Proposition UI/UX — Delta V

> Établie avec le référentiel **ui-ux-pro-max** (10 catégories priorisées) appliqué à l'état actuel du code,
> en cohérence avec le [design-system/MASTER.md](design-system/MASTER.md) déjà présent dans le repo
> (généré par ce même skill). **Aucune de ces propositions n'est implémentée** — c'est la liste à
> prioriser ensemble pour la prochaine passe.
>
> Impact : 🔴 fort · 🟠 moyen · 🟡 confort — Effort : S (heures) · M (demi-journée) · L (journée+)

## Propositions par priorité du référentiel

### P1 — Accessibilité (CRITICAL)

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 1 | Le formulaire contact n'a **aucun `<label>`** (placeholder-only, anti-pattern `input-labels`) et le focus des radios `sr-only` est invisible sur le span stylé | Labels visibles + `peer-focus-visible:ring` sur les radios "I Need" | 🔴 | S |
| 2 | Labels en `text-[10px]` généralisés (eyebrows, badges, meta) — sous le plancher de 12px du référentiel, souvent en `--text-muted` en plus | Passer les textes porteurs de sens à 11-12px minimum ; réserver 10px aux ornements purs | 🟠 | M |
| 3 | Pas de **skip-link** "aller au contenu" | Ajouter un skip-link dans `MainLayout` | 🟡 | S |
| 4 | Le ticker Pulse est une région défilante sans sémantique | `role="region"` + `aria-label="Latest signals"` + mention de la pause au survol | 🟡 | S |

### P2 — Touch & Interaction (CRITICAL)

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 5 | Le bouton **Copy des blocs de code est `opacity-0` hors hover** → invisible au tactile (anti-pattern `hover-vs-tap`) | Toujours visible sous `lg:` (pas de hover sur mobile) | 🔴 | S |
| 6 | Tags cliquables des cartes (blog/tuto) et boutons de filtre : cibles < 44px | Augmenter le padding tactile (`py-2` + hit-area étendue) | 🟠 | S |
| 7 | La navbar n'indique **pas la page courante** (anti-pattern `nav-state-active`) | `usePathname()` + état actif (couleur primaire + soulignement) | 🔴 | S |

### P3 — Performance (HIGH)

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 8 | Images sans `width/height` (`hermes-qwen-dgx-stack.jpg`, `signal-qr.png`, logos Trusted By) → CLS | Déclarer les dimensions ou `aspect-ratio` | 🟠 | S |
| 9 | IntelHub charge ~17 composants dashboard d'un coup | `next/dynamic` sur les dashboards non actifs (seul l'onglet actif se charge) | 🟠 | M |

### P4 — Cohérence de style (HIGH) — le plus gros gain

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 10 | **L'IntelHub est stylé en hex codés en dur** (`#111`, `#222`, `#ededed/25`…) dans ses 17 composants, pas avec les tokens — c'est visuellement "un autre site" | Migration systématique vers les tokens (`--bg-surface`, `--border-default`, `--text-*`) — mécanique mais volumineuse | 🔴 | L |
| 11 | Deux systèmes de badges "type" coexistent (typeConfig cyan du blog vs badge vert "Tutorial" de Forge) | Un seul composant `TypeBadge` partagé | 🟠 | S |
| 12 | Les classes d'élévation `.elevated-*` définies dans globals.css sont quasi inutilisées ; chaque carte redéfinit ses ombres/hover | Adopter l'échelle d'élévation partout (ou la supprimer) | 🟡 | M |
| 13 | Éditions DeFi Weekly : encore ~150 hex codés en dur par fichier | Même migration tokens que l'IntelHub | 🟠 | M |

### P5-P7 — Layout, typo, animation (MEDIUM)

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 14 | Rythme vertical incohérent entre pages (`pt-16 pb-12` vs `py-16 md:py-20` vs `pt-24`) | Standardiser 3 paliers de section (ex. 48/64/96) via classes utilitaires | 🟠 | M |
| 15 | Chiffres des tuiles de prix sans `tabular-nums` (déjà présent sur le Pulse) → les prix "sautent" au refresh | `tabular-nums` sur toutes les valeurs numériques du dashboard | 🟡 | S |
| 16 | Durées d'animation dispersées (75/150/200/300/500ms inline) alors que les tokens `--duration-*` existent | Brancher les transitions sur les tokens | 🟡 | M |
| 17 | `stagger-children` et les dots pulsants ne respectent pas complètement `prefers-reduced-motion` | Étendre la règle reduced-motion existante | 🟡 | S |

### P9 — Navigation (HIGH)

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 18 | **Tutorials en navbar** alors que c'est un enfant de Forge — exactement le cas OpSec qu'on vient de fusionner | Le retirer de la nav (accès via Forge + footer) → nav à 6 : AI, Web3, Forge, Blog, IntelHub, Contact | 🟠 | S |
| 19 | Formulaire contact en `action="mailto:"` — dépend du client mail configuré, échoue silencieusement sinon | Backend léger (Formspree/worker Cloudflare) avec états submit/succès/erreur | 🔴 | M |

### P10 — Data viz (LOW)

| # | Constat | Proposition | Impact | Effort |
|---|---|---|---|---|
| 20 | Sparklines et DataBars sans tooltip ni valeur exacte accessible | Tooltips au survol + `aria-label` résumant la tendance | 🟡 | M |

**Ordre recommandé si on fait une seule passe** : #10 (tokens IntelHub) + #7 (nav active) + #5 (copy tactile) + #1 (labels formulaire) — c'est ~80 % du gain perçu.

---

## Audit ressenti — ce qui est encore décousu (avis honnête)

1. **La home fait deux métiers à la fois.** Le récit commercial (héro → piliers → offres phares → preuve sociale → CTA) est coupé en plein milieu par le bloc CuratedIntel (dashboard de news). Un prospect qui découvre Delta V perd le fil ; un habitué du feed n'a pas besoin du pitch. Reco : déplacer CuratedIntel après "Trusted By", ou le réduire à un bandeau compact "3 derniers signaux → IntelHub".

2. **Redondance home ↔ Forge.** Les "Flagship Offerings" de la home (Personal AI Mastery, Bootcamp) sont les mêmes cartes que les "Flagship Curriculums" de Forge, avec un wording différent. Deux endroits à maintenir, aucun n'est la référence. Reco : la home teaser (titre + 1 ligne + lien), Forge détient le détail.

3. **Le nommage de Forge est instable** : "Forge" (nav), "Skill Forge" (footer), "Forge Skills" (h1), "Pillar 03 · Education" (eyebrow). Quatre noms pour la même chose diluent la marque. Reco : choisir un nom et le décliner partout.

4. **L'IntelHub est un autre site.** Densité, hex codés en dur, styles de badges différents — la transition home → IntelHub casse l'unité (c'est le point #10 ci-dessus, mais c'est aussi un ressenti global).

5. **Tutorials en nav est le symétrique du problème OpSec** qu'on vient de résoudre. Tant qu'il y est, la nav mélange piliers business et sous-contenus.

6. **Le pied d'article "Intel pipeline note — generated and verified through the Delta V intelligence system"** sonne interne/robotique sur chaque article. Une ligne de valeur ("Get this intel weekly →") servirait mieux.

7. **Le formulaire contact en mailto: est le point le plus fragile du funnel** : tout le site converge vers lui, et il échoue silencieusement chez quiconque n'a pas de client mail configuré (la majorité sur desktop).

Ce qui marche bien et qu'il faut préserver : le design system de tokens (maintenant avec `--accent-primary`), les templates partagés blog/tuto (sommaire, copy, progression), la structure par piliers, et le pipeline data statique de l'IntelHub.
