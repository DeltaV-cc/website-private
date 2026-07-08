/* ================================================================
   IntelHub — AI Dashboard (v2.1)
   HF with descriptions · AI Leaders w/ multi-tweet
   ================================================================ */
'use client';

import { Item, PatentsData } from '../types';
import { CategoryBox } from './Shared';

/* ── AI Leaders — profiles + latest 3 tweets from feed ── */
const AI_LEADERS = [
  { name: 'Sam Altman', handle: 'sama', org: 'OpenAI', role: 'CEO' },
  { name: 'Dario Amodei', handle: 'DarioAmodei', org: 'Anthropic', role: 'CEO' },
  { name: 'Demis Hassabis', handle: 'demishassabis', org: 'Google DeepMind', role: 'CEO' },
  { name: 'Yann LeCun', handle: 'ylecun', org: 'Meta AI', role: 'Chief AI Scientist' },
  { name: 'Andrej Karpathy', handle: 'karpathy', org: 'Eureka Labs', role: 'Founder' },
  { name: 'Clement Delangue', handle: 'ClementDelangue', org: 'Hugging Face', role: 'CEO' },
  { name: 'Arthur Mensch', handle: 'arthurmensch', org: 'Mistral AI', role: 'CEO' },
  { name: 'Aidan Gomez', handle: 'aidangomez', org: 'Cohere', role: 'CEO' },
  { name: 'Emad Mostaque', handle: 'EMostaque', org: 'Schelling AI', role: 'Founder' },
  { name: 'Jim Fan', handle: 'DrJimFan', org: 'NVIDIA', role: 'Sr Research Scientist' },
  { name: 'Pliny the Liberator', handle: 'elder_plinius', org: 'Open Source AI', role: 'Liberator' },
  { name: 'Teknium', handle: 'teknium1', org: 'Nous Research', role: 'Founder' },
];

