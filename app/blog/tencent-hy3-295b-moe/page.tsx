import BlogPostLayout from '@/components/BlogPostLayout';

export default function Hy3Post() {
  return (
    <BlogPostLayout
      title="Tencent's Hy3: 295B MoE That Punches at Trillion-Scale — Apache 2.0, 256K Context, Agent-First"
      date="2026-07-08"
      category="AI"
      type="Deep Dive"
      excerpt="Tencent drops Hy3, a 295B MoE model with only 21B active parameters that rivals trillion-parameter flagships. Apache 2.0 license, 256K context, 192 experts, built for agentic workloads. Free API for 2 weeks."
      readingTime="6 min"
      sourceUrl="https://huggingface.co/tencent/Hy3"
      sourceLabel="Tencent · Hugging Face"
    >
      <p>
        Tencent's Hy team just released <strong>Hy3</strong> — a 295B-parameter Mixture-of-Experts model that activates only 21B parameters per token, yet goes head-to-head with trillion-scale flagships. Apache 2.0. 256K context window. Built specifically for agentic use cases. And they're giving away the API free for two weeks.
      </p>

      <h2>Specs at a Glance</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-[#222] rounded-lg">
          <thead>
            <tr className="bg-[#111] text-[#aaa] text-left">
              <th className="p-3 border-b border-[#222]">Property</th>
              <th className="p-3 border-b border-[#222]">Value</th>
            </tr>
          </thead>
          <tbody className="text-[#ccc]">
            <tr className="border-b border-[#222]"><td className="p-3">Architecture</td><td className="p-3">Mixture-of-Experts (MoE)</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Total Parameters</td><td className="p-3 font-medium">295B</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Active Parameters</td><td className="p-3 font-medium text-emerald-400">21B</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">MTP Layer Parameters</td><td className="p-3">3.8B</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Layers</td><td className="p-3">80 + 1 MTP layer</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Experts</td><td className="p-3">192 experts, top-8 activated</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Attention</td><td className="p-3">64 heads, GQA, 8 KV heads, dim 128</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Hidden Size</td><td className="p-3">4,096</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Context Length</td><td className="p-3 font-medium">256K tokens</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">Vocabulary</td><td className="p-3">120,832</td></tr>
            <tr className="border-b border-[#222]"><td className="p-3">License</td><td className="p-3 text-emerald-400 font-medium">Apache 2.0</td></tr>
            <tr><td className="p-3">Deployment</td><td className="p-3">vLLM, SGLang, BF16</td></tr>
          </tbody>
        </table>
      </div>

      <h2>What Makes Hy3 Different</h2>

      <h3>1. Efficiency-to-Performance Ratio</h3>
      <p>
        The defining stat: 295B total but only 21B active. You get the knowledge breadth of a massive model with the inference cost of a mid-size one. Tencent claims it <strong>outperforms similarly-sized models and rivals open-source flagships with 2–5× more parameters</strong>. If true, this is the most compute-efficient frontier model available under Apache 2.0.
      </p>

      <h3>2. Agent-First Design</h3>
      <p>
        Hy3 was built after gathering feedback from <strong>50+ production products</strong>. The post-training pipeline emphasized agentic capabilities — tool use, multi-step reasoning, following complex instructions. This isn't a chat model that happens to do agents; it was designed for agent workloads from the start.
      </p>

      <h3>3. 256K Context with MoE Routing</h3>
      <p>
        Long-context MoE models have historically struggled with attention routing degradation over long sequences. Hy3's 256K window with 192 experts suggests Tencent solved the routing stability problem at scale — each token activates only 8 of 192 experts, keeping the KV cache manageable even at extreme lengths.
      </p>

      <h3>4. Apache 2.0 — No Strings</h3>
      <p>
        This is the killer feature for commercial adoption. No custom license, no "research only" restrictions, no output censorship clauses. Apache 2.0 means you can fine-tune, distill, deploy commercially, and build products on top — same license terms as Llama. For sovereign AI deployments and enterprise use, this removes the biggest friction point.
      </p>

      <h2>Why This Matters for the Open-Source Landscape</h2>
      <p>
        Hy3 lands in a competitive field: DeepSeek-V3, Qwen3, Llama-4, and Mistral Large all occupy the same "MoE frontier, Apache/MIT licensed" space. But Hy3's active parameter count (21B) is notably lower than DeepSeek-V3's (37B) and Llama-4's (varies by variant), which means <strong>lower inference cost per token</strong> for comparable quality.
      </p>
      <p>
        The 256K context window also puts it ahead of most Apache 2.0 competitors for agentic workloads that need to process large codebases, multi-document reasoning, or long conversation histories.
      </p>

      <h2>Deployment: Ready for Production</h2>
      <p>Hy3 ships with immediate support for:</p>
      <ul>
        <li><strong>vLLM</strong> — production-grade serving with PagedAttention</li>
        <li><strong>SGLang</strong> — structured generation for agent workflows</li>
        <li><strong>Fine-tuning</strong> — full recipe provided</li>
        <li><strong>Quantization</strong> — supported for edge deployment</li>
        <li><strong>Free API</strong> — 2-week trial via OpenRouter and Tencent's own endpoint</li>
      </ul>

      <h2>Relevance to Delta V</h2>
      <p>
        For sovereign AI deployments and agent architectures, Hy3 is immediately interesting:
      </p>
      <ul>
        <li><strong>Apache 2.0 + 21B active</strong> means you can run it locally on a single high-end GPU or modest cluster without licensing concerns.</li>
        <li><strong>Agent-first post-training</strong> aligns with our work on multi-agent systems, tool-augmented pipelines, and autonomous workflows.</li>
        <li><strong>256K context</strong> unlocks whole-codebase analysis, long-document reasoning, and persistent agent memory — all critical for production agent systems.</li>
      </ul>
      <p>
        We'll be testing Hy3 against our internal benchmarks for agent reliability, instruction following, and structured output quality.
      </p>

      <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 rounded">
        <p className="text-sm text-neutral-400">
          Sources: <a href="https://huggingface.co/tencent/Hy3" target="_blank" rel="noopener noreferrer" className="underline">Hugging Face: tencent/Hy3</a> · <a href="https://hy.tencent.com/research/hy3" target="_blank" rel="noopener noreferrer" className="underline">Tencent Hy Research</a> · <a href="https://x.com/TencentHunyuan/status/2074148098876768478" target="_blank" rel="noopener noreferrer" className="underline">@TencentHunyuan on X</a> · Announced July 6, 2026
        </p>
      </div>
    </BlogPostLayout>
  );
}
