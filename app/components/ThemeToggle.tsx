'use client';

import { useCallback, useEffect, useState } from 'react';
import { isThemeChoice, THEME_STORAGE_KEY, type ResolvedTheme, type ThemeChoice } from '@/lib/theme';

/** System first: it is the default, so the cycle starts where the reader is. */
const ORDER: ThemeChoice[] = ['system', 'light', 'dark'];
const LABEL: Record<ThemeChoice, string> = { system: 'System', light: 'Light', dark: 'Dark' };

function resolve(choice: ThemeChoice, systemIsLight: boolean): ResolvedTheme {
  if (choice === 'system') return systemIsLight ? 'light' : 'dark';
  return choice;
}

function Icon({ choice }: { choice: ThemeChoice }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'h-4 w-4', 'aria-hidden': true };
  if (choice === 'light') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (choice === 'dark') {
    return (
      <svg {...common}>
        <path d="M20 13.5A8 8 0 1 1 10.5 4a6.4 6.4 0 0 0 9.5 9.5Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </svg>
  );
}

/**
 * Three-state theme control: system (default) → light → dark.
 *
 * The icon shows the *choice*, not the resolved theme, so "system" stays
 * visible as its own state rather than masquerading as whichever palette the
 * OS happens to be in. The resolved value lives on <html data-theme>, written
 * here and, before first paint, by THEME_INIT_SCRIPT.
 */
export default function ThemeToggle({
  className = 'inline-flex min-h-[24px] min-w-[24px] items-center justify-center px-2 py-1.5 text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent-cyan)]',
  showLabel = false,
  onSelect,
}: {
  className?: string;
  showLabel?: boolean;
  onSelect?: () => void;
}) {
  const [choice, setChoice] = useState<ThemeChoice>('system');
  const [systemIsLight, setSystemIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Storage and matchMedia are client-only, so the first render has to be the
  // server's ("system") and the real preference arrives on mount.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(isThemeChoice(stored) ? stored : 'system');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSystemIsLight(media.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const sync = (event: MediaQueryListEvent) => setSystemIsLight(event.matches);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  // The inline script already set the attribute for the stored choice; this
  // keeps it true afterwards — on a click, and on an OS switch while the
  // reader is on "system".
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', resolve(choice, systemIsLight));
  }, [choice, systemIsLight, mounted]);

  const cycle = useCallback(() => {
    setChoice((current) => {
      const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
      try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* private mode: the session still switches */ }
      return next;
    });
    onSelect?.();
  }, [onSelect]);

  const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];
  const resolved = resolve(choice, systemIsLight);
  const state = choice === 'system' ? `System (${resolved})` : LABEL[choice];

  return (
    <button
      type="button"
      onClick={cycle}
      className={className}
      title={`Theme: ${state}`}
      aria-label={`Theme: ${state}. Switch to ${LABEL[next].toLowerCase()}`}
    >
      <Icon choice={choice} />
      {showLabel && <span className="ml-2">{state}</span>}
    </button>
  );
}
