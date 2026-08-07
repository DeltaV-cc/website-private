import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LabVisual } from '@/app/components/course/CourseVisuals';
import {
  HarnessCourseTabs,
  InteractiveChecklist,
  MarkCompleteButton,
} from '@/app/components/course/CourseLearning';
import { HARNESS_LABS, getHarnessLab } from '@/app/data/courses/harness-labs';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return HARNESS_LABS.map((l) => ({ lab: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lab: string }>;
}): Promise<Metadata> {
  const { lab: slug } = await params;
  const lab = getHarnessLab(slug);
  if (!lab) return { title: 'Harness Lab' };
  return {
    title: `${lab.number} · ${lab.title} — Harness Labs | Delta V`,
    description: lab.subtitle,
    openGraph: {
      title: lab.title,
      description: lab.subtitle,
      url: `${SITE_URL}/forge/course/open-harness/labs/${lab.slug}/`,
      siteName: 'Delta V',
      type: 'article',
    },
  };
}

export default async function HarnessLabPage({
  params,
}: {
  params: Promise<{ lab: string }>;
}) {
  const { lab: slug } = await params;
  const lab = getHarnessLab(slug);
  if (!lab) notFound();

  const idx = HARNESS_LABS.findIndex((l) => l.slug === lab.slug);
  const prev = idx > 0 ? HARNESS_LABS[idx - 1] : null;
  const next = idx < HARNESS_LABS.length - 1 ? HARNESS_LABS[idx + 1] : null;

  return (
    <main className="page-container pt-16 md:pt-20 pb-24 max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/forge/course/open-harness/"
            className="text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
          >
            Open Harness
          </Link>
          <span className="text-[var(--text-disabled)]">/</span>
          <Link
            href="/forge/course/open-harness/labs/"
            className="text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
          >
            Labs
          </Link>
          <span className="text-[var(--text-disabled)]">/</span>
          <span className="font-mono text-[var(--accent-orange)]">{lab.number}</span>
        </div>
        <HarnessCourseTabs active="labs" />
      </div>

      <div className="eyebrow text-[var(--accent-orange)]">Harness Lab · {lab.number}</div>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-2px] leading-[1.05]">
        {lab.title}
      </h1>
      <p className="mt-5 text-lg text-[var(--text-secondary)] leading-relaxed">{lab.subtitle}</p>
      <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">~{lab.minutes} min</p>

      <div className="mt-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-5 space-y-3">
        <div>
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
            Requires
          </div>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{lab.requires}</p>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
            Assumes
          </div>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{lab.assumes}</p>
        </div>
        <p className="text-sm text-[var(--text-tertiary)]">
          If not ready:{' '}
          <Link href={lab.ifNotHref} className="text-[var(--accent-orange)] hover:underline">
            {lab.ifNotLabel} →
          </Link>
        </p>
      </div>

      <LabVisual slug={lab.slug} />

      <div className="mt-10 space-y-12">
        {lab.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-orange)] font-mono">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.steps && (
              <InteractiveChecklist
                courseId="harness-labs"
                moduleSlug={lab.slug}
                sectionKey={`${i}-steps`}
                items={section.steps}
                accent="orange"
                mode="steps"
              />
            )}
            {section.callout && (
              <div
                className={`mt-5 rounded-r-xl border-l-2 bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)] ${
                  section.calloutVariant === 'warning'
                    ? 'border-[var(--accent-amber)]'
                    : section.calloutVariant === 'quote'
                      ? 'border-[var(--accent-cyan)] italic'
                      : 'border-[var(--accent-orange)]'
                }`}
              >
                {section.callout}
              </div>
            )}
            {section.links && (
              <ul className="mt-5 space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--accent-orange)] hover:underline"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-[var(--accent-orange)] hover:underline">
                        {link.label} →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
        <div className="eyebrow text-[var(--accent-cyan)]">Outcome</div>
        <p className="mt-3 text-[var(--text-secondary)]">{lab.outcome}</p>
        <InteractiveChecklist
          courseId="harness-labs"
          moduleSlug={lab.slug}
          sectionKey="lab-outcome"
          items={[lab.outcome]}
          accent="cyan"
          mode="proof"
        />
        <MarkCompleteButton courseId="harness-labs" slug={lab.slug} accent="orange" />
      </div>

      <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-[var(--border-default)] pt-8">
        {prev ? (
          <Link
            href={`/forge/course/open-harness/labs/${prev.slug}/`}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-orange)]"
          >
            ← {prev.title}
          </Link>
        ) : (
          <Link href="/forge/course/open-harness/labs/" className="text-sm text-[var(--text-secondary)]">
            ← All labs
          </Link>
        )}
        {next ? (
          <Link
            href={`/forge/course/open-harness/labs/${next.slug}/`}
            className="text-sm font-medium text-[var(--accent-orange)]"
          >
            {next.title} →
          </Link>
        ) : (
          <Link href="/forge/course/open-design/" className="text-sm font-medium text-[var(--accent-cyan)]">
            Open Design mastery →
          </Link>
        )}
      </div>
    </main>
  );
}
