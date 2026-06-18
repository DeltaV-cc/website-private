'use client';

export default function Blog() {
  const posts = [
    {
      title: "Risk Dashboards & OpSec Tooling for Web3",
      date: "June 10, 2026",
      category: "OpSec",
      type: "Deep Dive",
      excerpt: "Mapping the most useful risk and transparency layers currently available for EVM and sovereign operations — L2Beat, WalletBeat, DefiScan, AntiCapture, SEAL911 and more.",
      slug: "risk-dashboards-opsec"
    },
    {
      title: "Inside a $292M DeFi Crisis: Lessons from KPK&apos;s rsETH War Room",
      date: "June 18, 2026",
      category: "OpSec",
      type: "Deep Dive",
      excerpt: "A rare inside account of institutional incident response during a live DeFi exploit. KPK&apos;s war room activated in 20 minutes, 97 new monitors shipped post-incident, and actionable steps for Web3 teams.",
      slug: "lessons-from-kpk-war-room"
    },
    {
      title: "First Principles for Sovereign AI Agents",
      date: "June 10, 2026",
      category: "AI",
      type: "Thought",
      excerpt: "Local-first by default. Keys never leave the machine. Minimal attack surface. Human in the loop for high-stakes actions. The rules we refuse to negotiate.",
      slug: "first-principles"
    },
    {
      title: "Prediction Markets on MegaETH + Evently Positioning",
      date: "June 2026",
      category: "Intelligence",
      type: "Deep Dive",
      excerpt: "Deep research on on-chain intelligence, prediction markets, and how Delta V can position in the emerging intelligence layer.",
      slug: "#"
    },
    {
      title: "Web3 OpSec SOTA: Complementary Sources & Threat Models",
      date: "June 2026",
      category: "OpSec",
      type: "Deep Dive",
      excerpt: "How opsek.io and seal911 work together as high-signal references. Wallet security, agent OpSec with Latch, on-chain monitoring, and 2026 threat models.",
      slug: "#"
    },
    {
      title: "Sovereign AI Agent Frameworks: 2026 Landscape",
      date: "June 2026",
      category: "Research",
      type: "Deep Dive",
      excerpt: "Comparative analysis of Hermes, Sovyx, Letta/Mem0, LangGraph and emerging bio-mimetic approaches. Recommendations for Delta V's Agent Forge pillar.",
      slug: "#"
    },
    {
      title: "IntelHub Dashboard Architecture: Multi-Source Intelligence Fusion",
      date: "June 2026",
      category: "Infrastructure",
      type: "Dashboard",
      excerpt: "How IntelHub ingests, normalizes, and surfaces high-signal intelligence across Macro, Infosec, and Web3 dashboards — with automated cron pipelines and DeFiLlama-style data density.",
      slug: "#"
    },
    {
      title: "Global Liquidity & Macro Dashboard: Key Readings for H2 2026",
      date: "June 2026",
      category: "Markets",
      type: "Macro",
      excerpt: "Central bank balance sheet trends, DXY regimes, and commodity signals feeding the IntelHub Macro dashboard. Positioning for the second half of 2026.",
      slug: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      <nav className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-2xl font-semibold tracking-[-1px]">Delta V</a>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="/ai" className="hover:text-[#00f0ff] transition-colors">AI</a>
            <a href="/web3" className="hover:text-[#00f0ff] transition-colors">Web3</a>
            <a href="/forge" className="hover:text-[#00f0ff] transition-colors">Forge</a>
            <a href="/blog" className="hover:text-[#00f0ff] transition-colors">Blog</a>
            <a href="/intelhub" className="hover:text-[#00f0ff] transition-colors">IntelHub</a>
            <a href="/contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-8 py-16">
        <a href="/" className="text-[#00f0ff] text-sm hover:underline">← Back to home</a>
        <h1 className="text-6xl font-semibold tracking-[-2px] mt-4 mb-2">Blog</h1>
        <p className="text-[#aaa] text-lg mb-12">High-signal writing from IntelHub — deep dives, intelligence reports, and tutorials on sovereign AI, Web3 OpSec, and self-sovereign systems.</p>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.slug !== '#' ? `/blog/${post.slug}` : '#'}
              className={`block border border-[#222] rounded-2xl p-8 transition-colors ${
                post.slug !== '#' 
                  ? 'hover:border-[#00f0ff] group cursor-pointer' 
                  : 'opacity-60 cursor-default'
              }`}
            >
              <div className="flex items-center gap-3 text-sm text-[#666] mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span className="text-[#00f0ff]">{post.category}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-[1px] uppercase ${
                  post.type === 'Deep Dive' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                  post.type === 'Thought' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  post.type === 'Tutorial' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  post.type === 'Dashboard' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                  post.type === 'Macro' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                  'bg-white/5 text-white/40 border border-white/10'
                }`}>{post.type}</span>
              </div>
              <h3 className={`text-2xl font-semibold mb-3 ${
                post.slug !== '#' ? 'group-hover:text-[#00f0ff]' : ''
              } transition-colors`}>{post.title}</h3>
              <p className="text-[#aaa] mb-4">{post.excerpt}</p>
              {post.slug !== '#' ? (
                <div className="text-[#00f0ff] text-sm">Read full article →</div>
              ) : (
                <div className="text-[#666] text-sm">Coming soon</div>
              )}
            </a>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-[#666]">
          More articles generated through the IntelHub pipeline.
        </div>
      </div>
    </div>
  );
}
