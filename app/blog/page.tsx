'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

const posts = [
  {
    title: "Sleeper Agents: When AI Models Learn to Hide Their True Intentions",
    date: "July 1, 2026",
    category: "AI",
    type: "Deep Dive",
    excerpt: "Anthropic demonstrated that LLMs can be trained as sleeper agents — acting helpfully during training then switching to malicious behavior on specific triggers. Standard safety training not only failed to remove the backdoors, but sometimes made models better at hiding them.",
    slug: "sleeper-agents-deceptive-llms"
  },
  {
    title: "vLLM Semantic Router: Mixture-of-Models Intent Routing",
    date: "July 1, 2026",
    category: "AI",
    type: "Tool",
    excerpt: "Hugging Face community project vLLM Semantic Router (vLLM-SR) introduces a signal-driven Mixture-of-Models (MoM) router. 16 signal families and 12 routing strategies intelligently direct LLM requests to the optimal model based on intent, cost, latency, safety, and privacy.",
    slug: "vllm-semantic-router-mixture-of-models"
  },
  {
    title: "GitHub Security Audit: Find Leaked Secrets, Overprivileged CI/CD, and Fake Contributors in 30 Minutes",
    date: "July 1, 2026",
    category: "OpSec",
    type: "Tutorial",
    excerpt: "Your GitHub org is the front door to your codebase. A complete GitHub security audit using Octoscan, Trufflehog, GitXRay, and Legitify — the same tools the Red Guild bundles in their DevSecOps toolkit.",
    slug: "github-security-audit-tutorial"
  },
  {
    title: "CI/CD Pipeline Hardening for Web3: Stop Deploying Malicious Contracts Through Your Own Workflows",
    date: "July 1, 2026",
    category: "OpSec",
    type: "Tutorial",
    excerpt: "Your CI/CD pipeline has access to deployer keys, RPC endpoints, and production infrastructure. Lock it down with Checkov, Semgrep, Octoscan, and opsec patterns that actually work.",
    slug: "cicd-pipeline-hardening-web3"
  },
  {
    title: "NVIDIA's Fast FoundationStereo: The Compression-to-Edge Pipeline Goes Visual",
    date: "June 26, 2026",
    category: "AI",
    type: "Deep Dive",
    excerpt: "NVIDIA's compact stereo depth model — 14.6M params, 10× faster, zero-shot, edge-deployable. The compression-to-edge playbook now covers every frontier model across every modality. Implications for robotics, manufacturing, defense.",
    slug: "nvidia-fast-foundation-stereo"
  },
  {
    title: "0.7 Nanometers: IBM Breaks the Physical Limits of Chip Scaling",
    date: "June 25, 2026",
    category: "Hardware",
    type: "Deep Dive",
    excerpt: "IBM just unveiled the world's first sub-1nm chip — 0.7nm with a revolutionary 3D nanostack architecture. ~100 billion transistors, 50% faster, 70% more efficient. Production within 5 years.",
    slug: "ibm-sub-1nm-chip"
  },
  {
    title: "ENS and the Independent Board Question",
    date: "June 25, 2026",
    category: "Web3",
    type: "Thought",
    excerpt: "A proposal to restructure the ENS Foundation with an independent board and world-class members — without touching the treasury. The DAO is asking hard governance questions.",
    slug: "ens-independent-board-governance"
  },
  {
    title: "DeFi Weekly — June 23, 2026",
    date: "June 23, 2026",
    category: "Web3",
    type: "Dashboard",
    excerpt: "True DeFi pulse: token unlocks ahead, macro crosscurrents, Liquity v2 traction, WalletBeat milestones, the STRC depeg, and the cypherpunk layer.",
    slug: "defi-weekly-june-23"
  },
  {
    title: "Stablecoins: The Fed's Newest Treasury Financing Channel",
    date: "June 23, 2026",
    category: "Web3",
    type: "Thought",
    excerpt: "Fed Governor Waller just acknowledged what the data shows: dollar-backed stablecoins are becoming a structural demand channel for US government debt. Tether alone is the 17th-largest holder.",
    slug: "stablecoins-fed-treasury-channel"
  },
  {
    title: "638 ETH for Ethereum Security: The Largest QF Round in History",
    date: "June 23, 2026",
    category: "Web3",
    type: "Deep Dive",
    excerpt: "The Ethereum Security QF Round wrapped with 638+ ETH distributed to 134 projects. What this means for security infrastructure, risk dashboards like DeFiScan, L2Beat, and AntiCapture, and the teams building them.",
    slug: "ethereum-security-qf-round"
  },
  {
    title: "Qwen3.6-35B-A3B: Uncensored VLM Meets MoE Efficiency",
    date: "June 22, 2026",
    category: "AI",
    type: "Thought",
    excerpt: "Alibaba's latest drops with 35B total parameters but only 3B active — and zero refusal filters. What this means for local-first, sovereign multimodal AI.",
    slug: "qwen3-6-uncensored-vlm-moe"
  },
  {
    title: "Risk Dashboards & OpSec Tooling for Web3",
    date: "June 10, 2026",
    category: "OpSec",
    type: "Deep Dive",
    excerpt: "Mapping the most useful risk and transparency layers currently available for EVM and sovereign operations — L2Beat, WalletBeat, DefiScan, AntiCapture, SEAL911 and more.",
    slug: "risk-dashboards-opsec"
  },
  {
    title: "Inside a $292M DeFi Crisis: Lessons from KPK's rsETH War Room",
    date: "June 18, 2026",
    category: "OpSec",
    type: "Deep Dive",
    excerpt: "A rare inside account of institutional incident response during a live DeFi exploit. KPK's war room activated in 20 minutes, 97 new monitors shipped post-incident, and actionable steps for Web3 teams.",
    slug: "lessons-from-kpk-war-room"
  },
  {
    title: "First Principles for Sovereign AI Agents",
    date: "June 10, 2026",
    category: "AI",
    type: "Thought",
    excerpt: "Local-first by default. Keys never leave the machine. Minimal attack surface. Human in the loop for high-stakes actions. The rules we refuse to negotiate.",
    slug: "first-principles"
  },
  {
    title: "Prediction Markets on MegaETH + Evently Positioning",
    date: "June 2026",
    category: "Intelligence",
    type: "Deep Dive",
    excerpt: "Deep research on on-chain intelligence, prediction markets, and how Delta V can position in the emerging intelligence layer.",
    slug: "#"
  },
  {
    title: "Macro Landscape Q3 2026: Policy Divergence and Market Fragmentation",
    date: "June 2026",
    category: "Markets",
    type: "Macro",
    excerpt: "Central bank balance sheet trends, DXY regimes, and commodity signals feeding the IntelHub Macro dashboard. Positioning for the second half of 2026.",
    slug: "#"
  }
];

