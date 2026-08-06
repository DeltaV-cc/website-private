'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageHero, PageContainer } from '../components/PageShell';
import AnimatedBackground from '../components/AnimatedBackground';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M3 7h8M7 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = ({ color = 'var(--accent-orange)' }: { color?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className="mt-0.5 flex-shrink-0"
    style={{ color }}
    aria-hidden
  >
    <path
      d="M2.5 7.5L5.5 10.5L11.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CourseCardProps = {
  id: string;
  code: string;
  title: string;
  pitch: ReactNode;
  product: string;
  adapt: string;
  get: string[];
  path: { step: string; desc: string }[];
  forWho: string;
  ctaLabel: string;
  ctaHref: string;
  secondary?: { label: string; href: string };
  accent: string;
};

function CourseCard({
  id,
  code,
  title,
  pitch,
  product,
  adapt,
  get,
  path,
  forWho,
  ctaLabel,
  ctaHref,
  secondary,
  accent,
}: CourseCardProps) {
  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-colors duration-300 hover:border-[var(--border-hover)]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        aria-hidden
      />
      <div className="font-mono text-[10px] tracking-[2px] uppercase mb-3" style={{ color: accent }}>
        {code}
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h2>
      <p className="text-[var(--text-secondary)] mb-4 max-w-3xl leading-relaxed">{pitch}</p>
      <p className="text-xs text-[var(--text-tertiary)] mb-8 max-w-3xl leading-relaxed">
        <span className="font-medium text-[var(--text-secondary)]">{product}.</span> {adapt}
      </p>

      <AnimatedBackground>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div
              className="text-[10px] font-semibold tracking-[2px] uppercase mb-3"
              style={{ color: accent }}
            >
              What you get
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
            <div
              className="text-[10px] font-semibold tracking-[2px] uppercase mb-3"
              style={{ color: accent }}
            >
              Path
            </div>
            <ol className="space-y-3 text-sm">
              {path.map((p, i) => (
                <li key={p.step} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-lg text-xs font-semibold flex items-center justify-center"
                    style={{
                      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                      color: accent,
                    }}
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
          <span className="font-semibold text-[var(--text-primary)]">For:</span> {forWho}
        </div>
        {secondary && (
          <Link
            href={secondary.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-default)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
          >
            {secondary.label}
          </Link>
        )}
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
          style={{ background: accent, color: '#07100d' }}
        >
          {ctaLabel} <ArrowRight />
        </Link>
      </div>
    </article>
  );
}

/**
 * Two live courses only.
 * Labs are folded into Open Harness (path + what-you-get) — never a third course card.
 */
const COURSES: CourseCardProps[] = [
  {
    id: 'open-harness',
    code: 'Course 01 · Flagship · Start here · Live',
    title: 'Open Harness',
    pitch: (
      <>
        <span className="font-medium text-[var(--text-primary)]">Anyone can do this.</span> If you
        can install an app and follow steps, you will learn what you need to{' '}
        <span className="font-medium text-[var(--text-primary)]">get started in AI with ownership</span>
        — your agent on your machine, not a rented chat tab. We walk you through{' '}
        <span className="font-medium text-[var(--text-primary)]">Hermes Desktop</span> end to end:
        soul, Telegram gateway, tools, then memory, vault, skills, security, and cron. Labs are
        optional drills inside this same course after Part I.
      </>
    ),
    product: 'Product: Hermes Desktop',
    adapt:
      'Written for first-timers, not ML researchers. Steps track official Hermes docs. Day one stays local Desktop — Advanced/Docker, providers, and gateway show up later only when you need them.',
    get: [
      'A clear zero → first agent path you can finish on a normal PC',
      'What ownership actually means: keys, soul, memory, and tools on your side',
      'Desktop install + first chat proof (you will see it work)',
      'Telegram in your pocket, then tools, vault, skills, security, cron',
      'Optional labs after Part I when you want deeper drills — still this course',
    ],
    path: [
      { step: 'Part I', desc: 'install, soul, pocket gateway — first agency that is yours' },
      { step: 'Part II', desc: 'memory, vault, skills, security, cron — the ownership stack' },
      { step: 'Labs', desc: 'optional drills after install (same course, not a second track)' },
    ],
    forWho:
      'Anyone who wants to start in AI with real ownership — curious beginners, builders, and operators. No research lab required; a normal PC is enough.',
    ctaLabel: 'Start free — Open Harness',
    ctaHref: '/forge/course/open-harness/',
    secondary: { label: 'Labs (after Part I)', href: '/forge/course/open-harness/labs/' },
    accent: 'var(--accent-orange)',
  },
  {
    id: 'open-design',
    code: 'Course 02 · Live',
    title: 'Open Design',
    pitch: (
      <>
        Decks, stills, and content packs you open offline —{' '}
        <span className="font-medium text-[var(--text-primary)]">not video engines</span>. Built on
        Hermes + design workflow (Open Design / stills stack).
      </>
    ),
    product: 'Product: Hermes + Open Design / stills',
    adapt: 'Model and skill names shift with the stack. Proof is always: file opens without Hermes.',
    get: [
      'design-lab workspace + first real deck offline',
      'Image set with prompts logged',
      'Brand file (DESIGN.md) and model split habits',
      'Handoff zip a client can open',
    ],
    path: [
      { step: 'Part I', desc: 'stack, deck, images, content pack' },
      { step: 'Part II', desc: 'brand, models, skills filter, export, habits' },
      { step: 'Prereq', desc: 'Open Harness Part I on Desktop' },
    ],
    forWho: 'Anyone who ships decks and content and is tired of renting design tabs.',
    ctaLabel: 'Open Design',
    ctaHref: '/forge/course/open-design/',
    secondary: { label: 'Prereq: Harness', href: '/forge/course/open-harness/' },
    accent: 'var(--accent-cyan)',
  },
];

export default function ForgePage() {
  return (
    <>
      <div className="relative z-10">
        <PageHero
          label="Pillar 03 · Forge"
          title="Skill Forge"
          description="Start with Open Harness: anyone can learn to run AI with ownership on Hermes Desktop. Free courses on real products — each track adapts as the product moves."
          accent="purple"
          backFallback="/"
          backLabel="Home"
        />

        <PageContainer className="pb-16 space-y-5" as="section">
          {COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </PageContainer>

        <PageContainer className="pb-24" as="section">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--text-muted)] mb-4">
            Later · not live mastery
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/forge/course/open-video/"
              className="rounded-2xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-purple)]/40 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-purple)]">
                Roadmap
              </div>
              <h3 className="mt-2 text-lg font-semibold">Open Video</h3>
              <p className="mt-2 text-sm text-[var(--text-tertiary)]">
                Motion teaser after Design stills work.
              </p>
            </Link>
            <Link
              href="/forge/x402-workshop/"
              className="rounded-2xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-purple)]/40 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-purple)]">
                Roadmap
              </div>
              <h3 className="mt-2 text-lg font-semibold">x402 &amp; agent payments</h3>
              <p className="mt-2 text-sm text-[var(--text-tertiary)]">Workshop outline only.</p>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
            <Link href="/forge/course/" className="hover:text-[var(--accent-cyan)]">
              Full course map
            </Link>
            <Link href="/blog/" className="hover:text-[var(--accent-cyan)]">
              Blog
            </Link>
            <Link href="/tutorials/" className="hover:text-[var(--accent-cyan)]">
              Tutorials
            </Link>
          </div>
        </PageContainer>
      </div>
    </>
  );
}
