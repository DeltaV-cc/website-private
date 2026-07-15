'use client';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function AIPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-3">Pillar 01 · AI Engineering</div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-3px] mb-6">AI Engineering</h1>
        <div className="flex items-center gap-2 mb-8">
          <span className="w-12 h-[2px] rounded-full bg-[var(--accent-cyan)]" />
          <span className="w-8 h-[2px] rounded-full bg-[var(--accent-amber)]/50" />
          <span className="w-4 h-[2px] rounded-full bg-[var(--accent-amber)]/25" />
        </div>
        <p className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
          From generic AI tools to production-grade systems that actually fit your workflows.
        </p>
      </section>

      {/* Services */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24 space-y-5">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-amber)]/30 to-transparent" />
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Tailored Multi-Agent Systems</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We embed with your team, <span className="font-medium text-[var(--text-primary)]">map your real workflows and data</span>, 
            then design and ship custom single or multi-agent systems built around the models that actually perform best for your use case.
          </p>
          <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors">
            Book a call <ArrowRight />
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-amber)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)]/60 via-[var(--accent-amber)]/20 to-transparent" />
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Inference & Model Engineering</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            Running AI reliably in production requires more than prompting. We support teams with 
            <span className="font-medium text-[var(--text-primary)]"> fine-tuning, inference optimization, provider selection</span>, 
            Hugging Face organization, and MLOps infrastructure.
          </p>
          <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-amber)] text-black rounded-xl text-sm font-semibold hover:bg-[var(--accent-gold)] transition-colors">
            Discuss Your Model Needs <ArrowRight />
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-cyan)]/40 via-[var(--accent-amber)]/15 to-transparent" />
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">AI Engineer Retainer</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            Direct access to a <span className="font-medium text-[var(--text-primary)]">Delta V AI Engineer</span> 
            (supported by dedicated ZHC subagents) on a monthly hourly basis. Ongoing optimization, security, and capability expansion.
          </p>
          <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all">
            View Retainer Plans <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Compact Ecosystem Banner (space-efficient horizontal scroll) ───────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-16 border-t border-[var(--border-default)] pt-10">
        <div className="text-center mb-5">
          <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[3px] uppercase mb-1.5">Ecosystem &amp; Stack</div>
        </div>
        <div className="overflow-x-auto scrollbar-thin pb-3">
          <div className="flex items-center gap-2.5 min-w-max">
            {['Hugging Face','OpenCode','Hermes','Ollama','OpenRouter','BF6','LM Studio','Cocktail Peanut'].map((name) => (
              <div key={name} className="flex-shrink-0 px-3.5 py-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[9px] font-mono tracking-[1.25px] text-[var(--text-tertiary)]/80 hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/30 hover:bg-[var(--bg-hover)] transition-all whitespace-nowrap select-none">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
