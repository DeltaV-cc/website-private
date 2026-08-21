'use client';

import { HYDRA_SHOWCASE, HYDRA_URL } from '@/app/content/hydra';
import type { Locale } from '@/lib/i18n';
import { PageContainer } from './PageShell';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Hydra on the AI pillar page — a strip, not a section.
 *
 * It sits between the hero and the offer cards, so a reader meets a system we
 * actually shipped before reading what we offer to build. That position is
 * also why it stays small: the real showcase is hydra.deltav.cc, and every
 * extra line here is a line between the reader and the door to it.
 */
export default function HydraShowcase({ lang }: { lang: Locale }) {
  const copy = HYDRA_SHOWCASE[lang];

  return (
    <PageContainer className="pb-10" as="section">
      <section
        aria-labelledby="hydra-heading"
        className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 md:p-6"
      >
        <div className="eyebrow mb-2">{copy.label}</div>
        <h2 id="hydra-heading" className="mb-2 text-lg font-semibold leading-snug tracking-tight md:text-xl">
          {copy.title}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">{copy.lead}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={HYDRA_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-[24px] items-center gap-1.5 text-sm font-semibold text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-bright)]"
          >
            {copy.demoLabel} <ArrowUpRight />
          </a>

          <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[11px] text-[var(--text-tertiary)]">
            {copy.chips.map((chip) => (
              <li key={chip} className="before:mr-1.5 before:text-[var(--accent-primary)] before:content-['·']">
                {chip}
              </li>
            ))}
          </ul>

          <span className="text-xs text-[var(--text-muted)] md:ml-auto">{copy.bridge}</span>
        </div>
      </section>
    </PageContainer>
  );
}
