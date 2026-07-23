/* IntelHub — Web3 Dashboard v5
   CEX removed. Volume chart removed. CryptoLeaders removed.
   Added: DEX Dominance %, REV, Polymarket, Stablecoins by chain */
'use client';

import { useState } from 'react';
import { BarChart, CategoryBox, SkeletonPrice, SkeletonBlock, fmtCurrency, fmtCompact } from './Shared';
import CryptoFrontierSignals from './CryptoFrontierSignals';
import { useChartHover, formatDate, formatValue, ChartPoint } from './ChartHover';
import AnimatedValue from './AnimatedValue';
import VolumeChart from './VolumeChart';
import ChainVolumeBar from './ChainVolumeBar';

function fmtBig(n: number): string { return fmtCurrency(n); }

/* -- DeFi Weekly Card -- */
function ArtemisWeeklyCard({ dd }: { dd: any }) {
  const nl = dd?.artemisNewsletter;
  const latest = nl?.latest_weekly;
  if (!latest) return null;

  const date = latest.date ? new Date(latest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-gold)]/[0.06] to-transparent">
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--accent-gold)]">
            <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="13" cy="11" r="2" fill="var(--accent-gold)" opacity="0.3"/>
          </svg>
          <span className="text-xs text-[var(--accent-gold)] uppercase tracking-[1.5px] font-bold">DeFi Weekly</span>
          {date && <span className="text-[10px] text-[var(--text-muted)]">· {date}</span>}
        </div>
      </div>
      <div className="p-5">
        <a href={latest.link} target="_blank" rel="noopener noreferrer"
          className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors leading-snug block mb-2">
          {latest.title}
        </a>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-3 line-clamp-3">
          {latest.excerpt}
        </p>
        <div className="flex items-center justify-between">
          {latest.author && <span className="text-[10px] text-[var(--text-muted)]">by {latest.author}</span>}
          <a href={latest.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-gold)] hover:underline">
            Read edition
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* -- Polymarket Panel -- */
function PolymarketPanel({ markets }: { markets: any[] }) {
  if (!markets || markets.length === 0) return null;
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--accent-pink)] uppercase tracking-[1.5px] font-bold">Polymarket</span>
          <span className="text-[9px] text-[var(--text-disabled)]">via Polymarket API</span>
        </div>
        <span className="text-[10px] text-[var(--text-muted)]">{markets.length} markets</span>
      </div>
      <div className="space-y-2">
        {markets.slice(0, 6).map((m: any, i: number) => (
          <a key={i} href={`https://polymarket.com/event/${m.slug || ''}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between text-xs hover:bg-white/[0.02] px-1 py-1 rounded transition-colors group">
            <span className="text-[var(--text-tertiary)] truncate max-w-[70%] group-hover:text-[var(--text-secondary)]">{m.title || m.question}</span>
            <span className="text-[var(--text-secondary)] tabular-nums shrink-0">
              {m.volume ? fmtCompact(m.volume) : m.liquidity ? fmtCompact(m.liquidity) : ''}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* -- ETF Flows Card (BTC + ETH spot ETF net flows) -- */
function ETFFlowsCard({ etf }: { etf: any }) {
  if (!etf) return null;
  const btc = etf.btc;
  const eth = etf.eth;
  if (!btc?.latest_total && !eth?.latest_total) return null;

  const flowBadge = (val: number | null, label: string) => {
    if (val == null) return <SkeletonBlock className="h-5 w-16 inline-block" />;
    const sign = val >= 0 ? '+' : '';
    const color = val >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]';
    return <span className={`text-sm font-bold tabular-nums ${color}`}>{sign}{val.toFixed(1)}M</span>;
  };

  const miniSpark = (points: { d: string; v: number }[] | undefined, accent: string) => {
    if (!points || points.length < 2) return null;
    const vals = points.map(p => p.v);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const zeroY = max <= 0 ? 0 : min >= 0 ? 28 : ((0 - min) / range) * 28;
    const pathPoints = points.map((p, i) => `${(i / (points.length - 1)) * 80},${28 - ((p.v - min) / range) * 24}`).join(' ');
    return (
      <svg className="w-20 h-7 flex-shrink-0" viewBox="0 0 80 28" preserveAspectRatio="none">
        <line x1="0" y1={zeroY} x2="80" y2={zeroY} stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
        <polyline points={pathPoints} fill="none" stroke={accent} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
    );
  };

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-gold)]/[0.06] to-transparent">
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-gold)]">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-[var(--accent-gold)] uppercase tracking-[1.5px] font-bold">ETF Net Flows</span>
          <span className="text-[9px] text-[var(--text-disabled)]">via Farside / DeFi Llama</span>
        </div>
        {etf.updated_at && <span className="text-[9px] text-[var(--text-muted)]">{new Date(etf.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
      </div>
      <div className="grid grid-cols-2 divide-x divide-[var(--border-default)]">
        {/* BTC ETF */}
        <div className="p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)]" />
            <span className="text-xs text-[var(--text-tertiary)] font-medium">BTC Spot ETF</span>
          </div>
          <div className="flex items-center gap-2">
            {flowBadge(btc?.latest_total, 'BTC')}
            {btc?.change != null && (
              <span className={`text-[10px] tabular-nums ${btc.change >= 0 ? 'text-[var(--accent-green)]/70' : 'text-[var(--accent-red)]/70'}`}>
                {btc.change >= 0 ? '↑' : '↓'}{Math.abs(btc.change).toFixed(1)}M
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {miniSpark(btc?.sparkline, 'var(--accent-amber)')}
            <div className="text-[10px] text-[var(--text-muted)]">
              {btc?.latest_date ? new Date(btc.latest_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
            </div>
          </div>
          {btc?.ytd_flows != null && (
            <div className="text-[9px] text-[var(--text-disabled)]">
              YTD: <span className={btc.ytd_flows >= 0 ? 'text-[var(--accent-green)]/60' : 'text-[var(--accent-red)]/60'}>
                {btc.ytd_flows >= 0 ? '+' : ''}{btc.ytd_flows.toFixed(0)}M
              </span>
            </div>
          )}
        </div>
        {/* ETH ETF */}
        <div className="p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
            <span className="text-xs text-[var(--text-tertiary)] font-medium">ETH Spot ETF</span>
          </div>
          <div className="flex items-center gap-2">
            {flowBadge(eth?.latest_total, 'ETH')}
            {eth?.change != null && (
              <span className={`text-[10px] tabular-nums ${eth.change >= 0 ? 'text-[var(--accent-green)]/70' : 'text-[var(--accent-red)]/70'}`}>
                {eth.change >= 0 ? '↑' : '↓'}{Math.abs(eth.change).toFixed(1)}M
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {miniSpark(eth?.sparkline, 'var(--accent-cyan)')}
            <div className="text-[10px] text-[var(--text-muted)]">
              {eth?.latest_date ? new Date(eth.latest_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
            </div>
          </div>
          {eth?.ytd_flows != null && (
            <div className="text-[9px] text-[var(--text-disabled)]">
              YTD: <span className={eth.ytd_flows >= 0 ? 'text-[var(--accent-green)]/60' : 'text-[var(--accent-red)]/60'}>
                {eth.ytd_flows >= 0 ? '+' : ''}{eth.ytd_flows.toFixed(0)}M
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Web3Dashboard({
  dd, catBoxes, TC, ago, fmt, fmtN, items, ts,
}: {
  dd: any; catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; fmt: (n: number) => string; fmtN: (n: number) => string;
  items: any[]; ts: (iso: string) => string;
}) {
  const cFG = dd?.cryptoFG?.data?.[0];
  const fgVal = cFG ? Number(cFG.value) || 0 : 0;
  const fgLabel = cFG?.value_classification || '';
  const web3Cats = catBoxes.filter((c: any) => ['crypto'].includes(c.id));
  const cmc = dd?.crypto || {};
  const mcap = cmc.total_mcap || 0;
  const mcapChg = cmc.mcap_change_24h || 0;
  const exVol = dd?.exchangeVol || {};
  const volHistory = exVol.vol_history || [];
  const volHover = useChartHover(volHistory as ChartPoint[]);
  const [chainView, setChainView] = useState<'tvl' | 'dominance'>('tvl');

  // DEX dominance — compute % share from existing data
  const totalVol = dd?.totalVolume24h || 0;
  const dexDominance = ((dd?.volume || []) as any[]).map((v: any) => ({
    ...v,
    dominance: totalVol > 0 ? (v.volume24h / totalVol * 100) : 0,
  })).sort((a: any, b: any) => b.volume24h - a.volume24h);

  // Revenue data
  const revenue = (dd?.revenue || []) as any[];

  // Stablecoin chain breakdown from raw data
  const stableChains = dd?.stablecoinChains || [];

  const fgColor = fgVal > 60 ? 'text-[var(--accent-green)]' : fgVal < 35 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-amber)]';

  return (
    <div className="space-y-5">
      <CryptoFrontierSignals items={items} ts={ts} />

      {/* -- Artemis Weekly Newsletter -- */}
      <ArtemisWeeklyCard dd={dd} />

      {/* -- Market Cap Banner -- */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 bg-gradient-to-r from-[var(--accent-purple)]/[0.04] via-[var(--accent-cyan)]/[0.04] to-transparent">
        {mcap ? (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">Total Crypto Market Cap</div>
              <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums"><AnimatedValue value={mcap} format={fmtBig} className="tabular-nums" /></div>
              <div className={`text-xs font-semibold mt-1 ${mcapChg >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                {mcapChg ? `${mcapChg >= 0 ? '+' : ''}${mcapChg.toFixed(1)}%` : ''} <span className="text-[var(--text-muted)] font-normal">24h</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">Fear & Greed</div>
                  <div className={`text-lg font-bold tabular-nums ${fgColor}`}>{fgVal || '--'}</div>
                  <div className={`text-[10px] ${fgColor}/60`}>{fgLabel || '···'}</div>
                </div>
                <div className="relative w-3 h-16 bg-gradient-to-t from-red-500/40 via-amber-500/40 to-emerald-500/40 rounded-full overflow-hidden">
                  <div className="absolute left-0 right-0 h-[3px] bg-white rounded-full transition-all duration-500"
                    style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }} />
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-xs text-[var(--text-tertiary)]">BTC Dom{' '}
                  <span className="text-[var(--text-secondary)] tabular-nums">
                    {cmc.btc_dominance != null ? `${cmc.btc_dominance.toFixed(1)}%` : <SkeletonBlock className="h-3 w-10 inline-block align-middle" />}
                  </span>
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">ETH Dom{' '}
                  <span className="text-[var(--text-secondary)] tabular-nums">
                    {cmc.eth_dominance != null ? `${cmc.eth_dominance.toFixed(1)}%` : <SkeletonBlock className="h-3 w-10 inline-block align-middle" />}
                  </span>
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">24h Vol{' '}
                  <span className="text-[var(--text-secondary)] tabular-nums">
                    {cmc.total_volume ? fmtBig(cmc.total_volume) : <SkeletonBlock className="h-3 w-14 inline-block align-middle" />}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            <div className="skeleton-shimmer h-3 w-40 rounded" />
            <div className="skeleton-shimmer h-8 w-48 rounded" />
            <div className="skeleton-shimmer h-3 w-24 rounded" />
          </div>
        )}
        {volHistory.length > 1 && (
          <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px]">Volume Sparkline (1Y)</div>
              <span className="text-[10px] text-[var(--text-muted)]">{volHistory.length} days</span>
            </div>
            <div className="relative sparkline-container" onMouseMove={volHover.onMove} onMouseLeave={volHover.onLeave}>
              <svg className="w-full h-12" viewBox={`0 0 ${volHistory.length} 48`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="totalVolGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {(() => {
                  const pts = volHistory;
                  const max = Math.max(...pts.map((d: any) => d.v));
                  const min = Math.min(...pts.map((d: any) => d.v));
                  const range = max - min || 1;
                  const points = pts.map((d: any, i: number) =>
                    `${(i / (pts.length - 1)) * pts.length},${48 - ((d.v - min) / range) * 40 - 4}`
                  ).join(' ');
                  const areaPoints = points + ` ${pts.length - 1},48 0,48`;
                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#totalVolGrad)" />
                      <polyline points={points} fill="none" stroke="#eab308" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </>
                  );
                })()}
              </svg>
              {volHover.hover && (
                <div className="absolute pointer-events-none bg-[var(--bg-elevated)] border border-[var(--border-hover)] rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg z-10"
                  style={{ left: Math.min(volHover.hover.x + 8, 400), top: Math.max(0, volHover.hover.y - 40) }}>
                  <div className="text-[var(--text-primary)] font-semibold">{formatValue(volHover.hover.point.v)}</div>
                  <div className="text-[var(--text-muted)]">{formatDate(volHover.hover.point.t)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* -- ETF Flows (BTC + ETH) -- */}
      <ETFFlowsCard etf={dd?.etfFlows} />

      {/* -- TVL + DEX Dominance -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* TVL by Chain */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[var(--accent-purple)] uppercase tracking-[1.5px] font-bold">
              {chainView === 'tvl' ? 'TVL by Chain' : 'Chain Dominance'}
            </div>
            <div className="flex gap-0.5 bg-[var(--bg-deep)] rounded-lg p-0.5 border border-[var(--border-default)]">
              <button onClick={() => setChainView('tvl')}
                className={`text-[10px] px-2 py-1 rounded-md transition-colors ${chainView === 'tvl' ? 'bg-white/[0.10] text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}>TVL</button>
              <button onClick={() => setChainView('dominance')}
                className={`text-[10px] px-2 py-1 rounded-md transition-colors ${chainView === 'dominance' ? 'bg-white/[0.10] text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}>Dom</button>
            </div>
          </div>
          <div className="space-y-2">
            {(dd?.tvl || []).length > 0 ? (
              chainView === 'tvl' ? (
                (dd.tvl as any[]).slice(0, 8).map((c: any, i: number) => {
                  const maxTvl = (dd.tvl as any[])[0]?.tvl || 1;
                  const pct = ((c.tvl / maxTvl) * 100).toFixed(0);
                  const chg = c.change_1d || 0;
                  return (
                    <div key={i} className="flex items-center gap-2.5 text-xs group">
                      <a href={`https://defillama.com/chain/${c.name}`} target="_blank" rel="noopener noreferrer"
                        className="w-20 text-[var(--text-tertiary)] truncate flex-shrink-0 hover:text-[var(--accent-purple)] transition-colors">
                        {c.name}
                        <svg className="inline-block w-2.5 h-2.5 ml-0.5 opacity-40 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                      <div className="flex-1 h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)]/70 to-[var(--accent-cyan)]/60 transition-all duration-700"
                          style={{ width: `${pct}%` }} />
                      </div>
                      <span className={`w-10 text-right tabular-nums flex-shrink-0 text-[10px] font-medium ${chg >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                        {chg !== 0 ? `${chg >= 0 ? '+' : ''}${chg.toFixed(1)}%` : ''}
                      </span>
                    </div>
                  );
                })
              ) : (
                (dd.dominance || []).slice(0, 8).map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    <a href={`https://defillama.com/chain/${d.name}`} target="_blank" rel="noopener noreferrer"
                      className="w-20 text-[var(--text-tertiary)] truncate flex-shrink-0 hover:text-[var(--accent-purple)] transition-colors">{d.name}</a>
                    <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)]/40 to-[var(--accent-cyan)]/40"
                        style={{ width: `${Math.min(100, parseFloat(d.pct) || 0)}%` }} />
                    </div>
                    <span className="w-12 text-right tabular-nums text-[var(--text-tertiary)] flex-shrink-0">{d.pct}</span>
                  </div>
                ))
              )
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <svg className="w-6 h-6 text-[var(--accent-purple)]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
                <span className="text-[var(--text-disabled)] text-xs">TVL data loading from DeFi Llama...</span>
              </div>
            )}
          </div>
          <div className="mt-3 text-[9px] text-[var(--text-disabled)] text-right">via DeFi Llama</div>
        </div>

        {/* DEX Volume — Dune charts */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">DEX Volume</div>
            <span className="text-[10px] text-[var(--text-muted)]">via Dune · 26 weeks</span>
          </div>
          <VolumeChart data={dd?.dexMetrics?.weekly || []} loading={!dd?.dexMetrics} />
          <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-2">24h Chain Volume</div>
            <ChainVolumeBar data={dd?.dexMetrics?.chains || []} loading={!dd?.dexMetrics} />
          </div>
        </div>
      </div>

      {/* -- REV + Stablecoins -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* REV — Protocol Revenue */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[var(--accent-green)] uppercase tracking-[1.5px] font-bold">Revenue (REV · 24h)</div>
            <span className="text-[9px] text-[var(--text-disabled)]">via DeFi Llama</span>
          </div>
          <div className="space-y-2">
            {revenue.length > 0 ? (
              revenue.slice(0, 6).map((r: any, i: number) => {
                const maxRev = revenue[0]?.revenue24h || 1;
                const pct = ((r.revenue24h / maxRev) * 100).toFixed(0);
                return (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    <span className="w-5 tabular-nums text-[var(--text-disabled)] text-right flex-shrink-0">#{i + 1}</span>
                    <span className="w-24 text-[var(--text-tertiary)] truncate flex-shrink-0">{r.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-green)]/60 to-[var(--accent-green)]/20"
                        style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-20 text-right tabular-nums text-[var(--text-secondary)] flex-shrink-0 text-[10px] font-medium">
                      {fmtCompact(r.revenue24h)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <span className="text-[var(--text-disabled)] text-xs">Revenue data loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Stablecoins */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <div className="text-xs text-[var(--accent-amber)] uppercase tracking-[1.5px] font-bold mb-1">Stablecoin MCap</div>
          <div className="text-xl font-bold tabular-nums text-[var(--text-primary)] mb-3">
            {dd?.stablecoins?.length ? fmtCurrency(dd.stablecoins.reduce((s: number, sc: any) => s + (sc.circulating || 0), 0)) : <div className="skeleton-shimmer h-7 w-28 rounded" />}
          </div>
          <div className="space-y-1.5">
            {(dd?.stablecoins || []).slice(0, 6).map((sc: any, i: number) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-[var(--text-tertiary)]">{sc.name}</span>
                <span className="text-[var(--text-secondary)] tabular-nums">{fmtCurrency(sc.circulating)}</span>
              </div>
            ))}
          </div>
          {stableChains.length > 0 && (
            <>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mt-4 mb-2 border-t border-[var(--border-default)] pt-3">By Chain</div>
              <div className="space-y-1.5">
                {stableChains.slice(0, 5).map((sc: any, i: number) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[var(--text-tertiary)]">{sc.chain || sc.name}</span>
                    <span className="text-[var(--text-secondary)] tabular-nums">{fmtCurrency(sc.circulating)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="mt-3 text-[9px] text-[var(--text-disabled)] text-right">via DeFi Llama</div>
        </div>
      </div>

      {/* -- Fees + Polymarket -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Fees 24h */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
          <div className="text-xs text-[var(--accent-amber)] uppercase tracking-[1.5px] font-bold mb-3">Fees (24h)</div>
          <div className="text-[9px] text-[var(--text-disabled)] -mt-2 mb-3">via DeFi Llama</div>
          <div className="space-y-1.5">
            {(dd?.fees || []).length > 0 ? (
              (dd.fees as any[]).slice(0, 6).map((f: any, i: number) => {
                const slug = f.name.toLowerCase().replace(/\s+/g, '-');
                return (
                <div key={i} className="flex justify-between text-xs hover:bg-white/[0.02] px-1 py-0.5 rounded transition-colors">
                  <a href={`https://defillama.com/protocol/${slug}`} target="_blank" rel="noopener noreferrer"
                    className="text-[var(--text-tertiary)] truncate hover:text-[var(--accent-amber)] transition-colors">{f.name}</a>
                  <span className="text-[var(--text-secondary)] tabular-nums">{fmt(f.fees24h)}</span>
                </div>
                );
              })
            ) : (
              <div className="text-[var(--text-disabled)] text-xs italic py-4 text-center">Fees data loading... Refreshes automatically</div>
            )}
          </div>
        </div>

        {/* Polymarket */}
        <PolymarketPanel markets={dd?.polymarket || []} />
      </div>

      {/* -- DEX × Chain Matrix -- */}
      {dd?.dexMatrix?.matrix?.length > 0 && (
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-cyan)]/[0.06] to-transparent">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">DEX × Chain Matrix</span>
              <span className="text-[9px] text-[var(--text-disabled)]">via DeFiLlama per-chain</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">
              {(dd.dexMatrix.matrix || []).length} protocols × {(dd.dexMatrix.chains || []).length} chains
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--border-default)] bg-white/[0.015]">
                  <th className="text-left px-4 py-2.5 text-[var(--text-muted)] font-medium uppercase tracking-wider text-[10px]">Protocol</th>
                  {((dd.dexMatrix.chains || []) as any[]).slice(0, 6).map((c: any) => (
                    <th key={c.chain} className="text-right px-3 py-2.5 text-[var(--text-muted)] font-medium uppercase tracking-wider text-[10px]">
                      {c.chain}
                      <span className={`block text-[9px] font-normal ${c.change_1d >= 0 ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                        {c.change_1d >= 0 ? '+' : ''}{c.change_1d?.toFixed(1)}%
                      </span>
                    </th>
                  ))}
                  <th className="text-right px-3 py-2.5 text-[var(--accent-cyan)] font-medium uppercase tracking-wider text-[10px]">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {((dd.dexMatrix.matrix || []) as any[]).slice(0, 10).map((row: any, i: number) => (
                  <tr key={i} className={`hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? 'bg-white/[0.005]' : ''}`}>
                    <td className="px-4 py-2.5 text-[var(--text-secondary)] font-medium truncate max-w-[160px]">{row.protocol}</td>
                    {((dd.dexMatrix.chains || []) as any[]).slice(0, 6).map((c: any) => {
                      const val = row[c.chain] || 0;
                      const maxInRow = Math.max(...((dd.dexMatrix.chains || []) as any[]).slice(0, 6).map((ch: any) => row[ch.chain] || 0), 1);
                      const pct = val / maxInRow;
                      const isMax = val > 0 && val >= maxInRow * 0.9;
                      return (
                        <td key={c.chain} className="px-3 py-2.5 text-right">
                          <span className={`tabular-nums text-[11px] ${isMax ? 'text-[var(--accent-cyan)] font-semibold' : 'text-[var(--text-tertiary)]'}`}>
                            {val > 1e6 ? `$${(val/1e6).toFixed(1)}M` : val > 1e3 ? `$${(val/1e3).toFixed(0)}K` : val > 0 ? `$${val.toFixed(0)}` : '·'}
                          </span>
                          {val > 0 && <div className="h-0.5 mt-0.5 rounded-full bg-white/[0.04]"><div className="h-full rounded-full bg-[var(--accent-cyan)]/30" style={{width: `${Math.max(pct*100, 2)}%`}} /></div>}
                        </td>
                      );
                    })}
                    <td className="px-3 py-2.5 text-right">
                      <span className="tabular-nums text-[11px] text-[var(--accent-cyan)] font-semibold">
                        {row.total_vol > 1e6 ? `$${(row.total_vol/1e6).toFixed(1)}M` : row.total_vol > 1e3 ? `$${(row.total_vol/1e3).toFixed(0)}K` : `$${row.total_vol.toFixed(0)}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-[var(--border-default)] text-[9px] text-[var(--text-disabled)] text-right">
            Updated: {dd.dexMatrix?.updated_at ? new Date(dd.dexMatrix.updated_at).toLocaleString() : '...'}
          </div>
        </div>
      )}

      {/* -- Category Box: Crypto items -- */}
      {web3Cats[0] && <CategoryBox cat={web3Cats[0]} ago={ago} TC={TC} />}
    </div>
  );
}
