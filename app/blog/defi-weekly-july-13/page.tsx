'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJuly13() {
  return (
    <BlogPostLayout
      title="DeFi Weekly — July 13, 2026"
      date="July 13, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="6 min read"
      excerpt="BonkDAO governance attack drains $19.3M, USX stablecoin depeg enters week 4 at 57% below peg, WalletBeat ships Stage 2 wallet definitions, Ambire enables self-hosted RPC."
    >
      {/* ── Market Pulse ── */}
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
          <span className="text-[#444]"> — Sources: Artemis, Glassnode, DeFi Llama</span>
        </p>
      </div>

      {/* ── Highlights ── */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">This Week's Highlights</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">BonkDAO Governance Attack — $19.3M Drained</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          The largest hack of the summer hit BonkDAO this week: <strong className="text-[#ededed]">$19.3 million</strong> drained in a pure governance attack. No broken code. No leaked keys. The attacker bought 1% of BONK tokens, buried a treasury transfer inside an innocuous-looking proposal, and passed it with a <strong className="text-[#ededed]">2.9% turnout</strong>. That's the entire exploit — crooked token-weighted voting math. Low governance participation made the attack economically viable, and the proposal sailed through before anyone noticed. This is the DAO equivalent of slipping a line item into a 1,000-page bill at 3 AM.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Rekt News, X feed</p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Ambire Enables Self-Hosted RPC — No More Default Endpoints</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Ambire Wallet shipped a quiet but significant privacy upgrade: users can now set their own <strong className="text-[#ededed]">self-hosted RPC endpoints</strong> instead of being forced through Ambire's default proxy. Settings → Networks → select chain → Edit → drop in your own node URL. This matters because default RPCs are surveillance chokepoints — every transaction preview, every balance query, every dApp interaction routes through a single provider that can log, throttle, or censor. Self-hosted RPC puts the user back in control of their own metadata. Combined with Ambire's existing account abstraction, this makes it one of the most sovereignty-respecting smart wallets on the market.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Ambire Help Center, WalletBeat</p>
      </div>

      {/* ── Rekt Watch ── */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Rekt Watch</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed mb-3">
          A brutal fortnight for DeFi security. Beyond BonkDAO, the hits kept coming:
        </p>
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-xs font-semibold text-[#ededed]">Humanity Protocol — $36.4M</span>
            </div>
            <p className="text-xs text-[#888]">Seven private keys on a single laptop. That's the entire post-mortem. The code was fine — key management was the catastrophe.</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-xs font-semibold text-[#ededed]">Summer Finance — $6.04M</span>
            </div>
            <p className="text-xs text-[#888]">A stale asset still counted in NAV inflated share price, letting an attacker drain real liquidity from the Lazy Summer vault.</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-xs font-semibold text-[#ededed]">Secret Network Bridge — $4.67M</span>
            </div>
            <p className="text-xs text-[#888]">Two missing validation checks in a forked IBC contract let an attacker forge Cosmos chain deposits. Went undetected for 7 days.</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#666]" />
              <span className="text-xs font-semibold text-[#aaa]">Also: SecondFi ($2.4M, Cardano), Aztec Connect ($2.28M, ZK-rollup), Syscoin (5B SYS, whitehat recovered)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#666] mt-3">
          <strong>Pattern:</strong> governance attacks, key management failures, and unchecked bridge logic dominated this cycle. Not a single smart contract exploit in the top 5 — all operational and architectural failures.
          <span className="text-[#444]"> — Sources: Rekt News</span>
        </p>
      </div>

      {/* ── Pharos Watch ── */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Pharos Watch — Stablecoins</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">USX Depeg Enters Week 4 — 5,783 bps Below Peg</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          The USX stablecoin depeg is now the longest-running active break in the ecosystem: <strong className="text-[#ededed]">501+ hours</strong> at <strong className="text-[#ef4444]">57.83% below</strong> its $1 target. On a $20.81M supply, this is a small-cap event with no systemic contagion, but it's testing the limits of what "stable" means for algorithmic-pegged assets. Pharos has tracked this daily (digests #134 through #138), and the pattern is consistent: no recovery mechanism firing, no arbitrage restoring the peg, just slow bleed.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          Meanwhile, <strong className="text-[#ededed]">four pegs broke past 3,000 bps</strong> on July 8 — USX (5,783), pmUSD, and two others — signaling broad stress in the long-tail stablecoin market. <strong className="text-[#ededed]">$1.15B in USDT was burned</strong> during the same period, suggesting large redemptions rather than organic supply contraction. The Pharos Stability Index (PSI) held at 92.2 in BEDROCK regime, but the Bank Run Gauge ticked up.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          On the positive side: <strong className="text-[var(--accent-green)]">BUIDL supply growth</strong> continued, and APXUSD maintained a clean peg. DAI's bands shifted but held within normal parameters. The stablecoin market is bifurcating — blue-chips (USDT, USDC, DAI) absorbing outflows while experimental pegs struggle for relevance.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Pharos Watch (digests #134-138, July 8-12), DeFi Llama</p>
      </div>

      {/* ── WalletBeat ── */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">WalletBeat</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          WalletBeat shipped their July ecosystem update with significant methodology changes:
        </p>
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 mt-2 list-disc pl-4">
          <li><strong className="text-[#ededed]">Wallet Stage Definitions updated:</strong> Stage 0 (Verifiable) → Stage 1 (Operationally Trust-minimized) → Stage 2 (Trust-minimized). This mirrors the L2BEAT staging framework and raises the bar for wallet security ratings.</li>
          <li><strong className="text-[#ededed]">New data for Rainbow, Zerion, Rabby, and Base:</strong> expanded coverage brings the total tracked wallets into double digits. Visual upgrades with Slice Gradients for attribute scoring make it easier to compare at a glance.</li>
          <li><strong className="text-[#ededed]">CROPS at the wallet layer:</strong> WalletBeat is now explicitly rating on Censorship-resistant, Open, Private, Secure principles — the Ethereum values framework applied to the interface layer where users actually touch the chain.</li>
          <li><strong className="text-[#ededed]">Ambire scores well on self-hosted RPC:</strong> the new custom RPC support directly impacts the Privacy score, and WalletBeat captures it in their latest attribute matrix.</li>
        </ul>
        <p className="text-xs text-[#666] mt-3">
          <strong>Why it matters:</strong> Wallet ratings are becoming the new "audit" for consumer crypto. As more users onboard through wallets rather than exchanges, the security properties of the wallet itself become the attack surface. Stage 2 wallets with self-hosted RPC and verifiable builds are the gold standard.
          <span className="text-[#444]"> — Source: WalletBeat (beta.walletbeat.eth.limo)</span>
        </p>
      </div>

      {/* ── Sector Watch ── */}
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
              ['USX', 'Depeg', '501h at 5,783 bps below peg', '#ef4444'],
              ['USDT', 'Contracting', '$1.15B burned in July', 'var(--accent-orange)'],
              ['Wallets', 'Upgrading', 'Stage 2 definitions, self-hosted RPC trend', 'var(--accent-cyan)'],
              ['DAOs', 'Warning', 'BonkDAO attack exposes governance risk', '#ef4444'],
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

      {/* ── Regulation ── */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Regulation</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <p className="text-sm text-[#aaa] leading-relaxed">
          EU chat control proposals continue to advance through parliamentary channels, with the latest draft expanding scope to include end-to-end encrypted messaging. The crypto angle: if message content can be mandated for scanning, on-chain messaging protocols and encrypted wallet communications are next in line. The EFF and decentralized identity advocates are mobilizing, but the regulatory momentum is real. Separately, US stablecoin legislation remains stalled in committee — the summer recess means no movement until September at the earliest.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: EFF, X feed, policy trackers</p>
      </div>

      {/* ── Forward Look ── */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Forward Look</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 list-disc pl-4">
          <li><strong className="text-[#ededed]">Q2 earnings season:</strong> Coinbase, Robinhood, and Strategy all reporting — the equity side of crypto gets its quarterly check-up</li>
          <li><strong className="text-[#ededed]">USX depeg resolution:</strong> entering week 4 with no recovery mechanism in sight — a live case study in algorithmic peg failure</li>
          <li><strong className="text-[#ededed]">DAOs on notice:</strong> after BonkDAO, expect a wave of emergency governance proposals raising quorum thresholds</li>
          <li><strong className="text-[#ededed]">Wallet stage race:</strong> which wallet ships the first verifiable Stage 2 build? Rabby, Ambire, and Rainbow are all in the running</li>
        </ul>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Sources: Artemis · DeFi Llama · Glassnode · Dune · Rekt News · Pharos Watch · WalletBeat · X feed · SEC filings
        {' '}· Compiled by Delta V Intelligence · Published every Saturday.
      </p>
    </BlogPostLayout>
  );
}
