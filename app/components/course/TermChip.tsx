'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { OPEN_HARNESS_GLOSSARY, type CourseLang, t } from '@/app/data/courses/open-harness';

export function TermChip({ termId, lang = 'en' }: { termId: string; lang: CourseLang }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const glossaryTerm = OPEN_HARNESS_GLOSSARY.find((g) => g.id === termId);
  if (!glossaryTerm) {
    console.warn(`TermChip: glossary term "${termId}" not found`);
    return null;
  }

  const termName = t(glossaryTerm.term, lang);
  const termDef = t(glossaryTerm.def, lang);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8,
      left: rect.left,
    });
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-5 h-5 ml-1 rounded-full bg-[var(--accent-orange)]/20 text-[var(--accent-orange)] hover:bg-[var(--accent-orange)]/30 transition-colors"
        title={`${termName} definition`}
        aria-label={`Show definition of ${termName}`}
      >
        <span className="text-xs font-bold">ⓘ</span>
      </button>

      {open && position && (
        <div
          ref={popoverRef}
          className="fixed z-50 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-lg p-4 max-w-xs"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--accent-orange)] font-semibold">
            {termName}
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{termDef}</p>
          <Link
            href={`/forge/course/open-harness/01/#${termId}`}
            className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--accent-cyan)] hover:underline"
          >
            📖 See full definition in Lesson 01
          </Link>
        </div>
      )}
    </>
  );
}
