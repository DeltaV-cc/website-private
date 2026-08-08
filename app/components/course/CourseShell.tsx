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
  CoursePrivacyNote,
  CourseProgressBar,
  HarnessCourseTabs,
  ResumeCourseLink,
  useCompletedSet,
} from '@/app/components/course/CourseLearning';

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
}: {
  activeSlug?: string;
  lang: CourseLang;
  compact?: boolean;
}) {
  const done = useCompletedSet('open-harness');
  return (
    <nav
      aria-label={t(UI_COPY.modules, lang)}
      className={
        compact
          ? ''
          : 'course-toc course-toc--scroll sticky top-24 max-h-[calc(100vh-6.5rem)] overflow-y-auto overscroll-y-contain'
      }
    >
      <div className="eyebrow text-[var(--accent-orange)] mb-4">{t(UI_COPY.syllabus, lang)}</div>
      <div className="space-y-5">
        {OPEN_HARNESS_PARTS.map((part) => (
          <div key={part.id}>
            <div className="mb-2 px-1">
              <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
                {t(UI_COPY.part, lang)} {part.code}
              </div>
              <div className="text-xs font-semibold text-[var(--text-primary)] leading-snug mt-0.5">
                {t(part.title, lang)}
              </div>
            </div>
            <ol className="space-y-0.5">
              {modulesForPart(part.id).map((mod) => {
                const href = `/forge/course/open-harness/${mod.slug}/`;
                const active = activeSlug === mod.slug;
                const complete = done.has(mod.slug);
                return (
                  <li key={mod.slug}>
                    <Link
                      href={href}
                      className={`group flex gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] ring-1 ring-[var(--accent-orange)]/30'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--accent-orange)] w-5 shrink-0 pt-0.5">
                        {complete ? '✓' : mod.number}
                      </span>
                      <span className="leading-snug">{t(mod.title, lang)}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--border-default)] space-y-2">
        <Link
          href="/forge/course/open-harness/glossary/"
          className="block text-xs text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
        >
          {t(UI_COPY.glossary, lang)} →
        </Link>
        <Link
          href="/forge/course/open-harness/labs/"
          className="block text-xs text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
        >
          Harness Labs →
        </Link>
      </div>
    </nav>
  );
}

export function ModuleNav({
  module,
  lang,
}: {
  module: CourseModule;
  lang: CourseLang;
}) {
  const idx = OPEN_HARNESS_MODULES.findIndex((m) => m.slug === module.slug);
  const prev = idx > 0 ? OPEN_HARNESS_MODULES[idx - 1] : null;
  const next = idx < OPEN_HARNESS_MODULES.length - 1 ? OPEN_HARNESS_MODULES[idx + 1] : null;
  const crossingToPart2 = module.slug === '06' && next?.slug === '07';
  const crossingFromPart1 = module.slug === '07' && prev?.slug === '06';

  return (
    <div className="mt-14 space-y-4 border-t border-[var(--border-default)] pt-8">
      {crossingToPart2 && (
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          <span className="font-mono text-xs text-[var(--accent-cyan)] tracking-[1px] uppercase">
            End of Part I
          </span>
          <br />
          Part II starts next: memory, vault, skills, security, and cron — the compounding harness.
        </p>
      )}
      {crossingFromPart1 && (
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          <span className="font-mono text-xs text-[var(--accent-cyan)] tracking-[1px] uppercase">
            Part II begins
          </span>
          <br />
          You already have an agent. Now give it durable memory and ownership habits.
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/forge/course/open-harness/${prev.slug}/`}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-orange)]"
          >
            ← {t(UI_COPY.prev, lang)}: {t(prev.title, lang)}
          </Link>
        ) : (
          <Link
            href="/forge/course/open-harness/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-orange)]"
          >
            ← {t(UI_COPY.backCourse, lang)}
          </Link>
        )}
        {next ? (
          <Link
            href={`/forge/course/open-harness/${next.slug}/`}
            className="text-sm font-medium text-[var(--accent-orange)]"
          >
            {t(UI_COPY.next, lang)}: {t(next.title, lang)} →
          </Link>
        ) : (
          <Link href="/contact/?topic=open-harness" className="text-sm font-medium text-[var(--accent-orange)]">
            Contact →
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
    <div className="min-h-screen">
      <div className="course-rail" aria-hidden />
      <div className="page-container pt-10 md:pt-14 pb-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-3 text-sm" aria-label="Breadcrumb">
            <Link href="/forge/" className="text-[var(--text-muted)] hover:text-[var(--accent-orange)]">
              {t(UI_COPY.backForge, lang)}
            </Link>
            <span className="text-[var(--text-disabled)]" aria-hidden>
              /
            </span>
            <Link
              href="/forge/course/open-harness/"
              className="text-[var(--text-muted)] hover:text-[var(--accent-orange)]"
            >
              {t(UI_COPY.backCourse, lang)}
            </Link>
            {activePart && (
              <>
                <span className="text-[var(--text-disabled)]" aria-hidden>
                  /
                </span>
                <span className="font-mono text-xs text-[var(--accent-cyan)] tracking-[1px] uppercase">
                  {t(UI_COPY.part, lang)} {activePart.code}
                </span>
              </>
            )}
            {activeSlug && (
              <>
                <span className="text-[var(--text-disabled)]" aria-hidden>
                  /
                </span>
                <span className="font-mono text-[var(--accent-orange)]">{activeSlug}</span>
              </>
            )}
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <span className="course-privacy-chip" title="Progress stays in this browser">
              Local only
            </span>
            <HarnessCourseTabs active="mastery" />
          </div>
        </div>
        {activeSlug && (
          <div className="mb-8 max-w-2xl">
            <CourseProgressBar courseId="open-harness" orderedSlugs={HARNESS_SLUGS} accent="orange" />
          </div>
        )}
        <div className="grid lg:grid-cols-[15.5rem_minmax(0,1fr)] gap-10 lg:gap-12">
          <aside className="hidden lg:block">
            <CourseToc activeSlug={activeSlug} lang={lang} />
          </aside>
          <div className="min-w-0 course-reading lg:max-w-none">{children}</div>
        </div>
        <div className="course-mobile-toc-wrap lg:hidden">
          <details className="course-toc">
            <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--accent-orange)] list-none flex justify-between items-center">
              Syllabus
              <span className="text-[var(--text-muted)]">tap</span>
            </summary>
            <div className="mt-4 max-h-[50vh] overflow-y-auto overscroll-y-contain">
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
        <div className="flex flex-wrap items-center justify-between gap-3 relative">
          <div className="eyebrow text-[var(--accent-orange)]">{t(UI_COPY.courseLabel, lang)}</div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="course-privacy-chip">Local only</span>
            <HarnessCourseTabs active="mastery" />
          </div>
        </div>
        <h1 className="section-title mt-3 relative max-w-3xl">{t(OPEN_HARNESS_META.title, lang)}</h1>
        <p className="mt-6 max-w-2xl text-xl text-[var(--text-secondary)] leading-relaxed relative">
          {t(OPEN_HARNESS_META.tagline, lang)}
        </p>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed relative">
          {t(OPEN_HARNESS_META.description, lang)}
        </p>
        <div className="mt-5 relative rounded-xl border border-[var(--accent-orange)]/30 bg-[var(--bg-surface)] px-4 py-3 max-w-2xl">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
            What you need
          </div>
          <p className="mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">
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
              className="text-[var(--accent-orange)] hover:underline"
            >
              OpenRouter
            </a>{' '}
            and/or{' '}
            <a
              href="https://opencode.ai/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-orange)] hover:underline"
            >
              OpenCode
            </a>
            . Cloud models send conversation content to model hosts. If you only have a personal
            machine, isolate tools with Docker or use a VPS (lesson 02). No coding degree required.
          </p>
        </div>
        <div className="mt-6 relative max-w-2xl">
          <CourseProgressBar
            courseId="open-harness"
            orderedSlugs={HARNESS_SLUGS}
            accent="orange"
            showPrivacy
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3 relative">
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
        <p className="mt-4 text-sm text-[var(--text-secondary)] relative max-w-2xl leading-relaxed">
          <strong className="text-[var(--text-primary)] font-medium">New here?</strong> Press
          “Start from the beginning” — lesson 00, then the word cards, then install. Skip nothing
          until chat works.
        </p>
        <p className="mt-2 text-xs text-[var(--text-tertiary)] relative max-w-2xl">
          Already comfortable with install? Jump to{' '}
          <Link href="/forge/course/open-harness/03/" className="underline hover:text-[var(--text-secondary)]">
            lesson 03
          </Link>
          . Part II and Labs wait until after Part I.
        </p>
      </header>

      {/* At-a-glance concept visuals */}
      <section className="mt-14" aria-labelledby="oh-glance">
        <h2 id="oh-glance" className="text-2xl font-semibold tracking-tight">
          At a glance
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          Two parts, one mental model. Scroll for the full syllabus.
        </p>
        <HarnessLandingVisuals />
      </section>

      {/* Two main parts — primary orientation */}
      <section className="mt-16" aria-labelledby="parts-heading">
        <h2 id="parts-heading" className="text-2xl font-semibold tracking-tight">
          The course has two parts
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)] leading-relaxed">
          Do Part I first. Part II only makes sense once the app chats, has a personality file, and
          can reach you on a messaging surface you trust.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
          {OPEN_HARNESS_PARTS.map((part) => {
            const mods = modulesForPart(part.id);
            const mins = mods.reduce((s, m) => s + m.minutes, 0);
            return (
              <div key={part.id} className="bg-[var(--bg-deep)] p-6 md:p-8 flex flex-col">
                <div className="font-mono text-xs tracking-[2px] uppercase text-[var(--accent-orange)]">
                  {t(UI_COPY.part, lang)} {part.code}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t(part.title, lang)}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t(part.subtitle, lang)}
                </p>
                <p className="mt-4 text-sm text-[var(--text-tertiary)] leading-relaxed flex-1">
                  {t(part.promise, lang)}
                </p>
                <ol className="mt-6 space-y-2 border-t border-[var(--border-default)] pt-5">
                  {mods.map((mod) => (
                    <li key={mod.slug}>
                      <Link
                        href={`/forge/course/open-harness/${mod.slug}/`}
                        className="group flex gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-orange)]"
                      >
                        <span className="font-mono text-xs text-[var(--accent-orange)] w-6 shrink-0">
                          {mod.number}
                        </span>
                        <span className="leading-snug group-hover:underline">{t(mod.title, lang)}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    ~{mins} {t(UI_COPY.minRead, lang)} · {mods.length} modules
                  </span>
                  <Link
                    href={`/forge/course/open-harness/${part.startSlug}/`}
                    className="text-sm font-medium text-[var(--accent-orange)]"
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
        <h2 id="outcomes-heading" className="text-2xl font-semibold tracking-tight">
          {t(UI_COPY.outcomes, lang)}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)] leading-relaxed">
          Real capabilities on a host you control — not jargon. After each part you should feel the
          difference, with clear eyes about isolation and cloud data.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-5">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
              After Part I
            </div>
            <ul className="mt-3 space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
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
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-5">
            <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
              After Part II
            </div>
            <ul className="mt-3 space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
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
