'use client';
import { useEffect, useRef } from 'react';
/* Market News Ticker — live ticker of market-relevant intel (infinite seamless) */
export default function MarketNewsTicker({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(1.2);
  const af = useRef(0);

  const filtered = items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'macro' || tag === 'science' || title.includes('market') || title.includes('fed') || title.includes('yield') || title.includes('spx') || title.includes('gold');
  });

  const dup = filtered.length > 0 ? [...filtered, ...filtered] : [];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rx = (e.clientX - el!.getBoundingClientRect().left) / el!.offsetWidth;
      if (rx < 0.2) speed.current = 0.3;
      else if (rx < 0.4) speed.current = 0.7;
      else if (rx < 0.6) speed.current = 1.0;
      else if (rx < 0.8) speed.current = 1.5;
      else speed.current = 2.2;
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', () => { speed.current = 1.2; });
    const tick = () => {
      if (el) {
        el.scrollLeft += speed.current;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      af.current = requestAnimationFrame(tick);
    };
    af.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(af.current);
  }, [filtered.length]);

  if (!filtered.length) return null;

  return (
    <div className="border-b border-[#222] py-4 bg-[#080810]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-[#ededed]/25 uppercase tracking-[.2em] font-semibold">Market Pulse</span>
          <span className="w-px h-3 bg-white/5" />
          <span className="text-xs text-[#ededed]/20 tabular-nums">{filtered.length} signals</span>
          <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 24h • Live</span>
        </div>
        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-none"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)' }}>
          {dup.map((it, i) => (
            <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-[#111] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group">
              <div className="text-sm font-medium leading-snug line-clamp-2 text-[#ededed]/85 group-hover:text-white">{it.title}</div>
              <div className="mt-2 text-[10px] text-[#ededed]/30 line-clamp-2 leading-relaxed">{it.summary}</div>
              <div className="flex items-center gap-2 mt-3 text-xs text-[#ededed]/25">
                <span className="truncate max-w-[120px]">{it.source}</span>
                <span className="ml-auto tabular-nums whitespace-nowrap">{ts(it.published_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
