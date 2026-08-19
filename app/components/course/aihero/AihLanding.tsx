'use client';

import Link from 'next/link';
import { useOpenHarnessLang } from '@/app/components/course/CourseShell';
import { ResumeCourseLink } from '@/app/components/course/CourseLearning';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import {
  OPEN_HARNESS_MODULES,
  OPEN_HARNESS_PARTS,
  t,
} from '@/app/data/courses/open-harness';
import { HARNESS_LABS } from '@/app/data/courses/harness-labs';
import { OH2_META } from '@/app/data/courses/open-harness-2';
import { OH2_BASE } from './AihChrome';

const SLUGS = OPEN_HARNESS_MODULES.map((m) => m.slug);

/**
 * Landing = a sober header and a numbered table of contents with durations,
 * split by part — the reference's course index, not a marketing page.
 */
export function AihLanding() {
  const lang = useOpenHarnessLang();

  return (
    <article className="course-prose">
      <div className="course-meta">
        <span className="course-meta-num">{OPEN_HARNESS_MODULES.length} lessons</span>
        {/* "free" used to be a word at the end of this line and read as fine
            print. It is the strongest thing we have to say about the course. */}
        <span className="rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[1px] text-[var(--accent-green)]">
          {lang === 'fr' ? '100 % gratuit' : '100% free'}
        </span>
      </div>
      <h1 className="course-h1 mt-4">{t(OH2_META.title, lang)}</h1>
      <p className="course-deck mt-4 course-measure">{t(OH2_META.tagline, lang)}</p>
      <p className="course-p mt-5 course-measure">{formatCourseText(t(OH2_META.description, lang))}</p>

      <div className="mt-7">
        <ResumeCourseLink
          courseId="open-harness"
          orderedSlugs={SLUGS}
          basePath={OH2_BASE}
          className="button-primary"
          startLabel="Start lesson 00"
          continueLabel="Continue"
        />
      </div>

      {OPEN_HARNESS_PARTS.map((part) => (
        <section key={part.id} className="mt-12">
          <h2 className="course-h2">
            Part {part.code} — {t(part.title, lang)}
          </h2>
          <p className="course-p mt-2 course-measure text-[var(--text-tertiary)]">
            {t(part.subtitle, lang)}
          </p>
          <ol className="mt-5">
            {part.slugs.map((slug) => {
              const mod = OPEN_HARNESS_MODULES.find((m) => m.slug === slug);
              if (!mod) return null;
              return (
                <li key={slug}>
                  <Link href={`${OH2_BASE}${slug}/`} className="aih-toc-row">
                    <span className="aih-toc-num">{mod.number}</span>
                    <span className="aih-toc-title">
                      {t(mod.title, lang)}
                      <span className="aih-toc-sub">{t(mod.subtitle, lang)}</span>
                    </span>
                    <span className="aih-toc-min">{mod.minutes} min</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {/* Optional drills, after the course. Unnumbered on purpose: nothing here
          is required to finish, and the labs assume Part I is already done. */}
      <section className="mt-12">
        <h2 className="course-h2">Go further</h2>
        <p className="course-p mt-2 course-measure text-[var(--text-tertiary)]">
          Optional drills once the course is done — deeper practice, not new theory.
        </p>
        <ol className="mt-5">
          <li>
            <Link href="/forge/course/my-first-ai-agent/labs/" className="aih-toc-row">
              <span className="aih-toc-num">＋</span>
              <span className="aih-toc-title">
                Harness Labs
                <span className="aih-toc-sub">
                  {HARNESS_LABS.length} drills: key rotation, failure studio, prompt budget,
                  Kanban.
                </span>
              </span>
              <span className="aih-toc-min">
                {HARNESS_LABS.reduce((a, l) => a + l.minutes, 0)} min
              </span>
            </Link>
          </li>
          <li>
            <Link href="/forge/course/my-first-ai-agent/glossary/" className="aih-toc-row">
              <span className="aih-toc-num">＋</span>
              <span className="aih-toc-title">
                Printable glossary
                <span className="aih-toc-sub">Every term from lesson 01, on one page.</span>
              </span>
            </Link>
          </li>
        </ol>
      </section>
    </article>
  );
}
