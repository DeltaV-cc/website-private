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
            <a href="/blog" className="hover:text-[#00f0ff] transition-colors">Blog</a>
            <a href="/intelhub" className="hover:text-[#00f0ff] transition-colors">IntelHub</a>
            <a href="/contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* § 01 — GET IN TOUCH */}
      <div className="max-w-5xl mx-auto px-8 pt-8 pb-10">

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-1.5px] leading-tight">
            Stay up to speed
          </h2>
          <div className="flex justify-center">
            <img src="/images/lotusbloom.gif" alt="" className="w-20 h-20 md:w-24 md:h-24 rounded-full opacity-60" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Email + Signal combined */}
          <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
            <div className="mb-3 pb-3 border-b border-[#222]">
              <div className="text-[#C2410C] text-xs font-semibold tracking-[2px] mb-1">EMAIL</div>
              <a
                href="mailto:engage@deltav.cc"
                className="text-base md:text-lg font-semibold tracking-tight text-white/80 hover:text-[#00f0ff] transition-colors block mb-1"
              >
                engage@deltav.cc
              </a>
              <a
                href="mailto:engage@deltav.cc"
                className="inline-flex items-center gap-1 text-xs text-[#00f0ff] hover:underline"
              >
                COMPOSE →
              </a>
            </div>
            <div>
              <div className="text-teal-400 text-xs font-semibold tracking-[2px] mb-1">SIGNAL</div>
              <div className="text-base md:text-lg font-semibold tracking-tight text-white/80 mb-1">
                @DeltaV.01
              </div>
              <p className="text-xs text-[#888] leading-relaxed mb-2">
                Prefer encrypted communications? Signal ensures end-to-end privacy for sensitive inquiries.
              </p>
              <img src="/images/signal-qr.png" alt="Signal QR Code — @DeltaV.01" className="w-14 h-14 rounded-xl" />
            </div>
          </div>

          {/* On Ramp */}
          <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#C2410C] text-xs font-semibold tracking-[2px] mb-2">ON RAMP</div>
            <p className="text-xs text-[#888] mb-3">Tell us what you're working on and we'll get back to you with a tailored approach.</p>
            <div className="space-y-2">
              <input type="text" placeholder="Your name" className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#00f0ff] transition-colors" />
              <div>
                <div className="text-[10px] text-[#555] mb-1 tracking-[1px]">I NEED</div>
                <div className="flex gap-1.5">
                  {['Web3', 'AI', 'Upskilling / Growth'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="flex-1 px-1.5 py-1.5 text-xs font-medium rounded-xl border border-[#222] bg-[#0a0a0a] text-white/40 hover:text-white/80 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <textarea rows={2} placeholder="Quick description..." className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#00f0ff] transition-colors resize-none"></textarea>
              <button className="w-full py-2 bg-[#00f0ff] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors">
                Send →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
