'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'copied' | 'failed';

/**
 * Copy-to-clipboard button for course command blocks.
 *
 * Written in React rather than reusing the imperative `.dv-copy-btn` that
 * BlogPostLayout injects into every <pre>, for two reasons: that button's
 * reveal rule is `.article-prose pre:hover .dv-copy-btn`, so reusing it would
 * mean editing CSS shared by 36 blog/tutorial/opsec pages — and `opacity: 0`
 * until hover is exactly wrong here, where the whole point is a command you can
 * see and click straight away.
 *
 * The clipboard fallback is ported verbatim from BlogPostLayout: `navigator
 * .clipboard` is unavailable in non-secure contexts, so the hidden-textarea
 * `execCommand` path still earns its keep.
 */
export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const flash = useCallback((next: Status) => {
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 1600);
  }, []);

  const legacyCopy = useCallback(() => {
    try {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      flash(ok ? 'copied' : 'failed');
    } catch {
      flash('failed');
    }
  }, [value, flash]);

  const copy = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(() => flash('copied'), legacyCopy);
    } else {
      legacyCopy();
    }
  }, [value, flash, legacyCopy]);

  return (
    <button
      type="button"
      onClick={copy}
      className="course-copy"
      data-state={status}
      aria-label={`${label} to clipboard`}
    >
      {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : label}
    </button>
  );
}
