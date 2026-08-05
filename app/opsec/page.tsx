'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHero, PageContainer } from '../components/PageShell';
import {
  LayeredDefenseIllustration,
  Web3OpSecPathIllustration,
  OsShieldIcon,
} from '../components/OpSecIllustrations';
import TopTierSecurity from '../components/TopTierSecurity';
import { withBasePath } from '@/lib/site';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Self-hosted logos under public/images/also-useful — no third-party avatar CDNs. */
type UsefulLink = {
  name: string;
  href: string;
  logo: string;
  description: string;
};

const ALSO_USEFUL: UsefulLink[] = [
  {
    name: 'WalletBeat',
    href: 'https://walletbeat.ethereum.foundation/',
    logo: 'walletbeat',
    description:
      'Independent Ethereum wallet scorecards — privacy, security, open-source, and account-abstraction readiness.',
  },
  {
    name: 'DeFiScan',
    href: 'https://defiscan.info/',
    logo: 'defiscan',
    description:
      'DeFi protocol centralization scorecards — admin keys, upgradeability, oracles, and other trust assumptions.',
  },
  {
    name: 'L2Beat',
    href: 'https://l2beat.com/',
    logo: 'l2beat',
    description:
      'Layer 2 risk & maturity: stages, security councils, data availability, and TVL with honest risk labels.',
  },
  {
    name: 'growthepie',
    href: 'https://www.growthepie.xyz/',
    logo: 'growthepie',
    description:
      'Ethereum L2 fundamentals — usage, fees, TVS, and comparable metrics across chains (not just TVL).',
  },
  {
    name: 'Xerberus',
    href: 'https://xerberus.io/',
    logo: 'xerberus',
    description:
      'On-chain risk ratings for assets, protocols, and organisations — structured scores for diligence, not hype.',
  },
  {
    name: 'x402scan',
    href: 'https://www.x402scan.com/',
    logo: 'x402scan',
    description:
      'x402 ecosystem explorer — paid APIs, agent commerce, sellers, and HTTP-402 payment flow analytics.',
  },
  {
    name: 'AntiCapture',
    href: 'https://x.com/AntiCapture',
    logo: 'anticapture',
    description:
      'DAO / governance capture research — concentration, voting power, and structural capture signals.',
  },
  {
    name: 'Ethereum Security',
    href: 'https://x.com/ethereumsecurity',
    logo: 'ethereumsecurity',
    description:
      'Community security research stream — incidents, tooling, and defensive notes for Ethereum operators.',
  },
];

function UsefulLogo({ id, name }: { id: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const src = withBasePath(`/images/also-useful/${id}.webp`);
  if (failed) {
    return (
      <span
        className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[11px] font-semibold text-[var(--text-tertiary)] shrink-0"
        aria-hidden="true"
      >
        {name.trim().charAt(0).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local static logo; tiny rail icons
    <img
      src={src}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="w-8 h-8 rounded-full object-cover border border-[var(--border-default)] bg-[var(--bg-elevated)] shrink-0"
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  );
}

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

export default function OpSec({ embedded = false }: { embedded?: boolean }) {
  return (
    <>
      {!embedded && <PageHero
        label="OpSec"
        title="Web3 OpSec"
        description="High-signal operational security frameworks built on complementary sources and self-sovereign principles."
        accent="amber"
        backFallback="/"
        backLabel="Home"
      />}

      <PageContainer className="pb-12" as="section">
        {embedded && (
          <div className="mb-8 max-w-2xl">
            <div className="text-[var(--accent-amber)] text-xs font-semibold tracking-[3px] uppercase mb-2">OpSec</div>
            <h2 id="opsec-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">Web3 operational security</h2>
            <p className="text-sm text-[var(--text-tertiary)] mt-3 leading-relaxed">Protect the people, keys, and systems behind decentralized operations.</p>
          </div>
        )}
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

      {/* Top-tier: Taurus + OpSec */}
      <PageContainer className="pb-14" as="section">
        <TopTierSecurity />
      </PageContainer>

      {/* Supporting research / dashboards (self-hosted logos, primary product URLs) */}
      <PageContainer className="pb-14" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
          <h2 className="text-xl font-semibold mb-1">Also useful</h2>
          <p className="text-sm text-[var(--text-tertiary)] mb-5">
            Public tools we point operators to for wallet, protocol, L2, and machine-payments risk — not an endorsement of every score.
          </p>
          <ul className="space-y-3" role="list">
            {ALSO_USEFUL.map((item) => (
              <li key={item.logo}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-xl border border-transparent px-2 py-2 -mx-2 hover:border-[var(--border-default)] hover:bg-white/[0.02] transition-colors group"
                >
                  <UsefulLogo id={item.logo} name={item.name} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      {item.name}{' '}
                      <span className="text-[var(--text-muted)] font-normal" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-tertiary)] leading-snug mt-0.5">{item.description}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </>
  );
}
