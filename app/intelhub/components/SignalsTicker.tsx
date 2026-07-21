'use client';
import { useVisibilityTicker } from './useVisibilityTicker';

/* SignalsTicker — shared horizontal-scrolling signal ticker used by all dashboards.
   Props: items, ts, accent (color), label, filterTag (optional tag filter) */
export default function SignalsTicker({
  items, ts, accent, label, filterTag,
}: {
  items: any[]; ts: (iso: string) => string;
  accent: string; label: string; filterTag?: string;
}) {
  const hasItems = items && items.length > 0;
  const filtered = filterTag
    ? items.filter((it: any) => it.tag === filterTag)
    : items;
  const hasFiltered = filtered.length > 0;
  const dup = hasFiltered ? [...filtered, ...filtered] : [];

  const { scrollRef, pause, resume } = useVisibilityTicker(filtered.length);

  if (!hasFiltered) return null;

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-4 py-2 border-b border-[var(--border-default)] flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: accent }} />
        <span className="text-[10px] uppercase tracking-[1.5px] font-semibold" style={{ color: accent }}>{label}</span>
        <span className="text-[10px] text-[var(--text-muted)]">{filtered.length} signals</span>
        <span className="text-[10px] text-[var(--text-muted)] ml-auto">Last 24h</span>
      </div>
      <div ref={scrollRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        className="flex overflow-x-auto gap-1.5 p-2" style={{ scrollbarWidth: 'none' }}>
        {dup.map((it, i) => (
          <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
            className={`flex-shrink-0 max-w-[220px] px-3 py-2 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[${accent}]/30 transition-all text-xs hover:scale-[1.02]`}>
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
