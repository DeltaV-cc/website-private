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
            <a href="/intelhub" className="hover:text-[#00f0ff] transition-colors">IntelHub</a>
            <a href="/contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-8 pt-20 pb-16">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">PILLAR 03 • EDUCATION</div>
        <h1 className="text-6xl font-semibold tracking-[-2.5px] mb-6">Forge</h1>
        <p className="max-w-2xl text-xl text-[#aaa]">
          We upskill, upgrade, and keep you at the frontier. 
          Sovereign systems, practical curricula, and high-signal Web3 intelligence.
        </p>
      </div>

      {/* Flagship Curriculums */}
      <div className="max-w-5xl mx-auto px-8 pb-20">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-6">FLAGSHIP CURRICULUMS</div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal AI Mastery Course */}
          <div className="bg-[#111] border border-[#222] rounded-3xl p-10">
            <h3 className="text-3xl font-semibold mb-4">Personal AI Mastery Course</h3>
            <p className="text-[#aaa] mb-8">
              Self-sovereign program for building and running personal AI systems with strong OpSec and long-term autonomy.
            </p>
            <div className="text-sm text-[#666] mb-6">Foundation: Hermes + open-source models</div>
            <button className="px-6 py-3 bg-[#00f0ff] text-black rounded-xl text-sm font-medium hover:bg-white transition-colors">
              View Full Curriculum
            </button>
          </div>

          {/* AI Engineering Bootcamp */}
          <div className="bg-[#111] border border-[#222] rounded-3xl p-10">
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
            <button className="px-6 py-3 border border-[#333] rounded-xl text-sm font-medium hover:bg-[#222] transition-colors">
              Apply for Next Cohort
            </button>
          </div>
        </div>
      </div>

      {/* Web3 Intel & Setup Offerings (Pillar 2 related) */}
      <div className="max-w-5xl mx-auto px-8 pb-20 border-t border-[#222] pt-16">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-6">WEB3 INTEL &amp; SETUP OFFERINGS</div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
            <h4 className="font-semibold mb-3">Web3 Intelligence &amp; OSINT</h4>
            <p className="text-sm text-[#aaa]">Favourite wallets, on-chain agents monitoring, DeFi strategies, privacy tech, EIPs, and GitHub signals.</p>
          </div>
          <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
            <h4 className="font-semibold mb-3">SOTA Setup &amp; Architecture</h4>
            <p className="text-sm text-[#aaa]">High-signal setup material and architecture guidance for DeFi protocols and on-chain systems.</p>
          </div>
          <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
            <h4 className="font-semibold mb-3">OpSec Foundations</h4>
            <p className="text-sm text-[#aaa]">Practical sovereign OpSec setups tailored to Web3 and AI agent workflows.</p>
          </div>
        </div>
      </div>

      {/* Curated Tutorials */}
      <div className="max-w-5xl mx-auto px-8 pb-24">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-6">CURATED TUTORIALS</div>
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10 text-[#aaa]">
          High-signal tutorials curated from IntelHub feeds and blog. <br />
          <span className="text-[#666] text-sm">(Content requires ZHC workflow review before publishing)</span>
        </div>
      </div>
    </div>
  );
}
