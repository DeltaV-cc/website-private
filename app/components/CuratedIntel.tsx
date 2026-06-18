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
      } catch (error) {
        console.error('Failed to fetch curated intel');
      }
    };

    fetchData();
  }, []);

  // Auto-scrolling effect
  useEffect(() => {
    const scrollContainer1 = scrollRef1.current;
    const scrollContainer2 = scrollRef2.current;

    if (!scrollContainer1 || !scrollContainer2) return;

    let animationFrame1: number;
    let animationFrame2: number;

    const scrollSpeed1 = 0.5;
    const scrollSpeed2 = 0.8;

    const animateScroll = () => {
      if (scrollContainer1) {
        scrollContainer1.scrollLeft += scrollSpeed1;
        if (scrollContainer1.scrollLeft >= scrollContainer1.scrollWidth / 2) {
          scrollContainer1.scrollLeft = 0;
        }
      }
      if (scrollContainer2) {
        scrollContainer2.scrollLeft += scrollSpeed2;
        if (scrollContainer2.scrollLeft >= scrollContainer2.scrollWidth / 2) {
          scrollContainer2.scrollLeft = 0;
        }
      }
      animationFrame1 = requestAnimationFrame(animateScroll);
    };

    animationFrame1 = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrame1);
    };
  }, [items]);

  const row1 = items.slice(0, 10);
  const row2 = items.slice(10, 20);

  const renderCard = (item: IntelItem, index: number) => (
    <a
      key={index}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[260px] rounded-2xl p-4 border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium leading-snug line-clamp-2 text-white/85 group-hover:text-white">
            {item.title}
          </div>
        </div>
        {isNew(item.published_at) && (
          <span className="flex-shrink-0 w-1.5 h-1.5 mt-1 rounded-full bg-emerald-400" />
        )}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[11px] text-white/25">
        <span className="truncate max-w-[90px]">{item.source}</span>
        <span className="ml-auto tabular-nums whitespace-nowrap">{ts(item.published_at)}</span>
      </div>
    </a>
  );

  return (
    <div className="max-w-6xl mx-auto px-8 pb-16">
      <div className="mb-4">
        <div className="text-[#00f0ff] text-xs font-medium tracking-[2px]">CURATED INTEL</div>
        <h3 className="text-xl font-semibold tracking-tight">Latest from the pipeline</h3>
      </div>

      <div className="space-y-4 overflow-hidden">
        {/* Row 1 - Auto scrolling */}
        <div
          ref={scrollRef1}
          className="flex gap-5 overflow-x-hidden scrollbar-hide"
        >
          {[...row1, ...row1].map((item, index) => renderCard(item, index))}
        </div>

        {/* Row 2 - Auto scrolling */}
        <div
          ref={scrollRef2}
          className="flex gap-5 overflow-x-hidden scrollbar-hide"
        >
          {[...row2, ...row2].map((item, index) => renderCard(item, index))}
        </div>
      </div>
    </div>
  );
}
