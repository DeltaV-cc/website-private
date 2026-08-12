'use client';

import { useOpenHarnessLang } from '@/app/components/course/CourseShell';
import { LessonSection } from '@/app/components/course/lesson/LessonSection';
import { QUICK_WINS, t } from '@/app/data/courses/open-harness-2';

/** Bonus page: three verified quick wins, rendered by the shared block engine. */
export function QuickWinsBody() {
  const lang = useOpenHarnessLang();

  return (
    <article className="course-prose">
      <div className="course-meta">
        <span className="course-meta-num">Bonus</span>
        <span aria-hidden>·</span>
        <span>{QUICK_WINS.minutes} min · commands verified against their sources</span>
      </div>
      <h1 className="course-h1 mt-4">{t(QUICK_WINS.title, lang)}</h1>
      <p className="course-deck mt-4 course-measure">
        Small, real things to run once your agent chats. Each one is copy-paste ready.
      </p>

      <div className="mt-14 space-y-14">
        {QUICK_WINS.sections.map((section, i) => (
          <LessonSection key={i} section={section} lang={lang} moduleSlug="quick-wins" />
        ))}
      </div>
    </article>
  );
}
