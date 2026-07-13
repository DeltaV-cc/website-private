'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const posts = [
  {
    title: "Tencent's Hy3: 295B MoE That Punches at Trillion-Scale — Apache 2.0, 256K Context, Agent-First",
    date: "July 8, 2026",
    category: "AI",
    type: "Deep Dive",
    excerpt: "Tencent drops Hy3, a 295B MoE model with only 21B active parameters that rivals trillion-parameter flagships. Apache 2.0 license, 256K context, 192 experts, built for agentic workloads.",
    slug: "tencent-hy3-295b-moe"
  },
  {
    title: "Sleeper Agents: When AI Models Learn to Hide Their True Intentions",
    date: "July 1, 2026",
    category: "AI",
    type: "Deep Dive",
    excerpt: "Anthropic demonstrated that LLMs can be trained as sleeper agents — acting helpfully during training then switching to malicious behavior on specific triggers.",
    slug: "sleeper-agents-deceptive-llms"
  },
  {
    title: "vLLM Semantic Router: Mixture-of-Models Intent Routing",
    date: "July 1, 2026",
    category: "AI",
    type: "Tool",
    excerpt: "Hugging Face community project vLLM Semantic Router introduces a signal-driven Mixture-of-Models router. 16 signal families and 12 routing strategies.",
    slug: "vllm-semantic-router-mixture-of-models"
  },
  {
    title: "FAST-AR: NVIDIA Cracks the Video Diffusion Bottleneck — 10× Faster",
    date: "July 6, 2026",
    category: "AI",
    type: "Deep Dive",
    excerpt: "NVIDIA Research's FAST-AR framework eliminates the KV-cache bottleneck in autoregressive video diffusion, enabling 5-10x speedups.",
    slug: "fast-ar-video-diffusion"
  },
  {
    title: "GitHub Security Audit: Find Leaked Secrets in 30 Minutes",
    date: "July 1, 2026",
    category: "OpSec",
    type: "Tutorial",
    excerpt: "A complete GitHub security audit using Octoscan, Trufflehog, GitXRay, and Legitify — the same tools the Red Guild bundles.",
    slug: "github-security-audit-tutorial"
  },
  {
    title: "CI/CD Pipeline Hardening for Web3: Stop Deploying Malicious Contracts",
    date: "July 1, 2026",
    category: "OpSec",
    type: "Tutorial",
    excerpt: "Your CI/CD pipeline has access to deployer keys and production infrastructure. Lock it down with Checkov, Semgrep, and Octoscan.",
    slug: "cicd-pipeline-hardening-web3"
  },
  {
    title: "NVIDIA's Fast FoundationStereo: Compression-to-Edge Goes Visual",
    date: "June 26, 2026",
    category: "AI",
    type: "Deep Dive",
    excerpt: "NVIDIA's compact stereo depth model — 14.6M params, 10× faster, zero-shot, edge-deployable. Implications for robotics, manufacturing, defense.",
    slug: "nvidia-fast-foundation-stereo"
  },
  {
    title: "0.7 Nanometers: IBM Breaks the Physical Limits of Chip Scaling",
    date: "June 25, 2026",
    category: "Hardware",
    type: "Deep Dive",
    excerpt: "IBM unveiled the world's first sub-1nm chip — 0.7nm with revolutionary 3D nanostack architecture. ~100 billion transistors.",
    slug: "ibm-sub-1nm-chip"
  },
  {
    title: "ENS and the Independent Board Question",
    date: "June 25, 2026",
    category: "Web3",
    type: "Thought",
    excerpt: "A proposal to restructure the ENS Foundation with an independent board — without touching the treasury. Hard governance questions.",
    slug: "ens-independent-board-governance"
  },
  {
    title: "DeFi Weekly — June 23, 2026",
    date: "June 23, 2026",
    category: "DeFi Weekly",
    type: "Dashboard",
    excerpt: "True DeFi pulse: token unlocks ahead, macro crosscurrents, Liquity v2 traction, WalletBeat milestones, the STRC depeg.",
    slug: "defi-weekly-june-23"
  },
  {
    title: "DeFi Weekly — June 27, 2026",
    date: "June 27, 2026",
    category: "DeFi Weekly",
    type: "Dashboard",
    excerpt: "BTC breaks below $60K, spot ETFs bleed 6th straight week, MSTR treasury $13.3B underwater, Robinhood raises $2.2B convertible — AAVE +30% stands alone.",
    slug: "defi-weekly-june-27"
  },
  {
    title: "Stablecoins: The Fed's Newest Treasury Financing Channel",
    date: "June 23, 2026",
    category: "Web3",
    type: "Thought",
    excerpt: "Fed Governor Waller acknowledged what the data shows: dollar-backed stablecoins are becoming structural demand for US government debt.",
    slug: "stablecoins-fed-treasury-channel"
  },
  {
    title: "638 ETH for Ethereum Security: The Largest QF Round in History",
    date: "June 23, 2026",
    category: "Web3",
    type: "Deep Dive",
    excerpt: "The Ethereum Security QF Round wrapped with 638+ ETH distributed to 134 projects. What this means for security infrastructure.",
    slug: "ethereum-security-qf-round"
  },
  {
    title: "Qwen3.6-35B-A3B: Uncensored VLM Meets MoE Efficiency",
    date: "June 22, 2026",
    category: "AI",
    type: "Thought",
    excerpt: "Alibaba's latest drops with 35B total parameters but only 3B active — and zero refusal filters. Local-first, sovereign multimodal AI.",
    slug: "qwen3-6-uncensored-vlm-moe"
  },
  {
    title: "Risk Dashboards & OpSec Tooling for Web3",
    date: "June 10, 2026",
    category: "OpSec",
    type: "Deep Dive",
    excerpt: "Mapping the most useful risk and transparency layers for EVM and sovereign operations — L2Beat, WalletBeat, DefiScan, AntiCapture, SEAL911.",
    slug: "risk-dashboards-opsec"
  },
  {
    title: "Inside a $292M DeFi Crisis: Lessons from KPK's rsETH War Room",
    date: "June 18, 2026",
    category: "OpSec",
    type: "Deep Dive",
    excerpt: "A rare inside account of institutional incident response during a live DeFi exploit. KPK's war room activated in 20 minutes.",
    slug: "lessons-from-kpk-war-room"
  },
  {
    title: "First Principles for Sovereign AI Agents",
    date: "June 10, 2026",
    category: "AI",
    type: "Thought",
    excerpt: "Local-first by default. Keys never leave the machine. Minimal attack surface. Human in the loop for high-stakes actions.",
    slug: "first-principles"
  },
];

