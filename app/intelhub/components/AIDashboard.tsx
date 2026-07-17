/* IntelHub — AI Dashboard v3
   Frontier Watch + Arena Leaderboard + AI/ML feeds */
'use client';

import { useState } from 'react';
import { Item, PatentsData } from '../types';
import { CategoryBox, fmtNum, fmtCompact, fmtCurrency } from './Shared';
import AIFrontierSignals from './AIFrontierSignals';
import ArenaLeaderboard from './ArenaLeaderboard';
import AnimatedValue from './AnimatedValue';

const PIPELINE_DESC: Record<string, string> = {
  'text-generation': 'Text generation & chat',
  'text-to-image': 'Generates images from text',
  'image-to-text': 'Describes images in text',
  'text-to-video': 'Generates video from text',
  'text-to-audio': 'Generates audio from text',
  'text-to-speech': 'Text to speech (TTS)',
  'automatic-speech-recognition': 'Speech to text (ASR)',
  'image-classification': 'Classifies images',
  'object-detection': 'Detects objects in images',
  'image-segmentation': 'Segments image regions',
  'image-to-image': 'Transforms images',
  'audio-classification': 'Classifies audio',
  'audio-to-audio': 'Audio transformation',
  'video-classification': 'Classifies video content',
  'depth-estimation': 'Estimates depth from images',
  'document-question-answering': 'Answers questions about docs',
  'question-answering': 'Question answering',
  'translation': 'Language translation',
  'summarization': 'Text summarization',
  'fill-mask': 'Masked word prediction',
  'feature-extraction': 'Feature extraction / embeddings',
  'reinforcement-learning': 'Reinforcement learning',
  'robotics': 'Robotics & control',
  'visual-question-answering': 'Visual Q&A',
  'zero-shot-classification': 'Zero-shot classification',
  'zero-shot-image-classification': 'Zero-shot image classification',
  'zero-shot-object-detection': 'Zero-shot object detection',
  'sentence-similarity': 'Sentence similarity',
  'token-classification': 'Token / NER tagging',
  'conversational': 'Conversational AI',
  'table-question-answering': 'Table Q&A',
  'text-classification': 'Text classification',
};

function describe(item: any): string {
  const pipeline = (item.pipeline || '').toLowerCase();
  if (PIPELINE_DESC[pipeline]) return PIPELINE_DESC[pipeline];
  const desc = (item.description || '').toLowerCase();
  if (desc.includes('agent')) return 'AI agent / tool-use';
  if (desc.includes('video') || desc.includes('animation')) return 'Video generation & animation';
  if (desc.includes('image') || desc.includes('photo') || desc.includes('picture')) return 'Image generation & editing';
  if (desc.includes('audio') || desc.includes('music') || desc.includes('sound')) return 'Audio & music generation';
  if (desc.includes('code') || desc.includes('programming')) return 'Code generation & assistance';
  if (desc.includes('game') || desc.includes('play')) return 'Game playing & simulation';
  if (desc.includes('chat') || desc.includes('conversation')) return 'Chat & conversation';
  if (desc.includes('3d') || desc.includes('mesh')) return '3D generation & rendering';
  if (desc.includes('embed') || desc.includes('vector')) return 'Embeddings & vector search';
  return pipeline ? pipeline.replace(/-/g, ' ') : (desc || 'ML model / space').slice(0, 60);
}

function fmtBig(n: number): string { return fmtCompact(n); }

