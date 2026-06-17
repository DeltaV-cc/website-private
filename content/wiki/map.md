# Delta V Wiki â€” Map

**Karpathy-style minimalist wiki for a sovereign multi-profile ZHC.**

This document is the single source of truth for ownership, structure, and collaboration rules across all Hermes profiles. It reduces ambiguity so each profile can go deep in its lane while the whole stays aligned.

## Philosophy (inspired by dense, high-signal notes)
- Minimalist filenames and structure (map.md, deltav.md, log.md, index.md).
- Ownership is explicit and respected.
- Content is dense, first-principles, actionable. No fluff.
- The wiki itself compounds: every profile contributes in its primary sections and the map evolves with the org.

## Profile Ownership

| Profile        | Primary Sections                              | Secondary / Support          | Focus / Soul |
|----------------|-----------------------------------------------|------------------------------|--------------|
| **chiefstaff** | `soul/`, `deltav.md`, `map.md`, `governance/` | `synthesis/` (strategic), top-level kanban | Philosophy, constitution, profile orchestration, overall alignment, daily rhythm |
| **chiefintel** | `research/`, `synthesis/`, `intelligence/`    | `entities/`, `concepts/`, `signals/` | Deep research, threat intel, market structure, biofoundational analysis, weekly briefs |
|| **chiefcreative** | `concepts/`, `visuals/`, `branding/`, `blog/` | `tools/`, `synthesis/`, creative IP refs | High-signal framing, infographics, premium aesthetic, visual language, public blog / website content for Deltav.cc |
| **creative**   | `games/`, `film/`, `ip/`                      | `visuals/`, prototypes       | Original IP development, narrative, game/film production pipelines |
| **crypto**     | `web3/`, `opsec/`, `evm/`, `research/finance/crypto/` | `signals/`, `tools/`      | Web3 opsec, EVM security/hardening, agent infrastructure in crypto contexts |
| **software**   | `tools/`, `ai-agents/`, `engineering/`, `opsec-implementation/` | `scripts/`, `pipelines/` | Technical execution, self-sovereign tooling, skill authoring, automation, prototypes |
| **sales**      | `entities/` (commercial), `outreach/`, `pipeline/` | `signals/`, `research/` (leads) | Client acquisition, relationship intelligence, conversion playbooks |
| **default**    | Cross-profile coordination, `log.md`, `index.md`, top-level synthesis | `kanban/` (global view), wiki maintenance | General oversight, triage, routing to specialist profiles, meta-kanban, map stewardship |

## Rules

- **Primary owner** leads ingestion, quality, structure, and evolution for their sections. They are the "editor-in-chief" for that lane.
- **Secondary owners** can contribute but must coordinate with primary (via kanban card or @mention in notes).
- All profiles may contribute to shared areas (`tools/`, `signals/`, `synthesis/`) but the primary still owns cleanliness.
- When creating new wiki content, update this `map.md` first (or create a kanban task for chiefstaff to update it).
- The wiki lives to serve execution and self-evolution, not as a graveyard of notes.

## Current Wiki Status (as of 2026-06)

- The ownership map is defined.
- `deltav.md` (constitution) and `soul/` folder do not yet exist on disk â€” **chiefstaff** owns standing them up.
- Most profile-specific research, concepts, and tools are still implicit in skills, memories, and kanban rather than explicit wiki files.
- Kanban is the active execution layer that feeds the wiki (and vice versa).

## Recommended Wiki Structure (minimalist)

```
wiki/ (or central location referenced by the multi-profile-wiki skill)
â”œâ”€â”€ map.md                 # this file â€” ownership & rules
â”œâ”€â”€ deltav.md              # living constitution / operating principles (chiefstaff)
â”œâ”€â”€ index.md
â”œâ”€â”€ log.md                 # decisions, changes, rationale (default + chiefstaff)
â””â”€â”€ wiki/
    â”œâ”€â”€ research/          # chiefintel primary
    â”œâ”€â”€ synthesis/         # shared, chiefintel + chiefstaff strategic
    â”œâ”€â”€ concepts/          # chiefcreative primary
    â”œâ”€â”€ tools/             # software + all
    â”œâ”€â”€ signals/           # shared intelligence
    â”œâ”€â”€ entities/          # sales (commercial) + chiefintel
    â”œâ”€â”€ web3/              # crypto
    â”œâ”€â”€ opsec/             # crypto + software
    â”œâ”€â”€ evm/               # crypto
    â”œâ”€â”€ blog/              # crypto (opsec/web3/EVM high-signal posts) + chiefcreative (narrative framing)
    â”œâ”€â”€ games/             # creative
    â”œâ”€â”€ film/              # creative
    â”œâ”€â”€ soul/              # chiefstaff (philosophy excerpts, profile SOUL reviews)
    â””â”€â”€ governance/        # chiefstaff (map evolution, profile health)
```

## Kanban Integration
- Every wiki evolution task lives on the kanban with clear profile owner (lane or label).
- "Triage" lane for new notes/intel â†’ assigned to primary profile.
- "Execution" for deep writing/synthesis.
- Chiefstaff reviews cross-profile kanban daily for wiki debt.

## Notes
This map exists to reduce ambiguity and enable clean collaboration between profiles while preserving self-sovereignty and JouleWork.

Update this file (or delegate the update) whenever ownership or structure changes.

Next actions for chiefstaff:
- Stand up `deltav.md` skeleton.
- Create the top-level `wiki/` or equivalent directory structure.
- Review all profile SOUL.md files for drift against this map.

