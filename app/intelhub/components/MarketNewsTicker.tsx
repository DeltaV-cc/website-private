'use client';
import { useEffect, useRef } from 'react';
/* Market Pulse — live ticker of market-relevant intel (compact pill style, infinite seamless) */
export default function MarketNewsTicker({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(1.2);
  const paused = useRef(false);
  const af = useRef(0);

  const hasItems = items && items.length > 0;
  const filtered = hasItems ? items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'macro' || tag === 'science' || title.includes('market') || title.includes('fed') || title.includes('yield') || title.includes('spx') || title.includes('gold');
  }) : [];
  const hasFiltered = filtered.length > 0;
  const dup = hasFiltered ? [...filtered, ...filtered] : [];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const tick = () => {
      if (el && !paused.current) {
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

  if (!hasFiltered) return null;

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-4 py-2 border-b border-[var(--border-default)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse" />
        <span className="text-[10px] text-[var(--accent-amber)] uppercase tracking-[1.5px] font-semibold">Market Pulse</span>
        <span className="text-[10px] text-[var(--text-muted)]">{filtered.length} signals</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 24h • Live</span>
      </div>
      <div ref={scrollRef} onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} className="flex overflow-x-auto gap-1.5 p-2" style={{ scrollbarWidth: 'none' }}>
        {dup.map((it, i) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 max-w-[220px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-amber)]/30 transition-all text-xs hover:scale-[1.02]">
            <div className="text-[var(--text-secondary)] line-clamp-2 leading-snug mb-1">{it.title}</div>
            <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
              <span>{it.source || ''}</span>
              <span className="tabular-nums ml-auto">{ts(it.published_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