const allCategories = ['All', 'AI', 'Web3', 'OpSec', 'DeFi Weekly', 'Hardware'];

const categoryConfig: Record<string, { color: string; active: string }> = {
  'All':    { color: 'border-[var(--border-default)] bg-white/[0.03] text-[var(--text-tertiary)]', active: 'border-white/20 bg-white/8 text-white' },
  'AI':     { color: 'border-[var(--accent-cyan)]/15 bg-[var(--accent-cyan)]/5 text-[var(--accent-cyan)]/60', active: 'border-[var(--accent-cyan)]/35 bg-[var(--accent-cyan)]/12 text-[var(--accent-cyan)]' },
  'Web3':   { color: 'border-[var(--accent-orange)]/15 bg-[var(--accent-orange)]/5 text-[var(--accent-orange)]/60', active: 'border-[var(--accent-orange)]/35 bg-[var(--accent-orange)]/12 text-[var(--accent-orange)]' },
  'OpSec':  { color: 'border-[var(--accent-amber)]/15 bg-[var(--accent-amber)]/5 text-[var(--accent-amber)]/60', active: 'border-[var(--accent-amber)]/35 bg-[var(--accent-amber)]/12 text-[var(--accent-amber)]' },
  'DeFi Weekly': { color: 'border-[var(--accent-gold)]/20 bg-[var(--accent-gold)]/5 text-[var(--accent-gold)]/70', active: 'border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]' },
  'Hardware':{ color: 'border-[var(--accent-purple)]/15 bg-[var(--accent-purple)]/5 text-[var(--accent-purple)]/60', active: 'border-[var(--accent-purple)]/35 bg-[var(--accent-purple)]/12 text-[var(--accent-purple)]' },
};

