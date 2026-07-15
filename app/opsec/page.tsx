'use client';

import Link from 'next/link';
import { PageHero, PageContainer } from '../components/PageShell';
import {
  LayeredDefenseIllustration,
  Web3OpSecPathIllustration,
  OsShieldIcon,
} from '../components/OpSecIllustrations';
import TopTierSecurity from '../components/TopTierSecurity';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OS_GUIDES = [
  {
    href: '/opsec/linux/',
    kind: 'linux' as const,
    title: 'Linux',
    blurb: 'Factory reset + hardening guide',
    status: 'Live',
  },
  {
    href: '/opsec/macos/',
    kind: 'macos' as const,
    title: 'macOS',
    blurb: 'Privacy-first MDM + hardening',
    status: 'Live',
  },
  {
    href: '/opsec/windows/',
    kind: 'windows' as const,
    title: 'Windows',
    blurb: 'Telemetry reduction + endpoint security',
    status: 'Live',
  },
];

export default function OpSec() {
  return (
    <>
      <PageHero
        label="OpSec"
        title="Web3 OpSec"
        description="High-signal operational security frameworks built on complementary sources and self-sovereign principles."
        accent="amber"
        backFallback="/"
        backLabel="Home"
      />

      <PageContainer className="pb-12" as="section">
        <div className="grid lg:grid-cols-2 gap-5 mb-14">
          <LayeredDefenseIllustration />
          <Web3OpSecPathIllustration />
        </div>
      </PageContainer>

      {/* Primary products - organizing spine */}
      <PageContainer className="pb-14" as="section">
        <div className="mb-6">
          <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-2">
            How to work with us
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl">
            Blueprint first. Workshop second. Guides underneath.
          </h2>
          <p className="text-sm text-[var(--text-tertiary)] mt-3 max-w-2xl leading-relaxed">
            The spine is DeFi-native treasury and key management for high-decentralization teams.
            Workshops and OS guides hang off that blueprint - not the other way around.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Link
            href="/opsec/sota-stack/"
            className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-amber)]/30 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)] via-[var(--accent-orange)]/30 to-transparent" />
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-amber)] mb-3">
              Blueprint
            </div>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent-amber)] transition-colors">
              SOTA Operator Stack
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              YubiKey · hardened signer workstations · Safe treasury key management · DeFi ops runbooks
              (approvals, simulation, governance, bridges) · optional automation float. Built for decentralized teams.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-amber)] group-hover:gap-2.5 transition-all">
              Open the stack <ArrowRight />
            </span>
          </Link>

          <Link
            href="/contact/"
            className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-orange)]/30 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-amber)]/30 to-transparent" />
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-orange)] mb-3">
              Training
            </div>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent-orange)] transition-colors">
              Treasury key setup
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Facilitated ceremony design, signer roles, thresholds/timelocks, and drills for treasury teams.
              Optional module: x402 / agent float once capital custody is solid.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-orange)] group-hover:gap-2.5 transition-all">
              Request training <ArrowRight />
            </span>
          </Link>
        </div>
      </PageContainer>

      {/* OS Hardening */}
      <PageContainer className="pb-14" as="section">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-2">
              OS Hardening
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Tactical floor
            </h2>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] max-w-md">
            Pair a hardened host with a YubiKey before you touch value. These guides sit under the SOTA stack.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {OS_GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent-amber)]/30 hover:-translate-y-0.5 hover:shadow-[var(--glow-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-amber)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-amber)]/10 flex items-center justify-center text-[var(--accent-amber)] group-hover:bg-[var(--accent-amber)]/15 transition-colors">
                  <OsShieldIcon kind={g.kind} />
                </span>
                <span className="text-[10px] font-semibold tracking-[1px] uppercase text-[var(--accent-green)] border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/8 px-2 py-0.5 rounded">
                  {g.status}
                </span>
              </div>
              <div className="font-semibold text-lg mb-1 group-hover:text-[var(--accent-amber)] transition-colors">
                {g.title}
              </div>
              <p className="text-sm text-[var(--text-tertiary)] mb-4">{g.blurb}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-cyan)] group-hover:gap-2.5 transition-all">
                Open guide <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </PageContainer>

      {/* Top-tier: Taurus + Opsek */}
      <PageContainer className="pb-14" as="section">
        <TopTierSecurity />
      </PageContainer>

      {/* Principles + supporting references */}
      <PageContainer className="pb-14" as="section">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
            <h2 className="text-xl font-semibold mb-4">Core Principles</h2>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Local-first execution and data sovereignty</li>
              <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Hardware-backed identity (YubiKey) before capital-bearing keys</li>
              <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Agent OpSec with hardened environments</li>
              <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Minimal attack surface across all platforms</li>
              <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Escalate to top-tier institutional / HNW solutions when the mandate requires it</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
            <h2 className="text-xl font-semibold mb-4">Also useful</h2>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div>
                <div className="font-medium text-[var(--text-primary)] mb-0.5">WalletBeat</div>
                <div className="text-[var(--text-tertiary)]">Ethereum wallet privacy rankings.</div>
              </div>
              <div>
                <div className="font-medium text-[var(--text-primary)] mb-0.5">Yubico / FIDO2</div>
                <div className="text-[var(--text-tertiary)]">Hardware-backed authentication for humans and admin paths.</div>
              </div>
              <div className="text-[var(--text-tertiary)]">Endpoint security research from arXiv & independent labs</div>
            </div>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="pb-20" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-[var(--accent-amber)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">
              Content Forge
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Full playbooks and hardening guides produced through the Content Forge.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/opsec/sota-stack/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-amber)] text-black rounded-xl text-sm font-semibold hover:bg-[var(--accent-gold)] transition-colors"
            >
              SOTA stack <ArrowRight />
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-default)] rounded-xl text-sm hover:border-[var(--accent-cyan)]/30 hover:text-[var(--accent-cyan)] transition-all"
            >
              Request a team audit
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
