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
import { OPSEC_COPY } from '@/app/content/site';
import { DEFAULT_LOCALE, hrefFor, type Locale } from '@/lib/i18n';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Self-hosted logos under public/images/also-useful — no third-party avatar CDNs.
    Descriptions live in OPSEC_COPY[lang].alsoUseful, keyed by the logo id. */
type UsefulLink = {
  name: string;
  href: string;
  logo: string;
};

const ALSO_USEFUL: UsefulLink[] = [
  { name: 'WalletBeat', href: 'https://walletbeat.ethereum.foundation/', logo: 'walletbeat' },
  { name: 'DeFiScan', href: 'https://defiscan.info/', logo: 'defiscan' },
  { name: 'L2Beat', href: 'https://l2beat.com/', logo: 'l2beat' },
  { name: 'growthepie', href: 'https://www.growthepie.xyz/', logo: 'growthepie' },
  { name: 'Xerberus', href: 'https://xerberus.io/', logo: 'xerberus' },
  { name: 'x402scan', href: 'https://www.x402scan.com/', logo: 'x402scan' },
  { name: 'AntiCapture', href: 'https://x.com/AntiCapture', logo: 'anticapture' },
  { name: 'Ethereum Security', href: 'https://x.com/ethereumsecurity', logo: 'ethereumsecurity' },
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

/** Routing and marks only; titles/blurbs come from the dictionary, in order. */
const OS_GUIDES = [
  { href: '/opsec/linux/', logo: 'linux' },
  { href: '/opsec/macos/', logo: 'macos' },
  { href: '/opsec/windows/', logo: 'windows' },
];

function OsLogo({ id, title }: { id: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const src = withBasePath(`/images/os/${id}.webp`);
  if (failed) {
    return (
      <span className="w-10 h-10 rounded-xl bg-[var(--accent-amber)]/10 flex items-center justify-center text-[var(--accent-amber)]">
        <OsShieldIcon kind={id as 'linux' | 'macos' | 'windows'} />
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- self-hosted OS mark
    <img
      src={src}
      alt=""
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="w-10 h-10 rounded-xl object-cover border border-[var(--border-default)] bg-[var(--bg-elevated)] group-hover:border-[var(--accent-amber)]/30 transition-colors"
      onError={() => setFailed(true)}
      aria-hidden="true"
      title={title}
    />
  );
}

export default function OpSec({
  embedded = false,
  lang = DEFAULT_LOCALE,
}: {
  embedded?: boolean;
  lang?: Locale;
}) {
  const t = OPSEC_COPY[lang];

  return (
    <>
      {!embedded && <PageHero
        label={t.heroLabel}
        title={t.heroTitle}
        description={t.heroDescription}
        accent="amber"
        backFallback={hrefFor('/', lang)}
        backLabel={t.backLabel}
      />}

      <PageContainer className="pb-12" as="section">
        {embedded && (
          <div className="mb-8 max-w-2xl">
            <div className="text-[var(--accent-amber)] text-xs font-semibold tracking-[3px] uppercase mb-2">{t.heroLabel}</div>
            <h2 id="opsec-heading" className="text-3xl md:text-4xl font-semibold tracking-tight">{t.embeddedTitle}</h2>
            <p className="text-sm text-[var(--text-tertiary)] mt-3 leading-relaxed">{t.embeddedBlurb}</p>
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-5 mb-14">
          <LayeredDefenseIllustration lang={lang} />
          <Web3OpSecPathIllustration lang={lang} />
        </div>
      </PageContainer>

      {/* Primary products - organizing spine */}
      <PageContainer className="pb-14" as="section">
        <div className="mb-6">
          <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-2">
            {t.spineEyebrow}
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl">
            {t.spineTitle}
          </h2>
          <p className="text-sm text-[var(--text-tertiary)] mt-3 max-w-2xl leading-relaxed">
            {t.spineBlurb}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Link
            href="/opsec/sota-stack/"
            className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-amber)]/30 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)] via-[var(--accent-orange)]/30 to-transparent" />
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-amber)] mb-3">
              {t.blueprintTag}
            </div>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent-amber)] transition-colors">
              {t.blueprintTitle}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {t.blueprintBody}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-amber)] group-hover:gap-2.5 transition-all">
              {t.blueprintCta} <ArrowRight />
            </span>
          </Link>

          <Link
            href={hrefFor('/contact/', lang)}
            className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-orange)]/30 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-amber)]/30 to-transparent" />
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-orange)] mb-3">
              {t.trainingTag}
            </div>
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent-orange)] transition-colors">
              {t.trainingTitle}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {t.trainingBody}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-orange)] group-hover:gap-2.5 transition-all">
              {t.trainingCta} <ArrowRight />
            </span>
          </Link>
        </div>
      </PageContainer>

      {/* OS Hardening */}
      <PageContainer className="pb-14" as="section">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-2">
              {t.osEyebrow}
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t.osTitle}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] max-w-md">
            {t.osBlurb}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {OS_GUIDES.map((g, i) => (
            <Link
              key={g.href}
              href={g.href}
              className="group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:border-[var(--accent-amber)]/30 hover:-translate-y-0.5 hover:shadow-[var(--glow-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-amber)]"
            >
              <div className="flex items-center justify-between mb-4">
                <OsLogo id={g.logo} title={t.osGuides[i].title} />
                <span className="text-[10px] font-semibold tracking-[1px] uppercase text-[var(--accent-green)] border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/8 px-2 py-0.5 rounded">
                  {t.osGuides[i].status}
                </span>
              </div>
              <div className="font-semibold text-lg mb-1 group-hover:text-[var(--accent-amber)] transition-colors">
                {t.osGuides[i].title}
              </div>
              <p className="text-sm text-[var(--text-tertiary)] mb-4">{t.osGuides[i].blurb}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-cyan)] group-hover:gap-2.5 transition-all">
                {t.openGuide} <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </PageContainer>

      {/* Top-tier: Taurus + OpSec */}
      <PageContainer className="pb-14" as="section">
        <TopTierSecurity lang={lang} />
      </PageContainer>

      {/* Supporting research / dashboards (self-hosted logos, primary product URLs) */}
      <PageContainer className="pb-14" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
          <h2 className="text-xl font-semibold mb-1">{t.alsoUsefulTitle}</h2>
          <p className="text-sm text-[var(--text-tertiary)] mb-5">
            {t.alsoUsefulBlurb}
          </p>
          <ul className="space-y-3" role="list">
            {ALSO_USEFUL.map((item) => (
              <li key={item.logo}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-xl border border-transparent px-2 py-2 -mx-2 hover:border-[var(--border-default)] hover:bg-[var(--overlay-weak)] transition-colors group"
                >
                  <UsefulLogo id={item.logo} name={item.name} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      {item.name}{' '}
                      <span className="text-[var(--text-muted)] font-normal" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-tertiary)] leading-snug mt-0.5">{t.alsoUseful[item.logo]}</p>
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
