'use client';

import { useEffect, useRef, useState } from 'react';

interface IntelItem {
  title: string;
  url: string;
  source: string;
  category: string;
  published_at: string;
  summary: string;
}

const isNew = (iso: string) => {
  try { return Date.now() - new Date(iso).getTime() < 3_600_000; } catch { return false; }
};

const ts = (iso: string) => {
  try {
    return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  } catch { return ''; }
};

const categoryColor = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('ai') || c.includes('model')) return 'text-[var(--accent-cyan)] border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8';
  if (c.includes('crypto') || c.includes('web3') || c.includes('defi')) return 'text-[var(--accent-orange)] border-[var(--accent-orange)]/20 bg-[var(--accent-orange)]/8';
  if (c.includes('sec') || c.includes('opsec')) return 'text-[var(--accent-amber)] border-[var(--accent-amber)]/20 bg-[var(--accent-amber)]/8';
  return 'text-[var(--accent-purple)] border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/8';
};

export default function CuratedIntel() {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<IntelItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/raw-items.json');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data.slice(0, 20));
        }
      } catch {
        // Silent fail — component gracefully degrades
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const c1 = scrollRef1.current;
    const c2 = scrollRef2.current;
    if (!c1 || !c2) return;

    let raf: number;
    const animate = () => {
      if (c1) {
        c1.scrollLeft += 0.4;
        if (c1.scrollLeft >= c1.scrollWidth / 2) c1.scrollLeft = 0;
      }
      if (c2) {
        c2.scrollLeft += 0.7;
        if (c2.scrollLeft >= c2.scrollWidth / 2) c2.scrollLeft = 0;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  const row1 = items.slice(0, 10);
  const row2 = items.slice(10, 20);

  const renderCard = (item: IntelItem, index: number) => (
    <a
      key={index}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[280px] rounded-xl p-4 border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] transition-all duration-200 group"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium leading-snug line-clamp-2 text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
            {item.title}
          </div>
        </div>
        {isNew(item.published_at) && (
          <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
        )}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase border ${categoryColor(item.category)}`}>
          {item.category}
        </span>
        <span className="text-[11px] text-[var(--text-muted)] tabular-nums ml-auto">{ts(item.published_at)}</span>
      </div>
    </a>
  );

  if (!items.length) return null;

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-2">Curated Intel</div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Latest from the pipeline</h3>
        </div>
      </div>

      <div className="space-y-3 overflow-hidden">
        <div ref={scrollRef1} className="flex gap-3 overflow-x-hidden">
          {[...row1, ...row1].map((item, i) => renderCard(item, i))}
        </div>
        <div ref={scrollRef2} className="flex gap-3 overflow-x-hidden">
          {[...row2, ...row2].map((item, i) => renderCard(item, i))}
        </div>
      </div>
    </div>
  );
}
