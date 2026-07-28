import type { Metadata } from 'next';
import BlogPostLayout from '@/components/BlogPostLayout';
import { ArticleCallout, ArticleSourceFooter } from '@/components/article/primitives';
import { contentMetadata } from '@/lib/content-meta';

export const metadata: Metadata = contentMetadata('ens-independent-board-governance');

export default function ENSGovernance() {
  return (
    <BlogPostLayout
      title="ENS and the Independent Board Question"
      date="June 25, 2026"
      category="Web3"
      type="Thought"
      readingTime="1 min read"
      excerpt="A proposal to restructure the ENS Foundation with an independent board and world-class members — without touching the treasury. The DAO is asking hard governance questions."
      sourceLabel="netto.eth (@alextnetto)"
      sourceUrl="https://x.com/alextnetto/status/2069813772500205837"
    >
      <p>
        A governance proposal from <strong>netto.eth</strong> (@alextnetto) is gaining traction in the ENS
        community: restructure the ENS Foundation with a <strong>truly independent board</strong>, composed
        of world-class members, accountable to the DAO — without transferring the treasury.
      </p>

      <p>
        The proposal is a temp check on the ENS governance forum, with 55.9K views and significant
        community engagement. The core thesis: ENS has outgrown its current governance structure. The
        protocol secures the naming layer for Ethereum, but the Foundation that stewards it should operate
        with the independence and accountability of a mature institution.
      </p>

      <ArticleCallout accent="purple" variant="note">
        <p>
          <strong>Key principles:</strong>
        </p>
        <ul className="list-disc pl-4 space-y-1 mt-2">
          <li>Create an independent board with world-class members</li>
          <li>No treasury transfer — funds stay under DAO control</li>
          <li>Foundation becomes the accountability and strategy layer</li>
          <li>DAO retains authority through delegation and voting</li>
        </ul>
      </ArticleCallout>

      <p>
        This matters beyond ENS. As DAOs mature, the tension between{' '}
        <strong>community governance and operational effectiveness</strong> is becoming the defining
        organizational challenge. The ENS proposal is a case study in how to resolve it: independent
        execution, retained treasury control, DAO oversight.
      </p>

      <p>
        The temp check is live at{' '}
        <a href="https://discuss.ens.domains" target="_blank" rel="noopener noreferrer">
          discuss.ens.domains
        </a>
        . Worth watching — the outcome sets precedent for how established Web3 protocols structure
        themselves for the next decade.
      </p>

      <ArticleSourceFooter>
        Source: netto.eth / ENS Governance Forum. Status: Temp Check, open for community input.
      </ArticleSourceFooter>
    </BlogPostLayout>
  );
}
