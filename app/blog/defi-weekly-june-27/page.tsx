'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function DeFiWeeklyJune27() {
  return (
    <BlogPostLayout
      title="DeFi Weekly — June 27, 2026"
      date="June 27, 2026"
      category="DeFi Weekly"
      type="Dashboard"
      readingTime="5 min read"
      excerpt="BTC breaks below $60K for first time since 2024, spot ETFs bleed for 6th straight week, MSTR treasury $13.3B underwater, Robinhood raises $2.2B convertible, and AAVE rips +30% as DeFi stands alone."
    >
      {/* Market Pulse */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-6">
        <div className="text-xs text-[#666] uppercase tracking-[1px] mb-2">Market Pulse</div>
        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
          <span>BTC <span className="text-[#ef4444]">~$59,300</span></span>
          <span className="text-[#444]">|</span>
          <span>ETH <span className="text-[#ef4444]">~$1,550</span></span>
          <span className="text-[#444]">|</span>
          <span>ETF bleed week 6</span>
          <span className="text-[#444]">|</span>
          <span>AAVE <span className="text-[var(--accent-green)]">+30.2%</span></span>
        </div>
        <p className="text-xs text-[#666] mt-2">
          Risk assets sold off hard. BTC slid below $60,000 for the first time since 2024, ETH fell to ~$1,550. The mid-June bounce on US-Iran de-escalation completely faded. Spot bitcoin ETFs bled for the 6th consecutive week — an estimated $7.2B pulled out across May and June, tipping 2026 flows negative. The lone exception: AAVE ripped +30.18% on a Standard Chartered initiation and V4 traction. SOL (+3.49%) was the only other green in a sea of red: SKY -14.06%, HOOD -8.75%, COIN -8.70%, NVDA -8.62%, GLD -3.48%, QQQ -4.60%. Basket averaged -3.10%, median -3.64%.
          <span className="text-[#444]"> — Sources: Artemis, Glassnode, DeFi Llama</span>
        </p>
      </div>

      {/* Three highlights */}
      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">This Week's Highlights</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <h3 className="text-base font-semibold text-[#ededed]">Bitcoin Breaks $60K — Spot ETFs Bleed for 6th Straight Week</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Bitcoin traded below $60,000 on Thursday, June 25 for the first time since 2024. Opening near $60,983, it touched ~$59,300 intraday. Ethereum followed from ~$1,620 to the mid-$1,500s. US crypto ETF net outflows ran a sixth straight week (~$227M out in the latest week alone). Back-to-back record outflow streaks in May and June pulled an estimated <strong className="text-[#ededed]">$7.2 billion</strong> out, with IBIT alone shedding ~$3.3 billion. The institutional bid that defined late 2024 and early 2025 has become a seller.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis, Glassnode</p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Strategy (MSTR) Treasury $13.3B Underwater — STRC Repair Drags On</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          MSTR tested the low-to-mid $90s and printed into the $80s — a 23-month low. Strategy holds <strong className="text-[#ededed]">847,363 BTC</strong> bought for ~$64.10B at an average cost near $75,651/coin. With bitcoin around $60K, the treasury is roughly <strong className="text-[#ef4444]">$13.3B underwater</strong> — the first time the core trade has been meaningfully offside. STRC came under immense pressure with cash reserves-to-USD coverage around 9.8 months. Peter Schiff escalated his attack with a visible market catalyst behind it.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis, Dune Analytics</p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
          <h3 className="text-base font-semibold text-[#ededed]">Robinhood Closes $2.2B Zero-Coupon Convertible — Into the Selloff</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          While the rest of the market was selling, Robinhood raised <strong className="text-[#ededed]">$2.2 billion</strong> through an upsized zero-coupon convertible note at extremely favorable terms. Raising cheap, non-dilutive capital into a risk-off tape is a strong signal about management confidence. With a growing crypto business and expanding product suite, the balance sheet is built for the next cycle — whether the market cooperates or not.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis, SEC filings</p>
      </div>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">DeFi Sector Watch</h2>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
          <h3 className="text-base font-semibold text-[#ededed]">AAVE Rips +30.18% — Standard Chartered Initiation & V4 Traction</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">Three catalysts converged in a week where everything else sold off:</p>
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 mt-2 list-disc pl-4">
          <li><strong className="text-[#ededed]">Standard Chartered initiation</strong> with a $3,500 price target by 2030 — a major TradFi endorsement</li>
          <li><strong className="text-[#ededed]">Aave V4 traction:</strong> deposits surpassed $200 million</li>
          <li><strong className="text-[#ededed]">USDT deposits flowing back</strong> into the protocol, reversing the stablecoin outflow trend</li>
        </ul>
        <p className="text-sm text-[#aaa] leading-relaxed mt-2">
          AAVE carving out a narrative as the institutional-grade DeFi lending venue. The market is repricing accordingly.
        </p>
        <p className="text-xs text-[#444] mt-3">Sources: Artemis, DeFi Llama</p>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#14F195]" />
          <h3 className="text-base font-semibold text-[#ededed]">SOL Holds Green at +3.49%</h3>
        </div>
        <p className="text-sm text-[#aaa] leading-relaxed">
          Solana was the only other major name in positive territory. Structural L1 bid for high-throughput chains continues to differentiate SOL from ETH beta during risk-off events.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">The Damage: Weekly Returns</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#222] text-[#666] text-xs uppercase tracking-[1px]">
              <th className="text-left py-2 px-3">Asset</th>
              <th className="text-right py-2 px-3">Return</th>
              <th className="text-left py-2 px-3 hidden md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AAVE', '+30.18%', 'Only bright spot — SC initiation + V4', '#a855f7'],
              ['SOL', '+3.49%', 'Structural L1 bid holding', '#14F195'],
              ['DIA', '+0.43%', 'Dow flat, old-economy steady', '#888'],
              ['MU', '-0.15%', 'Micron near flat', '#888'],
              ['QQQ', '-4.60%', 'Tech/QQQ heavy sell', '#ef4444'],
              ['NVDA', '-8.62%', 'AI/semis offered no cover', '#ef4444'],
              ['GLD', '-3.48%', 'Gold fell — nowhere to hide', '#ef4444'],
              ['CRCL', '-8.30%', 'Crypto-correlated equity', '#ef4444'],
              ['COIN', '-8.70%', 'Coinbase dragged', '#ef4444'],
              ['HOOD', '-8.75%', 'Robinhood equity despite strong raise', '#ef4444'],
              ['SKY', '-14.06%', 'Worst performer', '#ef4444'],
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
      <p className="text-xs text-[#444] mt-2">Basket average: -3.10% | Median: -3.64%</p>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-10 mb-4">Forward Look</h2>
      <div className="bg-[#111] border border-[#222] rounded-2xl p-5 my-4">
        <ul className="text-sm text-[#aaa] leading-relaxed space-y-1 list-disc pl-4">
          <li><strong className="text-[#ededed]">ETF flow stabilization:</strong> Does selling exhaust or accelerate into July?</li>
          <li><strong className="text-[#ededed]">MSTR/STRC correlation:</strong> Treasury underwater is a new dynamic — watch for forced actions</li>
          <li><strong className="text-[#ededed]">AAVE V4 adoption:</strong> If deposits continue climbing past $200M, institutional interest may compound</li>
          <li><strong className="text-[#ededed]">Robinhood bond:</strong> If HOOD rebounds first, it may signal the turn</li>
        </ul>
      </div>

      <p className="text-xs text-[#444] mt-8 pt-4 border-t border-[#1a1a1a]">
        Sources: Artemis · DeFi Llama · Glassnode · Dune · SEC filings · X feed
        {' '}· Compiled by Delta V Intelligence · Next edition expected after US holidays.
      </p>
    </BlogPostLayout>
  );
}
