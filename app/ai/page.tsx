'use client';

import Link from 'next/link';
import { PageHero, PageContainer, PageBackdrop } from '../components/PageShell';
import EcosystemStack, { AI_ECOSYSTEM } from '../components/EcosystemStack';
import OfferCard from '../components/OfferCard';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function AIPage() {
  return (
    <>
      <PageBackdrop />
      <div className="relative z-10">
        <PageHero
          label="Pillar 01 · AI Engineering"
          title="AI Engineering"
          description="From generic AI tools to production-grade systems that fit your workflows — designed, shipped, and hardened by engineers who run these systems 24/7 on their own infrastructure."
          accent="cyan"
          backFallback="/"
          backLabel="Home"
        />

        <PageContainer className="pb-16 space-y-5" as="section">
        <OfferCard
          id="agents"
          title="Tailored Multi-Agent Systems"
          pitch={<>We embed with your team, <span className="font-medium text-[var(--text-primary)]">map your real workflows and data</span>, then design and ship custom single or multi-agent systems built around the models that perform best for your use case — not the ones with the best marketing.</>}
          deliverables={[
            'Agent architecture designed around your workflows (orchestration, memory, tool use)',
            'Model selection benchmarked on your actual tasks — open-weight first when it wins',
            'Local-first deployment: your data and keys never leave your infrastructure',
            'Guardrails, evaluation harness, and human-in-the-loop controls for high-stakes actions',
            'Documentation and handover so your team owns the system',
          ]}
          process={[
            { step: 'Scoping call', desc: 'we map workflows, data sensitivity, and success criteria' },
            { step: 'Architecture + prototype', desc: 'a working vertical slice on your real data' },
            { step: 'Ship + harden', desc: 'production deployment, evals, OpSec review, handover' },
          ]}
          audience="Teams drowning in manual workflows; founders who need leverage without headcount; organizations that cannot send data to third-party clouds."
          ctaLabel="Book a scoping call"
          ctaTopic="agents"
        />
        <OfferCard
          id="inference"
          title="Inference & Model Engineering"
          pitch={<>Running AI reliably in production requires more than prompting. We support teams with <span className="font-medium text-[var(--text-primary)]">fine-tuning, inference optimization, provider selection</span>, Hugging Face organization, and MLOps infrastructure.</>}
          deliverables={[
            'Model selection & benchmarking across cost, latency, and quality',
            'Quantization and serving setup sized to your hardware',
            'Fine-tuning pipelines with data engineering and evaluation built in',
            'Inference cost audits and on-prem or hybrid deployment plans',
          ]}
          process={[
            { step: 'Audit', desc: 'current stack, costs, latency, and quality baselines' },
            { step: 'Plan', desc: 'target architecture with measured trade-offs' },
            { step: 'Execute', desc: 'migration, tuning, and monitoring in production' },
          ]}
          audience="Teams hitting cost, latency, or privacy walls; ML teams moving from API-only to owned inference."
          ctaLabel="Discuss your model needs"
          ctaTopic="inference"
        />
        <OfferCard
          id="retainer"
          title="AI Engineer Retainer"
          pitch={<>Direct access to a <span className="font-medium text-[var(--text-primary)]">Delta V AI Engineer</span> (supported by dedicated ZHC subagents) for ongoing optimization, security, and capability expansion.</>}
          deliverables={[
            'Reserved monthly engineering hours with same-week turnaround',
            'Continuous model and tooling watch as the frontier moves',
            'Security reviews of agent permissions, prompts, and data flows',
            'Quarterly architecture review with a written roadmap',
          ]}
          process={[
            { step: 'Onboarding', desc: 'deep-dive into your existing systems and priorities' },
            { step: 'Cadence', desc: 'monthly hours, async requests, shared backlog' },
            { step: 'Compound', desc: 'each month builds on documented system knowledge' },
          ]}
          audience="Teams running AI systems in production without a dedicated AI engineer."
          ctaLabel="View retainer options"
          ctaTopic="retainer"
          secondary={{ label: 'Upskill instead — Forge', href: '/forge/' }}
        />
        </PageContainer>

        <PageContainer className="pb-24" as="section">
          <EcosystemStack items={AI_ECOSYSTEM} accent="cyan" label="Ecosystem & Stack" />
        </PageContainer>
      </div>
    </>
  );
}
