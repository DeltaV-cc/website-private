import Navbar from '../../components/Navbar';

export default function FirstPrinciplesArticle() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <a href="/blog" className="text-[#00f0ff] text-sm hover:underline">← Back to blog</a>
        
        <div className="mt-8">
          <div className="flex items-center gap-3 text-sm text-[#666] mb-4">
            <span>June 10, 2026</span>
            <span>•</span>
            <span className="text-[#00f0ff]">AI</span>
          </div>

          <h1 className="text-5xl font-semibold tracking-[-2px] mb-8 leading-tight">
            First Principles for Sovereign AI Agents
          </h1>

          <div className="prose prose-invert max-w-none text-[#ccc] leading-relaxed space-y-6">
            <p className="text-lg">
              We build agents the same way we build everything else at Delta V: from first principles, with OpSec as the foundation.
            </p>

            <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-6">Core Rules</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#ededed] mb-2">1. Local-first by default</h3>
                <p>No agent should require cloud connectivity to function.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#ededed] mb-2">2. Keys never leave the machine</h3>
                <p>Private keys, API tokens, and memory stay on the user&apos;s hardware.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#ededed] mb-2">3. Minimal attack surface</h3>
                <p>Every dependency is a liability. We ruthlessly prune.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#ededed] mb-2">4. Human in the loop for high-stakes actions</h3>
                <p>Agents propose. Humans decide.</p>
              </div>
            </div>

            <hr className="border-[#222] my-12" />

            <p className="text-lg font-semibold text-[#ededed]">This is not negotiable.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
