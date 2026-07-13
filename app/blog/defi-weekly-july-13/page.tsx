'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJuly13() {
  return (
    <BlogPostLayout
      title="DeFi Weekly — July 13, 2026"
      date="July 13, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="8 min read"
      excerpt="BonkDAO governance attack drains $19.3M, USX stablecoin depeg enters week 4 at 57% below peg, WalletBeat ships Stage 2 wallet definitions, Ambire enables self-hosted RPC."
    >
      {/* ════════════════════════════════════════════════════════
          MARKET PULSE — from Artemis Big Fundamentals skeleton
          ════════════════════════════════════════════════════════ */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-2">Market Pulse</div>
        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
          <span>BTC <span className="text-[#f59e0b]">~$64,000</span></span>
          <span className="text-[#444]">|</span>
          <span>ETH <span className="text-[#f59e0b]">~$2,100</span></span>
          <span className="text-[#444]">|</span>
          <span>MCap <span className="text-[var(--accent-green)]">$2.25T</span></span>
          <span className="text-[#444]">|</span>
          <span>BTC.D <span>56.1%</span></span>
        </div>
        <p className="text-xs text-[#666] mt-2">
          Crypto markets stabilized after the June selloff. BTC recovered from the sub-$60K lows of late June and is now trading around $64,000. ETH has reclaimed the $2,000 level. Total market cap sits at $2.25T, down 1.3% on the day but well above the late-June trough. BTC dominance at 56.1% signals continued risk-off positioning — capital rotating out of alts into the safety of bitcoin. The macro backdrop is quiet: Fed on hold, US-Iran tensions cooled, and the market is in wait-and-see mode ahead of Q2 earnings season.
        </p>
        <p className="text-xs text-[#666] mt-2">
          Last edition we covered the June 25th massacre: Bitcoin below $60,000 for the first time since 2024, spot ETFs bleeding for a 6th consecutive week ($7.2B in aggregate outflows), Strategy (MSTR) treasury approximately $13.3B underwater, and AAVE ripping +30.18% as the lone bright spot. The full breakdown — including the weekly returns table with SKY -14.06%, HOOD -8.75%, COIN -8.70%, NVDA -8.62% — is in our{' '}
          <a href="/blog/defi-weekly-june-27/" className="text-[var(--accent-gold)] hover:underline">June 27 edition</a>.
        </p>
        <div className="mt-4 rounded-xl overflow-hidden border border-[#222]">
          <img 
            src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/c5b66f4a-40e6-4a95-8049-23bbf1b5e560_1920x1080.png"
            alt="Market overview — Artemis Big Fundamentals weekly returns"
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="px-3 py-2 bg-[#0a0a0a] text-[10px] text-[#666]">Source: Artemis Big Fundamentals — Weekly returns, week ending June 27</div>
        </div>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis, Glassnode, DeFi Llama, CoinGecko</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          HIGHLIGHTS — top 3 stories this week
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">This Week's Highlights</h2>

      {/* Story 1: BonkDAO */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">BonkDAO Governance Attack — $19.3M Drained</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          The largest hack of the summer hit BonkDAO this week: <strong className="text-[#ededed]">$19.3 million</strong> drained in a pure governance attack. No broken code. No leaked keys. No oracle manipulation. The attacker bought 1% of BONK tokens, wrote a treasury transfer buried inside an innocuous-looking proposal titled something like "Ecosystem Growth Fund — Q3 Allocation," and passed it with a <strong className="text-[#ededed]">2.9% turnout</strong>. That's it — crooked token-weighted voting math at its most brutal.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          The mechanics are worth understanding: BONK's governance requires a simple majority of tokens voting. At a $1.9B fully diluted market cap, 1% costs roughly $19M — exactly what the attacker extracted. In a functioning democracy, you'd need 51% participation for legitimacy. In token-weighted DAO governance, 2.9% of holders voting passed a proposal that drained the treasury. The attacker's cost basis was recovered in a single transaction.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          This isn't a smart contract vulnerability. It's a <strong className="text-[#ededed]">systemic governance failure</strong> that applies to every token-weighted DAO with low participation. The lesson isn't "audit your contracts" — it's "raise your quorum or get rekt." Expect a wave of emergency governance proposals across major DAOs this week raising minimum quorum thresholds from single digits to 10-20%.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Rekt News, X feed, on-chain data</p>
      </div>

      {/* Story 2: Ambire self-hosted RPC */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Ambire Enables Self-Hosted RPC — A Quiet Privacy Win</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Ambire Wallet shipped a quiet but significant privacy upgrade: users can now set their own <strong className="text-[#ededed]">self-hosted RPC endpoints</strong> instead of being forced through Ambire's default proxy. Settings → Networks → select chain → Edit → drop in your own node URL. No more routing every transaction preview, balance query, and dApp interaction through a single centralized provider.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          This matters because default RPCs are <strong className="text-[#ededed]">surveillance chokepoints</strong>. Every call you make — token balances, gas estimates, transaction simulation — goes through an endpoint that can log your IP, your wallet address, your entire browsing pattern. It's the equivalent of your ISP seeing every website you visit, except it's your wallet provider seeing every contract you interact with. Self-hosted RPC breaks that chain.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          Combined with Ambire's existing account abstraction (email-based recovery, gas payment in any token, batched transactions), this pushes Ambire into the top tier of sovereignty-respecting smart wallets. WalletBeat already reflects this in their latest attribute matrix — the privacy score jumps significantly when users can supply their own infrastructure.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Ambire Help Center, WalletBeat</p>
      </div>

      {/* Story 3: WalletBeat Stage 2 */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
          <h3 className="text-base font-semibold text-[#ededed]">WalletBeat Ships Stage 2 Definitions — A New Standard for Wallet Security</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          WalletBeat's July ecosystem update introduces a three-stage framework modeled on L2BEAT's rollup staging system: <strong className="text-[#ededed]">Stage 0 (Verifiable)</strong> — wallet publishes build info and can be independently verified → <strong className="text-[#ededed]">Stage 1 (Operationally Trust-minimized)</strong> — key operations require user consent with escape hatches → <strong className="text-[#ededed]">Stage 2 (Trust-minimized)</strong> — no single party can unilaterally alter wallet behavior or access funds.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          This is the rating framework the wallet space has been missing. Currently no wallet achieves Stage 2 — the highest-rated wallets (Ambire, Rabby, Rainbow) sit in Stage 1 territory with specific features pushing toward Stage 2 criteria. The framework is explicitly built on <strong className="text-[#ededed]">CROPS principles</strong> — Censorship-resistant, Open, Private, Secure — applying Ethereum's core values at the interface layer where users actually touch the chain.
        </p>
        <p className="text-xs text-[#444] mt-3">Source: WalletBeat (beta.walletbeat.eth.limo), July 2026 update</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          REKT WATCH
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Rekt Watch — Hacks & Exploits</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed mb-4">
          A brutal fortnight for DeFi security. The pattern is striking: <strong className="text-[#ededed]">zero smart contract exploits in the top incidents</strong>. Every major hack this cycle came from governance failures, key management disasters, or unchecked bridge logic — operational and architectural failures, not code bugs.
        </p>

        <div className="space-y-4">
          {/* Hack 1: BonkDAO */}
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">BonkDAO — $19.3M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Governance Attack</span>
              <span className="text-[10px] text-[#666]">July 6 · Reported July 10</span>
            </div>
            <p className="text-xs text-[#888]">
              Pure token-weighted voting exploit on Solana's Realms platform. Attacker spent <strong className="text-[#aaa]">$4.4M to buy 1% of BONK</strong>, buried a treasury transfer in a proposal with no timelock, and passed it with <strong className="text-[#aaa]">2.9% turnout</strong>. No code broke. No keys leaked. Just crooked governance math — the DAO equivalent of slipping a line item into a 1,000-page bill at 3 AM. Full Rekt post-mortem:{' '}
              <a href="https://rekt.news/bonkdao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">rekt.news/bonkdao-rekt</a>
            </p>
          </div>

          {/* Hack 2: Humanity Protocol */}
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Humanity Protocol — $36.4M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Key Leak</span>
            </div>
            <p className="text-xs text-[#888]">Seven private keys on a single laptop. Across ETH and BSC. The device owner was publicly named — rare for a DeFi hack. The largest single loss of the cycle, and the simplest post-mortem.</p>
          </div>

          {/* Hack 3: Summer Finance */}
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Summer Finance — $6.04M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">NAV Manipulation</span>
              <span className="text-[10px] text-[#666]">July 6 · Reported July 9</span>
            </div>
            <p className="text-xs text-[#888]">
              Root cause traced back to <strong className="text-[#aaa]">October 2025</strong>: an incomplete offboarding left a capped-for-removal Silo Ark position priced into vaults for eight months. Attacker flash-loaned, donated the stale asset to inflate NAV, and redeemed real liquidity. The bug wasn't in the code — it was in the operational process. Full Rekt post-mortem:{' '}
              <a href="https://rekt.news/summer-finance-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">rekt.news/summer-finance-rekt</a>
            </p>
          </div>

          {/* Hack 4: Secret Network Bridge */}
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Secret Network Bridge — $4.67M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Bridge Exploit</span>
            </div>
            <p className="text-xs text-[#888]">Two missing validation checks in a forked IBC contract. Attacker forged deposits from a fake Cosmos chain and minted unbacked tokens. Drain went undetected for 7 days.</p>
          </div>

          {/* Altura — Digging for Gold */}
          <div className="border-l-2 border-[var(--accent-orange)] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Altura — $39M Raised, Vault Closed</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]">Investigation</span>
              <span className="text-[10px] text-[#666]">July 2</span>
            </div>
            <p className="text-xs text-[#888]">
              Multi-strategy yield protocol raised $39M for gold-backed RWA strategy. Rekt's investigation traced funds through <strong className="text-[#aaa]">Tron wallets tied to Kraken</strong>, revealed a verifier tied to the COO's own project, and a dashboard that admitted it verified nothing. Vault closed, depositors waiting. Not a hack — but the operational red flags are the same pattern.
            </p>
          </div>

          {/* Smaller ones */}
          <div className="border-l-2 border-[#666] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#aaa]">Also This Fortnight</span>
            </div>
            <p className="text-xs text-[#888]">
              SecondFi ($2.4M, Cardano — one missing secret in signing code exposed keys for 374 wallets){' · '}
              Aztec Connect ($2.28M, deprecated ZK-rollup — broken root-binding check in verifier){' · '}
              Syscoin (5B SYS minted via malformed SPV proof — whitehat recovered)
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">The meta:</strong> governance attacks and key management failures are now the dominant exploit vector. 
            If you're still only auditing smart contracts, you're protecting against last cycle's threats. 
            DAOs need quorum minimums and mandatory timelocks. Teams need hardware-enforced key policies. Bridges need formal verification of cross-chain message integrity. 
            The attackers have moved up the stack — defenses need to follow.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Source: Rekt News (rekt.news)</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          PHAROS WATCH — Stablecoins
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoin Risk</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">USX Isn't Alone Anymore — Four Simultaneous Deep Depegs</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Today's Pharos digest (#139, July 13) delivers the week's biggest stablecoin signal: <strong className="text-[#ededed]">USX is no longer the only deep depeg</strong>. After 525 hours at 5,783 bps below peg ($20.8M float), USX has been joined by <strong className="text-[#ef4444]">pmUSD, apxUSD, and USDA at critical severity levels</strong> — four simultaneous breaks in the long-tail stablecoin market. This is unprecedented breadth for algorithmic/undercollateralized pegs.
        </p>

        <div className="grid md:grid-cols-3 gap-3 my-4">
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">USX Depeg</div>
            <div className="text-lg font-mono text-[#ef4444]">-57.83%</div>
            <div className="text-[10px] text-[#666]">525h · $20.8M · 5,783 bps</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">Active Deep Depegs</div>
            <div className="text-lg font-mono text-[#ef4444]">4</div>
            <div className="text-[10px] text-[#666]">USX · pmUSD · apxUSD · USDA</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#222]">
            <div className="text-[10px] text-[#666] uppercase tracking-[1px]">PSI Index</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">93.4</div>
            <div className="text-[10px] text-[#666]">BEDROCK · 20th consecutive day</div>
          </div>
        </div>

        <p className="text-sm text-[#aaa] leading-relaxed mt-3">
          The Pharos Stability Index (PSI) actually <strong className="text-[var(--accent-green)]">rose to 93.4</strong> this week — marking the 20th consecutive day in BEDROCK territory. This seems counterintuitive with four active depegs, but it reflects the broader market reality: the stressed assets are all small-cap (&lt;$50M combined float), while the $337B total stablecoin market cap is dominated by USDT and USDC, which remain structurally sound. The PSI measures systemic risk, not individual asset stress.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          <strong className="text-[#ededed]">$1.15B in USDT was burned</strong> in the first half of July — large redemptions, not organic supply contraction. USDT and USDC were flagged for yield anomalies on their combined $257B float (digest #138). <strong className="text-[#ededed]">YLDS liquidity depth collapsed</strong> (digest #139), marking another stress signal in the yield-bearing stablecoin segment.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          On the positive side: <strong className="text-[var(--accent-green)]">BUIDL supply continues growing</strong> (BlackRock's tokenized treasury fund), APXUSD briefly depegged to 3,159 bps but recovered, and DAI's bands shifted but held within normal parameters. The stablecoin market is bifurcating at speed — institutional-grade assets absorbing outflows while experimental pegs enter structural failure.
        </p>
        <p className="text-xs text-[#444] mt-3">
          Sources: Pharos Watch (digests #138–#139, July 12–13), DeFi Llama ·{' '}
          <a href="https://pharos.watch/digest/2026-07-13/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full July 13 digest</a>
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTOR WATCH
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Sector Watch</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#222] text-[#666] text-xs uppercase tracking-[1px]">
              <th className="text-left py-2 px-3">Asset / Sector</th>
              <th className="text-right py-2 px-3">Signal</th>
              <th className="text-left py-2 px-3 hidden md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['BTC', 'Recovering', 'Back above $64K from sub-$60K lows', 'var(--accent-green)'],
              ['ETH', 'Recovering', 'Reclaimed $2K, L2 activity growing', 'var(--accent-green)'],
              ['AAVE', 'Strong', 'V4 deposits >$200M, SC target $3,500', 'var(--accent-green)'],
              ['USX', 'Depeg', '501h at 5,783 bps below $1 peg', '#ef4444'],
              ['USDT', 'Contracting', '$1.15B burned in first half of July', 'var(--accent-orange)'],
              ['BUIDL', 'Growing', 'BlackRock tokenized treasury fund expanding', 'var(--accent-green)'],
              ['Wallets', 'Upgrading', 'Stage 2 definitions, self-hosted RPC trend', 'var(--accent-cyan)'],
              ['DAOs', 'Warning', 'BonkDAO governance attack exposes systemic risk', '#ef4444'],
              ['Bridges', 'Warning', 'Secret Network + Aztec bridge exploits ongoing', '#ef4444'],
            ].map(([name, signal, note, color], i) => (
              <tr key={i} className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors">
                <td className="py-2.5 px-3"><span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{background: color}} /><span className="text-[#ededed]">{name}</span></span></td>
                <td className={`py-2.5 px-3 text-right text-xs font-medium ${signal === 'Depeg' || signal === 'Warning' || signal === 'Contracting' ? 'text-[#ef4444]' : 'text-[var(--accent-green)]'}`}>{signal}</td>
                <td className="py-2.5 px-3 text-xs text-[#666] hidden md:table-cell">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════════════════
          REGULATION
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation & Policy</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          EU chat control proposals continue advancing through parliamentary channels, with the latest draft expanding scope to include end-to-end encrypted messaging. The crypto angle: if message content can be mandated for scanning by platform providers, on-chain messaging protocols (XMTP, Push Protocol, WalletConnect chat) and encrypted wallet communications become next in the queue. The EFF and decentralized identity advocates are mobilizing, but the regulatory momentum in Brussels is real and accelerating.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          US stablecoin legislation remains stalled in committee — the summer Congressional recess means no movement until September at the earliest. The GENIUS Act (Guiding and Establishing National Innovation for US Stablecoins) passed the Senate Banking Committee in March but has been sitting in limbo as the House debates competing frameworks. Market impact: stablecoin issuers are in regulatory purgatory, unable to commit to major product decisions until the legislative path clarifies.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: EFF, X feed, Congressional tracker</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          FORWARD LOOK
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Forward Look</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-2 list-disc pl-4">
          <li><strong className="text-[#ededed]">Q2 earnings season:</strong> Coinbase, Robinhood, and Strategy all reporting this month — the equity side of crypto gets its quarterly check-up. Watch for exchange volumes, custody AUM, and any impairment charges on BTC treasuries.</li>
          <li><strong className="text-[#ededed]">USX depeg resolution:</strong> entering week 4 with no recovery mechanism in sight. If this is the new normal for small-cap algorithmic stablecoins, expect a wave of liquidations in DeFi pools that use USX as collateral.</li>
          <li><strong className="text-[#ededed]">DAOs on notice:</strong> after BonkDAO, expect emergency governance proposals raising quorum thresholds across major DAOs. Maker, Aave, and Uniswap governance participation will be scrutinized.</li>
          <li><strong className="text-[#ededed]">Wallet stage race:</strong> which wallet ships the first verifiable Stage 2 build? Rabby's hardware signing + Ambire's self-hosted RPC + Rainbow's open-source verification put all three in contention. WalletBeat's August update will be the scorecard.</li>
          <li><strong className="text-[#ededed]">Artemis newsletter:</strong> No edition published during US holidays. When Jon Ma returns, expect a catch-up edition covering the full July macro picture. We'll cover it here.</li>
        </ul>
      </div>

      {/* ════════════════════════════════════════════════════════
          SOURCES
          ════════════════════════════════════════════════════════ */}
      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Sources: Artemis · DeFi Llama · Glassnode · Dune · Rekt News · Pharos Watch · WalletBeat · X feed · SEC filings
        {' '}· Compiled by Delta V Intelligence · Published every Saturday.
      </p>
    </BlogPostLayout>
  );
}
