'use client';

import Link from 'next/link';
import CuratedIntel from './components/CuratedIntel';
import AsciiMist from './components/AsciiMist';

const Arrow = () => <span aria-hidden="true">↗</span>;

const capabilities = [
  { href: '/ai/', index: '01', title: 'AI Engineering', text: 'Multi-agent systems, inference and local-first deployment for operators who need control.', accent: 'text-[var(--accent-cyan)]', line: 'border-[var(--accent-cyan)]/30' },
  { href: '/web3/', index: '02', title: 'Web3 Intelligence', text: 'Architecture, OSINT and on-chain strategy with operational security built in.', accent: 'text-[var(--accent-orange)]', line: 'border-[var(--accent-orange)]/30' },
  { href: '/forge/', index: '03', title: 'Skill Forge', text: 'Hands-on programs to build autonomous systems and the judgment to run them.', accent: 'text-[var(--accent-purple)]', line: 'border-[var(--accent-purple)]/30' },
];

export default function DeltaVSite() {
  return <>
    <section className="relative overflow-hidden border-b border-[var(--border-default)]" aria-labelledby="hero-heading">
      <div className="ambient-glow ambient-glow-cyan -top-24 left-1/3 w-[520px] h-[520px]" aria-hidden="true" />
      <div className="page-container relative grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center pt-20 md:pt-28 pb-16 md:pb-24">
        <div>
          <div className="flex items-center gap-3 mb-7 text-[10px] font-semibold tracking-[.2em] uppercase text-[var(--accent-cyan)]"><span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" /> Sovereign systems / Delta V</div>
          <h1 id="hero-heading" className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-.07em] leading-[.94] animate-fade-in-up">We don&apos;t sell tools.<br /><span className="text-[var(--text-secondary)]">We forge </span><span className="gradient-text">capabilities.</span></h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>Sovereign AI, Web3, and OpSec engineering for high-stakes operators. Local-first by default. Keys never leave the machine.</p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/intelhub/" className="button-primary">Explore IntelHub <Arrow /></Link>
            <Link href="/contact/" className="button-secondary">Start a conversation <Arrow /></Link>
          </div>
          <div className="mt-12 grid grid-cols-3 max-w-lg border-y border-[var(--border-default)] py-4 text-[10px] uppercase tracking-[.14em] text-[var(--text-muted)]">
            <span><b className="block text-[var(--text-primary)] text-sm mb-1">Local-first</b>control</span><span><b className="block text-[var(--text-primary)] text-sm mb-1">Signal-led</b>clarity</span><span><b className="block text-[var(--text-primary)] text-sm mb-1">Delta V</b>acceleration</span>
          </div>
        </div>
        <AsciiMist />
      </div>
    </section>

    <section id="pillars" className="page-container py-20 md:py-28" aria-labelledby="pillars-heading">
      <div className="grid md:grid-cols-[.7fr_1.3fr] gap-10 mb-12"><div><div className="eyebrow">Capabilities / 03</div><h2 id="pillars-heading" className="section-title">One mission.<br /><span className="text-[var(--text-secondary)]">Three ways in.</span></h2></div><p className="max-w-md self-end text-[var(--text-secondary)] leading-relaxed">We work at the intersection of intelligence, infrastructure and human capability — with fewer layers between the signal and the decision.</p></div>
      <div className="grid md:grid-cols-2 gap-px bg-[var(--border-default)] border border-[var(--border-default)] stagger-children">
        {capabilities.map((item, i) => <Link key={item.href} href={item.href} className={`group min-h-[220px] p-7 md:p-9 bg-[var(--bg-deep)] border-l-2 ${item.line} hover:bg-[var(--bg-surface)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-cyan)] ${i === 0 ? 'md:row-span-2 md:min-h-[440px]' : ''}`}>
          <div className={`flex justify-between ${item.accent} text-xs font-mono tracking-[.16em]`}><span>{item.index}</span><span>↗</span></div><h3 className="mt-14 text-2xl md:text-3xl font-semibold tracking-tight">{item.title}</h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">{item.text}</p><div className={`mt-7 text-xs font-semibold uppercase tracking-[.14em] ${item.accent} opacity-70 group-hover:opacity-100`}>Explore capability <Arrow /></div>
        </Link>)}
      </div>
    </section>

    <section className="page-container pb-20 md:pb-28" aria-labelledby="intel-heading"><div className="grid md:grid-cols-[.7fr_1.3fr] gap-10 mb-8"><div><div className="eyebrow">Field notes / live</div><h2 className="section-title">Curated Intel</h2></div><p className="max-w-md self-end text-sm leading-relaxed text-[var(--text-secondary)]">A moving index of the ideas, threats and infrastructure shaping the next operating environment.</p></div><CuratedIntel /></section>

    <section id="offerings" className="border-y border-[var(--border-default)] bg-[var(--bg-surface)]" aria-labelledby="offerings-heading"><div className="page-container py-20 md:py-28"><div className="eyebrow text-[var(--accent-orange)]">Missions / selected</div><h2 id="offerings-heading" className="section-title max-w-xl mt-3">Precision-built systems for serious builders.</h2><div className="mt-12 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">{[['Personal AI Mastery','Build and run your own personal AI systems with extreme operational security.','/forge/','01'],['AI Engineering Bootcamp','Five days from zero to deployed, with a production system in hand.','/forge/','02']].map(([title, text, href, index]) => <Link key={title} href={href} className="group grid md:grid-cols-[5rem_1fr_auto] gap-5 items-start py-7 hover:px-3 transition-all"><span className="font-mono text-xs text-[var(--accent-cyan)]">{index}</span><span><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">{text}</p></span><span className="text-sm text-[var(--accent-orange)]">View mission <Arrow /></span></Link>)}</div></div></section>

    <section className="page-container py-16" aria-label="Trusted by"><div className="eyebrow text-center mb-8">Trusted by</div><div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-50 hover:opacity-80 transition-opacity"><img src="/website-private/images/defiscan-logo.svg" alt="DeFiScan" className="h-8 w-auto max-w-[140px]" /><img src="/website-private/images/storm-partners-logo.svg" alt="STORM Partners" className="h-6 w-auto" /><img src="/website-private/images/defi-collective-logo.svg" alt="DeFi Collective" className="h-9 w-auto max-w-[140px]" /></div></section>

    <section className="page-container pb-24" aria-labelledby="cta-heading"><div className="relative overflow-hidden border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-14"><AsciiMist compact /><div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/95 to-transparent" /><div className="relative max-w-xl"><div className="eyebrow text-[var(--accent-orange)]">Stay in the loop</div><h2 id="cta-heading" className="section-title mt-3">High-signal updates only.</h2><p className="mt-4 text-[var(--text-secondary)]">Curated intelligence, technical breakdowns and new tutorials, without the noise.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/intelhub/" className="button-primary">Browse IntelHub <Arrow /></Link><Link href="/contact/" className="button-secondary">Get in touch <Arrow /></Link></div></div></div></section>
  </>;
}
