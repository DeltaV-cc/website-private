'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { withBasePath } from '@/lib/site';
import {
  OD_UI,
  OPEN_DESIGN_META,
  OPEN_DESIGN_MODULES,
  OPEN_DESIGN_PARTS,
  t,
  type CourseModule,
  type CoursePartId,
} from '@/app/data/courses/open-design';
import {
  DesignModuleVisual,
  DesignStackVisual,
  RentVsOwnVisual,
  TwoPartJourneyVisual,
} from '@/app/components/course/DesignVisuals';
import {
  CourseProgressBar,
  DesignPrereqGate,
  InteractiveChecklist,
  MarkCompleteButton,
  ResumeCourseLink,
  useCompletedSet,
} from '@/app/components/course/CourseLearning';

const DESIGN_SLUGS = OPEN_DESIGN_MODULES.map((m) => m.slug);

function modulesForPart(partId: CoursePartId) {
  return OPEN_DESIGN_MODULES.filter((m) => m.part === partId);
}

export function DesignToc({ activeSlug }: { activeSlug?: string }) {
  const done = useCompletedSet('open-design');
  return (
    <nav
      aria-label={t(OD_UI.modules)}
      className="course-toc sticky top-24"
    >
      <div className="eyebrow text-[var(--accent-cyan)] mb-4">{t(OD_UI.syllabus)}</div>
      <div className="space-y-5">
        {OPEN_DESIGN_PARTS.map((part) => (
          <div key={part.id}>
            <div className="mb-2 px-1">
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
                {t(OD_UI.part)} {part.code}
              </div>
              <div className="text-xs font-semibold mt-0.5 leading-snug">{t(part.title)}</div>
            </div>
            <ol className="space-y-0.5">
              {modulesForPart(part.id).map((mod) => {
                const active = activeSlug === mod.slug;
                const complete = done.has(mod.slug);
                return (
                  <li key={mod.slug}>
                    <Link
                      href={`/forge/course/open-design/${mod.slug}/`}
                      className={`group flex gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] ring-1 ring-[var(--accent-cyan)]/30'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--accent-cyan)] w-5 shrink-0 pt-0.5">
                        {complete ? '✓' : mod.number}
                      </span>
                      <span className="leading-snug">{t(mod.title)}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--border-default)]">
        <Link
          href="/forge/course/my-first-ai-agent/"
          className="block text-xs text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
        >
          Prereq: My First AI Agent →
        </Link>
        <Link
          href="/forge/course/open-video/"
          className="mt-2 block text-xs text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
        >
          After: Open Video →
        </Link>
      </div>
    </nav>
  );
}

export function DesignPageChrome({
  children,
  activeSlug,
}: {
  children: ReactNode;
  activeSlug?: string;
}) {
  const activeMod = activeSlug ? OPEN_DESIGN_MODULES.find((m) => m.slug === activeSlug) : null;
  const activePart = activeMod
    ? OPEN_DESIGN_PARTS.find((p) => p.id === activeMod.part)
    : null;

  return (
    <div className="course-surface course-surface--cyan min-h-screen">
      <div className="page-container pt-10 md:pt-14 pb-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-3 text-sm" aria-label="Breadcrumb">
            <Link href="/forge/" className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)]">
              {t(OD_UI.backForge)}
            </Link>
            <span className="text-[var(--text-disabled)]" aria-hidden>
              /
            </span>
            <Link
              href="/forge/course/open-design/"
              className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)]"
            >
              {t(OD_UI.backCourse)}
            </Link>
            {activePart && (
              <>
                <span className="text-[var(--text-disabled)]" aria-hidden>
                  /
                </span>
                <span className="font-mono text-xs text-[var(--accent-cyan)] tracking-[1px] uppercase">
                  {t(OD_UI.part)} {activePart.code}
                </span>
              </>
            )}
            {activeSlug && (
              <>
                <span className="text-[var(--text-disabled)]" aria-hidden>
                  /
                </span>
                <span className="font-mono text-[var(--accent-orange)]">{activeSlug}</span>
              </>
            )}
          </nav>
          <span className="course-privacy-chip" title="Progress stays in this browser">
            Local only
          </span>
        </div>
        {activeSlug && (
          <div className="mb-8 max-w-2xl">
            <CourseProgressBar courseId="open-design" orderedSlugs={DESIGN_SLUGS} accent="cyan" />
          </div>
        )}
        <div className="grid lg:grid-cols-[15.5rem_minmax(0,1fr)] gap-10 lg:gap-12">
          <aside className="hidden lg:block">
            <DesignToc activeSlug={activeSlug} />
          </aside>
          <div className="course-reading">{children}</div>
        </div>
        <div className="course-mobile-toc-wrap lg:hidden">
          <details className="course-toc">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--accent-cyan)] list-none flex justify-between items-center">
              Syllabus
              <span className="text-[var(--text-muted)]">tap</span>
            </summary>
            <div className="mt-4 max-h-[50vh] overflow-y-auto">
              <DesignToc activeSlug={activeSlug} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export function DesignLandingBody() {
  return (
    <>
      <header className="course-hero course-hero--cyan">
        <div className="flex flex-wrap items-center justify-between gap-3 relative">
          <div className="eyebrow text-[var(--accent-cyan)]">{t(OD_UI.courseLabel)}</div>
          <span className="course-privacy-chip">Local only</span>
        </div>
        <h1 className="section-title mt-3 relative max-w-3xl">{t(OPEN_DESIGN_META.title)}</h1>
        <p className="mt-6 max-w-2xl text-xl text-[var(--text-secondary)] leading-relaxed relative">
          {t(OPEN_DESIGN_META.tagline)}
        </p>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed relative">
          {t(OPEN_DESIGN_META.description)}
        </p>
        <div className="mt-5 relative rounded-xl border border-[var(--accent-orange)]/25 bg-[var(--bg-surface)] px-4 py-3 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--accent-orange)]">
            {t(OD_UI.prereq)}
          </span>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{t(OPEN_DESIGN_META.prereq)}</p>
          <Link
            href="/forge/course/my-first-ai-agent/00/"
            className="mt-2 inline-block text-sm text-[var(--accent-orange)] hover:underline"
          >
            My First AI Agent Part I →
          </Link>
        </div>
        <DesignPrereqGate />
        <div className="mt-6 relative max-w-2xl">
          <CourseProgressBar
            courseId="open-design"
            orderedSlugs={DESIGN_SLUGS}
            accent="cyan"
            showPrivacy
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3 relative">
          <ResumeCourseLink
            courseId="open-design"
            orderedSlugs={DESIGN_SLUGS}
            basePath="/forge/course/open-design/"
            className="button-primary"
            startLabel={t(OD_UI.start)}
            continueLabel="Continue"
          />
          <Link href="/forge/course/open-design/05/" className="button-secondary">
            {t(OD_UI.startPart2)}
          </Link>
          <Link href="/forge/course/open-video/" className="button-secondary">
            Video roadmap
          </Link>
        </div>
      </header>

      {/* At-a-glance visual */}
      <section className="mt-14" aria-labelledby="od-glance">
        <h2 id="od-glance" className="text-2xl font-semibold tracking-tight">
          At a glance
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          One mental model, then the path. Scroll for the full syllabus.
        </p>
        <RentVsOwnVisual />
        <TwoPartJourneyVisual />
        <DesignStackVisual />
      </section>

      {/* Two parts */}
      <section className="mt-16" aria-labelledby="od-parts">
        <h2 id="od-parts" className="text-2xl font-semibold tracking-tight">
          Two parts
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
          Finish Part I before Part II. Motion (HyperFrames / Remotion) is Open Video — not here.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {OPEN_DESIGN_PARTS.map((part) => {
            const mods = modulesForPart(part.id);
            const mins = mods.reduce((s, m) => s + m.minutes, 0);
            const accent = part.id === 1 ? 'var(--accent-cyan)' : 'var(--accent-orange)';
            return (
              <div
                key={part.id}
                className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6 md:p-7 flex flex-col"
                style={{ borderTopWidth: 2, borderTopColor: accent }}
              >
                <div className="font-mono text-xs tracking-[2px] uppercase" style={{ color: accent }}>
                  {t(OD_UI.part)} {part.code}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t(part.title)}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{t(part.subtitle)}</p>
                <p className="mt-4 text-sm text-[var(--text-tertiary)] flex-1 leading-relaxed">
                  {t(part.promise)}
                </p>
                <ol className="mt-6 space-y-1.5 border-t border-[var(--border-default)] pt-5">
                  {mods.map((mod) => (
                    <li key={mod.slug}>
                      <Link
                        href={`/forge/course/open-design/${mod.slug}/`}
                        className="group flex gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] py-1"
                      >
                        <span className="font-mono text-xs w-6 shrink-0" style={{ color: accent }}>
                          {mod.number}
                        </span>
                        <span className="group-hover:underline leading-snug">{t(mod.title)}</span>
                        <span className="ml-auto font-mono text-[10px] text-[var(--text-muted)] shrink-0">
                          {mod.minutes}m
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex justify-between items-center gap-3">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    ~{mins} {t(OD_UI.minRead)} · {mods.length} modules
                  </span>
                  <Link
                    href={`/forge/course/open-design/${part.startSlug}/`}
                    className="text-sm font-medium"
                    style={{ color: accent }}
                  >
                    Open Part {part.code} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mt-16 grid md:grid-cols-2 gap-4" aria-labelledby="od-outcomes">
        <h2 id="od-outcomes" className="sr-only">
          {t(OD_UI.outcomes)}
        </h2>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
            After Part I
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-2">
              <span className="text-[var(--accent-cyan)]">✓</span> Stack wired (OD + Hermes)
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent-cyan)]">✓</span> Deck opens offline
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent-cyan)]">✓</span> Image pack + prompts-used.md
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent-cyan)]">✓</span> One content pack folder
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
            After Part II
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-2">
              <span className="text-[var(--accent-orange)]">✓</span> DESIGN.md reused once
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent-orange)]">✓</span> Kimi + Imagine roles clear
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent-orange)]">✓</span> Motion skills off this profile
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent-orange)]">✓</span> Handoff opens without Hermes
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export function DesignModuleBody({ module }: { module: CourseModule }) {
  const partLabel =
    module.part === 1 ? 'Part I · See it differently' : 'Part II · Own the system';
  const idx = OPEN_DESIGN_MODULES.findIndex((m) => m.slug === module.slug);
  const prev = idx > 0 ? OPEN_DESIGN_MODULES[idx - 1] : null;
  const next = idx < OPEN_DESIGN_MODULES.length - 1 ? OPEN_DESIGN_MODULES[idx + 1] : null;

  return (
    <article>
      <CourseProgressBar courseId="open-design" orderedSlugs={DESIGN_SLUGS} accent="cyan" />

      <div className="eyebrow text-[var(--accent-cyan)]">
        {partLabel} · {module.number}
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-2px] leading-[1.05]">
        {t(module.title)}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
        {t(module.subtitle)}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs text-[var(--text-muted)]">
        <span>
          {module.minutes} {t(OD_UI.minRead)}
        </span>
        <span aria-hidden>·</span>
        <span>
          Module {idx + 1} of {OPEN_DESIGN_MODULES.length}
        </span>
      </div>

      <div className="mt-8">
        <DesignModuleVisual slug={module.slug} />
      </div>

      <div className="mt-10 space-y-12">
        {module.sections.map((section, i) => (
          <section key={i} className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="font-mono text-xs text-[var(--accent-cyan)] opacity-70">
                {String(i + 1).padStart(2, '0')}
              </span>
              {t(section.heading)}
            </h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {t(p)}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 space-y-2 max-w-2xl">
                {section.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-cyan)] font-mono shrink-0">·</span>
                    <span>{t(b)}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--border-default)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-default)] bg-[var(--bg-deep)]">
                      {section.table.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 text-left font-medium">
                          {t(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-[var(--border-default)] last:border-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-[var(--text-secondary)] align-top">
                            {t(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.steps && (
              <InteractiveChecklist
                courseId="open-design"
                moduleSlug={module.slug}
                sectionKey={`${i}-steps`}
                items={section.steps.map((s) => t(s))}
                accent="cyan"
                mode="steps"
              />
            )}
            {section.checklist && (
              <InteractiveChecklist
                courseId="open-design"
                moduleSlug={module.slug}
                sectionKey={String(i)}
                items={section.checklist.map((item) => t(item))}
                accent="cyan"
              />
            )}
            {section.callout && (
              <div
                className={`mt-5 rounded-r-xl border-l-2 bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)] leading-relaxed ${
                  section.calloutVariant === 'warning'
                    ? 'border-[var(--accent-amber)]'
                    : section.calloutVariant === 'quote'
                      ? 'border-[var(--accent-cyan)] italic'
                      : 'border-[var(--accent-orange)]'
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans text-sm m-0">{t(section.callout)}</pre>
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
                        className="text-sm text-[var(--accent-cyan)] hover:underline"
                      >
                        {t(link.label)} ↗
                      </a>
                    ) : link.href.startsWith('/courses/') ? (
                      <a
                        href={withBasePath(link.href)}
                        className="text-sm text-[var(--accent-cyan)] hover:underline"
                      >
                        {t(link.label)} ↘
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-[var(--accent-cyan)] hover:underline">
                        {t(link.label)} →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="course-proof mt-12">
        <div className="eyebrow text-[var(--accent-orange)]">{t(OD_UI.proof)}</div>
        <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{t(module.proof)}</p>
        <InteractiveChecklist
          courseId="open-design"
          moduleSlug={module.slug}
          sectionKey="module-proof"
          items={[t(module.proof)]}
          accent="orange"
          mode="proof"
        />
        <MarkCompleteButton courseId="open-design" slug={module.slug} accent="cyan" />
      </div>

      <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-[var(--border-default)] pt-8">
        {prev ? (
          <Link
            href={`/forge/course/open-design/${prev.slug}/`}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"
          >
            ← {t(OD_UI.prev)}: {t(prev.title)}
          </Link>
        ) : (
          <Link href="/forge/course/open-design/" className="text-sm text-[var(--text-secondary)]">
            ← {t(OD_UI.backCourse)}
          </Link>
        )}
        {next ? (
          <Link
            href={`/forge/course/open-design/${next.slug}/`}
            className="text-sm font-medium text-[var(--accent-cyan)]"
          >
            {t(OD_UI.next)}: {t(next.title)} →
          </Link>
        ) : (
          <Link href="/forge/" className="text-sm font-medium text-[var(--accent-orange)]">
            Back to Forge →
          </Link>
        )}
      </div>
    </article>
  );
}
