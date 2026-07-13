'use client';

import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJuly13() {
  const [artemisBody, setArtemisBody] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://deltav-cc.github.io/website-private/data/artemis-newsletter.json')
      .then(r => r.json())
      .then(d => setArtemisBody(d?.latest_weekly?.body_html || null))
      .catch(() => {});
  }, []);

  return (
    <BlogPostLayout
      title="DeFi Weekly — July 13, 2026"
      date="July 13, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="10 min read"
      excerpt="BonkDAO governance attack drains $19.3M, USX isn't alone anymore — four simultaneous stablecoin depegs, WalletBeat ships Stage 2 definitions, Ambire enables self-hosted RPC."
    >
      {/* ════════════════════════════════════════════════════════
          ARTEMIS BIG FUNDAMENTALS — Full newsletter body
          ════════════════════════════════════════════════════════ */}
      <div className="my-6">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            <span className="text-xs text-[#666] uppercase tracking-[1px]">
              Artemis Big Fundamentals — This Week in Digital Finance (06.27.2026) — by Zheng Jie
            </span>
            <a href="https://research.artemis.ai/p/this-week-in-digital-finance-06272026" target="_blank" rel="noopener noreferrer"
              className="text-[10px] text-[var(--accent-gold)] hover:underline ml-auto">
              Original on Substack →
            </a>
          </div>
        </div>

        {artemisBody ? (
          <div 
            className="artemis-body prose prose-invert max-w-none
              [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#ededed] [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#ededed] [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:text-sm [&_p]:text-[#aaa] [&_p]:leading-relaxed [&_p]:mb-3
              [&_strong]:text-[#ededed]
              [&_ul]:text-sm [&_ul]:text-[#aaa] [&_ul]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1
              [&_li]:mb-1
              [&_img]:rounded-xl [&_img]:border [&_img]:border-[#222] [&_img]:my-4 [&_img]:w-full
              [&_figure]:my-4
              [&_figcaption]:text-[10px] [&_figcaption]:text-[#666] [&_figcaption]:mt-1
              [&_a]:text-[var(--accent-gold)] [&_a]:hover:underline
              [&_hr]:border-[#222] [&_hr]:my-6
              [&_.captioned-image-container]:my-6
              [&_.image-caption]:text-[10px] [&_.image-caption]:text-[#666] [&_.image-caption]:mt-2
              [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:my-4
              [&_th]:border-b [&_th]:border-[#222] [&_th]:text-[#666] [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-[1px] [&_th]:py-2 [&_th]:px-3 [&_th]:text-left
              [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-[#1a1a1a] [&_td]:text-[#aaa]
            "
            dangerouslySetInnerHTML={{ __html: artemisBody }}
          />
        ) : (
          <div className="text-center py-12 text-sm text-[var(--text-muted)]">
            Loading Artemis newsletter...
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════
          DIVIDER
          ════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-3 my-10">
        <div className="flex-1 h-px bg-[#222]" />
        <span className="text-[10px] text-[#666] uppercase tracking-[2px]">Delta V Inputs</span>
        <div className="flex-1 h-px bg-[#222]" />
      </div>

      {/* ════════════════════════════════════════════════════════
          REKT WATCH
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mb-4">Rekt Watch — Hacks & Exploits</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed mb-4">
          A brutal fortnight for DeFi security. <strong className="text-[#ededed]">Zero smart contract exploits in the top incidents.</strong> Governance failures, key management disasters, and unchecked bridge logic dominate.
        </p>
        <div className="space-y-4">
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">BonkDAO — $19.3M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Governance</span>
              <span className="text-[10px] text-[#666]">July 6</span>
            </div>
            <p className="text-xs text-[#888]">$4.4M to buy 1% BONK, proposal with no timelock, 2.9% turnout on Solana Realms — treasury drained.{' '}
              <a href="https://rekt.news/bonkdao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Humanity Protocol — $36.4M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Key Leak</span>
            </div>
            <p className="text-xs text-[#888]">Seven private keys on a single laptop across ETH and BSC. Largest single loss this cycle.</p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Summer Finance — $6.04M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">NAV Manipulation</span>
              <span className="text-[10px] text-[#666]">July 6</span>
            </div>
            <p className="text-xs text-[#888]">Root cause: Oct 2025 incomplete offboarding left stale asset priced into vaults for 8 months.{' '}
              <a href="https://rekt.news/summer-finance-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Secret Network Bridge — $4.67M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Bridge</span>
            </div>
            <p className="text-xs text-[#888]">Two missing validation checks, forged Cosmos deposits, 7 days undetected.</p>
          </div>
          <div className="border-l-2 border-[var(--accent-orange)] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Altura — $39M Raised, Vault Closed</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]">Investigation</span>
            </div>
            <p className="text-xs text-[#888]">Gold-backed RWA yield protocol. Funds through Tron wallets tied to Kraken. Self-linked verifier.</p>
          </div>
          <div className="border-l-2 border-[#666] pl-4">
            <span className="text-xs font-semibold text-[#aaa]">Also: </span>
            <span className="text-xs text-[#888]">SecondFi ($2.4M, Cardano) · Aztec Connect ($2.28M) · Syscoin (whitehat)</span>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">The meta:</strong> governance attacks and key management failures are the dominant exploit vector. DAOs need quorum minimums + mandatory timelocks. Teams need hardware-enforced key policies. Bridges need formal verification. Attackers have moved up the stack.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Source: Rekt News</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          PHAROS WATCH
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">Four Simultaneous Deep Depegs — USX Isn't Alone Anymore</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Today's Pharos digest (#139, July 13): USX at 525 hours, 5,783 bps below peg, $20.8M float — joined by <strong className="text-[#ef4444]">pmUSD, apxUSD, and USDA at critical severity</strong>. Four simultaneous deep depegs is unprecedented for algorithmic/undercollateralized pegs.
        </p>
        <div className="grid md:grid-cols-3 gap-3 my-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Active Depegs</div>
            <div className="text-lg font-mono text-[#ef4444]">4</div>
            <div className="text-[10px] text-[#666]">USX · pmUSD · apxUSD · USDA</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">PSI Index</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">93.4</div>
            <div className="text-[10px] text-[#666]">BEDROCK · 20th day · $337B mcap</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">USDT Burns</div>
            <div className="text-lg font-mono text-[var(--accent-orange)]">$1.15B</div>
            <div className="text-[10px] text-[#666]">Yield anomalies · $257B float</div>
          </div>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed mt-3">
          PSI rose to 93.4 despite four depegs — stressed assets are all small-cap (&lt;$50M combined), while the $337B total mcap is structurally sound. <strong className="text-[#ededed]">YLDS liquidity depth collapsed</strong> — stress in yield-bearing stablecoins. BUIDL supply growing, DAI bands stable.{' '}
          <a href="https://pharos.watch/digest/2026-07-13/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full digest</a>
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Pharos Watch (digests #138–#139), DeFi Llama</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          WALLETBEAT
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">WalletBeat</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 list-disc pl-4">
          <li><strong className="text-[#ededed]">Stage 0→2 framework</strong> modeled on L2BEAT. No wallet reaches Stage 2 yet.</li>
          <li><strong className="text-[#ededed]">New data:</strong> Rainbow, Zerion, Rabby, Base. Slice Gradients for attribute scoring.</li>
          <li><strong className="text-[#ededed]">Ambire self-hosted RPC</strong> scores well — Privacy boost. Settings → Networks → Edit → custom node URL.</li>
          <li><strong className="text-[#ededed]">CROPS at wallet layer:</strong> Censorship-resistant, Open, Private, Secure ratings applied at the interface.</li>
        </ul>
        <p className="text-xs text-[#444] mt-3">Source: WalletBeat (beta.walletbeat.eth.limo)</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          REGULATION
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          EU chat control proposals advancing — latest draft expands to end-to-end encrypted messaging. On-chain messaging protocols and encrypted wallet comms next in line. US stablecoin legislation (GENIUS Act) stalled until September.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: EFF, X feed, Congressional tracker</p>
      </div>

      {/* ── Sources ── */}
      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Artemis newsletter: <a href="https://research.artemis.ai/p/this-week-in-digital-finance-06272026" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">This Week in Digital Finance (06.27.2026)</a>
        {' · '}Sources: DeFi Llama · Glassnode · Dune · Rekt News · Pharos Watch · WalletBeat · X feed
        {' · '}Compiled by Delta V Intelligence · Published every Saturday.
      </p>
    </BlogPostLayout>
  );
}
