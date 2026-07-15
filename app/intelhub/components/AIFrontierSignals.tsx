'use client';
import { useEffect, useRef } from 'react';
/* AI Frontier Signals — live ticker of trending AI items from X, HF, arXiv (infinite seamless) */
export default function AIFrontierSignals({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;
  const filtered = items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'ai' || tag === 'hardware' || title.includes('ai ') || title.includes('model') || title.includes('llm');
  }).slice(0, 8);

  if (filtered.length === 0) return null;

  // Duplicate for seamless infinite loop
  const loopItems = [...filtered, ...filtered];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loopItems.length <= 1) return;

    let scrolling = true;
    const cardWidth = 210;

    const interval = setInterval(() => {
      if (!container || !scrolling) return;
      const maxScroll = container.scrollWidth / 2; // half because duplicated
      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollLeft = 0; // seamless reset (content identical)
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 2200);

    const handleEnter = () => { scrolling = false; };
    const handleLeave = () => { scrolling = true; };
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [loopItems.length]);

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-4 py-2 border-b border-[var(--border-default)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
        <span className="text-[10px] text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-semibold">AI Frontier Signals</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 24h • Live</span>
      </div>
      <div ref={scrollRef} className="flex overflow-x-auto gap-1 p-2" style={{ scrollbarWidth: 'none' }}>
        {loopItems.map((it: any, i: number) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 max-w-[200px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-cyan)]/30 transition-all text-xs hover:scale-[1.02]">
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
