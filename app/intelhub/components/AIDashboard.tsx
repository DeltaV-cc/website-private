/* ================================================================
   IntelHub — AI Dashboard tab
   Key Labs + HF Models/Spaces + X Profiles of top execs
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import { CategoryBox } from './Shared';

/* ── HF Top Models / Spaces tracker ── */
function HFTracker({ dd }: { dd: any }) {
  const models = dd?.hfModels || [];
  const spaces = dd?.hfSpaces || [];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-[#111] flex items-center gap-2">
          <span className="text-xs text-blue-400 uppercase tracking-[.1em] font-bold">🤗 HF Trending Models</span>
          <span className="text-[10px] text-[#ededed]/20 ml-auto">24h</span>
        </div>
        <div className="divide-y divide-white/[0.02]">
          {models.length > 0 ? models.slice(0, 6).map((m: any, i: number) => (
            <a key={i} href={m.url || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.03] transition-colors">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-[#ededed]/80 truncate font-medium">{m.name}</div>
                <div className="text-[10px] text-[#ededed]/30">{m.author}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-[10px] text-[#ededed]/40 tabular-nums">{m.likes || 0} ♥</span>
                <span className="text-[10px] text-[#ededed]/40 tabular-nums">{m.downloads || 0} ↓</span>
              </div>
            </a>
          )) : (
            <div className="px-4 py-6 text-xs text-[#ededed]/15 italic text-center">Loading HF data...</div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#222] bg-[#111]">
          <span className="text-xs text-purple-400 uppercase tracking-[.1em] font-bold">🚀 Trending Spaces</span>
        </div>
        <div className="divide-y divide-white/[0.02]">
          {spaces.length > 0 ? spaces.slice(0, 5).map((s: any, i: number) => (
            <a key={i} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.03] transition-colors">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-[#ededed]/80 truncate font-medium">{s.name}</div>
                <div className="text-[10px] text-[#ededed]/30">{s.author}</div>
              </div>
              <span className="text-[10px] text-[#ededed]/40 tabular-nums ml-3">{s.likes || 0} ♥</span>
            </a>
          )) : (
            <div className="px-4 py-6 text-xs text-[#ededed]/15 italic text-center">Loading Spaces...</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── X / Social Profiles tracker ── */
function SocialTracker() {
  const profiles = [
    { name: 'Sam Altman', handle: '@sama', org: 'OpenAI', note: 'CEO' },
    { name: 'Dario Amodei', handle: '@DarioAmodei', org: 'Anthropic', note: 'CEO' },
    { name: 'Demis Hassabis', handle: '@demishassabis', org: 'Google DeepMind', note: 'CEO' },
    { name: 'Yann LeCun', handle: '@ylecun', org: 'Meta AI', note: 'Chief AI Scientist' },
    { name: 'Andrej Karpathy', handle: '@karpathy', org: 'Eureka Labs', note: 'Founder' },
    { name: 'Clement Delangue', handle: '@ClementDelangue', org: 'Hugging Face', note: 'CEO' },
    { name: 'Arthur Mensch', handle: '@arthurmensch', org: 'Mistral AI', note: 'CEO' },
    { name: 'Aidan Gomez', handle: '@aidangomez', org: 'Cohere', note: 'CEO' },
    { name: 'Emad Mostaque', handle: '@EMostaque', org: 'Schelling AI', note: 'Founder' },
    { name: 'Jim Fan', handle: '@DrJimFan', org: 'NVIDIA', note: 'Sr Research Scientist' },
  ];

  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#222] bg-[#111]">
        <span className="text-xs text-cyan-400 uppercase tracking-[.1em] font-bold">𝕏 AI Leaders</span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[400px] overflow-y-auto">
        {profiles.map((p, i) => (
          <a key={i} href={`https://x.com/${p.handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.03] transition-colors">
            <div className="min-w-0 flex-1">
              <div className="text-xs text-[#ededed]/80 font-medium">{p.name}</div>
              <div className="text-[10px] text-[#ededed]/30">{p.org} · {p.note}</div>
            </div>
            <span className="text-[10px] text-blue-400 ml-3">{p.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Key Labs & Institutions (moved from Macro) ── */
function KeyLabs({ patents }: { patents: PatentsData | null }) {
  if (!patents?.keyLabs?.length) return null;
  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#222] bg-[#111]">
        <span className="text-xs text-pink-400 uppercase tracking-[.1em] font-bold">Key Labs & Institutions</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
        {patents.keyLabs.slice(0, 12).map((l: any, i: number) => (
          <div key={i} className="rounded-lg border border-[#222] bg-white/[0.02] px-3 py-2.5">
            <div className="text-xs text-[#ededed]/70 font-medium truncate">{l.name}</div>
            <div className="text-[10px] text-[#ededed]/40 mt-1 flex items-center justify-between">
              <span>{l.country} · {l.focus}</span>
              <span className="tabular-nums">{l.papers}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main AI Dashboard ── */
export default function AIDashboard({
  items, dd, patents, catBoxes, TC, ago,
}: {
  items: Item[]; dd: any; patents: PatentsData | null;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string;
}) {
  const aiCats = catBoxes.filter((c: any) => ['ai', 'hardware'].includes(c.id));

  return (
    <div className="space-y-4">
      {/* ── HF Models + Spaces ── */}
      <HFTracker dd={dd} />

      {/* ── Key Labs ── */}
      <KeyLabs patents={patents} />

      {/* ── Social Tracker ── */}
      <SocialTracker />

      {/* ── AI + Hardware category feeds ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {aiCats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}
