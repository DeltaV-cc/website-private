'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Tutorials() {
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

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
        <div className="text-sm text-[var(--text-muted)] mb-4">@0x0SojalSec · July 2026</div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-[var(--accent-cyan)] transition-colors">Run Your Own Local RAG & Agent System: LangChain-Chatchat + Ollama</h2>

        <div className="prose prose-invert text-[var(--text-secondary)] max-w-none mb-6 text-sm">
          <p><strong className="text-[var(--text-primary)]">Stack:</strong> Streamlit UI + FastAPI backend + LangChain + Ollama models (Qwen2, Llama3, GLM-4).</p>
          <p><strong className="text-[var(--text-primary)]">Capability:</strong> Full offline RAG with knowledge base Q&A, Agent tools (search, database, arXiv), and multi-model support.</p>
          <p><strong className="text-[var(--text-primary)]">OpSec:</strong> 100% local — no API keys, no cloud. FAISS vector store on encrypted disk. Apache 2.0 + MIT stack.</p>
        </div>

        {!expanded2 && (
          <div className="flex items-center justify-between" onClick={() => { setExpanded2(true); setExpanded(false); }}>
            <div className="text-[var(--accent-cyan)] text-sm font-medium inline-flex items-center gap-1.5 cursor-pointer">
              View Full Tutorial & Setup Guide
              <span className="text-lg">↓</span>
            </div>
            <div className="text-xs text-[var(--text-muted)]">Step-by-Step · 5 Sections · OpSec Hardening</div>
          </div>
        )}

        {expanded2 && (
          <div className="mt-8 pt-8 border-t border-[var(--border-default)] space-y-8" onClick={e => e.stopPropagation()}>
            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Architecture</div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6 font-mono text-xs text-[var(--text-secondary)] whitespace-pre leading-relaxed">
{`Streamlit WebUI (localhost:8501)
        │
FastAPI Backend (localhost:7861)
   /chat  /knowledge_base  /agent  /tools
        │
   ┌────┼────┐
   ▼    ▼     ▼
Ollama  Xinference  LocalAI
:11434  :9997      :8080
   │
qwen2:7b  bge-m3  glm4:9b`}
              </div>
            </div>

            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Setup Steps</div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6 md:p-8 text-sm">
                <ol className="space-y-6">
                  {[
                    { step: '01', title: 'Install Ollama & Pull Models', content: ['Install Ollama from ollama.com.', 'Pull LLM: ollama pull qwen2:7b.', 'Pull embeddings: ollama pull bge-m3.'], code: 'ollama pull qwen2:7b\nollama pull bge-m3\nollama list  # verify' },
                    { step: '02', title: 'Install LangChain-Chatchat', content: ['Create isolated venv.', 'pip install langchain-chatchat -U.'], code: 'python -m venv ~/chatchat-env\nsource ~/chatchat-env/bin/activate\npip install langchain-chatchat -U' },
                    { step: '03', title: 'Configure Model Platform', content: ['Set default LLM + embedding model.', 'Register Ollama as model platform with API base.'], code: 'chatchat-config model --default_llm_model qwen2:7b\nchatchat-config model --default_embedding_model bge-m3\nchatchat-config model --set_model_platforms \'[{...}]\'' },
                    { step: '04', title: 'Initialize Knowledge Base', content: ['Point DATA_PATH to your documents folder.', 'Run chatchat-kb -r to index.'], code: 'chatchat-config basic --data_path ~/knowledge-base\nchatchat-kb -r' },
                    { step: '05', title: 'Launch & Use', content: ['Start API + WebUI with one command.', 'Open localhost:8501, upload docs, chat.', 'Enable Agent mode for multi-tool chaining.'], code: 'chatchat start -a\n# WebUI → http://localhost:8501\n# API  → http://localhost:7861' },
                  ].map((section) => (
                    <li key={section.step}>
                      <div className="font-mono text-[var(--accent-cyan)] text-xs mb-2">{section.step} — {section.title}</div>
                      <div className="text-[var(--text-secondary)] pl-4 space-y-1">
                        {section.content.map((line, i) => (<div key={i}>{line}</div>))}
                        {section.code && (<div className="font-mono text-xs bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--border-default)] text-[var(--text-primary)] mt-2 whitespace-pre-wrap">{section.code}</div>)}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">OpSec Hardening</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6">
                  <h4 className="font-semibold mb-3">Network Lockdown</h4>
                  <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
                    <li>Bind to 127.0.0.1 only (default)</li>
                    <li>Firewall block ports 8501, 7861</li>
                    <li>No telemetry — audit with grep</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6">
                  <h4 className="font-semibold mb-3">Data Sovereignty</h4>
                  <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
                    <li>FAISS vector store on encrypted volume</li>
                    <li>No external API calls at runtime</li>
                    <li>100% open-source stack (Apache 2.0 / MIT)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => setExpanded2(false)} className="text-sm px-6 py-2.5 border border-[var(--border-default)] hover:border-[var(--accent-cyan)]/30 rounded-full transition-all">Close Tutorial</button>
            </div>
          </div>
        )}
      </div>

      {/* Placeholder */}
      <div className="mt-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:p-8">
        <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-1">Source</div>
        <div className="text-sm text-[var(--text-muted)] mb-4">@cocktailpeanut · July 2026</div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-[var(--accent-cyan)] transition-colors">Transcribe Any Music to MIDI Locally: MuScriptor</h2>

        <div className="prose prose-invert text-[var(--text-secondary)] max-w-none mb-6 text-sm">
          <p><strong className="text-[var(--text-primary)]">Model:</strong> MuScriptor by Kyutai + Mirelo AI — decoder-only transformer, 170K songs trained, multi-instrument.</p>
          <p><strong className="text-[var(--text-primary)]">Variants:</strong> Small (103M, ~1GB RAM), Medium (307M), Large (1.4B). CPU-capable on all tiers.</p>
          <p><strong className="text-[var(--text-primary)]">Output:</strong> Per-instrument MIDI with streaming note events, importable into any DAW.</p>
          <p><strong className="text-[var(--text-primary)]">Launcher:</strong> 1-click Pinokio app (zero terminal) or native Python CLI with FastAPI server.</p>
        </div>

        {!expanded3 && (
          <div className="flex items-center justify-between" onClick={() => { setExpanded3(true); setExpanded(false); setExpanded2(false); }}>
            <div className="text-[var(--accent-cyan)] text-sm font-medium inline-flex items-center gap-1.5 cursor-pointer">
              View Full Tutorial & Setup Guide
              <span className="text-lg">↓</span>
            </div>
            <div className="text-xs text-[var(--text-muted)]">2 Methods · Model Comparison · API Reference</div>
          </div>
        )}

        {expanded3 && (
          <div className="mt-8 pt-8 border-t border-[var(--border-default)] space-y-8" onClick={e => e.stopPropagation()}>
            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Model Comparison</div>
              <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--bg-deep)] text-[var(--text-muted)] text-xs uppercase">
                    <tr><th className="px-4 py-3">Variant</th><th className="px-4 py-3">Params</th><th className="px-4 py-3">RAM</th><th className="px-4 py-3">Speed</th><th className="px-4 py-3">Best For</th></tr>
                  </thead>
                  <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">Small</td><td className="px-4 py-2.5">103M</td><td className="px-4 py-2.5">~1 GB</td><td className="px-4 py-2.5 text-[var(--accent-green)]">Fastest</td><td className="px-4 py-2.5">CPU-only, laptops</td></tr>
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">Medium</td><td className="px-4 py-2.5">307M</td><td className="px-4 py-2.5">~2 GB</td><td className="px-4 py-2.5 text-[var(--accent-cyan)]">Balanced</td><td className="px-4 py-2.5">Default choice</td></tr>
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">Large</td><td className="px-4 py-2.5">1.4B</td><td className="px-4 py-2.5">~8 GB</td><td className="px-4 py-2.5 text-[var(--accent-amber)]">Slow</td><td className="px-4 py-2.5">Max accuracy, GPU</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Method 1: Pinokio 1-Click (Easiest)</div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6 text-sm">
                <ol className="space-y-4">
                  <li><span className="font-semibold">Install Pinokio</span> from pinokio.co (Mac/Win/Linux)</li>
                  <li><span className="font-semibold">Search "MuScriptor"</span> in the app store, click Install</li>
                  <li><span className="font-semibold">Click Start Small/Medium/Large</span> — downloads model, starts server, opens Web UI</li>
                  <li><span className="font-semibold">Drop audio file</span> → optionally select instruments → download MIDI or WAV</li>
                </ol>
                <div className="mt-4 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-xs text-[var(--text-tertiary)]">
                  Pinokio handles: Python env, dependencies, web client build, model caching. No terminal needed. No HF login required (uses ungated mirrors).
                </div>
              </div>
            </div>

            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">Method 2: Native Python (Full Control)</div>
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-6 text-sm">
                <ol className="space-y-4">
                  <li><span className="font-semibold">Auth with HF:</span> Accept license at huggingface.co/MuScriptor, run <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">uvx hf auth login</code></li>
                  <li><span className="font-semibold">Web UI:</span> <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">uvx muscriptor serve</code> → opens browser at localhost:8000</li>
                  <li><span className="font-semibold">CLI:</span> <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">uvx muscriptor transcribe audio.wav --model medium</code></li>
                  <li><span className="font-semibold">Python API:</span> <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">model.transcribe_to_midi("audio.wav")</code> for automation</li>
                </ol>
              </div>
            </div>

            <div>
              <div className="text-[var(--accent-cyan)] text-[10px] font-semibold tracking-[2px] uppercase mb-3">HTTP API Endpoints</div>
              <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--bg-deep)] text-[var(--text-muted)] text-xs uppercase">
                    <tr><th className="px-4 py-3">Endpoint</th><th className="px-4 py-3">Method</th><th className="px-4 py-3">Description</th></tr>
                  </thead>
                  <tbody className="text-[var(--text-secondary)] font-mono text-xs">
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5">/health</td><td className="px-4 py-2.5"><span className="text-[var(--accent-green)]">GET</span></td><td className="px-4 py-2.5">Server status check</td></tr>
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5">/instruments</td><td className="px-4 py-2.5"><span className="text-[var(--accent-green)]">GET</span></td><td className="px-4 py-2.5">List valid instrument names</td></tr>
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5">/transcribe</td><td className="px-4 py-2.5"><span className="text-[var(--accent-amber)]">POST</span></td><td className="px-4 py-2.5">Upload audio, stream SSE events → MIDI</td></tr>
                    <tr className="border-t border-[var(--border-default)]"><td className="px-4 py-2.5">/auralize</td><td className="px-4 py-2.5"><span className="text-[var(--accent-amber)]">POST</span></td><td className="px-4 py-2.5">Render MIDI → WAV (FluidSynth)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => setExpanded3(false)} className="text-sm px-6 py-2.5 border border-[var(--border-default)] hover:border-[var(--accent-cyan)]/30 rounded-full transition-all">Close Tutorial</button>
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
