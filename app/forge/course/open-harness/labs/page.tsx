import type { Metadata } from 'next';
import Link from 'next/link';
import { LabsLandingVisual } from '@/app/components/course/CourseVisuals';
import { CoursePrivacyNote, HarnessCourseTabs } from '@/app/components/course/CourseLearning';
import { HARNESS_LABS, HARNESS_LABS_META } from '@/app/data/courses/harness-labs';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Open Harness Labs | Delta V',
  description: HARNESS_LABS_META.description,
  openGraph: {
    title: HARNESS_LABS_META.title,
    description: HARNESS_LABS_META.tagline,
    url: `${SITE_URL}/forge/course/open-harness/labs/`,
    siteName: 'Delta V',
    type: 'website',
  },
};

const levelLabel = {
  'after-part-i': 'After Part I',
  'after-part-ii': 'After Part II',
  advanced: 'Advanced',
} as const;

export default function HarnessLabsIndexPage() {
  return (
    <main className="page-container pt-16 md:pt-20 pb-24">
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/forge/" className="text-[var(--text-muted)] hover:text-[var(--course-accent)]">
          Forge
        </Link>
        <span className="text-[var(--text-disabled)]">/</span>
        <Link
          href="/forge/course/open-harness/"
          className="text-[var(--text-muted)] hover:text-[var(--course-accent)]"
        >
          Open Harness
        </Link>
        <span className="text-[var(--text-disabled)]">/</span>
        <span className="text-[var(--text-secondary)]">Labs</span>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <HarnessCourseTabs active="labs" />
        <span className="course-privacy-chip">Local only</span>
      </div>
      <div className="eyebrow course-eyebrow text-[var(--course-accent)]">After mastery · not a second course</div>
      <h1 className="section-title mt-3">{HARNESS_LABS_META.title}</h1>
      <CoursePrivacyNote className="mt-4" />
      <p className="mt-6 max-w-2xl text-xl text-[var(--text-secondary)] leading-relaxed">
        {HARNESS_LABS_META.tagline}
      </p>
      <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
        {HARNESS_LABS_META.description}
      </p>

      <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-5 max-w-2xl">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
          Assumes
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          Hermes is already installed and chatting (Open Harness Part I). Course default is{' '}
          <strong className="font-medium text-[var(--text-primary)]">Hermes Desktop</strong> from mastery
          03 — profile + SOUL exist; several drills open the Desktop cockpit. Labs do not re-teach install,
          BotFather from zero, or vault setup. CLI-only is fine if you can map the same proofs. If anything
          is missing, open the mastery modules first.
        </p>
        <Link
          href="/forge/course/open-harness/"
          className="mt-3 inline-block text-sm font-medium text-[var(--course-accent)]"
        >
          Open Harness mastery →
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/forge/course/open-harness/00/" className="button-primary">
          Start mastery Part I
        </Link>
        <Link href="/forge/course/open-design/" className="button-secondary">
          Open Design
        </Link>
      </div>

      <section className="mt-12" aria-labelledby="labs-glance">
        <h2 id="labs-glance" className="text-2xl font-semibold tracking-tight">
          Mastery vs labs
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          Pedagogy lives in Open Harness. Labs only drill and produce artifacts.
        </p>
        <LabsLandingVisual />
      </section>

      <div className="mt-14 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
        {HARNESS_LABS.map((lab) => (
          <Link
            key={lab.slug}
            href={`/forge/course/open-harness/labs/${lab.slug}/`}
            className="forge-course-link group grid md:grid-cols-[4rem_minmax(0,1fr)_8rem] gap-4 py-6"
          >
            <span className="font-mono text-xs text-[var(--course-accent)]">{lab.number}</span>
            <span>
              <h2 className="text-lg font-semibold group-hover:text-[var(--course-accent)]">
                {lab.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{lab.subtitle}</p>
              <p className="mt-2 text-xs text-[var(--text-tertiary)]">Requires: {lab.requires}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[1px] text-[var(--text-muted)]">
                  {levelLabel[lab.level]}
                </span>
                {lab.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-default)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)] self-center">
              ~{lab.minutes} min
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
