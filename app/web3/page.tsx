'use client';

import Link from 'next/link';
import { PageHero, PageContainer, ServiceCard } from '../components/PageShell';
import EcosystemStack, { WEB3_ECOSYSTEM } from '../components/EcosystemStack';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Web3Page() {
  return (
    <>
      <PageHero
        label="Pillar 02 · Web3"
        title="Web3"
        description="Navigate complexity with clarity, sovereignty, and real technical depth."
        accent="orange"
        backFallback="/"
        backLabel="Home"
      />

      <PageContainer className="pb-24 space-y-5" as="section">
        <ServiceCard title="SOTA Setup & Architecture Advisory" accent="orange">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We help you implement <span className="font-medium text-[var(--text-primary)]">best-in-class transaction execution, 
            secure wallet architectures, optimal routing, privacy solutions, and decentralized hosting</span> infrastructure.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-amber)] text-black rounded-xl text-sm font-semibold hover:bg-[var(--accent-gold)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-amber)]"
          >
            Describe your problem <ArrowRight />
          </Link>
        </ServiceCard>

        <ServiceCard title="Web3 Intelligence & OSINT" accent="amber">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We conduct <span className="font-medium text-[var(--text-primary)]">onchain and offchain investigations</span> 
            to help you assess risks, understand protocol dynamics, and make informed decisions.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-orange)]"
          >
            Request Research Support <ArrowRight />
          </Link>
        </ServiceCard>

        <ServiceCard title="Growth Boost" accent="orange">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We help protect and foster the cypherpunk ethos by supporting 
            <span className="font-medium text-[var(--text-primary)]"> community building, public good initiatives, and fundraising efforts</span>.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-orange)]"
          >
            Start Growth Support <ArrowRight />
          </Link>
        </ServiceCard>
      </PageContainer>

      <EcosystemStack items={WEB3_ECOSYSTEM} accent="orange" label="Ecosystem & Stack" />
    </>
  );
}
