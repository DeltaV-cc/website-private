'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageBackdrop } from '../components/PageShell';

const TOPICS: Record<string, { need: 'Web3' | 'AI' | 'Upskilling'; prompt: string }> = {
  'agents': { need: 'AI', prompt: 'Tailored multi-agent system — my workflows and goals:\n' },
  'inference': { need: 'AI', prompt: 'Inference & model engineering — current stack and pain points:\n' },
  'retainer': { need: 'AI', prompt: 'AI Engineer retainer — systems in production and what I need covered:\n' },
  'web3-advisory': { need: 'Web3', prompt: 'Setup & architecture advisory — my current setup and concerns:\n' },
  'osint': { need: 'Web3', prompt: 'Intelligence / OSINT request — what I need investigated:\n' },
  'growth': { need: 'Web3', prompt: 'Growth support — project stage and objectives:\n' },
};

function ContactContent() {
  const params = useSearchParams();
  const topic = TOPICS[params.get('topic') || ''] || null;

  return (
    <>
    <PageBackdrop />
    <div className="min-h-screen relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 pt-16 pb-24">

        {/* ============================================================
             HERO — Full-width Cal.com booking
             ============================================================ */}
        <section className="relative mb-16 rounded-3xl border border-[var(--border-default)] bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--accent-cyan)]/[0.03] overflow-hidden">
          {/* Top glow accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/40 to-transparent" aria-hidden="true" />
          {/* Ambient orb */}
          <div className="pointer-events-none absolute -top-32 right-0 w-72 h-72 rounded-full bg-[var(--accent-cyan)]/5 blur-3xl" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-[1fr_420px] gap-0">
            {/* Left — copy */}
            <div className="flex flex-col justify-center px-6 md:px-12 py-12 md:py-16">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 mb-5 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] text-[10px] font-bold uppercase tracking-[1.5px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
                First Call — Free
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] leading-[1.05] mb-5">
                Let&apos;s talk
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg mb-8">
                Pick a time that works for you. No back-and-forth, no forms — just straight to the conversation.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-[var(--text-tertiary)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" /> 30 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" /> Video call
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-deep)] border border-[var(--border-default)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" /> Encrypted
                </span>
              </div>
            </div>

            {/* Right — embed */}
            <div className="border-l border-[var(--border-default)] bg-[var(--bg-deep)]/50">
              <iframe
                src="https://cal.com/delta-v/30min?embed=true&hideEventTypeDetails=true"
                className="w-full h-[520px] lg:h-[560px]"
                style={{ border: 'none' }}
                title="Book a 30-minute call with Delta V"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ============================================================
             CONTACT CHANNELS + ON RAMP
             ============================================================ */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-16">
          {/* Channels */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col">
            <div className="text-[var(--accent-orange)] text-[10px] font-semibold tracking-[2px] uppercase mb-4">Channels</div>
            <div className="mb-6 pb-6 border-b border-[var(--border-default)]">
              <div className="text-[11px] text-[var(--text-muted)] mb-1">Email</div>
              <a href="mailto:engage@deltav.cc" className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors">
                engage@deltav.cc
              </a>
            </div>
            <div className="flex flex-col flex-1">
              <div className="text-[11px] text-[var(--text-muted)] mb-1">Signal</div>
              <p className="text-sm text-[var(--text-tertiary)] leading-relaxed max-w-[240px] mb-6">
                End-to-end encrypted for sensitive inquiries.
              </p>
              <div className="flex flex-col items-end mt-auto">
                <div className="text-lg font-semibold text-[var(--text-primary)] mb-3">@DeltaV.01</div>
                <img src="/website-private/images/signal-qr.png" alt="Signal QR" className="w-24 h-24 rounded-xl border border-[var(--border-default)]" />
              </div>
            </div>
          </div>

          {/* On Ramp form */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8">
            <div className="text-[var(--accent-orange)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">On Ramp</div>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">
              Prefer to write? Tell us what you&apos;re working on.
            </p>
            <form key={params.get('topic') || 'default'} action="mailto:engage@deltav.cc" method="post" encType="text/plain" className="space-y-3">
              <input type="text" name="name" placeholder="Your name" className="w-full bg-[var(--bg-deep)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent-cyan)]/40 transition-all" />
              <div>
                <div className="text-[10px] text-[var(--text-muted)] mb-2 tracking-[1px] uppercase">I Need</div>
                <div className="flex gap-2">
                  {['Web3', 'AI', 'Upskilling'].map((opt) => (
                    <label key={opt} className="flex-1">
                      <input type="radio" name="need" value={opt} defaultChecked={topic?.need === opt} className="sr-only peer" />
                      <span className="block px-2 py-2.5 text-xs font-medium rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] text-[var(--text-tertiary)] peer-checked:text-[var(--accent-cyan)] peer-checked:border-[var(--accent-cyan)]/40 peer-checked:bg-[var(--accent-cyan)]/5 hover:text-[var(--text-secondary)] transition-all text-center cursor-pointer">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea name="description" rows={3} placeholder="Quick description..." defaultValue={topic?.prompt || ''} className="w-full bg-[var(--bg-deep)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent-cyan)]/40 transition-all resize-none" />
              <button type="submit" className="w-full py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors">Send →</button>
            </form>
          </div>
        </div>

        {/* Why us */}
        <section className="max-w-4xl mx-auto rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 relative overflow-hidden mb-16" aria-labelledby="why-us-heading">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-purple)] to-transparent" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-end">
            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Why us</div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-1.5px] leading-[1.05]">We believe decentralization is a <span className="text-[var(--accent-cyan)]">fundamental shift.</span></h2>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl">We stay close to the systems we build, with ownership, practical engineering, and long-term capability at the center.</p>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--border-default)] md:grid-cols-2">
            {[{ number: '01', title: 'Tech natives', body: 'We do not just consult — we build, operate, and live the stack.', accent: 'var(--accent-cyan)' }, { number: '02', title: 'Self-ownership focused', body: 'Data, keys, and decisions stay where they belong: with you.', accent: 'var(--accent-purple)' }].map((item) => (
              <article key={item.number} className="bg-[var(--bg-deep)] p-5 md:p-6">
                <div className="flex items-center justify-between gap-4"><span className="font-mono text-xs tracking-[2px]" style={{ color: item.accent }}>{item.number}</span><span className="h-px w-10" style={{ backgroundColor: item.accent, opacity: 0.45 }} aria-hidden="true" /></div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Trust badges */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Encryption', value: 'Signal + Email', desc: 'End-to-end by default' }, { label: 'Response', value: '< 24h', desc: 'Typically same day' }, { label: 'Consultation', value: 'Free', desc: 'First call is on us' }, { label: 'NDA', value: 'Available', desc: 'Enterprise ready' }].map((item) => (
            <div key={item.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.value}</div>
              <div className="text-xs text-[var(--text-tertiary)]">{item.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  );
}
