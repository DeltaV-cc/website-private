'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// ── Types ──
interface MarketData {
  btc_price?: number;
  eth_price?: number;
  total_mcap?: number;
  mcap_change_24h?: number;
  btc_dominance?: number;
}

interface Edition {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}

// ── Latest published editions (hardcoded, updated each Saturday) ──
const EDITIONS: Edition[] = [
  {
    title: 'DeFi Weekly — June 27, 2026',
    slug: '/blog/defi-weekly-june-27/',
    date: 'June 27, 2026',
    excerpt: 'BTC breaks below $60K, spot ETFs bleed 6th straight week, MSTR treasury $13.3B underwater, Robinhood raises $2.2B convertible — AAVE +30% stands alone.',
  },
  {
    title: 'DeFi Weekly — June 23, 2026',
    slug: '/blog/defi-weekly-june-23/',
    date: 'June 23, 2026',
    excerpt: 'True DeFi pulse: token unlocks ahead, macro crosscurrents, Liquity v2 traction, WalletBeat milestones, the STRC depeg.',
  },
];

// ── Sources we track ──
const SOURCES = [
  { name: 'Artemis', url: 'https://research.artemis.ai/', desc: 'On-chain fundamentals & research' },
  { name: 'DeFi Llama', url: 'https://defillama.com/', desc: 'TVL, fees, revenue' },
  { name: 'Glassnode', url: 'https://glassnode.com/', desc: 'On-chain metrics & flows' },
  { name: 'Dune', url: 'https://dune.com/', desc: 'Community dashboards' },
  { name: 'WalletBeat', url: 'https://x.com/walletbeat', desc: 'Monthly wallet metrics' },
  { name: 'Pharos Watch', url: 'https://pharos.watch/digest', desc: 'Stablecoin risk scores' },
  { name: 'Rekt News', url: 'https://rekt.news/', desc: 'DeFi hacks & exploits' },
  { name: 'X Feed', url: '#', desc: 'CT alpha & signal' },
];

function fmtBig(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toFixed(0)}`;
}

// ── Page ──
export default function DeFiWeeklyPage() {
  const [market, setMarket] = useState<MarketData | null>(null);

  useEffect(() => {
    fetch('https://deltav-cc.github.io/website-private/data/crypto.json')
      .then(r => r.json())
      .then(d => setMarket(d))
      .catch(() => {});
  }, []);

  const latest = EDITIONS[0];

  return (
    <div className="min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 md:px-8 pt-20 pb-24">
        {/* Back link */}
        <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors mb-10 group">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5"><path d="M10 7H3M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All articles
        </Link>

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="text-[var(--accent-gold)] text-xs font-semibold tracking-[3px] uppercase mb-3">Weekly Intelligence</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">DeFi Weekly</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Weekly market overview, protocol deep-dives, wallet stats, stablecoin risk, and on-chain fundamentals — curated by Delta V.
          </p>
        </div>

        {/* ── Live Market Bar ── */}
        {market && (
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 mb-10">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-[1px] mb-3">Live Market Snapshot</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">BTC</div>
                <div className="text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                  ${market.btc_price ? market.btc_price.toLocaleString() : '···'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">ETH</div>
                <div className="text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                  ${market.eth_price ? market.eth_price.toLocaleString() : '···'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">Total MCap</div>
                <div className="text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                  {market.total_mcap ? fmtBig(market.total_mcap) : '···'}
                </div>
                {market.mcap_change_24h != null && (
                  <div className={`text-[10px] mt-0.5 ${market.mcap_change_24h >= 0 ? 'text-[var(--accent-green)]' : 'text-[#ef4444]'}`}>
                    {market.mcap_change_24h >= 0 ? '+' : ''}{market.mcap_change_24h.toFixed(1)}% 24h
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">BTC Dominance</div>
                <div className="text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                  {market.btc_dominance ? market.btc_dominance.toFixed(1) + '%' : '···'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Latest Edition ── */}
        <div className="mb-12">
          <h2 className="text-sm text-[var(--text-muted)] uppercase tracking-[1.5px] mb-4">Latest Edition</h2>
          <Link href={latest.slug}
            className="block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 hover:border-[var(--accent-gold)]/30 hover:bg-[var(--bg-elevated)] transition-all group cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] text-[var(--accent-gold)] uppercase tracking-[1.5px] font-bold">{latest.date}</span>
            </div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors leading-tight mb-3">
              {latest.title}
            </h3>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-4">{latest.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-gold)] group-hover:underline">
              Read full edition
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>
        </div>

        {/* ── Past Editions ── */}
        {EDITIONS.length > 1 && (
          <div className="mb-12">
            <h2 className="text-sm text-[var(--text-muted)] uppercase tracking-[1.5px] mb-4">Past Editions</h2>
            <div className="space-y-3">
              {EDITIONS.slice(1).map((ed, i) => (
                <Link key={i} href={ed.slug}
                  className="block rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 hover:border-[var(--accent-gold)]/25 hover:bg-[var(--bg-elevated)] transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">{ed.title}</h3>
                      <p className="text-xs text-[var(--text-tertiary)] mt-1 line-clamp-2">{ed.excerpt}</p>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0 mt-1">{ed.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── What We Track ── */}
        <div className="mb-12">
          <h2 className="text-sm text-[var(--text-muted)] uppercase tracking-[1.5px] mb-4">What We Track</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'WalletBeat', desc: 'Monthly wallet downloads, active users, custody shifts', color: 'var(--accent-cyan)' },
              { label: 'Pharos Watch', desc: 'Stablecoin risk scores & emerging assets (Stages 1-2)', color: 'var(--accent-purple)' },
              { label: 'Rekt News', desc: 'Latest DeFi hacks, exploits, and post-mortems', color: '#ef4444' },
              { label: 'Sovereign Infra', desc: 'Self-custody, encryption, decentralized comms', color: 'var(--accent-green)' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{item.label}</span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sources ── */}
        <div className="pt-8 border-t border-[var(--border-default)]">
          <h2 className="text-sm text-[var(--text-muted)] uppercase tracking-[1.5px] mb-4">Data Sources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SOURCES.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="block rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 hover:border-[var(--accent-gold)]/25 transition-all group">
                <div className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">{s.name}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Published every Saturday · Compiled by Delta V Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
