/* ================================================================
   IntelHub — Macro Dashboard (v5)
   Market: SPX · CSI · Gold · BTC · ETH + Forex + Category
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { CategoryBox, SkeletonPrice, SkeletonBlock, fmtNum } from './Shared';
import MarketNewsTicker from './MarketNewsTicker';
import AnimatedValue from './AnimatedValue';

export default function MacroDashboard({
  items, dd, patents, forex, catBoxes, TC, ago, ts,
}: {
  items: Item[]; dd: any; patents: PatentsData | null; forex: any;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; ts: (iso: string) => string;
}) {
  // TradFi F&G: {score, rating, date}
  const stockFG = dd?.fearGreed || {};
  const fgVal = (typeof stockFG.score === 'number') ? stockFG.score : 0;
  const fgLabel = stockFG.rating || '';
  const fgDate = stockFG.date || '';
  const spx = dd?.indices?.spx;
  const csi = dd?.indices?.csi;
  const gold = dd?.gold;
  const us10y = dd?.us10y;
  const crypto = dd?.crypto;
  const macroCat = catBoxes.find((c: any) => c.id === 'macro');
  const sciCat = catBoxes.find((c: any) => c.id === 'science');

  const fmtPct = (v: number | null | undefined) => {
    if (v == null) return <span className="text-[#ededed]/15 tabular-nums">···</span>;
    const c = v >= 0 ? 'text-emerald-400' : 'text-red-400';
    return <span className={`${c} tabular-nums text-xs`}>{v >= 0 ? '+' : ''}{v.toFixed(1)}%</span>;
  };

  const forexPairs = forex && typeof forex === 'object' ? (
    ['EUR', 'JPY', 'GBP', 'CHF', 'CNY'].map(k => ({ label: k, ...(forex[k] || {}) })).filter((p: any) => p.rateStr)
  ) : [];

  return (
    <div className="space-y-4">
      <MarketNewsTicker items={items} ts={ts} />

      {/* ── Market: Indices + Gold + Crypto ── */}
      <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-gradient-to-r from-cyan-500/[0.06] via-[#111] to-[#111] flex items-center justify-between">
          <span className="text-xs text-cyan-400 uppercase tracking-[.15em] font-bold">Market</span>
          <span className="text-[10px] text-[#ededed]/15">via Alpha Vantage / Yahoo</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-white/[0.04] overflow-hidden">
          {/* S&P 500 */}
          {spx ? (
            <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
              <div className="text-[10px] text-[#ededed]/30 mb-1">S&P 500</div>
              <div className="text-lg font-bold text-[#ededed]/90 tabular-nums transition-all duration-300">{spx.price}</div>
              <span className={`text-xs font-semibold ${spx.change >= 0 ? 'text-emerald-400' : spx.change < 0 ? 'text-red-400' : 'text-[#ededed]/20'}`}>
                {spx.changePct || ''}
              </span>
            </div>
          ) : <SkeletonPrice />}
          {/* CSI 1000 */}
          {csi ? (
            <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
              <div className="text-[10px] text-[#ededed]/30 mb-1">CSI 1000</div>
              <div className="text-lg font-bold text-[#ededed]/90 tabular-nums transition-all duration-300">{csi.price}</div>
              <span className={`text-xs font-semibold ${csi.change >= 0 ? 'text-emerald-400' : csi.change < 0 ? 'text-red-400' : 'text-[#ededed]/20'}`}>
                {csi.changePct || ''}
              </span>
            </div>
          ) : <SkeletonPrice />}
          {/* Gold */}
          {gold ? (
            <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
              <div className="text-[10px] text-[#ededed]/30 mb-1">Gold</div>
              <div className="text-lg font-bold text-[#ededed]/90 tabular-nums transition-all duration-300">${gold.price}</div>
              <span className={`text-xs font-semibold ${gold.change >= 0 ? 'text-emerald-400' : gold.change < 0 ? 'text-red-400' : 'text-[#ededed]/20'}`}>
                {gold.changePct || ''}
              </span>
            </div>
          ) : <SkeletonPrice />}
          {/* BTC */}
          {crypto?.btc_price != null ? (
            <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
              <div className="text-[10px] text-[#ededed]/30 mb-1">Bitcoin</div>
              <div className="text-lg font-bold text-[#ededed]/90 tabular-nums transition-all duration-300">
                ${fmtNum(crypto.btc_price)}
              </div>
              {crypto?.btc_change_24h != null ? (
                <span className={`text-xs font-semibold ${crypto.btc_change_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {crypto.btc_change_24h >= 0 ? '+' : ''}{crypto.btc_change_24h.toFixed(1)}%
                </span>
              ) : null}
            </div>
          ) : <SkeletonPrice />}
          {/* ETH */}
          {crypto?.eth_price != null ? (
            <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
              <div className="text-[10px] text-[#ededed]/30 mb-1">Ethereum</div>
              <div className="text-lg font-bold text-[#ededed]/90 tabular-nums transition-all duration-300">
                ${fmtNum(crypto.eth_price)}
              </div>
              {crypto?.eth_change_24h != null ? (
                <span className={`text-xs font-semibold ${crypto.eth_change_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {crypto.eth_change_24h >= 0 ? '+' : ''}{crypto.eth_change_24h.toFixed(1)}%
                </span>
              ) : null}
            </div>
          ) : <SkeletonPrice />}
          {/* 10Y US Treasury Yield */}
          {us10y ? (
            <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
              <div className="text-[10px] text-[#ededed]/30 mb-1">10Y Yield</div>
              <div className="text-lg font-bold text-[#ededed]/90 tabular-nums transition-all duration-300">{us10y.price}</div>
              <span className={`text-xs font-semibold ${us10y.change >= 0 ? 'text-red-400' : us10y.change < 0 ? 'text-emerald-400' : 'text-[#ededed]/20'}`}>
                {us10y.changePct || ''}
              </span>
            </div>
          ) : <SkeletonPrice />}
          {/* Fear & Greed (TradFi) */}
          <div className="px-4 py-3 hover:bg-white/[0.03] hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 transition-all duration-200 rounded-xl relative z-10">
            <div className="text-[10px] text-[#ededed]/30 mb-1">Fear & Greed</div>
            {typeof stockFG.score === 'number' ? (
              <>
                <div className={`text-lg font-bold tabular-nums transition-all duration-300 ${
                  fgVal <= 20 ? 'text-red-400' : fgVal <= 40 ? 'text-orange-400' : fgVal <= 60 ? 'text-amber-400' : fgVal <= 80 ? 'text-lime-400' : 'text-emerald-400'
                }`}>
                  {fgVal}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-xs font-semibold ${
                    fgVal <= 20 ? 'text-red-400/70' : fgVal <= 40 ? 'text-orange-400/70' : fgVal <= 60 ? 'text-amber-400/70' : fgVal <= 80 ? 'text-lime-400/70' : 'text-emerald-400/70'
                  }`}>{fgLabel}</span>
                </div>
              </>
            ) : (
              <div className="space-y-2 mt-1">
                <SkeletonBlock className="h-5 w-12" />
                <SkeletonBlock className="h-3 w-16" />
              </div>
            )}
            <div className="mt-2 h-1.5 bg-gradient-to-r from-red-500/40 via-amber-500/40 via-lime-500/40 to-emerald-500/40 rounded-full relative overflow-hidden">
              <div className="absolute top-0 bottom-0 w-1.5 bg-white/80 rounded-full transition-all duration-700"
                style={{ left: `${Math.max(2, Math.min(98, fgVal))}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Forex ── */}
      <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-gradient-to-r from-sky-500/[0.06] via-[#111] to-[#111]">
          <span className="text-xs text-sky-400 uppercase tracking-[.1em] font-bold">Forex (vs USD)</span>
        </div>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[#ededed]/25 uppercase tracking-wider border-b border-white/[0.03]">
                <th className="text-left px-4 py-2 font-semibold">Pair</th>
                <th className="text-right px-3 py-2 font-semibold">Rate</th>
                <th className="text-right px-3 py-2 font-semibold">Day Δ</th>
                <th className="text-right px-3 py-2 font-semibold hidden sm:table-cell">1M</th>
                <th className="text-right px-3 py-2 font-semibold hidden md:table-cell">1Y</th>
                <th className="text-right px-3 py-2 font-semibold hidden lg:table-cell">10Y</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {forexPairs.length > 0 ? forexPairs.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-[#ededed]/70 font-medium">USD/{p.label}</td>
                  <td className="px-3 py-2.5 text-right text-[#ededed]/85 font-semibold tabular-nums text-xs">{p.rateStr}</td>
                  <td className="px-3 py-2.5 text-right"><span className={`text-xs font-semibold tabular-nums ${(p.chgPct || '').startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{p.chgPct || '···'}</span></td>
                  <td className="px-3 py-2.5 text-right hidden sm:table-cell">{fmtPct(p.p1M)}</td>
                  <td className="px-3 py-2.5 text-right hidden md:table-cell">{fmtPct(p.p1Y)}</td>
                  <td className="px-3 py-2.5 text-right hidden lg:table-cell">{fmtPct(p.p10Y)}</td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="px-4 py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-4 h-4 text-sky-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[#ededed]/15 text-xs">Forex data will load after next build</span>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Patents + Macro feed ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
