'use client';
/* Market News Ticker — horizontal scroll of market-relevant intel (infinite seamless) */
export default function MarketNewsTicker({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  if (!items || items.length === 0) return null;
  const filtered = items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'macro' || tag === 'science' || title.includes('market') || title.includes('fed') || title.includes('yield') || title.includes('spx') || title.includes('gold');
  }).slice(0, 10);

  if (filtered.length === 0) return null;

  const loopItems = [...filtered, ...filtered];

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex overflow-x-auto gap-1 p-2" style={{ scrollbarWidth: 'none' }}>
        {loopItems.map((it: any, i: number) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 max-w-[220px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-cyan)]/30 transition-all text-xs hover:scale-[1.015]">
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
