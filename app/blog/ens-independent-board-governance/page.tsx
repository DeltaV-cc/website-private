'use client';

import BlogPostLayout from '@/components/BlogPostLayout';

export default function ENSGovernance() {
  return (
    <BlogPostLayout
      title="ENS and the Independent Board Question"
      date="June 25, 2026"
      category="Web3"
      type="Thought"
      readingTime="2 min read"
      excerpt="A proposal to restructure the ENS Foundation with an independent board and world-class members — without touching the treasury. The DAO is asking hard governance questions."
      sourceLabel="netto.eth (@alextnetto)"
      sourceUrl="https://x.com/alextnetto/status/2069813772500205837"
    >
      <p>
        A governance proposal from <strong className="text-[#ededed]">netto.eth</strong> (@alextnetto) is gaining traction 
        in the ENS community: restructure the ENS Foundation with a <strong className="text-[#ededed]">truly independent board</strong>, 
        composed of world-class members, accountable to the DAO — without transferring the treasury.
      </p>

      <p>
        The proposal is a temp check on the ENS governance forum, with 55.9K views and significant 
        community engagement. The core thesis: ENS has outgrown its current governance structure. 
        The protocol secures the naming layer for Ethereum, but the Foundation that stewards it 
        should operate with the independence and accountability of a mature institution.
      </p>

      <div className="bg-[#0d0d0d] border-l-2 border-[#a855f7] rounded-r-xl p-5 my-6 text-sm">
        <p className="text-[#aaa]">
          <strong className="text-[#a855f7]">Key principles:</strong>
        </p>
        <ul className="list-disc pl-4 space-y-1 mt-2 text-[#aaa]">
          <li>Create an independent board with world-class members</li>
          <li>No treasury transfer — funds stay under DAO control</li>
          <li>Foundation becomes the accountability and strategy layer</li>
          <li>DAO retains authority through delegation and voting</li>
        </ul>
      </div>

      <p>
        This matters beyond ENS. As DAOs mature, the tension between 
        <strong className="text-[#ededed]">community governance and operational effectiveness</strong> is becoming 
        the defining organizational challenge. The ENS proposal is a case study in how to resolve it:
        independent execution, retained treasury control, DAO oversight.
      </p>

      <p>
        The temp check is live at <a href="https://discuss.ens.domains" className="text-[#00f0ff] hover:underline">discuss.ens.domains</a>. 
        Worth watching — the outcome sets precedent for how established Web3 protocols 
        structure themselves for the next decade.
      </p>

      <p className="text-[#666] text-sm pt-8 border-t border-[#222]">
        Source: netto.eth / ENS Governance Forum. Status: Temp Check, open for community input.
      </p>
    </BlogPostLayout>
  );
}
