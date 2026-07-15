'use client';

import Link from 'next/link';
import { PageHero, PageContainer } from '../../components/PageShell';
import ArchitectureDiagram, { ArchitectureFlow } from '../../components/ArchitectureDiagram';
import TopTierSecurity from '../../components/TopTierSecurity';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LAYERS = [
  {
    id: 'human',
    title: 'Human identity',
    accent: 'text-[var(--accent-amber)]',
    items: [
      'YubiKey (FIDO2) on OS login, SSH, cloud IAM, GitHub, and any admin surface',
      'Named people, no shared root or shared seed phrases between signers',
      'Session hygiene: short-lived tokens, phishing-resistant MFA everywhere capital decisions happen',
    ],
  },
  {
    id: 'endpoint',
    title: 'Hardened endpoint',
    accent: 'text-[var(--accent-cyan)]',
    items: [
      'Clean OS + full-disk encryption (Linux / macOS / Windows baselines)',
      'Browser isolation for Safe UI, dApps, and governance portals',
      'No random wallet extensions; known-good RPC / bookmark discipline',
    ],
  },
  {
    id: 'treasury',
    title: 'Treasury key management',
    accent: 'text-[var(--accent-orange)]',
    items: [
      'Safe (or equivalent) multisig as the default capital container',
      'Hardware wallets per signer; offline seed ceremony and dual-control backups',
      'Role design: proposers vs signers vs ops; geographic and org diversity of keys',
      'Thresholds, spending limits, and timelocks matched to decentralization stage',
    ],
  },
  {
    id: 'defi',
    title: 'DeFi operations blend',
    accent: 'text-[var(--accent-purple)]',
    items: [
      'Allowance hygiene: no infinite approvals by default; revoke / rotate cadence',
      'Simulate before sign (tenderly-class or equivalent); verify calldata, not only UI labels',
      'Protocol interaction runbooks: LP, gauges, grants, bridge, governance votes',
      'Frontend trust model: official domains, dual-channel verification for large moves',
    ],
  },
  {
    id: 'ops',
    title: 'Hot ops & automation (optional)',
    accent: 'text-[var(--accent-vibe-cyan)]',
    items: [
      'Dedicated ops / grant / agent float - never the treasury Safe seed path',
      'Hard spend caps and allowlists when bots or x402-style machine payments appear',
      'Clear promotion path: ops wallet → treasury only via deliberate multisig',
    ],
  },
  {
    id: 'observe',
    title: 'Observability & recovery',
    accent: 'text-[var(--accent-green)]',
    items: [
      'Signer availability SLAs; emergency rotate if a key or person is compromised',
      'On-chain monitoring of Safe, large approvals, and anomalous outflows',
      'Tabletop drills: lost signer, malicious proposal, UI phishing, bridge incident',
    ],
  },
];

const TREASURY_TRAINING = [
  {
    title: 'Ceremony design',
    body: 'How seeds are generated, written, stored, and dual-controlled. Who is allowed in the room. What never goes on a phone photo or cloud note.',
  },
  {
    title: 'Signer operating system',
    body: 'Hardware wallet model, firmware cadence, YubiKey for the human, and a personal checklist before every signature session.',
  },
  {
    title: 'Proposal hygiene',
    body: 'Who can propose, who must review calldata, what dollar threshold needs an extra pair of eyes, and when a timelock is mandatory.',
  },
  {
    title: 'Decentralization stage fit',
    body: 'Early team (tight m-of-n) vs high decentralization (wider signer set, slower path to funds, public runbooks). Raise friction as value and trust assumptions grow.',
  },
];

const DEFI_OPS = [
  { label: 'Approvals', detail: 'Scoped allowances, regular revokes, no silent Permit traps' },
  { label: 'Simulation', detail: 'Pre-sign state diffs; refuse if UI and calldata disagree' },
  { label: 'Governance', detail: 'Vote / execute paths separated from day-to-day spend' },
  { label: 'Bridges & L2', detail: 'Canonical routes only; staged sizes; dual verification' },
  { label: 'Public goods / grants', detail: 'Ops Safe or module with policy - not main treasury hot path' },
  { label: 'Incident', detail: 'Pause modules if available; rotate signers; public postmortem culture' },
];

