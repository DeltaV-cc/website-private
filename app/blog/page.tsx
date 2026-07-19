'use client';
import Link from 'next/link';
import { useState } from 'react';
import BackLink from '@/app/components/BackLink';
import FilterSidebar from '@/app/components/FilterSidebar';
import { blogIndex } from '@/app/data/content-index';

const posts = blogIndex.map((entry) => ({
  title: entry.title,
  date: entry.date || '',
  category: entry.domain,
  type: entry.format || 'Deep Dive',
  excerpt: entry.excerpt,
  slug: entry.id,
}));

const CATEGORY_ORDER = ['AI', 'Web3', 'OpSec', 'Hardware', 'DeFi Weekly'];

const CAT_ACCENT: Record<string, string> = {
  'AI': 'var(--accent-cyan)',
  'Web3': 'var(--accent-orange)',
  'OpSec': 'var(--accent-amber)',
  'Hardware': 'var(--accent-purple)',
  'DeFi Weekly': 'var(--accent-gold)',
};

const monthOf = (d: string) => {
  const m = d.match(/([A-Za-z]+)\s+\d+,\s+(\d{4})/);
  return m ? `${m[1]} ${m[2]}` : d;
};

const catTextClass = (cat: string) =>
  cat === 'AI' ? 'text-[var(--accent-cyan)]' :
  cat === 'Web3' ? 'text-[var(--accent-orange)]' :
  cat === 'OpSec' ? 'text-[var(--accent-amber)]' :
  cat === 'DeFi Weekly' ? 'text-[var(--accent-gold)]' :
  'text-[var(--accent-purple)]';

const catTitleClass = (cat: string) =>
  cat === 'AI' ? 'text-[var(--accent-cyan)]/90' :
  cat === 'Web3' ? 'text-[var(--accent-orange)]/90' :
  cat === 'OpSec' ? 'text-[var(--accent-amber)]/90' :
  cat === 'DeFi Weekly' ? 'text-[var(--accent-gold)]/90' :
  'text-[var(--accent-purple)]/90';

const readingTimeFor = (type: string) => {
  const t = type.toLowerCase();
  if (t === 'dashboard') return '10 min';
  if (t === 'deep dive') return '7 min';
  if (t === 'tutorial') return '8 min';
  if (t === 'tool') return '5 min';
  return '4 min';
};

const typeConfig: Record<string, string> = {
  'Deep Dive': 'border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/8 text-[var(--accent-purple)]',
  'Thought':   'border-[var(--accent-amber)]/20 bg-[var(--accent-amber)]/8 text-[var(--accent-amber)]',
  'Tutorial':  'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]',
  'Dashboard': 'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]',
  'Tool':      'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]',
};

