'use client';
/* Dromos Kitchen — Net Token Value Flows (replaces prior REV chain list) */
import { useMemo, useState } from 'react';
import { fmtCompact, PanelMeta } from './Shared';

export type NetFlowPeriod = '30d' | '90d' | '180d';

type NetFlowRow = {
  token: string;
  cat?: string;
  mcap?: number;
  rev_30d?: number | null;
  em_30d?: number | null;
  ratio_30d?: number | null;
  ratio_str_30d?: string | null;
  rev_90d?: number | null;
  em_90d?: number | null;
  ratio_90d?: number | null;
  ratio_str_90d?: string | null;
  rev_180d?: number | null;
  em_180d?: number | null;
  ratio_180d?: number | null;
  ratio_str_180d?: string | null;
};

function pick(row: NetFlowRow, period: NetFlowPeriod) {
  if (period === '30d') {
    return {
      rev: row.rev_30d ?? null,
      em: row.em_30d ?? null,
      ratio: row.ratio_30d ?? null,
      ratioStr: row.ratio_str_30d || '',
    };
  }
  if (period === '90d') {
    return {
      rev: row.rev_90d ?? null,
      em: row.em_90d ?? null,
      ratio: row.ratio_90d ?? null,
      ratioStr: row.ratio_str_90d || '',
    };
  }
  return {
    rev: row.rev_180d ?? null,
    em: row.em_180d ?? null,
    ratio: row.ratio_180d ?? null,
    ratioStr: row.ratio_str_180d || '',
  };
}

function ratioColor(ratio: number | null) {
  if (ratio == null || ratio <= -900) return 'text-[var(--text-disabled)]';
  if (ratio >= 1) return 'text-[var(--accent-green)]';
  if (ratio > 0) return 'text-[var(--accent-amber)]';
  return 'text-[var(--accent-red)]';
}

export default function NetFlowsPanel({
  rows,
  loading,
  updated,
}: {
  rows: NetFlowRow[] | null | undefined;
  loading?: boolean;
  updated?: string | null;
}) {
  const [period, setPeriod] = useState<NetFlowPeriod>('30d');

  const ranked = useMemo(() => {
    const list = Array.isArray(rows) ? rows : [];
    const mapped = list.map((r) => {
      const p = pick(r, period);
      return { ...r, ...p };
    });
    // Prefer finite ratios; put −∞ style (-999) last
    return mapped.sort((a, b) => {
      const ar = a.ratio != null && a.ratio > -900 ? a.ratio : -1e9;
      const br = b.ratio != null && b.ratio > -900 ? b.ratio : -1e9;
      return br - ar;
    });
  }, [rows, period]);

  const updatedLabel = updated
    ? new Date(updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden h-full">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-green)]/[0.06] to-transparent">
        <div className="min-w-0">
          <div className="text-xs text-[var(--accent-green)] uppercase tracking-[1.5px] font-bold">Net token value flows</div>
          <div className="mt-0.5">
            <PanelMeta source="Dromos Kitchen" updated={updatedLabel} note="rev vs emissions" />
          </div>
        </div>
        <div className="flex gap-0.5 bg-[var(--bg-deep)] rounded-lg p-0.5 border border-[var(--border-default)] text-[10px]">
          {(['30d', '90d', '180d'] as NetFlowPeriod[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-2 py-1 rounded-md transition-colors ${
                period === p ? 'bg-white/[0.10] text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-2 border-b border-white/[0.03] sticky top-0 z-[1] bg-[var(--bg-surface)] flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px]">
        <span>Token</span>
        <div className="flex gap-4">
          <span className="w-14 text-right">Rev</span>
          <span className="w-14 text-right hidden sm:inline">Emit</span>
          <span className="w-12 text-right">Ratio</span>
        </div>
      </div>

      <div className="divide-y divide-white/[0.02] max-h-[340px] overflow-y-auto scrollbar-hide">
        {loading && !ranked.length && (
          <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">Loading net-flows…</div>
        )}
        {!loading && !ranked.length && (
          <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">
            Unavailable ·{' '}
            <a
              href={`https://dromos.kitchen/dashboards/net-flows?period=${period}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-cyan)] hover:underline"
            >
              Dromos
            </a>
          </div>
        )}
        {ranked.slice(0, 12).map((r) => (
          <div key={r.token} className="flex items-center justify-between gap-2 px-5 py-2.5 text-xs hover:bg-white/[0.02]">
            <div className="min-w-0">
              <div className="font-semibold text-[var(--text-primary)] tabular-nums">{r.token}</div>
              {r.cat && <div className="text-[10px] text-[var(--text-disabled)]">{r.cat}</div>}
            </div>
            <div className="flex items-center gap-4 shrink-0 tabular-nums">
              <span className="w-14 text-right text-[var(--text-secondary)]">
                {r.rev != null ? fmtCompact(r.rev) : '—'}
              </span>
              <span className="w-14 text-right text-[var(--text-tertiary)] hidden sm:inline">
                {r.em != null ? fmtCompact(r.em) : '—'}
              </span>
              <span className={`w-12 text-right font-semibold ${ratioColor(r.ratio)}`}>
                {r.ratio != null && r.ratio > -900
                  ? (r.ratioStr || `${r.ratio >= 0 ? '+' : ''}${r.ratio.toFixed(1)}x`).replace(/[^\x20-\x7E+-.]/g, '')
                  : '—'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-[var(--border-default)] flex items-center justify-between text-[9px] text-[var(--text-disabled)]">
        <span>Higher ratio → earns more than it emits</span>
        <a
          href={`https://dromos.kitchen/dashboards/net-flows?period=${period}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent-cyan)] hover:underline"
        >
          Full dashboard ↗
        </a>
      </div>
    </div>
  );
}
