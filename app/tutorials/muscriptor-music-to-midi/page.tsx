import BlogPostLayout from '@/components/BlogPostLayout';

export default function MuScriptorTutorial() {
  return (
    <BlogPostLayout
      title="Transcribe Any Music to MIDI Locally: MuScriptor"
      date="July 2026"
      category="AI"
      type="Tutorial"
      backHref="/tutorials/"
      backLabel="All tutorials"
      readingTime="5 min read"
      excerpt="Turn any audio into per-instrument MIDI locally with MuScriptor — a decoder-only transformer trained on 170K songs. 1-click Pinokio or native Python, CPU-capable across all model sizes."
    >
      <h2>Overview</h2>
      <ul>
        <li><strong>Model:</strong> MuScriptor by Kyutai + Mirelo AI — decoder-only transformer, trained on 170K songs, multi-instrument.</li>
        <li><strong>Variants:</strong> Small (103M, ~1GB RAM), Medium (307M), Large (1.4B). CPU-capable on all tiers.</li>
        <li><strong>Output:</strong> per-instrument MIDI with streaming note events, importable into any DAW.</li>
        <li><strong>Launcher:</strong> 1-click Pinokio app (zero terminal) or native Python CLI with a FastAPI server.</li>
      </ul>

      <h2>Model Comparison</h2>
      <table>
        <thead>
          <tr><th>Variant</th><th>Params</th><th>RAM</th><th>Speed</th><th>Best for</th></tr>
        </thead>
        <tbody>
          <tr><td>Small</td><td>103M</td><td>~1 GB</td><td>Fastest</td><td>CPU-only, laptops</td></tr>
          <tr><td>Medium</td><td>307M</td><td>~2 GB</td><td>Balanced</td><td>Default choice</td></tr>
          <tr><td>Large</td><td>1.4B</td><td>~8 GB</td><td>Slow</td><td>Max accuracy, GPU</td></tr>
        </tbody>
      </table>

      <h2>Method 1: Pinokio 1-Click (Easiest)</h2>
      <ol>
        <li><strong>Install Pinokio</strong> from pinokio.co (Mac/Win/Linux).</li>
        <li><strong>Search &quot;MuScriptor&quot;</strong> in the app store, click Install.</li>
        <li><strong>Click Start Small/Medium/Large</strong> — downloads the model, starts the server, opens the Web UI.</li>
        <li><strong>Drop an audio file</strong> → optionally select instruments → download MIDI or WAV.</li>
      </ol>
      <p>
        Pinokio handles the Python env, dependencies, web-client build, and model caching. No terminal
        needed, and no Hugging Face login required (it uses ungated mirrors).
      </p>

      <h2>Method 2: Native Python (Full Control)</h2>

      <h3>Authenticate with Hugging Face</h3>
      <p>Accept the license at huggingface.co/MuScriptor, then log in.</p>
      <pre><code>uvx hf auth login</code></pre>

      <h3>Launch the Web UI</h3>
      <pre><code>uvx muscriptor serve   # opens browser at localhost:8000</code></pre>

      <h3>Transcribe from the CLI</h3>
      <pre><code>uvx muscriptor transcribe audio.wav --model medium</code></pre>

      <h3>Automate with the Python API</h3>
      <pre><code>model.transcribe_to_midi("audio.wav")</code></pre>

      <h2>HTTP API Endpoints</h2>
      <table>
        <thead>
          <tr><th>Endpoint</th><th>Method</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>/health</td><td>GET</td><td>Server status check</td></tr>
          <tr><td>/instruments</td><td>GET</td><td>List valid instrument names</td></tr>
          <tr><td>/transcribe</td><td>POST</td><td>Upload audio, stream SSE events → MIDI</td></tr>
          <tr><td>/auralize</td><td>POST</td><td>Render MIDI → WAV (FluidSynth)</td></tr>
        </tbody>
      </table>
    </BlogPostLayout>
  );
}