export default function Blog() {
  const [cats, setCats] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filteredPosts = posts.filter(
    (p) =>
      (cats.length === 0 || cats.includes(p.category)) &&
      (months.length === 0 || months.includes(monthOf(p.date)))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Filter option lists derived from the data.
  const categoryOptions = CATEGORY_ORDER.filter((c) => posts.some((p) => p.category === c)).map((c) => ({
    value: c,
    label: c,
    count: posts.filter((p) => p.category === c).length,
    accent: CAT_ACCENT[c],
  }));
  const monthOptions = Array.from(new Set(posts.map((p) => monthOf(p.date))))
    .sort((a, b) => new Date(`1 ${b}`).getTime() - new Date(`1 ${a}`).getTime())
    .map((m) => ({ value: m, label: m, count: posts.filter((p) => monthOf(p.date) === m).length }));

  // Newest DeFi Weekly edition, driven by local data so the highlight card
  // always renders and links straight to the article (no external fetch, no hub).
  const latestWeekly = posts.find((p) => p.category === 'DeFi Weekly');
  const showLatest = latestWeekly && filteredPosts.includes(latestWeekly);
  // Don't repeat the featured edition inside the grid below.
  const gridPosts = showLatest ? filteredPosts.filter((p) => p.slug !== latestWeekly!.slug) : filteredPosts;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-6">
            <BackLink fallback="/" label="Back to home" className="inline-flex items-center gap-1.5 text-[var(--accent-cyan)] text-sm hover:underline group" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">Blog</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed">
            Writing about the latest AI and agent research, cybersecurity, hardware, and a weekly DeFi report — straight from the IntelHub pipeline.
          </p>
        </div>

        {/* Two-column: sticky filters + content */}
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          {/* Filter sidebar */}
          <aside className="mb-10 lg:mb-0">
            <FilterSidebar
              groups={[
                { title: 'Theme', options: categoryOptions, selected: cats, onToggle: (v) => toggle(cats, setCats, v) },
                { title: 'Period', options: monthOptions, selected: months, onToggle: (v) => toggle(months, setMonths, v) },
              ]}
              onClear={() => { setCats([]); setMonths([]); }}
            />
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <div className="mb-6 text-sm text-[var(--text-muted)]">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {(cats.length > 0 || months.length > 0) && <span> · filtered</span>}
            </div>

            {/* Latest DeFi Weekly — featured hero card, visually distinct from the grid */}
            {showLatest && (
              <Link
                href={`/blog/${latestWeekly!.slug}/`}
                className="group relative block mb-10 overflow-hidden rounded-2xl border border-[var(--accent-gold)]/35 bg-gradient-to-br from-[var(--accent-gold)]/[0.07] via-[var(--bg-surface)] to-[var(--bg-surface)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--accent-gold)]/60 hover:shadow-[0_0_44px_rgba(251,191,36,0.12)]"
              >
                {/* Gold accent bar */}
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-gold)]" />
                {/* Ambient gold glow */}
                <span className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[var(--accent-gold)]/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-gold)]/15 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-[1.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] animate-pulse" />
                      Latest DeFi Weekly
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">{latestWeekly!.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors mb-3 tracking-[-0.5px] max-w-3xl">
                    {latestWeekly!.title}
                  </h2>
                  <p className="text-sm md:text-base text-[var(--text-tertiary)] leading-relaxed mb-5 max-w-2xl line-clamp-2">
                    {latestWeekly!.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-gold)] group-hover:gap-2.5 transition-all">
                    Read this week&apos;s roundup
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </Link>
            )}

            {/* Post grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                <p className="text-lg text-[var(--text-secondary)] mb-2">No articles match these filters</p>
                <button onClick={() => { setCats([]); setMonths([]); }} className="text-sm text-[var(--accent-cyan)] hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 stagger-children">
                {gridPosts.map((post, i) => (
                  <div
                    key={i}
                    className={`relative group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 transition-all duration-200 ${
                      post.slug !== '#'
                        ? 'hover:border-[var(--accent-cyan)]/25 hover:bg-[var(--bg-elevated)]'
                        : 'opacity-40'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                      <span className="text-white/80">{post.date}</span>
                      <span className="text-[var(--text-disabled)]">·</span>
                      <span className="text-[var(--text-muted)]">{readingTimeFor(post.type)} read</span>
                      <span className="text-[var(--text-disabled)]">·</span>
                      <button
                        type="button"
                        onClick={() => toggle(cats, setCats, post.category)}
                        className={`relative z-10 font-medium hover:underline ${catTextClass(post.category)}`}
                        title={`Filter by ${post.category}`}
                      >
                        {post.category}
                      </button>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[1px] uppercase border ${typeConfig[post.type] || 'border-white/5 bg-white/[0.03] text-[var(--text-muted)]'}`}>
                        {post.type}
                      </span>
                    </div>
                    {post.slug !== '#' ? (
                      <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0">
                        <h3 className={`text-lg md:text-xl font-semibold mb-2 leading-snug ${catTitleClass(post.category)} group-hover:opacity-75 transition-colors`}>{post.title}</h3>
                      </Link>
                    ) : (
                      <h3 className={`text-lg md:text-xl font-semibold mb-2 leading-snug ${catTitleClass(post.category)}`}>{post.title}</h3>
                    )}
                    <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                    {post.slug !== '#' ? (
                      <div className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-cyan)] group-hover:gap-1.5 transition-all">
                        Read full article
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    ) : (
                      <div className="text-xs text-[var(--text-disabled)]">Coming soon</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-16 text-center text-sm text-[var(--text-muted)]">
              More articles generated through the IntelHub pipeline.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
