'use client';

import Link from 'next/link';
import { withBasePath } from '@/lib/site';
import { formatCourseText } from '@/app/components/course/formatCourseText';

/** Who-does-what strip — Think · LLM / Act · Harness / Observe (from /teach). */
export function WhoSteps({
  steps,
}: {
  steps: { who: string; title: string; body: string }[];
}) {
  return (
    <div className="course-who-steps mt-5 max-w-2xl">
      {steps.map((s, i) => (
        <div key={i} className="course-who-step">
          <div className="course-who-label">{s.who}</div>
          <div className="course-who-body">
            <strong className="block text-[var(--text-primary)] mb-0.5">{s.title}</strong>
            <span className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {formatCourseText(s.body)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** One-line remember card. */
export function RememberLine({ text }: { text: string }) {
  return (
    <div className="course-remember mt-5 max-w-2xl">
      <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--accent-orange)]">
        Remember
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed m-0">
        {formatCourseText(text)}
      </p>
    </div>
  );
}

/** Section-level “you win when” (distinct from end-of-module proof). */
export function WinWhenList({ items }: { items: string[] }) {
  return (
    <div className="course-win-when mt-5 max-w-2xl">
      <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--accent-orange)]">
        You win when
      </div>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm text-[var(--text-secondary)] leading-relaxed"
          >
            <span className="text-[var(--accent-orange)] font-mono shrink-0">✓</span>
            <span>{formatCourseText(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** High-trust primary sources for a section. */
export function PrimarySources({
  sources,
  label = 'Primary source',
}: {
  sources: { label: string; href: string }[];
  label?: string;
}) {
  if (!sources.length) return null;
  return (
    <div className="course-primary-sources mt-5 max-w-2xl">
      <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-[var(--text-muted)]">
        {label}
      </div>
      <ul className="mt-2 space-y-1.5">
        {sources.map((s, i) => (
          <li key={i}>
            {s.href.startsWith('http') ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent-cyan)] hover:underline"
              >
                {s.label} ↗
              </a>
            ) : s.href.startsWith('/courses/') ? (
              <a
                href={withBasePath(s.href)}
                className="text-sm text-[var(--accent-cyan)] hover:underline"
              >
                {s.label} ↘
              </a>
            ) : (
              <Link href={s.href} className="text-sm text-[var(--accent-cyan)] hover:underline">
                {s.label} →
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mono citation footer. */
export function SectionCitations({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <p className="course-citations mt-3 max-w-2xl font-mono text-[11px] text-[var(--text-muted)]">
      {items.join(' · ')}
    </p>
  );
}