export default function SotaStackPage() {
  return (
    <>
      <PageHero
        label="OpSec · Product"
        title="SOTA Operator Stack"
        description="DeFi-native blueprint for high-decentralization Ethereum operators and treasury teams: YubiKey identity, hardened hosts, Safe key management, and day-to-day DeFi ops - not a single-protocol gimmick."
        accent="amber"
        backFallback="/opsec/"
        backLabel="OpSec"
      />

      <PageContainer className="pb-8" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 mb-10">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-orange)] mb-2">
            Orientation
          </div>
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            Built from the same muscle memory as public-goods and protocol work at high decentralization stages
            (including DeFi Collective–style treasury reality): distributed signers, deliberate friction on capital,
            and operational discipline on every DeFi interaction. Machine payments and agent float are a{' '}
            <em className="text-[var(--text-primary)] not-italic">module</em>, not the whole stack.
          </p>
        </div>

        <ArchitectureDiagram
          title="Reference architecture"
          subtitle="Identity · endpoint · treasury multisig · DeFi ops · optional automation"
          layers={[
            {
              id: 'access',
              label: 'People & access',
              accent: 'amber',
              nodes: [
                { title: 'YubiKey / FIDO2', subtitle: 'Human MFA · SSH · IAM · deploy', accent: 'amber' },
                { title: 'Named signers', subtitle: 'No shared seeds · clear roles' },
              ],
            },
            {
              id: 'host',
              label: 'Endpoint',
              accent: 'cyan',
              nodes: [
                { title: 'Hardened OS', subtitle: 'FDE · updates · isolation', accent: 'cyan' },
                { title: 'Signing workstation', subtitle: 'Clean browser · known RPCs' },
              ],
            },
            {
              id: 'treasury',
              label: 'Treasury plane',
              accent: 'orange',
              nodes: [
                { title: 'Safe multisig', subtitle: 'm-of-n · policies · modules', accent: 'orange' },
                { title: 'Hardware wallets', subtitle: 'Per-signer · offline ceremony' },
                { title: 'Timelocks / limits', subtitle: 'Stage-matched friction' },
              ],
            },
            {
              id: 'defi',
              label: 'DeFi operations',
              accent: 'purple',
              nodes: [
                { title: 'Approvals & permits', subtitle: 'Scoped · revocable', accent: 'purple' },
                { title: 'Simulate → sign', subtitle: 'Calldata truth over UI' },
                { title: 'Gov · bridge · LP', subtitle: 'Runbooks per action class' },
              ],
            },
            {
              id: 'optional',
              label: 'Optional automation',
              accent: 'cyan',
              nodes: [
                { title: 'Ops / grant float', subtitle: 'Capped · allowlisted' },
                { title: 'Agents / x402', subtitle: 'Module only · never treasury key' },
                {
                  title: 'Top-tier path',
                  subtitle: 'Taurus custody · Opsek HNW security',
                  accent: 'amber',
                },
              ],
            },
          ]}
        />
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <div className="mb-6">
          <div className="text-[var(--accent-amber)] text-xs font-semibold tracking-[3px] uppercase mb-2">
            Stack layers
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What you actually run</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {LAYERS.map((layer) => (
            <article
              key={layer.id}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6"
            >
              <h3 className={`text-lg font-semibold mb-3 ${layer.accent}`}>{layer.title}</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {layer.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--accent-cyan)] flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageContainer>

      {/* Treasury team training focus */}
      <PageContainer className="pb-14" as="section">
        <div className="mb-6">
          <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-2">
            Treasury team
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl">
            SOTA key management training &amp; setup
          </h2>
          <p className="text-sm text-[var(--text-tertiary)] mt-3 max-w-2xl leading-relaxed">
            The product is not only tools - it is how a treasury team generates keys, stores them, proposes, reviews,
            and signs under a high-decentralization threat model.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {TREASURY_TRAINING.map((t) => (
            <div key={t.title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{t.title}</h3>
              <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* DeFi ops blend */}
      <PageContainer className="pb-14" as="section">
        <div className="mb-6">
          <div className="text-[var(--accent-purple)] text-xs font-semibold tracking-[3px] uppercase mb-2">
            DeFi ops blend
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Day-to-day protocol work</h2>
          <p className="text-sm text-[var(--text-tertiary)] mt-3 max-w-2xl leading-relaxed">
            Custody without DeFi operating procedure is incomplete. Every recurring action class gets a short runbook
            so signers are not improvising under time pressure.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEFI_OPS.map((d) => (
            <div
              key={d.label}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] px-4 py-4"
            >
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{d.label}</div>
              <div className="text-[12px] text-[var(--text-muted)] leading-relaxed">{d.detail}</div>
            </div>
          ))}
        </div>
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <ArchitectureFlow
          title="Adoption order"
          accent="amber"
          steps={[
            { label: 'People + OS', detail: 'YubiKey · host' },
            { label: 'Treasury Safe', detail: 'Ceremony · m-of-n' },
            { label: 'DeFi runbooks', detail: 'Approvals · sim' },
            { label: 'Ops float', detail: 'Only if needed' },
          ]}
        />
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Separation rule (non-negotiable)</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Keep three planes distinct:{' '}
              <strong className="text-[var(--text-primary)]">personal identity</strong> (YubiKey),{' '}
              <strong className="text-[var(--text-primary)]">treasury capital</strong> (Safe + hardware signers), and{' '}
              <strong className="text-[var(--text-primary)]">hot ops float</strong> (grants, bots, optional agent/x402 spend).
              Compromise of ops must never equal compromise of treasury.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">High decentralization stage</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              As the org matures: widen signer diversity, slow the path to large moves, publish procedures, and prefer
              on-chain policy over informal trust. That is the opposite of optimizing for speed alone.
            </p>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <TopTierSecurity />
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <div className="mb-5">
          <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-2">
            How to use this
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Products around the blueprint</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/opsec/"
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-amber)]/30 transition-all group"
          >
            <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[var(--accent-amber)] mb-2">Guides</div>
            <div className="font-semibold mb-2 group-hover:text-[var(--accent-amber)] transition-colors">OS hardening</div>
            <p className="text-sm text-[var(--text-tertiary)]">Endpoint baselines under every signer workstation.</p>
          </Link>
          <Link
            href="/contact/"
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-orange)]/30 transition-all group"
          >
            <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[var(--accent-orange)] mb-2">Training</div>
            <div className="font-semibold mb-2 group-hover:text-[var(--accent-orange)] transition-colors">Treasury key setup</div>
            <p className="text-sm text-[var(--text-tertiary)]">Facilitated ceremony, Safe design, and signer drills for your team.</p>
          </Link>
          <Link
            href="/forge/x402-workshop/"
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-purple)]/30 transition-all group"
          >
            <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[var(--accent-purple)] mb-2">Module</div>
            <div className="font-semibold mb-2 group-hover:text-[var(--accent-purple)] transition-colors">x402 half-day</div>
            <p className="text-sm text-[var(--text-tertiary)]">Optional: machine payments / agent float - only after treasury is solid.</p>
          </Link>
        </div>
      </PageContainer>

      <PageContainer className="pb-20" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-[var(--accent-amber)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">Next step</div>
            <p className="text-sm text-[var(--text-secondary)] max-w-md">
              Run a treasury key-management session against this stack, or harden signer endpoints first if you are early.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-amber)] text-black rounded-xl text-sm font-semibold hover:bg-[var(--accent-gold)] transition-colors"
            >
              Request treasury training <ArrowRight />
            </Link>
            <Link
              href="/opsec/linux/"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-default)] rounded-xl text-sm hover:border-[var(--accent-cyan)]/30 hover:text-[var(--accent-cyan)] transition-all"
            >
              Start: Linux guide
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
