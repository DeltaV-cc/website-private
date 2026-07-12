/* ================================================================
   IntelHub — Pulse scrolling feed
   ================================================================ */
'use client';

import { useRef, useEffect } from 'react';
import { Item } from '../types';

export default function PulseFeed({
  items, loading, TC, BCOL, ts, isNew,
}: {
  items: Item[]; loading: boolean; TC: Record<string, string>; BCOL: Record<string, string>;
  ts: (iso: string) => string; isNew: (iso: string) => boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(1.2);
  const af = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const mv = (e: MouseEvent) => {
      const rx = (e.clientX - el!.getBoundingClientRect().left) / el!.offsetWidth;
      if (rx < 0.15) speed.current = -0.6;
      else if (rx < 0.35) speed.current = 0.25;
      else if (rx < 0.65) speed.current = 1.0;
      else if (rx < 0.85) speed.current = 2.8;
      else speed.current = 4.5;
    };
    el.addEventListener('mousemove', mv);
    el.addEventListener('mouseleave', () => { speed.current = 1.2; });
    const tick = () => {
      if (el) el.scrollLeft += speed.current;
      af.current = requestAnimationFrame(tick);
    };
    af.current = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener('mousemove', mv);
      cancelAnimationFrame(af.current);
    };
  }, []);

  return (
    <div className="border-b border-[#222] py-4 bg-[#080810]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-[#ededed]/25 uppercase tracking-[.2em] font-semibold">Pulse</span>
          <span className="w-px h-3 bg-white/5" />
          <span className="text-xs text-[#ededed]/20 tabular-nums">{items.length} signals</span>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-3"
          style={{
            overflowX: 'scroll',
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
          {items.slice(0, 60).map((it, i) => (
            <a
              key={i}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-[#111] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group ${it.tag ? (BCOL[it.tag] || 'border-l-white/5') : 'border-l-white/5'} border-l-2`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-snug line-clamp-2 text-[#ededed]/85 group-hover:text-white">{it.title}</div>
                  <div className="mt-2 text-[10px] text-[#ededed]/30 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-h-0 group-hover:max-h-12 overflow-hidden">{it.summary}</div>
                </div>
                {isNew(it.published_at) && <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400" />}
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-[#ededed]/25">
                {it.tag ? (
                  <span className={`px-2 py-0.5 rounded-md font-semibold text-xs ${TC[it.tag] || ''}`}>#{it.tag}</span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-xs bg-white/[0.04] text-[#ededed]/20">#unranked</span>
                )}
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
