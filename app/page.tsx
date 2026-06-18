'use client';

import React from 'react';
import CuratedIntel from './components/CuratedIntel';

export default function DeltaVSite() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      {/* New Navigation */}
      <nav className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-2xl font-semibold tracking-[-1px]">Delta V</a>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="/ai" className="hover:text-[#00f0ff] transition-colors">AI</a>
            <a href="/web3" className="hover:text-[#00f0ff] transition-colors">Web3</a>
            <a href="/forge" className="hover:text-[#00f0ff] transition-colors">Forge</a>
            <a href="/blog" className="hover:text-[#00f0ff] transition-colors">Blog</a>
            <a href="/intelhub" className="hover:text-[#00f0ff] transition-colors">IntelHub</a>
            <a href="/contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        
        <h1 className="text-7xl md:text-8xl font-semibold tracking-[-4.5px] leading-none mb-8">
          We don't sell tools.<br />We forge capabilities.
        </h1>
        
        <p className="max-w-[620px] mx-auto text-xl text-[#aaa]">
          We operate at the frontier of AI and Web3 with OpSec as our core principle — we build, integrate, and upskill with sovereignty in mind.
        </p>
      </div>

      {/* Three Pillars - Clickable */}
      <div id="pillars" className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Pillar 1: AI */}
          <a href="/ai" className="group flex flex-col bg-[#111] border border-[#222] hover:border-[#00f0ff] rounded-3xl p-10 transition-all duration-300">
            <div className="text-[#00f0ff] text-xs font-medium tracking-[2px] mb-4">PILLAR 01</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">AI Engineering</h3>
            
            <div className="space-y-6 text-sm flex-1">
              <div>
                <div className="font-medium mb-1">Tailored Multi-Agent Systems</div>
                <div className="text-[#aaa]">Custom multi-agent architectures for internal operations, business processes, marketing, and intelligence.</div>
              </div>
              <div>
                <div className="font-medium mb-1">Inference & Model Engineering</div>
                <div className="text-[#aaa]">Production-grade model deployment using Hugging Face and custom frameworks.</div>
              </div>
              <div>
                <div className="font-medium mb-1">AI Engineer Retainer</div>
                <div className="text-[#aaa]">Ongoing development, optimization, and security for your agent systems.</div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="px-6 py-2.5 bg-[#00f0ff] text-black rounded-xl text-sm font-medium group-hover:bg-white transition-colors">
                Upgrade with AI →
              </span>
            </div>
          </a>

          {/* Pillar 2: Web3 */}
          <a href="/web3" className="group flex flex-col bg-[#111] border border-[#222] hover:border-[#C2410C] rounded-3xl p-10 transition-all duration-300">
            <div className="text-[#C2410C] text-xs font-medium tracking-[2px] mb-4">PILLAR 02</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">Web3</h3>
            
            <div className="space-y-6 text-sm flex-1">
              <div>
                <div className="font-medium mb-1">SOTA Setup & Architecture Advisory</div>
                <div className="text-[#aaa]">High-signal architecture guidance and development for DeFi protocols, on-chain agents, and Web3 infrastructure.</div>
              </div>
              <div>
                <div className="font-medium mb-1">Web3 Intelligence & OSINT</div>
                <div className="text-[#aaa]">Continuous monitoring of DeFi, privacy tech, on-chain agents, EIPs, GitHub activity, and emerging ecosystem signals.</div>
              </div>
              <div>
                <div className="font-medium mb-1">Growth Boost</div>
                <div className="text-[#aaa]">Strategic expansion support across regions with strong OpSec foundations. Focus on EU & Swiss markets, public good advocacy, and fundraising.</div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="px-6 py-2.5 border border-[#C2410C] text-[#C2410C] rounded-xl text-sm font-medium group-hover:bg-[#C2410C] group-hover:text-white transition-colors">
                Build on Web3 →
              </span>
            </div>
          </a>

          {/* Pillar 3: Education / Forge */}
          <a href="/forge" className="group flex flex-col bg-[#111] border border-[#222] hover:border-[#00f0ff] rounded-3xl p-10 transition-all duration-300">
            <div className="text-[#00f0ff] text-xs font-medium tracking-[2px] mb-4">PILLAR 03</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">Skill Forge</h3>
            
            <div className="space-y-6 text-sm flex-1">
              <div>
                <div className="font-medium mb-1">Personal AI Mastery Course</div>
                <div className="text-[#aaa]">Self-sovereign program for building and running personal AI systems with strong OpSec.</div>
              </div>
              <div>
                <div className="font-medium mb-1">AI Engineering Bootcamp</div>
                <div className="text-[#aaa]">5-day intensive focused on building real production systems.</div>
              </div>
              <div>
                <div className="font-medium mb-1">OpSec Training & Auditing</div>
                <div className="text-[#aaa]">Platform-specific hardening: Windows, Linux, macOS. Tailored threat models, audits, and operational security protocols for individuals and teams.</div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <span className="px-6 py-2.5 bg-[#00f0ff] text-black rounded-xl text-sm font-medium group-hover:bg-white transition-colors">
                Forge skills →
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* RSS Feed */}
      <CuratedIntel />

      {/* Offerings Section - Harmonized CTAs */}
      <div id="offerings" className="bg-[#111] py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-16">
            <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">FLAGSHIP OFFERINGS</div>
            <h2 className="text-4xl font-semibold tracking-[-2px] max-w-3xl">Precision-built systems for serious builders.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Offering 1 */}
            <a href="/forge" className="flex flex-col bg-[#0a0a0a] border border-[#222] rounded-3xl p-10 group hover:border-[#00f0ff] transition-all">
              <h3 className="text-3xl font-semibold mb-4">Personal AI Mastery Course</h3>
              <p className="text-[#aaa] text-base leading-relaxed flex-1">
                A practical program for building and running your own personal AI systems with extreme operational security and long-term autonomy.
              </p>
              <div className="mt-8 flex justify-end">
                <span className="px-6 py-2.5 bg-[#00f0ff] text-black rounded-xl text-sm font-medium group-hover:bg-white transition-colors">
                  Explore Curriculum
                </span>
              </div>
            </a>

            {/* Offering 2 */}
            <a href="/forge" className="flex flex-col bg-[#0a0a0a] border border-[#222] rounded-3xl p-10 group hover:border-[#00f0ff] transition-all">
              <h3 className="text-3xl font-semibold mb-4">AI Engineering Bootcamp</h3>
              <p className="text-[#aaa] text-base leading-relaxed flex-1">
                5-day intensive program where participants leave with fully functional production systems.
              </p>
              <div className="mt-8 flex justify-end">
                <span className="px-6 py-2.5 border border-[#C2410C] text-[#C2410C] rounded-xl text-sm font-medium group-hover:bg-[#C2410C] group-hover:text-white transition-colors">
                  Apply for Next Cohort
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Past Clients - Trusted by */}
      <div className="max-w-5xl mx-auto px-8 py-16 border-t border-[#222]">
        <div className="text-[#C2410C] text-sm font-medium tracking-[2px] mb-8">TRUSTED BY</div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          <a href="https://www.defiscan.info/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-36 h-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <img src="/images/defiscan-logo.svg" alt="DeFiScan" className="h-8 w-auto max-w-full" />
          </a>
          <a href="https://storm.partners/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 w-36 h-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <img src="/images/storm-partners-logo.svg" alt="STORM Partners" className="h-6 w-auto" />
            <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto flex-shrink-0"><path d="M4.45898 23.999L9.35645 7.99902H16.4336L4.45898 23.999ZM5.60742 16H0L4.89844 0H10.5049L5.60742 16Z" fill="#FFCC00"/></svg>
          </a>
          <a href="https://deficollective.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-36 h-10 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <img src="/images/defi-collective-logo.svg" alt="DeFi Collective" className="h-9 w-auto max-w-full" />
          </a>
        </div>
      </div>

      {/* Newsletter Banner */}
      <div className="max-w-5xl mx-auto px-8 py-24 border-t border-[#222]">
        <div className="bg-[#111] border border-[#222] rounded-3xl p-14 text-center">
          <div className="text-[#C2410C] text-sm font-medium tracking-[2px] mb-3">STAY IN THE LOOP</div>
          <h3 className="text-4xl font-semibold tracking-tight mb-4">High-signal updates only.</h3>
          <p className="text-[#aaa] max-w-md mx-auto mb-8">
            Curated intelligence, technical breakdowns, and new tutorials delivered directly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a href="/intelhub" className="flex-1 px-8 py-4 bg-[#C2410C] text-white rounded-xl font-medium hover:bg-[#e04e1a] transition-colors text-center">
              Browse IntelHub
            </a>
            <a href="/contact" className="flex-1 px-8 py-4 border border-[#00f0ff] text-[#00f0ff] rounded-xl hover:bg-[#00f0ff] hover:text-black transition-colors text-center">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-8 py-16 border-t border-[#222]">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-[#666]">
          <div>
            All work is grounded in open-source foundations, extreme privacy, and long-term autonomy.
          </div>
          <div className="mt-4 md:mt-0 text-[#444]">
            Delta V • 2026
          </div>
        </div>
      </div>
    </div>
  );
}
