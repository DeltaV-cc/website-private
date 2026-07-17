'use client';
import Link from 'next/link';
import { useState } from 'react';
import BackLink from '@/app/components/BackLink';
import FilterSidebar from '@/app/components/FilterSidebar';

const posts = [
  {
    title: "DeFi Weekly — July 13, 2026",
    date: "July 13, 2026",
    category: "DeFi Weekly",
    type: "Dashboard",
    excerpt: "BTC holds $64K after reclaiming from sub-$60K June lows. Spot ETF outflow streak breaks after 6 weeks. AAVE V4 deposits surpass $250M. MSTR navigates first treasury underwater test.",
    slug: "defi-weekly-july-13"
  },
  {
    title: "DeFi Weekly — July 10, 2026",
    date: "July 10, 2026",
    category: "DeFi Weekly",
    type: "Dashboard",
    excerpt: "The Great Rotation: AI capex doubts trigger a historic pivot to value stocks. Robinhood ships its own Arbitrum L2 with 24/7 tokenized equities. Open USD lands with 140 partners. Plus: BonkDAO $19.3M governance attack, four stablecoin depegs.",
    slug: "defi-weekly-july-10"
  },
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
  );

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
                      <span className="text-[var(--text-muted)]">{post.date}</span>
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
                        <h3 className="text-lg md:text-xl font-semibold mb-2 leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">{post.title}</h3>
                      </Link>
                    ) : (
                      <h3 className="text-lg md:text-xl font-semibold mb-2 leading-snug">{post.title}</h3>
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
