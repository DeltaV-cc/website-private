'use client';

import { useChecklistFlags } from '@/app/components/course/CourseLearning';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { t, type CourseLang, type CourseStep } from '@/app/data/courses/open-harness';
import { CourseCode } from './CourseCode';

/**
 * A procedure that teaches: numbered toggle, imperative title, and — the part
 * the old renderer silently dropped — the step's runnable command with its own
 * copy button. The command lives OUTSIDE the toggle <button>: nesting a button
 * in a button is invalid HTML and the copy click would flip the checkbox.
 *
 * Persistence is the same positional-flags storage as InteractiveChecklist
 * (`useChecklistFlags`), under the same key — existing ticks survive.
 */
export function CourseSteps({
  courseId,
  moduleSlug,
  sectionKey,
  items,
  lang,
}: {
  courseId: string;
  moduleSlug: string;
  sectionKey: string;
  items: CourseStep[];
  lang: CourseLang;
}) {
  const { flags, toggle } = useChecklistFlags(courseId, moduleSlug, sectionKey, items.length);
  const checked = flags.filter(Boolean).length;

  return (
    <div className="course-step-list">
      <div className="course-step-head">
        <span>Steps · tap the number to check</span>
        <span className="tabular-nums">
          {checked}/{items.length}
        </span>
      </div>
      <ol className="course-steps">
        {items.map((step, i) => {
          const on = flags[i];
          return (
            <li key={i} className={`course-step ${on ? 'is-on' : ''}`}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                aria-label={`Mark step ${i + 1} ${on ? 'not done' : 'done'}`}
                className="course-step-toggle"
              >
                <span
                  className="course-check-box"
                  style={
                    on
                      ? {
                          borderColor: 'var(--course-accent)',
                          color: 'var(--course-accent)',
                          background:
                            'color-mix(in srgb, var(--course-accent) 12%, transparent)',
                        }
                      : undefined
                  }
                  aria-hidden
                >
                  {on ? '✓' : String(i + 1).padStart(2, '0')}
                </span>
              </button>
              <div className="course-step-body">
                <div className={`course-step-title ${on ? 'is-on' : ''}`}>
                  {formatCourseText(t(step.title, lang), lang)}
                </div>
                {step.code && (
                  <div className="course-step-code">
                    <CourseCode block={step.code} lang={lang} />
                  </div>
                )}
                {step.note && (
                  <p className="course-step-note">{formatCourseText(t(step.note, lang), lang)}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
