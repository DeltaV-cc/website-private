/* ================================================================
   IntelHub — Patents Section (ultra-compact, 4 columns, Web3-style)
   ================================================================ */
'use client';

import { PatentsData } from '../types';
import { artemisCompanyUrl } from '@/lib/entity-links';

export default function PatentsTable({ patents }: { patents: PatentsData }) {
  if (!patents) return null;

  const { header, topHolders } = patents;
  const maxCount = Math.max(...topHolders.map(h => parseInt(h.count) || 0), 1);

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden h-full">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-vibe-pink)]/[0.06] to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--accent-vibe-pink)] uppercase tracking-[1.5px] font-bold">Patents</span>
          <span className="text-[10px] text-[var(--text-muted)]">{header.uspto} grants</span>
        </div>
        <span className="text-[10px] text-[var(--text-disabled)]">{header.yoy} · Artemis</span>
      </div>
      <div className="p-3 space-y-1.5">
        {topHolders.slice(0, 6).map((h, i) => {
          const count = parseInt(h.count) || 0;
          const pct = Math.max(2, (count / maxCount) * 100);
          const href = artemisCompanyUrl({ name: h.name });
          return (
            <div key={i} className="flex items-center gap-2.5 text-xs">
              <span className="w-4 text-[10px] text-[var(--text-disabled)] tabular-nums text-right">{i + 1}</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${h.name} on Artemis`}
                className="w-16 text-[var(--text-secondary)] truncate font-medium hover:text-[var(--accent-vibe-pink)] transition-colors underline-offset-2 hover:underline"
              >
                {h.name}
              </a>
              <div className="flex-1 h-3 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-vibe-pink)]/80 to-[var(--accent-purple)]/60 transition-all duration-700"
                  style={{ width: `${pct}%` }} />
              </div>
              <span className="w-12 text-right tabular-nums text-[var(--text-primary)] font-semibold">{h.count}</span>
              <span className="w-12 text-right tabular-nums text-[var(--text-tertiary)] text-[10px]">{h.mcap || ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
