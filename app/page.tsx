'use client';

import Link from 'next/link';
import CuratedIntel from './components/CuratedIntel';
import InkGarden from './components/InkGarden';

const Arrow = () => <span aria-hidden="true">↗</span>;

const capabilities = [
  { href: '/ai/', index: '01', title: 'AI Engineering', bullets: ['Tailored multi-agent systems', 'Inference and model engineering', 'Ongoing AI engineer support'], accent: 'text-[var(--accent-cyan)]', line: 'border-[var(--accent-cyan)]/30' },
  { href: '/web3/', index: '02', title: 'Web3', bullets: ['SOTA setup and architecture', 'Web3 intelligence and OSINT', 'Growth, public goods, and community building'], accent: 'text-[var(--accent-orange)]', line: 'border-[var(--accent-orange)]/30' },
  { href: '/forge/', index: '03', title: 'Skill Forge', bullets: ['Personal AI Mastery', 'AI Engineering Bootcamp', 'OpSec training and auditing'], accent: 'text-[var(--accent-purple)]', line: 'border-[var(--accent-purple)]/30' },
];

export default function DeltaVSite() {
  return <main className="relative isolate">
    <InkGarden background />
    <div className="relative z-10">
    <section className="relative overflow-hidden border-b border-[var(--border-default)]" aria-labelledby="hero-heading">
      <div className="ambient-glow ambient-glow-cyan -top-24 left-1/3 w-[520px] h-[520px]" aria-hidden="true" />
      <div className="page-container relative grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center pt-20 md:pt-28 pb-16 md:pb-24">
        <div>
          <h1 id="hero-heading" className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-.07em] leading-[.94] animate-fade-in-up">We don&apos;t sell tools.<br /><span className="text-[var(--text-secondary)]">We forge </span><span className="gradient-text">capabilities.</span></h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>AI, Web3, and OpSec engineering for everyone. Adaptive by design. Open-source first.</p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/forge/" className="button-primary">Upskill <Arrow /></Link>
            <Link href="/ai/" className="button-secondary">Explore services <Arrow /></Link>
            <Link href="/contact/" className="button-secondary">Contact Us <Arrow /></Link>
          </div>
          <div className="mt-12 grid grid-cols-3 max-w-lg border-y border-[var(--border-default)] py-4 text-[10px] uppercase tracking-[.14em] text-[var(--text-muted)]">
            <span><b className="block text-[var(--text-primary)] text-sm mb-1">Adaptive</b>by design</span><span><b className="block text-[var(--text-primary)] text-sm mb-1">Open-source</b>first</span><span><b className="block text-[var(--text-primary)] text-sm mb-1">State of the art</b>solutions</span>
          </div>
        </div>
        <InkGarden />
      </div>
    </section>

    <section id="pillars" className="page-container py-20 md:py-28" aria-labelledby="pillars-heading">
      <div className="grid md:grid-cols-[.7fr_1.3fr] gap-10 mb-12"><div><div className="eyebrow">What We Do</div><h2 id="pillars-heading" className="section-title">Three pillars. One mission.</h2></div><p className="max-w-md self-end text-[var(--text-secondary)] leading-relaxed">If you are looking for top engineers and mentoring to upskill in AI and Web3, you are in the right place.</p></div>
      <div className="grid md:grid-cols-3 gap-px bg-[var(--border-default)] border border-[var(--border-default)] stagger-children">
        {capabilities.map((item) => <Link key={item.href} href={item.href} className={`group min-h-[220px] p-7 md:p-9 bg-[var(--bg-deep)] border-l-2 ${item.line} hover:bg-[var(--bg-surface)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)]`}>
          <div className={`flex justify-between ${item.accent} text-xs font-mono tracking-[.16em]`}><span>{item.index}</span><span>↗</span></div><h3 className="mt-14 text-2xl md:text-3xl font-semibold tracking-tight">{item.title}</h3><ul className="mt-5 max-w-sm space-y-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className={`${item.accent} shrink-0`} aria-hidden="true">•</span><span>{bullet}</span></li>)}</ul><div className={`mt-7 text-xs font-semibold uppercase tracking-[.14em] ${item.accent} opacity-70 group-hover:opacity-100`}>Explore capability <Arrow /></div>
        </Link>)}
      </div>
    </section>

    <section className="page-container pb-20 md:pb-28" aria-labelledby="intel-heading"><div className="grid md:grid-cols-[.7fr_1.3fr] gap-10 mb-8"><div><div className="eyebrow">Curated Intel</div><h2 className="section-title">Curated Intel</h2></div><div className="max-w-md self-end"><p className="text-sm leading-relaxed text-[var(--text-secondary)]">Curated intel from research labs, key industry leaders, and engineering communities.</p></div></div><CuratedIntel /><div className="mt-6 flex justify-center"><Link href="/intelhub/" className="button-secondary">Explore IntelHub <Arrow /></Link></div></section>

    <section id="offerings" className="border-y border-[var(--border-default)] bg-[var(--bg-surface)]" aria-labelledby="offerings-heading"><div className="page-container py-20 md:py-28"><div className="eyebrow text-[var(--accent-orange)]">Flagship Offerings</div><h2 id="offerings-heading" className="section-title max-w-xl mt-3">Precision-built systems for serious builders.</h2><div className="mt-12 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">{[['Personal AI Mastery','A practical program for building and running your own personal AI systems with extreme operational security and long-term autonomy.','/forge/','01','View Curriculum'],['Growth Boost','Strategic Web3 growth — community building, public good initiatives, and fundraising with OpSec foundations baked in.','/web3/','02','Explore Web3'],['Tailored Multi-Agent Systems','Custom single and multi-agent architectures built around your workflows, data, and use case — shipped and hardened.','/ai/','03','Explore AI Engineering']].map(([title, text, href, index, cta]) => <Link key={title} href={href} className="group grid md:grid-cols-[5rem_1fr_auto] gap-5 items-start py-7 hover:px-3 transition-all"><span className="font-mono text-xs text-[var(--accent-cyan)]">{index}</span><span><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">{text}</p></span><span className="text-sm text-[var(--accent-orange)]">{cta} <Arrow /></span></Link>)}</div></div></section>

    <section className="page-container py-16" aria-label="Trusted by"><div className="eyebrow text-center mb-8">Trusted By</div><div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 opacity-50 hover:opacity-80 transition-opacity"><img src="/website-private/images/defiscan-logo.svg" alt="DeFiScan" className="h-10 w-auto max-w-[175px]" /><img src="/website-private/images/storm-partners-logo.svg" alt="STORM Partners" className="h-8 w-auto" /><img src="/website-private/images/defi-collective-logo.svg" alt="DeFi Collective" className="h-11 w-auto max-w-[175px]" /></div></section>

    <section className="page-container pb-24" aria-labelledby="cta-heading"><div className="relative overflow-hidden border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-14"><InkGarden compact /><div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/95 to-transparent" /><div className="relative max-w-xl"><div className="eyebrow text-[var(--accent-orange)]">Stay in the Loop</div><h2 id="cta-heading" className="section-title mt-3">High-signal updates only.</h2><p className="mt-4 text-[var(--text-secondary)]">Curated intelligence, technical breakdowns, and new tutorials delivered directly.</p><div className="mt-8 flex flex-wrap items-center justify-between gap-5"><div className="flex flex-wrap gap-3"><Link href="/intelhub/" className="button-primary">Browse IntelHub <Arrow /></Link><Link href="/tutorials/" className="button-secondary">Tutorials <Arrow /></Link><Link href="/blog/" className="button-secondary">Blog <Arrow /></Link></div><Link href="/contact/" className="button-secondary md:ml-auto">Get in touch <Arrow /></Link></div></div></div></section>
    </div>
  </main>;
}
