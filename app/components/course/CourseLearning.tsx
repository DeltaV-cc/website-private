'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  clearCompleted,
  completionRatio,
  isComplete,
  readChecklist,
  readCompleted,
  readDesignPrereqOk,
  resumeSlug,
  setComplete,
  writeChecklist,
  writeDesignPrereqOk,
  type CourseProgressId,
} from '@/lib/course-progress';

/* ─── Privacy (local-only) ─────────────────────────────── */

export function CoursePrivacyNote({ className = '' }: { className?: string }) {
  return (
    <p
      className={`text-[11px] leading-relaxed text-[var(--text-tertiary)] max-w-xl ${className}`}
      role="note"
    >
      <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--text-muted)]">
        Privacy
      </span>
      <br />
      Progress and checklists stay in this browser only (localStorage). No account, no sync, no
      analytics from this feature. Clear site data or use the reset control to wipe.
    </p>
  );
}

/* ─── Progress bar ─────────────────────────────────────── */

export function CourseProgressBar({
  courseId,
  orderedSlugs,
  accent = 'orange',
  showPrivacy = false,
}: {
  courseId: CourseProgressId;
  orderedSlugs: string[];
  accent?: 'orange' | 'cyan';
  showPrivacy?: boolean;
}) {
  const [ratio, setRatio] = useState(0);
  useEffect(() => {
    setRatio(completionRatio(courseId, orderedSlugs));
    const onStorage = () => setRatio(completionRatio(courseId, orderedSlugs));
    window.addEventListener('dv-course-progress', onStorage);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('dv-course-progress', onStorage);
      window.removeEventListener('storage', onStorage);
    };
  }, [courseId, orderedSlugs]);

  const pct = Math.round(ratio * 100);
  const done = Math.round(ratio * orderedSlugs.length);
  const color = accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-orange)';

  return (
    <div className="course-progress mb-6">
      <div className="flex flex-wrap items-end justify-between gap-2 mb-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--text-muted)]">
            On this device
          </div>
          <div className="mt-0.5 text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-medium tabular-nums">
              {done}
            </span>
            <span className="text-[var(--text-muted)]"> / {orderedSlugs.length} proofs</span>
            <span className="text-[var(--text-muted)]"> · {pct}%</span>
          </div>
        </div>
        {done > 0 && (
          <button
            type="button"
            className="course-ghost-btn"
            onClick={() => {
              if (
                typeof window !== 'undefined' &&
                window.confirm('Reset progress for this course on this device only?')
              ) {
                clearCompleted(courseId);
                setRatio(0);
                window.dispatchEvent(new Event('dv-course-progress'));
              }
            }}
          >
            Reset
          </button>
        )}
      </div>
      <div
        className="course-progress-track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course completion on this device"
      >
        <div className="course-progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      {showPrivacy && <CoursePrivacyNote className="mt-3" />}
    </div>
  );
}

/* ─── Mark module complete ─────────────────────────────── */

export function MarkCompleteButton({
  courseId,
  slug,
  accent = 'orange',
}: {
  courseId: CourseProgressId;
  slug: string;
  accent?: 'orange' | 'cyan';
}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDone(isComplete(courseId, slug));
  }, [courseId, slug]);

  const toggle = () => {
    const next = setComplete(courseId, slug, !done);
    setDone(next.includes(slug));
    window.dispatchEvent(new Event('dv-course-progress'));
  };

  const color = accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-orange)';

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={done}
        className={`course-complete-btn ${done ? 'is-done' : ''}`}
        style={
          done
            ? { background: color, borderColor: color, color: 'var(--bg-deep)' }
            : undefined
        }
      >
        {done ? '✓ Proof marked complete' : 'Mark proof complete'}
      </button>
      <p className="mt-2 text-[11px] text-[var(--text-muted)]">
        Stored on this device only — not sent anywhere.
      </p>
    </div>
  );
}

/* ─── Resume / continue ────────────────────────────────── */

export function ResumeCourseLink({
  courseId,
  orderedSlugs,
  basePath,
  className = 'button-primary',
  startLabel = 'Start course',
  continueLabel = 'Continue',
}: {
  courseId: CourseProgressId;
  orderedSlugs: string[];
  basePath: string;
  className?: string;
  startLabel?: string;
  continueLabel?: string;
}) {
  const [href, setHref] = useState(`${basePath}${orderedSlugs[0] ?? ''}/`);
  const [label, setLabel] = useState(startLabel);

  useEffect(() => {
    const done = readCompleted(courseId);
    const resume = resumeSlug(courseId, orderedSlugs);
    if (!resume) {
      setHref(basePath);
      setLabel(startLabel);
      return;
    }
    if (done.length === 0) {
      setHref(`${basePath}${orderedSlugs[0]}/`);
      setLabel(startLabel);
    } else if (done.length >= orderedSlugs.length) {
      setHref(`${basePath}${orderedSlugs[orderedSlugs.length - 1]}/`);
      setLabel('Review last module');
    } else {
      setHref(`${basePath}${resume}/`);
      setLabel(`${continueLabel} ${resume}`);
    }
  }, [courseId, orderedSlugs, basePath, startLabel, continueLabel]);

  return (
    <Link href={href} className={className}>
      {label} <span aria-hidden>↗</span>
    </Link>
  );
}

