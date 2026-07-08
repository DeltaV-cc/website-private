/* ================================================================
   IntelHub — Web3 Dashboard (v2)
   TVL + Dominance merged · Fees fixed · BTC trend chart
   ================================================================ */
'use client';

import { BarChart, CategoryBox } from './Shared';
import CryptoLeaders from './CryptoLeaders';

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
  const web3Cats = catBoxes.filter((c: any) => ['crypto'].includes(c.id));
  const totalVol = dd?.totalVolume24h || 0;
  const cmc = dd?.crypto || {};
  const mcap = cmc.total_mcap || 0;
  const mcapChg = cmc.mcap_change_24h || 0;
  const btcTrend = dd?.btcTrend || []; // [{t, v}] for sparkline

  return (
    <div className="space-y-4">
      {/* ── Total Market Cap Banner ── */}
      <div className="rounded-2xl border border-[#222] bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-blue-500/5 p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-[#ededed]/30 uppercase tracking-[.15em] mb-1">Total Crypto Market Cap</div>
            <div className="text-2xl font-bold text-[#ededed]/90 tabular-nums">{mcap ? fmtBig(mcap) : '...'}</div>
            <div className={`text-xs font-semibold mt-1 ${mcapChg >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {mcapChg ? `${mcapChg >= 0 ? '+' : ''}${mcapChg.toFixed(1)}%` : ''} <span className="text-[#ededed]/20 font-normal">24h</span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-[11px] text-[#ededed]/30">BTC Dom <span className="text-[#ededed]/50 tabular-nums">{cmc.btc_dominance?.toFixed(1) || '...'}%</span></div>
            <div className="text-[11px] text-[#ededed]/30">ETH Dom <span className="text-[#ededed]/50 tabular-nums">{cmc.eth_dominance?.toFixed(1) || '...'}%</span></div>
            <div className="text-[11px] text-[#ededed]/30">24h Vol <span className="text-[#ededed]/50 tabular-nums">{cmc.total_volume ? fmtBig(cmc.total_volume) : '...'}</span></div>
          </div>
        </div>
        {/* BTC trend sparkline */}
        {btcTrend.length > 2 && (
          <div className="mt-3 pt-3 border-t border-white/[0.03]">
            <div className="text-[9px] text-[#ededed]/20 uppercase mb-1">BTC Market Cap Trend (1 Year)</div>
            <svg className="w-full h-16" viewBox={`0 0 ${btcTrend.length} 64`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f7931a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f7931a" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {(() => {
                const max = Math.max(...btcTrend.map((d: any) => d.v));
                const min = Math.min(...btcTrend.map((d: any) => d.v));
                const range = max - min || 1;
                const points = btcTrend.map((d: any, i: number) =>
                  `${(i / (btcTrend.length - 1)) * btcTrend.length},${64 - ((d.v - min) / range) * 56 - 4}`
                ).join(' ');
                const areaPoints = points + ` ${btcTrend.length - 1},64 0,64`;
                return (
                  <>
                    <polygon points={areaPoints} fill="url(#btcGrad)" />
                    <polyline points={points} fill="none" stroke="#f7931a" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  </>
                );
              })()}
            </svg>
          </div>
        )}
      </div>

      {/* ── TVL by Chain + Dominance (merged) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 rounded-2xl border border-[#222] bg-white/[0.01] p-4">
          <div className="text-xs text-purple-400 uppercase tracking-[.1em] font-bold mb-3">TVL by Chain</div>
          <div className="space-y-1.5">
            {(dd?.tvl || []).length > 0 ? (
              (dd.tvl as any[]).slice(0, 8).map((c: any, i: number) => {
                const maxTvl = (dd.tvl as any[])[0]?.tvl || 1;
                const pct = ((c.tvl / maxTvl) * 100).toFixed(0);
                const dom = dd?.dominance?.find((d: any) => d.name === c.name);
                return (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="w-24 text-[#ededed]/45 truncate flex-shrink-0">{c.name}</span>
                    <div className="flex-1 h-3 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-500/60 to-blue-500/60"
                        style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-16 text-right tabular-nums text-[#ededed]/50 flex-shrink-0">{dom?.pct || '...'}</span>
                  </div>
                );
              })
            ) : (
              <div className="text-[#ededed]/15 text-xs italic py-4 text-center">Loading...</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Volume + Stablecoins */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
              <div className="text-xs text-cyan-400 uppercase tracking-[.1em] font-bold mb-2">DEX Volume</div>
              <div className="text-xl font-bold tabular-nums text-[#ededed]/80">{fmt(totalVol)}</div>
              <div className="text-[10px] text-[#ededed]/20 mt-1">24h</div>
              <div className="mt-3 space-y-1">
                {(dd?.volume || []).slice(0, 5).map((v: any, i: number) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="text-[#ededed]/35 truncate">{v.name}</span>
                    <span className="text-[#ededed]/55 tabular-nums">{fmt(v.volume24h)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
              <div className="text-xs text-emerald-400 uppercase tracking-[.1em] font-bold mb-3">Stablecoins</div>
              <div className="space-y-1.5">
                {(dd?.stablecoins || []).length > 0 ? (
                  (dd.stablecoins as any[]).map((s: any, i: number) => (
                    <div key={i} className="flex justify-between text-[11px]">
                      <span className="text-[#ededed]/45 truncate">{s.name}</span>
                      <span className="text-[#ededed]/65 tabular-nums">{fmt(s.circulating)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[#ededed]/15 text-xs italic">Loading...</div>
                )}
              </div>
            </div>
          </div>

          {/* Fees (24h) — uses overview/fees, lightweight refetch if needed */}
          <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
            <div className="text-xs text-amber-400 uppercase tracking-[.1em] font-bold mb-3">Fees (24h)</div>
            <div className="space-y-1.5">
              {(dd?.fees || []).length > 0 ? (
                (dd.fees as any[]).slice(0, 6).map((f: any, i: number) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="text-[#ededed]/45 truncate">{f.name}</span>
                    <span className="text-[#ededed]/65 tabular-nums">{fmt(f.fees24h)}</span>
                  </div>
                ))
              ) : (
                <div className="text-[#ededed]/15 text-xs italic">Fees data loading (large payload)...</div>
              )}
            </div>
          </div>

          {/* Polymarket */}
          {dd?.polymarket?.length > 0 && (
            <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#222] bg-[#111]">
                <div className="text-xs text-pink-400 uppercase tracking-[.1em] font-bold">Polymarket</div>
              </div>
              <div className="grid grid-cols-[1fr_70px_70px] gap-2 px-4 py-2 border-b border-white/[0.03] bg-[#111] text-[10px] text-[#ededed]/20 uppercase tracking-wider font-semibold">
                <div>Market</div><div className="text-right">Vol</div><div className="text-right">Liq</div>
              </div>
              {dd.polymarket.slice(0, 5).map((m: any, i: number) => (
                <a key={i} href={`https://polymarket.com/event/${m.slug}`} target="_blank" rel="noopener noreferrer"
                  className={`grid grid-cols-[1fr_70px_70px] gap-2 px-4 py-2 border-b border-[#222] last:border-0 hover:bg-[#111] ${i % 2 === 1 ? 'bg-[#0a0a0a]' : ''}`}>
                  <div className="text-[11px] text-[#ededed]/55 hover:text-[#ededed]/75 truncate">{m.title}</div>
                  <div className="text-[10px] text-right text-[#ededed]/25 tabular-nums">{fmtN(m.volume)}</div>
                  <div className="text-[10px] text-right text-[#ededed]/20 tabular-nums">{fmtN(m.liquidity)}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <CategoryBox cat={web3Cats[0]} ago={ago} TC={TC} />
      <CryptoLeaders items={items} ts={ts} />
    </div>
  );
}
