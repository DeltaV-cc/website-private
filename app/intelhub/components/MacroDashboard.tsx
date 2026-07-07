/* ================================================================
   IntelHub — Macro Dashboard (v3)
   USD/XXX Forex w/ 1M/1Y/10Y · Consolidated Market · Compact Patents
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { CategoryBox } from './Shared';

function fmtPct(v: number | null): string {
  if (v === null || v === undefined) return '···';
  const s = v >= 0 ? '+' : '';
  return `${s}${v.toFixed(1)}%`;
}

function Pct({ v }: { v: number | null }) {
  if (v === null || v === undefined) return <span className="text-[#ededed]/15 tabular-nums">···</span>;
  const color = v >= 0 ? 'text-emerald-400' : 'text-red-400';
  return <span className={`${color} tabular-nums`}>{fmtPct(v)}</span>;
}

export default function MacroDashboard({
  items, dd, patents, forex, catBoxes, TC, ago, fmt, fmtN,
}: {
  items: Item[]; dd: any; patents: PatentsData | null; forex: any;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; fmt: (n: number) => string; fmtN: (n: number) => string;
}) {
  const fgVal = dd?.fearGreed?.data?.[0] ? Number(dd.fearGreed.data[0].value) || 0 : 0;
  const fgLabel = dd?.fearGreed?.data?.[0]?.value_classification || '';
  const spx = dd?.indices?.spx;
  const csi = dd?.indices?.csi;
  const macroCat = catBoxes.find((c: any) => c.id === 'macro');
  const sciCat = catBoxes.find((c: any) => c.id === 'science');
  const forexPairs = forex && typeof forex === 'object' && !forex.rates
    ? ['EUR', 'JPY', 'GBP', 'CHF', 'CNY'].map(k => ({ label: k, ...(forex[k] || {}) }))
    : [];

  return (
    <div className="space-y-4">
      {/* ── Consolidated Market + Indices + F&G ── */}
      <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-[#111] flex items-center justify-between">
          <span className="text-xs text-cyan-400 uppercase tracking-[.15em] font-bold">Market</span>
          <div className="flex items-center gap-4">
            {/* F&G inline */}
            <div className="flex items-center gap-1.5">
              <div className="relative w-3 h-6 bg-gradient-to-t from-red-500/30 via-amber-500/30 to-emerald-500/30 rounded-full overflow-hidden">
                <div className="absolute left-0 right-0 h-[2px] bg-white rounded-full"
                  style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }} />
              </div>
              <span className={`text-[10px] font-bold ${fgVal > 60 ? 'text-emerald-400' : fgVal < 35 ? 'text-red-400' : 'text-amber-400'}`}>
                {fgVal || '--'}
              </span>
            </div>
          </div>
        </div>
        {/* SPX + CSI + Market Movers in one grid */}
        <div className="grid grid-cols-4 gap-0 divide-x divide-white/[0.04]">
          {/* SPX */}
          <div className="px-4 py-3">
            <div className="text-[10px] text-[#ededed]/30 mb-0.5">S&P 500</div>
            <div className="text-sm font-semibold text-[#ededed]/80 tabular-nums">{spx?.price || '...'}</div>
            <div className={`text-[10px] font-semibold mt-0.5 ${(spx?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {spx?.changePct || '...'} <span className="text-[#ededed]/20 font-normal">1D</span>
            </div>
          </div>
          {/* CSI 1000 */}
          <div className="px-4 py-3">
            <div className="text-[10px] text-[#ededed]/30 mb-0.5">CSI 1000</div>
            <div className="text-sm font-semibold text-[#ededed]/80 tabular-nums">{csi?.price || '...'}</div>
            <div className={`text-[10px] font-semibold mt-0.5 ${(csi?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {csi?.changePct || '...'} <span className="text-[#ededed]/20 font-normal">1D</span>
            </div>
          </div>
          {/* Market Movers (compact) */}
          <div className="px-4 py-3 col-span-2">
            <div className="text-[10px] text-[#ededed]/30 mb-2">Movers (24h)</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {patents?.marketMovers?.length ? (
                patents.marketMovers.slice(0, 6).map((m: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <span className="text-[#ededed]/50 truncate mr-1">{m.name}</span>
                    <span className={`font-semibold tabular-nums ${m.dir === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {m.change}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-[#ededed]/15 italic col-span-2">Awaiting data...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Forex: USD/XXX with 1M / 1Y / 10Y ── */}
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
                <th className="text-right px-3 py-2 font-semibold">Day</th>
                <th className="text-right px-3 py-2 font-semibold">1M</th>
                <th className="text-right px-3 py-2 font-semibold">1Y</th>
                <th className="text-right px-3 py-2 font-semibold">10Y</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {forexPairs.length > 0 ? forexPairs.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2 text-[#ededed]/60 font-medium">USD/{p.label}</td>
                  <td className="px-3 py-2 text-right text-[#ededed]/80 font-semibold tabular-nums">{p.rateStr || '...'}</td>
                  <td className="px-3 py-2 text-right"><Pct v={p.chgPct ? parseFloat(p.chgPct) : null} /></td>
                  <td className="px-3 py-2 text-right"><Pct v={p.p1M} /></td>
                  <td className="px-3 py-2 text-right"><Pct v={p.p1Y} /></td>
                  <td className="px-3 py-2 text-right"><Pct v={p.p10Y} /></td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-[#ededed]/15 italic">Loading forex data...</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Patents + Macro Feed side by side ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Patents (takes 2/3) */}
        <div className="md:col-span-2">
          {patents && <PatentsTable patents={patents} />}
        </div>
        {/* Macro feed (takes 1/3) */}
        <div>
          {macroCat && <CategoryBox cat={macroCat} ago={ago} TC={TC} compact />}
        </div>
      </div>

      {/* ── Science category ── */}
      {sciCat && <CategoryBox cat={sciCat} ago={ago} TC={TC} />}
    </div>
  );
}
