'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function StablecoinTreasuryPost() {
  return (
    <BlogPostLayout
      title="Stablecoins: The Fed's Newest Treasury Financing Channel"
      date="June 23, 2026"
      category="Web3"
      type="Thought"
      readingTime="2 min read"
      excerpt="Fed Governor Waller just acknowledged what the data shows: dollar-backed stablecoins are becoming a structural demand channel for US government debt. Tether alone is the 17th-largest holder."
      sourceLabel="Fed Governor Christopher Waller via @DefiLlama"
      sourceUrl="https://x.com/DefiLlama"
    >
      <p>
        <strong className="text-[#ededed]">Fed Governor Christopher Waller:</strong>
      </p>

      <div className="bg-[#0d0d0d] border-l-2 border-[#00f0ff] rounded-r-xl p-5 my-6 text-sm text-[#ccc] italic">
        &ldquo;Dollar-backed stablecoins may create a new channel linking global liquidity demand directly to US Treasury Markets.&rdquo;
      </div>

      <p>
        A Fed governor just said the quiet part loud. Stablecoins started as crypto cash. Today, their issuers are among the largest buyers of short-term US government debt.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 my-8">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="text-xs text-[#666] uppercase tracking-[1px]">Tether</div>
          <div className="text-2xl font-bold text-[#00f0ff] mt-1">$141B</div>
          <div className="text-xs text-[#888]">T-bills — 17th largest US debt holder</div>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="text-xs text-[#666] uppercase tracking-[1px]">Circle</div>
          <div className="text-2xl font-bold text-[#f59e0b] mt-1">$67B</div>
          <div className="text-xs text-[#888]">85% T-bills + repos</div>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="text-xs text-[#666] uppercase tracking-[1px]">Supply growth</div>
          <div className="text-2xl font-bold text-[#a855f7] mt-1">462x</div>
          <div className="text-xs text-[#888]">since 2019</div>
        </div>
        <div className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="text-xs text-[#666] uppercase tracking-[1px]">Current share</div>
          <div className="text-2xl font-bold text-[#ededed] mt-1">0.8%</div>
          <div className="text-xs text-[#888]">of Treasury market</div>
        </div>
      </div>

      <p>
        Stablecoin supply has grown <strong className="text-[#ededed]">462x since 2019</strong>. US Treasuries outstanding grew 77% in that same period. The correlation is not accidental.
      </p>

      <p>
        Currently at 0.8% of the Treasury market, even modest continued growth changes the picture materially. Under the GENIUS Act framework modeling $2-3T in regulated stablecoin supply with 100% T-bill backing, that share rises to <strong className="text-[#ededed]">5-8%</strong>. That&apos;s structural demand — not speculative.
      </p>

      <p>
        The question Waller&apos;s statement forces: is Washington deliberately using stablecoin regulation as an industrial policy tool to expand the buyer base for US government debt? The mechanism works — global dollar demand routes through stablecoins directly into T-bills, no foreign central bank needed.
      </p>

      <p className="text-[#aaa]">
        For the crypto industry, this reframes the regulatory narrative. Stablecoins aren&apos;t a threat to the system. They&apos;re becoming a <strong className="text-[#ededed]">feature of it</strong>.
      </p>

      <p className="text-[#666] text-sm pt-6 border-t border-[#222]">
        Sources: DeFiLlama&apos;s LlamaAI, Federal Reserve Bank of St. Louis, BDO/Deloitte/Grant Thornton attestations.
      </p>
    </BlogPostLayout>
  );
}
