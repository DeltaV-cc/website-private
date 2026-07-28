import type { ReactNode } from 'react';

type Accent = 'cyan' | 'orange' | 'amber' | 'purple' | 'gold' | 'green' | 'red';

const ACCENT_VAR: Record<Accent, string> = {
  cyan: 'var(--accent-cyan)',
  orange: 'var(--accent-orange)',
  amber: 'var(--accent-amber)',
  purple: 'var(--accent-purple)',
  gold: 'var(--accent-gold)',
  green: 'var(--accent-green)',
  red: 'var(--accent-red)',
};

export function ArticleStatGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 my-8 not-prose">{children}</div>;
}

export function ArticleStat({
  label,
  value,
  detail,
  accent = 'cyan',
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: Accent;
}) {
  const c = ACCENT_VAR[accent];
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
      <div className="text-xs uppercase tracking-[1px] text-[var(--text-muted)]">{label}</div>
      <div className="mt-1 text-2xl font-bold" style={{ color: c }}>
        {value}
      </div>
      {detail && <div className="mt-1 text-xs text-[var(--text-tertiary)]">{detail}</div>}
    </div>
  );
}

export function ArticleCallout({
  children,
  accent = 'cyan',
  variant = 'quote',
}: {
  children: ReactNode;
  accent?: Accent;
  variant?: 'quote' | 'note' | 'warning';
}) {
  const c = ACCENT_VAR[accent];
  const base =
    'my-6 rounded-r-xl border-l-2 bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)] not-prose';
  const italic = variant === 'quote' ? ' italic' : '';
  return (
    <div className={base + italic} style={{ borderLeftColor: c }}>
      {children}
    </div>
  );
}

export function ArticleNote({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm italic text-[var(--text-tertiary)] not-prose my-4">
      {children}
    </p>
  );
}

export function ArticleTimeline({
  title,
  items,
}: {
  title?: string;
  items: { time: string; label: string }[];
}) {
  return (
    <div className="my-6 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 not-prose">
      {title && (
        <div className="mb-4 text-sm text-[var(--text-muted)]">{title}</div>
      )}
      <div className="flex flex-col gap-3">
        {items.map((e, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="min-w-[7.5rem] font-mono text-xs text-[var(--accent-cyan)]">
              {e.time}
            </span>
            <span className="text-sm text-[var(--text-secondary)]">{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArticleSourceFooter({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 border-t border-[var(--border-default)] pt-6 text-sm text-[var(--text-muted)] not-prose">
      {children}
    </p>
  );
}
