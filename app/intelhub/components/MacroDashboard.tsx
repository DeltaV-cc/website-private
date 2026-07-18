/* IntelHub — Macro Dashboard v7
   Artemis/DefiLlama-level market data with MetricTile, Sparkline, DataBar
   Restyled to match Web3Dashboard visual language */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { CategoryBox, fmtNum } from './Shared';
import MarketNewsTicker from './MarketNewsTicker';

/* -- Inline SVG Icons -- */
const TrendUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[var(--accent-green)]">
    <path d="M2 8l3-5 2 3 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2v4M10 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TrendDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[var(--accent-red)]">
    <path d="M2 4l3 5 2-3 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10V6M10 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* -- Number formatters (matching Web3Dashboard pattern) -- */
export default function MacroDashboard({
  items, dd, patents, forex, catBoxes, TC, ago, ts,
}: {
  items: Item[]; dd: any; patents: PatentsData | null; forex: any;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; ts: (iso: string) => string;
}) {
  const stockFG = dd?.fearGreed || {};
  const fgVal = (typeof stockFG.score === 'number') ? stockFG.score : 0;
  const fgLabel = stockFG.rating || '';
  const spx = dd?.indices?.spx;
  const csi = dd?.indices?.csi;
  const crypto = dd?.crypto;
  const macroCat = catBoxes.find((c: any) => c.id === 'macro');
  const sciCat = catBoxes.find((c: any) => c.id === 'science');

  const fmtPct = (v: number | null | undefined) => {
    if (v == null) return <span className="text-[var(--text-disabled)] tabular-nums">···</span>;
    const c = v >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]';
    return <span className={`${c} tabular-nums text-xs font-medium`}>{v >= 0 ? '+' : ''}{v.toFixed(1)}%</span>;
  };

  const forexPairs = forex && typeof forex === 'object' ? (
    ['EUR', 'JPY', 'GBP', 'CHF', 'CNY'].map(k => ({ label: k, ...(forex[k] || {}) })).filter((p: any) => p.rateStr)
  ) : [];

  // F&G color
  const fgColor = fgVal <= 20 ? 'text-[var(--accent-red)]' : fgVal <= 40 ? 'text-[var(--accent-orange)]' 
    : fgVal <= 60 ? 'text-[var(--accent-amber)]' : fgVal <= 80 ? 'text-lime-400' : 'text-[var(--accent-green)]';

  // Price formatter color
  return (
    <div className="space-y-5">
      <MarketNewsTicker items={items} ts={ts} />

      {/* -- Market Grid — Metric Tiles -- */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-cyan)]/[0.04] to-transparent">
          <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">Market</span>
          <span className="text-[10px] text-[var(--text-muted)]">via Alpha Vantage / Yahoo</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-white/[0.03]">
          {/* S&P 500 */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">S&P 500</div>
            {spx ? (
              <>
                <div className="text-lg font-bold text-[var(--text-primary)] tabular-nums mb-1">{spx.price}</div>
                <div className={`inline-flex items-center gap-1 text-xs font-semibold ${spx.change >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                  {spx.change >= 0 ? <TrendUp /> : <TrendDown />}
                  {spx.changePct || ''}
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-5 w-20 rounded" />
                <div className="skeleton-shimmer h-3 w-12 rounded" />
              </div>
            )}
          </div>

          {/* CSI 1000 */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">CSI 1000</div>
            {csi ? (
              <>
                <div className="text-lg font-bold text-[var(--text-primary)] tabular-nums mb-1">{csi.price}</div>
                <div className={`inline-flex items-center gap-1 text-xs font-semibold ${csi.change >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                  {csi.change >= 0 ? <TrendUp /> : <TrendDown />}
                  {csi.changePct || ''}
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-5 w-20 rounded" />
                <div className="skeleton-shimmer h-3 w-12 rounded" />
              </div>
            )}
          </div>

          {/* BTC */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">Bitcoin</div>
            {crypto?.btc_price != null ? (
              <>
                <div className="text-lg font-bold text-[var(--text-primary)] tabular-nums mb-1">${fmtNum(crypto.btc_price)}</div>
                {crypto?.btc_change_24h != null && (
                  <div className={`inline-flex items-center gap-1 text-xs font-semibold ${crypto.btc_change_24h >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                    {crypto.btc_change_24h >= 0 ? <TrendUp /> : <TrendDown />}
                    {crypto.btc_change_24h >= 0 ? '+' : ''}{crypto.btc_change_24h.toFixed(1)}%
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-5 w-20 rounded" />
                <div className="skeleton-shimmer h-3 w-12 rounded" />
              </div>
            )}
          </div>

          {/* ETH */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">Ethereum</div>
            {crypto?.eth_price != null ? (
              <>
                <div className="text-lg font-bold text-[var(--text-primary)] tabular-nums mb-1">${fmtNum(crypto.eth_price)}</div>
                {crypto?.eth_change_24h != null && (
                  <div className={`inline-flex items-center gap-1 text-xs font-semibold ${crypto.eth_change_24h >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                    {crypto.eth_change_24h >= 0 ? <TrendUp /> : <TrendDown />}
                    {crypto.eth_change_24h >= 0 ? '+' : ''}{crypto.eth_change_24h.toFixed(1)}%
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-5 w-20 rounded" />
                <div className="skeleton-shimmer h-3 w-12 rounded" />
              </div>
            )}
          </div>

          {/* Fear & Greed */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">Fear &amp; Greed</div>
            {typeof stockFG.score === 'number' ? (
              <>
                <div className={`text-lg font-bold tabular-nums mb-1 ${fgColor}`}>{fgVal}</div>
                <div className={`text-xs font-medium ${fgColor}/70`}>{fgLabel || 'Neutral'}</div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-5 w-10 rounded" />
                <div className="skeleton-shimmer h-3 w-14 rounded" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* -- Forex table (Web3-style) -- */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-cyan)]/[0.04] to-transparent">
          <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">Forex (vs USD)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[var(--text-muted)] uppercase tracking-wider border-b border-white/[0.02]">
                <th className="text-left px-5 py-2.5 font-semibold">Pair</th>
                <th className="text-right px-4 py-2.5 font-semibold">Rate</th>
                <th className="text-right px-4 py-2.5 font-semibold">Day Δ</th>
                <th className="text-right px-4 py-2.5 font-semibold hidden sm:table-cell">1M</th>
                <th className="text-right px-4 py-2.5 font-semibold hidden md:table-cell">1Y</th>
                <th className="text-right px-4 py-2.5 font-semibold hidden lg:table-cell">10Y</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {forexPairs.length > 0 ? forexPairs.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="px-5 py-2.5 text-[var(--text-secondary)] font-medium">USD/{p.label}</td>
                  <td className="px-4 py-2.5 text-right text-[var(--text-primary)] font-semibold tabular-nums">{p.rateStr}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`text-xs font-semibold tabular-nums ${(p.chgPct || '').startsWith('+') ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                      {p.chgPct || '···'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right hidden sm:table-cell">{fmtPct(p.p1M)}</td>
                  <td className="px-4 py-2.5 text-right hidden md:table-cell">{fmtPct(p.p1Y)}</td>
                  <td className="px-4 py-2.5 text-right hidden lg:table-cell">{fmtPct(p.p10Y)}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent-cyan)]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[var(--text-disabled)] text-xs">Forex data will load after next sync</span>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* -- Patents + Macro feed -- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          {patents && <PatentsTable patents={patents} />}
        </div>
        <div>
          {macroCat && <CategoryBox cat={macroCat} ago={ago} TC={TC} compact />}
        </div>
      </div>

      {sciCat && <CategoryBox cat={sciCat} ago={ago} TC={TC} />}
    </div>
  );
}
