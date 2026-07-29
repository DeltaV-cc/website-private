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

const ACCENT_CYCLE: Accent[] = ['cyan', 'orange', 'amber', 'purple', 'green', 'red', 'gold'];

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
    <div
      className="rounded-2xl border bg-[var(--bg-surface)] p-5"
      style={{
        borderColor: `color-mix(in srgb, ${c} 30%, var(--border-default))`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${c} 8%, transparent)`,
      }}
    >
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
  items: { time: string; label: string; accent?: Accent }[];
}) {
  return (
    <div className="my-6 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 not-prose">
      {title && (
        <div className="mb-4 text-sm font-medium text-[var(--text-muted)]">{title}</div>
      )}
      <div className="flex flex-col gap-3">
        {items.map((e, i) => {
          const accent = e.accent || ACCENT_CYCLE[i % ACCENT_CYCLE.length];
          const c = ACCENT_VAR[accent];
          return (
            <div key={i} className="flex items-start gap-4">
              <span
                className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: c, boxShadow: `0 0 10px color-mix(in srgb, ${c} 55%, transparent)` }}
                aria-hidden
              />
              <span className="min-w-[7.5rem] font-mono text-xs pt-0.5" style={{ color: c }}>
                {e.time}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">{e.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Three (or more) equal cards — good for “package” / pillar infographics. */
export function ArticlePillarGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-3 not-prose">{children}</div>
  );
}

export function ArticlePillar({
  step,
  title,
  body,
  accent = 'cyan',
}: {
  step?: string;
  title: string;
  body: string;
  accent?: Accent;
}) {
  const c = ACCENT_VAR[accent];
  return (
    <div
      className="rounded-2xl border bg-[var(--bg-surface)] p-5 flex flex-col gap-2"
      style={{
        borderColor: `color-mix(in srgb, ${c} 35%, var(--border-default))`,
        boxShadow: `inset 3px 0 0 ${c}`,
      }}
    >
      {step && (
        <div className="text-[10px] font-semibold uppercase tracking-[2px]" style={{ color: c }}>
          {step}
        </div>
      )}
      <div className="text-base font-semibold text-[var(--text-primary)]">{title}</div>
      <div className="text-sm text-[var(--text-tertiary)] leading-relaxed">{body}</div>
    </div>
  );
}

/** Horizontal model / comparison strip. */
export function ArticleCompareRow({
  title,
  rows,
}: {
  title?: string;
  rows: { label: string; value: string; ok?: boolean; accent?: Accent }[];
}) {
  return (
    <div className="my-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 not-prose">
      {title && (
        <div className="mb-4 text-sm font-medium text-[var(--text-muted)]">{title}</div>
      )}
      <div className="flex flex-col gap-3">
        {rows.map((r, i) => {
          const accent = r.accent || (r.ok === false ? 'red' : r.ok ? 'green' : ACCENT_CYCLE[i % ACCENT_CYCLE.length]);
          const c = ACCENT_VAR[accent];
          return (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 rounded-lg border px-4 py-3"
              style={{ borderColor: `color-mix(in srgb, ${c} 28%, var(--border-default))` }}
            >
              <span className="min-w-[10rem] text-xs font-semibold uppercase tracking-[1px]" style={{ color: c }}>
                {r.label}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">{r.value}</span>
            </div>
          );
        })}
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
