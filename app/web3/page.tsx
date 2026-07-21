'use client';

import Link from 'next/link';
import { PageHero, PageContainer } from '../components/PageShell';
import EcosystemStack, { WEB3_ECOSYSTEM } from '../components/EcosystemStack';
import OfferCard from '../components/OfferCard';
import OpSec from '../opsec/page';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function Web3Page() {
  return (
    <>
      <div className="relative z-10">
        <PageHero
          label="Pillar 02 · Web3"
          title="Web3"
          description="Navigate complexity with clarity, sovereignty, and real technical depth — native EVM builders with 10+ years in the space. From wallet architecture to onchain investigations, grounded in the intelligence we monitor daily."
          accent="orange"
          backFallback="/"
          backLabel="Home"
        />

        <PageContainer className="pb-16 space-y-5" as="section">
        <OfferCard
          id="architecture"
          title="SOTA Setup & Architecture Advisory"
          pitch={<>We help you implement <span className="font-medium text-[var(--text-primary)]">best-in-class transaction execution, secure wallet architectures, optimal routing, privacy solutions, and decentralized hosting</span> — the state of the art, not last cycle&apos;s defaults.</>}
          deliverables={[
            'Wallet and key architecture review: self-custody, multisig, hardware, session keys',
            'Private RPCs, MEV protection, and optimal transaction routing',
            'Privacy stack: self-hosted endpoints, address hygiene, metadata hardening',
            'Protocol and chain risk assessment grounded in observable data',
            'Written architecture document your team can execute and audit',
          ]}
          process={[
            { step: 'Threat model', desc: 'assets, adversaries, and operational constraints' },
            { step: 'Architecture', desc: 'target setup with measured trade-offs' },
            { step: 'Implementation', desc: 'guided rollout with verification at each step' },
          ]}
          audience="Funds, DAOs, and serious operators whose current setup grew organically and has never been reviewed end-to-end."
          ctaLabel="Describe your setup"
          ctaTopic="web3-advisory"
        />
        <OfferCard
          id="intelligence"
          title="Web3 Intelligence & OSINT"
          pitch={<>We conduct <span className="font-medium text-[var(--text-primary)]">onchain and offchain investigations</span> to help you assess risks and make informed decisions — powered by the same pipeline that feeds our public IntelHub.</>}
          deliverables={[
            'Counterparty due diligence: wallets, entities, funding trails, and infrastructure',
            'Protocol deep-dives: governance capture risk, admin keys, and upgrade paths',
            'Incident forensics: trace what happened, quantify exposure, and document it',
            'Financial services analysis and research — historical data, wallet mapping, deep EVM DeFi ecosystem knowledge',
            'Continuous monitoring briefs on protocols and entities you care about',
            'Confidential reporting — findings never leave your circle',
          ]}
          process={[
            { step: 'Brief', desc: 'define the question and the decision it supports' },
            { step: 'Investigate', desc: 'onchain and OSINT sweep with documented evidence' },
            { step: 'Report', desc: 'written findings, confidence levels, and actions' },
          ]}
          audience="Investors doing diligence, protocols assessing partners, and teams responding to incidents."
          ctaLabel="Request research support"
          ctaTopic="osint"
          secondary={{ label: 'See our public intel — IntelHub', href: '/intelhub/' }}
        />
        <OfferCard
          id="growth"
          title="Growth Boost"
          pitch={<>We help protect and foster the cypherpunk ethos by supporting <span className="font-medium text-[var(--text-primary)]">community building, public good initiatives, and fundraising efforts</span> — growth with OpSec foundations, not growth at any cost.</>}
          deliverables={[
            'Positioning and narrative work grounded in what your protocol actually does',
            'Community architecture: channels, moderation, and contributor funnels',
            'Grant and quadratic-funding strategy grounded in ecosystem signals',
            'Technical content pipeline that earns trust',
            'OpSec review of your public surface before you scale attention',
          ]}
          process={[
            { step: 'Audit', desc: 'current positioning, community, and public surface' },
            { step: 'Strategy', desc: 'prioritized growth plan with security constraints' },
            { step: 'Execute', desc: 'hands-on support with measurable milestones' },
          ]}
          audience="Early-stage protocols and public-goods teams that need traction without compromising values or security."
          ctaLabel="Start growth support"
          ctaTopic="growth"
        />
        </PageContainer>

      <PageContainer className="pb-24" as="section">
        <EcosystemStack items={WEB3_ECOSYSTEM} accent="orange" label="Ecosystem & Stack" />
      </PageContainer>

      <section id="opsec" className="scroll-mt-16 border-t border-[var(--border-default)]" aria-labelledby="opsec-heading">
        <OpSec embedded />
      </section>
      </div>
    </>
  );
}
