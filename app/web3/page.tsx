'use client';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function Web3Page() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-3">Pillar 02 · Web3</div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-3px] mb-6">Web3</h1>
        <div className="flex items-center gap-2 mb-8">
          <span className="w-12 h-[2px] rounded-full bg-[var(--accent-orange)]" />
          <span className="w-8 h-[2px] rounded-full bg-[var(--accent-amber)]/50" />
          <span className="w-4 h-[2px] rounded-full bg-[var(--accent-amber)]/25" />
        </div>
        <p className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
          Navigate complexity with clarity, sovereignty, and real technical depth.
        </p>
      </section>

      {/* Services */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24 space-y-5">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-orange)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-amber)]/30 to-transparent" />
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">SOTA Setup & Architecture Advisory</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We help you implement <span className="font-medium text-[var(--text-primary)]">best-in-class transaction execution, 
            secure wallet architectures, optimal routing, privacy solutions, and decentralized hosting</span> infrastructure.
          </p>
          <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-amber)] text-black rounded-xl text-sm font-semibold hover:bg-[var(--accent-gold)] transition-colors">
            Describe your problem <ArrowRight />
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-amber)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)]/60 via-[var(--accent-amber)]/20 to-transparent" />
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Web3 Intelligence & OSINT</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We conduct <span className="font-medium text-[var(--text-primary)]">onchain and offchain investigations</span> 
            to help you assess risks, understand protocol dynamics, and make informed decisions.
          </p>
          <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all">
            Request Research Support <ArrowRight />
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-orange)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-orange)]/40 via-[var(--accent-amber)]/15 to-transparent" />
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Growth Boost</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We help protect and foster the cypherpunk ethos by supporting 
            <span className="font-medium text-[var(--text-primary)]"> community building, public good initiatives, and fundraising efforts</span>.
          </p>
          <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all">
            Start Growth Support <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Compact Ecosystem Banner (space-efficient horizontal scroll) ───────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-16 border-t border-[var(--border-default)] pt-10">
        <div className="text-center mb-5">
          <div className="text-[var(--accent-orange)] text-[10px] font-semibold tracking-[3px] uppercase mb-1.5">Ecosystem &amp; Stack</div>
        </div>
        <div className="overflow-x-auto scrollbar-thin pb-3">
          <div className="flex items-center gap-2 min-w-max flex-wrap md:flex-nowrap">
            {['DeFiLlama','Artemis','Tezor','rokti','Safe','l2beat','defiscan','frankencoin','liquity','TRM','railgun','privacypool','giveth'].map((name) => (
              <div key={name} className="flex-shrink-0 px-3 py-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[9px] font-mono tracking-[1px] text-[var(--text-tertiary)]/80 hover:text-[var(--accent-orange)] hover:border-[var(--accent-orange)]/30 hover:bg-[var(--bg-hover)] transition-all whitespace-nowrap select-none">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
