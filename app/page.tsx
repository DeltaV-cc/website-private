'use client';

import React from 'react';
import Link from 'next/link';
import CuratedIntel from './components/CuratedIntel';

/* Inline SVG decorative icons - no icon library */
const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BulletIcon = ({ className = '' }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DeltaVSite() {
  return (
    <>
      {/* -- Hero --------------------------------------------- */}
      <section className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Ambient glow */}
        <div className="ambient-glow ambient-glow-cyan -top-20 left-1/4 w-[500px] h-[500px]" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-orange top-20 right-0 w-[400px] h-[400px]" aria-hidden="true" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-16 md:pb-20 relative">
          <div className="max-w-4xl">
            <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-3px] leading-[0.95] mb-8 animate-fade-in-up">
              We don&apos;t sell tools.
              <br />
              <span className="text-[var(--text-secondary)]">We forge</span>{' '}
              <span className="gradient-text">capabilities.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Sovereign AI, Web3, and OpSec engineering for high-stakes operators. 
              Local-first by default. Keys never leave the machine.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link
                href="/intelhub/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
              >
                Explore IntelHub
                <ArrowRight />
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:border-[var(--accent-cyan)]/30 hover:text-[var(--accent-cyan)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
              >
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* -- Three Pillars --------------------------------------- */}
      <section id="pillars" className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24" aria-labelledby="pillars-heading">
        <div className="mb-10">
          <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-3">What We Do</div>
          <h2 id="pillars-heading" className="text-3xl md:text-4xl font-semibold tracking-[-1.5px]">Three pillars. One mission.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 stagger-children">
          {/* AI Pillar - cyan accent */}
          <Link
            href="/ai/"
            className="group flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 card-interactive card-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
          >
            <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[2px] uppercase mb-4">Pillar 01</div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">AI Engineering</h3>
            <div className="space-y-4 text-sm flex-1 text-[var(--text-secondary)]">
              <div className="flex gap-3">
                <span className="text-[var(--accent-cyan)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">Tailored Multi-Agent Systems</div>
                  <div className="text-[var(--text-tertiary)]">Custom architectures for operations, business, marketing, and intelligence.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent-cyan)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">Inference & Model Engineering</div>
                  <div className="text-[var(--text-tertiary)]">Production-grade deployment with Hugging Face and custom frameworks.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent-cyan)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">AI Engineer Retainer</div>
                  <div className="text-[var(--text-tertiary)]">Ongoing optimization and security for your agent systems.</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-cyan)] group-hover:gap-2.5 transition-all">
                Upgrade with AI <ArrowRight />
              </span>
            </div>
          </Link>

          {/* Web3 Pillar - orange accent */}
          <Link
            href="/web3/"
            className="group flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 card-interactive card-accent-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-orange)]"
          >
            <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[2px] uppercase mb-4">Pillar 02</div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Web3</h3>
            <div className="space-y-4 text-sm flex-1 text-[var(--text-secondary)]">
              <div className="flex gap-3">
                <span className="text-[var(--accent-orange)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">SOTA Setup & Architecture</div>
                  <div className="text-[var(--text-tertiary)]">High-signal guidance for DeFi protocols, on-chain agents, and infrastructure.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent-orange)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">Web3 Intelligence & OSINT</div>
                  <div className="text-[var(--text-tertiary)]">Continuous monitoring of DeFi, privacy tech, EIPs, and ecosystem signals.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent-orange)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">Growth Boost</div>
                  <div className="text-[var(--text-tertiary)]">Strategic expansion with OpSec foundations.</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-orange)] group-hover:gap-2.5 transition-all">
                Build on Web3 <ArrowRight />
              </span>
            </div>
          </Link>

          {/* Forge Pillar - purple accent */}
          <Link
            href="/forge/"
            className="group flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 card-interactive card-accent-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)]"
          >
            <div className="text-[var(--accent-purple)] text-xs font-semibold tracking-[2px] uppercase mb-4">Pillar 03</div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Skill Forge</h3>
            <div className="space-y-4 text-sm flex-1 text-[var(--text-secondary)]">
              <div className="flex gap-3">
                <span className="text-[var(--accent-purple)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">Personal AI Mastery</div>
                  <div className="text-[var(--text-tertiary)]">Self-sovereign program for building and running personal AI systems with strong OpSec.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent-purple)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">AI Engineering Bootcamp</div>
                  <div className="text-[var(--text-tertiary)]">5-day intensive focused on building real production systems.</div>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent-purple)] mt-0.5 flex-shrink-0">
                  <BulletIcon />
                </span>
                <div>
                  <div className="font-medium text-[var(--text-primary)] mb-0.5">OpSec Training & Auditing</div>
                  <div className="text-[var(--text-tertiary)]">Platform-specific hardening: Windows, Linux, macOS.</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-purple)] group-hover:gap-2.5 transition-all">
                Forge skills <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* -- Curated Intel -------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24" aria-labelledby="intel-heading">
        <CuratedIntel />
      </section>

      {/* -- Flagship Offerings ------------------------------ */}
      <section id="offerings" className="bg-[var(--bg-surface)] border-y border-[var(--border-default)]" aria-labelledby="offerings-heading">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="mb-14">
            <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-3">Flagship Offerings</div>
            <h2 id="offerings-heading" className="text-3xl md:text-4xl font-semibold tracking-[-1.5px] max-w-2xl">
              Precision-built systems for serious builders.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 stagger-children">
            <Link
              href="/forge/"
              className="group flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-8 md:p-10 card-interactive card-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Personal AI Mastery</h3>
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center text-[var(--accent-cyan)] group-hover:bg-[var(--accent-cyan)]/20 transition-colors" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed flex-1">
                A practical program for building and running your own personal AI systems with extreme operational security and long-term autonomy.
              </p>
              <div className="mt-8 flex justify-end">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-cyan)] group-hover:gap-2.5 transition-all">
                  View Curriculum <ArrowRight />
                </span>
              </div>
            </Link>

            <Link
              href="/forge/"
              className="group flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-8 md:p-10 card-interactive card-accent-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-orange)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold">AI Engineering Bootcamp</h3>
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-orange)]/10 flex items-center justify-center text-[var(--accent-orange)] group-hover:bg-[var(--accent-orange)]/20 transition-colors" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l8 8-8 8L2 10l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed flex-1">
                5-day intensive program where participants leave with fully functional production systems. Zero to deployed.
              </p>
              <div className="mt-8 flex justify-end">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-orange)] group-hover:gap-2.5 transition-all">
                  Apply for Next Cohort <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* -- Trusted By ------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20" aria-label="Trusted by">
        <div className="text-center mb-10">
          <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-3">Trusted By</div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          <a href="https://www.defiscan.info/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0 rounded-lg">
            <img src="/website-private/images/defiscan-logo.svg" alt="DeFiScan" className="h-8 w-auto max-w-[140px]" />
          </a>
          <a href="https://storm.partners/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0 rounded-lg">
            <img src="/website-private/images/storm-partners-logo.svg" alt="STORM Partners" className="h-6 w-auto" />
            <svg width="17" height="24" viewBox="0 0 17 24" fill="none" className="h-4 w-auto flex-shrink-0" aria-hidden="true"><path d="M4.459 24L9.356 8h7.078L4.459 24zM5.607 16H0l4.898-16h5.607L5.607 16z" fill="#FFCC00"/></svg>
          </a>
          <a href="https://deficollective.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0 rounded-lg">
            <img src="/website-private/images/defi-collective-logo.svg" alt="DeFi Collective" className="h-9 w-auto max-w-[140px]" />
          </a>
        </div>
      </section>

      {/* -- CTA --------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24" aria-labelledby="cta-heading">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-10 md:p-14 text-center relative overflow-hidden">
          {/* Subtle ambient */}
          <div className="ambient-glow ambient-glow-orange -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[300px]" aria-hidden="true" />

          <div className="relative">
            <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-3">Stay in the Loop</div>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">High-signal updates only.</h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
              Curated intelligence, technical breakdowns, and new tutorials delivered directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link
                href="/intelhub/"
                className="flex-1 px-6 py-3.5 bg-[var(--accent-orange)] text-white rounded-xl font-medium hover:bg-[#d94d0f] transition-colors text-center text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-orange)]"
              >
                Browse IntelHub
              </Link>
              <Link
                href="/contact/"
                className="flex-1 px-6 py-3.5 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] rounded-xl hover:bg-[var(--accent-cyan)]/10 hover:border-[var(--accent-cyan)]/50 transition-all text-center text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
              >
                Get in Touch
              </Link>
              <Link
                href="/blog/"
                className="flex-1 px-6 py-3.5 bg-[var(--accent-purple)] text-white rounded-xl font-medium hover:bg-[#9333ea] transition-colors text-center text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)]"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
