'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import CuratedIntel from './components/CuratedIntel';
import InkGarden from './components/InkGarden';

const Arrow = () => <span aria-hidden="true">↗</span>;

const capabilities = [
  { href: '/ai/', index: '01', title: 'AI Engineering', cta: 'Explore AI Engineering', bullets: [{ label: 'Tailored multi-agent systems', href: '/ai/#agents' }, { label: 'Inference and model engineering', href: '/ai/#inference' }, { label: 'Ongoing AI engineer support', href: '/ai/#retainer' }], accent: 'text-[var(--accent-cyan)]', titleTint: 'text-[var(--accent-cyan)]/90', line: 'border-[var(--accent-cyan)]/30', cardAccent: 'var(--accent-cyan)' },
  { href: '/web3/', index: '02', title: 'Web3', cta: 'Explore Web3', bullets: [{ label: 'SOTA setup and architecture', href: '/web3/#architecture' }, { label: 'Web3 intelligence and OSINT', href: '/web3/#intelligence' }, { label: 'Growth, public goods, and community building', href: '/web3/#growth' }], accent: 'text-[var(--accent-orange)]', titleTint: 'text-[var(--accent-orange)]/90', line: 'border-[var(--accent-orange)]/30', cardAccent: 'var(--accent-orange)' },
  { href: '/forge/', index: '03', title: 'Skill Forge', cta: 'Explore capability', bullets: [{ label: 'Personal AI Mastery', href: '/forge/course/#ai-mastery' }, { label: 'AI Engineering Bootcamp', href: '/forge/course/#ai-engineering' }, { label: 'OpSec training and auditing', href: '/web3/#opsec' }], accent: 'text-[var(--accent-purple)]', titleTint: 'text-[var(--accent-purple)]/90', line: 'border-[var(--accent-purple)]/30', cardAccent: 'var(--accent-purple)' },
];

