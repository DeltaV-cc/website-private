/* ================================================================
   IntelHub — Web3 Dashboard (v3)
   F&G gauge · TVL · DEX+CEX volume · Fees · Crypto ticker
   ================================================================ */
'use client';

import { useState, useMemo } from 'react';
import { BarChart, CategoryBox, SkeletonPrice, SkeletonBlock } from './Shared';
import CryptoLeaders from './CryptoLeaders';
import CryptoFrontierSignals from './CryptoFrontierSignals';
import { useChartHover, formatDate, formatValue, ChartPoint } from './ChartHover';
import AnimatedValue from './AnimatedValue';

function fmtBig(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
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
  const totalVol = dd?.totalVolume24h || 0;
  const cmc = dd?.crypto || {};
  const mcap = cmc.total_mcap || 0;
  const mcapChg = cmc.mcap_change_24h || 0;
  const btcTrend = dd?.btcTrend || [];
  const btcHover = useChartHover(btcTrend as ChartPoint[]);
  const exVol = dd?.exchangeVol || {};
  const volHistory = exVol.vol_history || [];
  const volHover = useChartHover(volHistory as ChartPoint[]);

  // Chain comparison toggle: 'tvl' or 'dominance'
  const [chainView, setChainView] = useState<'tvl' | 'dominance'>('tvl');
  // BTC chart date range
  const [btcRange, setBtcRange] = useState<'1W'|'1M'|'3M'|'1Y'|'ALL'>('1Y');

  // Filter BTC trend by date range
  const filteredBtcTrend = useMemo(() => {
    if (!btcTrend.length) return [];
    const now = Date.now();
    const ranges: Record<string, number> = { '1W': 7, '1M': 30, '3M': 90, '1Y': 365 };
    const days = ranges[btcRange];
    if (!days) return btcTrend; // ALL
    const cutoff = now - days * 86400 * 1000;
    return btcTrend.filter((d: any) => {
      const ts = new Date(d.t).getTime();
      return ts >= cutoff;
    });
  }, [btcTrend, btcRange]);
  const filteredBtcHover = useChartHover(filteredBtcTrend as ChartPoint[]);

  return (
    <div className="space-y-4">
      {/* ── Crypto X Leaders Ticker ── */}
      <CryptoFrontierSignals items={items} ts={ts} />

      {/* ── Total Market Cap Banner ── */}
      <div className="rounded-2xl border border-[#222] bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-blue-500/5 p-5">
        {mcap ? (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-[#ededed]/30 uppercase tracking-[.15em] mb-1">Total Crypto Market Cap</div>
              <div className="text-2xl font-bold text-[#ededed]/90 tabular-nums transition-all duration-300"><AnimatedValue value={mcap} format={fmtBig} className="tabular-nums" /></div>
              <div className={`text-xs font-semibold mt-1 ${mcapChg >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {mcapChg ? `${mcapChg >= 0 ? '+' : ''}${mcapChg.toFixed(1)}%` : ''} <span className="text-[#ededed]/20 font-normal">24h</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[10px] text-[#ededed]/25 uppercase">Fear & Greed</div>
                  <div className={`text-lg font-bold tabular-nums transition-all duration-300 ${fgVal > 60 ? 'text-emerald-400' : fgVal < 35 ? 'text-red-400' : 'text-amber-400'}`}>
                    {fgVal || '--'}
                  </div>
                  <div className={`text-[10px] ${fgVal > 60 ? 'text-emerald-400/60' : fgVal < 35 ? 'text-red-400/60' : 'text-amber-400/60'}`}>
                    {fgLabel || '···'}
                  </div>
                </div>
                <div className="relative w-3 h-16 bg-gradient-to-t from-red-500/40 via-amber-500/40 to-emerald-500/40 rounded-full overflow-hidden">
                  <div className="absolute left-0 right-0 h-[3px] bg-white rounded-full transition-all duration-500"
                    style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }} />
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-xs text-[#ededed]/30">BTC Dom{' '}
                  <span className="text-[#ededed]/50 tabular-nums">
                    {cmc.btc_dominance != null ? `${cmc.btc_dominance.toFixed(1)}%` : <SkeletonBlock className="h-3 w-10 inline-block align-middle" />}
                  </span>
                </div>
                <div className="text-xs text-[#ededed]/30">ETH Dom{' '}
                  <span className="text-[#ededed]/50 tabular-nums">
                    {cmc.eth_dominance != null ? `${cmc.eth_dominance.toFixed(1)}%` : <SkeletonBlock className="h-3 w-10 inline-block align-middle" />}
                  </span>
                </div>
                <div className="text-xs text-[#ededed]/30">24h Vol{' '}
                  <span className="text-[#ededed]/50 tabular-nums">
                    {cmc.total_volume ? fmtBig(cmc.total_volume) : <SkeletonBlock className="h-3 w-14 inline-block align-middle" />}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            <SkeletonBlock className="h-3 w-40" />
            <SkeletonBlock className="h-8 w-48" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
        )}
        {filteredBtcTrend.length > 1 && (
          <div className="mt-3 pt-3 border-t border-white/[0.03]">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[10px] text-[#ededed]/20 uppercase">BTC Market Cap Trend</div>
              <div className="flex gap-0.5">
                {(['1W','1M','3M','1Y','ALL'] as const).map(r => (
                  <button key={r} onClick={() => setBtcRange(r)}
                    className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                      btcRange === r ? 'bg-white/[0.08] text-[#ededed]/70' : 'text-[#ededed]/25 hover:text-[#ededed]/45'
                    }`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="relative" onMouseMove={filteredBtcHover.onMove} onMouseLeave={filteredBtcHover.onLeave}>
              <svg className="w-full h-16" viewBox={`0 0 ${filteredBtcTrend.length} 64`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f7931a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f7931a" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {(() => {
                  const max = Math.max(...filteredBtcTrend.map((d: any) => d.v));
                  const min = Math.min(...filteredBtcTrend.map((d: any) => d.v));
                  const range = max - min || 1;
                  const points = filteredBtcTrend.map((d: any, i: number) =>
                    `${(i / (filteredBtcTrend.length - 1)) * filteredBtcTrend.length},${64 - ((d.v - min) / range) * 56 - 4}`
                  ).join(' ');
                  const areaPoints = points + ` ${filteredBtcTrend.length - 1},64 0,64`;
                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#btcGrad)" />
                      <polyline points={points} fill="none" stroke="#f7931a" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </>
                  );
                })()}
              </svg>
              {filteredBtcHover.hover && (
                <div className="absolute pointer-events-none bg-[#1a1a1a] border border-[#333] rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg"
                  style={{ left: Math.min(filteredBtcHover.hover.x + 8, window.innerWidth - 180), top: Math.max(0, filteredBtcHover.hover.y - 40) }}>
                  <div className="text-[#ededed]/80 font-semibold">{formatValue(filteredBtcHover.hover.point.v)}</div>
                  {filteredBtcHover.hover.changeFromStart != null && (
                    <div className={`text-[10px] ${filteredBtcHover.hover.changeFromStart >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {filteredBtcHover.hover.changeFromStart >= 0 ? '+' : ''}{filteredBtcHover.hover.changeFromStart.toFixed(1)}%
                    </div>
                  )}
                  <div className="text-[#ededed]/30">{formatDate(filteredBtcHover.hover.point.t)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── TVL by Chain + Dominance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 rounded-2xl border border-[#222] bg-white/[0.01] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-purple-400 uppercase tracking-[.1em] font-bold">
              {chainView === 'tvl' ? 'TVL by Chain' : 'Chain Dominance'}
            </div>
            <div className="flex gap-0.5 bg-[#111] rounded-lg p-0.5 border border-[#222]">
              <button onClick={() => setChainView('tvl')}
                className={`text-[10px] px-2 py-1 rounded transition-colors ${chainView === 'tvl' ? 'bg-white/[0.08] text-[#ededed]/70' : 'text-[#ededed]/25 hover:text-[#ededed]/45'}`}>TVL</button>
              <button onClick={() => setChainView('dominance')}
                className={`text-[10px] px-2 py-1 rounded transition-colors ${chainView === 'dominance' ? 'bg-white/[0.08] text-[#ededed]/70' : 'text-[#ededed]/25 hover:text-[#ededed]/45'}`}>Dom</button>
            </div>
          </div>
          <div className="space-y-1.5">
            {(dd?.tvl || []).length > 0 ? (
              chainView === 'tvl' ? (
                (dd.tvl as any[]).slice(0, 8).map((c: any, i: number) => {
                  const maxTvl = (dd.tvl as any[])[0]?.tvl || 1;
                  const pct = ((c.tvl / maxTvl) * 100).toFixed(0);
                  const chg = c.change_1d || 0;
                  const slug = c.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <a href={`https://defillama.com/chain/${c.name}`} target="_blank" rel="noopener noreferrer"
                        className="w-24 text-[#ededed]/45 truncate flex-shrink-0 hover:text-purple-400 transition-colors">
                        {c.name}
                        <svg className="inline-block w-2.5 h-2.5 ml-0.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                      <div className="flex-1 h-3 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-500/60 to-blue-500/60"
                          style={{ width: `${pct}%` }} />
                      </div>
                      <span className={`w-10 text-right tabular-nums flex-shrink-0 text-[10px] ${chg >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {chg !== 0 ? `${chg >= 0 ? '+' : ''}${chg.toFixed(1)}%` : ''}
                      </span>
                    </div>
                  );
                })
              ) : (
                // Dominance view
                (dd.dominance || []).slice(0, 8).map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <a href={`https://defillama.com/chain/${d.name}`} target="_blank" rel="noopener noreferrer"
                      className="w-24 text-[#ededed]/45 truncate flex-shrink-0 hover:text-purple-400 transition-colors">{d.name}</a>
                    <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-500/40 to-blue-500/40"
                        style={{ width: `${Math.min(100, parseFloat(d.pct) || 0)}%` }} />
                    </div>
                    <span className="w-12 text-right tabular-nums text-[#ededed]/40 flex-shrink-0">{d.pct}</span>
                  </div>
                ))
              )
            ) : (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <svg className="w-5 h-5 text-purple-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
                <span className="text-[#ededed]/20 text-xs">TVL data loading from DeFi Llama...</span>
              </div>
            )}
          </div>
          <div className="mt-2 text-[9px] text-[#ededed]/10 text-right">via DeFi Llama</div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* DEX Volume + CEX Volume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
              <div className="text-xs text-cyan-400 uppercase tracking-[.1em] font-bold mb-2">DEX Volume</div>
              <div className="text-xl font-bold tabular-nums text-[#ededed]/80">{totalVol ? <AnimatedValue value={totalVol} format={fmt} className="tabular-nums" /> : <SkeletonBlock className="h-7 w-28" />}</div>
              <div className="text-[10px] text-[#ededed]/20 mt-1">24h</div>
              <div className="text-[9px] text-[#ededed]/10 mt-0.5">via DeFi Llama</div>
              <div className="mt-3 space-y-1">
                {(dd?.volume || []).slice(0, 5).map((v: any, i: number) => {
                  const isTop = i === 0;
                  const slug = v.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                  <div key={i} className={`flex items-center justify-between text-xs gap-2 ${isTop ? 'bg-cyan-500/[0.05] -mx-2 px-2 py-0.5 rounded border border-cyan-500/10' : ''}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`tabular-nums w-4 shrink-0 ${isTop ? 'text-cyan-400/80' : 'text-[#ededed]/20'}`}>#{i + 1}</span>
                      <a href={`https://defillama.com/protocol/${slug}`} target="_blank" rel="noopener noreferrer"
                        className={`truncate max-w-[120px] sm:max-w-none hover:text-cyan-400 transition-colors ${isTop ? 'text-cyan-300/80 font-semibold' : 'text-[#ededed]/45'}`}>{v.name}</a>
                    </div>
                    <span className={`tabular-nums shrink-0 ${isTop ? 'text-cyan-300/80 font-semibold' : 'text-[#ededed]/65'}`}>{fmt(v.volume24h)}</span>
                  </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
              <div className="text-xs text-yellow-400 uppercase tracking-[.1em] font-bold mb-2">CEX Volume</div>
              <div className="text-xl font-bold tabular-nums text-[#ededed]/80">
                {exVol.total_vol_usd_24h ? <AnimatedValue value={exVol.total_vol_usd_24h} format={fmt} className="tabular-nums" /> : exVol.total_vol_btc_24h ? `${(exVol.total_vol_btc_24h).toFixed(0)} BTC` : <SkeletonBlock className="h-7 w-28" />}
              </div>
              <div className="text-[10px] text-[#ededed]/20 mt-1">24h</div>
              <div className="mt-3 space-y-1">
                {(exVol.exchanges || []).slice(0, 5).map((e: any, i: number) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#ededed]/35 truncate max-w-[120px] sm:max-w-none">{e.name}</span>
                    <span className="text-[#ededed]/55 tabular-nums">{e.vol_usd ? fmt(e.vol_usd) : e.score || <SkeletonBlock className="h-3 w-12 inline-block" />}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fees (24h) */}
          <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
            <div className="text-xs text-amber-400 uppercase tracking-[.1em] font-bold mb-3">Fees (24h)</div>
            <div className="text-[9px] text-[#ededed]/10 -mt-2 mb-2">via DeFi Llama</div>
            <div className="overflow-x-auto">
              {(dd?.fees || []).length > 0 ? (
                (dd.fees as any[]).slice(0, 6).map((f: any, i: number) => {
                  const slug = f.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                  <div key={i} className="flex justify-between text-xs">
                    <a href={`https://defillama.com/protocol/${slug}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#ededed]/45 truncate hover:text-amber-400 transition-colors">{f.name}</a>
                    <span className="text-[#ededed]/65 tabular-nums">{fmt(f.fees24h)}</span>
                  </div>
                  );
                })
              ) : (
                <div className="text-[#ededed]/15 text-xs italic py-4 text-center">Fees data loading (large payload)... Refreshes automatically</div>
              )}
            </div>
          </div>

          {/* Exchange Volume History */}
          <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#222] bg-gradient-to-r from-yellow-500/[0.06] via-[#111] to-[#111] flex items-center justify-between">
              <span className="text-xs text-yellow-400 uppercase tracking-[.1em] font-bold">Total Volume (24h)</span>
              <span className="text-[10px] text-[#ededed]/25">
                {cmc.total_volume ? fmtBig(cmc.total_volume) : <SkeletonBlock className="h-3 w-16 inline-block" />}
              </span>
            </div>
            {exVol.vol_history?.length > 2 && (
              <div className="px-4 py-3 border-b border-white/[0.02]">
                <div className="text-[10px] text-[#ededed]/20 uppercase mb-1">Crypto Volume History (1 Year, USD)</div>
                <div className="relative" onMouseMove={volHover.onMove} onMouseLeave={volHover.onLeave}>
                <svg className="w-full h-20" viewBox={`0 0 ${exVol.vol_history.length} 80`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#eab308" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#eab308" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {(() => {
                    const pts = exVol.vol_history;
                    const max = Math.max(...pts.map((d: any) => d.v));
                    const min = Math.min(...pts.map((d: any) => d.v));
                    const range = max - min || 1;
                    const points = pts.map((d: any, i: number) =>
                      `${(i / (pts.length - 1)) * pts.length},${80 - ((d.v - min) / range) * 72 - 4}`
                    ).join(' ');
                    const area = points + ` ${pts.length - 1},80 0,80`;
                    return (
                      <>
                        <polygon points={area} fill="url(#volGrad)" />
                        <polyline points={points} fill="none" stroke="#eab308" strokeWidth="1.2" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
                      </>
                    );
                  })()}
                  </svg>
                  {volHover.hover && (
                    <div className="absolute pointer-events-none bg-[#1a1a1a] border border-[#333] rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg"
                      style={{ left: Math.min(volHover.hover.x + 8, 200), top: Math.max(0, volHover.hover.y - 40) }}>
                      <div className="text-[#ededed]/80 font-semibold">{formatValue(volHover.hover.point.v)}</div>
                      <div className="text-[#ededed]/30">{formatDate(volHover.hover.point.t)}</div>
                    </div>
                  )}
                  </div>
                  </div>
                  )}
          </div>
        </div>
      </div>

      <CategoryBox cat={web3Cats[0]} ago={ago} TC={TC} />
      <CryptoLeaders items={items} ts={ts} />
    </div>
  );
}
