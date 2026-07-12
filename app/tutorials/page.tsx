'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Tutorials() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] transition-colors mb-8 group">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5">
          <path d="M10 7H3M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to home
      </Link>

      <div className="mb-12">
        <div className="text-[var(--accent-cyan)] text-xs font-semibold tracking-[3px] uppercase mb-3">Resources</div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-2px] mb-4">Tutorials & Technical Resources</h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          High-signal technical breakdowns with clear architecture and setup details.
        </p>
      </div>

      {/* Tutorial 1 */}
      <div
        className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8 cursor-pointer hover:border-[var(--accent-cyan)]/25 transition-all group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-1">Source</div>
        <div className="text-sm text-[var(--text-muted)] mb-4">leopardracer · June 2026</div>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-[var(--accent-cyan)] transition-colors">Hermes + Qwen 3.6 + NVIDIA DGX Spark: The Local AI Convergence</h2>

        <div className="prose prose-invert text-[var(--text-secondary)] max-w-none mb-6 text-sm">
          <p><strong className="text-[var(--text-primary)]">Hardware:</strong> NVIDIA DGX Spark (128GB unified memory, 1 petaflop) — purpose-built for 24/7 local agent operation.</p>
          <p><strong className="text-[var(--text-primary)]">Models:</strong> Qwen 3.6 (Alibaba) — strong open-weight performance with low VRAM requirements.</p>
          <p><strong className="text-[var(--text-primary)]">Agent Framework:</strong> Hermes Agent — self-evolving skills, 3-layer memory, OpenShell sandbox.</p>
          <p><strong className="text-[var(--text-primary)]">Key Architecture:</strong> Self-evolving loop + full local execution with no external data sharing.</p>
        </div>

        <div className="border border-[var(--border-default)] rounded-xl overflow-hidden mb-4">
          <img
            src="/website-private/images/hermes-qwen-dgx-stack.jpg"
            alt="Hermes + Qwen 3.6 Local AI Stack on DGX Spark"
            className="w-full h-auto"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[var(--accent-cyan)] text-sm font-medium inline-flex items-center gap-1.5">
            {expanded ? 'Hide Full Tutorial' : 'View Full Tutorial & Setup Guide'}
            <span className="text-lg transition-transform">{expanded ? '↑' : '↓'}</span>
          </div>
          <div className="text-xs text-[var(--text-muted)]">Software + Hardware Summary · Step-by-Step Setup</div>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-8 pt-8 border-t border-[var(--border-default)] space-y-8" onClick={e => e.stopPropagation()}>
            {/* Software Summary */}
            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Software Summary</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6">
                  <h4 className="font-semibold mb-3">Qwen 3.6 Model</h4>
                  <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
                    <li>35B full precision or 27B quantized variant</li>
                    <li>Runs efficiently on ~20GB VRAM</li>
                    <li>Excellent reasoning and tool-use capabilities</li>
                    <li>Fully open-weight (Alibaba)</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6">
                  <h4 className="font-semibold mb-3">Hermes Agent Framework</h4>
                  <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
                    <li>3-layer persistent memory system</li>
                    <li>Self-evolving loop without human intervention</li>
                    <li>NVIDIA OpenShell sandbox for safe execution</li>
                    <li>Skills auto-improve over time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Hardware Summary */}
            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Hardware Summary</div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-[var(--text-muted)] mb-1">Device</div>
                    <div className="font-semibold text-[var(--text-primary)]">NVIDIA DGX Spark</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] mb-1">Memory</div>
                    <div className="font-semibold text-[var(--text-primary)]">128GB Unified</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-muted)] mb-1">Performance</div>
                    <div className="font-semibold text-[var(--text-primary)]">1 Petaflop</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Setup Tutorial */}
            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Setup Tutorial</div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6 md:p-8 text-sm">
                <div className="mb-6 text-[var(--text-tertiary)] italic text-xs">
                  Verified signals from high-quality sources cross-referenced with hardware specs, model cards, framework docs, and real deployment patterns.
                </div>

                <ol className="space-y-6">
                  {[
                    { step: '01', title: 'Hardware & Base Environment', content: ['Confirm DGX Spark provisioned with 128GB unified memory.', 'Install latest NVIDIA drivers + CUDA 12.4+ toolkit.', 'Set up dedicated user + persistent storage volume.'], code: 'nvidia-smi  # verify 128GB and CUDA version' },
                    { step: '02', title: 'Install Hermes Agent Core', content: ['Clone repository into /opt/hermes or preferred path.', 'Install dependencies and create Python environment.'], code: 'git clone https://github.com/.../hermes-agent.git\ncd hermes-agent && uv venv && source .venv/bin/activate' },
                    { step: '03', title: 'Configure 3-Layer Memory System', content: ['Edit config.yaml to enable memory layers.'], code: 'memory:\n  short_term: true\n  long_term: true\n  skills: true' },
                    { step: '04', title: 'Deploy Qwen 3.6 Model', content: ['Choose variant: 35B (full) or 27B (quantized).', 'Use Ollama or llama.cpp backend.'], code: 'ollama run qwen3.6:27b-q4' },
                    { step: '05', title: 'Enable NVIDIA OpenShell Sandbox', content: ['Restrict execution to sandbox only.'], code: 'tools:\n  open_shell: enabled\n  sandbox_mode: strict' },
                    { step: '06', title: 'Activate Self-Evolving Loop', content: ['Enable core loop in agent runtime.'], code: 'loop:\n  enabled: true\n  stages: [observe, reflect, tool_use, code_gen, deploy]' },
                    { step: '07', title: 'Initial Skill Seeding & Testing', content: ['Seed with 3–5 core skills.', 'Run controlled test task.', 'Monitor memory growth and loop iterations.'] },
                    { step: '08', title: 'Security & OpSec Hardening', content: ['Disable all external telemetry.', 'Set strict firewall rules.', 'Verify zero data leakage.'] },
                  ].map((section) => (
                    <li key={section.step}>
                      <div className="font-mono text-[var(--accent-cyan)] text-xs mb-2">{section.step} — {section.title}</div>
                      <div className="text-[var(--text-secondary)] pl-4 space-y-1">
                        {section.content.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                        {section.code && (
                          <div className="font-mono text-xs bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--border-default)] text-[var(--text-primary)] mt-2 whitespace-pre-wrap">{section.code}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 pt-6 border-t border-[var(--border-default)]">
                  <div className="font-semibold text-[var(--text-primary)] mb-2 text-sm">Verification Checklist</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--text-secondary)]">
                    <li>Model loads within target VRAM</li>
                    <li>3 memory layers persist across restarts</li>
                    <li>Self-evolving loop produces improved skill within 24h</li>
                    <li>No outbound connections except intentional tool use</li>
                    <li>Agent safely executes code inside OpenShell sandbox</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setExpanded(false)}
                className="text-sm px-6 py-2.5 border border-[var(--border-default)] hover:border-[var(--accent-cyan)]/30 rounded-full transition-all"
              >
                Close Tutorial
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Placeholder */}
      <div className="mt-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8">
        <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-1">Source</div>
        <div className="text-sm text-[var(--text-muted)] mb-4">Coming soon</div>
        <h2 className="text-2xl font-semibold mb-4">Next High-Signal Resource</h2>
        <p className="text-[var(--text-tertiary)]">Summary with hardware, software, architecture, and OpSec details will be added here.</p>
      </div>
    </div>
  );
}
