'use client';
import Link from 'next/link';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function ForgePage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-3">Pillar 03 · Education</div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-3px] mb-6">Forge Skills</h1>
        <div className="flex items-center gap-2 mb-8">
          <span className="w-12 h-[2px] rounded-full bg-[var(--accent-cyan)]" />
          <span className="w-8 h-[2px] rounded-full bg-[var(--accent-amber)]/50" />
          <span className="w-4 h-[2px] rounded-full bg-[var(--accent-amber)]/25" />
        </div>
        <p className="max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
          We upskill, upgrade, and keep you at the frontier. Sovereign systems, practical curricula, high-signal intelligence.
        </p>
      </section>

      {/* Flagship Curriculums */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-16">
        <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-6">Flagship Curriculums</div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden flex flex-col transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-amber)]/30 to-transparent" />
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Personal AI Mastery</h3>
            <p className="text-[var(--text-secondary)] mb-4 flex-1">
              Self-sovereign program for building and running personal AI systems with strong OpSec and long-term autonomy.
            </p>
            <div className="text-sm text-[var(--text-muted)] mb-6">Foundation: Hermes + open-source models</div>
            <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors self-start">
              Request Info <ArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden flex flex-col transition-all duration-300 hover:border-[var(--accent-amber)]/25 hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)]/60 via-[var(--accent-amber)]/20 to-transparent" />
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">AI Engineering Bootcamp</h3>
            <p className="text-[var(--text-secondary)] mb-6 flex-1">
              5-day intensive where participants leave with fully functional production systems. Zero to deployed.
            </p>
            <div className="mb-6">
              <div className="text-xs text-[var(--accent-cyan)] font-semibold tracking-[2px] uppercase mb-3">Expanded Engineering Track</div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Hugging Face inference pipelines & production deployment</li>
                <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Designing & fine-tuning your own models</li>
                <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Data engineering for sovereign AI systems</li>
                <li className="flex gap-2"><span className="text-[var(--accent-cyan)]">·</span> Advanced agent orchestration & benchmarking</li>
              </ul>
            </div>
            <Link href="/contact/" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all self-start">
              Apply for Next Cohort <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* OpSec Foundation */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-16 border-t border-[var(--border-default)] pt-12">
        <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-6">OpSec Foundation</div>
        <Link href="/opsec/" className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-orange)]/25 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-orange)] via-[var(--accent-amber)]/20 to-transparent" />
          <h4 className="text-xl font-semibold mb-3 group-hover:text-[var(--accent-cyan)] transition-colors">OS Hardening</h4>
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">Platform-specific hardening: Windows, Linux, macOS. Tailored threat models, audits, and operational security protocols for individuals and teams.</p>
        </Link>
      </section>

      {/* Tutorials */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-8 pb-24">
        <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-6">Tutorials</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link href="/tutorials/hermes-qwen-dgx-spark/" className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)]/25 hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-cyan)]/40 via-[var(--accent-amber)]/20 to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase border bg-[var(--accent-green)]/8 text-[var(--accent-green)] border-[var(--accent-green)]/20">Tutorial</span>
              <span className="text-xs text-[var(--text-muted)]">TECH</span>
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">Hermes + Qwen 3.6 + DGX Spark</h4>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed line-clamp-3">Full hardware + software setup for deploying Qwen 3.6 on NVIDIA DGX Spark (128GB unified memory) with Hermes Agent — 8-step setup, OpSec hardening, verification checklist.</p>
            <div className="text-[var(--accent-cyan)] text-xs mt-4 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View full tutorial <ArrowRight />
            </div>
          </Link>

          <Link href="/tutorials/langchain-chatchat-ollama/" className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-amber)]/25 hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-amber)]/40 via-[var(--accent-amber)]/20 to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase border bg-[var(--accent-green)]/8 text-[var(--accent-green)] border-[var(--accent-green)]/20">Tutorial</span>
              <span className="text-xs text-[var(--text-muted)]">AI / OP SEC</span>
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">LangChain-Chatchat + Ollama RAG</h4>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed line-clamp-3">100% local RAG system — Streamlit UI + FastAPI + LangChain + Ollama. Full offline knowledge base Q&A, multi-model support, zero API keys, 5-step setup with OpSec hardening.</p>
            <div className="text-[var(--accent-cyan)] text-xs mt-4 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View full tutorial <ArrowRight />
            </div>
          </Link>

          <Link href="/tutorials/muscriptor-music-to-midi/" className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-purple)]/25 hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-purple)]/40 via-[var(--accent-purple)]/20 to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase border bg-[var(--accent-green)]/8 text-[var(--accent-green)] border-[var(--accent-green)]/20">Tutorial</span>
              <span className="text-xs text-[var(--text-muted)]">AUDIO / AI</span>
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">MuScriptor: Transcribe Music to MIDI Locally</h4>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed line-clamp-3">Decoder-only transformer by Kyutai + Mirelo AI — 170K songs trained, multi-instrument. 3 model sizes (103M–1.4B), Pinokio 1-click or Python CLI, API endpoints reference.</p>
            <div className="text-[var(--accent-cyan)] text-xs mt-4 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View full tutorial <ArrowRight />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
