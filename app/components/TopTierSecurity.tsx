'use client';

/**
 * Top-tier external solutions we recommend without ego:
 * institutional custody and HNW-grade security sit above DIY sovereign playbooks.
 */

import { TOP_TIER_COPY } from '@/app/content/site';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

export default function TopTierSecurity({
  className = '',
  compact = false,
  lang = DEFAULT_LOCALE,
}: {
  className?: string;
  compact?: boolean;
  lang?: Locale;
}) {
  const t = TOP_TIER_COPY[lang];
  return (
    <section className={className}>
      <div className="mb-5">
        <div className="text-[var(--accent-amber)] text-xs font-semibold tracking-[3px] uppercase mb-2">
          {t.eyebrow}
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl">
          {t.title}
        </h2>
        {!compact && (
          <p className="text-sm text-[var(--text-tertiary)] mt-3 max-w-2xl leading-relaxed">
            {t.blurb}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-amber)]/40 to-transparent"
            aria-hidden="true"
          />
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="text-xl font-semibold tracking-tight">Taurus</h3>
            <span className="text-[10px] font-semibold tracking-[1px] uppercase px-2 py-0.5 rounded border border-[var(--accent-orange)]/25 bg-[var(--accent-orange)]/10 text-[var(--accent-orange)]">
              {t.taurusTag}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {t.taurusBody}
          </p>
          <ul className="space-y-2 text-sm text-[var(--text-tertiary)]">
            {t.taurusBullets.map((b) => (
              <li key={b} className="flex gap-2"><span className="text-[var(--accent-orange)]">·</span> {b}</li>
            ))}
          </ul>
          <a
            href="https://www.taurushq.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-[var(--accent-orange)] hover:underline"
          >
            taurushq.com
            <span aria-hidden="true">↗</span>
          </a>
        </article>

        <article className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)] via-[var(--accent-cyan)]/30 to-transparent"
            aria-hidden="true"
          />
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="text-xl font-semibold tracking-tight"><a href="https://opsek.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-amber)] transition-colors">OpSec</a></h3>
            <span className="text-[10px] font-semibold tracking-[1px] uppercase px-2 py-0.5 rounded border border-[var(--accent-amber)]/25 bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]">
              {t.opsekTag}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {t.opsekBody}
          </p>
          <ul className="space-y-2 text-sm text-[var(--text-tertiary)]">
            {t.opsekBullets.map((b) => (
              <li key={b} className="flex gap-2"><span className="text-[var(--accent-amber)]">·</span> {b}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-2 text-sm">
            <a href="https://opsek.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-amber)] hover:underline">opsek.io <span aria-hidden="true">↗</span></a>
            <span className="text-[var(--text-muted)]">{t.opsekNote}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
