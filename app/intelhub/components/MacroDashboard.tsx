/* IntelHub — Macro Dashboard v7
   Artemis/DefiLlama-level market data with MetricTile, Sparkline, DataBar
   Restyled to match Web3Dashboard visual language */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { CategoryBox, fmtNum } from './Shared';
import MarketNewsTicker from './MarketNewsTicker';
import AnimatedValue from './AnimatedValue';

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
function fmtPrice(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parsePrice(p: any): number {
  if (typeof p === 'number') return p;
  if (typeof p === 'string') return parseFloat(p.replace(/[^0-9.]/g, '')) || 0;
  return 0;
}

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
  const gold = dd?.gold;
  const us10y = dd?.us10y;
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
  const spxChgColor = spx?.change >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]';

  return (
    <div className="space-y-5">
      <MarketNewsTicker items={items} ts={ts} />

      {/* -- Global Market Overview Banner (Web3-style) -- */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 bg-gradient-to-r from-[var(--accent-cyan)]/[0.04] via-[var(--accent-purple)]/[0.04] to-transparent">
        {spx ? (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">S&P 500</div>
              <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                <AnimatedValue value={parsePrice(spx.price)} format={fmtPrice} className="tabular-nums" />
              </div>
              <div className={`text-xs font-semibold mt-1 ${spxChgColor}`}>
                {spx.changePct || ''} <span className="text-[var(--text-muted)] font-normal">24h</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* Fear & Greed */}
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">Fear & Greed</div>
                  {typeof stockFG.score === 'number' ? (
                    <>
                      <div className={`text-lg font-bold tabular-nums ${fgColor}`}>{fgVal}</div>
                      <div className={`text-[10px] ${fgColor}/60`}>{fgLabel || '···'}</div>
                    </>
                  ) : (
                    <div className="space-y-1">
                      <div className="skeleton-shimmer h-5 w-10 rounded" />
                      <div className="skeleton-shimmer h-3 w-12 rounded" />
                    </div>
                  )}
                </div>
                {typeof stockFG.score === 'number' && (
                  <div className="relative w-3 h-16 bg-gradient-to-t from-red-500/40 via-amber-500/40 to-emerald-500/40 rounded-full overflow-hidden">
                    <div className="absolute left-0 right-0 h-[3px] bg-white rounded-full transition-all duration-500"
                      style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }} />
                  </div>
                )}
              </div>
              {/* Gold + 10Y */}
              <div className="text-right space-y-1">
                {gold && (
                  <div className="text-xs text-[var(--text-tertiary)]">Gold{' '}
                    <span className="text-[var(--text-secondary)] tabular-nums">${gold.price}</span>
                  </div>
                )}
                {us10y && (
                  <div className="text-xs text-[var(--text-tertiary)]">10Y Yield{' '}
                    <span className="text-[var(--text-secondary)] tabular-nums">{us10y.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            <div className="skeleton-shimmer h-3 w-32 rounded" />
            <div className="skeleton-shimmer h-8 w-44 rounded" />
            <div className="skeleton-shimmer h-3 w-20 rounded" />
          </div>
        )}
      </div>

      {/* -- Market Grid — Metric Tiles -- */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-cyan)]/[0.04] to-transparent">
          <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">Market</span>
          <span className="text-[10px] text-[var(--text-muted)]">via Alpha Vantage / Yahoo</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 divide-x divide-y divide-white/[0.03]">
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

          {/* Gold */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">Gold</div>
            {gold ? (
              <>
                <div className="text-lg font-bold text-[var(--text-primary)] tabular-nums mb-1">${gold.price}</div>
                <div className={`inline-flex items-center gap-1 text-xs font-semibold ${gold.change >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                  {gold.change >= 0 ? <TrendUp /> : <TrendDown />}
                  {gold.changePct || ''}
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

          {/* 10Y Yield */}
          <div className="data-tile p-4 hover:bg-[var(--bg-elevated)] transition-colors duration-200">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">10Y Yield</div>
            {us10y ? (
              <>
                <div className="text-lg font-bold text-[var(--text-primary)] tabular-nums mb-1">{us10y.price}</div>
                <div className={`inline-flex items-center gap-1 text-xs font-semibold ${us10y.change >= 0 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-green)]'}`}>
                  {us10y.change >= 0 ? <TrendUp /> : <TrendDown />}
                  {us10y.changePct || ''}
                </div>
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
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1.5">Fear & Greed</div>
            {typeof stockFG.score === 'number' ? (
              <>
                <div className={`text-lg font-bold tabular-nums mb-1 ${fgColor}`}>{fgVal}</div>
                <div className={`text-xs font-semibold ${fgColor}/70`}>{fgLabel}</div>
              </>
            ) : (
              <div className="space-y-2">
                <div className="skeleton-shimmer h-5 w-12 rounded" />
                <div className="skeleton-shimmer h-3 w-16 rounded" />
              </div>
            )}
            <div className="mt-2.5 h-1.5 bg-gradient-to-r from-red-500/40 via-amber-500/40 via-lime-500/40 to-emerald-500/40 rounded-full relative overflow-hidden">
              <div className="absolute top-0 bottom-0 w-2 bg-white/80 rounded-full transition-all duration-700 shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                style={{ left: `${Math.max(2, Math.min(97, fgVal))}%` }} />
            </div>
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
