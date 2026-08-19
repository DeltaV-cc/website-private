---
name: unbroker-ge
description: >
  File Swiss (Geneva) data-broker opt-outs that do not need an ID copy:
  Robinson list, local.ch / search.ch, Moneyhouse, La Poste mailing stop,
  Dun & Bradstreet if the person appears. Use when the user says unbroker-ge,
  clean my digital footprint in Geneva or Switzerland, Robinson list, opt out
  of local.ch or Moneyhouse, or runs /unbroker-ge. Do not use for third
  parties, public registers, or requests that require a passport/ID scan.
license: MIT
metadata:
  hermes:
    tags: [privacy, data-broker, fadp, geneva, opt-out]
    category: security
---

# unbroker-ge

Remove a **consenting Geneva resident's** personal listing from the Swiss
brokers that accept a name + address + email. No ID scan. Not legal advice.
Letters follow the Confederation's [EDÖB sample letters](https://www.edoeb.admin.ch/de/musterbriefe-datenschutz).

Official Hermes `unbroker` is US people-search (Spokeo, Whitepages, California
DROP). This skill is the Geneva course loop. Do not install or run the US
skill unless the person also has a US phone or a US stay and asks for it.

## Hard limits

- No consent recorded in the receipt → stop.
- Act only on the person speaking. Family / clients need their own session.
- Never send, attach, or store a pièce d'identité, AVS number, or passport.
- Never volunteer date of birth. If a form requires it, queue that target as
  `human_task` instead of inventing a date.
- Prefer **blocage / opposition** over full deletion (address traders re-import
  a deleted row).
- Letters in **French**. Cite nLPD / FADP (art. 30 al. 2 let. b and art. 32).
  Do not cite CCPA. Do not cite GDPR unless the person asked.
- Do not file against OCPM, Office des poursuites, registre du commerce,
  Zefix, HUG, SIG, TPG, the commune, or any organisation internationale.
- A later reply that asks for ID is success: record it in the digest, do not
  attach the scan.
- `confirmed` only after you re-open the listing and it is gone. A thank-you
  page is not confirmation.

## Intake (one pass)

Collect, write into the receipt, then start. Do not come back with extra
questions mid-run.

- Full name + aliases (nom d'alliance, nom de célibataire)
- Street, NPA, commune in canton **GE**
- Prior Swiss addresses (optional)
- `+41` phones, emails
- Spoken consent: they want you to file **their** opt-outs
- Working folder they own (default: a `unbroker-ge/` folder they name)

If they are not in Geneva, say this skill is Geneva-shaped and still run only
the nationwide targets (Robinson, localsearch, Moneyhouse, Poste, D&B).

## Loop

1. Write `unbroker-receipt.md` in the working folder from
   `templates/receipt.md` (create a stub if the template is missing).
2. Search the person on every **scan** target below. Record found / not_found
   with the listing URL. A 404 or block page is inconclusive, not `not_found`.
3. File every **no-ID** action, including Robinson even when nothing was found
   (blind opposition is allowed: you only send their own identifiers to the
   controller's official channel).
4. Skip a target when the live flow demands ID, a phone callback, or a
   government portal login you cannot complete. Draft the letter, put it in
   the digest.
5. Re-check localsearch and Moneyhouse if the site said it would update
   immediately. Otherwise stamp `awaiting` and a date +30 days.
6. Present the receipt and the human digest. Stop.

Do not pause to ask which broker to do next. Drain the table.

## Targets

| id | Who | Scan | File now (no ID) | If they demand ID |
|---|---|---|---|---|
| robinson | Liste Robinson (SDV) | — | French form [robinsonliste-fr](https://sdv-konsumenteninfo.ch/robinsonliste-fr/). Private persons living in Switzerland only. File **first**. | Digest |
| localsearch | local.ch / search.ch (Swisscom Directories) | Search name + commune on local.ch and search.ch | (a) [Supprimer / modifier l'inscription](https://www.localsearch.ch/fr/votre-inscription/) — phone + email account. (b) Rights form or email `dataprivacy@localsearch.ch` with the letter | Digest |
| moneyhouse | Moneyhouse (itonex) | Search name + Genève on moneyhouse.ch | Contact form or `contact@moneyhouse.ch` with the letter. `/fr/deletion` was a 404 on 2026-08-19 — do not use it | Digest |
| poste | La Poste | — | [Désinscription mailing](https://www.post.ch/fr/pages/unsubscribe-mailing). Yellow **Stop Pub** sticker on the letterbox → digest (human, 30s) | — |
| dnb | Dun & Bradstreet CH | Search only if they are (or were) a company officer | [TrustArc rights portal](https://submit-irm.trustarc.eu/services/validation/ba81b98f-997d-4216-b4cc-d64cf261b082) if a **person** page exists | Digest |

### Do not file in this run

CRIF (`selbstauskunft.ch@crif.com`), AZ Direct (`datenschutz@az-direct.ch`),
Creditreform — they require an ID copy. If a scan finds a listing, add one
line to the digest: print the EDÖB letter, attach ID, send. Do not send it.

## Letter

Use `templates/opposition.fr.txt`. Send only: name, postal address, contact
email, listing URL if you have one. Nothing else.

If you cannot open the official web form (CAPTCHA you cannot pass, login
wall), send the letter to the email in the table instead. Never use a
CAPTCHA-solving service.

## Receipt

Overwrite the stub so it contains:

- Consent line + date
- Provider + model that ran
- Table: target / found URL / what was filed / awaiting or confirmed
- Human digest (ID-gated, Stop Pub sticker, anything blocked)
- Three lines: Think / Act / Observe

The receipt is the proof. Chat is not.
