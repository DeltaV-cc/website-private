'use client';

export default function Blog() {
  const posts = [
    {
      title: "Sovereign AI Agent Frameworks: 2026 Landscape",
      date: "June 2026",
      category: "Research",
      excerpt: "Comparative analysis of Hermes, Sovyx, Letta/Mem0, LangGraph and emerging bio-mimetic approaches. Recommendations for Delta V's Agent Forge pillar.",
      slug: "#"
    },
    {
      title: "Web3 OpSec SOTA: Complementary Sources & Threat Models",
      date: "June 2026",
      category: "OpSec",
      excerpt: "How opsek.io and seal911 work together as high-signal references. Wallet security, agent OpSec with Latch, on-chain monitoring, and 2026 threat models.",
      slug: "#"
    },
    {
      title: "Prediction Markets on MegaETH + Evently Positioning",
      date: "June 2026",
      category: "Intelligence",
      excerpt: "Deep research on on-chain intelligence, prediction markets, and how Delta V can position in the emerging intelligence layer.",
      slug: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <a href="/" className="text-[#00f0ff] text-sm hover:underline">← Back to home</a>
        <h1 className="text-6xl font-semibold tracking-[-2px] mt-4 mb-2">Blog</h1>
        <p className="text-[#aaa] mb-12">High-signal writing from the Content Forge on sovereign AI, Web3 OpSec, and self-sovereign systems.</p>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <div key={index} className="border border-[#222] rounded-2xl p-8 hover:border-[#00f0ff] transition-colors group">
              <div className="flex items-center gap-3 text-sm text-[#666] mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span className="text-[#00f0ff]">{post.category}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#00f0ff] transition-colors">{post.title}</h3>
              <p className="text-[#aaa] mb-4">{post.excerpt}</p>
              <div className="text-[#00f0ff] text-sm">Read full article →</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-[#666]">
          More articles generated through the Content Forge pipeline.
        </div>
      </div>
    </div>
  );
}
