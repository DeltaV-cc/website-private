'use client';

import { useEffect, useRef, useState } from 'react';

interface IntelItem {
  title: string;
  url: string;
  source: string;
  category: string;
  ingested_at: string;
  summary: string;
}

export default function CuratedIntel() {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<IntelItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/intel/raw-items');
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

    const scrollSpeed1 = 0.5; // pixels per frame
    const scrollSpeed2 = 0.8; // slightly faster for second row

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

  // Split items into two rows
  const row1 = items.slice(0, 10);
  const row2 = items.slice(10, 20);

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
          {[...row1, ...row1].map((item, index) => (
            <a 
              key={index} 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[260px] flex-shrink-0 bg-[#111] border border-[#222] rounded-xl p-5 hover:border-[#00f0ff] transition-colors"
            >
              <div className="flex items-center gap-2 text-[10px] text-[#666] mb-2">
                <span>{new Date(item.ingested_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-[#00f0ff]">{item.source}</span>
              </div>
              <h4 className="font-semibold text-sm mb-2 leading-snug line-clamp-2 pr-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#aaa] line-clamp-2">
                {item.summary}
              </p>
            </a>
          ))}
        </div>

        {/* Row 2 - Auto scrolling (opposite direction) */}
        <div 
          ref={scrollRef2}
          className="flex gap-5 overflow-x-hidden scrollbar-hide"
        >
          {[...row2, ...row2].map((item, index) => (
            <a 
              key={index} 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[260px] flex-shrink-0 bg-[#111] border border-[#222] rounded-xl p-5 hover:border-[#00f0ff] transition-colors"
            >
              <div className="flex items-center gap-2 text-[10px] text-[#666] mb-2">
                <span>{new Date(item.ingested_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-[#00f0ff]">{item.source}</span>
              </div>
              <h4 className="font-semibold text-sm mb-2 leading-snug line-clamp-2 pr-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#aaa] line-clamp-2">
                {item.summary}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
