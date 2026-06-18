'use client';

export default function ForgePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      {/* Navigation */}
      <nav className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-semibold tracking-[-1px]">Delta V</a>
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
      <div className="max-w-5xl mx-auto px-8 pt-20 pb-16">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">PILLAR 03 • EDUCATION</div>
        <h1 className="text-6xl font-semibold tracking-[-2.5px] mb-6">Forge Skills</h1>
        <p className="max-w-2xl text-xl text-[#aaa]">
          We upskill, upgrade, and keep you at the frontier. 
          Sovereign systems, practical curricula, and high-signal Web3 intelligence.
        </p>
      </div>

      {/* Flagship Curriculums */}
      <div className="max-w-5xl mx-auto px-8 pb-20">
        <div className="text-[#C2410C] text-sm font-medium tracking-[2px] mb-6">FLAGSHIP CURRICULUMS</div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal AI Mastery Course */}
          <div className="flex flex-col bg-[#111] border border-[#222] rounded-3xl p-10">
            <h3 className="text-3xl font-semibold mb-4">Personal AI Mastery Course</h3>
            <p className="text-[#aaa] mb-8">
              Self-sovereign program for building and running personal AI systems with strong OpSec and long-term autonomy.
            </p>
            <div className="text-sm text-[#666] mb-6">Foundation: Hermes + open-source models</div>
            <button className="mt-auto px-6 py-3 bg-[#00f0ff] text-black rounded-xl text-sm font-medium hover:bg-white transition-colors self-start">
              View Full Curriculum
            </button>
          </div>

          {/* AI Engineering Bootcamp */}
          <div className="flex flex-col bg-[#111] border border-[#222] rounded-3xl p-10">
            <h3 className="text-3xl font-semibold mb-4">AI Engineering Bootcamp</h3>
            <p className="text-[#aaa] mb-6">
              5-day intensive where participants leave with fully functional production systems.
            </p>
            <div className="mb-6">
              <div className="text-sm text-[#00f0ff] mb-3 tracking-[1px]">EXPANDED ENGINEERING TRACK</div>
              <ul className="space-y-2 text-sm text-[#aaa]">
                <li>• Hugging Face inference pipelines &amp; production deployment</li>
                <li>• Designing &amp; fine-tuning your own models</li>
                <li>• Data engineering for sovereign AI systems</li>
                <li>• Advanced agent orchestration &amp; benchmarking</li>
              </ul>
            </div>
            <button className="mt-auto px-6 py-3 border border-[#333] rounded-xl text-sm font-medium hover:bg-[#222] transition-colors self-start">
              Apply for Next Cohort
            </button>
          </div>
        </div>
      </div>

      {/* OpSec Foundation */}
      <div className="max-w-5xl mx-auto px-8 pb-20 border-t border-[#222] pt-16">
        <div className="text-[#C2410C] text-sm font-medium tracking-[2px] mb-6">OP SEC FOUNDATION</div>
        
        <div className="grid md:grid-cols-1 gap-6">
          <a href="/opsec" className="block bg-[#111] border border-[#222] rounded-3xl p-8 hover:border-[#00f0ff] transition-colors group">
            <h4 className="font-semibold mb-3 group-hover:text-[#00f0ff] transition-colors">OS Hardening</h4>
            <p className="text-sm text-[#aaa]">Platform-specific hardening: Windows, Linux, macOS. Tailored threat models, audits, and operational security protocols for individuals and teams.</p>
          </a>
        </div>
      </div>

      {/* Tutorials */}
      <div className="max-w-5xl mx-auto px-8 pb-24">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-6">TUTORIALS</div>
        <div className="grid md:grid-cols-2 gap-6">
          <a href="/tutorials" className="block bg-[#111] border border-[#222] rounded-2xl p-6 hover:border-[#00f0ff] transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Tutorial</span>
              <span className="text-xs text-[#666]">TECH</span>
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">Hermes + Qwen 3.6 + DGX Spark: The Local AI Convergence</h4>
            <p className="text-sm text-[#aaa] line-clamp-2">Full hardware + software setup tutorial with step-by-step guide for deploying Qwen 3.6 on NVIDIA DGX Spark with Hermes Agent Framework and 3-layer memory.</p>
            <div className="text-[#00f0ff] text-xs mt-3">View full tutorial →</div>
          </a>
          <a href="/tutorials" className="block bg-[#111] border border-[#222] rounded-2xl p-6 hover:border-[#00f0ff] transition-all group">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Tutorial</span>
              <span className="text-xs text-[#666]">OP SEC</span>
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">Platform OS Hardening Guides</h4>
            <p className="text-sm text-[#aaa] line-clamp-2">Step-by-step hardening procedures for Windows, Linux, and macOS. Tailored threat models, audits, and operational security protocols.</p>
            <div className="text-[#00f0ff] text-xs mt-3">Browse OS Hardening →</div>
          </a>
        </div>
      </div>
    </div>
  );
}