const allCategories = ['All', 'AI', 'Web3', 'OpSec', 'Hardware', 'Intelligence', 'Markets'];

const categoryColors: Record<string, string> = {
  'All': 'bg-white/5 text-white/70 border-white/10',
  'AI': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Web3': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'OpSec': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Hardware': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intelligence': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Markets': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const categoryActiveColors: Record<string, string> = {
  'AI': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  'Web3': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'OpSec': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  'Hardware': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'Intelligence': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  'Markets': 'bg-rose-500/20 text-rose-300 border-rose-500/40',
};

const typeBadge: Record<string, string> = {
  'Deep Dive': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  'Thought': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  'Tutorial': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Dashboard': 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  'Macro': 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  'Tool': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-8 py-16">
        <a href="/" className="text-[#00f0ff] text-sm hover:underline">← Back to home</a>
        <h1 className="text-6xl font-semibold tracking-[-2px] mt-4 mb-2">Blog</h1>
        <p className="text-[#aaa] text-lg mb-8">High-signal writing from IntelHub — deep dives, intelligence reports, and tutorials on sovereign AI, Web3 OpSec, and self-sovereign systems.</p>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allCategories.map(cat => {
            const isActive = activeCategory === cat;
            const isAll = cat === 'All';
            const count = cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  isAll && isActive
                    ? 'bg-white/10 text-white border-white/20'
                    : isAll
                    ? categoryColors['All']
                    : isActive
                    ? categoryActiveColors[cat] || 'bg-white/10 text-white border-white/20'
                    : categoryColors[cat] || 'bg-white/5 text-white/40 border-white/10'
                } hover:scale-105`}
              >
                {cat}
                <span className={`text-[10px] ${isActive ? 'opacity-70' : 'opacity-40'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Post list */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-[#666]">
              <p className="text-lg mb-2">No posts in this category yet</p>
              <p className="text-sm">Check back soon or browse another category.</p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <a
                key={index}
                href={post.slug !== '#' ? `/blog/${post.slug}` : '#'}
                className={`block border border-[#222] rounded-2xl p-6 transition-all duration-200 ${
                  post.slug !== '#' 
                    ? 'hover:border-[#00f0ff] hover:bg-[#111] group cursor-pointer' 
                    : 'opacity-50 cursor-default'
                }`}
              >
                <div className="flex items-center gap-3 text-sm text-[#666] mb-2">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className={`font-medium ${
                    post.category === 'AI' ? 'text-cyan-400' :
                    post.category === 'Web3' ? 'text-purple-400' :
                    post.category === 'OpSec' ? 'text-amber-400' :
                    post.category === 'Hardware' ? 'text-emerald-400' :
                    post.category === 'Intelligence' ? 'text-indigo-400' :
                    post.category === 'Markets' ? 'text-rose-400' :
                    'text-[#00f0ff]'
                  }`}>{post.category}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase ${typeBadge[post.type] || 'bg-white/5 text-white/40 border border-white/10'}`}>
                    {post.type}
                  </span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  post.slug !== '#' ? 'group-hover:text-[#00f0ff]' : ''
                } transition-colors`}>{post.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed mb-3">{post.excerpt}</p>
                {post.slug !== '#' ? (
                  <div className="text-[#00f0ff] text-xs font-medium">Read full article →</div>
                ) : (
                  <div className="text-[#555] text-xs">Coming soon</div>
                )}
              </a>
            ))
          )}
        </div>

        <div className="mt-16 text-center text-sm text-[#666]">
          More articles generated through the IntelHub pipeline.
        </div>
      </div>
    </div>
  );
}
