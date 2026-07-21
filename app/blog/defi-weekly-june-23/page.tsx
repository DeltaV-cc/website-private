'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function WeeklyDeFi1() {
  return (
    <BlogPostLayout
      title="Weekly Delta Financial Brief — June 23, 2026"
      date="June 23, 2026"
      category="Web3"
      type="Dashboard"
      readingTime="4 min read"
      excerpt="True DeFi pulse: token unlocks ahead, macro crosscurrents, Liquity v2 traction, WalletBeat milestones, and the cypherpunk layer."
    >
      {/* Market Pulse — condensed */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <h2 className="!text-lg !font-semibold !mt-0 mb-2">Market Pulse</h2>
        <div className="flex items-center justify-between text-sm">
          <span>BTC <span className="text-[#f59e0b]">$62,900</span></span>
          <span className="text-[#444]">|</span>
          <span>ETH <span className="text-[#f59e0b]">~$3,200</span></span>
          <span className="text-[#444]">|</span>
          <span>US-Iran peace talks + Fed hold → risk-off cap</span>
        </div>
        <p className="text-xs text-[#666] mt-2">
          Risk assets round-tripped. Peace talks on the Strait of Hormuz sparked a relief rally (BTC +6.4%, ETH +9.3% midweek), but the Fed&apos;s June 17 hold and Warsh&apos;s tone on rates erased gains. BTC opened Friday at $62,900 (-2.4% on the day). AAVE led DeFi majors at +16% for the week.
          <span className="text-[#444]"> — Sources: Artemis Research, CoinDesk</span>
        </p>
      </div>

      {/* True DeFi section */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">True DeFi</h2>

      {/* Liquity v2 */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
          <h3 className="text-base font-semibold text-[#ededed]">Liquity v2 Traction</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          Liquity v2 continues its steady bootstrapping phase on Ethereum mainnet. With multiple LST/LRT collateral types now active, the protocol&apos;s Stability Pool depth and BOLD liquidity on L2s remain the key metrics to watch. The v2 architecture — isolated LiquityPools, adjustable interest rates via redstone oracles — is proving out in its first real market test since the Fed-driven rate volatility.
          <span className="text-[#444]"> — Sources: Liquity Dune Dashboard, DeFiLlama</span>
        </p>
      </div>

      {/* AAVE +16% */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
          <h3 className="text-base font-semibold text-[#ededed]">AAVE Leads DeFi Majors</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          AAVE topped the DeFi leaderboard at +16% for the week. The catalyst appears to be a combination of growing cross-chain TVL via Aave Cross-Chain (formerly Aave v3) deployments on new networks and continued fee accrual to stkAAVE holders. Aave&apos;s cumulative fees surpassed $1.2B, with the treasury now holding over $500M in diversified assets.
          <span className="text-[#444]"> — Sources: Artemis Terminal, TokenTerminal</span>
        </p>
      </div>

      {/* Token Unlocks */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
          <h3 className="text-base font-semibold text-[#ededed]">Token Unlocks Ahead</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          Notable unlocks this week: <strong className="text-[#ededed]">APT</strong> (~$70M, June 26) continues its monthly linear unlock schedule. <strong className="text-[#ededed]">ARB</strong> (~$55M, June 28) and <strong className="text-[#ededed]">OP</strong> (~$40M) remain persistent supply overhangs. On the newer side, <strong className="text-[#ededed]">ENA</strong> faces its next cliff unlock (~$25M) on June 30, which will test the Ethena stablecoin demand thesis. The aggregate unlock pressure across L2 tokens remains the dominant structural headwind for that sector.
          <span className="text-[#444]"> — Sources: TokenUnlocks, Unlocks.app</span>
        </p>
      </div>

      {/* Strategy / STRC */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
          <h3 className="text-base font-semibold text-[#ededed]">Strategy&apos;s STRC Depeg</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          STRategy&apos;s STRC preferred is trading 18% below its $100 par value, breaking for the first time since issuance. The company sold 32 BTC (~$2.5M) to fund its distribution — its first BTC sale since 2022 — spooking the market. The depeg blocks Strategy&apos;s preferred-equity funding channel: STRC ATM is uneconomic below par, forcing the firm to fund BTC buys via common-stock ATM instead ($209M last week for 1,587 BTC). STRC now shifts to twice-monthly payments, and a dividend hike to at least 11.75% is expected at the June 30 reset.
          <span className="text-[#444]"> — Sources: Artemis Research, MSTR Tracker</span>
        </p>
      </div>

      {/* Macro & Regulations */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Macro & Regs</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa]">
          <strong className="text-[#ededed]">Fed holds, cuts off the table.</strong> New Chair Kevin Warsh left rates unchanged June 17, signaling rate cuts are off for 2026. The dollar strengthened, capping crypto, gold, and silver. The post-Fed tone is the dominant macro variable for H2 — stablecoin yields become relatively more attractive in a higher-for-longer regime. <span className="text-[#444]">— Source: Fed transcript, Reuters</span>
        </p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa]">
          <strong className="text-[#ededed]">Fed Governor Waller on Stablecoins.</strong> The most important regulatory signal of the week: Fed Governor Christopher Waller publicly stated that stablecoins &ldquo;may create a new channel linking global liquidity demand directly to US Treasury Markets.&rdquo; This is the first explicit Fed acknowledgment that dollar-backed stablecoins are becoming structural demand for US government debt. Tether ($141B T-bills, 17th largest holder) and Circle ($67B) are now systemically important to short-term debt markets. <span className="text-[#444]">— Source: Fed.gov, LlamaAI</span>
        </p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa]">
          <strong className="text-[#ededed]">Canton raises $355M.</strong> Digital Asset&apos;s Canton Network — an institutional L1 with configurable privacy — raised $355M led by a16z, with participation from Apollo, BNP Paribas, Citadel, CME, Coinbase Ventures, HSBC, and 20+ other institutions. The raise signals that institutional blockchain infrastructure is attracting serious capital, even as TD analyst Lance Vitanza dismisses it as &ldquo;a glorified database in the cloud.&rdquo; <span className="text-[#444]">— Source: Artemis Research, CoinDesk</span>
        </p>
      </div>

      {/* OpSec & Cypherpunk */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">OpSec & Cypherpunk</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
          <h3 className="text-base font-semibold text-[#ededed]">WalletBeat — Security Staging</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          WalletBeat (beta.walletbeat.eth.limo) continues refining its staged security ratings for EVM wallets. The open-source project (MIT, 114⭐) received funding from the Giveth Ethereum Security QF Round this week — the same round we covered. Its CROPS framework (Censorship-Resistant, Open, Private, Secure) is becoming the reference standard for wallet security comparison. Key development: the interactive wallet test playground now supports EIP-7702 and ERC-4337 testing, catching up to the latest account abstraction standards. <span className="text-[#444]">— Source: WalletBeat GitHub, WalletBeat.eth</span>
        </p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
          <h3 className="text-base font-semibold text-[#ededed]">Ethereum Security QF Round Wraps</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          638+ ETH distributed to 134 projects — the largest QF matching pool in history. Backed by @thedaofund on Giveth. The round confirms the ecosystem will fund security infrastructure at scale. Governance security (AntiCapture), protocol centralization risk (DeFiScan), and L2 maturity (L2Beat) were among the most-funded categories. <span className="text-[#444]">— Source: Giveth (@Giveth)</span>
        </p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
          <h3 className="text-base font-semibold text-[#ededed]">EF Reorganization Continues</h3>
        </div>
        <p className="text-sm text-[#aaa]">
          The Ethereum Foundation lost co-executive director Hsiao-Wei Wang, following co-executive director Tomasz Stanczak&apos;s earlier exit. Leadership churn at the EF bears watching — it affects research prioritization, grant flows, and the org&apos;s ability to coordinate on Pectra and beyond. <span className="text-[#444]">— Source: CoinDesk</span>
        </p>
      </div>

      {/* CeFi acknowledgement */}
      <div className="border border-[#333] rounded-xl p-4 my-6 bg-[#0d0d0d]">
        <p className="text-xs text-[#555]">
          <strong className="text-[#888]">CeFi / Exchanges (for context):</strong> Hyperliquid processed ~$234B in perpetual volume over the past month. TradeXYZ dominates HIP-3 pre-IPO perps at 97% market share. SpaceX IPO (SPCX) peaked at $202.89 vs $135 IPO price. NYSE chief Jeff Sprecher called Hyperliquid &ldquo;bigger than NASDAQ.&rdquo; HOOD +17.3% for the week. <span className="text-[#444]">— Sources: Artemis, CoinDesk</span>
        </p>
      </div>

      {/* Sources appendix */}
      <div className="border-t border-[#222] pt-6 mt-8">
        <h3 className="text-sm font-semibold text-[#666] mb-3">Sources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555]">
          <div>• Artemis Research (artemis.xyz)</div>
          <div>• DeFiLlama / LlamaAI</div>
          <div>• TokenTerminal</div>
          <div>• TokenUnlocks.app</div>
          <div>• Liquity Dune Dashboard</div>
          <div>• WalletBeat (walletbeat.eth.limo)</div>
          <div>• DeFiScan (defiscan.info)</div>
          <div>• AntiCapture (anticapture.com)</div>
          <div>• L2Beat (l2beat.com)</div>
          <div>• Fed.gov / St. Louis Fed</div>
          <div>• CoinDesk / The Block</div>
          <div>• Giveth (@Giveth)</div>
        </div>
      </div>
    </BlogPostLayout>
  );
}
