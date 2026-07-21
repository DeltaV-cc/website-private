'use client';

import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJune27() {
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
      title="Weekly Delta Financial Brief — June 27, 2026"
      date="June 27, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="10 min read"
      excerpt="The Great Rotation: AI capex doubts trigger a historic pivot into value stocks. Robinhood ships its own Arbitrum L2 with 24/7 tokenized equities. Open USD lands with 140 partners. Plus: BonkDAO $19.3M governance attack, four stablecoin depegs."
    >
      {/* ========================================================
          MARKET PULSE
          ======================================================== */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <h2 className="!text-lg !font-semibold !mt-0 mb-3">Market Pulse — This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">BTC Range</div>
            <div className="text-sm font-semibold text-[#ededed]">
              <span className="text-[#ef4444]">$59,300</span>
              <span className="text-[#444] mx-1">–</span>
              <span className="text-[var(--accent-green)]">$65,200</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">Low · High · +6.5%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">ETH Range</div>
            <div className="text-sm font-semibold text-[#ededed]">
              <span className="text-[#ef4444]">$1,530</span>
              <span className="text-[#444] mx-1">–</span>
              <span className="text-[var(--accent-green)]">$2,240</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">Low · High · +11.8%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">Dow / Nasdaq</div>
            <div className="text-sm font-semibold text-[#ededed]">
              <span className="text-[var(--accent-green)]">53,086</span>
              <span className="text-[#444] mx-1">/</span>
              <span className="text-[#ef4444]">−0.2%</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">Dow record · Nasdaq-100 flat</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase tracking-[1px] mb-1">AI Capex Heat</div>
            <div className="text-sm font-semibold text-[#ef4444]">Rotation</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-[#ef4444] rounded-full" style={{ width: '35%' }} />
              </div>
              <span className="text-[10px] text-[#666]">Corning −23.8%</span>
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">$600B+ capex · 46% faster than revs</div>
          </div>
        </div>
      </div>

      {/* ========================================================
          TODAY WE HIGHLIGHT — unified box
          ======================================================== */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-4">Today We Highlight</div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">The Great Rotation: AI Capex Doubts Trigger a Historic Pivot</p>
              <p className="text-xs text-[#aaa] leading-relaxed">The most important market story this year: capital is rotating out of AI hardware into value and defensive names. Big-tech AI capex will top $600B in 2026 — growing 46% faster than revenue, the widest gap since the 2001 telecom bubble. Corning crashed 23.8%, SanDisk 14.9%, even as Dow made new records above 53,000 and the Russell 2000 posted its best H1 since 1991. Nvidia and Broadcom went flat while the market rewarded "boring" stocks: financials, insurers, healthcare, midstream energy.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Robinhood Chain: From App to On-Chain Infrastructure</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Robinhood launched its Arbitrum-based L2 with 24/7 tokenized stocks (NVDA, AAPL, GOOG as tokenized debt securities) available in 120+ countries. Day-one DeFi stack: Uniswap, 1inch, Lighter, Morpho Earn (~7% APY on USDG), Chainlink oracles. This is the culmination of their 2025 acquisition spree (Bitstamp, WonderFi) — a vertically integrated on-chain brokerage. HOOD +15.4% for the week. The SEC just added crypto rulemaking to its July agenda, so the regulatory line between compliant synthetic and unregistered security is being drawn right now.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Open USD: A 140-Partner Stablecoin Consortium</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Google, Visa, Stripe, BlackRock, Coinbase, Solana, IBM, Samsung, Standard Chartered, US Bank, AmEx, BBVA, BNY, Mastercard — all backing Open USD, a new stablecoin led by former Coinbase product lead Zach Abrams. Pitched as "a stablecoin for global money movement." Distribution is the moat: card networks, banks, and Big Tech routing real-world payment flow to a stablecoin from day one. USDT ($185B) and USDC ($76B) dominate the $295B+ market. PYUSD sits at $2.8B — so Open USD starts small but with a distribution advantage no fintech has ever had.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Ambire Enables Self-Hosted RPC — A Quiet Privacy Win</p>
              <p className="text-xs text-[#aaa] leading-relaxed">Ambire Wallet now lets users set their own RPC endpoints (Settings → Networks → Edit → custom node URL). Default RPCs are surveillance chokepoints. Self-hosted RPC breaks that chain. Combined with account abstraction, Ambire sits in the top tier of sovereignty-respecting smart wallets — a meaningful counterweight to the Open USD/corporate stablecoin consolidation trend.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">Four Stablecoins in Deep Depeg — USX at 450+ Hours</p>
              <p className="text-xs text-[#aaa] leading-relaxed">USX at 453+ hours, 5,783 bps below peg ($20.8M float) — now joined by pmUSD, apxUSD, and USDA at critical severity. PSI at 93, BEDROCK for 17th consecutive day. 13 active depegs tracked. The bifurcation is stark: the $295B+ stablecoin market is structurally sound at the top, but small-cap algorithmic pegs are entering systemic failure. Open USD launches into this environment — consolidation pressure from above and below.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold mb-1">BonkDAO Governance Attack — $19.3M Drained With No Exploit</p>
              <p className="text-xs text-[#aaa] leading-relaxed">July 6: attacker spent $4.4M to buy 1% of BONK, passed a treasury-draining proposal with 2.9% turnout on Solana's Realms. No timelock. No smart contract bug. Every token-weighted DAO with low participation is exposed — the same governance model that Robinhood Chain will need to avoid.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-4 pt-3 border-t border-[#1a1a1a]">Sources: Artemis, Rekt News, Pharos Watch, Ambire, Glassnode</p>
      </div>

      {/* ========================================================
          ARTEMIS BODY — full newsletter
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
          REKT WATCH — last 7 days
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mb-4">Rekt Watch — Last 7 Days</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="space-y-4">
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">BonkDAO — $19.3M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Governance Attack</span>
              <span className="text-[10px] text-[#666]">July 6</span>
            </div>
            <p className="text-xs text-[#888]">$4.4M to buy 1% of BONK supply. No-exploit treasury drain via governance on Solana Realms. 2.9% turnout, zero timelock. Every DAO exposed.{' '}
              <a href="https://rekt.news/bonkdao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Summer Finance — $6.04M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">NAV Manipulation</span>
              <span className="text-[10px] text-[#666]">July 6</span>
            </div>
            <p className="text-xs text-[#888]">A capped-for-removal stale Ark asset still counted in vault NAV — attacker donated it back to inflate share price, then drained real liquidity in one atomic transaction. Protocol paused vaults after detection.{' '}
              <a href="https://rekt.news/summer-finance-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[var(--accent-orange)] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Altura — $39M Raised, Vault Closed</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]">Investigation</span>
              <span className="text-[10px] text-[#666]">Early July</span>
            </div>
            <p className="text-xs text-[#888]">Gold-backed RWA yield protocol. $39M raised. Funds traced through Tron wallets tied to Kraken. Verifier controlled by COO's own project. Dashboard admitted it verified nothing. Depositors waiting.{' '}
              <a href="https://rekt.news/digging-for-gold" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">SecondFi — $2.4M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Key Disclosure</span>
              <span className="text-[10px] text-[#666]">Recent</span>
            </div>
            <p className="text-xs text-[#888]">A single missing secret in the signing code made every on-chain transaction a private key disclosure. 374 wallets drained on Cardano. One line of missing code.{' '}
              <a href="https://rekt.news/secondfi-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Secret Network Bridge — $4.67M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Bridge</span>
              <span className="text-[10px] text-[#666]">Recent</span>
            </div>
            <p className="text-xs text-[#888]">Two missing validation checks in a forked IBC contract let attacker forge deposits with a fake Cosmos chain. Drain went undetected for 7 days.{' '}
              <a href="https://rekt.news/secret-network-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Aztec Bridge — $2.20M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">ZK Verification</span>
              <span className="text-[10px] text-[#666]">Recent</span>
            </div>
            <p className="text-xs text-[#888]">Legacy rollup contract lost funds after a ZK proof passed a broken root-binding check. One deprecated contract, one flawed escape hatch.{' '}
              <a href="https://rekt.news/aztec-bridge-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">TesseraDAO — Admin Privilege Abuse</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Admin Keys</span>
              <span className="text-[10px] text-[#666]">Recent</span>
            </div>
            <p className="text-xs text-[#888]">Admin privilege exploit — classic centralized control failure.{' '}
              <a href="https://rekt.news/tesseradao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">7 hacks this week · ~$73.6M total.</strong> Zero smart contract bugs in the top losses. The attack surface has shifted: governance (BonkDAO), stale admin state (Summer Finance, Aztec), missing validation (Secret Network, SecondFi), and centralized key/verifier control (Altura, TesseraDAO). As Robinhood Chain launches and Open USD consolidates, these are the exact failure modes every new protocol must defend against.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Source: Rekt News · <a href="https://rekt.news/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">rekt.news</a></p>
      </div>

      {/* ========================================================
          PHAROS WATCH
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">13 Active Depegs — Four at Critical Severity</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Pharos digest #136 (July 10): USX at 453+ hours, 5,783 bps below peg. Now joined by pmUSD, apxUSD, and USDA at critical severity — <strong className="text-[#ef4444]">13 active depegs</strong> across the long-tail market. This breadth is unprecedented. The week's Open USD announcement and Robinhood Chain's USDG launch are launching into a stablecoin market that is simultaneously consolidating at the top and fracturing at the bottom.
        </p>
        <div className="grid md:grid-cols-3 gap-3 my-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Active Depegs</div>
            <div className="text-lg font-mono text-[#ef4444]">13</div>
            <div className="text-[10px] text-[#666]">4 critical · 9 monitored</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">PSI</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">93</div>
            <div className="text-[10px] text-[#666]">BEDROCK · 17th consecutive day</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Total Stablecoin MCap</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">$295B+</div>
            <div className="text-[10px] text-[#666]">USDT $185B · USDC $76B</div>
          </div>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed mt-3">
          Liquidity rebuilding noted in USDf, LISUSD, and CASH. The bifurcation narrative is now the defining stablecoin story: institutional consortiums (Open USD, PYUSD, RLUSD) absorb capital at the top while small-cap algorithmic pegs fail at the bottom. The $295B+ market has never been more concentrated — or more contested.{' '}
          <a href="https://pharos.watch/digest/2026-07-10/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full digest</a>
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Pharos Watch, DeFi Llama</p>
      </div>

      {/* ========================================================
          UPCOMING EVENTS & UNLOCKS
          ======================================================== */}
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
              <p className="text-xs text-[#666]">July 16 · Team ($5.27M) + Investors ($3.43M) · 0.93% supply</p>
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">Robinhood Chain · Institutional Onboarding Begins</p>
              <p className="text-xs text-[#666]">July 10+ · Stock tokens, Earn (~7% APY on USDG via Morpho), Uniswap AMM live</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[#ededed] font-semibold">SEC Crypto Rulemaking · Agenda Item</p>
              <p className="text-xs text-[#666]">July · Robinhood Chain compliance, stablecoin registration in scope</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#444] mt-3 pt-3 border-t border-[#1a1a1a]">
          Total unlocks: <strong className="text-[#ededed]">~$35.7M</strong>. Robinhood Chain's launch is the macro event — the first major broker-to-L2 play.{' '}
          <a href="https://defillama.com/unlocks/calendar" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">DeFi Llama</a>
          {' · '}
          <a href="https://coinmarketcal.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">CoinMarketCal</a>
        </p>
      </div>

      {/* ========================================================
          REGULATION
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          SEC added crypto rulemaking to its July agenda — Robinhood Chain's tokenized equities and Open USD's stablecoin launch are both in the regulatory crosshairs. EU chat control advancing with encrypted messaging in scope. US GENIUS Act still stalled. The stablecoin regulatory race is accelerating: Standard Chartered opened direct USDC minting/redemption for institutions via Circle this week; PayPal moved PYUSD to native issuance on Polygon.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: SEC, EFF, Congressional tracker</p>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Artemis: <a href="https://research.artemis.ai/p/this-week-in-digital-finance-07102026" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">This Week in Digital Finance (07.10.2026)</a>
        {' · '}Sources: DeFi Llama · Glassnode · Rekt News · Pharos Watch · CoinMarketCal · X feed
        {' · '}Compiled by Delta V Intelligence.
      </p>
    </BlogPostLayout>
  );
}
