/* IntelHub — Pulse horizontal scroll */
'use client';

import { Item } from '../types';
import { useVisibilityTicker } from './useVisibilityTicker';

export default function PulseFeed({
  items, loading, TC, BCOL, ts, isNew, lastFetch, ago,
}: {
  items: Item[]; loading: boolean; TC: Record<string, string>; BCOL: Record<string, string>;
  ts: (iso: string) => string; isNew: (iso: string) => boolean;
  lastFetch: Date | null; ago: (iso: string) => string;
}) {
  const { scrollRef, pause, resume } = useVisibilityTicker(items.length, 0.6, 'end');

  return (
    <div className="border-b border-[var(--border-default)] py-4 bg-[rgba(8,11,10,.72)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">Live Signals</span>
          <span className="text-[10px] text-[var(--text-muted)]">
            {lastFetch ? `Updated ${ago(lastFetch.toISOString()) === 'now' ? 'just now' : `${ago(lastFetch.toISOString())} ago`}` : 'Loading…'}
          </span>
          <span className="w-px h-3 bg-white/5" />
          <span className="text-[10px] text-[var(--text-muted)] tabular-nums">{items.length} signals</span>
        </div>
        <div
          ref={scrollRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          className="flex gap-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
          }}
        >
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] rounded-2xl p-4 bg-[var(--bg-surface)] border border-[var(--border-default)]">
                <div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/[0.05] rounded w-1/2" />
              </div>
            ))}
          {!loading && items.length === 0 && (
            <div className="text-[10px] text-[var(--text-disabled)] py-6 px-2">No signals</div>
          )}
          {items.map((it, i) => (
            <a
              key={i}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 w-[260px] rounded-2xl p-4 border border-[var(--border-default)] bg-[var(--bg-surface)] hover:bg-white/[0.03] hover:border-white/10 transition-colors duration-200 group ${it.tag ? (BCOL[it.tag] || 'border-l-white/5') : 'border-l-white/5'} border-l-2`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-snug line-clamp-2 text-[var(--text-primary)] group-hover:text-white">{it.title}</div>
                  <div className="mt-2 text-[10px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">{it.summary}</div>
                </div>
                {isNew(it.published_at) && <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400" />}
              </div>
              <div className="flex items-center gap-2 mt-3 text-[10px] text-[var(--text-muted)]">
                {it.tag ? (
                  <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${TC[it.tag] || ''}`}>#{it.tag}</span>
                ) : null}
                <span className="truncate max-w-[85px]">{it.source}</span>
                <span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
