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
          MARKET PULSE — Artemis skeleton
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
          Last edition we covered the June 25th massacre: Bitcoin below $60,000 for the first time since 2024, spot ETFs bleeding for a 6th consecutive week ($7.2B in aggregate outflows), Strategy (MSTR) treasury approximately $13.3B underwater, and AAVE ripping +30.18% as the lone bright spot. The full breakdown — including the weekly returns table — is in our{' '}
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
          HIGHLIGHTS — Artemis skeleton
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">This Week's Highlights</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">BonkDAO Governance Attack — $19.3M Drained</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          The largest hack of the summer: <strong className="text-[#ededed]">$19.3 million</strong> drained in a pure governance attack. No broken code. No leaked keys. The attacker bought 1% of BONK, buried a treasury transfer inside an innocuous proposal, and passed it with a 2.9% turnout on Solana's Realms platform. The DAO equivalent of slipping a line item into a 1,000-page bill at 3 AM with no timelock. This isn't a smart contract vulnerability — it's a systemic governance failure that applies to every token-weighted DAO with low participation. Expect emergency quorum raises across major DAOs this week.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Rekt News, X feed, on-chain data</p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Ambire Enables Self-Hosted RPC — A Quiet Privacy Win</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Ambire Wallet shipped a significant privacy upgrade: users can now set their own <strong className="text-[#ededed]">self-hosted RPC endpoints</strong> instead of being forced through Ambire's default proxy. Settings → Networks → select chain → Edit → drop in your own node URL. Default RPCs are surveillance chokepoints — every transaction preview, balance query, and dApp interaction routes through a single provider that can log, throttle, or censor. Self-hosted RPC breaks that chain. Combined with Ambire's existing account abstraction, this pushes it into the top tier of sovereignty-respecting smart wallets.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Ambire Help Center, WalletBeat</p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
          <h3 className="text-base font-semibold text-[#ededed]">WalletBeat Ships Stage 2 Definitions</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          WalletBeat's July update introduces a three-stage framework modeled on L2BEAT: Stage 0 (Verifiable), Stage 1 (Operationally Trust-minimized), Stage 2 (Trust-minimized). Built on CROPS principles — Censorship-resistant, Open, Private, Secure. Currently no wallet achieves Stage 2, with Ambire, Rabby, and Rainbow leading in Stage 1 territory. New data added for Rainbow, Zerion, and Base. Visual upgrades with Slice Gradients for attribute scoring.
        </p>
        <p className="text-xs text-[#444] mt-3">Source: WalletBeat (beta.walletbeat.eth.limo)</p>
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTOR WATCH — Artemis skeleton
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
              ['USX', 'Depeg', '525h at 5,783 bps below $1', '#ef4444'],
              ['pmUSD/apxUSD/USDA', 'Depeg', '3 more stablecoins at critical severity', '#ef4444'],
              ['USDT', 'Contracting', '$1.15B burned in July, yield anomalies', 'var(--accent-orange)'],
              ['BUIDL', 'Growing', 'BlackRock tokenized treasury expanding', 'var(--accent-green)'],
              ['Wallets', 'Upgrading', 'Stage 2 definitions, self-hosted RPC', 'var(--accent-cyan)'],
              ['DAOs', 'Warning', 'BonkDAO governance attack systemic risk', '#ef4444'],
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
          FORWARD LOOK — Artemis skeleton
          ════════════════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Forward Look</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-2 list-disc pl-4">
          <li><strong className="text-[#ededed]">Q2 earnings season:</strong> Coinbase, Robinhood, and Strategy all reporting this month — the equity side of crypto gets its quarterly check-up. Watch for exchange volumes, custody AUM, and impairment charges on BTC treasuries.</li>
          <li><strong className="text-[#ededed]">Stablecoin stress:</strong> four simultaneous deep depegs is unprecedented. If this becomes the new normal for small-cap algorithmic stablecoins, expect a wave of liquidations in DeFi pools that use them as collateral.</li>
          <li><strong className="text-[#ededed]">DAOs on notice:</strong> after BonkDAO, expect emergency governance proposals raising quorum thresholds. Maker, Aave, and Uniswap governance participation under scrutiny.</li>
          <li><strong className="text-[#ededed]">Wallet stage race:</strong> which wallet ships the first verifiable Stage 2 build? Rabby's hardware signing, Ambire's self-hosted RPC, Rainbow's open-source verification all in contention. WalletBeat's August update will be the scorecard.</li>
          <li><strong className="text-[#ededed]">Artemis newsletter:</strong> No new edition during US holidays. When Jon Ma returns, expect a catch-up edition. We'll cover it.</li>
        </ul>
      </div>

      {/* ════════════════════════════════════════════════════════
          DELTA V INPUTS — new sections
          ════════════════════════════════════════════════════════ */}

      {/* REKT WATCH */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Rekt Watch — Hacks & Exploits</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed mb-4">
          A brutal fortnight for DeFi security. <strong className="text-[#ededed]">Zero smart contract exploits in the top incidents.</strong> Every major hack this cycle: governance failures, key management disasters, or unchecked bridge logic.
        </p>
        <div className="space-y-4">
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">BonkDAO — $19.3M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Governance</span>
              <span className="text-[10px] text-[#666]">July 6</span>
            </div>
            <p className="text-xs text-[#888]">$4.4M to buy 1% BONK, proposal with no timelock, 2.9% turnout on Solana Realms. Treasury drained.{' '}
              <a href="https://rekt.news/bonkdao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Humanity Protocol — $36.4M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Key Leak</span>
            </div>
            <p className="text-xs text-[#888]">Seven private keys on one laptop across ETH and BSC. Largest single loss of the cycle.</p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Summer Finance — $6.04M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">NAV Manipulation</span>
              <span className="text-[10px] text-[#666]">July 6</span>
            </div>
            <p className="text-xs text-[#888]">Root cause: October 2025 incomplete offboarding left stale Silo Ark position priced into vaults for 8 months.{' '}
              <a href="https://rekt.news/summer-finance-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
          </div>
          <div className="border-l-2 border-[#ef4444] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Secret Network Bridge — $4.67M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444]">Bridge</span>
            </div>
            <p className="text-xs text-[#888]">Two missing validation checks in forked IBC contract. Fake Cosmos chain forged deposits. 7 days undetected.</p>
          </div>
          <div className="border-l-2 border-[var(--accent-orange)] pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ededed]">Altura — $39M Raised, Vault Closed</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]">Investigation</span>
            </div>
            <p className="text-xs text-[#888]">Gold-backed RWA yield protocol. Funds traced through Tron wallets tied to Kraken. Self-linked verifier. Dashboard admitted it verified nothing.</p>
          </div>
          <div className="border-l-2 border-[#666] pl-4">
            <span className="text-xs font-semibold text-[#aaa]">Also: </span>
            <span className="text-xs text-[#888]">SecondFi ($2.4M, Cardano) · Aztec Connect ($2.28M, ZK-rollup) · Syscoin (whitehat recovered)</span>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] border border-[#222]">
          <p className="text-xs text-[#aaa]">
            <strong className="text-[#ededed]">The meta:</strong> governance attacks and key management failures are the dominant exploit vector. DAOs need quorum minimums and mandatory timelocks. Teams need hardware-enforced key policies. Bridges need formal verification. The attackers have moved up the stack.
          </p>
        </div>
        <p className="text-xs text-[#444] mt-3">Source: Rekt News</p>
      </div>

      {/* PHAROS WATCH */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">Four Simultaneous Deep Depegs — USX No Longer Alone</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Today's Pharos digest (#139, July 13): USX at 525 hours, 5,783 bps below peg, $20.8M float — now joined by <strong className="text-[#ef4444]">pmUSD, apxUSD, and USDA at critical severity</strong>. Four simultaneous deep depegs in the long-tail stablecoin market is unprecedented breadth.
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
          PSI rose to 93.4 despite four depegs — stressed assets are all small-cap (&lt;$50M combined), while the $337B total mcap is dominated by structurally sound USDT/USDC. <strong className="text-[#ededed]">YLDS liquidity depth collapsed</strong> (digest #139), marking stress in yield-bearing stablecoins. On the positive side: BUIDL supply growing, DAI bands stable.{' '}
          <a href="https://pharos.watch/digest/2026-07-13/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full digest</a>
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Pharos Watch (digests #138–#139), DeFi Llama</p>
      </div>

      {/* WALLETBEAT */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">WalletBeat</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 list-disc pl-4">
          <li><strong className="text-[#ededed]">Stage 0→1→2 framework</strong> modeled on L2BEAT. No wallet reaches Stage 2 yet.</li>
          <li><strong className="text-[#ededed]">New data:</strong> Rainbow, Zerion, Rabby, Base added. Slice Gradients for attribute scoring.</li>
          <li><strong className="text-[#ededed]">CROPS at wallet layer:</strong> Censorship-resistant, Open, Private, Secure ratings applied to the interface where users touch the chain.</li>
          <li><strong className="text-[#ededed]">Ambire scores well:</strong> self-hosted RPC support directly boosts the Privacy score.</li>
        </ul>
        <p className="text-xs text-[#444] mt-3">Source: WalletBeat (beta.walletbeat.eth.limo)</p>
      </div>

      {/* REGULATION */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          EU chat control proposals advancing — latest draft expands to end-to-end encrypted messaging. On-chain messaging protocols and encrypted wallet comms next in line. US stablecoin legislation (GENIUS Act) stalled in committee until September at earliest. Stablecoin issuers in regulatory purgatory.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: EFF, X feed, Congressional tracker</p>
      </div>

      {/* ── Sources ── */}
      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Sources: Artemis · DeFi Llama · Glassnode · Dune · Rekt News · Pharos Watch · WalletBeat · X feed · SEC filings
        {' '}· Compiled by Delta V Intelligence · Published every Saturday.
      </p>
    </BlogPostLayout>
  );
}
