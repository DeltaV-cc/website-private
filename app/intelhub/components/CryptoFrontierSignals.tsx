'use client';
/* Crypto Frontier Signals — live ticker of trending crypto/web3 items */
export default function CryptoFrontierSignals({ items, ts }: { items: any[]; ts: (iso: string) => string }) {
  if (!items || items.length === 0) return null;
  const filtered = items.filter((it: any) => {
    const tag = (it.tag || '').toLowerCase();
    const title = (it.title || '').toLowerCase();
    return tag === 'crypto' || tag === 'web3' || title.includes('defi') || title.includes('ethereum') || title.includes('bitcoin') || title.includes('crypto');
  }).slice(0, 8);

  if (filtered.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-4 py-2 border-b border-[var(--border-default)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] animate-pulse" />
        <span className="text-[10px] text-[var(--accent-orange)] uppercase tracking-[1.5px] font-semibold">Crypto Frontier</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 7 days</span>
      </div>
      <div className="flex overflow-x-auto gap-1 p-2">
        {filtered.map((it: any, i: number) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 max-w-[200px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-orange)]/30 transition-all text-xs">
            <div className="text-[var(--text-secondary)] line-clamp-2 leading-snug mb-1">{it.title}</div>
            <div className="text-[10px] text-[var(--text-muted)]">{ts(it.published_at)}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
