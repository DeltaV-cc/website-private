'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageHero, PageContainer } from './PageShell';
import AnimatedBackground from './AnimatedBackground';
import { formatCourseText } from './course/formatCourseText';
import { withBasePath } from '@/lib/site';
import { FORGE_PAGE } from '@/app/content/forge';
import { hrefFor, type Locale } from '@/lib/i18n';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0" style={{ color }} aria-hidden>
    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Structure for each course card — ids, links, accents and the product mark.
 * Deliberately separate from `app/content/forge.ts`: this is routing and
 * styling, which must not be translated.
 */
const COURSE_STRUCTURE: Record<
  string,
  {
    logo?: { src: string; alt: string };
    href: string;
    secondaryHref?: string;
    secondaryTone?: 'default' | 'quiet';
    accent: string;
  }
> = {
  'my-first-ai-agent': {
    logo: { src: '/images/ecosystem/NousResearch.webp', alt: 'Nous Research, makers of Hermes' },
    href: '/forge/course/my-first-ai-agent/',
    secondaryHref: '/forge/course/my-first-ai-agent/labs/',
    secondaryTone: 'quiet',
    accent: 'var(--accent-orange)',
  },
  'open-design': {
    href: '/forge/course/open-design/',
    secondaryHref: '/forge/course/my-first-ai-agent/',
    accent: 'var(--accent-cyan)',
  },
};

function CourseCard({
  id,
  code,
  title,
  badge,
  pitch,
  product,
  adapt,
  get,
  path,
  forWho,
  ctaLabel,
  secondaryLabel,
  labels,
  lang,
}: {
  id: string;
  code: string;
  title: string;
  badge?: string;
  pitch: ReactNode;
  product: string;
  adapt: string;
  get: string[];
  path: { step: string; desc: string }[];
  forWho: string;
  ctaLabel: string;
  secondaryLabel?: string;
  labels: { get: string; path: string; forWho: string };
  lang: Locale;
}) {
  const s = COURSE_STRUCTURE[id];
  const accent = s?.accent ?? 'var(--accent-orange)';
  const primaryHref = hrefFor(s?.href ?? '/forge/', lang);
  const secondaryHref = s?.secondaryHref ? hrefFor(s.secondaryHref, lang) : undefined;

  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-colors duration-300 hover:border-[var(--border-hover)]"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} aria-hidden />
      <div className="font-mono text-[10px] tracking-[2px] uppercase mb-3" style={{ color: accent }}>
        {code}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
        {s?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(s.logo.src)}
            alt={s.logo.alt}
            width={28}
            height={28}
            className="h-7 w-7 rounded-md border border-[var(--border-subtle)] shrink-0"
            loading="lazy"
          />
        )}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {badge && (
          <span className="shrink-0 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[1px] text-[var(--accent-green)]">
            {badge}
          </span>
        )}
      </div>
      <p className="text-[var(--text-secondary)] mb-4 max-w-3xl leading-relaxed">{pitch}</p>
      <p className="text-xs text-[var(--text-tertiary)] mb-8 max-w-3xl leading-relaxed">
        <span className="font-medium text-[var(--text-secondary)]">{product}.</span> {adapt}
      </p>

      <AnimatedBackground>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase mb-3" style={{ color: accent }}>
              {labels.get}
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {get.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check color={accent} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase mb-3" style={{ color: accent }}>
              {labels.path}
            </div>
            <ol className="space-y-3 text-sm">
              {path.map((p, i) => (
                <li key={p.step} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-lg text-xs font-semibold flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-medium text-[var(--text-primary)]">{p.step}</span>
                    <span className="text-[var(--text-tertiary)]"> — {p.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </AnimatedBackground>

      <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--border-default)]">
        <div className="text-sm text-[var(--text-secondary)] mr-auto max-w-sm leading-relaxed">
          <span className="font-semibold text-[var(--text-primary)]">{labels.forWho}</span> {forWho}
        </div>
        {secondaryLabel && secondaryHref &&
          (s.secondaryTone === 'quiet' ? (
            <Link href={secondaryHref} className="text-xs tracking-wide text-[var(--text-muted)] hover:text-[var(--text-secondary)] underline-offset-4 hover:underline transition-colors">
              {secondaryLabel}
            </Link>
          ) : (
            <Link href={secondaryHref} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-default)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all">
              {secondaryLabel}
            </Link>
          ))}
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
          style={{ background: accent, color: '#07100d' }}
        >
          {ctaLabel} <ArrowRight />
        </Link>
      </div>
    </article>
  );
}

export default function ForgePageView({ lang }: { lang: Locale }) {
  const copy = FORGE_PAGE[lang];

  return (
    <div className="relative z-10">
      <PageHero
        label={copy.label}
        title={copy.title}
        description={copy.description}
        accent="purple"
        backFallback={hrefFor('/', lang)}
        backLabel={copy.backLabel}
      />

      <PageContainer className="pb-16 space-y-5" as="section">
        {copy.courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            code={course.code}
            title={course.title}
            badge={course.badge}
            pitch={formatCourseText(course.pitch)}
            product={course.product}
            adapt={course.adapt}
            get={course.get}
            path={course.path}
            forWho={course.forWho}
            ctaLabel={course.ctaLabel}
            secondaryLabel={course.secondaryLabel}
            labels={copy.cardLabels}
            lang={lang}
          />
        ))}
      </PageContainer>

      <PageContainer className="pb-24" as="section">
        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--text-muted)] mb-4">
          {copy.roadmapLabel}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {copy.roadmap.map((item, i) => (
            <Link
              key={item.title}
              href={i === 0 ? '/forge/course/open-video/' : '/forge/x402-workshop/'}
              className="rounded-2xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-purple)]/40 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-purple)]">
                {copy.roadmapTag}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-tertiary)]">{item.blurb}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
          <Link href="/tutorials/" className="hover:text-[var(--accent-cyan)]">
            {copy.footerLinks.tutorials}
          </Link>
          <Link href="/blog/" className="hover:text-[var(--accent-cyan)]">
            {copy.footerLinks.blog}
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
