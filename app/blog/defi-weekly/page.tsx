'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NewsletterItem {
  title: string;
  link: string;
  date: string;
  author: string;
  excerpt: string;
  body_html: string;
}

interface NewsletterData {
  fetched_at: string;
  latest_weekly: NewsletterItem | null;
  recent_weeklies: NewsletterItem[];
  research_articles: NewsletterItem[];
  substack_url: string;
  rss_feed: string;
}

export default function DeFiWeeklyPage() {
  const [data, setData] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://deltav-cc.github.io/website-private/data/artemis-newsletter.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch { return iso; }
  };

  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[var(--border-default)] border-t-[var(--accent-gold)] rounded-full animate-spin" />
          <span className="text-sm text-[var(--text-muted)]">Loading latest DeFi Weekly...</span>
        </div>
      </div>
    );
  }

  const latest = data?.latest_weekly;
  const past = data?.recent_weeklies || [];

  return (
    <div className="min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 pt-20 pb-24">
        {/* Header */}
        <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors mb-10 group">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5"><path d="M10 7H3M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All articles
        </Link>

        <div className="mb-12">
          <div className="text-[var(--accent-gold)] text-xs font-semibold tracking-[3px] uppercase mb-3">DeFi Weekly</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">DeFi Weekly</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Weekly market overview, protocol deep-dives, and on-chain fundamentals — curated by Delta V.
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-3">
            Sources: Artemis, DeFi Llama, Glassnode, Dune, X feed
          </p>
        </div>

        {/* Latest weekly */}
        {latest ? (
          <div className="mb-16">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border-default)] bg-gradient-to-r from-[var(--accent-gold)]/[0.06] to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs text-[var(--accent-gold)] uppercase tracking-[1.5px] font-bold">Latest Edition</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">{formatDate(latest.date)}</span>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] leading-tight block mb-4">
                  {latest.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-6">
                  {latest.author && <span>by {latest.author}</span>}
                  <span>·</span>
                  <span>Delta V Intelligence</span>
                </div>
                <div className="prose prose-invert max-w-none text-[var(--text-secondary)] text-sm leading-relaxed">
                  {stripHtml(latest.body_html || '').split('\n').filter(Boolean).slice(0, 30).map((p, i) => (
                    <p key={i} className="mb-3">{p.slice(0, 500)}</p>
                  ))}
                </div>
                <a href={latest.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] rounded-xl text-sm font-medium hover:bg-[var(--accent-gold)]/20 transition-all">
                  Read full edition on Substack
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-16 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-10 text-center">
            <p className="text-[var(--text-secondary)] mb-2">No newsletter data yet.</p>
            <p className="text-sm text-[var(--text-muted)]">The data feed syncs every 15 minutes. Check back soon.</p>
          </div>
        )}

        {/* Past editions */}
        {past.length > 1 && (
          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Past Editions</h2>
            <div className="space-y-3">
              {past.slice(1).map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className="block rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 hover:border-[var(--accent-gold)]/25 hover:bg-[var(--bg-elevated)] transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">{item.title}</h3>
                      <p className="text-xs text-[var(--text-tertiary)] mt-1 line-clamp-2">{item.excerpt}</p>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0 mt-1">{formatDate(item.date)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-[var(--border-default)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Sources: Artemis · DeFi Llama · Glassnode · Dune · X feed
            {' '}· Powered by the Delta V intelligence pipeline
          </p>
        </div>
      </div>
    </div>
  );
}
