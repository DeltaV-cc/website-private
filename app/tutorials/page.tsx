'use client';
import Link from 'next/link';
import { useState } from 'react';
import BackLink from '@/app/components/BackLink';
import FilterSidebar from '@/app/components/FilterSidebar';
import { tutorialIndex } from '@/app/data/content-index';

const legacyTutorials = [
  {
    slug: 'hermes-qwen-dgx-spark',
    title: 'Hermes + Qwen 3.6 + NVIDIA DGX Spark: The Local AI Convergence',
    date: 'June 2026',
    readingTime: '8 min',
    tags: ['Local AI', 'Agents'],
    excerpt:
      'A 24/7 local agent stack: NVIDIA DGX Spark (128GB), Qwen 3.6, and the self-evolving Hermes Agent framework with a 3-layer memory and an OpenShell sandbox.',
  },
  {
    slug: 'langchain-chatchat-ollama',
    title: 'Run Your Own Local RAG & Agent System: LangChain-Chatchat + Ollama',
    date: 'July 2026',
    readingTime: '7 min',
    tags: ['Local AI', 'RAG', 'OpSec'],
    excerpt:
      'Full offline RAG with knowledge-base Q&A and agent tools — Streamlit + FastAPI + LangChain + Ollama. 100% local: no API keys, no cloud.',
  },
  {
    slug: 'muscriptor-music-to-midi',
    title: 'Transcribe Any Music to MIDI Locally: MuScriptor',
    date: 'July 2026',
    readingTime: '5 min',
    tags: ['Local AI', 'Audio'],
    excerpt:
      'Turn any audio into per-instrument MIDI locally with MuScriptor — 1-click Pinokio or native Python, CPU-capable across all model sizes.',
  },
  {
    slug: 'x402-sota-setup',
    title: 'x402 SOTA Setup: HTTP-Native Stablecoin Payments for APIs & Agents',
    date: 'July 2026',
    readingTime: '12 min',
    tags: ['Web3', 'Agents', 'OpSec'],
    excerpt:
      'Optional deep reference for payment-gated APIs (HTTP 402 + USDC). Prefer the SOTA stack + workshop for the product path.',
  },
];

const tutorials = tutorialIndex.map((entry) => ({
  slug: entry.id,
  title: entry.title,
  date: entry.date || '',
  readingTime: '8 min',
  tags: entry.tags,
  excerpt: entry.excerpt,
}));

const TAG_ORDER = ['Web3', 'Local AI', 'Agents', 'RAG', 'Audio', 'OpSec'];

const tagTextClass = (tag: string) =>
  tag === 'Agents' ? 'text-[var(--accent-purple)]' :
  tag === 'Web3' ? 'text-[var(--accent-orange)]' :
  tag === 'Audio' || tag === 'OpSec' ? 'text-[var(--accent-amber)]' :
  'text-[var(--accent-cyan)]';

export default function Tutorials() {
  const [tags, setTags] = useState<string[]>([]);

  const toggle = (v: string) =>
    setTags((list) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]));

  const filtered =
    tags.length === 0 ? tutorials : tutorials.filter((t) => t.tags.some((tag) => tags.includes(tag)));

  const tagOptions = TAG_ORDER.filter((t) => tutorials.some((tut) => tut.tags.includes(t))).map((t) => ({
    value: t,
    label: t,
    count: tutorials.filter((tut) => tut.tags.includes(t)).length,
  }));

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-6">
            <BackLink fallback="/" label="Back to home" className="inline-flex items-center gap-1.5 text-[var(--accent-cyan)] text-sm hover:underline group" />
          </div>
          <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-3">Resources</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">Tutorials</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            High-signal technical breakdowns with clear architecture, setup steps, and OpSec hardening —
            local-first by default.
          </p>
        </div>

        {/* Two-column: sticky filters + content */}
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside className="mb-10 lg:mb-0">
            <FilterSidebar
              groups={[{ title: 'Topic', options: tagOptions, selected: tags, onToggle: toggle }]}
              onClear={() => setTags([])}
            />
          </aside>

          <div className="min-w-0">
            <div className="mb-6 text-sm text-[var(--text-muted)]">
              {filtered.length} tutorial{filtered.length !== 1 ? 's' : ''}
              {tags.length > 0 && <span> · filtered</span>}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                <p className="text-lg text-[var(--text-secondary)] mb-2">No tutorials match these filters</p>
                <button onClick={() => setTags([])} className="text-sm text-[var(--accent-cyan)] hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 stagger-children">
                {filtered.map((t) => (
                  <div
                    key={t.slug}
                    className="relative group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 transition-all duration-200 hover:border-[var(--accent-cyan)]/25 hover:bg-[var(--bg-elevated)]"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                      <span className="text-[var(--text-muted)]">{t.date}</span>
                      <span className="text-[var(--text-disabled)]">·</span>
                      <span className="text-[var(--text-muted)]">{t.readingTime} read</span>
                      <span className="text-[var(--text-disabled)]">·</span>
                      {t.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggle(tag)}
                          className={`relative z-10 font-medium hover:underline ${tagTextClass(tag)} ${tags.includes(tag) ? 'underline' : ''}`}
                          title={`Filter by ${tag}`}
                        >
                          {tag}
                        </button>
                      ))}
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[1px] uppercase border border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]">
                        Tutorial
                      </span>
                    </div>
                    <Link href={`/tutorials/${t.slug}/`} className="after:absolute after:inset-0">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">{t.title}</h3>
                    </Link>
                    <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-3 line-clamp-2">{t.excerpt}</p>
                    <div className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-cyan)] group-hover:gap-1.5 transition-all">
                      Read full tutorial
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