function AILeaders({ items, ts }: { items: Item[]; ts: (iso: string) => string }) {
  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#222] bg-[#111]">
        <span className="text-[11px] text-cyan-400 uppercase tracking-[.1em] font-bold">𝕏 AI Leaders</span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[700px] overflow-y-auto">
        {AI_LEADERS.map((p, i) => {
          // Find latest items from this handle in the feed (up to 3)
          const latestItems = items.filter((it: any) =>
            (it.source || '').toLowerCase().includes(p.handle.toLowerCase())
          ).slice(0, 3);
          return (
            <div key={i} className="px-3 py-2 hover:bg-white/[0.03]">
              <div className="flex items-center justify-between mb-1">
                <a href={`https://x.com/${p.handle}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-medium text-[#ededed]/80 hover:text-white truncate">
                  {p.name}
                </a>
                <span className="text-[9px] text-[#ededed]/25 shrink-0 ml-2">{p.org} · {p.role}</span>
              </div>
              {latestItems.length > 0 ? (
                <div className="space-y-0.5">
                  {latestItems.map((tweet: any, j: number) => (
                    <a key={j} href={tweet.url || `https://x.com/${p.handle}`} target="_blank" rel="noopener noreferrer"
                      className="block text-[10px] text-[#ededed]/35 hover:text-[#ededed]/60 line-clamp-1 leading-relaxed pl-2 border-l border-white/[0.04]">
                      {(tweet.title || '').replace(/https?:\/\/\S+/g, '').trim().slice(0, 140)}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-[10px] text-[#ededed]/10 italic pl-2">no recent tweets in feed</div>
              )}
              {latestItems[0] && (
                <div className="text-[8px] text-[#ededed]/15 mt-1 tabular-nums pl-2">
                  {ts(latestItems[latestItems.length - 1].published_at)} — {ts(latestItems[0].published_at)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Key Labs — compact with research links ── */
function KeyLabs({ patents }: { patents: PatentsData | null }) {
  if (!patents?.keyLabs?.length) return null;
  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#222] bg-[#111]">
        <span className="text-[11px] text-pink-400 uppercase tracking-[.1em] font-bold">Key Labs & Institutions</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {patents.keyLabs.slice(0, 9).map((l: any, i: number) => (
          <a key={i} href={l.url || `https://scholar.google.com/scholar?q=${encodeURIComponent(l.name)}`} target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-[#222] bg-white/[0.02] px-2.5 py-2 hover:bg-white/[0.05] transition-colors">
            <div className="text-[10px] text-[#ededed]/70 font-medium truncate">{l.name}</div>
            <div className="text-[8px] text-[#ededed]/30 mt-0.5 flex items-center justify-between">
              <span>{l.country}</span>
              <span className="tabular-nums">{l.papers} papers</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── HF Organizations — social cards linking to AI lab HuggingFace orgs ── */
const HF_ORGS = [
  { name: 'xAI', handle: 'xai-org', desc: 'Grok · RealworldQA' },
  { name: 'Meta', handle: 'meta-llama', desc: 'Llama · SAM · Seamless' },
  { name: 'Google', handle: 'google', desc: 'Gemma · T5 · ViT' },
  { name: 'Microsoft', handle: 'microsoft', desc: 'Phi · Florence · DeepSpeed' },
  { name: 'NVIDIA', handle: 'nvidia', desc: 'Nemotron · Cosmos · NeMo' },
  { name: 'Nous Research', handle: 'NousResearch', desc: 'Hermes · DisTrO' },
  { name: 'Mistral AI', handle: 'mistralai', desc: 'Mistral · Mixtral · Codestral' },
  { name: 'DeepSeek', handle: 'deepseek-ai', desc: 'DeepSeek-V4 · R1 · Coder' },
  { name: 'Anthropic', handle: 'Anthropic', desc: 'Model Context Protocol' },
];

function HFOrgs() {
  return (
    <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#222] bg-[#111] flex items-center justify-between">
        <span className="text-[11px] text-amber-400 uppercase tracking-[.1em] font-bold">🤗 HF Organizations</span>
        <span className="text-[9px] text-[#ededed]/15">{HF_ORGS.length} labs</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {HF_ORGS.map((org, i) => (
          <a key={i} href={`https://huggingface.co/${org.handle}`} target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-[#222] bg-white/[0.02] px-2.5 py-2 hover:bg-white/[0.05] hover:border-amber-500/20 transition-colors group">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#ededed]/80 font-medium truncate group-hover:text-white">{org.name}</span>
              <span className="text-[8px] text-[#ededed]/20 shrink-0">@{org.handle}</span>
            </div>
            <div className="text-[8px] text-[#ededed]/25 mt-0.5 truncate">{org.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── HF Models + Spaces with descriptions ── */
function HFTracker({ dd }: { dd: any }) {
  const models = dd?.hfModels || [];
  const spaces = dd?.hfSpaces || [];
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-3 py-2 border-b border-[#222] bg-[#111] flex items-center justify-between">
          <span className="text-[11px] text-blue-400 uppercase tracking-[.1em] font-bold">🤗 Trending Models</span>
          <span className="text-[9px] text-[#ededed]/20">24h</span>
        </div>
        <div className="divide-y divide-white/[0.02] max-h-[520px] overflow-y-auto">
          {models.length > 0 ? models.map((m: any, i: number) => (
            <a key={i} href={m.url || '#'} target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2 hover:bg-white/[0.03]">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-[#ededed]/80 truncate font-medium">{m.name}</div>
                  {m.description ? (
                    <div className="text-[9px] text-[#ededed]/35 line-clamp-1 mt-0.5">{m.description}</div>
                  ) : (
                    <div className="text-[9px] text-[#ededed]/20 mt-0.5">{m.author || 'HF'}</div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-right">
                  <span className="text-[9px] text-[#ededed]/35 tabular-nums">{m.likes || 0}♥</span>
                  <span className="text-[9px] text-[#ededed]/35 tabular-nums">{m.downloads || 0}↓</span>
                </div>
              </div>
            </a>
          )) : (
            <div className="px-3 py-5 text-[10px] text-[#ededed]/12 italic text-center">Loading…</div>
          )}
        </div>
      </div>
      <div className="rounded-xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-3 py-2 border-b border-[#222] bg-[#111]">
          <span className="text-[11px] text-purple-400 uppercase tracking-[.1em] font-bold">🚀 Trending Spaces</span>
        </div>
        <div className="divide-y divide-white/[0.02] max-h-[520px] overflow-y-auto">
          {spaces.length > 0 ? spaces.map((s: any, i: number) => (
            <a key={i} href={s.url || '#'} target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2 hover:bg-white/[0.03]">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-[#ededed]/80 truncate font-medium">{s.name}</div>
                  {s.description ? (
                    <div className="text-[9px] text-[#ededed]/35 line-clamp-1 mt-0.5">{s.description}</div>
                  ) : (
                    <div className="text-[9px] text-[#ededed]/20 mt-0.5">{s.author || 'HF'}</div>
                  )}
                </div>
                <span className="text-[9px] text-[#ededed]/35 tabular-nums shrink-0">{s.likes || 0}♥</span>
              </div>
            </a>
          )) : (
            <div className="px-3 py-5 text-[10px] text-[#ededed]/12 italic text-center">Loading…</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main AI Dashboard ── */
export default function AIDashboard({
  items, dd, patents, catBoxes, TC, ago, ts,
}: {
  items: Item[]; dd: any; patents: PatentsData | null;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; ts: (iso: string) => string;
}) {
  const aiCats = catBoxes.filter((c: any) => ['ai', 'hardware'].includes(c.id));

  return (
    <div className="space-y-4">
      <HFTracker dd={dd} />
      <KeyLabs patents={patents} />
      <HFOrgs />
      <AILeaders items={items} ts={ts} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {aiCats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}
