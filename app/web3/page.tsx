'use client';

export default function Web3Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
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

      <div className="max-w-5xl mx-auto px-8 pt-20 pb-16">
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">PILLAR 02 • WEB3</div>
        <h1 className="text-6xl font-semibold tracking-[-2.5px] mb-6">Web3</h1>
        <p className="max-w-2xl text-xl text-[#aaa]">
          We help builders and operators navigate complexity with clarity, sovereignty, and real technical depth.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 pb-24 space-y-8">

        {/* 1. SOTA Setup & Architecture Advisory */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10">
          <h3 className="text-3xl font-semibold mb-4">SOTA Setup &amp; Architecture Advisory</h3>
          <p className="text-[#aaa] mb-8 max-w-3xl leading-relaxed">
            Many individuals and companies in Web3 lack access to proper infrastructure and execution security. 
            We help you implement <span className="font-semibold text-[#ededed]">best-in-class transaction execution, 
            secure wallet architectures, optimal routing, privacy solutions, and decentralized hosting and data infrastructure</span>.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-[#00f0ff] text-black rounded-xl font-medium hover:bg-white transition-colors">
            Describe your problem
          </a>
        </div>

        {/* 2. Web3 Intelligence & OSINT */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10">
          <h3 className="text-3xl font-semibold mb-4">Web3 Intelligence &amp; OSINT</h3>
          <p className="text-[#aaa] mb-8 max-w-3xl leading-relaxed">
            Decision-making in Web3 requires high-signal intelligence. We conduct <span className="font-semibold text-[#ededed]">onchain and offchain 
            investigations</span> to help you assess risks, understand protocol dynamics, and gather the information needed to make informed decisions.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 border border-[#333] rounded-xl font-medium hover:bg-[#222] transition-colors">
            Request Research Support
          </a>
        </div>

        {/* 3. Growth Boost */}
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10">
          <h3 className="text-3xl font-semibold mb-4">Growth Boost</h3>
          <p className="text-[#aaa] mb-8 max-w-3xl leading-relaxed">
            Web3 was born as a plural community of cypherpunks. We help protect and foster this ethos by supporting 
            <span className="font-semibold text-[#ededed]"> community building, public good initiatives, and fundraising efforts</span> — 
            both online and through in-person presence at conferences and events.
          </p>
          <a href="/contact" className="inline-block px-8 py-3 border border-[#333] rounded-xl font-medium hover:bg-[#222] transition-colors">
            Explore Growth Support
          </a>
        </div>

      </div>
    </div>
  );
}
