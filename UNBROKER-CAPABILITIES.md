# What the unbroker suite can actually do

Delta V · 2026-08-19 · not legal advice · before PR

Robinson is **paper junk mail**. The suite also files **nLPD / GDPR demandes** (opposition, blocage, erasure) at directories and adtech. Credit files that demand an ID stay in a human digest.

Live proof (2026-08-19): Robinson form POSTed for Marc de Maio, confirmation page `robinsonliste-bestaetigung-fr`. Engine, consent, ledger held on the chief profile.

---

## Two lanes, same machine

| | Switzerland (`unbroker-ge`) | EU / UK (`unbroker-eu`) |
|---|---|---|
| Law | nLPD / FADP, French letter | GDPR Arts. 17 + 21, English letter |
| One-shot | Robinson (paper) | YourOnlineChoices (ads) |
| Then | Directories + Swiss traders + the same EU adtech that profiles CH | Adtech portals + Google Search + D&B |
| Never auto | CRIF, AZ Direct, Creditreform | SCHUFA, Experian, CRIF-EU |
| Student line | `Use unbroker-ge. I consent. I live in Geneva.` | `Use unbroker-eu. I consent. I live in the EU.` |

Install lives on this PC under  
`AppData\Local\hermes\profiles\chief\skills\security\`  
not `~/.hermes/skills`.

---

## Lane A — Switzerland (agent can file, no ID)

| Layer | Controller | What you get |
|---|---|---|
| Paper | **Liste Robinson (SDV)** | Stop cold addressed mail. **Done live.** |
| Paper | **La Poste** unsubscribe | Stop addressed mailings. Sticker on the box is still you. |
| Ads | **YourOnlineChoices** | Stop interest-based ads in the browser. |
| Directory | **local.ch / search.ch** | Hide listing + nLPD letter to `dataprivacy@localsearch.ch` |
| Directory | **Moneyhouse** | nLPD opposition to `contact@moneyhouse.ch` (person page, not Zefix) |
| Address trade | **KünzlerBachmann** | nLPD letter to `info@kbdirect.ch` |
| Credit-marketing | **Intrum** | Opposition to marketing / onward sale (`credit.check@intrum.com`) |
| Search | **Google results about you** | Delist name+address hits people actually Google |
| Adtech | **Criteo, Acxiom, LiveRamp** | Rights form or DPO email (they profile Swiss users too) |
| Company | **D&B** | Only if a **person/director** page exists |

**Homework (ID, you send):** CRIF access, AZ Direct *Sperrung*, Creditreform.

---

## Lane B — EU / UK (agent can file, no ID)

| Layer | Controller | What you get |
|---|---|---|
| Ads | **YourOnlineChoices** | One-shot for EDAA ad networks |
| Brokers | **Acxiom, Criteo, LiveRamp, Oracle Advertising** | GDPR erasure / object portals or DPO mail |
| Search | **Google results about you** | Same as CH |
| Company | **D&B** | Person page only |

**Homework (ID):** SCHUFA, Experian, CRIF-EU.

No Meta / TikTok / Amazon / Apple. Those are **account** deletions, not broker opt-outs.

---

## What a finished run looks like

1. Consent on disk. No consent → engine exits.
2. Queue drains: one-shot → scans → forms/emails.
3. `unbroker-receipt.md` with found / not_found / submitted.
4. Digest: ID-gated bureaus + anything that threw a hard CAPTCHA.
5. Honest labels: **filed**, not “erased from Switzerland / the EU.”
6. Optional +30 days: re-scan, catch re-lists.

Marc’s CH run already showed the useful split: Robinson **confirmed**; local.ch / Moneyhouse **not_found** (namesakes only) so the nLPD letters are preventive; D&B **blocked** (no person search) — not a fake `not_found`.

---

## What it will never do

- Official registers (OCPM, poursuites, Zefix / Handelsregister)
- Send a passport / ID
- Wipe a CRIF payment history
- Act on a third person
- Cite CCPA for a CH or EU resident

---

## Course vs client

| Course (40 min) | Client SKU later |
|---|---|
| One lane, no-ID queue, receipt on disk | Same engine + you post the ID-gated letters |
| Smart approvals | Isolated browser, 30-day cron |

Ship the course when install path + this target list are in the PR. Product copy can say: **paper mail, phone book, people-search, and the ad networks that buy Swiss/EU profiles** — not “we delete you from the internet.”
