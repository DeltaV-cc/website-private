'use client';

import { useCallback, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, type ResolvedTheme } from '@/lib/theme';

function resolveStored(stored: string | null): ResolvedTheme {
  if (stored === 'light' || stored === 'dark') return stored;
  // 'system' (or nothing) was never a rendered state — the boot script in
  // <head> already resolved it to light/dark on <html data-theme>.
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return 'dark';
}

const Sun = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[15px] w-[15px]"
    aria-hidden
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-[15px] w-[15px]"
    aria-hidden
  >
    <path d="M20 13.5A8 8 0 1 1 10.5 4a6.4 6.4 0 0 0 9.5 9.5Z" />
  </svg>
);

/**
 * Theme control: one sun/moon button. In dark it shows the sun (tap → light);
 * in light it shows the moon (tap → dark). A single press always does the
 * same thing the icon promises — no "system" third mode to guess at.
 */
export default function ThemeToggle({
  labelled = false,
  onSelect,
}: {
  /** Mobile menu: show the target name, which there is room for there. */
  labelled?: boolean;
  onSelect?: () => void;
}) {
  const [theme, setTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  // Storage is client-only, so the first render has to be the server's (
  // "dark") and the real preference arrives on mount.
  useEffect(() => {
    const resolved = resolveStored(localStorage.getItem(THEME_STORAGE_KEY));
    document.documentElement.setAttribute('data-theme', resolved);
    setTheme(resolved);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    const next: ResolvedTheme = theme === 'light' ? 'dark' : 'light';
    // Persist here rather than inside the state updater: updaters must stay
    // pure, and React may call them more than once.
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode: the session still switches, it just will not be remembered */
    }
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
    onSelect?.();
  }, [theme, onSelect]);

  const isLight = mounted && theme === 'light';
  const label = isLight ? 'Switch to dark theme' : 'Switch to light theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex min-h-[24px] items-center gap-1.5 rounded-md border border-[var(--border-default)] px-2 py-1 text-xs transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] text-[var(--text-tertiary)]"
    >
      {isLight ? <Moon /> : <Sun />}
      {labelled ? (
        <span>{isLight ? 'Dark' : 'Light'}</span>
      ) : (
        <span className="sr-only">{isLight ? 'Dark theme' : 'Light theme'}</span>
      )}
    </button>
  );
}
