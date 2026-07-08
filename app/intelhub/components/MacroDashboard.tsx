/* ================================================================
   IntelHub — Macro Dashboard (v4)
   Full numbers + % growth · Static data (no CORS)
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { CategoryBox } from './Shared';

export default function MacroDashboard({
  items, dd, patents, forex, catBoxes, TC, ago,
}: {
  items: Item[]; dd: any; patents: PatentsData | null; forex: any;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string;
}) {
  const fgVal = dd?.fearGreed?.data?.[0] ? Number(dd.fearGreed.data[0].value) || 0 : 0;
  const spx = dd?.indices?.spx;
  const csi = dd?.indices?.csi;
  const macroCat = catBoxes.find((c: any) => c.id === 'macro');
  const sciCat = catBoxes.find((c: any) => c.id === 'science');

  const fmtPct = (v: number | null | undefined) => {
    if (v == null) return <span className="text-[#ededed]/15 tabular-nums">···</span>;
    const c = v >= 0 ? 'text-emerald-400' : 'text-red-400';
    return <span className={`${c} tabular-nums text-[11px]`}>{v >= 0 ? '+' : ''}{v.toFixed(1)}%</span>;
  };

  // Build forex rows from static data
  const forexPairs = forex && typeof forex === 'object' ? (
    ['EUR', 'JPY', 'GBP', 'CHF', 'CNY'].map(k => ({ label: k, ...(forex[k] || {}) })).filter((p: any) => p.rateStr)
  ) : [];

  return (
    <div className="space-y-4">
      {/* ── Market + Indices (full numbers) ── */}
      <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-[#111] flex items-center justify-between">
          <span className="text-xs text-cyan-400 uppercase tracking-[.15em] font-bold">Market</span>
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-5 bg-gradient-to-t from-red-500/30 via-amber-500/30 to-emerald-500/30 rounded-full overflow-hidden">
              <div className="absolute left-0 right-0 h-[2px] bg-white rounded-full"
                style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }} />
            </div>
            <span className={`text-[10px] font-bold ${fgVal > 60 ? 'text-emerald-400' : fgVal < 35 ? 'text-red-400' : 'text-amber-400'}`}>
              F&G {fgVal || '--'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/[0.04]">
          {/* S&P 500 */}
          <div className="px-5 py-4">
            <div className="text-[10px] text-[#ededed]/30 mb-1">S&P 500</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#ededed]/90 tabular-nums">{spx?.price || '...'}</span>
              <span className={`text-xs font-semibold ${spx?.change >= 0 ? 'text-emerald-400' : spx?.change < 0 ? 'text-red-400' : 'text-[#ededed]/20'}`}>
                {spx?.changePct || ''}
              </span>
            </div>
            <div className="text-[10px] text-[#ededed]/15 mt-1">Yahoo Finance · 1D</div>
          </div>
          {/* CSI 1000 */}
          <div className="px-5 py-4">
            <div className="text-[10px] text-[#ededed]/30 mb-1">CSI 1000</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#ededed]/90 tabular-nums">{csi?.price || '...'}</span>
              <span className={`text-xs font-semibold ${csi?.change >= 0 ? 'text-emerald-400' : csi?.change < 0 ? 'text-red-400' : 'text-[#ededed]/20'}`}>
                {csi?.changePct || ''}
              </span>
            </div>
            <div className="text-[10px] text-[#ededed]/15 mt-1">Yahoo Finance · 1D</div>
          </div>
        </div>
      </div>

      {/* ── Forex: full numbers + % growth ── */}
      <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-[#111]">
          <span className="text-xs text-sky-400 uppercase tracking-[.1em] font-bold">Forex (vs USD)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-[#ededed]/25 uppercase tracking-wider border-b border-white/[0.03]">
                <th className="text-left px-4 py-2 font-semibold">Pair</th>
                <th className="text-right px-3 py-2 font-semibold">Rate</th>
                <th className="text-right px-3 py-2 font-semibold">Day Δ</th>
                <th className="text-right px-3 py-2 font-semibold">1M</th>
                <th className="text-right px-3 py-2 font-semibold">1Y</th>
                <th className="text-right px-3 py-2 font-semibold">10Y</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {forexPairs.length > 0 ? forexPairs.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-[#ededed]/70 font-medium">USD/{p.label}</td>
                  <td className="px-3 py-2.5 text-right text-[#ededed]/85 font-semibold tabular-nums text-xs">{p.rateStr}</td>
                  <td className="px-3 py-2.5 text-right"><span className={`text-[11px] font-semibold tabular-nums ${(p.chgPct || '').startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{p.chgPct || '···'}</span></td>
                  <td className="px-3 py-2.5 text-right">{fmtPct(p.p1M)}</td>
                  <td className="px-3 py-2.5 text-right">{fmtPct(p.p1Y)}</td>
                  <td className="px-3 py-2.5 text-right">{fmtPct(p.p10Y)}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#ededed]/15 italic">Forex data will load after next build</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-1.5 border-t border-white/[0.02] text-[9px] text-[#ededed]/15 text-right">Yahoo Finance · pre-fetched</div>
      </div>

      {/* ── Patents + Macro feed side by side ── */}
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