const typeConfig: Record<string, string> = {
  'Deep Dive': 'border-[var(--accent-purple)]/20 bg-[var(--accent-purple)]/8 text-[var(--accent-purple)]',
  'Thought':   'border-[var(--accent-amber)]/20 bg-[var(--accent-amber)]/8 text-[var(--accent-amber)]',
  'Tutorial':  'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]',
  'Dashboard': 'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]',
  'Tool':      'border-[var(--accent-cyan)]/20 bg-[var(--accent-cyan)]/8 text-[var(--accent-cyan)]',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [nlData, setNlData] = useState<any>(null);

  useEffect(() => {
    fetch('https://deltav-cc.github.io/website-private/data/artemis-newsletter.json')
      .then(r => r.json())
      .then(d => setNlData(d))
      .catch(() => {});
  }, []);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[var(--accent-cyan)] text-sm hover:underline mb-6 group">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5"><path d="M10 7H3M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">Blog</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed">
            High-signal writing from IntelHub — deep dives, intelligence reports, and tutorials on sovereign AI, Web3 OpSec, and self-sovereign systems.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allCategories.map(cat => {
            const isActive = activeCategory === cat;
            const cfg = categoryConfig[cat];
            const count = cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  isActive ? cfg.active : cfg.color
                } hover:scale-105`}
              >
                {cat}
                <span className={`text-[10px] ${isActive ? 'opacity-80' : 'opacity-40'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Live DeFi Weekly Card */}
        {nlData?.latest_weekly && (
          <Link href="/blog/defi-weekly/" className="block mb-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--accent-gold)]/30 transition-all group cursor-pointer">
            <div className="flex-1 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-[1.5px] font-bold">DeFi Weekly</span>
                <span className="text-[10px] text-[var(--text-muted)]">· Latest edition</span>
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors mb-2">
                {nlData.latest_weekly.title}
              </h2>
              <p className="text-sm text-[var(--text-tertiary)] line-clamp-2 leading-relaxed mb-3">
                {nlData.latest_weekly.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                {nlData.latest_weekly.author && <span>{nlData.latest_weekly.author}</span>}
                <span>{nlData.last_weekly_date ? new Date(nlData.last_weekly_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                <span>·</span>
                <span className="text-[var(--accent-gold)] font-medium group-hover:underline">View roundup →</span>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[var(--text-secondary)] mb-2">No posts in this category yet</p>
            <p className="text-sm text-[var(--text-tertiary)]">Check back soon or browse another category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 stagger-children">
            {filteredPosts.map((post, i) => (
              <a
                key={i}
                href={post.slug !== '#' ? `/blog/${post.slug}/` : '#'}
                className={`group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 transition-all duration-200 ${
                  post.slug !== '#' 
                    ? 'hover:border-[var(--accent-cyan)]/25 hover:bg-[var(--bg-elevated)] cursor-pointer' 
                    : 'opacity-40 cursor-default'
                }`}
              >
                <div className="flex items-center gap-2 text-xs mb-3">
                  <span className="text-[var(--text-muted)]">{post.date}</span>
                  <span className="text-[var(--text-disabled)]">·</span>
                  <span className={`font-medium ${
                    post.category === 'AI' ? 'text-[var(--accent-cyan)]' :
                    post.category === 'Web3' ? 'text-[var(--accent-orange)]' :
                    post.category === 'OpSec' ? 'text-[var(--accent-amber)]' :
                    post.category === 'DeFi Weekly' ? 'text-[var(--accent-gold)]' :
                    'text-[var(--accent-purple)]'
                  }`}>{post.category}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[1px] uppercase border ${typeConfig[post.type] || 'border-white/5 bg-white/[0.03] text-[var(--text-muted)]'}`}>
                    {post.type}
                  </span>
                </div>
                <h3 className={`text-lg md:text-xl font-semibold mb-2 leading-snug ${
                  post.slug !== '#' ? 'group-hover:text-[var(--accent-cyan)]' : ''
                } transition-colors`}>{post.title}</h3>
                <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                {post.slug !== '#' ? (
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-cyan)] group-hover:gap-1.5 transition-all">
                    Read full article
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                ) : (
                  <div className="text-xs text-[var(--text-disabled)]">Coming soon</div>
                )}
              </a>
            ))}
          </div>
        )}

        <div className="mt-16 text-center text-sm text-[var(--text-muted)]">
          More articles generated through the IntelHub pipeline.
        </div>
      </div>
    </div>
  );
}
