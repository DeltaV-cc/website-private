'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface IntelItem {
  title: string;
  url: string;
  source?: string;
  category?: string;
  published_at?: string;
  summary?: string;
}

/** Matches next.config.ts basePath for static export / GitHub Pages */
const BASE_PATH = '/website-private';

const isNew = (iso?: string) => {
  if (!iso) return false;
  try { return Date.now() - new Date(iso).getTime() < 3_600_000; } catch { return false; }
};

const ts = (iso?: string) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  } catch { return ''; }
};

/** raw-items.json often omits category - derive a label from source when needed */
const resolveCategory = (item: IntelItem): string => {
  if (item.category && String(item.category).trim()) return String(item.category).trim();
  const s = (item.source || '').toLowerCase();
  if (/ai|ml|llm|model|hf|hugging|arxiv|openai|anthropic|nvidia/.test(s)) return 'AI';
  if (/crypto|defi|web3|eth|btc|chain|protocol/.test(s)) return 'Web3';
  if (/sec|cve|threat|opsec|cyber/.test(s)) return 'OpSec';
  if (item.source && String(item.source).trim()) return String(item.source).trim();
  return 'Intel';
};

const categoryColor = (cat?: string | null) => {
  const c = (cat ?? '').toLowerCase();
  if (c.includes('ai') || c.includes('model') || c.includes('ml')) return 'text-[var(--accent-cyan)] border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8';
  if (c.includes('crypto') || c.includes('web3') || c.includes('defi')) return 'text-[var(--accent-orange)] border-[var(--accent-orange)]/20 bg-[var(--accent-orange)]/8';
  if (c.includes('sec') || c.includes('opsec') || c.includes('cyber')) return 'text-[var(--accent-amber)] border-[var(--accent-amber)]/20 bg-[var(--accent-amber)]/8';
  return 'text-[var(--accent-purple)] border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/8';
};

/**
 * IntelHub-style seamless ticker row:
 * - continuous RAF scroll
 * - wrap via half-width subtract (no hard reset jump)
 * - mouse-X speed curve (slow left, faster right)
 * - hover pause + prefers-reduced-motion
 */
function useSeamlessTicker(itemCount: number, baseSpeed = 0.85) {
  const ref = useRef<HTMLDivElement>(null);
  const speed = useRef(baseSpeed);
  const paused = useRef(false);
  const af = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || itemCount === 0) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      if (paused.current) return;
      const rx = (e.clientX - el.getBoundingClientRect().left) / Math.max(el.offsetWidth, 1);
      if (rx < 0.2) speed.current = baseSpeed * 0.25;
      else if (rx < 0.4) speed.current = baseSpeed * 0.55;
      else if (rx < 0.6) speed.current = baseSpeed;
      else if (rx < 0.8) speed.current = baseSpeed * 1.35;
      else speed.current = baseSpeed * 1.9;
    };
    // Pause while pointer/focus is on a card so users can click without the strip racing away
    const onEnter = () => { paused.current = true; };
    const onLeave = () => { paused.current = false; speed.current = baseSpeed; };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focusin', onEnter);
    el.addEventListener('focusout', onLeave);

    const tick = () => {
      if (el && !paused.current) {
        el.scrollLeft += speed.current;
        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          else if (el.scrollLeft < 0) el.scrollLeft += half;
        }
      }
      af.current = requestAnimationFrame(tick);
    };
    af.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(af.current);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('focusin', onEnter);
      el.removeEventListener('focusout', onLeave);
    };
  }, [itemCount, baseSpeed]);

  return ref;
}

export default function CuratedIntel() {
  const [items, setItems] = useState<IntelItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_PATH}/data/raw-items.json`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const normalized = data
            .filter((x): x is IntelItem => !!x && typeof x === 'object' && typeof x.title === 'string' && typeof x.url === 'string')
            .slice(0, 20);
          setItems(normalized);
        }
      } catch {
        // Silent fail - component gracefully degrades
      }
    };
    fetchData();
  }, []);

  const row1 = items.slice(0, 10);
  const row2 = items.slice(10, 20);
  const ref1 = useSeamlessTicker(row1.length, 0.75);
  const ref2 = useSeamlessTicker(row2.length, 1.05);

  const renderCard = (item: IntelItem, index: number) => {
    const category = resolveCategory(item);
    return (
      <a
        key={`${item.url}-${index}`}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 w-[260px] max-w-[260px] px-3.5 py-3 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-default)] hover:border-[var(--accent-cyan)]/30 transition-all duration-200 text-xs hover:scale-[1.02] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
      >
        <div className="flex items-start gap-2 mb-2">
          <div className="flex-1 min-w-0 text-[13px] font-medium leading-snug line-clamp-2 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {item.title}
          </div>
          {isNew(item.published_at) && (
            <span
              className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_rgba(16,185,129,0.5)]"
              title="New"
              aria-label="New"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase border ${categoryColor(category)}`}>
            {category}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[90px]">
            {item.source || ''}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] tabular-nums ml-auto flex-shrink-0">
            {ts(item.published_at)}
          </span>
        </div>
      </a>
    );
  };

  if (!items.length) return null;

  const dup1 = [...row1, ...row1];
  const dup2 = row2.length ? [...row2, ...row2] : [];

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden max-w-full">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex flex-wrap items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" style={{ animation: 'smoothPulse 3s ease-in-out infinite' }} aria-hidden="true" />
        <div>
          <div className="text-[10px] text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-semibold">Curated Intel</div>
          <h2 id="intel-heading" className="text-sm md:text-base font-semibold tracking-tight text-[var(--text-primary)]">
            Latest from the pipeline
          </h2>
        </div>
        <Link href="/intelhub/" className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-[1.2px] text-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-colors">
          Browse IntelHub <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="space-y-2 p-2 w-full overflow-hidden">
        <div
          ref={ref1}
          className="flex gap-2 overflow-x-scroll scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          tabIndex={0}
          aria-label="Curated intelligence feed, row 1"
        >
          {dup1.map((item, i) => renderCard(item, i))}
        </div>
        {dup2.length > 0 && (
          <div
            ref={ref2}
            className="flex gap-2 overflow-x-scroll scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            tabIndex={0}
            aria-label="Curated intelligence feed, row 2"
          >
            {dup2.map((item, i) => renderCard(item, i))}
          </div>
        )}
      </div>
    </div>
  );
}
