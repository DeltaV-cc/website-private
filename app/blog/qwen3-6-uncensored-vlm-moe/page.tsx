'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
export default function QwenPost() {
  return (
    <BlogPostLayout
      title="Qwen3.6-35B-A3B: Uncensored VLM Meets MoE Efficiency"
      date="June 22, 2026"
      category="AI"
      type="Thought"
      readingTime="5 min read"
      excerpt="Alibaba&apos;s latest drops with 35B total parameters but only 3B active — and zero refusal filters. What this means for local-first, sovereign multimodal AI."
      sourceLabel="Hugging Face Model Release"
      sourceUrl="https://x.com/HuggingModels/status/2069124265107145193"
    >
      <p>
        On June 22, the Hugging Face model release bot flagged <a href="https://huggingface.co/QwenLM" className="text-[#00f0ff] hover:underline">QwenLM</a>&apos;s latest:{' '}
        a 35 billion parameter Mixture-of-Experts vision-language model with only 3 billion active parameters per token.{' '}
        The model card is minimal. The community response is not — 5.5K views and climbing in hours.
      </p>

      <p>
        The headline feature is the &ldquo;uncensored&rdquo; label. In practice, this means the model has not been fine-tuned
        with refusal guardrails — it will answer prompts that aligned models typically reject. For security researchers,
        opsec engineers, and anyone building autonomous agents that need to evaluate risky scenarios without
        a safety filter second-guessing the analysis, this is a meaningful tool.
      </p>

      {/* Architecture specs card */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-6 my-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Params', value: '35B · 3B active' },
          { label: 'Architecture', value: 'MoE Vision-Language' },
          { label: 'Alignment', value: 'None (uncensored)' },
          { label: 'Inference', value: 'Consumer GPU viable' },
          { label: 'License', value: 'MIT' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xs text-[#666] uppercase tracking-[1px] mb-1">{stat.label}</div>
            <div className="text-sm font-medium text-[#ededed]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Architecture diagram */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-6 md:p-8 my-8 overflow-x-auto">
        <svg viewBox="0 0 800 380" className="w-full max-w-[800px] mx-auto h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#222" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2"/>
            </linearGradient>
            <linearGradient id="activeExpert" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="inactiveExpert" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#333" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#222" stopOpacity="0.1"/>
            </linearGradient>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#00f0ff"/>
            </marker>
            <marker id="arrowGray" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#555"/>
            </marker>
          </defs>

          {/* Background fill */}
          <rect width="800" height="380" fill="url(#grid)" rx="12"/>

          {/* Section labels */}
          <text x="400" y="30" textAnchor="middle" fill="#00f0ff" fontSize="11" fontFamily="monospace" letterSpacing="2" opacity="0.6">MOE ARCHITECTURE</text>

          {/* === INPUT === */}
          <rect x="30" y="110" width="80" height="40" rx="6" fill="#1a1a1a" stroke="#555" strokeWidth="1.2"/>
          <text x="70" y="134" textAnchor="middle" fill="#ededed" fontSize="11" fontFamily="system-ui" fontWeight="600">Input Token</text>

          {/* Arrow Router → */}
          <line x1="110" y1="130" x2="165" y2="130" stroke="#00f0ff" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity="0.7"/>

          {/* === ROUTER === */}
          <rect x="165" y="100" width="90" height="60" rx="8" fill="#0d1f22" stroke="#00f0ff" strokeWidth="1.5"/>
          <text x="210" y="120" textAnchor="middle" fill="#00f0ff" fontSize="11" fontFamily="system-ui" fontWeight="600">Router</text>
          <text x="210" y="138" textAnchor="middle" fill="#00f0ff/70" fontSize="8" fontFamily="monospace" opacity="0.6">Top-2 routing</text>

          {/* Router → Experts — active paths (cyan) and inactive (gray) */}
          {/* Active: Expert 3 */}
          <line x1="255" y1="115" x2="370" y2="80" stroke="#00f0ff" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity="0.8"/>
          {/* Active: Expert 5 */}
          <line x1="255" y1="130" x2="370" y2="140" stroke="#00f0ff" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity="0.8"/>
          {/* Active label */}
          <text x="310" y="55" textAnchor="middle" fill="#00f0ff" fontSize="8" fontFamily="monospace" opacity="0.5">Top-2 active</text>

          {/* Inactive paths */}
          <line x1="255" y1="140" x2="370" y2="200" stroke="#555" strokeWidth="0.8" opacity="0.3" markerEnd="url(#arrowGray)"/>
          <line x1="255" y1="148" x2="370" y2="260" stroke="#555" strokeWidth="0.8" opacity="0.3" markerEnd="url(#arrowGray)"/>
          <line x1="255" y1="155" x2="370" y2="320" stroke="#555" strokeWidth="0.8" opacity="0.3" markerEnd="url(#arrowGray)"/>

          {/* === EXPERTS STACK === */}
          <text x="400" y="62" textAnchor="middle" fill="#666" fontSize="9" fontFamily="monospace" letterSpacing="1">EXPERTS LAYER (2 of ~24 active per token)</text>

          {/* Expert 1 - inactive */}
          <rect x="370" y="190" width="120" height="40" rx="6" fill="url(#inactiveExpert)" stroke="#333" strokeWidth="1" opacity="0.5"/>
          <text x="430" y="214" textAnchor="middle" fill="#555" fontSize="9" fontFamily="system-ui">Expert 1</text>

          {/* Expert 2 - inactive */}
          <rect x="370" y="250" width="120" height="40" rx="6" fill="url(#inactiveExpert)" stroke="#333" strokeWidth="1" opacity="0.5"/>
          <text x="430" y="274" textAnchor="middle" fill="#555" fontSize="9" fontFamily="system-ui">Expert 2</text>

          {/* Expert 3 = active (cyan highlight) */}
          <rect x="370" y="65" width="120" height="45" rx="6" fill="url(#activeExpert)" stroke="#00f0ff" strokeWidth="1.5"/>
          <text x="430" y="82" textAnchor="middle" fill="#00f0ff" fontSize="10" fontFamily="system-ui" fontWeight="600">Expert 3</text>
          <text x="430" y="96" textAnchor="middle" fill="#00f0ff/60" fontSize="8" fontFamily="monospace">~1.5B params</text>

          {/* Expert 4 - inactive */}
          <rect x="370" y="310" width="120" height="40" rx="6" fill="url(#inactiveExpert)" stroke="#333" strokeWidth="1" opacity="0.5"/>
          <text x="430" y="334" textAnchor="middle" fill="#555" fontSize="9" fontFamily="system-ui">...</text>

          {/* Expert 5 = active */}
          <rect x="370" y="125" width="120" height="45" rx="6" fill="url(#activeExpert)" stroke="#00f0ff" strokeWidth="1.5"/>
          <text x="430" y="142" textAnchor="middle" fill="#00f0ff" fontSize="10" fontFamily="system-ui" fontWeight="600">Expert 5</text>
          <text x="430" y="156" textAnchor="middle" fill="#00f0ff/60" fontSize="8" fontFamily="monospace">~1.5B params</text>

          {/* Dots for more experts */}
          <text x="430" y="242" textAnchor="middle" fill="#444" fontSize="8">•</text>
          <text x="430" y="302" textAnchor="middle" fill="#444" fontSize="8">•</text>

          {/* === COMBINATION === */}
          {/* Expert outputs → combiner */}
          <line x1="490" y1="87" x2="560" y2="125" stroke="#00f0ff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#arrowhead)"/>
          <line x1="490" y1="147" x2="560" y2="135" stroke="#00f0ff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#arrowhead)"/>

          {/* Combine block */}
          <rect x="560" y="100" width="90" height="60" rx="8" fill="#0d1f22" stroke="#f59e0b" strokeWidth="1.5"/>
          <text x="605" y="120" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="system-ui" fontWeight="600">Combine</text>
          <text x="605" y="138" textAnchor="middle" fill="#f59e0b/60" fontSize="8" fontFamily="monospace">weighted sum</text>

          {/* Arrow to output */}
          <line x1="650" y1="130" x2="710" y2="130" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowhead)" opacity="0.7"/>

          {/* === OUTPUT === */}
          <rect x="710" y="110" width="70" height="40" rx="6" fill="#1a1a1a" stroke="#f59e0b" strokeWidth="1.5"/>
          <text x="745" y="134" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="system-ui" fontWeight="600">Output</text>

          {/* Annotation: active */}
          <rect x="275" y="165" width="85" height="22" rx="4" fill="#00f0ff" fillOpacity="0.08" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.3"/>
          <text x="317" y="179" textAnchor="middle" fill="#00f0ff" fontSize="8" fontFamily="monospace" opacity="0.7">3B active ✓</text>

          {/* Annotation: total */}
          <rect x="275" y="190" width="85" height="22" rx="4" fill="#666" fillOpacity="0.08" stroke="#666" strokeWidth="0.5" strokeOpacity="0.3"/>
          <text x="317" y="204" textAnchor="middle" fill="#666" fontSize="8" fontFamily="monospace">35B total</text>
        </svg>

        <p className="text-center text-[10px] text-[#555] mt-2 font-mono">
          Mixture of Experts — Router activates 2 of many experts per token (3B / 35B active)
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-4">Architecture at a Glance</h2>

      <p>
        The MoE ratio here is striking: ~8.6% active parameters. That is an unusually sparse allocation,{' '}
        suggesting aggressive expert routing. For comparison, Mixtral 8x7B runs ~13B active out of 47B total{' '}
        (~28% active). Qwen3.6-35B-A3B achieves roughly a 3x efficiency improvement in the active-to-total ratio.
      </p>

      <p>
        This matters because 3B active parameters can run comfortably on a single RTX 4090 (24GB) or{' '}
        even an M4 Max MacBook Pro with 48GB unified memory. The 35B total means the model has significant{' '}
        representational capacity — it just doesn&apos;t pay the full activation cost on every token.
      </p>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-4">Why &ldquo;Uncensored&rdquo; Matters for OpSec</h2>

      <p>
        There is a legitimate category of use cases where refusal filters are harmful: penetration testing{' '}
        of AI systems, red-team analysis, adversarial robustness evaluation, and threat intelligence{' '}
        synthesis from messy or violent source material. A model that refuses to engage with these topics{' '}
        is not safer — it is less capable for the people who need to understand them.
      </p>

      <div className="bg-[#0d0d0d] border-l-2 border-[#C2410C] rounded-r-xl p-5 my-8">
        <p className="text-sm text-[#aaa]">
          <strong className="text-[#C2410C]">The sovereign AI position:</strong> The human stays in the loop for judgment calls,{' '}
          not the safety filter. An uncensored model processes the input and returns its best answer;{' '}
          the operator decides what to do with it.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-4">Local-First Deployment</h2>

      <p>
        The 3B active parameter count makes this one of the most capable uncensored VLMs that can{' '}
        realistically run fully offline. For teams operating under opsec constraints where no API call{' '}
        to a third party is acceptable — air-gapped environments, intelligence analysis, classified{' '}
        document processing — this is significant.
      </p>

      <p>
        Loading the model in 4-bit quantization would bring memory requirements down to roughly{' '}
        6-8GB for the active parameters, well within range of edge hardware or a laptop GPU.
      </p>

      <h2 className="text-2xl font-semibold text-[#ededed] mt-12 mb-4">What to Watch</h2>

      <p>Three open questions worth tracking:</p>

      <div className="space-y-4 my-6">
        {[
          {
            title: 'Benchmark performance',
            desc: 'The model card is sparse on numbers. Independent evals on MMLU, MMMU, and vision-language benchmarks will determine whether the MoE efficiency comes with a capability tax.',
          },
          {
            title: 'Expert specialization',
            desc: 'With 35B total and 3B active, the expert count per layer is unusually high. How well the router allocates across modalities (image vs. text) will reveal whether the architecture is multimodal-optimized or general-purpose.',
          },
          {
            title: 'Community fine-tunes',
            desc: 'An uncensored base model invites community adaptation. Within weeks we will likely see specialized variants for coding, security analysis, and document parsing.',
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-4">
            <span className="w-6 h-6 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
            </span>
            <div>
              <strong className="text-[#ededed]">{item.title}</strong>
              <p className="text-[#aaa] mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[#666] text-sm pt-8 border-t border-[#222]">
        Qwen3.6-35B-A3B is available under MIT license on Hugging Face. Delta V does not endorse{' '}
        or oppose uncensored models — we analyze their utility for specific engineering contexts{' '}
        and opsec requirements.
      </p>
    </BlogPostLayout>
  );
}
