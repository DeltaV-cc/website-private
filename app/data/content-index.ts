export type ContentType = 'blog' | 'tutorial' | 'course' | 'page' | 'guide';

export type ContentEntry = {
  id: string;
  title: string;
  href: string;
  type: ContentType;
  domain: string;
  tags: string[];
  excerpt: string;
  date?: string;
  format?: string;
};

export const contentIndex: ContentEntry[] = [
  { id: 'defi-weekly-july-13', title: 'DeFi Weekly — July 13, 2026', href: '/blog/defi-weekly-july-13/', type: 'blog', domain: 'Web3', tags: ['DeFi Weekly', 'Markets'], excerpt: 'BTC holds $64K after reclaiming from sub-$60K June lows. Spot ETF outflow streak breaks after 6 weeks. AAVE V4 deposits surpass $250M.', date: 'July 13, 2026', format: 'Dashboard' },
  { id: 'defi-weekly-july-10', title: 'DeFi Weekly — July 10, 2026', href: '/blog/defi-weekly-july-10/', type: 'blog', domain: 'Web3', tags: ['DeFi Weekly', 'Markets'], excerpt: 'The Great Rotation, Robinhood ships its own Arbitrum L2, Open USD lands with 140 partners, and a BonkDAO governance attack.', date: 'July 10, 2026', format: 'Dashboard' },
  { id: 'tencent-hy3-295b-moe', title: 'Tencent Hy3: 295B MoE That Punches at Trillion-Scale', href: '/blog/tencent-hy3-295b-moe/', type: 'blog', domain: 'AI', tags: ['AI', 'Models', 'Agents'], excerpt: 'A 295B MoE model with 21B active parameters, Apache 2.0 licensing, 256K context, and agent-first design.', date: 'July 8, 2026', format: 'Deep Dive' },
  { id: 'sleeper-agents-deceptive-llms', title: 'Sleeper Agents: When AI Models Learn to Hide Their Intentions', href: '/blog/sleeper-agents-deceptive-llms/', type: 'blog', domain: 'AI', tags: ['AI', 'Safety', 'Agents'], excerpt: 'How language models can be trained to act helpfully before switching behavior on specific triggers.', date: 'July 1, 2026', format: 'Deep Dive' },
  { id: 'vllm-semantic-router-mixture-of-models', title: 'vLLM Semantic Router: Mixture-of-Models Intent Routing', href: '/blog/vllm-semantic-router-mixture-of-models/', type: 'blog', domain: 'AI', tags: ['AI', 'Models', 'Routing'], excerpt: 'A signal-driven Mixture-of-Models router with 16 signal families and 12 routing strategies.', date: 'July 1, 2026', format: 'Tool' },
  { id: 'fast-ar-video-diffusion', title: 'FAST-AR: NVIDIA Cracks the Video Diffusion Bottleneck', href: '/blog/fast-ar-video-diffusion/', type: 'blog', domain: 'AI', tags: ['AI', 'Vision', 'Hardware'], excerpt: 'NVIDIA Research framework that eliminates the KV-cache bottleneck in autoregressive video diffusion.', date: 'July 6, 2026', format: 'Deep Dive' },
  { id: 'github-security-audit-tutorial', title: 'GitHub Security Audit: Find Leaked Secrets in 30 Minutes', href: '/blog/github-security-audit-tutorial/', type: 'blog', domain: 'OpSec', tags: ['OpSec', 'Security', 'GitHub'], excerpt: 'A complete GitHub security audit using Octoscan, Trufflehog, GitXRay, and Legitify.', date: 'July 1, 2026', format: 'Tutorial' },
  { id: 'cicd-pipeline-hardening-web3', title: 'CI/CD Pipeline Hardening for Web3', href: '/blog/cicd-pipeline-hardening-web3/', type: 'blog', domain: 'OpSec', tags: ['OpSec', 'Web3', 'CI/CD'], excerpt: 'Lock down deployer keys and production infrastructure with Checkov, Semgrep, and Octoscan.', date: 'July 1, 2026', format: 'Tutorial' },
  { id: 'nvidia-fast-foundation-stereo', title: "NVIDIA's Fast FoundationStereo: Compression-to-Edge Goes Visual", href: '/blog/nvidia-fast-foundation-stereo/', type: 'blog', domain: 'Hardware', tags: ['AI', 'Hardware', 'Vision'], excerpt: 'A compact stereo depth model built for zero-shot edge deployment.', date: 'June 26, 2026', format: 'Deep Dive' },
  { id: 'ibm-sub-1nm-chip', title: '0.7 Nanometers: IBM Breaks the Physical Limits of Chip Scaling', href: '/blog/ibm-sub-1nm-chip/', type: 'blog', domain: 'Hardware', tags: ['Hardware', 'Chips'], excerpt: 'IBM unveils a sub-1nm chip with a revolutionary 3D nanostack architecture.', date: 'June 25, 2026', format: 'Deep Dive' },
  { id: 'ens-independent-board-governance', title: 'ENS and the Independent Board Question', href: '/blog/ens-independent-board-governance/', type: 'blog', domain: 'Web3', tags: ['Web3', 'Governance'], excerpt: 'Hard governance questions around an independent ENS Foundation board.', date: 'June 25, 2026', format: 'Thought' },
  { id: 'stablecoins-fed-treasury-channel', title: "Stablecoins: The Fed's Newest Treasury Financing Channel", href: '/blog/stablecoins-fed-treasury-channel/', type: 'blog', domain: 'Web3', tags: ['Web3', 'Stablecoins', 'Markets'], excerpt: 'Why dollar-backed stablecoins are becoming structural demand for US government debt.', date: 'June 23, 2026', format: 'Thought' },
  { id: 'ethereum-security-qf-round', title: '638 ETH for Ethereum Security', href: '/blog/ethereum-security-qf-round/', type: 'blog', domain: 'Web3', tags: ['Web3', 'Security', 'Ethereum'], excerpt: 'What the largest Ethereum security quadratic funding round means for infrastructure.', date: 'June 23, 2026', format: 'Deep Dive' },
  { id: 'qwen3-6-uncensored-vlm-moe', title: 'Qwen3.6-35B-A3B: Uncensored VLM Meets MoE Efficiency', href: '/blog/qwen3-6-uncensored-vlm-moe/', type: 'blog', domain: 'AI', tags: ['AI', 'Local AI', 'Models'], excerpt: 'A local-first sovereign multimodal model with 35B total parameters and 3B active.', date: 'June 22, 2026', format: 'Thought' },
  { id: 'risk-dashboards-opsec', title: 'Risk Dashboards & OpSec Tooling for Web3', href: '/blog/risk-dashboards-opsec/', type: 'blog', domain: 'OpSec', tags: ['OpSec', 'Web3', 'Tools'], excerpt: 'Useful risk and transparency layers for EVM and sovereign operations.', date: 'June 10, 2026', format: 'Deep Dive' },
  { id: 'first-principles', title: 'First Principles for Sovereign AI Agents', href: '/blog/first-principles/', type: 'blog', domain: 'AI', tags: ['AI', 'Local AI', 'OpSec'], excerpt: 'Local-first by default. Keys never leave the machine. Minimal attack surface. Human in the loop.', date: 'June 10, 2026', format: 'Thought' },
  { id: 'hermes-qwen-dgx-spark', title: 'Hermes + Qwen 3.6 + NVIDIA DGX Spark', href: '/tutorials/hermes-qwen-dgx-spark/', type: 'tutorial', domain: 'AI', tags: ['Local AI', 'Agents', 'Hardware'], excerpt: 'A 24/7 local agent stack with NVIDIA DGX Spark, Qwen 3.6, and Hermes Agent.', date: 'June 2026', format: 'Tutorial' },
  { id: 'langchain-chatchat-ollama', title: 'Run Your Own Local RAG & Agent System', href: '/tutorials/langchain-chatchat-ollama/', type: 'tutorial', domain: 'AI', tags: ['Local AI', 'RAG', 'OpSec'], excerpt: 'Full offline RAG with Streamlit, FastAPI, LangChain, and Ollama. No API keys, no cloud.', date: 'July 2026', format: 'Tutorial' },
  { id: 'muscriptor-music-to-midi', title: 'Transcribe Any Music to MIDI Locally', href: '/tutorials/muscriptor-music-to-midi/', type: 'tutorial', domain: 'AI', tags: ['Local AI', 'Audio'], excerpt: 'Turn audio into per-instrument MIDI locally with MuScriptor.', date: 'July 2026', format: 'Tutorial' },
  { id: 'x402-sota-setup', title: 'x402 SOTA Setup: HTTP-Native Stablecoin Payments', href: '/tutorials/x402-sota-setup/', type: 'tutorial', domain: 'Web3', tags: ['Web3', 'Agents', 'OpSec'], excerpt: 'Reference architecture for payment-gated APIs using HTTP 402 and USDC.', date: 'July 2026', format: 'Tutorial' },
  { id: 'ai-mastery', title: 'AI Mastery', href: '/forge/course/', type: 'course', domain: 'Forge', tags: ['AI Course', 'Local AI', 'OpSec'], excerpt: 'Build and run personal AI systems with strong operational security and long-term autonomy.', format: 'Course' },
  { id: 'ai-engineering', title: 'AI Engineering', href: '/ai/', type: 'page', domain: 'AI', tags: ['Agents', 'Inference', 'Local AI'], excerpt: 'Production-grade AI systems designed, shipped, and hardened on your infrastructure.' },
  { id: 'web3', title: 'Web3 Intelligence', href: '/web3/', type: 'page', domain: 'Web3', tags: ['Web3', 'OSINT', 'Architecture'], excerpt: 'Onchain intelligence, wallet architecture, and risk-first Web3 systems.' },
  { id: 'opsec', title: 'Web3 OpSec', href: '/opsec/', type: 'page', domain: 'OpSec', tags: ['OpSec', 'Security', 'Guides'], excerpt: 'Operational security frameworks for high-decentralization teams.' },
  { id: 'forge', title: 'Forge Skills', href: '/forge/', type: 'page', domain: 'Forge', tags: ['Forge', 'Learning'], excerpt: 'Sovereign systems, practical curricula, and high-signal intelligence.' },
  { id: 'linux-hardening', title: 'Linux Hardening Guide', href: '/opsec/linux/', type: 'guide', domain: 'OpSec', tags: ['OpSec', 'Linux', 'Hardening'], excerpt: 'Factory reset and hardening guide for a more sovereign workstation.' },
  { id: 'macos-hardening', title: 'macOS Hardening Guide', href: '/opsec/macos/', type: 'guide', domain: 'OpSec', tags: ['OpSec', 'macOS', 'Hardening'], excerpt: 'Privacy-first MDM and hardening guidance for macOS.' },
  { id: 'windows-hardening', title: 'Windows Hardening Guide', href: '/opsec/windows/', type: 'guide', domain: 'OpSec', tags: ['OpSec', 'Windows', 'Hardening'], excerpt: 'Telemetry reduction and endpoint security for Windows.' },
];

export const blogIndex = contentIndex.filter((entry) => entry.type === 'blog');
export const tutorialIndex = contentIndex.filter((entry) => entry.type === 'tutorial');
