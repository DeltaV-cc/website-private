import type { Metadata } from 'next';
import Link from 'next/link';
import { CoursePageChrome } from '@/app/components/course/CourseShell';
import { HarnessCourseTabs } from '@/app/components/course/CourseLearning';
import {
  OPEN_HARNESS_GLOSSARY,
  OPEN_HARNESS_META,
  type GlossaryTerm,
} from '@/app/data/courses/open-harness';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Open Harness glossary | Delta V',
  description: 'Compressed terms for the Open Harness course — stack, loop, ops, Part II.',
  openGraph: {
    title: 'Open Harness glossary',
    description: OPEN_HARNESS_META.tagline.en,
    url: `${SITE_URL}/forge/course/open-harness/glossary/`,
    siteName: 'Delta V',
    type: 'website',
  },
};

const GROUPS: { id: GlossaryTerm['group']; title: string }[] = [
  { id: 'stack', title: 'Stack' },
  { id: 'loop', title: 'Loop & messages' },
  { id: 'ops', title: 'Ops' },
  { id: 'part2', title: 'Part II' },
];

export default function OpenHarnessGlossaryPage() {
  return (
    <CoursePageChrome>
      <div className="course-measure">
        <HarnessCourseTabs active="glossary" />
        <p className="eyebrow course-eyebrow mt-8 text-[var(--course-accent)]">Reference · print-friendly</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-2px] leading-[1.05]">Glossary</h1>
        <p className="mt-4 course-t-h3 text-[var(--text-secondary)] leading-relaxed">
          Canonical language for Open Harness. Tight definitions for review — not a substitute for
          the lessons. Prefer these terms in every module.
        </p>

        {GROUPS.map((g) => {
          const terms = OPEN_HARNESS_GLOSSARY.filter((t) => t.group === g.id);
          if (!terms.length) return null;
          return (
            <section key={g.id} className="mt-12">
              <h2 className="course-t-h3 font-semibold tracking-tight">{g.title}</h2>
              <div className="mt-4 space-y-6">
                {terms.map((term) => (
                  <article
                    key={term.id}
                    id={term.id}
                    className="border-b border-[var(--border-default)] pb-5"
                  >
                    <h3 className="font-mono course-t-meta tracking-[1.5px] uppercase text-[var(--course-accent)] font-semibold">
                      {term.term.en}
                    </h3>
                    <p className="mt-2 course-t-small text-[var(--text-secondary)] leading-relaxed">
                      {formatCourseText(term.def.en)}
                    </p>
                    {term.avoid && (
                      <p className="mt-2 font-mono course-t-meta text-[var(--text-muted)]">
                        Avoid: {term.avoid.en}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <p className="mt-12 course-t-small text-[var(--text-muted)]">
          <Link href="/forge/course/open-harness/" className="text-[var(--course-accent)] hover:underline">
            ← Back to Open Harness
          </Link>
          {' · '}
          <Link href="/forge/course/open-harness/01/" className="text-[var(--course-accent)] hover:underline">
            Lexicon lesson
          </Link>
        </p>
      </div>
    </CoursePageChrome>
  );
}
