import type { Metadata } from 'next';
import Link from 'next/link';
import { AihChrome } from '@/app/components/course/aihero/AihChrome';
import {
  OPEN_HARNESS_GLOSSARY,
  type GlossaryTerm,
} from '@/app/data/courses/open-harness';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mon premier agent IA — glossaire | Delta V',
  description: 'Tous les termes de la leçon 01, sur une page. Stack, boucle, ops, Partie II.',
  alternates: {
    canonical: `${SITE_URL}/fr/forge/course/my-first-ai-agent/glossary/`,
    languages: {
      en: `${SITE_URL}/forge/course/my-first-ai-agent/glossary/`,
      fr: `${SITE_URL}/fr/forge/course/my-first-ai-agent/glossary/`,
    },
  },
  openGraph: {
    title: 'Mon premier agent IA — glossaire',
    description: 'Tous les termes de la leçon 01, sur une page.',
    url: `${SITE_URL}/fr/forge/course/my-first-ai-agent/glossary/`,
    siteName: 'Delta V',
    type: 'website',
  },
};

const GROUPS: { id: GlossaryTerm['group']; title: string }[] = [
  { id: 'stack', title: 'Stack' },
  { id: 'loop', title: 'Boucle et messages' },
  { id: 'ops', title: 'Ops' },
  { id: 'part2', title: 'Partie II' },
];

export default function OpenHarnessGlossaryPageFr() {
  return (
    <AihChrome>
      <div className="course-measure">
        <p className="eyebrow course-eyebrow mt-2 text-[var(--course-accent)]">
          Référence · à imprimer
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-2px] leading-[1.05]">Glossaire</h1>
        <p className="mt-4 course-t-h3 text-[var(--text-secondary)] leading-relaxed">
          Le langage canonique de Mon premier agent IA. Des définitions serrées pour réviser — pas un
          substitut aux leçons. Préférez ces termes dans chaque module.
        </p>

        {GROUPS.map((g) => {
          const terms = OPEN_HARNESS_GLOSSARY.filter((term) => term.group === g.id);
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
                      {term.term.fr}
                    </h3>
                    <p className="mt-2 course-t-small text-[var(--text-secondary)] leading-relaxed">
                      {formatCourseText(term.def.fr, 'fr')}
                    </p>
                    {term.avoid && (
                      <p className="mt-2 font-mono course-t-meta text-[var(--text-muted)]">
                        À éviter : {term.avoid.fr}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <p className="mt-12 course-t-small text-[var(--text-muted)]">
          <Link
            href="/fr/forge/course/my-first-ai-agent/"
            className="text-[var(--course-accent)] hover:underline"
          >
            ← Retour à Mon premier agent IA
          </Link>
          {' · '}
          <Link
            href="/fr/forge/course/my-first-ai-agent/01/"
            className="text-[var(--course-accent)] hover:underline"
          >
            Leçon Lexique
          </Link>
        </p>
      </div>
    </AihChrome>
  );
}
