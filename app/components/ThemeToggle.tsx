'use client';

import { useCallback, useEffect, useState } from 'react';
import { isThemeChoice, THEME_STORAGE_KEY, type ResolvedTheme, type ThemeChoice } from '@/lib/theme';

const CHOICES: ThemeChoice[] = ['system', 'light', 'dark'];
const LABEL: Record<ThemeChoice, string> = { system: 'System', light: 'Light', dark: 'Dark' };

function resolve(choice: ThemeChoice, systemIsLight: boolean): ResolvedTheme {
  if (choice === 'system') return systemIsLight ? 'light' : 'dark';
  return choice;
}

function Icon({ choice }: { choice: ThemeChoice }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-[15px] w-[15px]',
    'aria-hidden': true,
  };
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
 * Theme control: system (the default), light, dark — all three on screen.
 *
 * This was a single button that cycled through the three, and cycling is the
 * wrong shape for this particular set. On a machine whose OS is dark, "dark"
 * and "system" render identically, so one press in three changed nothing
 * visible and the control read as broken. Three targets, one press, always a
 * definite outcome — and the current choice is visible without pressing
 * anything, which a cycling button can never manage.
 */
export default function ThemeToggle({
  labelled = false,
  onSelect,
}: {
  /** Mobile menu: show the names, which there is room for there. */
  labelled?: boolean;
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
    setChoice(isThemeChoice(stored) ? stored : 'system');
    setSystemIsLight(media.matches);
    setMounted(true);
    const sync = (event: MediaQueryListEvent) => setSystemIsLight(event.matches);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  // The inline script already set the attribute for the stored choice; this
  // keeps it true afterwards — on a press, and on an OS switch while the
  // reader is on "system".
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', resolve(choice, systemIsLight));
  }, [choice, systemIsLight, mounted]);

  const pick = useCallback(
    (next: ThemeChoice) => {
      // Persist here rather than inside the state updater: updaters must stay
      // pure, and React may call them more than once.
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* private mode: the session still switches, it just will not be remembered */
      }
      setChoice(next);
      onSelect?.();
    },
    [onSelect],
  );

  return (
    <div
      role="group"
      aria-label="Theme"
      className={`inline-flex items-center gap-0.5 rounded-lg border border-[var(--border-default)] p-0.5 ${labelled ? '' : 'bg-[var(--overlay-weak)]'}`}
    >
      {CHOICES.map((value) => {
        const active = mounted && value === choice;
        return (
          <button
            key={value}
            type="button"
            onClick={() => pick(value)}
            aria-pressed={active}
            title={value === 'system' ? `System theme (${resolve('system', systemIsLight)})` : `${LABEL[value]} theme`}
            className={`inline-flex min-h-[24px] items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors ${
              active
                ? 'bg-[var(--bg-active)] text-[var(--text-primary)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Icon choice={value} />
            {labelled && <span>{LABEL[value]}</span>}
            {!labelled && <span className="sr-only">{LABEL[value]}</span>}
          </button>
        );
      })}
    </div>
  );
}
