import BlogPostLayout from '@/components/BlogPostLayout';
import ArchitectureDiagram, { ArchitectureFlow } from '@/app/components/ArchitectureDiagram';

export default function HermesQwenDgxTutorial() {
  return (
    <BlogPostLayout
      title="Hermes + Qwen 3.6 + NVIDIA DGX Spark: The Local AI Convergence"
      date="June 2026"
      category="AI"
      type="Tutorial"
      backHref="/tutorials/"
      backLabel="All tutorials"
      readingTime="8 min read"
      excerpt="A 24/7 local agent stack: NVIDIA DGX Spark (128GB), Qwen 3.6, and the self-evolving Hermes Agent framework with a 3-layer memory and an OpenShell sandbox — full local execution, no external data sharing."
    >
      <ArchitectureDiagram
        title="Hermes + Qwen 3.6 Local AI Stack"
        subtitle="on NVIDIA DGX Spark · full local execution · no external data sharing"
        layers={[
          {
            id: 'hardware',
            label: 'Hardware layer',
            accent: 'cyan',
            nodes: [
              { title: 'NVIDIA DGX Spark', subtitle: '128GB unified memory · 1 petaflop', accent: 'cyan' },
              { title: '24/7 local operation', subtitle: 'Purpose-built for agent workloads' },
              { title: 'Massive context windows', subtitle: 'Multi-agent + long-running tasks' },
            ],
          },
          {
            id: 'model',
            label: 'Model layer',
            accent: 'purple',
            nodes: [
              { title: 'Qwen 3.6 (Alibaba)', subtitle: '35B full / 27B quantized · ~20GB VRAM', accent: 'purple' },
              { title: 'Strong reasoning', subtitle: 'Excellent tool-use & coding' },
              { title: 'Fully open-weight', subtitle: 'No external model APIs required' },
            ],
          },
          {
            id: 'hermes',
            label: 'Hermes agent framework',
            accent: 'amber',
            nodes: [
              {
                title: 'Self-evolving loop',
                subtitle: 'Observe → Reflect → Tool use → Code gen → Deploy',
                accent: 'amber',
              },
              { title: '3-layer memory', subtitle: 'Short-term · long-term · skills + retrieval' },
              { title: 'NVIDIA OpenShell', subtitle: 'Strict sandbox for safe tool execution', accent: 'cyan' },
            ],
          },
        ]}
      />

      <h2>The Stack</h2>
      <ul>
        <li><strong>Hardware:</strong> NVIDIA DGX Spark (128GB unified memory, 1 petaflop) — purpose-built for 24/7 local agent operation.</li>
        <li><strong>Models:</strong> Qwen 3.6 (Alibaba) — strong open-weight performance with low VRAM requirements.</li>
        <li><strong>Agent framework:</strong> Hermes Agent — self-evolving skills, 3-layer memory, OpenShell sandbox.</li>
        <li><strong>Key architecture:</strong> a self-evolving loop with full local execution and no external data sharing.</li>
      </ul>

      <h2>Software Summary</h2>

      <h3>Qwen 3.6 Model</h3>
      <ul>
        <li>35B full precision or 27B quantized variant</li>
        <li>Runs efficiently on ~20GB VRAM</li>
        <li>Excellent reasoning and tool-use capabilities</li>
        <li>Fully open-weight (Alibaba)</li>
      </ul>

      <h3>Hermes Agent Framework</h3>
      <ul>
        <li>3-layer persistent memory system</li>
        <li>Self-evolving loop without human intervention</li>
        <li>NVIDIA OpenShell sandbox for safe execution</li>
        <li>Skills auto-improve over time</li>
      </ul>

      <h2>Hardware Summary</h2>
      <table>
        <thead>
          <tr><th>Device</th><th>Memory</th><th>Performance</th></tr>
        </thead>
        <tbody>
          <tr><td>NVIDIA DGX Spark</td><td>128GB Unified</td><td>1 Petaflop</td></tr>
        </tbody>
      </table>

      <h2>Setup Tutorial</h2>

      <ArchitectureFlow
        title="Setup path"
        accent="cyan"
        steps={[
          { label: 'Hardware & CUDA', detail: 'DGX ready + drivers' },
          { label: 'Hermes core', detail: 'Clone + env' },
          { label: 'Memory + model', detail: 'Config + Qwen' },
          { label: 'Sandbox + loop', detail: 'OpenShell + evolve' },
          { label: 'OpSec verify', detail: 'Zero leakage check' },
        ]}
      />

      <h3>01 — Hardware &amp; Base Environment</h3>
      <ul>
        <li>Confirm DGX Spark provisioned with 128GB unified memory.</li>
        <li>Install latest NVIDIA drivers + CUDA 12.4+ toolkit.</li>
        <li>Set up a dedicated user + persistent storage volume.</li>
      </ul>
      <pre><code>nvidia-smi  # verify 128GB and CUDA version</code></pre>

      <h3>02 — Install Hermes Agent Core</h3>
      <ul>
        <li>Clone the repository into <code>/opt/hermes</code> or your preferred path.</li>
        <li>Install dependencies and create a Python environment.</li>
      </ul>
      <pre><code>{`git clone https://github.com/.../hermes-agent.git
cd hermes-agent && uv venv && source .venv/bin/activate`}</code></pre>

      <h3>03 — Configure the 3-Layer Memory System</h3>
      <ul>
        <li>Edit <code>config.yaml</code> to enable the memory layers.</li>
      </ul>
      <pre><code>{`memory:
  short_term: true
  long_term: true
  skills: true`}</code></pre>

      <h3>04 — Deploy the Qwen 3.6 Model</h3>
      <ul>
        <li>Choose a variant: 35B (full) or 27B (quantized).</li>
        <li>Use an Ollama or llama.cpp backend.</li>
      </ul>
      <pre><code>ollama run qwen3.6:27b-q4</code></pre>

      <h3>05 — Enable the NVIDIA OpenShell Sandbox</h3>
      <ul>
        <li>Restrict execution to the sandbox only.</li>
      </ul>
      <pre><code>{`tools:
  open_shell: enabled
  sandbox_mode: strict`}</code></pre>

      <h3>06 — Activate the Self-Evolving Loop</h3>
      <ul>
        <li>Enable the core loop in the agent runtime.</li>
      </ul>
      <pre><code>{`loop:
  enabled: true
  stages: [observe, reflect, tool_use, code_gen, deploy]`}</code></pre>

      <h3>07 — Initial Skill Seeding &amp; Testing</h3>
      <ul>
        <li>Seed with 3–5 core skills.</li>
        <li>Run a controlled test task.</li>
        <li>Monitor memory growth and loop iterations.</li>
      </ul>

      <h3>08 — Security &amp; OpSec Hardening</h3>
      <ul>
        <li>Disable all external telemetry.</li>
        <li>Set strict firewall rules.</li>
        <li>Verify zero data leakage.</li>
      </ul>

      <h2>Verification Checklist</h2>
      <ul>
        <li>Model loads within target VRAM</li>
        <li>3 memory layers persist across restarts</li>
        <li>Self-evolving loop produces an improved skill within 24h</li>
        <li>No outbound connections except intentional tool use</li>
        <li>Agent safely executes code inside the OpenShell sandbox</li>
      </ul>
    </BlogPostLayout>
  );
}
