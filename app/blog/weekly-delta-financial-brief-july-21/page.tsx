'use client';

import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';

export default function WeeklyDeltaFinancialBriefJuly21() {
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
      title="Weekly Delta Financial Brief — Week of July 14–20, 2026"
      date="July 21, 2026"
      category="Weekly Delta Financial Brief, Crypto, AI"
      type="Dashboard"
      readingTime="10 min read"
      excerpt="Memory stocks correct 28–38% from June highs. Kimi K3 open-weight model challenges the proprietary AI thesis. Kalshi launches compute forward curves. Stripe bids $53B for PayPal. Robinhood surges 31% on SEC rule reversal."
    >
      {/* ========================================================
          MARKET PULSE
          ======================================================== */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <h2 className="!text-lg !font-semibold !mt-0 mb-3">Market Pulse — This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">BTC</div>
            <div className="text-sm font-semibold text-[#ededed]">$64,176</div>
            <div className="text-[10px] text-[#ef4444] mt-0.5">−0.66%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">ETH</div>
            <div className="text-sm font-semibold text-[#ededed]">$1,861</div>
            <div className="text-[10px] text-[#ef4444] mt-0.5">−0.29%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">Nasdaq 100</div>
            <div className="text-sm font-semibold text-[#ededed]">−4.1% WoW</div>
            <div className="text-[10px] text-[#ef4444] mt-0.5">Risk-off rotation</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">Stablecoin MCap</div>
            <div className="text-sm font-semibold text-[#ededed]">$309.4B</div>
            <div className="text-[10px] text-[#666] mt-0.5">Flat WoW</div>
          </div>
        </div>
        <p className="text-xs text-[#666] mt-4 pt-3 border-t border-[#1a1a1a]">
          Crypto drifts sideways while equities sell off on US-Iran escalation and memory stock correction. Nasdaq −4.1%, S&P −1.5%. BTC/ETH muted — crypto functioning as a volatility absorber, not a risk-on proxy this week.
        </p>
      </div>

      {/* ========================================================
          TODAY WE HIGHLIGHT
          ======================================================== */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-4">Today We Highlight</div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Memory Stocks Correct 28–38% — Open-Weight AI Wins the Week</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Micron −28%, SanDisk −38% from June peaks. Memory was the H1 2026 trade; the unwind is accelerating. But the real story: Kimi launched K3, an open-weight model that ranks behind only Anthropic's Fable 5 and OpenAI's GPT-5.6 Sol on Artificial Analysis. Gavin Baker called it "an inflection point for AI." If open-weight closes the frontier gap, the proprietary model economic moat collapses.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Kalshi Launches Compute Forward Curves — Prediction Markets Grow Up</p>
              <p className="text-xs text-[#aaa] leading-relaxed">$120B volume YTD. Kalshi introduced market-implied compute forward curves derived from chip-specific event contracts. NVIDIA B200 futures are in backwardation — market prices compute cheaper in the future. This is real price discovery for the most consequential input in the global economy. Not sports betting. Not politics. Infrastructure.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Stripe Bids $53B for PayPal — Fintech M&A Signal</p>
              <p className="text-xs text-[#aaa] leading-relaxed">PayPal rose 22% on the offer. If it closes, the combined entity would be the largest private fintech in history. Watch for regulatory scrutiny — this is the kind of deal that triggers antitrust reviews on both sides of the Atlantic. A combined Stripe/PayPal would handle an enormous share of global digital payments volume.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Robinhood +31% — SEC Reverses Pattern Day Trader Rule</p>
              <p className="text-xs text-[#aaa] leading-relaxed">HOOD was the best-performing crypto-adjacent equity this week, reversing a 60% drawdown since October. Catalyst: SEC reversal of the pattern day trader rule. Bernstein reiterated $130 PT (60% above spot) on the Bitstamp thesis — the exchange now drives ~60% of HOOD's crypto transaction volume. Robinhood is the clearest convergence play of retail brokerage + crypto infrastructure.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Hyperliquid PURR — The Inverse Strategy Trade</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Artemis published a deep dive on PURR: a zero-debt wrapper around 18.8M HYPE + $112.6M cash, trading at ~1.12x mNAV with a buyback program. Unlike MSTR (issue equity at premium → buy BTC → pray premium holds), PURR buys back shares when below NAV — mechanically increasing HYPE-per-share. Cap table: Paradigm, D1, Galaxy, Pantera. Board: ex-Barclays, ex-Boston Fed, ex-NYSE COO.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-4 pt-3 border-t border-[#1a1a1a]">Sources: Artemis, Glassnode, DeFiLlama, CoinGecko</p>
      </div>

      {/* ========================================================
          ARTEMIS BODY
          ======================================================== */}
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

      {/* ========================================================
          DIVIDER
          ======================================================== */}
      <div className="flex items-center gap-3 my-10">
        <div className="flex-1 h-px bg-[#222]" />
        <span className="text-[10px] text-[#666] uppercase tracking-[2px]">Delta V Inputs</span>
        <div className="flex-1 h-px bg-[#222]" />
      </div>

      {/* ========================================================
          REKT WATCH
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mb-4">Rekt Watch — Hack of the Week</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="border-l-2 border-[#ef4444] pl-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#ededed]">Bonzo Finance — $9.05M</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Oracle Exploit</span>
            <span className="text-[10px] text-[#666]">July 14</span>
          </div>
          <p className="text-xs text-[#888]">Supra oracle verifier accepted a zeroed signature against a zeroed key on Hedera. $9M gone because "the math checked out." Classic oracle integration failure — the verifier didn't validate that the key was non-zero. Every protocol using third-party oracles should audit this specific vector.
          </p>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">Takeaway:</strong> oracle signature verification must include a non-zero key check. This is not a new vulnerability class — it's a failure of integration testing. Assume third-party components will accept malformed input until proven otherwise.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Source: REKT.news</p>
      </div>

      {/* ========================================================
          PHAROS WATCH
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Total Stablecoin MCap</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">$309.4B</div>
            <div className="text-[10px] text-[#666]">Flat WoW</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">USDT Dominance</div>
            <div className="text-lg font-mono text-[var(--accent-cyan)]">$184B</div>
            <div className="text-[10px] text-[#666]">59.5% of market</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Sky Dollar (USDS)</div>
            <div className="text-lg font-mono text-[#ef4444]">$6.66B</div>
            <div className="text-[10px] text-[#666]">−12.15% WoW contraction</div>
          </div>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          USDS saw the largest weekly contraction among top stablecoins at −12.15%. Ethena USDe holds at $4B. WLFI USD (Trump-affiliated) at $4.27B — no movement despite political noise. The stablecoin market is structurally sound at the top but fragmentation in the mid-tier continues.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: DeFiLlama, Pharos Watch</p>
      </div>

      {/* ========================================================
          REGULATION
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">SEC Reverses Pattern Day Trader Rule</p>
              <p className="text-xs text-[#aaa]">Major win for retail trading platforms. Robinhood is the primary beneficiary — expect increased trading volumes across the brokerage sector.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Morgan Stanley Launches MSBT at 0.14%</p>
              <p className="text-xs text-[#aaa]">First spot BTC ETF issued directly by a major U.S. bank. Over $100M in week-one flows. BlackRock's IBIT ($55B) finally has a serious banking competitor.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Schwab Introduces Spot Crypto Trading</p>
              <p className="text-xs text-[#aaa]">Phased rollout to 38.5M accounts. The last major brokerage domino falls — crypto is now accessible from every major U.S. brokerage platform.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-4 pt-3 border-t border-[#1a1a1a]">Sources: CoinDesk, Congressional tracker, SEC</p>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Artemis: <a href="https://research.artemis.ai/p/this-week-in-digital-finance-07172026" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">This Week in Digital Finance (07.17.2026)</a>
        {' · '}Sources: DeFi Llama · Glassnode · Dune · REKT.news · Pharos Watch · CoinMarketCal
        {' · '}Compiled by Delta V Intelligence.
      </p>
    </BlogPostLayout>
  );
}
