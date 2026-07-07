/* ================================================================
   IntelHub — Patents Section (compact with market caps)
   ================================================================ */
'use client';

import { PatentsData } from '../types';

export default function PatentsTable({ patents }: { patents: PatentsData }) {
  if (!patents) return null;

  const { header, topHolders } = patents;
  const maxCount = Math.max(...topHolders.map(h => parseInt(h.count) || 1), 1);

  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#222] bg-[#111] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-pink-400 uppercase tracking-[.1em] font-bold">Patents</span>
          <span className="text-[10px] text-[#ededed]/25">{header.uspto} grants · {header.yoy}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[#ededed]/30">{header.utility} util</span>
          <span className="text-[#ededed]/20">·</span>
          <span className="text-[#ededed]/30">{header.design} des</span>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="grid grid-cols-[20px_1fr_40px_48px_56px] gap-2 px-2 py-1.5 text-[10px] text-[#ededed]/25 uppercase tracking-wider font-semibold">
          <span>#</span>
          <span>Company</span>
          <span className="text-right">Grants</span>
          <span className="text-right">Δ</span>
          <span className="text-right">M.Cap</span>
        </div>
        <div className="space-y-0.5">
          {topHolders.slice(0, 8).map((h, i) => {
            const countNum = parseInt(h.count);
            const pct = ((countNum / maxCount) * 100).toFixed(0);
            return (
              <div
                key={i}
                className="grid grid-cols-[20px_1fr_40px_48px_56px] gap-2 items-center px-2 py-1 rounded hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-[10px] text-[#ededed]/25 tabular-nums">{i + 1}</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] text-[#ededed]/30">{h.country}</span>
                  <span className="text-xs text-white/80 font-medium truncate">{h.name}</span>
                </div>
                <span className="text-xs text-[#ededed]/70 tabular-nums font-semibold text-right">{h.count}</span>
                <span
                  className={`text-[10px] font-semibold text-right ${
                    h.dir === 'up' ? 'text-emerald-400' : h.dir === 'down' ? 'text-red-400' : 'text-[#ededed]/30'
                  }`}
                >
                  {h.change}
                </span>
                <span className="text-[10px] text-[#ededed]/50 tabular-nums text-right">{h.mcap || '...'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
