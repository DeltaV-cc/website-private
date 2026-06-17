'use client';

export default function ContactPage() {
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
        <div className="text-[#00f0ff] text-sm font-medium tracking-[2px] mb-3">CONTACT</div>
        <h1 className="text-6xl font-semibold tracking-[-2.5px] mb-6">Let’s talk.</h1>
        <p className="max-w-md text-xl text-[#aaa]">
          Reach out to discuss projects, retainers, or how we can help you stay at the frontier.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <div className="bg-[#111] border border-[#222] rounded-3xl p-10 max-w-md">
          <p className="text-[#aaa]">Contact form and details will be added here.</p>
        </div>
      </div>
    </div>
  );
}
