'use client';

import Link from 'next/link';
import { PageHero, PageContainer } from '../../components/PageShell';
import { ArchitectureFlow } from '../../components/ArchitectureDiagram';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AGENDA = [
  {
    block: '01',
    time: '45 min',
    title: 'Threat model & stack',
    points: [
      'Why API keys fail agents',
      'SOTA Operator Stack in one diagram',
      'YubiKey vs hardware wallet vs float wallet',
    ],
  },
  {
    block: '02',
    time: '60 min',
    title: 'Lab: payment-gated API',
    points: [
      'Seller returns HTTP 402 with requirements',
      'Buyer pays USDC and retries',
      'Test facilitator / documented lab network only',
    ],
  },
  {
    block: '03',
    time: '45 min',
    title: 'Agent spend policy',
    points: [
      'Dedicated float key',
      'Per-call and daily caps in code',
      'What never lives on the agent host',
    ],
  },
  {
    block: '04',
    time: '45 min',
    title: 'Dry-run toward production',
    points: [
      'Facilitator as a dependency',
      'Metrics and receipts',
      'Kill switch and incident tabletop',
    ],
  },
  {
    block: '05',
    time: '30 min',
    title: 'Close-out',
    points: [
      'Personal / team checklist against the SOTA stack',
      'When to escalate to institutional custody (e.g. Taurus-class)',
      'Optional: follow-on retainer scope',
    ],
  },
];

const OUTCOMES = [
  'A mental model of x402 that matches production, not slides-only theory',
  'A lab-proven 402 → pay → 200 path your team has seen work',
  'Written spend-cap policy for any agent or automation wallet',
  'Mapped admin paths to YubiKey (or gap list)',
  'Clear next step: self-serve SOTA stack vs facilitated implementation',
];

const PREREQS = [
  'Laptop with a modern browser; optional local Node if you want to run seller code live',
  'Willingness to use a disposable test wallet (never mainnet treasury keys in the room)',
  'One YubiKey or plan to order (we will not enroll secrets for you in the room)',
  'Optional: read the SOTA Operator Stack page before day-of',
];

export default function X402WorkshopPage() {
  return (
    <>
      <PageHero
        label="Forge · Workshop"
        title="x402 & Agent Payments"
        description="Half-day facilitated session: from lab HTTP 402 payments to a production-minded dry-run with spend caps. Built for operators and small teams - not a content dump."
        accent="orange"
        backFallback="/forge/"
        backLabel="Forge"
      />

      <PageContainer className="pb-12" as="section">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { k: 'Format', v: 'Half-day · live' },
            { k: 'Focus', v: 'x402 + OpSec' },
            { k: 'Ends with', v: 'Dry-run checklist' },
          ].map((m) => (
            <div key={m.k} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-5 py-4">
              <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[var(--text-muted)] mb-1">{m.k}</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{m.v}</div>
            </div>
          ))}
        </div>

        <ArchitectureFlow
          title="Session arc"
          accent="orange"
          steps={[
            { label: 'Model', detail: 'Stack + threats' },
            { label: 'Lab 402', detail: 'Seller + buyer' },
            { label: 'Caps', detail: 'Agent policy' },
            { label: 'Dry-run', detail: 'Prod mindset' },
          ]}
        />
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <div className="mb-6">
          <div className="text-[var(--accent-orange)] text-xs font-semibold tracking-[3px] uppercase mb-2">Agenda</div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What we do in the room</h2>
        </div>
        <div className="space-y-3">
          {AGENDA.map((a) => (
            <article
              key={a.block}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 md:p-6 flex flex-col md:flex-row md:gap-8"
            >
              <div className="md:w-36 flex-shrink-0 mb-3 md:mb-0">
                <div className="text-[10px] font-mono font-semibold tracking-[2px] text-[var(--accent-orange)]">
                  BLOCK {a.block}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{a.time}</div>
                <div className="text-base font-semibold mt-2">{a.title}</div>
              </div>
              <ul className="flex-1 space-y-1.5 text-sm text-[var(--text-secondary)]">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-[var(--accent-cyan)]">·</span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Outcomes</h2>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-[var(--accent-orange)]">·</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {PREREQS.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-[var(--accent-cyan)]">·</span>
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-[var(--text-muted)] leading-relaxed">
              Deep-dive reference material lives separately for people who want to read after the session - the workshop
              is the organizing product, not a long article.
            </p>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="pb-14" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 md:p-8">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[var(--accent-amber)] mb-2">
            Before / after
          </div>
          <h2 className="text-lg font-semibold mb-4">How this fits the rest of the site</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-[var(--text-primary)] mb-1">SOTA Operator Stack</div>
              <p className="text-[var(--text-tertiary)] mb-2">The blueprint you implement over weeks.</p>
              <Link href="/opsec/sota-stack/" className="text-[var(--accent-amber)] hover:underline text-xs font-medium">
                Open blueprint →
              </Link>
            </div>
            <div>
              <div className="font-medium text-[var(--text-primary)] mb-1">This workshop</div>
              <p className="text-[var(--text-tertiary)] mb-2">Facilitated half-day to internalize payments + caps.</p>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide">You are here</span>
            </div>
            <div>
              <div className="font-medium text-[var(--text-primary)] mb-1">OS guides</div>
              <p className="text-[var(--text-tertiary)] mb-2">Tactical hardening under the stack.</p>
              <Link href="/opsec/" className="text-[var(--accent-cyan)] hover:underline text-xs font-medium">
                OpSec hub →
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="pb-20" as="section">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-[var(--accent-orange)] text-[10px] font-semibold tracking-[2px] uppercase mb-2">
              Book a cohort
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
              Private team session or next open cohort. Tell us headcount and whether you need agent float design only or full SOTA stack audit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-orange)] text-white rounded-xl text-sm font-semibold hover:bg-[#d94d0f] transition-colors"
            >
              Request workshop <ArrowRight />
            </Link>
            <Link
              href="/opsec/sota-stack/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] rounded-xl text-sm hover:border-[var(--accent-amber)]/30 hover:text-[var(--accent-amber)] transition-all"
            >
              Read the stack first
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
