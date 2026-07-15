'use client';

import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJuly13() {
  const [artemisBody, setArtemisBody] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('https://deltav-cc.github.io/website-private/data/artemis-newsletter.json')
      .then(r => r.json())
      .then(d => setArtemisBody(d?.latest_weekly?.body_html || null))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <BlogPostLayout
      title="DeFi Weekly — July 13, 2026"
      date="July 13, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="10 min read"
      excerpt="BTC holds $64K after reclaiming from sub-$60K June lows. Spot ETF outflow streak breaks after 6 weeks. AAVE V4 deposits surpass $250M. MSTR navigates first treasury underwater test."
    >
      {/* ════════════════════════════════════════════════════════
          MARKET PULSE — weekly data only, no text
          ════════════════════════════════════════════════════════ */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <h2 className="!text-lg !font-semibold !mt-0 mb-3">Market Pulse — This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">BTC Range</div>
            <div className="text-sm font-semibold text-[#ededed]">
              <span className="text-[#ef4444]">$59,300</span>
              <span className="text-[#444] mx-1">–</span>
              <span className="text-[var(--accent-green)]">$64,800</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">Low · High</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">ETH Range</div>
            <div className="text-sm font-semibold text-[#ededed]">
              <span className="text-[#ef4444]">$1,530</span>
              <span className="text-[#444] mx-1">–</span>
              <span className="text-[var(--accent-green)]">$2,140</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">Low · High</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">Total MCap</div>
            <div className="text-sm font-semibold text-[#ededed]">$2.25T</div>
            <div className="text-[10px] text-[var(--accent-green)] mt-0.5">+3.2% WoW</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">24h Vol / 30d Avg</div>
            <div className="text-sm font-semibold text-[#ededed]">68%</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent-green)] rounded-full" style={{ width: '68%' }} />
              </div>
              <span className="text-[10px] text-[#666]">68%</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">$52.5B of $77B avg</div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          TODAY WE HIGHLIGHT — 6 items, unified
          ════════════════════════════════════════════════════════ */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-4">Today We Highlight</div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Bitcoin Breaks $60K — Spot ETFs Bleed 6th Straight Week</p>
              <p className="text-xs text-[#aaa] leading-relaxed">BTC touched $59,300 — the first sub-$60K print since 2024 — before reclaiming $64K. Spot ETFs recorded their 6th consecutive weekly outflow, totaling $7.2B in aggregate redemptions. BTC dominance sits at 56%, signaling risk-off capital rotation out of alts.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Strategy (MSTR) Treasury $13.3B Underwater — 23-Month Low</p>
              <p className="text-xs text-[#aaa] leading-relaxed">MSTR trades at a 23-month low. Treasury: 847,363 BTC at $64.10B cost basis ($75,651 avg). Mark-to-market loss: ~$13.3B. Saylor's STRK convertible coverage dropped to 9.8 months.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Robinhood Raises $2.2B Zero-Coupon Convertible — 2024 Playbook Redux</p>
              <p className="text-xs text-[#aaa] leading-relaxed">HOOD dropped 5% after the raise. Repeat of the 2024 zero-coupon convertible strategy — institutional buyers get a hedge fund-style short-vol position on Robinhood equity. Crypto division Q1 2026 volume up 187% YoY.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Ambire Enables Self-Hosted RPC — A Quiet Privacy Win</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Ambire Wallet now lets users set their own RPC endpoints (Settings → Networks → Edit → custom node URL). Default RPCs are surveillance chokepoints. Self-hosted RPC breaks that chain. Combined with account abstraction, Ambire now sits in the top tier of sovereignty-respecting smart wallets.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Four Stablecoins in Deep Depeg — USX Isn't Alone Anymore</p>
              <p className="text-xs text-[#aaa] leading-relaxed">USX at 525+ hours, 5,783 bps below peg — now joined by pmUSD, apxUSD, and USDA at critical severity. Pharos PSI at 93.4 (BEDROCK for 20th consecutive day). Stablecoin market bifurcating: institutional assets structurally sound, small-cap algorithmic pegs entering systemic failure.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">BonkDAO Governance Attack — $19.3M Drained With No Exploit</p>
              <p className="text-xs text-[#aaa] leading-relaxed">The largest hack of the summer used zero broken code. Attacker spent $4.4M to buy 1% of BONK, buried a treasury transfer inside an innocuous proposal, passed it with 2.9% turnout on Solana's Realms with no timelock. Every DAO with low participation is exposed.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-4 pt-3 border-t border-[#1a1a1a]">Sources: Artemis, Glassnode, Rekt News, Ambire, Pharos Watch</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          ARTEMIS BODY — full newsletter, no banner
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">This Week&apos;s Briefing</h2>
      <div className="my-6">
        {artemisBody ? (
          <>
            <style>{`
              .artemis-body h1:first-child,
              .artemis-body h1:first-of-type,
              .artemis-body h2:first-child,
              .artemis-body h2:first-of-type,
              .artemis-body h3:first-child,
              .artemis-body h3:first-of-type { display: none !important; }
            `}</style>
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
              "
              dangerouslySetInnerHTML={{ __html: artemisBody }}
            />
          </>
        ) : loaded ? null : (
          <div className="text-center py-12 text-sm text-[var(--text-muted)]">
            Loading Artemis newsletter…
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
          REKT WATCH — hack of the week only
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mb-4">Rekt Watch — Hack of the Week</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="border-l-2 border-[#ef4444] pl-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#ededed]">BonkDAO — $19.3M</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Governance Attack</span>
            <span className="text-[10px] text-[#666]">July 6</span>
          </div>
          <p className="text-xs text-[#888]">$4.4M to buy 1% of BONK supply. Buried a treasury transfer inside an innocuous proposal. Passed with 2.9% turnout on Solana's Realms. No timelock. No smart contract exploit — pure governance failure. Every token-weighted DAO with low participation is exposed.{' '}
            <a href="https://rekt.news/bonkdao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">Takeaway:</strong> governance attacks are the dominant exploit vector this cycle. DAOs need quorum minimums and mandatory timelocks. Code audits don't protect against voter apathy.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Source: Rekt News</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          PHAROS WATCH — stablecoins
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">Four Simultaneous Deep Depegs</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Pharos digest #139 (July 13): USX at 525 hours, 5,783 bps below peg — now joined by <strong className="text-[#ef4444]">pmUSD, apxUSD, and USDA at critical severity</strong>. Four simultaneous deep depegs in the long-tail market is unprecedented.
        </p>
        <div className="grid md:grid-cols-3 gap-3 my-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Active Depegs</div>
            <div className="text-lg font-mono text-[#ef4444]">4</div>
            <div className="text-[10px] text-[#666]">USX · pmUSD · apxUSD · USDA</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">PSI</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">93.4</div>
            <div className="text-[10px] text-[#666]">BEDROCK · 20th day · $337B mcap</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Total Stablecoin MCap</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">$337B</div>
            <div className="text-[10px] text-[#666]">USDT $114B · USDC $55B · DAI $5B</div>
          </div>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed mt-3">
          PSI at 93.4 despite four depegs — stressed assets are small-cap (&lt;$50M combined). USDT burns: $1.15B in first half of July. BUIDL supply continues growing. DAI bands stable.{' '}
          <a href="https://pharos.watch/digest/2026-07-13/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full digest</a>
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Pharos Watch (digests #138–#139), DeFi Llama</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          UPCOMING EVENTS & UNLOCKS
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Upcoming Events & Unlocks</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Connex — $21.04M Unlock</p>
              <p className="text-xs text-[#666]">July 15 · Ecosystem ($13.1M) + Treasury ($7.95M)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Arbitrum (ARB) — $8.69M Unlock</p>
              <p className="text-xs text-[#666]">July 16 · Team ($5.27M) + Investors ($3.43M) · 0.93% of supply</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Sei — $5.95M Unlock</p>
              <p className="text-xs text-[#666]">July 14 · Private sale + Team + Staking rewards</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Vana — $1.51M Unlock</p>
              <p className="text-xs text-[#666]">July 17 · 1.03% of float · Insiders + Private sale</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Maple Finance · MIP-021 Buyback Activation</p>
              <p className="text-xs text-[#666]">July 13 · Rules-based buyback scaling with protocol revenue</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">IOTA Community AMA with Dominik Schiener</p>
              <p className="text-xs text-[#666]">July 15 · Project updates, Q&A with co-founder</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-3 pt-3 border-t border-[#1a1a1a]">
          Total unlocks this week: <strong className="text-[#ededed]">~$37.2M</strong>. Connex leads at $21M (mostly ecosystem). ARB and Sei are the most liquid.{' '}
          <a href="https://defillama.com/unlocks/calendar" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">DeFi Llama unlocks</a>
          {' · '}
          <a href="https://coinmarketcal.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">CoinMarketCal</a>
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          REGULATION
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          EU chat control advancing — encrypted messaging in scope. On-chain messaging protocols and wallet comms next. US GENIUS Act stalled until September.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: EFF, Congressional tracker</p>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Artemis: <a href="https://research.artemis.ai/p/this-week-in-digital-finance-06272026" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">This Week in Digital Finance (06.27.2026)</a>
        {' · '}Sources: DeFi Llama · Glassnode · Dune · Rekt News · Pharos Watch · CoinMarketCal · X feed
        {' · '}Compiled by Delta V Intelligence.
      </p>
    </BlogPostLayout>
  );
}
