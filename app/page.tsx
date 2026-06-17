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
            <a href="/intelhub" className="hover:text-[#00f0ff] transition-colors">IntelHub</a>
            <a href="/contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-[#111] text-[#00f0ff] text-sm mb-6">
          Privacy-first • High-signal
        </div>
        
        <h1 className="text-7xl md:text-8xl font-semibold tracking-[-4.5px] leading-none mb-8">
          We don’t sell tools.<br />We forge capabilities.
        </h1>
        
        <p className="max-w-[620px] mx-auto text-xl text-[#aaa]">
          We operate at the frontier of AI and Web3 with OpSec as our core principle — we build, integrate, and upskill with sovereignty in mind.
        </p>
      </div>

      {/* Three Pillars - Clickable */}
      <div id="pillars" className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Pillar 1: AI */}
          <a href="/ai" className="group block bg-[#111] border border-[#222] hover:border-[#00f0ff] rounded-3xl p-10 transition-all duration-300">
            <div className="text-[#00f0ff] text-xs font-medium tracking-[2px] mb-4">PILLAR 01</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">AI Agent Forge</h3>
            
            <div className="space-y-6 text-sm">
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
          </a>

          {/* Pillar 2: Web3 */}
          <a href="/web3" className="group block bg-[#111] border border-[#222] hover:border-[#00f0ff] rounded-3xl p-10 transition-all duration-300">
            <div className="text-[#00f0ff] text-xs font-medium tracking-[2px] mb-4">PILLAR 02</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">Web3</h3>
            
            <div className="space-y-6 text-sm">
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
          </a>

          {/* Pillar 3: Education / Forge */}
          <a href="/forge" className="group block bg-[#111] border border-[#222] hover:border-[#00f0ff] rounded-3xl p-10 transition-all duration-300">
            <div className="text-[#00f0ff] text-xs font-medium tracking-[2px] mb-4">PILLAR 03</div>
            <h3 className="text-3xl font-semibold tracking-tight mb-6">Education Forge</h3>
            
            <div className="space-y-6 text-sm">
              <div>
                <div className="font-medium mb-1">Personal AI Mastery Course</div>
                <div className="text-[#aaa]">Self-sovereign program for building and running personal AI systems with strong OpSec.</div>
              </div>
              <div>
                <div className="font-medium mb-1">AI Engineering Bootcamp</div>
                <div className="text-[#aaa]">5-day intensive focused on building real production systems.</div>
              </div>
              <div>
                <div className="font-medium mb-1">Specialized Agent Tracks</div>
                <div className="text-[#aaa]">Focused modules on Multi-Agent Systems, Inference Engineering, and Business Agents.</div>
              </div>
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
            <h2 className="text-5xl font-semibold tracking-[-2px] max-w-3xl">Precision-built systems for serious builders.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Offering 1 */}
            <a href="/forge" className="block bg-[#0a0a0a] border border-[#222] rounded-3xl p-10 group hover:border-[#00f0ff] transition-all">
              <h3 className="text-3xl font-semibold mb-4">Personal AI Mastery Course</h3>
              <p className="text-[#aaa] text-[15px] leading-relaxed mb-8">
                A practical program for building and running your own personal AI systems with extreme operational security and long-term autonomy.
              </p>
              <div className="flex justify-end">
                <span className="px-6 py-2.5 bg-[#00f0ff] text-black rounded-xl text-sm font-medium group-hover:bg-white transition-colors">
                  Explore Curriculum
                </span>
              </div>
            </a>

            {/* Offering 2 */}
            <a href="/forge" className="block bg-[#0a0a0a] border border-[#222] rounded-3xl p-10 group hover:border-[#00f0ff] transition-all">
              <h3 className="text-3xl font-semibold mb-4">AI Engineering Bootcamp</h3>
              <p className="text-[#aaa] text-[15px] leading-relaxed mb-6">
                5-day intensive program where participants leave with fully functional production systems.
              </p>
              <div className="flex justify-end">
                <span className="px-6 py-2.5 border border-[#333] rounded-xl text-sm font-medium group-hover:bg-[#222] transition-colors">
                  Apply for Next Cohort
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Past Clients - Trusted by */}
      <div className="max-w-5xl mx-auto px-8 py-16 border-t border-[#222]">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-6">TRUSTED BY</div>
        <div className="flex flex-wrap gap-x-12 gap-y-4 text-2xl font-semibold tracking-tight">
          <div className="text-[#666] hover:text-[#aaa] transition-colors">DeFiscan</div>
          <div className="text-[#666] hover:text-[#aaa] transition-colors">Stormz</div>
        </div>
      </div>

      {/* Newsletter Banner */}
      <div className="max-w-5xl mx-auto px-8 py-24 border-t border-[#222]">
        <div className="bg-[#111] border border-[#222] rounded-3xl p-14 text-center">
          <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">STAY IN THE LOOP</div>
          <h3 className="text-4xl font-semibold tracking-tight mb-4">High-signal updates only.</h3>
          <p className="text-[#aaa] max-w-md mx-auto mb-8">
            Curated intelligence, technical breakdowns, and new tutorials delivered directly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a href="/intelhub" className="flex-1 px-8 py-4 bg-[#00f0ff] text-black rounded-2xl font-medium hover:bg-white transition-colors text-center">
              Browse IntelHub
            </a>
            <a href="/contact" className="flex-1 px-8 py-4 border border-[#333] rounded-2xl hover:bg-[#222] transition-colors text-center">
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
