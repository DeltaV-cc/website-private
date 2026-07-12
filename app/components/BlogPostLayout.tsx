'use client';

import React from 'react';
import Link from 'next/link';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  meta: { title: string; date: string; category: string; type: string; readTime?: string; author?: string };
}

const categoryColor = (cat: string) => {
  const c = cat.toLowerCase();
  if (c === 'ai') return 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/8 border-[var(--accent-cyan)]/20';
  if (c === 'web3') return 'text-[var(--accent-orange)] bg-[var(--accent-orange)]/8 border-[var(--accent-orange)]/20';
  if (c === 'opsec') return 'text-[var(--accent-amber)] bg-[var(--accent-amber)]/8 border-[var(--accent-amber)]/20';
  if (c === 'hardware') return 'text-[var(--accent-purple)] bg-[var(--accent-purple)]/8 border-[var(--accent-purple)]/20';
  return 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/8 border-[var(--accent-cyan)]/20';
};

const typeColor = (type: string) => {
  const t = type.toLowerCase();
  if (t === 'deep dive') return 'text-[var(--accent-purple)] bg-[var(--accent-purple)]/8 border-[var(--accent-purple)]/20';
  if (t === 'thought') return 'text-[var(--accent-amber)] bg-[var(--accent-amber)]/8 border-[var(--accent-amber)]/20';
  if (t === 'tutorial') return 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/8 border-[var(--accent-cyan)]/20';
  return 'text-[var(--text-tertiary)] bg-white/[0.03] border-white/[0.06]';
};

export default function BlogPostLayout({ children, meta }: BlogPostLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-[720px] mx-auto px-6 md:px-8 pt-20 pb-24">
        <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors mb-10 group">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5"><path d="M10 7H3M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All articles
        </Link>
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase border ${categoryColor(meta.category)}`}>{meta.category}</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide uppercase border ${typeColor(meta.type)}`}>{meta.type}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-1.5px] leading-tight mb-6">{meta.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <span>{meta.date}</span>
            {meta.readTime && <><span className="text-[var(--text-disabled)]">·</span><span>{meta.readTime}</span></>}
            {meta.author && <><span className="text-[var(--text-disabled)]">·</span><span>{meta.author}</span></>}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent mb-10" />
        <article className="prose prose-invert prose-lg max-w-none">{children}</article>
        <div className="mt-16 pt-8 border-t border-[var(--border-default)]">
          <div className="flex items-center justify-between">
            <div className="text-xs text-[var(--text-muted)]">Intel pipeline note — generated and verified through the Delta V intelligence system.</div>
            <Link href="/blog/" className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-cyan)] hover:underline">More articles<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
