/* ================================================================
   IntelHub — Patents Section (ultra-compact, 4 columns, Web3-style)
   ================================================================ */
'use client';

import { PatentsData } from '../types';
import { SkeletonBlock } from './Shared';

export default function PatentsTable({ patents }: { patents: PatentsData }) {
  if (!patents) return null;

  const { header, topHolders } = patents;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden h-full">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-vibe-pink)]/[0.06] to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--accent-vibe-pink)] uppercase tracking-[1.5px] font-bold">Patents</span>
          <span className="text-[10px] text-[var(--text-muted)]">{header.uspto} grants</span>
        </div>
        <span className="text-[10px] text-[var(--text-disabled)]">{header.yoy}</span>
      </div>
      <div className="px-4 py-2.5">
        <div className="grid grid-cols-[18px_1fr_38px_52px] gap-2 px-1.5 py-1 text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
          <span>#</span><span>Company</span><span className="text-right">Grants</span><span className="text-right">M.Cap</span>
        </div>
        {topHolders.slice(0, 6).map((h, i) => (
          <div key={i} className="grid grid-cols-[18px_1fr_38px_52px] gap-2 items-center px-1.5 py-1.5 rounded hover:bg-white/[0.02] transition-colors duration-150">
            <span className="text-[10px] text-[var(--text-disabled)] tabular-nums">{i + 1}</span>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[10px] text-[var(--text-muted)]">{h.country}</span>
              <span className="text-[10px] text-[var(--text-secondary)] font-medium truncate">{h.name}</span>
            </div>
            <span className="text-[10px] text-[var(--text-primary)] tabular-nums font-semibold text-right">{h.count}</span>
            <span className="text-[10px] text-[var(--text-tertiary)] tabular-nums text-right">{h.mcap || <SkeletonBlock className="h-3 w-12 inline-block" />}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
