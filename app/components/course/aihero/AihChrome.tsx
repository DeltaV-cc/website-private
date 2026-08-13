'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  CourseLangProvider,
  CourseToc,
  useOpenHarnessLang,
} from '@/app/components/course/CourseShell';
import { OnThisPage } from '@/app/components/course/OnThisPage';
import { OPEN_HARNESS_MODULES, OPEN_HARNESS_PARTS, UI_COPY, t } from '@/app/data/courses/open-harness';

export const OH2_BASE = '/forge/course/open-harness/';

/**
 * Own Your AI chrome — the aihero.dev shell: flat opaque surface,
 * 273/699/232 columns, quiet breadcrumb, shared left nav and right rail.
 * Reuses CourseToc/OnThisPage; only the surface class and basePath differ.
 */
export function AihChrome({ children, activeSlug }: { children: ReactNode; activeSlug?: string }) {
  return (
    <CourseLangProvider>
      <AihChromeInner activeSlug={activeSlug}>{children}</AihChromeInner>
    </CourseLangProvider>
  );
}

function AihChromeInner({ children, activeSlug }: { children: ReactNode; activeSlug?: string }) {
  const lang = useOpenHarnessLang();
  const activeMod = activeSlug ? OPEN_HARNESS_MODULES.find((m) => m.slug === activeSlug) : null;
  const activePart = activeMod ? OPEN_HARNESS_PARTS.find((p) => p.id === activeMod.part) : null;

  return (
    <div className="aih-surface min-h-screen">
      <div className="page-container pt-8 md:pt-10 pb-24">
        <nav className="course-crumbs" aria-label="Breadcrumb">
          <Link href="/forge/">{t(UI_COPY.backForge, lang)}</Link>
          <span aria-hidden>/</span>
          {activeSlug ? (
            <>
              <Link href={OH2_BASE}>Own Your AI</Link>
              <span aria-hidden>/</span>
              <span className="course-crumbs-here">
                {activePart ? `${t(UI_COPY.part, lang)} ${activePart.code} · ` : ''}
                {activeSlug}
              </span>
            </>
          ) : (
            <span className="course-crumbs-here">Own Your AI</span>
          )}
        </nav>

        <div className="course-layout">
          <aside className="course-layout-nav">
            <CourseToc activeSlug={activeSlug} lang={lang} basePath={OH2_BASE} />
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
              <CourseToc activeSlug={activeSlug} lang={lang} compact basePath={OH2_BASE} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
