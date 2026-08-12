'use client';

import {
  UI_COPY,
  t,
  type CourseLang,
  type CourseModule,
} from '@/app/data/courses/open-harness';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { InteractiveChecklist, MarkCompleteButton } from '@/app/components/course/CourseLearning';
import { HarnessModuleVisual } from '@/app/components/course/CourseVisuals';
import { ModuleNav, useOpenHarnessLang } from '@/app/components/course/CourseShell';
import { CourseCode } from './CourseCode';
import { LessonSection } from './LessonSection';

export function LessonBody({ module }: { module: CourseModule }) {
  const lang = useOpenHarnessLang();
  return <LessonBodyView module={module} lang={lang} />;
}

/**
 * Page furniture, in the reference's order: one meta line, title, deck, an
 * optional runnable command, then sections. `course-prose` is load-bearing —
 * OnThisPage queries it as the root it reads headings from.
 */
export function LessonBodyView({ module, lang }: { module: CourseModule; lang: CourseLang }) {
  const partLabel = module.part === 1 ? 'Part I · Working assistant' : 'Part II · Memory & routines';
  const main = module.sections.filter((s) => !s.advanced);
  const advanced = module.sections.filter((s) => s.advanced);

  const placement = module.visualPlacement ?? 'top';
  const showTopVisual = placement === 'top';
  const visualAfterIndex = typeof placement === 'number' ? placement : -1;

  return (
    <article className="course-prose">
      <div className="course-meta">
        <span className="course-meta-num">{module.number}</span>
        <span>{partLabel}</span>
        <span aria-hidden>·</span>
        <span>
          {module.minutes} {t(UI_COPY.minRead, lang)}
        </span>
      </div>
      <h1 className="course-h1 mt-4">{t(module.title, lang)}</h1>
      <p className="course-deck mt-4">{formatCourseText(t(module.subtitle, lang))}</p>

      {module.hero && (
        <div className="mt-8">
          <CourseCode block={module.hero} lang={lang} />
        </div>
      )}

      {showTopVisual && (
        <div className="mt-10">
          <HarnessModuleVisual slug={module.slug} />
        </div>
      )}

      <div className="mt-14 space-y-14">
        {main.map((section, i) => (
          <div key={i}>
            <LessonSection section={section} lang={lang} moduleSlug={module.slug} />
            {visualAfterIndex === i && (
              <div className="mt-10">
                <HarnessModuleVisual slug={module.slug} />
              </div>
            )}
          </div>
        ))}
      </div>

      {advanced.length > 0 && (
        <div className="mt-14 space-y-3">
          <div>
            <div className="course-t-meta font-mono uppercase tracking-[2px] text-[var(--text-muted)]">
              Optional setup
            </div>
            <h2 className="course-h3 mt-1">Other ways to deploy</h2>
            <p className="mt-1 course-t-small text-[var(--text-tertiary)] course-measure">
              Closed by default. Alternate hosts and infrastructure options — not required for this
              lesson.
            </p>
          </div>
          {/* Kept inside <details> on purpose: OnThisPage skips headings in a
              collapsed disclosure, so the rail never points at hidden content. */}
          {advanced.map((section, i) => (
            <details key={i} className="course-advanced-details">
              <summary className="course-advanced-summary">
                <span className="course-advanced-chevron" aria-hidden>
                  ▸
                </span>
                <span>{t(section.heading, lang)}</span>
              </summary>
              <div className="course-advanced-body">
                <LessonSection
                  section={section}
                  lang={lang}
                  moduleSlug={module.slug}
                  showHeading={false}
                />
              </div>
            </details>
          ))}
        </div>
      )}

      <div className="course-proof mt-16">
        <h2 className="course-h3">{t(UI_COPY.proof, lang)}</h2>
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
