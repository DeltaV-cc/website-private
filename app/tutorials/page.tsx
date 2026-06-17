'use client';

import { useState } from 'react';

export default function Tutorials() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <a href="/" className="text-[#00f0ff] text-sm hover:underline">← Back to home</a>

        <h1 className="text-6xl font-semibold tracking-[-2px] mt-4 mb-2">Tutorials & Technical Resources</h1>
        <p className="text-xl text-[#aaa] max-w-2xl">High-signal technical breakdowns with clear architecture and setup details.</p>

        {/* Entry 1 - Clickable Tutorial */}
        <div 
          className="mt-12 border border-[#222] rounded-2xl p-8 cursor-pointer hover:border-[#00f0ff] transition-all"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="text-[#00f0ff] text-xs tracking-[2px] mb-1">SOURCE</div>
          <div className="text-sm text-[#666] mb-4">leopardracer • June 2026</div>

          <h2 className="text-3xl font-semibold mb-4">Hermes + Qwen 3.6 + NVIDIA DGX Spark: The Local AI Convergence</h2>

          <div className="prose prose-invert text-[#aaa] max-w-none mb-6">
            <p><strong>Hardware:</strong> NVIDIA DGX Spark (128GB unified memory, 1 petaflop) — purpose-built for 24/7 local agent operation.</p>
            <p><strong>Models:</strong> Qwen 3.6 (Alibaba) — strong open-weight performance with low VRAM requirements.</p>
            <p><strong>Agent Framework:</strong> Hermes Agent — self-evolving skills, 3-layer memory, OpenShell sandbox.</p>
            <p><strong>Key Architecture:</strong> Self-evolving loop + full local execution with no external data sharing.</p>
          </div>

          <div className="text-sm text-[#00f0ff] mb-2">Visual Architecture</div>
          <div className="border border-[#333] rounded-xl overflow-hidden mb-4">
            <img 
              src="/images/hermes-qwen-dgx-stack.jpg" 
              alt="Hermes + Qwen 3.6 Local AI Stack on DGX Spark - Technical Blueprint" 
              className="w-full h-auto"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-[#00f0ff] text-sm font-medium flex items-center gap-2">
              {expanded ? 'Hide Full Tutorial' : 'Click to view Full Tutorial & Setup Guide'} 
              <span className="text-lg">{expanded ? '↑' : '↓'}</span>
            </div>
            <div className="text-xs text-[#666]">Software + Hardware Summary • Step-by-Step Setup</div>
          </div>

          {/* Expanded Content - Summary (Soft/Hard) + Setup Tutorial */}
          {expanded && (
            <div className="mt-8 pt-8 border-t border-[#333] space-y-8" onClick={e => e.stopPropagation()}>
              
              {/* Software Summary */}
              <div>
                <div className="text-[#00f0ff] text-xs tracking-[2px] mb-3">SOFTWARE SUMMARY</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                    <h4 className="font-semibold mb-3 text-lg">Qwen 3.6 Model</h4>
                    <ul className="text-[#aaa] space-y-2 text-sm">
                      <li>• 35B full precision or 27B quantized variant</li>
                      <li>• Runs efficiently on ~20GB VRAM</li>
                      <li>• Excellent reasoning and tool-use capabilities</li>
                      <li>• Fully open-weight (Alibaba)</li>
                    </ul>
                  </div>
                  <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                    <h4 className="font-semibold mb-3 text-lg">Hermes Agent Framework</h4>
                    <ul className="text-[#aaa] space-y-2 text-sm">
                      <li>• 3-layer persistent memory system</li>
                      <li>• Self-evolving loop: Observe → Reflect → Tool Use → Code Generation → Deploy</li>
                      <li>• NVIDIA OpenShell sandbox for safe execution</li>
                      <li>• Skills auto-improve over time without human intervention</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hardware Summary */}
              <div>
                <div className="text-[#00f0ff] text-xs tracking-[2px] mb-3">HARDWARE SUMMARY</div>
                <div className="bg-[#111] border border-[#222] rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <div className="text-[#666] mb-1">Device</div>
                      <div className="font-semibold">NVIDIA DGX Spark</div>
                    </div>
                    <div>
                      <div className="text-[#666] mb-1">Memory</div>
                      <div className="font-semibold">128GB Unified Memory</div>
                    </div>
                    <div>
                      <div className="text-[#666] mb-1">Performance</div>
                      <div className="font-semibold">1 Petaflop</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#222] text-[#aaa] text-sm">
                    Purpose-built workstation for continuous local AI agent operation with massive unified memory for large context windows and multi-agent workloads.
                  </div>
                </div>
              </div>

              {/* Thorough Setup Tutorial */}
              <div>
                <div className="text-[#00f0ff] text-xs tracking-[2px] mb-3">SETUP TUTORIAL</div>
                <div className="bg-[#111] border border-[#222] rounded-xl p-8 text-sm">
                  
                  <div className="mb-6 text-[#888] italic">
                    This guide combines verified signals from high-quality sources with practical engineering. 
                    When sources are incomplete (the common case), we cross-reference hardware specs, model cards, 
                    framework docs, and real deployment patterns to build a reliable path.
                  </div>

                  <ol className="space-y-8">
                    {/* Step 1 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">01 — Hardware & Base Environment</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Confirm DGX Spark is provisioned with 128GB unified memory and 1 petaflop capability.</div>
                        <div>• Install latest NVIDIA drivers + CUDA 12.4+ toolkit.</div>
                        <div className="font-mono text-xs bg-[#0a0a0a] p-2 rounded">nvidia-smi  # verify 128GB and CUDA version</div>
                        <div>• Set up a dedicated user + persistent storage volume for models and memory logs.</div>
                        <div className="text-[#666] text-xs">Pitfall: Unified memory on DGX Spark behaves differently from discrete VRAM — test large context windows early.</div>
                      </div>
                    </li>

                    {/* Step 2 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">02 — Install Hermes Agent Core</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Clone the Hermes repository into <span className="font-mono">/opt/hermes</span> or your preferred persistent path.</div>
                        <div>• Install dependencies and create a dedicated Python environment.</div>
                        <div className="font-mono text-xs bg-[#0a0a0a] p-2 rounded">git clone https://github.com/.../hermes-agent.git<br />cd hermes-agent && uv venv && source .venv/bin/activate</div>
                        <div>• Copy the default <span className="font-mono">config.yaml</span> and set <span className="font-mono">MEMORY_PATH</span> and <span className="font-mono">OUTPUT_PATH</span> to your persistent volume.</div>
                      </div>
                    </li>

                    {/* Step 3 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">03 — Configure 3-Layer Memory System</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Edit <span className="font-mono">config.yaml</span> to enable the three memory layers:</div>
                        <div className="font-mono text-xs bg-[#0a0a0a] p-2 rounded">memory:<br />  short_term: true<br />  long_term: true<br />  skills: true<br />  retrieval_depth: 20</div>
                        <div>• Set <span className="font-mono">SCHEDULER_TIMEZONE</span> and enable <span className="font-mono">SKILLS_WATCH: true</span> for the self-evolving loop.</div>
                      </div>
                    </li>

                    {/* Step 4 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">04 — Deploy Qwen 3.6 Model</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Choose variant: 35B (full) or 27B (quantized for lower VRAM).</div>
                        <div>• Recommended: Use Ollama or llama.cpp backend for best compatibility.</div>
                        <div className="font-mono text-xs bg-[#0a0a0a] p-2 rounded">ollama run qwen3.6:27b-q4  # or equivalent GGUF</div>
                        <div>• Target memory footprint: ~18–22GB to leave headroom for Hermes memory layers.</div>
                        <div className="text-[#666] text-xs">Verification: Run a small inference test and monitor with nvidia-smi.</div>
                      </div>
                    </li>

                    {/* Step 5 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">05 — Enable NVIDIA OpenShell Sandbox</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Install and configure OpenShell integration in Hermes.</div>
                        <div>• Restrict execution to the sandbox only — never allow direct host shell access.</div>
                        <div className="font-mono text-xs bg-[#0a0a0a] p-2 rounded"># In hermes config<br />tools:<br />  open_shell: enabled<br />  sandbox_mode: strict</div>
                      </div>
                    </li>

                    {/* Step 6 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">06 — Activate Self-Evolving Loop</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Enable the core loop in the agent runtime:</div>
                        <div className="font-mono text-xs bg-[#0a0a0a] p-2 rounded">loop:<br />  enabled: true<br />  stages: [observe, reflect, tool_use, code_gen, deploy]</div>
                        <div>• Set a daily cron or internal scheduler to trigger skill improvement cycles.</div>
                        <div className="text-[#666] text-xs">Note: This is where most of the "magic" happens. Start with conservative limits before going fully autonomous.</div>
                      </div>
                    </li>

                    {/* Step 7 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">07 — Initial Skill Seeding & Testing</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Seed the agent with 3–5 core skills (file ops, web search, code execution).</div>
                        <div>• Run a controlled test task (e.g., “research and summarize latest Qwen releases”).</div>
                        <div>• Monitor memory growth and loop iterations in the logs.</div>
                      </div>
                    </li>

                    {/* Step 8 */}
                    <li>
                      <div className="font-mono text-[#00f0ff] mb-1">08 — Security & OpSec Hardening</div>
                      <div className="text-[#aaa] pl-8 space-y-2">
                        <div>• Disable all external telemetry and logging to third parties.</div>
                        <div>• Set strict firewall rules — only allow outbound on necessary ports.</div>
                        <div>• Verify zero data leakage by inspecting network activity during a full loop cycle.</div>
                      </div>
                    </li>
                  </ol>

                  <div className="mt-8 pt-6 border-t border-[#333] text-[#aaa]">
                    <div className="font-semibold mb-2">Verification Checklist</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Model loads within target VRAM</li>
                      <li>3 memory layers persist across restarts</li>
                      <li>Self-evolving loop produces at least one improved skill within 24h</li>
                      <li>No outbound connections except for intentional tool use</li>
                      <li>Agent can safely execute code inside OpenShell sandbox</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <button 
                  onClick={() => setExpanded(false)}
                  className="text-sm px-6 py-2 border border-[#333] hover:border-[#00f0ff] rounded-full transition-all"
                >
                  Close Tutorial
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Entry 2 - Placeholder */}
        <div className="mt-8 border border-[#222] rounded-2xl p-8">
          <div className="text-[#00f0ff] text-xs tracking-[2px] mb-1">SOURCE</div>
          <div className="text-sm text-[#666] mb-4">Coming soon</div>
          <h2 className="text-3xl font-semibold mb-4">Next High-Signal Resource</h2>
          <p className="text-[#aaa]">Summary with hardware, software, architecture, and OpSec details will be added here.</p>
        </div>
      </div>
    </div>
  );
}
