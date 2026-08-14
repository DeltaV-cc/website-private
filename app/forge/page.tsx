'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PageHero, PageContainer } from '../components/PageShell';
import AnimatedBackground from '../components/AnimatedBackground';
import { withBasePath } from '@/lib/site';

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
  /** Small product mark beside the title — self-hosted, no third-party request. */
  logo?: { src: string; alt: string };
  pitch: ReactNode;
  product: string;
  adapt: string;
  get: string[];
  path: { step: string; desc: string }[];
  forWho: string;
  ctaLabel: string;
  ctaHref: string;
  secondary?: { label: string; href: string; tone?: 'default' | 'quiet' };
  accent: string;
};

function CourseCard({
  id,
  code,
  title,
  logo,
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
      <div className="flex items-center gap-3 mb-4">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(logo.src)}
            alt={logo.alt}
            width={28}
            height={28}
            className="h-7 w-7 rounded-md border border-[var(--border-subtle)] shrink-0"
            loading="lazy"
          />
        )}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
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
        {secondary &&
          (secondary.tone === 'quiet' ? (
            <Link
              href={secondary.href}
              className="text-xs tracking-wide text-[var(--text-muted)] hover:text-[var(--text-secondary)] underline-offset-4 hover:underline transition-colors"
            >
              {secondary.label}
            </Link>
          ) : (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-default)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
            >
              {secondary.label}
            </Link>
          ))}
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
 * Labs are folded into Own Your AI (path + what-you-get) — never a third course card.
 */
const COURSES: CourseCardProps[] = [
  {
    id: 'my-first-ai-agent',
    code: 'Course 01 · Flagship · Live',
    title: 'My First AI Agent',
    logo: { src: '/images/ecosystem/NousResearch.webp', alt: 'Nous Research, makers of Hermes' },
    pitch: (
      <>
        Thirteen free lessons to set up a real AI agent — the kind that{' '}
        <span className="font-medium text-[var(--text-primary)]">
          actually does things for you
        </span>
        , not just answers questions. Start from zero, finish with an agent that reads your files,
        runs your errands, and answers on your phone. No code, no ML background.
      </>
    ),
    product: 'Product: Hermes Desktop',
    adapt:
      'Aligned with official Hermes docs. Every step has a screenshot; advanced settings stay out of the way until you want them.',
    get: [
      'The words you need, so nothing on screen is a mystery',
      'A guided install with a verified first chat',
      'Ready-made agent personalities — pick one, paste it, done',
      'Your agent on your phone, answering only you',
      'Memory, notes, skills, safety settings, and scheduled jobs',
    ],
    path: [
      { step: 'Part I', desc: 'words, install, personality, phone, first real task' },
      { step: 'Part II', desc: 'memory, notes, skills, safety, scheduled jobs' },
      { step: 'Labs', desc: 'optional drills after the course' },
    ],
    forWho: 'Anyone curious about AI agents — complete beginners welcome, on a standard PC.',
    ctaLabel: 'Start the course',
    ctaHref: '/forge/course/open-harness/',
    secondary: {
      label: 'Labs after Part I',
      href: '/forge/course/open-harness/labs/',
      tone: 'quiet',
    },
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
      { step: 'Prereq', desc: 'Own Your AI Part I on Desktop' },
    ],
    forWho: 'Anyone who ships decks and content and is tired of renting design tabs.',
    ctaLabel: 'Open Design',
    ctaHref: '/forge/course/open-design/',
    secondary: { label: 'Prereq: Own Your AI', href: '/forge/course/open-harness/' },
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
          description="Free courses on real products. Each track names the product it follows and adapts as that product moves."
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
