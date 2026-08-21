'use client';
/**
 * Liquity BOLD stable yields — Stability Pool Earn + top BOLD venues.
 * Dune board (team view): https://dune.com/liquity/bold-yields
 * Live rates: DefiLlama Yields (same SP markets).
 */
import { fmtCompact, fmtCurrency, PanelMeta } from './Shared';

export type BoldYieldRow = {
  poolId?: string;
  project?: string;
  symbol?: string;
  chain?: string;
  collateral?: string;
  kind?: string;
  apy?: number | null;
  apyBase?: number | null;
  apyReward?: number | null;
  tvlUsd?: number | null;
  meta?: string | null;
  url?: string | null;
};

export type BoldYieldsData = {
  updated_at?: string;
  source?: string;
  dune_dashboard?: string;
  docs?: string;
  headline?: {
    weighted_stability_apy?: number | null;
    stability_tvl_usd?: number | null;
    pool_count?: number | null;
  };
  stability_pools?: BoldYieldRow[];
  venues?: BoldYieldRow[];
  notes?: string;
};

function fmtApy(n?: number | null) {
  if (n == null || !Number.isFinite(n)) return '—';
  return `${n.toFixed(2)}%`;
}

function apyColor(n?: number | null) {
  if (n == null || !Number.isFinite(n)) return 'text-[var(--text-disabled)]';
  if (n >= 6) return 'text-[var(--accent-green)]';
  if (n >= 3) return 'text-[var(--accent-amber)]';
  return 'text-[var(--text-secondary)]';
}

export default function BoldYieldsPanel({
  data,
  loading,
}: {
  data?: BoldYieldsData | null;
  loading?: boolean;
}) {
  const sp = data?.stability_pools || [];
  const venues = data?.venues || [];
  const headline = data?.headline || {};
  const updated = data?.updated_at
    ? new Date(data.updated_at).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden h-full">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-green)]/[0.07] via-[var(--accent-cyan)]/[0.04] to-transparent">
        <div className="min-w-0">
          <div className="text-xs text-[var(--accent-green)] uppercase tracking-[1.5px] font-bold">
            BOLD stable yields
          </div>
          <div className="mt-0.5">
            <PanelMeta
              source={data?.source || 'DefiLlama · Liquity V2'}
              updated={updated}
              note="Earn Stability Pools"
            />
          </div>
        </div>
        <a
          href={data?.dune_dashboard || 'https://dune.com/liquity/bold-yields'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[var(--accent-cyan)] hover:underline shrink-0"
        >
          Dune board ↗
        </a>
      </div>

      {/* Headline */}
      <div className="px-5 py-4 border-b border-[var(--border-subtle)] grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">
            TVL-weighted SP APY
          </div>
          <div className={`text-2xl font-bold tabular-nums ${apyColor(headline.weighted_stability_apy)}`}>
            {loading && headline.weighted_stability_apy == null
              ? '…'
              : fmtApy(headline.weighted_stability_apy)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">
            Stability Pool TVL
          </div>
          <div className="text-lg font-bold tabular-nums text-[var(--text-primary)]">
            {headline.stability_tvl_usd != null
              ? fmtCurrency(headline.stability_tvl_usd)
              : '—'}
          </div>
          <div className="text-[10px] text-[var(--text-disabled)]">
            {headline.pool_count != null ? `${headline.pool_count} pools` : ''}
          </div>
        </div>
      </div>

      {/* Stability pools */}
      <div className="px-5 py-2 border-b border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] flex justify-between sticky top-0 z-[1] bg-[var(--bg-surface)]">
        <span>Stability Pool (Earn)</span>
        <span>APY · TVL</span>
      </div>
      <div className="divide-y divide-[var(--border-subtle)]">
        {loading && sp.length === 0 && (
          <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">
            Loading BOLD yields…
          </div>
        )}
        {!loading && sp.length === 0 && (
          <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">
            No SP yields ·{' '}
            <a
              href="https://dune.com/liquity/bold-yields"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-cyan)] hover:underline"
            >
              Dune
            </a>
          </div>
        )}
        {sp.map((row) => (
          <a
            key={row.poolId || row.collateral}
            href={row.url || data?.dune_dashboard || 'https://dune.com/liquity/bold-yields'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-5 py-2.5 text-xs hover:bg-[var(--overlay-weak)] group"
          >
            <div className="min-w-0">
              <div className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-green)]">
                {row.collateral || row.symbol || 'BOLD'}
              </div>
              <div className="text-[10px] text-[var(--text-disabled)] truncate max-w-[200px]">
                {row.meta || `${row.project} · ${row.chain}`}
              </div>
            </div>
            <div className="text-right shrink-0 tabular-nums">
              <div className={`font-bold ${apyColor(row.apy)}`}>{fmtApy(row.apy)}</div>
              <div className="text-[10px] text-[var(--text-muted)]">
                {row.tvlUsd != null ? fmtCompact(row.tvlUsd) : '—'}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* External venues */}
      {venues.length > 0 && (
        <>
          <div className="px-5 py-2 border-y border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] flex justify-between bg-[var(--overlay-weak)]">
            <span>BOLD venues (LP / vaults)</span>
            <span>APY · TVL</span>
          </div>
          <div className="divide-y divide-[var(--border-subtle)] max-h-[200px] overflow-y-auto scrollbar-hide">
            {venues.slice(0, 8).map((row) => (
              <a
                key={row.poolId || `${row.project}-${row.symbol}`}
                href={row.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-5 py-2 text-xs hover:bg-[var(--overlay-weak)] group"
              >
                <div className="min-w-0">
                  <div className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate">
                    <span className="font-medium">{row.symbol}</span>
                    <span className="text-[var(--text-disabled)]"> · {row.project}</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-disabled)]">{row.chain}</div>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <div className={`font-semibold ${apyColor(row.apy)}`}>{fmtApy(row.apy)}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    {row.tvlUsd != null ? fmtCompact(row.tvlUsd) : '—'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      <div className="px-4 py-2 border-t border-[var(--border-default)] flex items-center justify-between text-[9px] text-[var(--text-disabled)] gap-2">
        <span className="truncate">Native SP yield from borrower interest · no emissions</span>
        <div className="flex gap-2 shrink-0">
          {data?.docs && (
            <a href={data.docs} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-cyan)]">
              Docs
            </a>
          )}
          <a
            href={data?.dune_dashboard || 'https://dune.com/liquity/bold-yields'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-cyan)] hover:underline"
          >
            Dune ↗
          </a>
        </div>
      </div>
    </div>
  );
}
