'use client';
import { useEffect, useRef } from 'react';
/* Crypto Frontier Signals — live ticker of trending crypto/web3 items (compact pill style, infinite seamless) */
export default function CryptoFrontierSignals({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = useRef(1.2);
  const af = useRef(0);

  if (!items || items.length === 0) return null;

  const filtered = items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'crypto' || tag === 'web3' || title.includes('defi') || title.includes('ethereum') || title.includes('bitcoin') || title.includes('crypto');
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
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-4 py-2 border-b border-[var(--border-default)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
        <span className="text-[10px] text-[var(--accent-orange)] uppercase tracking-[1.5px] font-semibold">Crypto Frontier</span>
        <span className="text-[10px] text-[var(--text-muted)]">{filtered.length} signals</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 24h • Live</span>
      </div>
      <div ref={scrollRef} className="flex overflow-x-auto gap-1.5 p-2" style={{ scrollbarWidth: 'none' }}>
        {dup.map((it, i) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 max-w-[220px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-orange)]/30 transition-all text-xs hover:scale-[1.02]">
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
