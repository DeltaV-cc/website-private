'use client';

import React from 'react';
import BackLink from './BackLink';
import SpotlightField from './SpotlightField';
import InkGarden from './InkGarden';

type Accent = 'cyan' | 'orange' | 'purple' | 'amber';

const accentText: Record<Accent, string> = {
  cyan: 'text-[var(--accent-cyan)]',
  orange: 'text-[var(--accent-orange)]',
  purple: 'text-[var(--accent-purple)]',
  amber: 'text-[var(--accent-amber)]',
};

const accentBar: Record<Accent, string> = {
  cyan: 'bg-[var(--accent-cyan)]',
  orange: 'bg-[var(--accent-orange)]',
  purple: 'bg-[var(--accent-purple)]',
  amber: 'bg-[var(--accent-amber)]',
};

const accentGlow: Record<Accent, string> = {
  cyan: 'ambient-glow-cyan',
  orange: 'ambient-glow-orange',
  purple: 'ambient-glow-purple',
  amber: 'ambient-glow-orange',
};

/**
 * Shared max-width + horizontal padding shell used across all pages.
 */
export function PageContainer({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}) {
  return (
    <Tag className={`max-w-[1440px] mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </Tag>
  );
}

/** Fixed brand atmosphere for the service and contact pages. */
export function PageBackdrop() {
  return <InkGarden background />;
}

/**
 * Standard pillar / section page hero.
 * Use this for AI, Web3, Forge, OpSec, etc. so hierarchy and spacing stay consistent.
 * Pass existing copy only - this component never invents messaging.
 */
export function PageHero({
  label,
  title,
  description,
  accent = 'cyan',
  backFallback = '/',
  backLabel = 'Home',
  showBack = true,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  accent?: Accent;
  backFallback?: string;
  backLabel?: string;
  showBack?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className={`ambient-glow ${accentGlow[accent]} -top-24 left-0 w-[420px] h-[420px] opacity-[0.06]`} />
      <PageContainer className="pt-12 md:pt-16 pb-10 md:pb-12 relative">
        {showBack && (
          <div className="mb-8">
            <BackLink fallback={backFallback} label={backLabel} />
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_18rem] gap-10 items-end">
          <div>
            <div className={`text-xs font-semibold tracking-[3px] uppercase mb-3 ${accentText[accent]}`}>{label}</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-3px] mb-6 leading-[0.95]">{title}</h1>
            <div className="flex items-center gap-2 mb-8" aria-hidden="true"><span className={`w-12 h-[2px] ${accentBar[accent]}`} /><span className="w-8 h-px bg-[var(--accent-cyan)]/40" /><span className="w-4 h-px bg-[var(--accent-purple)]/40" /></div>
            {description && <p className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">{description}</p>}
          </div>
          <SpotlightField kind={accent === 'orange' ? 'web3' : accent === 'amber' ? 'opsec' : accent === 'purple' ? 'forge' : 'ai'} />
        </div>
        {children}
      </PageContainer>
    </section>
  );
}

/**
 * Service / offering card used on pillar pages.
 * Top accent bar + consistent hover without reinventing styles per page.
 */
export function ServiceCard({
  title,
  children,
  accent = 'cyan',
  headingLevel = 2,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  accent?: Accent;
  /** Prefer h2 under a page h1 for correct document outline */
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = (`h${headingLevel}` as 'h2' | 'h3');
  const bar =
    accent === 'cyan'
      ? 'from-[var(--accent-cyan)] via-[var(--accent-amber)]/30 to-transparent'
      : accent === 'orange'
        ? 'from-[var(--accent-orange)] via-[var(--accent-amber)]/30 to-transparent'
        : accent === 'purple'
          ? 'from-[var(--accent-purple)] via-[var(--accent-cyan)]/20 to-transparent'
          : 'from-[var(--accent-amber)]/60 via-[var(--accent-amber)]/20 to-transparent';

  const hoverBorder =
    accent === 'cyan'
      ? 'hover:border-[var(--accent-cyan)]/25'
      : accent === 'orange'
        ? 'hover:border-[var(--accent-orange)]/25'
        : accent === 'purple'
          ? 'hover:border-[var(--accent-purple)]/25'
          : 'hover:border-[var(--accent-amber)]/25';

  return (
    <article
      className={`rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 ${hoverBorder} hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ${className}`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${bar}`}
        aria-hidden="true"
      />
      <Heading className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</Heading>
      {children}
    </article>
  );
}
