# OpSec + Forge — Product Map

## Organizing principle

**Products over sprawl.** Do not grow a maze of half-filled curriculum cards and long tutorials that compete for attention.

| Product | Path | Role |
|---------|------|------|
| **SOTA Operator Stack** | `/opsec/sota-stack/` | DeFi-native blueprint: treasury keys, signer ops, DeFi runbooks (spine) |
| **Treasury key training** | `/contact/` (scoped) | Facilitated ceremony + Safe design for teams |
| **x402 Workshop** | `/forge/x402-workshop/` | Optional module: machine payments / agent float |
| **OS guides** | `/opsec/linux\|macos\|windows/` | Tactical floor under the stack |
| **OpSec hub** | `/opsec/` | Illustrations + pointers to D/E + OS |
| **Tutorials** | `/tutorials/*` | Optional deep reference (not the sales path) |

```
SOTA Operator Stack  ──blueprint──►  implement alone or via retainer
         │
         └── workshop ──►  x402 half-day (Forge)
         │
         └── guides ──►  Linux / macOS / Windows
```

---

## YubiKey placement

| Layer | Role |
|-------|------|
| Identity | OS, SSH, IAM, deploy, passkeys |
| Workshop | Enroll human admin paths; never mainnet treasury in the room |
| Stack | Separate from hardware-wallet **capital** custody |

---

## Top-tier solutions (explicit on site)

| Solution | Mandate | Positioning |
|----------|---------|-------------|
| **Taurus** | Institutional-grade custody | Banking-grade custody, HSM/MPC, policy engines, regulated AUM |
| **Opsek** | HNW / high-risk security | Professional OS + personal security depth for high-net-worth operators |

Component: `app/components/TopTierSecurity.tsx` on `/opsec/` and `/opsec/sota-stack/`.

Sovereign / DAO operator stack is complementary - not a substitute when the mandate is institutional or HNW-specialist.

Also: Yubico / FIDO2, WalletBeat, arXiv - supporting refs on hub.

---

## What not to expand first

- More fragmented `/opsec/onchain/` curriculum cards without a product home
- Turning the x402 tutorial into the main CTA (keep it as optional reference if needed)

## What to sell / schedule

1. Workshop cohorts (E)
2. Stack audit / implementation retainer against (D)
3. OS hardening as entry for solo operators

---

## Architecture components

- `ArchitectureDiagram`, `ArchitectureFlow` - diagrams
- `OpSecIllustrations` - hub threat model visuals
