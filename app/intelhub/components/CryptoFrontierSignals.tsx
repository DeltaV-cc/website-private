'use client';
import { useVisibilityTicker } from './useVisibilityTicker';
/* Crypto Frontier Signals — live ticker of trending crypto/web3 items (compact pill style, infinite seamless) */
export default function CryptoFrontierSignals({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  const hasItems = items && items.length > 0;
  const filtered = hasItems ? items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'crypto' || tag === 'web3' || title.includes('defi') || title.includes('ethereum') || title.includes('bitcoin') || title.includes('crypto');
  }) : [];
  const hasFiltered = filtered.length > 0;
  const dup = hasFiltered ? [...filtered, ...filtered] : [];

  const { scrollRef, pause, resume } = useVisibilityTicker(filtered.length);

  if (!hasFiltered) return null;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
        <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">Crypto Frontier</span>
        <span className="text-[10px] text-[var(--text-muted)]">{filtered.length} signals</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 24h</span>
      </div>
      <div ref={scrollRef} onMouseEnter={pause} onMouseLeave={resume} className="flex overflow-x-auto gap-1.5 p-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {dup.map((it, i) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 max-w-[220px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-orange)]/30 transition-colors text-xs">
            <div className="text-[var(--text-secondary)] line-clamp-2 leading-snug mb-1">{it.title}</div>
            <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
              <span className="truncate max-w-[100px]">{it.source || ''}</span>
              <span className="tabular-nums ml-auto">{ts(it.published_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
