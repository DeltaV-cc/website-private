'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
export default function EthereumSecurityQFPost() {
  return (
    <BlogPostLayout
      title="638 ETH for Ethereum Security: The Largest QF Round in History"
      date="June 23, 2026"
      category="Web3"
      type="Deep Dive"
      readingTime="4 min read"
      excerpt="The Ethereum Security QF Round wrapped with 638+ ETH distributed to 134 projects — the largest matching pool in quadratic funding history. What this means for security infrastructure, risk dashboards, and the teams building them."
      sourceLabel="Giveth (@Giveth)"
      sourceUrl="https://x.com/Giveth/status/2069440175420141950"
    >
      <p>
        On June 23, Giveth announced the wrap of the <strong className="text-[var(--text-primary)]">Ethereum Security Quadratic Funding Round</strong> — 
        638+ ETH raised, 134 projects funded, and a matching pool backed by @thedaofund that makes it the 
        largest QF round in history.
      </p>

      <p>
        The numbers alone are striking. But what matters is what they signal: the Ethereum ecosystem is 
        finally putting serious capital behind its security layer. Not audits. Not insurance. The tools, 
        dashboards, and infrastructure that make on-chain risk legible to the people who need to see it.
      </p>

      {/* Stats highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {[
          { value: '638+', label: 'ETH Raised', color: 'from-[var(--accent-cyan)] to-[var(--accent-cyan)]/50' },
          { value: '134', label: 'Projects Funded', color: 'from-[var(--accent-purple)] to-[var(--accent-purple)]/50' },
          { value: 'Largest', label: 'QF Pool Ever', color: 'from-[var(--accent-gold)] to-[var(--accent-gold)]/50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-6 text-center">
            <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-[1px]">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-12 mb-4">Where the Money Goes</h2>

      <p>
        134 projects across the Ethereum security stack — from smart contract monitoring to incident 
        response infrastructure, from wallet security to governance defense. This isn&apos;t a single 
        category. It&apos;s the full surface area of what security means on a programmable blockchain.
      </p>

      <p>
        The round was hosted on Giveth and backed by The DAO Fund, using quadratic funding to let 
        the community direct capital to the projects they trust most. This mechanism matters: it means 
        the distribution reflects genuine community prioritization, not a foundation&apos;s grant committee.
      </p>

      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-12 mb-4">The Risk Dashboard Layer</h2>

      <p>
        A significant portion of the funded projects belong to a category we track closely at Delta V: 
        <strong className="text-[var(--text-primary)]"> risk dashboards and transparency infrastructure</strong>. These are the tools that make 
        on-chain risk legible without requiring a PhD in smart contract security.
      </p>

      <p>
        Three stand out as essential infrastructure for anyone receiving or deploying capital from rounds like this:
      </p>

      {/* DeFiScan */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-6 my-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">DeFiScan</h3>
        </div>
        <p className="text-sm text-[var(--text-tertiary)]">
          <a href="https://defiscan.info" className="text-[var(--accent-cyan)] hover:underline">defiscan.info</a> — Tracks protocol centralization risk 
          across <strong className="text-[var(--text-primary)]">1,193 contracts</strong> and <strong className="text-[var(--text-primary)]">191 admin accounts</strong>, 
          covering $70.12B in total value. DeFiScan monitors admin control, dependency chains, governance parameters, 
          and code verifiability — all sourced from on-chain evidence, not team claims. For a QF round distributing 
          638+ ETH, this is the tool you use to verify that recipient projects don&apos;t have single-key admin risks 
          or unaddressed centralization attack surfaces.
        </p>
      </div>

      {/* L2Beat */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-6 my-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">L2Beat</h3>
        </div>
        <p className="text-sm text-[var(--text-tertiary)]">
          <a href="https://l2beat.com" className="text-[var(--accent-cyan)] hover:underline">l2beat.com</a> — The definitive source for L2 security 
          maturity. Stage classifications, proof system analysis, data availability assumptions, and bridge risk 
          assessments. Any project operating on or building for L2s needs to understand where their chain sits 
          on the stage ladder. In a security-focused funding round, L2Beat is the benchmark for infrastructure trust.
        </p>
      </div>

      {/* AntiCapture */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-6 my-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">AntiCapture</h3>
        </div>
        <p className="text-sm text-[var(--text-tertiary)]">
          <a href="https://anticapture.com" className="text-[var(--accent-cyan)] hover:underline">anticapture.com</a> — A DAO governance security 
          dashboard that monitors economic behavior, delegation patterns, and delegate activity. AntiCapture 
          classifies DAOs into security stages and identifies integrity risks before they become attacks. 
          For the 134 funded projects, many of which will operate as DAOs, this is the layer that makes 
          governance legible — and governance attacks are consistently the most expensive exploits in Ethereum.
        </p>
      </div>

      <div className="bg-[var(--bg-card)] border-l-2 border-[var(--accent-cyan)] rounded-r-xl p-5 my-8">
        <p className="text-sm text-[var(--text-tertiary)]">
          <strong className="text-[var(--accent-cyan)]">Delta V view:</strong> These three tools form the minimum viable risk stack for any team 
          receiving or deploying security funding. DeFiScan for protocol-level centralization, L2Beat for 
          infrastructure maturity, AntiCapture for governance integrity. Together they cover the attack surface 
          that traditional audits miss.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-12 mb-4">What This Means for Security Teams</h2>

      <p>
        The Ethereum Security QF round is a forcing function. 638+ ETH just demonstrated that the ecosystem 
        will fund security infrastructure at scale. The projects that received capital now have a responsibility 
        to be transparent about their own risk posture — and the tools to measure it already exist.
      </p>

      <p>
        For teams building in this space, the signal is clear: the market for security tooling is mature enough 
        to support serious projects. The question is no longer &ldquo;will anyone pay for security?&rdquo; but 
        &ldquo;can you build something that earns their trust?&rdquo;
      </p>

      <p className="text-[var(--text-muted)] text-sm pt-8 border-t border-[var(--border-default)]">
        Full project list and detailed breakdown of the 134 recipients will be published as the data becomes 
        available from the Giveth API. This article will be updated accordingly.
      </p>
    </BlogPostLayout>
  );
}
