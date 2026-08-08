'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { withBasePath } from '@/lib/site';
import {
  UI_COPY,
  type CourseLang,
  type CourseModule,
  type CourseSection,
  t,
} from '@/app/data/courses/open-harness';
import { HarnessModuleVisual } from '@/app/components/course/CourseVisuals';
import {
  CourseQuizBlock,
  InteractiveChecklist,
  MarkCompleteButton,
} from '@/app/components/course/CourseLearning';
import {
  PrimarySources,
  RememberLine,
  SectionCitations,
  WhoSteps,
  WinWhenList,
} from '@/app/components/course/CourseBlocks';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { ModuleNav, useOpenHarnessLang } from './CourseShell';

export function ModuleBody({ module }: { module: CourseModule }) {
  const lang = useOpenHarnessLang();
  return <ModuleBodyView module={module} lang={lang} />;
}

/** Pure view — also used if you need a fixed lang without context. */
export function ModuleBodyView({ module, lang }: { module: CourseModule; lang: CourseLang }) {
  const partLabel = module.part === 1 ? 'Part I · Working assistant' : 'Part II · Memory & routines';
  const main = module.sections
    .map((section, i) => ({ section, i }))
    .filter(({ section }) => !section.advanced);
  const advanced = module.sections
    .map((section, i) => ({ section, i }))
    .filter(({ section }) => section.advanced);

  const placement = module.visualPlacement ?? 'top';
  const showTopVisual = placement === 'top';
  const visualAfterMainIndex = typeof placement === 'number' ? placement : -1;

  return (
    <article className="course-prose">
      <div className="eyebrow text-[var(--accent-orange)]">
        {partLabel} · {module.number}
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-2px] leading-[1.05]">
        {t(module.title, lang)}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
        {formatCourseText(t(module.subtitle, lang))}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono text-[var(--text-muted)]">
        <span>
          {module.minutes} {t(UI_COPY.minRead, lang)}
        </span>
      </div>

      {showTopVisual && (
        <div className="mt-8">
          <HarnessModuleVisual slug={module.slug} />
        </div>
      )}

      <div className="mt-10 space-y-12">
        {main.map(({ section, i }, mainIdx) => (
          <div key={i}>
            <SectionBlock
              section={section}
              lang={lang}
              moduleSlug={module.slug}
              sectionKey={String(i)}
            />
            {visualAfterMainIndex === mainIdx && (
              <div className="mt-8">
                <HarnessModuleVisual slug={module.slug} />
              </div>
            )}
          </div>
        ))}
      </div>

      {advanced.length > 0 && (
        <div className="mt-12 space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-muted)]">
                Optional setup
              </div>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                Other ways to deploy
              </h2>
              <p className="mt-1 text-sm text-[var(--text-tertiary)] max-w-xl">
                Closed by default. Maps Nous Portal, own infra, cloud providers, Docker, OS, and
                multi-machine options — not required for this lesson. Contact Delta V for a tailored
                setup.
              </p>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
              {advanced.length} section{advanced.length === 1 ? '' : 's'}
            </span>
          </div>
          <div className="space-y-2">
            {advanced.map(({ section, i }) => (
              <details key={i} className="course-advanced-details group">
                <summary className="course-advanced-summary">
                  <span className="course-advanced-chevron" aria-hidden>
                    ▸
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--text-muted)]">
                      Setup
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-[var(--text-primary)] leading-snug">
                      {t(section.heading, lang)}
                    </span>
                  </span>
                </summary>
                <div className="course-advanced-body">
                  <SectionInner
                    section={section}
                    lang={lang}
                    moduleSlug={module.slug}
                    sectionKey={`adv-${i}`}
                    showHeading={false}
                  />
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="course-proof mt-12">
        <div className="eyebrow text-[var(--accent-cyan)]">{t(UI_COPY.proof, lang)}</div>
        <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
          {formatCourseText(t(module.proof, lang))}
        </p>
        <InteractiveChecklist
          courseId="open-harness"
          moduleSlug={module.slug}
          sectionKey="module-proof"
          items={[t(module.proof, lang)]}
          accent="cyan"
          mode="proof"
        />
        <MarkCompleteButton courseId="open-harness" slug={module.slug} accent="orange" />
      </div>

      <ModuleNav module={module} lang={lang} />
    </article>
  );
}

function SectionBlock({
  section,
  lang,
  moduleSlug,
  sectionKey,
}: {
  section: CourseSection;
  lang: CourseLang;
  moduleSlug: string;
  sectionKey: string;
}) {
  return (
    <section>
      <SectionInner
        section={section}
        lang={lang}
        moduleSlug={moduleSlug}
        sectionKey={sectionKey}
        showHeading
      />
    </section>
  );
}

function SectionInner({
  section,
  lang,
  moduleSlug,
  sectionKey,
  showHeading,
}: {
  section: CourseSection;
  lang: CourseLang;
  moduleSlug: string;
  sectionKey: string;
  showHeading: boolean;
}): ReactNode {
  return (
    <>
      {showHeading && (
        <h2 className="text-2xl font-semibold tracking-tight">{t(section.heading, lang)}</h2>
      )}

      {section.lead && (
        <p className="mt-3 max-w-2xl text-base text-[var(--text-primary)] leading-relaxed">
          {formatCourseText(t(section.lead, lang))}
        </p>
      )}

      {/* Concepts first: prose → whoSteps → table → cards → remember → callout → drills → diagram */}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          {formatCourseText(t(p, lang))}
        </p>
      ))}

      {section.whoSteps && section.whoSteps.length > 0 && (
        <WhoSteps
          steps={section.whoSteps.map((s) => ({
            who: t(s.who, lang),
            title: t(s.title, lang),
            body: t(s.body, lang),
          }))}
        />
      )}

      {section.bullets && (
        <ul className="mt-4 space-y-2 max-w-2xl">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--accent-orange)] font-mono shrink-0">·</span>
              <span>{formatCourseText(t(b, lang))}</span>
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="course-table-wrap mt-5 overflow-x-auto rounded-xl">
          <table className="course-table w-full text-sm">
            <thead>
              <tr>
                {section.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    {formatCourseText(t(h, lang))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 align-top">
                      {formatCourseText(t(cell, lang))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.lexicon && (
        <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {section.lexicon.map((card, i) => (
            <article
              key={i}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-4 flex flex-col min-h-[9.5rem]"
            >
              <h3 className="font-mono text-[11px] text-[var(--accent-orange)] tracking-[1.5px] uppercase font-semibold">
                {t(card.term, lang)}
              </h3>
              <p className="mt-2 text-[13px] text-[var(--text-secondary)] leading-snug flex-1">
                {formatCourseText(t(card.body, lang))}
              </p>
              <p className="mt-3 text-[12px] italic text-[var(--text-tertiary)] border-t border-[var(--border-default)] pt-2">
                {formatCourseText(t(card.remember, lang))}
              </p>
            </article>
          ))}
        </div>
      )}

      {section.remember && <RememberLine text={t(section.remember, lang)} />}

      {section.callout && (
        <div
          className={`mt-5 rounded-r-xl border-l-[3px] bg-[var(--bg-surface)] p-5 text-sm leading-relaxed ${
            section.calloutVariant === 'warning'
              ? 'border-[var(--accent-amber)] text-[var(--text-secondary)]'
              : section.calloutVariant === 'quote'
                ? 'border-[var(--accent-cyan)] italic text-[var(--text-secondary)]'
                : 'border-[var(--accent-orange)] text-[var(--text-secondary)]'
          }`}
        >
          {formatCourseText(t(section.callout, lang))}
        </div>
      )}

      {section.winWhen && section.winWhen.length > 0 && (
        <WinWhenList items={section.winWhen.map((w) => t(w, lang))} />
      )}

      {section.steps && (
        <InteractiveChecklist
          courseId="open-harness"
          moduleSlug={moduleSlug}
          sectionKey={`${sectionKey}-steps`}
          items={section.steps.map((s) => t(s, lang))}
          accent="orange"
          mode="steps"
        />
      )}

      {section.checklist && (
        <InteractiveChecklist
          courseId="open-harness"
          moduleSlug={moduleSlug}
          sectionKey={sectionKey}
          items={section.checklist.map((item) => t(item, lang))}
          accent="orange"
        />
      )}

      {section.quizzes?.map((q, qi) => (
        <CourseQuizBlock
          key={qi}
          question={t(q.question, lang)}
          options={q.options.map((o) => t(o, lang))}
          correct={t(q.correct, lang)}
          explain={t(q.explain, lang)}
          label={t(UI_COPY.quiz, lang)}
        />
      ))}

      {section.souls && (
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {section.souls.map((soul) => (
            <div
              key={soul.id}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-4 flex flex-col"
            >
              <div className="font-semibold text-[var(--text-primary)]">{t(soul.name, lang)}</div>
              <p className="mt-1 text-sm text-[var(--text-secondary)] flex-1">
                {formatCourseText(t(soul.blurb, lang))}
              </p>
              <a
                href={withBasePath(`/courses/open-harness/souls/${soul.id}.md`)}
                download
                className="mt-3 text-xs font-mono text-[var(--accent-orange)] hover:underline"
              >
                {t(UI_COPY.downloadSoul, lang)} ↘
              </a>
            </div>
          ))}
        </div>
      )}

      {section.links && (
        <ul className="mt-5 space-y-2">
          {section.links.map((link, i) => (
            <li key={i}>
              {link.href.startsWith('http') ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-orange)] hover:underline"
                >
                  {t(link.label, lang)} ↗
                </a>
              ) : link.href.startsWith('/courses/') ? (
                <a
                  href={withBasePath(link.href)}
                  className="text-sm text-[var(--accent-orange)] hover:underline"
                >
                  {t(link.label, lang)} ↘
                </a>
              ) : (
                <Link href={link.href} className="text-sm text-[var(--accent-orange)] hover:underline">
                  {t(link.label, lang)} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      {section.primarySources && section.primarySources.length > 0 && (
        <PrimarySources
          label={t(UI_COPY.primarySource, lang)}
          sources={section.primarySources.map((s) => ({
            label: t(s.label, lang),
            href: s.href,
          }))}
        />
      )}

      {section.citations && section.citations.length > 0 && (
        <SectionCitations items={section.citations.map((c) => t(c, lang))} />
      )}

      {/* Diagram last in the section: concept text above, map beside that idea only */}
      {section.visual && (
        <div className="mt-6">
          <HarnessModuleVisual slug={moduleSlug} variant={section.visual} />
        </div>
      )}
    </>
  );
}
