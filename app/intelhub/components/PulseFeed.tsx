/* IntelHub — Pulse horizontal scroll */
'use client';

import { useEffect, useRef } from 'react';
import { Item } from '../types';

export default function PulseFeed({
  items, loading, TC, BCOL, ts, isNew, lastFetch, ago,
}: {
  items: Item[]; loading: boolean; TC: Record<string, string>; BCOL: Record<string, string>;
  ts: (iso: string) => string; isNew: (iso: string) => boolean;
  lastFetch: Date | null; ago: (iso: string) => string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(0.6);
  const paused = useRef(false);
  const af = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tick = () => {
      if (el && !paused.current) {
        el.scrollLeft += speed.current;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0;
      }
      af.current = requestAnimationFrame(tick);
    };
    af.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(af.current);
    };
  }, [items.length]); // re-init if items change

  return (
    <div className="border-b border-[var(--border-default)] py-5 bg-[rgba(8,11,10,.72)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[.2em] font-semibold">Live Signals</span>
          <span className="text-xs text-[#ededed]/30">
            {lastFetch ? `Updated ${ago(lastFetch.toISOString())} ago` : 'Loading...'}
          </span>
          <span className="w-px h-3 bg-white/5" />
          <span className="text-xs text-[#ededed]/20 tabular-nums">{items.length} signals</span>
        </div>
        <div
          ref={scrollRef}
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
          onFocus={() => { paused.current = true; }}
          onBlur={() => { paused.current = false; }}
          className="flex gap-3 overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
          }}
        >
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] rounded-2xl p-4 bg-[#111] border border-[#222] animate-pulse">
                <div className="h-3 bg-white/[0.05] rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/[0.05] rounded w-1/2" />
              </div>
            ))}
          {!loading && items.length === 0 && (
            <div className="text-[#ededed]/15 text-sm italic py-6 px-2">Awaiting first signals</div>
          )}
          {items.map((it, i) => (
            <a
              key={i}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-[#111] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group ${it.tag ? (BCOL[it.tag] || 'border-l-white/5') : 'border-l-white/5'} border-l-2 hover:scale-[1.015] hover:shadow-[0_4px_20px_rgba(0,240,255,0.1)]`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-snug line-clamp-2 text-[#ededed]/85 group-hover:text-white">{it.title}</div>
                  <div className="mt-2 text-[10px] text-[#ededed]/30 line-clamp-2 leading-relaxed transition-colors duration-200 group-hover:text-[#ededed]/60">{it.summary}</div>
                </div>
                {isNew(it.published_at) && <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400 animate-pulse" />}
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-[#ededed]/25">
                {it.tag ? (
                  <span className={`px-2 py-0.5 rounded-md font-semibold text-xs ${TC[it.tag] || ''}`}>#{it.tag}</span>
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
