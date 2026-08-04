'use client';

import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';
import { siteAssetUrl } from '@/lib/site';

export default function WeeklyDeltaFinancialBriefAugust03() {
  const [artemisBody, setArtemisBody] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(siteAssetUrl('/data/artemis-newsletter.json'))
      .then((r) => r.json())
      .then((d) => setArtemisBody(d?.latest_weekly?.body_html || null))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <BlogPostLayout
      title="Weekly Delta Financial Brief — August 3, 2026"
      date="August 3, 2026"
      category="Weekly Delta Financial Brief"
      type="Dashboard"
      readingTime="12 min read"
      footerVariant="weekly"
      excerpt="Situational Awareness fund nears collapse at $45B peak. Fed holds hawkish at 3.50–3.75% with three dissenters. Uniswap ships permissioned pools, Morpho launches fixed-rate lending. $36M+ in DeFi exploits across five incidents."
    >
      {/* ========================================================
          MARKET PULSE
          ======================================================== */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <h2 className="!text-lg !font-semibold !mt-0 mb-3">Market Pulse — This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">BTC</div>
            <div className="text-sm font-semibold text-[#ededed]">$63,465</div>
            <div className="text-[10px] text-[#666] mt-0.5">−0.03% · Dominance 56.4%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">ETH</div>
            <div className="text-sm font-semibold text-[#ededed]">$1,860</div>
            <div className="text-[10px] text-[#ef4444] mt-0.5">−1.21%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">Total Crypto MCap</div>
            <div className="text-sm font-semibold text-[#ededed]">$2.26T</div>
            <div className="text-[10px] text-[#ef4444] mt-0.5">−0.11% WoW</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">BTC ETF Flows (Weekly)</div>
            <div className="text-sm font-semibold text-[#ededed]">−$265.4M</div>
            <div className="text-[10px] text-[#ef4444] mt-0.5">YTD −$5.2B outflows</div>
          </div>
        </div>
        <p className="text-xs text-[#666] mt-4 pt-3 border-t border-[#1a1a1a]">
          Crypto flat through a chaotic macro week. S&P 500 at 7,600 (+1.48%) in record territory. Gold $4,107 (+1.43%) on Iran safe-haven bid. US 10Y eased to 4.69%. BTC holding $63K while equities rally — the decoupling narrative strengthens. DEX volume: BNB Chain leads at $10.8B (+41.8%), ETH $6.0B, Base $4.4B.
        </p>
      </div>

      {/* ========================================================
          TODAY WE HIGHLIGHT
          ======================================================== */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-4">Today We Highlight</div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Situational Awareness Fund Near-Collapse — The AI Era&apos;s LTCM</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Leopold Aschenbrenner&apos;s AI-focused fund hit a $45B book value at peak, riding concentrated bets on BE and SNDK — stocks that fell 40–50%. Citadel stepped in to acquire the distressed public equity book. Peak-to-distress in roughly one month. This is Long-Term Capital Management for the AI era: concentrated leverage + single thematic + narrative premium = fragility. Citadel absorbing the blow suggests systemic risk was contained — but the speed of the unwind confirms that AI CapEx exuberance has created correlated, crowded positions.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Hyperscaler Earnings: CapEx Hits 35% of Revenue, $750B Annualized</p>
              <p className="text-xs text-[#aaa] leading-relaxed">$25T worth of companies reported. Hyperscalers issued more debt in H1 2026 than any prior full year. CapEx across Big Five reached ~35% of revenue and ~$750B annualized. MSFT Azure +22%. Apollo: ~50% of net IG issuance YTD is AI-related. Credit markets are now the silent underwriter of the AI buildout — and the silent potential circuit breaker. When the bond market says &ldquo;enough,&rdquo; it won&apos;t be a tech correction — it&apos;ll be a funding crisis.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">DeFi&apos;s Compliance Maturation: Uniswap Permissioned Pools + Morpho Midnight</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Two category-defining launches. Uniswap v4 Permissioned Pools built with Superstate, Securitize, and Dowgo — onchain compliance enforcement for regulated assets. Morpho Midnight — non-custodial, onchain fixed-rate lending, addressing DeFi&apos;s biggest missing primitive. Uniswap counting BlackRock among investors while shipping compliance-aware pools tells you where the puck is going. The DeFi-native teams are out-shipping trad-fi incumbents still in PowerPoint phase.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Robinhood Chain Developer Activity Surpasses Ethereum</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Artemis data shows Robinhood chain dev activity has overtaken Ethereum. 62% of HIP-3 volume occurs when US markets are closed — confirming that onchain activity fills the gap traditional market hours leave. The &ldquo;24/7 markets&rdquo; thesis is playing out in real time. Robinhood has distribution (millions of retail users) and is now building the rails.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Also: X Money Rolls Out · Hugging Face OpenAI Rogue Agent Post-Mortem</p>
              <p className="text-xs text-[#aaa] leading-relaxed">X Money rolling out to Premium users — the Musk payments play is live. Hugging Face published a post-mortem on an OpenAI rogue agent attack — AI security incidents are now operational realities, not hypotheticals. NY moves to shut down Kalshi. CLARITY Act Senate vote odds at all-time lows.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-4 pt-3 border-t border-[#1a1a1a]">Sources: Artemis, CoinGecko, Yahoo Finance, Dune Analytics, Farside Investors, Apollo</p>
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
                [&_.captioned-image-container]:my-6
                [&_.image-caption]:text-[10px] [&_.image-caption]:text-[#666]"
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
          REKT WATCH — Last 2 Weeks (July 19 – Aug 3)
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mb-4">Rekt Watch — Last 2 Weeks</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="border-l-2 border-[#ef4444] pl-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#ededed]">Ostium — $23.8M</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Oracle Key Compromise</span>
            <span className="text-[10px] text-[#666]">July 22</span>
          </div>
          <p className="text-xs text-[#888]">Oracle signer key compromise on Arbitrum perp DEX — attacker manipulated price feed to drain vault. Protocol reopened trading July 23. The difference from typical oracle exploits: this was a targeted key compromise, not a logic flaw.</p>
        </div>
        <div className="border-l-2 border-[#ef4444] pl-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#ededed]">Wanchain Cardano Bridge (Midnight) — ~$9M</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Signature Replay</span>
            <span className="text-[10px] text-[#666]">July 21</span>
          </div>
          <p className="text-xs text-[#888]">Non-injective signed-message encoding in TreasuryCheck validator enabled replay attacks. 515M NIGHT drained. Third cross-chain bridge exploit this summer — signature validation failures remain the dominant bridge attack vector.</p>
        </div>
        <p className="text-xs text-[#666] mb-3">Also in recent weeks:</p>
        <div className="space-y-2">
          <div className="border-l-2 border-[#ef4444]/50 pl-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-[#aaa]">Balance Coin — $912K</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/10 text-[#ef4444]/70">Oracle Pricing Exploit</span>
            </div>
            <p className="text-[10px] text-[#666]">Attacker fed abnormally low BTC price, liquidated ineligible vaults. Token collapsed 99%.</p>
          </div>
          <div className="border-l-2 border-[#ef4444]/50 pl-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-[#aaa]">Zilliqa Ledger App — Undetermined</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/10 text-[#ef4444]/70">Nonce-Generation Flaw (Since 2019)</span>
            </div>
            <p className="text-[10px] text-[#666]">7-year-old bug in Ledger app: after ~5 native txs, private keys become recoverable from public signatures. Upbit flagged ZIL as cautionary.</p>
          </div>
          <div className="border-l-2 border-[#ef4444]/50 pl-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-[#aaa]">SecondFi (Yoroi) — $2.4M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/10 text-[#ef4444]/70">Wallet Key Derivation</span>
            </div>
            <p className="text-[10px] text-[#666]">Cardano wallet-generation vulnerability. Up to $20M at risk. June 24.</p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">Takeaway:</strong> Oracle manipulation is the #1 DeFi attack vector — Ostium ($23.8M) and Balance Coin ($912K) both fell to price feed attacks in the same week. Bridge season continues with Wanchain. Zilliqa&apos;s 7-year time bomb is the nightmare scenario for hardware wallet users: the device you trusted was generating keys incorrectly the whole time. Total verified losses this period: ~$36M+ across five tracked incidents.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Sources: BlockSec Phalcon, The Defiant, WuBlockchain, CoinDesk</p>
      </div>

      {/* ========================================================
          PHAROS WATCH
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins & Liquidity</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-4">Market Cohorts</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">USDT</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">$183.1B</div>
            <div className="text-[10px] text-[#666]">58.1%</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">USDC</div>
            <div className="text-lg font-mono text-[var(--accent-cyan)]">$72.0B</div>
            <div className="text-[10px] text-[#666]">22.9%</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">USDS + DAI</div>
            <div className="text-lg font-mono text-[#ededed]">$11.4B</div>
            <div className="text-[10px] text-[#666]">3.6%</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Others</div>
            <div className="text-lg font-mono text-[#ededed]">$48.5B</div>
            <div className="text-[10px] text-[#666]">15.4%</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Non-USD</div>
            <div className="text-lg font-mono text-[#f59e0b]">$8.6B</div>
            <div className="text-[10px] text-[#666]">2.7%</div>
          </div>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed mb-4">
          Total stablecoin market cap at $315.0B. USDT dominates at 58.1% — structurally sound. Non-USD stablecoins remain a small but growing slice at 2.7%. No depeg events or systemic stress reported this week.
        </p>
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Total DEX TVL</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">—</div>
            <div className="text-[10px] text-[#666]">Source: Pharos Liquidity</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">24h DEX Volume</div>
            <div className="text-lg font-mono text-[var(--accent-cyan)]">$21.2B+</div>
            <div className="text-[10px] text-[#666]">BNB $10.8B · ETH $6.0B · Base $4.4B</div>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">DEX leaders:</strong> PancakeSwap ($1.87B) leads Uniswap ($1.15B) and Aerodrome ($488M) in 24h volume. BNB Chain dominates with +41.8% weekly volume growth. Robinhood chain volume fell −17.9% — correlation with COIN/HOOD earnings weakness.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">
          Sources: <a href="https://pharos.watch/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Pharos Watch</a>
          {' · '}
          <a href="https://pharos.watch/liquidity/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Pharos Liquidity</a>
          {' · '}Artemis · Dune
        </p>
      </div>

      {/* ========================================================
          REGULATION
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Fed Holds Hawkish — 9–3 Vote, Three Dissenters Want +25bps</p>
              <p className="text-xs text-[#aaa]">Rate held at 3.50%–3.75%. Hammack, Kashkari, Logan dissented in favor of hiking. Chair Warsh: reduced forward guidance working as intended; higher rates remain on table if Iran-driven inflation materializes. Risk assets priced for cuts are mispriced.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">SEC Chair Atkins: Agency Ready to Write Crypto Rules If CLARITY Stalls</p>
              <p className="text-xs text-[#aaa]">Atkins stated SEC is prepared to provide crypto-specific rules if CLARITY Act fails in Senate. Passed House a year ago, cleared Senate Banking in May — awaiting floor vote. SEC positioning as rulemaker of last resort: rules = clarity, but SEC-written rules ≠ industry-friendly.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">CLARITY Act Stalls — Ethics Package Is the Real Blocker</p>
              <p className="text-xs text-[#aaa]">Senate Republicans released updated text. Key flashpoint: ethics provisions would bar president, VP, Congress members, and federal judges from issuing or sponsoring paid digital assets while in office. DOJ civil enforcement — a provision Democrats oppose. Both parties weaponizing crypto ethics rules against each other. Senate vote odds at all-time lows before August recess.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">CFTC Sues Kentucky — 9th State in Prediction-Market Jurisdiction Fight</p>
              <p className="text-xs text-[#aaa]">Binance US plans to apply for CFTC designated contract market (DCM) status in August. If prediction markets fall under CFTC jurisdiction, the exchange gets first-mover advantage. Kalshi targeting $40B valuation while fighting multi-front regulatory war — sued Illinois over 15% state tax on prediction market receipts.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">MiCA: Binance Withdraws Greece Application — EU Passporting Race Begins</p>
              <p className="text-xs text-[#aaa]">Binance pulled its MiCA license application in Greece; seeking authorization in a different EU member state before the July 1 wind-down deadline. MiCA&apos;s passporting framework creates a race among member states to attract crypto firms. The divergence widens: compliant DeFi will get built where rules are clear, not where the market is biggest.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-4 pt-3 border-t border-[#1a1a1a]">
          <strong className="text-[#ededed]">The big picture:</strong> Fed hawkish hold + CLARITY stalling + CFTC state-level fights = three-way regulatory headwind for US crypto. The EU, by contrast, is providing the clarity that attracts DeFi infrastructure buildout.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: CoinDesk, Decrypt, The Defiant, WuBlockchain</p>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Artemis: <a href="https://research.artemis.ai/p/this-week-in-digital-finance-20260731" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">This Week in Digital Finance (2026.07.31)</a>
        {' · '}Sources: BlockSec Phalcon · The Defiant · WuBlockchain · CoinDesk · Decrypt · DeFi Llama · CoinGecko · Farside Investors
        {' · '}Compiled by Delta V Intelligence.
      </p>
    </BlogPostLayout>
  );
}
