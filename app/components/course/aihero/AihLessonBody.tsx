'use client';

import {
  OPEN_HARNESS_MODULES,
  UI_COPY,
  courseBase,
  t,
  type CourseLang,
  type CourseModule,
} from '@/app/data/courses/open-harness';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { InteractiveChecklist, MarkCompleteButton } from '@/app/components/course/CourseLearning';
import { HarnessModuleVisual } from '@/app/components/course/CourseVisuals';
import { ModuleNav, useOpenHarnessLang } from '@/app/components/course/CourseShell';
import { CourseCode } from '@/app/components/course/lesson/CourseCode';
import { LessonSection } from '@/app/components/course/lesson/LessonSection';

/**
 * The aihero page shape: one plain meta line ("03 / 13 · My First AI Agent — Part I
 * · 30 min read"), the title, the deck, then a runnable command card. Same
 * block engine underneath — this file is furniture, not a renderer.
 */
export function AihLessonBody({ module }: { module: CourseModule }) {
  const lang = useOpenHarnessLang();
  return <AihLessonBodyView module={module} lang={lang} />;
}

export function AihLessonBodyView({ module, lang }: { module: CourseModule; lang: CourseLang }) {
  const index = OPEN_HARNESS_MODULES.findIndex((m) => m.slug === module.slug) + 1;
  const partLabel = `${t(UI_COPY.part, lang)} ${module.part === 1 ? 'I' : 'II'}`;
  const main = module.sections.filter((s) => !s.advanced);
  const advanced = module.sections.filter((s) => s.advanced);

  const placement = module.visualPlacement ?? 'top';
  const showTopVisual = placement === 'top';
  const visualAfterIndex = typeof placement === 'number' ? placement : -1;

  return (
    <article className="course-prose">
      <div className="course-meta">
        <span className="course-meta-num">
          {index} / {OPEN_HARNESS_MODULES.length}
        </span>
        <span aria-hidden>·</span>
        <span>
          {t(UI_COPY.backCourse, lang)} — {partLabel} · {module.minutes} {t(UI_COPY.minReadLong, lang)}
        </span>
      </div>
      <h1 className="course-h1 mt-4">{t(module.title, lang)}</h1>
      <p className="course-deck mt-4">{formatCourseText(t(module.subtitle, lang), lang)}</p>

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
          <h2 className="course-h3">{t(UI_COPY.otherDeploy, lang)}</h2>
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
          lang={lang}
        />
        <MarkCompleteButton courseId="open-harness" slug={module.slug} accent="orange" lang={lang} />
      </div>

      <ModuleNav module={module} lang={lang} basePath={courseBase(lang)} />
    </article>
  );
}