export default function DeltaVSite() {
  return <main className="relative isolate">
    <div className="home-page-shade" aria-hidden="true" />
    <div className="relative z-10">
    <section className="relative overflow-hidden border-b border-[var(--border-default)]" aria-labelledby="hero-heading">
      <div className="ambient-glow ambient-glow-cyan -top-24 left-1/3 w-[520px] h-[520px]" aria-hidden="true" />
      <div className="home-hero-shade" aria-hidden="true" />
      <div className="page-container relative z-10 grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center pt-20 md:pt-28 pb-16 md:pb-24">
        <div>
          <h1 id="hero-heading" className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-.07em] leading-[.94] animate-fade-in-up">We don&apos;t sell tools.<br /><span className="text-[var(--text-secondary)]">We forge </span><span className="gradient-text">capabilities.</span></h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>AI, Web3, and OpSec engineering for everyone. Adaptive by design. Open-source first.</p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/forge/" className="button-primary">Upskill <Arrow /></Link>
            <Link href="/ai/" className="button-secondary button-secondary-purple">Explore services <Arrow /></Link>
            <Link href="/contact/" className="button-secondary">Contact Us <Arrow /></Link>
          </div>
          <div className="mt-12 grid grid-cols-3 max-w-lg border-y border-[var(--border-default)] py-4 text-[10px] uppercase tracking-[.14em] text-[var(--text-muted)]">
            <span><b className="block text-[var(--text-primary)] text-sm mb-1">Adaptive</b>by design</span><span><b className="block text-[var(--text-primary)] text-sm mb-1">Open-source</b>first</span><span><b className="block text-[var(--text-primary)] text-sm mb-1">State of the art</b>solutions</span>
          </div>
        </div>
      </div>
    </section>

    <section id="pillars" className="page-container py-20 md:py-28" aria-labelledby="pillars-heading">
      <div className="grid md:grid-cols-[.7fr_1.3fr] gap-10 mb-12"><div><div className="eyebrow">What We Do</div><h2 id="pillars-heading" className="section-title">Three pillars. One mission.</h2></div><p className="max-w-md self-end text-[var(--text-secondary)] leading-relaxed"><strong className="font-semibold text-[var(--text-primary)]">Stay at speed with AI and Web3</strong> through open-source solutions, expert engineers, and practical mentoring.</p></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-[var(--border-default)] border border-[var(--border-default)] stagger-children">
        {capabilities.map((item) => <div key={item.href} style={{ '--card-accent': item.cardAccent } as CSSProperties} className={`capability-card group flex min-h-[260px] sm:min-h-[300px] flex-col p-5 sm:p-7 md:p-9 border-l-2 ${item.line}`}>
          <div className={`flex justify-between ${item.accent} text-xs font-mono tracking-[.16em]`}><Link href={item.href} className="hover:underline">{item.index}</Link><Link href={item.href} aria-label={`Open ${item.title}`}>↗</Link></div><h3 className={`mt-8 text-2xl md:text-3xl font-semibold tracking-tight ${item.titleTint}`}><Link href={item.href} className="hover:opacity-75">{item.title}</Link></h3><ul className="mt-5 max-w-sm space-y-2 text-sm leading-relaxed">{item.bullets.map((bullet) => <li key={bullet.href}><Link href={bullet.href} className="group/bullet flex items-start gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)]"><span className={`${item.accent} shrink-0`} aria-hidden="true">•</span><span className="flex-1">{bullet.label}</span><span className={`${item.accent} opacity-0 transition-opacity group-hover/bullet:opacity-100`} aria-hidden="true">↗</span></Link></li>)}</ul><Link href={item.href} className={`mt-auto pt-7 inline-flex text-xs font-semibold uppercase tracking-[.14em] ${item.accent} opacity-70 group-hover:opacity-100`}>{item.cta} <Arrow /></Link>
        </div>)}
      </div>
    </section>

    <section id="offerings" className="border-y border-[var(--border-default)] bg-[var(--bg-surface)]" aria-labelledby="offerings-heading"><div className="page-container py-20 md:py-28"><div className="text-center"><div className="eyebrow text-[var(--accent-orange)]">Flagship Offerings</div><h2 id="offerings-heading" className="section-title mx-auto mt-3 max-w-3xl text-center text-4xl md:text-6xl lg:text-7xl">Precision-built systems for serious builders.</h2></div><div className="mt-14 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">{[['Personal AI Mastery','A practical program for building and running your own personal AI systems with extreme operational security and long-term autonomy.','/forge/','01','View Curriculum','text-[var(--accent-purple)]'],['Growth Boost','Strategic Web3 growth — community building, public good initiatives, and fundraising with OpSec foundations baked in.','/web3/','02','Explore Web3','text-[var(--accent-orange)]'],['Tailored Multi-Agent Systems','Custom single and multi-agent architectures built around your workflows, data, and use case — shipped and hardened.','/ai/','03','Explore AI Engineering','text-[var(--accent-cyan)]']].map(([title, text, href, index, cta, ctaColor]) => <Link key={title} href={href} className="forge-course-link group grid md:grid-cols-[5rem_minmax(0,1fr)_12rem] gap-5 items-start py-7"><span className="font-mono text-xs text-[var(--accent-cyan)]">{index}</span><span><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">{text}</p></span><span className={`text-sm justify-self-start ${ctaColor}`}>{cta} <Arrow /></span></Link>)}</div></div></section>

    <section className="border-y border-[var(--border-default)] bg-[var(--bg-surface)] pb-24" aria-labelledby="cta-heading"><div className="page-container pt-8 md:pt-14"><div className="relative w-full overflow-hidden"><div className="relative z-10"><div className="relative overflow-hidden border border-[var(--border-default)] bg-[var(--bg-deep)]"><div className="relative h-48 md:h-56 overflow-hidden"><div className="absolute left-8 top-6 z-10 md:left-10"><div className="eyebrow text-[var(--accent-cyan)]">Stay in the Loop</div></div><div className="absolute inset-0"><InkGarden compact /></div><div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)]/90 via-[var(--bg-deep)]/55 to-transparent" /><h2 id="cta-heading" className="section-title absolute inset-x-0 top-[42%] max-w-xl -translate-y-1/2 p-8 md:p-10">High-signal updates only.</h2><p className="absolute bottom-0 left-0 z-10 max-w-xl p-8 pb-5 md:p-10 md:pb-7 text-[var(--text-secondary)]">Curated intel from research labs, key industry leaders, emerging talents, and engineering communities.</p></div></div><div className="mt-10"><CuratedIntel /></div><div className="mt-6 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-3"><Link href="/tutorials/" className="button-secondary">Tutorials <Arrow /></Link><Link href="/blog/" className="button-secondary">Blog <Arrow /></Link></div><Link href="/contact/" className="button-secondary">Get in touch <Arrow /></Link></div></div></div></div></section>
    </div>
  </main>;
}
