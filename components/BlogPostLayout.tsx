'use client';

import { ReactNode } from 'react';

interface BlogPostProps {
  title: string;
  date: string;
  category: string;
  type?: string;
  excerpt?: string;
  children: ReactNode;
  readingTime?: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

const badgeStyles: Record<string, string> = {
  'Deep Dive': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  'Thought': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  'Tutorial': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Dashboard': 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  'Macro': 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
};

export default function BlogPostLayout({
  title,
  date,
  category,
  type = 'Thought',
  excerpt,
  children,
  readingTime,
  sourceLabel,
  sourceUrl,
}: BlogPostProps) {
  return (
    <>
      {/* Animated gradient bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-[length:400%_100%] z-[100] pointer-events-none"
        style={{ animation: 'gradientSweep 6s ease infinite' }}
      />
      <style>{`@keyframes gradientSweep{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>

      <article className="max-w-4xl mx-auto px-8 pt-20 pb-24">
        {/* Back link */}
        <a href="/blog" className="inline-flex items-center gap-1 text-sm text-[#666] hover:text-[#00f0ff] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
          Back to blog
        </a>

        {/* Metadata row */}
        <div className="flex items-center flex-wrap gap-3 text-sm mt-8 mb-6">
          <span className="text-[#666]">{date}</span>
          <span className="w-1 h-1 rounded-full bg-[#444]" />
          <span className="text-[#00f0ff]">{category}</span>
          {type && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#444]" />
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase ${badgeStyles[type] || 'bg-white/5 text-white/40 border border-white/10'}`}>
                {type}
              </span>
            </>
          )}
          {readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#444]" />
              <span className="text-[#666]">{readingTime}</span>
            </>
          )}
        </div>

        {/* Title with gradient effect */}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-2px] mb-6 leading-tight bg-gradient-to-r from-[#ededed] via-[#ededed] to-[#ededed]/80 bg-clip-text text-transparent">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-[#888] mb-10 leading-relaxed max-w-3xl border-l-2 border-[#00f0ff]/30 pl-6">
            {excerpt}
          </p>
        )}

        {/* Source attribution */}
        {(sourceLabel || sourceUrl) && (
          <div className="flex items-center gap-2 text-sm text-[#666] mb-10 pb-6 border-b border-[#222]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#00f0ff]/60"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            {sourceLabel && <span>Intel source: <span className="text-[#aaa]">{sourceLabel}</span></span>}
            {sourceUrl && (
              <a href={sourceUrl} className="text-[#00f0ff] hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                View original →
              </a>
            )}
          </div>
        )}

        {/* Main content */}
        <div className="prose-container max-w-3xl text-[#ccc] leading-relaxed space-y-6 text-lg">
          {children}
        </div>

        {/* Intel pipeline note */}
        <div className="border border-[#222] rounded-2xl p-6 mt-16 bg-[#111]">
          <div className="flex items-start gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
            <div>
              <p className="text-sm text-[#aaa]">
                <strong className="text-[#00f0ff]">Delta V Intel pipeline</strong> — This post was informed by the HF Intelligence feed, which tracks new model releases, daily papers, and trending models from 20 top AI orgs.
              </p>
              <a href="/intelhub" className="text-[#00f0ff] text-sm hover:underline mt-2 inline-block">
                Explore IntelHub →
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 border-t border-[#222] pt-10 text-center">
          <p className="text-sm text-[#666] mb-3">Get high-signal Intel in your feed</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C2410C] text-white rounded-xl text-sm font-medium hover:bg-[#a3360a] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Stay up to speed
          </a>
        </div>
      </article>
    </>
  );
}
