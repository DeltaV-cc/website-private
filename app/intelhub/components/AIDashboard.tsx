/* ================================================================
   IntelHub — AI Dashboard (v2.2)
   Frontier Watch tab: HF models/spaces + AI Leaders with filters
   ================================================================ */
'use client';

import { useState } from 'react';
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

/* ── Frontier Watch: HF Models + Spaces with filters + AI Leaders ── */
function FrontierWatch({ dd, items, ts }: { dd: any; items: Item[]; ts: (iso: string) => string }) {
  const [filter, setFilter] = useState<'all' | 'new' | 'downloads' | 'agent' | 'vision' | 'moe'>('all');

  const models = (dd?.hfModels || []).map((m: any) => ({ ...m, type: 'model' }));
  const spaces = (dd?.hfSpaces || []).map((s: any) => ({ ...s, type: 'space' }));
  let allItems = [...models, ...spaces];

  // Apply filters
  if (filter === 'new') {
    allItems = allItems.filter((x: any) => (x.downloads || 0) < 50000);
  }
  if (filter === 'downloads') {
    allItems = allItems.sort((a: any, b: any) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 20);
  }
  if (filter === 'agent') {
    allItems = allItems.filter((x: any) =>
      (x.description || '').toLowerCase().includes('agent') ||
      (x.pipeline || '').toLowerCase().includes('text-generation')
    );
  }
  if (filter === 'vision') {
    allItems = allItems.filter((x: any) =>
      (x.pipeline || '').toLowerCase().includes('image') ||
      (x.description || '').toLowerCase().includes('vision') ||
      (x.description || '').toLowerCase().includes('vlm')
    );
  }
  if (filter === 'moe') {
    allItems = allItems.filter((x: any) =>
      (x.description || '').toLowerCase().includes('moe') ||
      (x.description || '').toLowerCase().includes('mixture')
    );
  }

  const filtered = allItems.slice(0, 16);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Main Frontier Cards */}
      <div className="lg:col-span-8 rounded-2xl border border-[#222] bg-white/[0.01] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#222] bg-[#111] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-400 uppercase tracking-[.1em] font-bold">Frontier Watch</span>
            <span className="ml-3 text-[10px] text-[#ededed]/30">Trending models &amp; spaces • 24h</span>
          </div>
          <div className="flex gap-1 text-[10px]">
            {[
              { key: 'all', label: 'All' },
              { key: 'new', label: 'New' },
              { key: 'downloads', label: 'Popular' },
              { key: 'agent', label: 'Agent' },
              { key: 'vision', label: 'Vision' },
              { key: 'moe', label: 'MoE' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as any)}
                className={`px-3 py-0.5 rounded-full transition ${filter === f.key ? 'bg-white text-black' : 'bg-white/[0.04] text-[#ededed]/50 hover:text-white'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222]">
          {filtered.length > 0 ? filtered.map((item: any, i: number) => (
            <a
              key={i}
              href={item.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[#0a0a0a] hover:bg-white/[0.015] border-b border-r border-[#222] group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#ededed] group-hover:text-white truncate">
                      {item.name}
                    </span>
                    {item.pipeline && (
                      <span className="text-[9px] px-1.5 py-px rounded bg-white/[0.06] text-[#ededed]/40 shrink-0">
                        {item.pipeline}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <div className="text-xs text-[#ededed]/45 mt-1.5 line-clamp-2 leading-snug">
                      {item.description}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0 text-[10px] tabular-nums text-[#ededed]/35">
                  {item.likes || 0}♥<br />
                  {item.downloads || 0}↓
                </div>
              </div>
              <div className="mt-3 text-[9px] text-emerald-400/60">
                {item.type === 'model' ? 'Model' : 'Space'} · {item.author || 'HF'}
              </div>
            </a>
          )) : (
            <div className="col-span-2 p-8 text-center text-[#ededed]/20">No items match this filter</div>
          )}
        </div>
      </div>

      {/* AI Leaders Sidebar */}
      <div className="lg:col-span-4">
        <AILeaders items={items} ts={ts} />
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
    <div className="space-y-5">
      <FrontierWatch dd={dd} items={items} ts={ts} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {aiCats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}