/* ─── Interactive checklist ────────────────────────────── */

export function InteractiveChecklist({
  courseId,
  moduleSlug,
  sectionKey,
  items,
  accent = 'orange',
  mode = 'checklist',
}: {
  courseId: string;
  moduleSlug: string;
  sectionKey: string;
  items: string[];
  accent?: 'orange' | 'cyan' | 'green';
  /** checklist = default; steps = numbered; proof = end-of-module claim */
  mode?: 'checklist' | 'steps' | 'proof';
}) {
  const [flags, setFlags] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    const saved = readChecklist(courseId, moduleSlug, sectionKey);
    setFlags(items.map((_, i) => Boolean(saved[i])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, moduleSlug, sectionKey, items.length]);

  const toggle = useCallback(
    (index: number) => {
      setFlags((prev) => {
        const next = items.map((_, i) => (i === index ? !prev[i] : Boolean(prev[i])));
        writeChecklist(courseId, moduleSlug, sectionKey, next);
        window.dispatchEvent(new Event('dv-course-progress'));
        return next;
      });
    },
    [courseId, moduleSlug, sectionKey, items],
  );

  const mark =
    accent === 'cyan'
      ? 'var(--accent-cyan)'
      : accent === 'green'
        ? 'var(--accent-green)'
        : 'var(--accent-orange)';

  const checked = flags.filter(Boolean).length;
  const label =
    mode === 'steps' ? 'Steps · tap to check' : mode === 'proof' ? 'Proof · this device' : 'Checklist · this device';

  return (
    <div className="mt-5 max-w-2xl">
      <div className="mb-2 flex justify-between text-[10px] font-mono uppercase tracking-[1px] text-[var(--text-muted)]">
        <span>{label}</span>
        <span className="tabular-nums">
          {checked}/{items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => {
          const on = flags[i];
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`course-check-item ${on ? 'is-on' : ''} ${mode === 'steps' ? 'course-check-item--step' : ''}`}
              >
                <span
                  className="course-check-box shrink-0"
                  style={{
                    borderColor: on ? mark : undefined,
                    color: on ? mark : undefined,
                    background: on
                      ? `color-mix(in srgb, ${mark} 12%, transparent)`
                      : undefined,
                  }}
                  aria-hidden
                >
                  {on ? '✓' : mode === 'steps' ? String(i + 1).padStart(2, '0') : ''}
                </span>
                <span className={on ? 'text-[var(--text-tertiary)]' : ''}>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Mastery | Labs tabs ──────────────────────────────── */

export function HarnessCourseTabs({ active }: { active: 'mastery' | 'labs' }) {
  const tabs = [
    { id: 'mastery' as const, href: '/forge/course/open-harness/', label: 'Mastery' },
    { id: 'labs' as const, href: '/forge/course/open-harness/labs/', label: 'Labs' },
  ];
  return (
    <div className="course-segmented" role="tablist" aria-label="Open Harness sections">
      {tabs.map((tab) => {
        const on = active === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            role="tab"
            aria-selected={on}
            className={`course-segmented-item ${on ? 'is-active' : ''}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

/* ─── Design prereq soft gate ──────────────────────────── */

export function DesignPrereqGate() {
  const [ok, setOk] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOk(readDesignPrereqOk());
    setReady(true);
  }, []);

  if (!ready || ok) return null;

  return (
    <div className="course-callout course-callout--warn mt-8 max-w-2xl">
      <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-amber)]">
        Soft gate · Open Harness Part I
      </div>
      <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
        Open Design assumes Hermes Desktop (or CLI) chats, a profile with SOUL.md, and that you can
        list/install a skill. If any of that is false, finish Open Harness Part I first — Design will
        not re-teach install.
      </p>
      <p className="mt-2 text-[11px] text-[var(--text-muted)]">
        Confirmation is stored on this device only.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/forge/course/open-harness/00/" className="button-primary">
          Open Harness Part I ↗
        </Link>
        <button
          type="button"
          className="button-secondary"
          onClick={() => {
            writeDesignPrereqOk(true);
            setOk(true);
          }}
        >
          I already finished Part I
        </button>
      </div>
    </div>
  );
}

/* ─── TOC complete set ─────────────────────────────────── */

export function useCompletedSet(courseId: CourseProgressId): Set<string> {
  const [set, setSet] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    const refresh = () => setSet(new Set(readCompleted(courseId)));
    refresh();
    window.addEventListener('dv-course-progress', refresh);
    return () => window.removeEventListener('dv-course-progress', refresh);
  }, [courseId]);
  return set;
}
