/* ================================================================
   IntelHub — Macro Dashboard tab
   Compact F&G in Market box · CSI1000 · Fixed Forex
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import PatentsTable from './PatentsTable';
import { TileBox, CategoryBox } from './Shared';

export default function MacroDashboard({
  items, dd, patents, forex, catBoxes, TC, ago, fmt, fmtN,
}: {
  items: Item[]; dd: any; patents: PatentsData | null; forex: any;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; fmt: (n: number) => string; fmtN: (n: number) => string;
}) {
  const fgVal = dd?.fearGreed?.data?.[0] ? Number(dd.fearGreed.data[0].value) || 0 : 0;
  const fgLabel = dd?.fearGreed?.data?.[0]?.value_classification || '';
  const macroCats = catBoxes.filter((c: any) => ['macro', 'science'].includes(c.id));
  const spx = dd?.indices?.spx;
  const csi = dd?.indices?.csi;

  return (
    <div className="space-y-4">
      {/* ── Top row: Market (with inline F&G) + Forex + Indices ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Market Movers — with inline F&G mini-gauge */}
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between">
            <span className="text-xs text-cyan-400 uppercase tracking-[.15em] font-bold">Market</span>
            <div className="flex items-center gap-3">
              {/* F&G inline */}
              <div className="flex items-center gap-1.5">
                <div className="relative w-4 h-8 bg-gradient-to-t from-red-500/30 via-amber-500/30 to-emerald-500/30 rounded-full overflow-hidden">
                  <div className="absolute left-0 right-0 h-[3px] bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)] rounded-full"
                    style={{ bottom: `${Math.max(3, Math.min(97, fgVal))}%` }} />
                </div>
                <div className="text-right leading-tight">
                  <div className={`text-xs font-bold ${fgVal > 60 ? 'text-emerald-400' : fgVal < 35 ? 'text-red-400' : 'text-amber-400'}`}>
                    {fgVal || '--'}
                  </div>
                  <div className="text-[9px] text-[#ededed]/25">{fgLabel || '...'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="divide-y divide-white/[0.02]">
            {patents?.marketMovers?.length ? (
              patents.marketMovers.map((m: any, i: number) => (
                <div key={i} className="px-4 py-2.5 flex items-center justify-between text-sm">
                  <span className="text-[#ededed]/60 truncate mr-2 font-medium">{m.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#ededed]/70 tabular-nums font-semibold">{m.value}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${m.dir === 'up' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                      {m.change}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-sm text-[#ededed]/20 italic text-center">Awaiting data...</div>
            )}
          </div>
        </div>

        {/* Forex — proper display with rates */}
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4">
          <div className="text-xs text-sky-400 uppercase tracking-[.1em] font-bold mb-3">Forex (vs USD)</div>
          <div className="space-y-2">
            {(() => {
              const pairs = [
                { l: 'EUR/USD', v: forex?.rates?.EUR ? (1 / forex.rates.EUR) : 0, p: forex?.rates?.EUR, inv: true },
                { l: 'USD/JPY', v: forex?.rates?.JPY || 0, p: forex?.rates?.JPY },
                { l: 'GBP/USD', v: forex?.rates?.GBP ? (1 / forex.rates.GBP) : 0, p: forex?.rates?.GBP, inv: true },
                { l: 'USD/CHF', v: forex?.rates?.CHF || 0, p: forex?.rates?.CHF },
                { l: 'USD/CNY', v: forex?.rates?.CNY || 0, p: forex?.rates?.CNY },
              ];
              return pairs.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-[#ededed]/60 w-16 truncate">{p.l}</span>
                  <span className={`tabular-nums font-semibold ${p.p ? 'text-[#ededed]/80' : 'text-[#ededed]/20'}`}>
                    {p.p ? p.v.toFixed(p.v > 100 ? 2 : 4) : '...'}
                  </span>
                  <span className="text-[9px] text-[#ededed]/25 w-10 text-right">live</span>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Indices — SPX + CSI1000 */}
        <div className="rounded-2xl border border-[#222] bg-white/[0.01] p-4 flex flex-col justify-center">
          <div className="text-xs text-amber-400 uppercase tracking-[.1em] font-bold mb-3">Indices</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#ededed]/60">S&P 500</span>
              <span className="text-sm text-[#ededed]/80 tabular-nums font-semibold">{spx?.price || '...'}</span>
              <span className={`text-xs font-semibold ${(spx?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {spx?.changePct || '...'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#ededed]/60">CSI 1000</span>
              <span className="text-sm text-[#ededed]/80 tabular-nums font-semibold">{csi?.price || '...'}</span>
              <span className={`text-xs font-semibold ${(csi?.change || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {csi?.changePct || '...'}
              </span>
            </div>
          </div>
          <div className="text-[9px] text-[#ededed]/20 mt-3">Yahoo Finance · delayed</div>
        </div>
      </div>

      {/* ── Patent Landscape (compact + market caps) ── */}
      {patents && <PatentsTable patents={patents} />}

      {/* ── Category boxes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {macroCats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}
