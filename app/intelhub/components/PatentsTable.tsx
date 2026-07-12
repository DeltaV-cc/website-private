/* ================================================================
   IntelHub — Patents Section (ultra-compact, 4 columns)
   ================================================================ */
'use client';

import { PatentsData } from '../types';
import { SkeletonBlock } from './Shared';

export default function PatentsTable({ patents }: { patents: PatentsData }) {
  if (!patents) return null;

  const { header, topHolders } = patents;

  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden h-full">
      <div className="px-3 py-2 border-b border-[#222] bg-gradient-to-r from-[#111] via-[#111] to-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-pink-400 uppercase tracking-[.1em] font-bold">Patents</span>
          <span className="text-[10px] text-[#ededed]/25">{header.uspto} grants</span>
        </div>
        <span className="text-[10px] text-[#ededed]/20">{header.yoy}</span>
      </div>
      <div className="px-2 py-1.5">
        <div className="grid grid-cols-[18px_1fr_38px_48px] gap-1.5 px-1.5 py-1 text-[10px] text-[#ededed]/20 uppercase tracking-wider font-semibold">
          <span>#</span><span>Company</span><span className="text-right">Grants</span><span className="text-right">M.Cap</span>
        </div>
        {topHolders.slice(0, 6).map((h, i) => (
          <div key={i} className="grid grid-cols-[18px_1fr_38px_48px] gap-1.5 items-center px-1.5 py-1 rounded hover:bg-white/[0.03]">
            <span className="text-[10px] text-[#ededed]/20 tabular-nums">{i + 1}</span>
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[10px] text-[#ededed]/25">{h.country}</span>
              <span className="text-[10px] text-white/75 font-medium truncate">{h.name}</span>
            </div>
            <span className="text-[10px] text-[#ededed]/65 tabular-nums font-semibold text-right">{h.count}</span>
            <span className="text-[10px] text-[#ededed]/45 tabular-nums text-right">{h.mcap || <SkeletonBlock className="h-3 w-12 inline-block" />}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
