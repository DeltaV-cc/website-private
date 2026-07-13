'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJune27() {
  return (
    <BlogPostLayout
      title="DeFi Weekly — June 27, 2026"
      date="June 27, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="7 min read"
      excerpt="BTC below $60K for first time since 2024, spot ETFs bleed 6th straight week ($7.2B out), MSTR treasury $13.3B underwater, Robinhood raises $2.2B convertible — AAVE +30% stands alone."
    >
      {/* ════════════════════════════════════════════
          MARKET PULSE — Full Artemis Market Overview
          ════════════════════════════════════════════ */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-2">Market Pulse</div>
        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
          <span>BTC <span className="text-[#ef4444]">~$59,300</span></span>
          <span className="text-[#444]">|</span>
          <span>ETH <span className="text-[#ef4444]">~$1,550</span></span>
          <span className="text-[#444]">|</span>
          <span>ETF bleed wk 6</span>
          <span className="text-[#444]">|</span>
          <span>AAVE <span className="text-[var(--accent-green)]">+30.2%</span></span>
        </div>
        <p className="text-xs text-[#666] mt-2">
          Risk assets sold off hard this week. The mid-June bounce on US-Iran de-escalation had already faded. Bitcoin slid below $60,000 on Thursday, June 25, for the first time since 2024, opening near $60,983 and trading down to roughly $59,300 intraday. Ethereum fell in step from about $1,620 toward the mid-$1,500s. The selling was mechanical as much as macro: spot bitcoin ETFs bled for 6 consecutive weeks.
        </p>
        <p className="text-xs text-[#666] mt-2">
          The lone exception was DeFi: AAVE ripped higher on a fresh Standard Chartered initiation with a $3,500 by 2030 target, Aave V4 traction with deposits past $200 million, and USDT deposits flowing back into the protocol, even as the rest of the screen turned red.
        </p>

        {/* Full returns image from Artemis */}
        <div className="mt-4 rounded-xl overflow-hidden border border-[#222]">
          <img 
            src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/c5b66f4a-40e6-4a95-8049-23bbf1b5e560_1920x1080.png"
            alt="Weekly returns overview — Artemis Big Fundamentals"
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="px-3 py-2 bg-[#0a0a0a] text-[10px] text-[#666]">Source: Artemis Big Fundamentals — Weekly returns, week ending June 27</div>
        </div>

        <p className="text-xs text-[#666] mt-3">
          DeFi stood alone: <strong className="text-[#ededed]">AAVE (+30.18%)</strong> and <strong className="text-[#ededed]">SOL (+3.49%)</strong> were the only names in the green, while SKY (-14.06%), HOOD (-8.75%) and COIN (-8.70%) lagged, with NVDA (-8.62%) and CRCL (-8.30%) close behind. Unlike last week, AI and semis offered no cover (NVDA -8.62%, QQQ -4.60%) and gold slipped (GLD -3.48%); only the Dow (DIA +0.43%) and Micron (MU -0.15%) finished near flat. The basket averaged -3.10% on the week, median -3.64%.
          <span className="text-[#444]"> — Sources: Artemis Big Fundamentals, Artemis Charts</span>
        </p>
      </div>

      {/* ════════════════════════════════════════════
          THREE HIGHLIGHTS — Today We Highlight
          ════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">This Week's Highlights</h2>

      {/* 1. Bitcoin breaks $60K — ETF bleed */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">Bitcoin Breaks $60K — Spot ETFs Bleed for 6th Straight Week</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          The headline number is simple: bitcoin traded below $60,000 on Thursday, June 25, for the first time since 2024. Opening near $60,983, it touched roughly $59,300 intraday. Ethereum followed in step from about $1,620 toward the mid-$1,500s.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          The flows tell the deeper story. US crypto ETF flows have flipped from bid to bleed. Net outflows ran a sixth straight week, with roughly $227 million out in the latest week, and the damage runs deeper than the weekly tape: back-to-back record outflow streaks in May and June pulled an estimated <strong className="text-[#ededed]">$7.2 billion</strong> out, IBIT alone shedding about $3.3 billion, and tipped 2026 flows negative on the year for the first time. The 2024-25 institutional buyer has become a seller for now.
        </p>
        {/* ETF flows chart */}
        <div className="mt-4 rounded-xl overflow-hidden border border-[#222]">
          <img 
            src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https://substack-post-media.s3.amazonaws.com/public/images/4bb9ee4a-b05e-4278-8170-8b7000bca668_2516x1398.png"
            alt="Crypto ETF sector flows — Artemis"
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="px-3 py-2 bg-[#0a0a0a] text-[10px] text-[#666]">Source: Artemis Crypto ETF Sector — Net flows, January–June 2026</div>
        </div>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis — $BTC, Artemis Crypto ETF Sector</p>
      </div>

      {/* 2. Strategy Treasury Underwater */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Strategy (MSTR) Treasury $13.3B Underwater — STRC Repair Drags On</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Last week the story was STRC breaking its peg. This week it spilled over into the equity.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          MSTR fell to its lowest level in nearly 23 months, with the stock testing the low-to-mid $90s intraday and printing into the $80s on the worst sessions. The reason is arithmetic: Strategy holds <strong className="text-[#ededed]">847,363 BTC</strong> bought for about $64.10B at an average cost near $75,651 per coin. With bitcoin around $60K, that treasury is now roughly <strong className="text-[#ef4444]">$13.3B underwater</strong> — the first time the core trade has been meaningfully offside since the model was built.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          STRC came under immense pressure. Cash Reserves to USD coverage roughly sits around 9.8 months at point of writing. Peter Schiff escalated his attack, and for the first time the criticism had a visible market catalyst behind it. The critics got louder this week as STRC's structural vulnerability — the assumption that BTC would never stay below cost basis for extended periods — was stress-tested in real time.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis — $MSTR, Artemis DATs Sector, Artemis — $STRC</p>
      </div>

      {/* 3. Robinhood Convertible */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Robinhood Closes $2.2B Zero-Coupon Convertible — Into the Selloff</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          While the rest of the market was selling, Robinhood raised <strong className="text-[#ededed]">$2.2 billion</strong> through an upsized zero-coupon convertible note at extremely favorable terms. Raising cheap, non-dilutive capital into a risk-off tape is a strong signal about management confidence. With a growing crypto business and expanding product suite, the balance sheet is built for the next cycle — whether the market cooperates or not.
        </p>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          This is the same playbook Robinhood executed in 2024: raise when the market is pricing in maximum pessimism, deploy when it turns. The zero-coupon structure means no interest payments — just a conversion premium that only triggers if the stock recovers significantly. Robinhood traded down alongside everything else during the week, but structurally this could be the most significant corporate move of the period.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis Big Fundamentals, HOOD filings</p>
      </div>

      {/* ════════════════════════════════════════════
          DeFi SECTOR WATCH
          ════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">DeFi Sector Watch</h2>

      {/* AAVE Deep Dive */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
          <h3 className="text-base font-semibold text-[#ededed]">AAVE Rips +30.18% — Standard Chartered Initiation & V4 Traction</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          In a week where everything sold off, AAVE was the sole standout in DeFi. Three catalysts converged:
        </p>
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 mt-2 list-disc pl-4">
          <li><strong className="text-[#ededed]">Standard Chartered initiation</strong> with a $3,500 price target by 2030 — a major traditional finance endorsement for a DeFi protocol, and an implicit bet that institutional lending will route through Aave's infrastructure.</li>
          <li><strong className="text-[#ededed]">Aave V4 traction:</strong> deposits surpassed $200 million as the new architecture rolls out with improved capital efficiency, cross-chain liquidity, and isolated risk parameters.</li>
          <li><strong className="text-[#ededed]">USDT deposits flowing back</strong> into the protocol, reversing the stablecoin outflow trend seen across most lending venues during the risk-off rotation.</li>
        </ul>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          The sheer magnitude of the move (+30.18% on the week) while BTC broke $60K, NVDA dropped 8.62%, and GLD slipped 3.48% signals genuine alpha — not just beta rotation. AAVE is carving out a narrative as the institutional-grade DeFi lending venue, and the market is repricing accordingly. The Standard Chartered analyst note explicitly modeled Aave capturing a material share of the projected $10T+ tokenized real-world asset market by 2030.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis Big Fundamentals, Artemis — $AAVE, DeFi Llama</p>
      </div>

      {/* SOL */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#14F195]" />
          <h3 className="text-base font-semibold text-[#ededed]">SOL Holds Green at +3.49%</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Solana was the only other major name in positive territory for the week. No specific catalyst drove the outperformance beyond the structural bid for high-throughput L1s that continues to differentiate SOL from Ethereum in sentiment terms. With a growing stablecoin presence and consistent DEX volume leadership, SOL continues to decouple from ETH beta, particularly during risk-off events.
        </p>
      </div>

      {/* ════════════════════════════════════════════
          THE DAMAGE — Full Weekly Returns
          ════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">The Damage: Weekly Returns</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#222] text-[#666] text-xs uppercase tracking-[1px]">
              <th className="text-left py-2 px-3">Asset</th>
              <th className="text-right py-2 px-3">Return</th>
              <th className="text-left py-2 px-3 hidden md:table-cell">Category</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AAVE', '+30.18%', 'DeFi · Standard Chartered initiation + V4 traction', '#a855f7'],
              ['SOL', '+3.49%', 'L1 · Structural bid, DEX volume leadership', '#14F195'],
              ['DIA', '+0.43%', 'Equity · Dow Jones, old-economy steady', '#888'],
              ['MU', '-0.15%', 'Semis · Micron near flat', '#888'],
              ['GLD', '-3.48%', 'Commodity · Gold slipped, nowhere to hide', '#ef4444'],
              ['QQQ', '-4.60%', 'Equity · Tech-heavy Nasdaq selloff', '#ef4444'],
              ['CRCL', '-8.30%', 'Crypto-adjacent equity', '#ef4444'],
              ['NVDA', '-8.62%', 'Semis · AI/GPU sold off hard', '#ef4444'],
              ['COIN', '-8.70%', 'Crypto equity · Coinbase dragged with sector', '#ef4444'],
              ['HOOD', '-8.75%', 'Crypto equity · Robinhood despite strong convertible raise', '#ef4444'],
              ['SKY', '-14.06%', 'DeFi · Worst performer of the week', '#ef4444'],
            ].map(([name, ret, note, color], i) => (
              <tr key={i} className="border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors">
                <td className="py-2.5 px-3"><span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{background: color}} /><span className="text-[#ededed]">{name}</span></span></td>
                <td className={`py-2.5 px-3 text-right font-mono text-xs ${ret.startsWith('+') ? 'text-[var(--accent-green)]' : 'text-[#ef4444]'}`}>{ret}</td>
                <td className="py-2.5 px-3 text-xs text-[#666] hidden md:table-cell">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#444] mt-2">Basket average: -3.10% | Median: -3.64% | Only 2 of 11 names positive</p>

      {/* ════════════════════════════════════════════
          FORWARD LOOK
          ════════════════════════════════════════════ */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Forward Look</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 list-disc pl-4">
          <li><strong className="text-[#ededed]">ETF flow stabilization:</strong> Does selling exhaust or accelerate into July? Six consecutive weeks is the longest outflow streak since the ETFs launched. If it breaks, it breaks the narrative that institutional flows are "sticky."</li>
          <li><strong className="text-[#ededed]">MSTR/STRC correlation:</strong> Treasury underwater is a new dynamic — watch for any forced actions, debt covenant triggers, or structural defense. STRC's reserves-to-USD coverage at 9.8 months is not immediately dangerous but trends badly if BTC stays below $65K.</li>
          <li><strong className="text-[#ededed]">AAVE V4 adoption:</strong> If deposits continue climbing past $200M, institutional interest may compound and trigger a re-rating of DeFi lending protocols as infrastructure rather than speculation.</li>
          <li><strong className="text-[#ededed]">Robinhood bond:</strong> If HOOD rebounds first when the macro turns, the $2.2B zero-coupon raise will look like genius-level timing. If not, it's just cheap debt on a falling stock.</li>
        </ul>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Sources: Artemis · DeFi Llama · Glassnode · Dune · SEC filings · X feed
        {' '}· Compiled by Delta V Intelligence · Published every Saturday.
      </p>
    </BlogPostLayout>
  );
}
