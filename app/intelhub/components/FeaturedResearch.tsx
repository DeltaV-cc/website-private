'use client';

import { useState, useEffect } from 'react';

interface ArtItem {
  title: string;
  url: string;
  source: string;
  published_at: string;
  summary: string;
  category: string;
  artemis_id: string;
  categories: string[];
}

const CAT_BADGE: Record<string, string> = {
  crypto: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  macro: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  ai: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  hardware: 'bg-green-500/15 text-green-400 border-green-500/20',
  general: 'bg-white/5 text-white/40 border-white/10',
};

const CAT_ACCENT: Record<string, string> = {
  crypto: 'from-yellow-500/20 to-transparent',
  macro: 'from-amber-500/20 to-transparent',
  ai: 'from-blue-500/20 to-transparent',
  hardware: 'from-green-500/20 to-transparent',
  general: 'from-white/5 to-transparent',
};

function fallbackImg(title: string) {
  const w = title.split(' ').slice(0, 2).map(w => w[0]).join('');
  return w || 'AR';
}

export default function FeaturedResearch({ articles }: { articles: ArtItem[] }) {
  const [idx, setIdx] = useState(0);
  const featured = articles.slice(0, 6);

  if (!featured.length) return null;

  // Auto-rotate every 12 seconds
  useEffect(() => {
    if (featured.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % Math.min(featured.length, 4)), 12000);
    return () => clearInterval(t);
  }, [featured.length]);

  const carousel = featured.slice(0, 4);

  return (
    <div className="max-w-[1440px] mx-auto px-8 mb-8">
      {/* Section Label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-400/70">Artemis Research</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 to-transparent" />
      </div>

      {/* Carousel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {carousel.map((art, i) => (
          <a
            key={art.artemis_id || i}
            href={art.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-xl border border-[#222] bg-gradient-to-br ${CAT_ACCENT[art.category] || 'from-white/5 to-transparent'} bg-[#0d0d0d] overflow-hidden transition-all duration-300 hover:border-white/15 hover:shadow-lg hover:shadow-emerald-500/5 ${i === idx ? 'ring-1 ring-emerald-500/30' : ''}`}
          >
            <div className="p-4">
              {/* Category badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${CAT_BADGE[art.category] || CAT_BADGE.general}`}>
                  {art.category === 'general' ? 'Research' : art.category.toUpperCase()}
                </span>
                <span className="text-[10px] text-white/20 font-mono">
                  {art.published_at ? new Date(art.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium leading-snug text-white/90 group-hover:text-white transition-colors line-clamp-3 mb-2">
                {art.title}
              </h3>

              {/* Summary */}
              {art.summary && (
                <p className="text-xs text-white/40 leading-relaxed line-clamp-2 group-hover:text-white/50 transition-colors">
                  {art.summary}
                </p>
              )}
            </div>

            {/* Bottom bar */}
            <div className="px-4 pb-3 flex items-center gap-2">
              <span className="text-[10px] text-white/20 truncate">
                {art.source?.replace('Artemis Research (', '').replace(')', '') || 'Artemis'}
              </span>
              <span className="ml-auto text-[10px] text-emerald-400/0 group-hover:text-emerald-400/60 transition-colors">
                Read →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Dots + count */}
      {carousel.length > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {carousel.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-4 bg-emerald-400/50' : 'bg-white/10 hover:bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/15 font-mono">
            {articles.length} articles
          </span>
        </div>
      )}
    </div>
  );
}
