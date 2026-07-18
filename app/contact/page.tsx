'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageBackdrop } from '../components/PageShell';

// Topic slugs used by the pillar-page CTAs (/contact/?topic=<slug>).
// Each maps to a pre-selected "I Need" option and a starter description.
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
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-3">Contact</div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-2px] mb-4">Stay up to speed</h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            High-signal communication channels. Encrypted by default.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
          {/* Contact card */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col">
            <div className="mb-6 pb-6 border-b border-[var(--border-default)]">
              <div className="text-[var(--accent-orange)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">Email</div>
              <a href="mailto:engage@deltav.cc" className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors">
                engage@deltav.cc
              </a>
            </div>
            <div className="flex flex-col flex-1">
              <div>
                <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">Signal</div>
                <p className="text-sm text-[var(--text-tertiary)] leading-relaxed max-w-[240px] mb-6">
                  Prefer encrypted communications? Signal ensures end-to-end privacy for sensitive inquiries.
                </p>
              </div>
              <div className="flex flex-col items-end mt-auto">
                <div className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
                  @DeltaV.01
                </div>
                <img
                  src="/website-private/images/signal-qr.png"
                  alt="Signal QR Code — @DeltaV.01"
                  className="w-28 h-28 rounded-xl border border-[var(--border-default)]"
                />
              </div>
            </div>
          </div>

          {/* On-ramp form */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8">
            <div className="text-[var(--accent-orange)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">On Ramp</div>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">
              Tell us what you&apos;re working on and we&apos;ll get back to you with a tailored approach.
            </p>
            <form key={params.get('topic') || 'default'} action="mailto:engage@deltav.cc" method="post" encType="text/plain" className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full bg-[var(--bg-deep)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent-cyan)]/40 focus:shadow-[var(--glow-cyan)] transition-all"
              />
              <div>
                <div className="text-[10px] text-[var(--text-muted)] mb-2 tracking-[1px] uppercase">I Need</div>
                <div className="flex gap-2">
                  {['Web3', 'AI', 'Upskilling'].map((opt) => (
                    <label key={opt} className="flex-1">
                      <input type="radio" name="need" value={opt} defaultChecked={topic?.need === opt} className="sr-only peer" />
                      <span className="block px-2 py-2.5 text-xs font-medium rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] text-[var(--text-tertiary)] peer-checked:text-[var(--accent-cyan)] peer-checked:border-[var(--accent-cyan)]/40 peer-checked:bg-[var(--accent-cyan)]/5 hover:text-[var(--text-secondary)] transition-all text-center cursor-pointer">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea
                name="description"
                rows={3}
                placeholder="Quick description..."
                defaultValue={topic?.prompt || ''}
                className="w-full bg-[var(--bg-deep)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent-cyan)]/40 focus:shadow-[var(--glow-cyan)] transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors"
              >
                Send →
              </button>
            </form>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Encryption', value: 'Signal + Email', desc: 'End-to-end by default' },
              { label: 'Response Time', value: '< 24h', desc: 'Typically same day' },
              { label: 'Consultation', value: 'Free', desc: 'First call is on us' },
              { label: 'NDA', value: 'Available', desc: 'Enterprise ready' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.value}</div>
                <div className="text-xs text-[var(--text-tertiary)]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default function ContactPage() {
  // useSearchParams requires a Suspense boundary under static export.
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  );
}
