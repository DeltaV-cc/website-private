'use client';

import Link from 'next/link';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  HERMES_DESKTOP_URL,
  OPEN_HARNESS_META,
  OPEN_HARNESS_MODULES,
  OPEN_HARNESS_PARTS,
  UI_COPY,
  type CourseLang,
  type CourseModule,
  type CoursePartId,
  t,
} from '@/app/data/courses/open-harness';
import { HarnessLandingVisuals } from '@/app/components/course/CourseVisuals';
import {
  HarnessCourseTabs,
  ResumeCourseLink,
  useCompletedSet,
} from '@/app/components/course/CourseLearning';
import { OnThisPage } from '@/app/components/course/OnThisPage';

/** EN-only until a full FR translate pass exists (toggle removed to avoid half-FR UI). */
const LangContext = createContext<{
  lang: CourseLang;
  setLang: (lang: CourseLang) => void;
}>({ lang: 'en', setLang: () => {} });

export function useOpenHarnessLang(): CourseLang {
  return useContext(LangContext).lang;
}

export function CourseLangProvider({
  children,
  defaultLang = 'en',
}: {
  children: ReactNode;
  defaultLang?: CourseLang;
}) {
  const value = useMemo(
    () => ({ lang: defaultLang, setLang: () => {} }),
    [defaultLang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

const HARNESS_SLUGS = OPEN_HARNESS_MODULES.map((m) => m.slug);

function modulesForPart(partId: CoursePartId) {
  return OPEN_HARNESS_MODULES.filter((m) => m.part === partId);
}

export function CourseToc({
  activeSlug,
  lang,
  compact = false,
  basePath = '/forge/course/open-harness/',
}: {
  activeSlug?: string;
  lang: CourseLang;
  compact?: boolean;
  /** Route prefix — lets the OH2 edition reuse this nav on its own routes. */
  basePath?: string;
}) {
  const done = useCompletedSet('open-harness');
  const pct = Math.round((done.size / OPEN_HARNESS_MODULES.length) * 100);
  return (
    <nav
      aria-label={t(UI_COPY.modules, lang)}
      className={
        compact
          ? 'course-nav'
          : 'course-nav course-toc--scroll sticky top-24 max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-y-contain'
      }
    >
      {/* Progress lives here, as one quiet line — it used to be a labelled
          block under the breadcrumb competing with the lesson title. */}
      <div className="course-nav-progress">
        <div className="course-progress-track">
          <div
            className="course-progress-fill"
            style={{ width: `${pct}%`, background: 'var(--course-accent)' }}
          />
        </div>
        <span className="course-nav-progress-label">
          {done.size} / {OPEN_HARNESS_MODULES.length}
        </span>
      </div>

      {OPEN_HARNESS_PARTS.map((part) => (
        <div key={part.id} className="course-nav-group">
          <div className="course-nav-group-label">{t(part.title, lang)}</div>
          <ol>
            {modulesForPart(part.id).map((mod) => {
              const active = activeSlug === mod.slug;
              return (
                <li key={mod.slug}>
                  <Link
                    href={`${basePath}${mod.slug}/`}
                    aria-current={active ? 'page' : undefined}
                    className={`course-nav-item ${active ? 'is-active' : ''} ${
                      done.has(mod.slug) ? 'is-done' : ''
                    }`}
                  >
                    <span className="course-nav-num" aria-hidden>
                      {mod.number}
                    </span>
                    <span>{t(mod.title, lang)}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}

      <div className="course-nav-group">
        <div className="course-nav-group-label">Reference</div>
        <ol>
          <li>
            <Link href="/forge/course/open-harness/glossary/" className="course-nav-item">
              <span className="course-nav-num" aria-hidden>
                ·
              </span>
              <span>{t(UI_COPY.glossary, lang)}</span>
            </Link>
          </li>
          <li>
            <Link href="/forge/course/open-harness/labs/" className="course-nav-item">
              <span className="course-nav-num" aria-hidden>
                ·
              </span>
              <span>Harness Labs</span>
            </Link>
          </li>
        </ol>
      </div>
    </nav>
  );
}

export function ModuleNav({
  module,
  lang,
  basePath = '/forge/course/open-harness/',
}: {
  module: CourseModule;
  lang: CourseLang;
  /** Route prefix — lets the OH2 edition reuse prev/next on its own routes. */
  basePath?: string;
}) {
  const idx = OPEN_HARNESS_MODULES.findIndex((m) => m.slug === module.slug);
  const prev = idx > 0 ? OPEN_HARNESS_MODULES[idx - 1] : null;
  const next = idx < OPEN_HARNESS_MODULES.length - 1 ? OPEN_HARNESS_MODULES[idx + 1] : null;
  const crossingToPart2 = module.slug === '06' && next?.slug === '07';
  const crossingFromPart1 = module.slug === '07' && prev?.slug === '06';

  return (
    <div className="mt-14 space-y-4 border-t border-[var(--border-default)] pt-8">
      {crossingToPart2 && (
        <p className="course-t-small text-[var(--text-secondary)] leading-relaxed course-measure">
          <span className="font-mono course-t-meta text-[var(--accent-cyan)] tracking-[1px] uppercase">
            End of Part I
          </span>
          <br />
          Part II starts next: memory, vault, skills, security, and cron — the compounding harness.
        </p>
      )}
      {crossingFromPart1 && (
        <p className="course-t-small text-[var(--text-secondary)] leading-relaxed course-measure">
          <span className="font-mono course-t-meta text-[var(--accent-cyan)] tracking-[1px] uppercase">
            Part II begins
          </span>
          <br />
          You already have an agent. Now give it durable memory and ownership habits.
        </p>
      )}
      {/* Real targets, not 14px text links at 72% opacity. "Next" carries the
          accent so forward motion is the visually dominant action. */}
      <div className="course-nav-cards">
        {prev ? (
          <Link href={`${basePath}${prev.slug}/`} className="course-nav-card">
            <span className="course-nav-card-dir">← {t(UI_COPY.prev, lang)}</span>
            <span className="course-nav-card-title">{t(prev.title, lang)}</span>
          </Link>
        ) : (
          <Link href={basePath} className="course-nav-card">
            <span className="course-nav-card-dir">←</span>
            <span className="course-nav-card-title">{t(UI_COPY.backCourse, lang)}</span>
          </Link>
        )}
        {next ? (
          <Link
            href={`${basePath}${next.slug}/`}
            className="course-nav-card course-nav-card--next"
          >
            <span className="course-nav-card-dir">{t(UI_COPY.next, lang)} →</span>
            <span className="course-nav-card-title">{t(next.title, lang)}</span>
          </Link>
        ) : (
          <Link href="/contact/?topic=open-harness" className="course-nav-card course-nav-card--next">
            <span className="course-nav-card-dir">Next →</span>
            <span className="course-nav-card-title">Contact Delta V</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function CoursePageChrome({
  children,
  activeSlug,
}: {
  children: ReactNode;
  activeSlug?: string;
}) {
  return (
    <CourseLangProvider>
      <CoursePageChromeInner activeSlug={activeSlug}>{children}</CoursePageChromeInner>
    </CourseLangProvider>
  );
}

function CoursePageChromeInner({
  children,
  activeSlug,
}: {
  children: ReactNode;
  activeSlug?: string;
}) {
  const lang = useOpenHarnessLang();
  const activeMod = activeSlug ? OPEN_HARNESS_MODULES.find((m) => m.slug === activeSlug) : null;
  const activePart = activeMod
    ? OPEN_HARNESS_PARTS.find((p) => p.id === activeMod.part)
    : null;

  return (
    <div className="course-surface min-h-screen">
      <div className="page-container pt-8 md:pt-10 pb-24">
        {/* One quiet line of chrome. The privacy chip and the segmented tabs
            used to sit here in two different shapes and two different sizes,
            pulling the eye away from the lesson title; both now live in the
            left rail, where navigation belongs. */}
        <nav className="course-crumbs" aria-label="Breadcrumb">
          <Link href="/forge/">{t(UI_COPY.backForge, lang)}</Link>
          <span aria-hidden>/</span>
          {activeSlug ? (
            <>
              <Link href="/forge/course/open-harness/">{t(UI_COPY.backCourse, lang)}</Link>
              <span aria-hidden>/</span>
              <span className="course-crumbs-here">
                {activePart ? `${t(UI_COPY.part, lang)} ${activePart.code} · ` : ''}
                {activeSlug}
              </span>
            </>
          ) : (
            <span className="course-crumbs-here">{t(UI_COPY.backCourse, lang)}</span>
          )}
        </nav>

        <div className="course-layout">
          <aside className="course-layout-nav">
            <CourseToc activeSlug={activeSlug} lang={lang} />
          </aside>
          <div className="course-reading">{children}</div>
          <aside className="course-layout-rail">
            <OnThisPage />
          </aside>
        </div>

        <div className="course-mobile-toc-wrap lg:hidden">
          <details className="course-disclose">
            <summary className="course-disclose-summary">
              <span className="course-advanced-chevron" aria-hidden>
                ▸
              </span>
              <span>All lessons</span>
            </summary>
            <div className="course-disclose-body max-h-[50vh] overflow-y-auto overscroll-y-contain">
              <CourseToc activeSlug={activeSlug} lang={lang} compact />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export function CourseLandingBody() {
  const lang = useOpenHarnessLang();
  return (
    <>
      <header className="course-hero">
        {/* One row, one shape. A course-r-sm pill next to a square segmented
            control read as two unrelated controls fighting for attention. */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative">
          <div className="course-meta">{t(UI_COPY.courseLabel, lang)}</div>
          <HarnessCourseTabs active="mastery" />
        </div>
        <h1 className="course-h1 mt-4 relative">{t(OPEN_HARNESS_META.title, lang)}</h1>
        <p className="course-deck mt-4 course-measure relative">
          {t(OPEN_HARNESS_META.tagline, lang)}
        </p>
        <p className="course-p mt-5 course-measure relative">
          {t(OPEN_HARNESS_META.description, lang)}
        </p>
        <div className="course-callout mt-7 relative course-measure">
          <div className="course-lex-term">What you need</div>
          <p className="mt-2 course-t-small text-[var(--text-secondary)] leading-relaxed">
            Prefer a{' '}
            <strong className="text-[var(--text-primary)] font-medium">dedicated machine</strong>{' '}
            (spare PC or VPS) — not the laptop you bank and work on every day. Internet for install +
            models, about one hour for the first lessons. You install{' '}
            <strong className="text-[var(--text-primary)] font-medium">Hermes Desktop</strong> and may
            connect free models through{' '}
            <a
              href="https://openrouter.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--course-accent)] hover:underline"
            >
              OpenRouter
            </a>{' '}
            and/or{' '}
            <a
              href="https://opencode.ai/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--course-accent)] hover:underline"
            >
              OpenCode
            </a>
            . Cloud models send conversation content to model hosts. If you only have a personal
            machine, isolate tools with Docker or use a VPS (lesson 02). No coding degree required.
          </p>
        </div>
        {/* Progress lives in the left rail now. Repeating it here as a labelled
            block, plus a privacy paragraph, buried the two buttons below it. */}
        <div className="mt-7 flex flex-wrap gap-3 relative">
          <ResumeCourseLink
            courseId="open-harness"
            orderedSlugs={HARNESS_SLUGS}
            basePath="/forge/course/open-harness/"
            className="button-primary"
            startLabel={t(UI_COPY.start, lang)}
            continueLabel="Continue where I left off"
          />
          <a
            href={HERMES_DESKTOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            {t(UI_COPY.downloadDesktop, lang)} <span aria-hidden>↗</span>
          </a>
        </div>
        <p className="mt-4 course-t-small text-[var(--text-secondary)] relative course-measure leading-relaxed">
          <strong className="text-[var(--text-primary)] font-medium">New here?</strong> Press
          “Start from the beginning” — lesson 00, then the word cards, then install. Skip nothing
          until chat works.
        </p>
        <p className="mt-2 course-t-meta text-[var(--text-tertiary)] relative course-measure">
          Already comfortable with install? Jump to{' '}
          <Link href="/forge/course/open-harness/03/" className="underline hover:text-[var(--text-secondary)]">
            lesson 03
          </Link>
          . Part II and Labs wait until after Part I.
        </p>
      </header>

      {/* At-a-glance concept visuals */}
      <section className="mt-14" aria-labelledby="oh-glance">
        <h2 id="oh-glance" className="course-h2">
          At a glance
        </h2>
        <p className="mt-2 course-measure course-t-small text-[var(--text-secondary)]">
          Two parts, one mental model. Scroll for the full syllabus.
        </p>
        <HarnessLandingVisuals />
      </section>

      {/* Two main parts — primary orientation */}
      <section className="mt-16" aria-labelledby="parts-heading">
        <h2 id="parts-heading" className="course-h2">
          The course has two parts
        </h2>
        <p className="mt-3 course-measure course-t-small text-[var(--text-secondary)] leading-relaxed">
          Do Part I first. Part II only makes sense once the app chats, has a personality file, and
          can reach you on a messaging surface you trust.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
          {OPEN_HARNESS_PARTS.map((part) => {
            const mods = modulesForPart(part.id);
            const mins = mods.reduce((s, m) => s + m.minutes, 0);
            return (
              <div key={part.id} className="bg-[var(--bg-deep)] p-6 md:p-8 flex flex-col">
                <div className="font-mono course-t-meta tracking-[2px] uppercase text-[var(--course-accent)]">
                  {t(UI_COPY.part, lang)} {part.code}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t(part.title, lang)}</h3>
                <p className="mt-2 course-t-small text-[var(--text-secondary)] leading-relaxed">
                  {t(part.subtitle, lang)}
                </p>
                <p className="mt-4 course-t-small text-[var(--text-tertiary)] leading-relaxed flex-1">
                  {t(part.promise, lang)}
                </p>
                <ol className="mt-6 space-y-2 border-t border-[var(--border-default)] pt-5">
                  {mods.map((mod) => (
                    <li key={mod.slug}>
                      <Link
                        href={`/forge/course/open-harness/${mod.slug}/`}
                        className="group flex gap-3 course-t-small text-[var(--text-secondary)] hover:text-[var(--course-accent)]"
                      >
                        <span className="font-mono course-t-meta text-[var(--course-accent)] w-6 shrink-0">
                          {mod.number}
                        </span>
                        <span className="leading-snug group-hover:underline">{t(mod.title, lang)}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono course-t-meta text-[var(--text-muted)]">
                    ~{mins} {t(UI_COPY.minRead, lang)} · {mods.length} modules
                  </span>
                  <Link
                    href={`/forge/course/open-harness/${part.startSlug}/`}
                    className="course-t-small font-medium text-[var(--course-accent)]"
                  >
                    {part.id === 1 ? t(UI_COPY.start, lang) : t(UI_COPY.startPart2, lang)} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="outcomes-heading">
        <h2 id="outcomes-heading" className="course-h2">
          {t(UI_COPY.outcomes, lang)}
        </h2>
        <p className="mt-3 course-measure course-t-small text-[var(--text-secondary)] leading-relaxed">
          Real capabilities on a host you control — not jargon. After each part you should feel the
          difference, with clear eyes about isolation and cloud data.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="course-r-md border border-[var(--border-default)] bg-[var(--surface-card)] p-5">
            <div className="font-mono course-t-meta tracking-[2px] uppercase text-[var(--course-accent)]">
              After Part I
            </div>
            <ul className="mt-3 space-y-3 course-t-small text-[var(--text-secondary)] leading-relaxed">
              <li>
                <span className="font-medium text-[var(--text-primary)]">Your own AI app on a host you chose</span>
                <span className="block text-[var(--text-tertiary)]">
                  Dedicated machine preferred — free cloud models to start, with content leaving the box.
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">An assistant that behaves as you defined</span>
                <span className="block text-[var(--text-tertiary)]">
                  Tone, role, and hard limits you can open and change anytime.
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">Work that leaves a real file</span>
                <span className="block text-[var(--text-tertiary)]">
                  Not only chat text — a document you can open offline and keep.
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">Help from your phone, privately</span>
                <span className="block text-[var(--text-tertiary)]">
                  Message it from an app you already use; only you can talk to it.
                </span>
              </li>
            </ul>
          </div>
          <div className="course-r-md border border-[var(--border-default)] bg-[var(--surface-card)] p-5">
            <div className="font-mono course-t-meta tracking-[2px] uppercase text-[var(--accent-cyan)]">
              After Part II
            </div>
            <ul className="mt-3 space-y-3 course-t-small text-[var(--text-secondary)] leading-relaxed">
              <li>
                <span className="font-medium text-[var(--text-primary)]">It remembers what matters to you</span>
                <span className="block text-[var(--text-tertiary)]">
                  Preferences and project facts still there next week — not a blank chat.
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">Your notes stay searchable</span>
                <span className="block text-[var(--text-tertiary)]">
                  A personal knowledge folder the assistant can use, still yours offline.
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">You decide how far it may go</span>
                <span className="block text-[var(--text-tertiary)]">
                  Clear yes/no rules before risky actions — no “trust me” black box.
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">Routine work can run without you staring</span>
                <span className="block text-[var(--text-tertiary)]">
                  One scheduled job you wrote as a checklist (brief, backup reminder, …).
                </span>
              </li>
              <li>
                <span className="font-medium text-[var(--text-primary)]">You know how to take it with you</span>
                <span className="block text-[var(--text-tertiary)]">
                  Which folders to copy so nothing important lives only in a cloud tab.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
