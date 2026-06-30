'use client';

export default function IntelHubPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-[#222] bg-[#0a0a0a]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-8 py-6">
          <h1 className="text-[42px] font-bold tracking-[-1.5px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] via-[#f59e0b] to-[#C2410C] bg-clip-text text-transparent">
            IntelHub
          </h1>
          <p className="text-[#ededed]/30 mt-1.5 text-[15px] font-light tracking-wide">
            Live threat surface · Market intel · Signal triage
          </p>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <p className="text-[#ededed]/50 text-sm">Page shell — components loading...</p>
      </div>
    </div>
  );
}