/* -- Frontier Watch — compact 2-col grid -- */
function FrontierWatch({ dd }: { dd: any }) {
  const [filter, setFilter] = useState<'all' | 'new' | 'downloads' | 'agent' | 'vision' | 'moe'>('all');
  const models = (dd?.hfModels || []).map((m: any) => ({ ...m, type: 'model' }));
  const spaces = (dd?.hfSpaces || []).map((s: any) => ({ ...s, type: 'space' }));
  let allItems = [...models, ...spaces];

  if (filter === 'new') allItems = allItems.filter((x: any) => (x.downloads || 0) < 50000);
  if (filter === 'downloads') allItems = [...allItems].sort((a: any, b: any) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 20);
  if (filter === 'agent') allItems = allItems.filter((x: any) => (x.description || '').toLowerCase().includes('agent'));
  if (filter === 'vision') allItems = allItems.filter((x: any) => (x.pipeline || '').toLowerCase().includes('image') || (x.description || '').toLowerCase().includes('vision'));
  if (filter === 'moe') allItems = allItems.filter((x: any) => (x.description || '').toLowerCase().includes('moe'));
  const filtered = allItems.slice(0, 16);

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center gap-2 flex-wrap bg-gradient-to-r from-[var(--accent-cyan)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold shrink-0">Frontier Watch</span>
        <span className="text-[10px] text-[var(--text-muted)] shrink-0">Trending models & spaces • 24h</span>
        <div className="flex gap-1 text-[10px] ml-auto">
          {[
            { key: 'all', label: 'All' }, { key: 'new', label: 'New' }, { key: 'downloads', label: 'Popular' },
            { key: 'agent', label: 'Agent' }, { key: 'vision', label: 'Vision' }, { key: 'moe', label: 'MoE' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key as any)}
              className={`px-2.5 py-0.5 rounded-full transition-colors duration-150 ${
                filter === f.key ? 'bg-white text-black font-medium' : 'bg-white/[0.06] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-white/[0.10]'
              }`}>{f.label}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)]">
        {filtered.length > 0 ? filtered.map((item: any, i: number) => (
          <a key={i} href={item.url || '#'} target="_blank" rel="noopener noreferrer"
            className="block p-3.5 bg-[var(--bg-deep)] hover:bg-[var(--bg-elevated)] transition-colors duration-150 group">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-[var(--accent-cyan)] tabular-nums shrink-0 leading-none">#{i + 1}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] truncate transition-colors">{item.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium ${
                    item.type === 'model' ? 'text-[var(--accent-green)] bg-[var(--accent-green)]/[0.08]' : 'text-[var(--accent-purple)] bg-[var(--accent-purple)]/[0.08]'
                  }`}>{item.type === 'model' ? 'M' : 'S'}</span>
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5 leading-snug">{describe(item)}</div>
              </div>
              <div className="text-right shrink-0 text-[10px] tabular-nums text-[var(--text-muted)] flex flex-col gap-0.5">
                <span>{item.likes || 0} ♥</span>
                <span>{fmtNum(item.downloads || 0)} ↓</span>
              </div>
            </div>
            <div className="mt-1.5 text-[10px] text-[var(--text-muted)]">{item.author || 'HF'}</div>
          </a>
        )) : <div className="col-span-2 p-8 text-center text-[var(--text-disabled)] text-xs">No items match this filter</div>}
      </div>
    </div>
  );
}

/* -- Main AI Dashboard -- */
export default function AIDashboard({
  items, dd, catBoxes, TC, ago, ts,
}: {
  items: Item[]; dd: any; patents: PatentsData | null;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; ts: (iso: string) => string;
}) {
  const aiCats = catBoxes.filter((c: any) => ['ai', 'hardware'].includes(c.id));
  const totalModels = dd?.hfModels?.length || 0;
  const totalDownloads = (dd?.hfModels || []).reduce((s: number, m: any) => s + (m.downloads || 0), 0);
  const totalSpaces = dd?.hfSpaces?.length || 0;

  return (
    <div className="space-y-5">
      <AIFrontierSignals items={items} ts={ts} />

      {/* -- HF Stats Banner -- */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 bg-gradient-to-r from-[var(--accent-cyan)]/[0.04] via-[var(--accent-purple)]/[0.04] to-transparent">
        {totalModels ? (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">Total HuggingFace Models</div>
              <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                <AnimatedValue value={totalModels} format={(n: number) => n.toLocaleString()} className="tabular-nums" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Total Downloads</div>
                <div className="text-lg font-bold tabular-nums text-[var(--accent-cyan)]">
                  <AnimatedValue value={totalDownloads} format={fmtBig} className="tabular-nums" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Spaces</div>
                <div className="text-lg font-bold tabular-nums text-[var(--accent-purple)]">{totalSpaces.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            <div className="skeleton-shimmer h-3 w-40 rounded" />
            <div className="skeleton-shimmer h-8 w-48 rounded" />
          </div>
        )}
      </div>

      <FrontierWatch dd={dd} />
      <ArenaLeaderboard lb={dd?.arenaLB} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiCats.map((cat: any) => (
          <CategoryBox key={cat.id} cat={cat} ago={ago} TC={TC} />
        ))}
      </div>
    </div>
  );
}
