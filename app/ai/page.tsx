'use client';

import Link from 'next/link';
import { PageHero, PageContainer, ServiceCard } from '../components/PageShell';
import EcosystemStack, { AI_ECOSYSTEM } from '../components/EcosystemStack';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AIPage() {
  return (
    <>
      <PageHero
        label="Pillar 01 · AI Engineering"
        title="AI Engineering"
        description="From generic AI tools to production-grade systems that actually fit your workflows."
        accent="cyan"
        backFallback="/"
        backLabel="Home"
      />

      {/* Services */}
      <PageContainer className="pb-24 space-y-5" as="section">
        <ServiceCard title="Tailored Multi-Agent Systems" accent="cyan">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            We embed with your team, <span className="font-medium text-[var(--text-primary)]">map your real workflows and data</span>, 
            then design and ship custom single or multi-agent systems built around the models that actually perform best for your use case.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-black rounded-xl text-sm font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
          >
            Book a call <ArrowRight />
          </Link>
        </ServiceCard>

        <ServiceCard title="Inference & Model Engineering" accent="amber">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            Running AI reliably in production requires more than prompting. We support teams with 
            <span className="font-medium text-[var(--text-primary)]"> fine-tuning, inference optimization, provider selection</span>, 
            Hugging Face organization, and MLOps infrastructure.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-amber)] text-black rounded-xl text-sm font-semibold hover:bg-[var(--accent-gold)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-amber)]"
          >
            Discuss Your Model Needs <ArrowRight />
          </Link>
        </ServiceCard>

        <ServiceCard title="AI Engineer Retainer" accent="cyan">
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
            Direct access to a <span className="font-medium text-[var(--text-primary)]">Delta V AI Engineer</span> 
            (supported by dedicated ZHC subagents) on a monthly hourly basis. Ongoing optimization, security, and capability expansion.
          </p>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:bg-[var(--bg-hover)] hover:border-[var(--border-hover)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
          >
            View Retainer Plans <ArrowRight />
          </Link>
        </ServiceCard>
      </PageContainer>

      <EcosystemStack items={AI_ECOSYSTEM} accent="cyan" label="Ecosystem & Stack" />
    </>
  );
}
