'use client';

import Link from 'next/link';
import { withBasePath } from '@/lib/site';
import {
  UI_COPY,
  type CourseLang,
  type CourseModule,
  type CourseSection,
  t,
} from '@/app/data/courses/open-harness';
import { HarnessModuleVisual } from '@/app/components/course/CourseVisuals';
import { InteractiveChecklist, MarkCompleteButton } from '@/app/components/course/CourseLearning';
import { ModuleNav, useOpenHarnessLang } from './CourseShell';

export function ModuleBody({ module }: { module: CourseModule }) {
  const lang = useOpenHarnessLang();
  return <ModuleBodyView module={module} lang={lang} />;
}

/** Pure view — also used if you need a fixed lang without context. */
export function ModuleBodyView({ module, lang }: { module: CourseModule; lang: CourseLang }) {
  const partLabel = module.part === 1 ? 'Part I · Sovereign agent' : 'Part II · Compounding harness';
  return (
    <article>
      <div className="eyebrow text-[var(--accent-orange)]">
        {partLabel} · {module.number}
      </div>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-2px] leading-[1.05]">
        {t(module.title, lang)}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
        {t(module.subtitle, lang)}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono text-[var(--text-muted)]">
        <span>
          {module.minutes} {t(UI_COPY.minRead, lang)}
        </span>
      </div>

      <div className="mt-8">
        <HarnessModuleVisual slug={module.slug} />
      </div>

      <div className="mt-10 space-y-12">
        {module.sections.map((section, i) => (
          <SectionBlock
            key={i}
            section={section}
            lang={lang}
            moduleSlug={module.slug}
            sectionKey={String(i)}
          />
        ))}
      </div>

      <div className="course-proof mt-12">
        <div className="eyebrow text-[var(--accent-cyan)]">{t(UI_COPY.proof, lang)}</div>
        <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{t(module.proof, lang)}</p>
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
      <h2 className="text-2xl font-semibold tracking-tight">{t(section.heading, lang)}</h2>

      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          {t(p, lang)}
        </p>
      ))}

      {section.bullets && (
        <ul className="mt-4 space-y-2 max-w-2xl">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--accent-orange)] font-mono shrink-0">·</span>
              <span>{t(b, lang)}</span>
            </li>
          ))}
        </ul>
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

      {section.lexicon && (
        <div className="mt-6 grid gap-4">
          {section.lexicon.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-5 md:p-6"
            >
              <div className="font-mono text-xs text-[var(--accent-orange)] tracking-[2px] uppercase">
                {t(card.term, lang)}
              </div>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {t(card.body, lang)}
              </p>
              <p className="mt-3 text-sm italic text-[var(--text-tertiary)] border-l-2 border-[var(--accent-cyan)]/40 pl-3">
                {t(card.remember, lang)}
              </p>
            </div>
          ))}
        </div>
      )}

      {section.table && (
        <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--border-default)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--bg-deep)]">
                {section.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium text-[var(--text-primary)]">
                    {t(h, lang)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[var(--border-default)] last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[var(--text-secondary)] align-top">
                      {t(cell, lang)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {section.souls && (
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {section.souls.map((soul) => (
            <div
              key={soul.id}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-4 flex flex-col"
            >
              <div className="font-semibold">{t(soul.name, lang)}</div>
              <p className="mt-1 text-sm text-[var(--text-secondary)] flex-1">{t(soul.blurb, lang)}</p>
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

      {section.callout && (
        <div
          className={`mt-5 rounded-r-xl border-l-2 bg-[var(--bg-surface)] p-5 text-sm leading-relaxed ${
            section.calloutVariant === 'warning'
              ? 'border-[var(--accent-amber)] text-[var(--text-secondary)]'
              : section.calloutVariant === 'quote'
                ? 'border-[var(--accent-cyan)] italic text-[var(--text-secondary)]'
                : 'border-[var(--accent-orange)] text-[var(--text-secondary)]'
          }`}
        >
          {t(section.callout, lang)}
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
    </section>
  );
}
