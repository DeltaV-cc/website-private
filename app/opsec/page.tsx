'use client';

export default function OpSec() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <a href="/" className="text-[#00f0ff] text-sm hover:underline">← Back to home</a>
        
        <h1 className="text-6xl font-semibold tracking-[-2px] mt-4 mb-4">Web3 OpSec</h1>
        <p className="text-xl text-[#aaa] max-w-2xl mb-12">
          High-signal operational security frameworks built on complementary sources and self-sovereign principles.
        </p>

        {/* OS Hardening Tutorials */}
        <div className="mb-16">
          <div className="text-[#00f0ff] text-xs tracking-[3px] mb-4">OS HARDENING</div>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/opsec/linux" className="block border border-[#222] hover:border-[#00f0ff] rounded-2xl p-6 transition-colors">
              <div className="font-semibold text-lg mb-1">Linux</div>
              <div className="text-sm text-[#666]">Factory reset + hardening guide</div>
            </a>
            <a href="/opsec/macos" className="block border border-[#222] hover:border-[#00f0ff] rounded-2xl p-6 transition-colors">
              <div className="font-semibold text-lg mb-1">macOS</div>
              <div className="text-sm text-[#666]">Privacy-first MDM + hardening</div>
            </a>
            <a href="/opsec/windows" className="block border border-[#222] hover:border-[#00f0ff] rounded-2xl p-6 transition-colors">
              <div className="font-semibold text-lg mb-1">Windows</div>
              <div className="text-sm text-[#666]">Telemetry reduction + endpoint security</div>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-[#222] rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Core Principles</h3>
            <ul className="space-y-3 text-[#aaa]">
              <li>• Local-first execution and data sovereignty</li>
              <li>• Complementary sources (Opsek + community hardening scripts)</li>
              <li>• Agent OpSec with hardened environments</li>
              <li>• Minimal attack surface across all platforms</li>
            </ul>
          </div>
          
          <div className="border border-[#222] rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Key References</h3>
            <div className="text-[#aaa] space-y-2 text-sm">
              <div>Opsek/OSs-security — Linux, macOS, Windows hardening</div>
              <div>WalletBeat — Ethereum wallet privacy rankings</div>
              <div>Endpoint security research from arXiv &amp; independent labs</div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm text-[#666]">
          Full playbooks and hardening guides produced through the Content Forge.
        </div>
      </div>
    </div>
  );
}
