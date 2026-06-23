'use client';

import Navbar from '../components/Navbar';

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 pt-20 pb-16">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">PILLAR 01 • AI</div>
        <h1 className="text-6xl font-semibold tracking-[-2.5px] mb-6">AI Engineering</h1>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-[3px] rounded-full bg-[#00f0ff]" />
          <span className="w-8 h-[3px] rounded-full bg-[#F59E0B]/60" />
          <span className="w-4 h-[3px] rounded-full bg-[#F59E0B]/30" />
        </div>
        <p className="max-w-2xl text-xl text-[#aaa]">
          We help ambitious teams move from generic AI tools to production-grade systems that actually fit their workflows.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 pb-24 space-y-8">

        {/* 1. Tailored Multi-Agent Systems */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#F59E0B]/40 to-transparent" />
          <h3 className="text-3xl font-semibold mb-4">Tailored Multi-Agent Systems</h3>
          <p className="text-[#aaa] mb-8 max-w-3xl leading-relaxed">
            Most teams waste time and budget trying to force generic AI tools into complex operations. 
            We embed with your team for a focused period, <span className="font-semibold text-[#ededed]">map your real workflows and data</span>, 
            then design and ship custom single or multi-agent systems built around the models that actually perform best for your use case.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-[#00f0ff] text-black rounded-xl font-medium hover:bg-white transition-colors">
            Book a call
          </a>
        </div>

        {/* 2. Inference & Model Engineering */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#F59E0B]/60 via-[#F59E0B]/20 to-transparent" />
          <h3 className="text-3xl font-semibold mb-4">Inference &amp; Model Engineering</h3>
          <p className="text-[#aaa] mb-8 max-w-3xl leading-relaxed">
            Running AI reliably in production requires more than prompting. We support teams that need serious 
            model work — <span className="font-semibold text-[#ededed]">fine-tuning, inference optimization across providers</span>, 
            provider selection, Hugging Face organization, and MLOps infrastructure.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-[#F59E0B] text-black rounded-xl font-medium hover:bg-amber-400 transition-colors">
            Discuss Your Model Needs
          </a>
        </div>

        {/* 3. AI Engineer Retainer */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff]/40 via-[#F59E0B]/20 to-transparent" />
          <h3 className="text-3xl font-semibold mb-4">AI Engineer Retainer</h3>
          <p className="text-[#aaa] mb-8 max-w-3xl leading-relaxed">
            You need reliable, high-quality AI engineering capacity on an ongoing basis without hiring full-time. 
            Our retainer gives you direct access to a <span className="font-semibold text-[#ededed]">Delta V AI Engineer</span> 
            (supported by dedicated ZHC subagents) on a monthly hourly basis.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 border border-[#333] rounded-xl font-medium hover:bg-[#222] transition-colors">
            Explore Retainer Options
          </a>
        </div>

      </div>
    </div>
  );
}
