import BlogPostLayout from '@/components/BlogPostLayout';

export default function LangChainChatchatTutorial() {
  return (
    <BlogPostLayout
      title="Run Your Own Local RAG & Agent System: LangChain-Chatchat + Ollama"
      date="July 2026"
      category="AI"
      type="Tutorial"
      backHref="/tutorials/"
      backLabel="All tutorials"
      readingTime="7 min read"
      excerpt="Full offline RAG with knowledge-base Q&A and agent tools — Streamlit + FastAPI + LangChain + Ollama (Qwen2, Llama3, GLM-4). 100% local: no API keys, no cloud, FAISS on encrypted disk."
    >
      <h2>The Stack</h2>
      <ul>
        <li><strong>Stack:</strong> Streamlit UI + FastAPI backend + LangChain + Ollama models (Qwen2, Llama3, GLM-4).</li>
        <li><strong>Capability:</strong> full offline RAG with knowledge-base Q&amp;A, agent tools (search, database, arXiv), and multi-model support.</li>
        <li><strong>OpSec:</strong> 100% local — no API keys, no cloud. FAISS vector store on encrypted disk. Apache 2.0 + MIT stack.</li>
      </ul>

      <h2>Architecture</h2>
      <pre><code>{`Streamlit WebUI (localhost:8501)
        │
FastAPI Backend (localhost:7861)
   /chat  /knowledge_base  /agent  /tools
        │
   ┌────┼────┐
   ▼    ▼     ▼
Ollama  Xinference  LocalAI
:11434  :9997      :8080
   │
qwen2:7b  bge-m3  glm4:9b`}</code></pre>

      <h2>Setup Steps</h2>

      <h3>01 — Install Ollama &amp; Pull Models</h3>
      <ul>
        <li>Install Ollama from ollama.com.</li>
        <li>Pull the LLM and the embedding model.</li>
      </ul>
      <pre><code>{`ollama pull qwen2:7b
ollama pull bge-m3
ollama list  # verify`}</code></pre>

      <h3>02 — Install LangChain-Chatchat</h3>
      <ul>
        <li>Create an isolated virtual environment.</li>
        <li>Install the package.</li>
      </ul>
      <pre><code>{`python -m venv ~/chatchat-env
source ~/chatchat-env/bin/activate
pip install langchain-chatchat -U`}</code></pre>

      <h3>03 — Configure the Model Platform</h3>
      <ul>
        <li>Set the default LLM + embedding model.</li>
        <li>Register Ollama as a model platform with its API base.</li>
      </ul>
      <pre><code>{`chatchat-config model --default_llm_model qwen2:7b
chatchat-config model --default_embedding_model bge-m3
chatchat-config model --set_model_platforms '[{...}]'`}</code></pre>

      <h3>04 — Initialize the Knowledge Base</h3>
      <ul>
        <li>Point <code>DATA_PATH</code> to your documents folder.</li>
        <li>Run the indexer.</li>
      </ul>
      <pre><code>{`chatchat-config basic --data_path ~/knowledge-base
chatchat-kb -r`}</code></pre>

      <h3>05 — Launch &amp; Use</h3>
      <ul>
        <li>Start the API + WebUI with one command.</li>
        <li>Open localhost:8501, upload docs, and chat.</li>
        <li>Enable Agent mode for multi-tool chaining.</li>
      </ul>
      <pre><code>{`chatchat start -a
# WebUI → http://localhost:8501
# API  → http://localhost:7861`}</code></pre>

      <h2>OpSec Hardening</h2>

      <h3>Network Lockdown</h3>
      <ul>
        <li>Bind to 127.0.0.1 only (default).</li>
        <li>Firewall-block ports 8501 and 7861.</li>
        <li>No telemetry — audit with grep.</li>
      </ul>

      <h3>Data Sovereignty</h3>
      <ul>
        <li>FAISS vector store on an encrypted volume.</li>
        <li>No external API calls at runtime.</li>
        <li>100% open-source stack (Apache 2.0 / MIT).</li>
      </ul>
    </BlogPostLayout>
  );
}
