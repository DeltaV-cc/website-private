/* IntelHub — AI Dashboard
   Frontier Watch + labs research + personas + HF orgs + Arena */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Item, PatentsData } from '../types';
import { CategoryBox, fmtNum, fmtCompact, PanelMeta } from './Shared';
import AIFrontierSignals from './AIFrontierSignals';
import ArenaLeaderboard from './ArenaLeaderboard';
import AnimatedValue from './AnimatedValue';

const PIPELINE_DESC: Record<string, string> = {
  'text-generation': 'Text generation & chat',
  'text-to-image': 'Image generation',
  'image-text-to-text': 'Vision-language (VLM)',
  'image-to-text': 'Image → text',
  'text-to-video': 'Video generation',
  'text-to-audio': 'Audio generation',
  'text-to-speech': 'TTS',
  'automatic-speech-recognition': 'Speech → text',
  'feature-extraction': 'Embeddings',
  'sentence-similarity': 'Sentence similarity',
  'any-to-any': 'Multimodal',
};

/** Top research labs we surface in the research box */
const LAB_ORGS = [
  'openai', 'anthropic', 'deepmind', 'google', 'meta', 'microsoft', 'nvidia',
  'mistral', 'cohere', 'xai', 'alibaba', 'qwen', 'deepseek', 'moonshot',
  'baichuan', '01.ai', 'huggingface', 'stability', 'adept', 'inflection',
  'arxiv', 'lesswrong', 'alignment', 'berkeley', 'stanford', 'mit ', 'cmu',
  'fair', 'allenai', 'eleuther', 'together.ai', 'perplexity', 'character.ai',
];

/** Sources that are always research-ish when present */
const LAB_SOURCES = [
  'arxiv', 'lesswrong', 'alignment forum', 'hugging face blog', 'openai',
  'anthropic', 'google ai', 'deepmind', 'nvidia', 'microsoft research',
];

/** X / social personas relevant to frontier AI (matched against item.source).
 *  Full hedge roster — do not prune for low post rate. Aliases cover Nitter labels. */
const AI_PERSONAS = [
  'sama', 'karpathy', 'ylecun', 'demishassabis', 'gdb', 'miramurati',
  'jeremyphoward', 'claudeai', 'openai', 'anthropicai', 'deepmind', 'googledeepmind',
  'huggingface', 'swyx', 'andrewyng', 'fchollet', 'drjimfan', 'clementdelangue',
  'tekknolagi', 'arankomatsuzaki', 'hardmaru', 'sarahooker', 'osanseviero',
  'emostaque', 'scitechera', 'nono2357', 'bindureddy',
  'alexandr_wang', 'ilyasut', 'sarahookr', 'jimfan', 'nearcyan', 'levelsio',
  'andrew_n_carr', 'rasbt', 'stanfordnlp', 'metaai', 'googleresearch', 'googleai',
  'xai', 'lerobothf', 'prismml', 'elder_plinius', 'teknium1',
  'darioamodei', 'yoheinakajima', 'hwchase17', 'langchainai', 'jxnlco',
  'hamelhusain', 'ggerganov', 'ollama', 'lmstudioai', 'unslothai',
  'nousresearch', 'deepseek_ai', 'alibaba_qwen', 'kimi_moonshot',
  'teortaxestex', 'esyudkowsky', 'goodside', 'emollick',
  'runwayml', 'lumalabsai', 'stabilityai', 'midjourney', 'thebloke',
];

/** Labs / researcher blogs / chip press that belong on the AI Frontier strip. */
const FRONTIER_SOURCES = [
  'arxiv', 'hugging face', 'huggingface', 'openai', 'anthropic', 'deepmind',
  'lesswrong', 'alignment forum', 'simon willison', 'interconnects', 'import ai',
  'gwern', 'eleuther', 'qwen', 'nvidia', 'stanford hai', 'the batch',
  'semiengineering', 'hpcwire', 'mit technology review', 'google ai', 'meta ai',
  'mistral', 'xai', 'cerebras',
];

const FRONTIER_TITLE = /\b(llm|llms|gpt|claude|gemini|deepseek|qwen|mistral|llama|moe|transformer|inference|fine-?tun|rlhf|lora|agentic|foundation model|frontier model|abliterat|uncensor|gguf|hugging\s?face|openai|anthropic|gpu|hbm|tsmc|asml|foundry|semiconductor|nvidia|cerebras|groq|tpu|npu|alignment|jailbreak|text-to-video|text-to-image|diffusion|vlm|multimodal|machine learning|deep learning|neural net|large language|open.?weight|sora|wan2|hunyuan|ltx|flux|quantum comput|qubit|ai accelerator)\b/i;

const FRONTIER_NOISE = /save \$|just \$|for just|combo deal|motherboard review|gaming build|gta vi|crude oil|gasoline inventor|distillate inventor|\$macro\b|etf netflow|whales? are shorting|send their pee|beer drinkers|crocodylian|mummies|coffee drinkers have less fat/i;

const FRONTIER_BLOCKED_SRC = [
  'coindesk', 'decrypt', 'the defiant', 'lookonchain', 'wublockchain',
  'marketnews', 'dinosn', 'cvenew', 'science daily', 'bleepingcomputer',
  'cryptoquant', 'glassnode', 'artemis', 'zachxbt', 'defillama',
];

function isPersonaSource(src: string): boolean {
  const s = (src || '').toLowerCase();
  const isX = s.startsWith('x:') || s.includes('nitter') || s.includes('twitter') || s.startsWith('@');
  if (!isX) return false;
  return AI_PERSONAS.some((p) => s.includes(p));
}

/** Allowlist for the AI Frontier ticker — AI / ML / AI-compute hardware / labs / people. */
function isAiFrontierItem(it: { title?: string; source?: string; summary?: string; tag?: string; url?: string }): boolean {
  const title = it.title || '';
  const src = (it.source || '').toLowerCase();
  const blob = `${title} ${it.summary || ''}`;
  if (!title) return false;
  if (FRONTIER_NOISE.test(title) || FRONTIER_NOISE.test(blob)) return false;
  if (FRONTIER_BLOCKED_SRC.some((b) => src.includes(b))) return false;
  if (src.includes("tom's hardware") || src.includes('tom’s hardware') || src.includes('phoronix') || src.includes('servethehome')) {
    return FRONTIER_TITLE.test(blob);
  }
  if (isPersonaSource(src)) {
    // Lab / model-lab accounts stay even on thin titles; hobby posters need an AI/ML token.
    if (/openai|anthropic|deepmind|huggingface|karpathy|ylecun|sama|dario|qwen|deepseek|nvidia|plinius|teknium|ggerganov|nousresearch|unsloth|ollama|lmstudio|runway|luma|stability|midjourney|clementdelangue|osanseviero/i.test(src)) {
      return true;
    }
    return FRONTIER_TITLE.test(blob);
  }
  if (FRONTIER_SOURCES.some((s) => src.includes(s))) {
    // Core labs/arxiv/research blogs: always. General press still needs an AI/ML/chip token.
    if (/arxiv|hugging|openai|anthropic|deepmind|lesswrong|alignment|simon willison|interconnects|import ai|gwern|eleuther|qwen/.test(src)) {
      return true;
    }
    return FRONTIER_TITLE.test(blob);
  }
  if ((it.tag === 'ai' || it.tag === 'hardware') && FRONTIER_TITLE.test(blob)) return true;
  if (FRONTIER_TITLE.test(blob) && (it.tag === 'ai' || it.tag === 'hardware' || !it.tag)) return true;
  return false;
}

function describe(item: any): string {
  const pipeline = (item.pipeline || '').toLowerCase();
  if (PIPELINE_DESC[pipeline]) return PIPELINE_DESC[pipeline];
  const tags = (item.tags || []).join(' ').toLowerCase();
  const blob = `${item.name || ''} ${item.description || ''} ${tags}`.toLowerCase();
  if (blob.includes('moe') || blob.includes('mixture')) return 'Mixture-of-experts';
  if (blob.includes('agent') || blob.includes('tool')) return 'Agent / tool-use';
  if (blob.includes('vision') || blob.includes('vlm') || blob.includes('multimodal')) return 'Vision / multimodal';
  if (blob.includes('embed')) return 'Embeddings';
  if (pipeline) return pipeline.replace(/-/g, ' ');
  return 'ML model / space';
}

function enrichItem(raw: any, type: 'model' | 'space') {
  const name = raw?.name || raw?.id || '';
  const author =
    raw?.author ||
    (typeof name === 'string' && name.includes('/') ? name.split('/')[0] : '') ||
    '';
  const tags: string[] = Array.isArray(raw?.tags) ? [...raw.tags] : [];
  const pipeline = raw?.pipeline || raw?.pipeline_tag || '';
  if (pipeline && !tags.includes(pipeline)) tags.push(pipeline);
  return { ...raw, name, author, tags, pipeline, type };
}

function itemBlob(x: any) {
  return `${x.name || ''} ${x.author || ''} ${x.pipeline || ''} ${(x.tags || []).join(' ')} ${x.description || ''}`.toLowerCase();
}

function matchFilter(x: any, filter: string): boolean {
  const blob = itemBlob(x);
  const pipe = (x.pipeline || '').toLowerCase();
  if (filter === 'all') return true;
  if (filter === 'downloads') return true;
  if (filter === 'new') {
    // Lower relative downloads among snapshot = newer/less established heuristic
    return (x.downloads || 0) < 5_000_000 || (x.likes || 0) < 500;
  }
  if (filter === 'agent') {
    return /\bagent\b|tool-use|tool use|function.?call|autogen|langchain|crewai|browser.?use/.test(blob);
  }
  if (filter === 'vision') {
    return (
      pipe.includes('image') ||
      pipe.includes('vision') ||
      pipe.includes('any-to-any') ||
      /vision|vlm|multimodal|clip|siglip|llava|florence|qwen2-vl|qwen2\.5-vl|internvl|gemini.*vision|image-text|text-to-image|flux|sdxl|stable.?diffusion|kolors|comic/.test(blob)
    );
  }
  if (filter === 'moe') {
    return /\bmoe\b|mixture.of.experts|mixtral|deepseek-v|qwen.*moe|switch.?transformer|grok-1/.test(blob);
  }
  return true;
}

function fmtBig(n: number): string { return fmtCompact(n); }

function FrontierWatch({ models, spaces }: { models: any[]; spaces: any[] }) {
  const [kind, setKind] = useState<'models' | 'spaces'>('models');
  const [filter, setFilter] = useState<'all' | 'new' | 'downloads' | 'agent' | 'vision' | 'moe'>('all');

  const modelItems = useMemo(() => models.map((m) => enrichItem(m, 'model')), [models]);
  const spaceItems = useMemo(() => spaces.map((s) => enrichItem(s, 'space')), [spaces]);
  const pool = kind === 'models' ? modelItems : spaceItems;

  const filterCounts = useMemo(() => {
    const keys = ['all', 'new', 'downloads', 'agent', 'vision', 'moe'] as const;
    const out: Record<string, number> = {};
    for (const k of keys) out[k] = pool.filter((x) => matchFilter(x, k)).length;
    return out;
  }, [pool]);

  const filtered = useMemo(() => {
    let allItems = pool.filter((x) => matchFilter(x, filter));
    if (filter === 'downloads' || filter === 'all') {
      allItems = [...allItems].sort((a, b) => (b.downloads || b.likes || 0) - (a.downloads || a.likes || 0));
    } else if (filter === 'new') {
      allItems = [...allItems].sort((a, b) => (a.downloads || 0) - (b.downloads || 0));
    } else {
      allItems = [...allItems].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return allItems.slice(0, 8);
  }, [pool, filter]);

  const accent = kind === 'models' ? 'var(--accent-cyan)' : 'var(--accent-purple)';

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center gap-2 flex-wrap bg-gradient-to-r from-[var(--accent-cyan)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold shrink-0">Frontier Watch</span>
        <div className="flex gap-1 text-[10px]">
          {([
            { key: 'models' as const, label: 'Models', n: modelItems.length },
            { key: 'spaces' as const, label: 'Spaces', n: spaceItems.length },
          ]).map((k) => (
            <button key={k.key} onClick={() => setKind(k.key)}
              className={`px-2.5 py-0.5 rounded-full transition-colors ${
                kind === k.key ? 'bg-white text-black font-medium' : 'bg-white/[0.06] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
              }`}>
              {k.label} <span className="opacity-50">{k.n}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-1 text-[10px] ml-auto flex-wrap justify-end">
          {[
            { key: 'all', label: 'All' }, { key: 'new', label: 'New' }, { key: 'downloads', label: 'Popular' },
            { key: 'agent', label: 'Agent' }, { key: 'vision', label: 'Vision' }, { key: 'moe', label: 'MoE' },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key as any)}
              className={`px-2.5 py-0.5 rounded-full transition-colors duration-150 ${
                filter === f.key ? 'bg-white text-black font-medium' : 'bg-white/[0.06] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-white/[0.10]'
              }`}>
              {f.label}
              <span className="ml-1 opacity-50">{filterCounts[f.key] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)]">
        {filtered.length > 0 ? filtered.map((item: any, i: number) => (
          <a key={`${item.type}-${item.name}-${i}`} href={item.url || `https://huggingface.co/${item.author}/${item.name}`} target="_blank" rel="noopener noreferrer"
            className="block p-4 bg-[var(--bg-deep)] hover:bg-[var(--bg-elevated)] transition-colors duration-150 group">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold tabular-nums shrink-0 leading-none" style={{ color: accent }}>#{i + 1}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] truncate transition-colors">{item.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium uppercase tracking-wide ${
                    item.type === 'model' ? 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/[0.10]' : 'text-[var(--accent-purple)] bg-[var(--accent-purple)]/[0.10]'
                  }`}>{item.type}</span>
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5 leading-snug">{describe(item)}</div>
              </div>
              <div className="text-right shrink-0 text-[10px] tabular-nums text-[var(--text-muted)] flex flex-col gap-0.5">
                <span>{item.likes || 0} ♥</span>
                {item.type === 'model' && item.downloads != null && <span>{fmtNum(item.downloads || 0)} ↓</span>}
              </div>
            </div>
            <div className="mt-1.5 text-[10px] text-[var(--text-muted)]">{item.author || 'HF'}</div>
          </a>
        )) : (
          <div className="col-span-2 px-5 py-8 text-center text-[10px] text-[var(--text-disabled)]">
            No {kind} matching {filter}
          </div>
        )}
      </div>
    </div>
  );
}

const ABLIT_USES = [
  { key: 'local', label: 'Local', hint: 'GGUF / workstation — llama.cpp, LM Studio, Ollama' },
  { key: 'cybersecurity', label: 'Cyber', hint: 'Heretic / uncensored — red-team & jailbreak eval' },
  { key: 'film', label: 'Film', hint: 'Image & video generation for local VFX' },
] as const;

function familyKey(id: string): string {
  const short = (id || '').split('/').pop() || id;
  return short
    .replace(/huihui-/i, '')
    .replace(/-abliterated.*$/i, '')
    .replace(/-uncensored.*$/i, '')
    .replace(/-heretic.*$/i, '')
    .replace(/-gguf.*$/i, '')
    .replace(/-awq.*$/i, '')
    .replace(/-nvfp4.*$/i, '')
    .toLowerCase();
}

function classifyAbliterated(models: any[]): Record<string, any[]> {
  const buckets: Record<string, any[]> = { local: [], cybersecurity: [], film: [] };
  const seen: Record<string, Set<string>> = { local: new Set(), cybersecurity: new Set(), film: new Set() };
  for (const m of models || []) {
    const blob = `${m.id || ''} ${m.name || ''} ${m.pipeline || ''}`.toLowerCase();
    const uses: string[] = Array.isArray(m.uses) && m.uses.length ? [...m.uses] : [];
    if (!uses.length) {
      if (/(video|i2v|t2v|flux|wan|ltx|hunyuan|muse|glimmer|diffusion|image-edit)/.test(blob)) uses.push('film');
      if (/(heretic|jailbreak|uncensor|whiterabbit|abliterat)/.test(blob)) uses.push('cybersecurity');
      if (/(gguf|q4_|awq|tiny|\b27b\b|\b30b\b|\b14b\b)/.test(blob)) uses.push('local');
      if (!uses.length) uses.push('local');
    }
    const fam = familyKey(m.id || m.name || '');
    for (const u of uses) {
      if (!buckets[u] || seen[u].has(fam)) continue;
      seen[u].add(fam);
      buckets[u].push(m);
    }
  }
  return buckets;
}

/** Abliterated recs by use — trending families stay visible, but the panel is not a GGUF dump. */
function AbliteratedModels({
  models, byUse, updated,
}: {
  models: any[]; byUse?: Record<string, any[]> | null; updated?: string | null;
}) {
  const [use, setUse] = useState<(typeof ABLIT_USES)[number]['key']>('local');
  const classified = useMemo(() => classifyAbliterated(models), [models]);
  const buckets = byUse && (byUse.local || byUse.film || byUse.cybersecurity) ? byUse : classified;
  const recs = (buckets[use] || []).slice(0, 6);
  const trending = useMemo(() => {
    const seen = new Set<string>();
    const out: any[] = [];
    for (const m of models || []) {
      const fam = familyKey(m.id || m.name || '');
      if (!fam || seen.has(fam)) continue;
      seen.add(fam);
      out.push(m);
      if (out.length >= 6) break;
    }
    return out;
  }, [models]);

  const updatedLabel = updated
    ? (() => {
        const d = new Date(updated);
        return isNaN(d.getTime()) ? updated : d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      })()
    : null;

  const meta = ABLIT_USES.find((u) => u.key === use)!;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-green)]/[0.06] to-transparent">
        <div>
          <span className="text-xs text-[var(--accent-green)] uppercase tracking-[1.5px] font-bold">Abliterated recs</span>
          <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{meta.hint}</div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 text-[10px]">
            {ABLIT_USES.map((u) => (
              <button key={u.key} onClick={() => setUse(u.key)}
                className={`px-2.5 py-0.5 rounded-full transition-colors ${
                  use === u.key ? 'bg-white text-black font-medium' : 'bg-white/[0.06] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                }`}>
                {u.label}
                <span className="ml-1 opacity-50">{(buckets[u.key] || []).length}</span>
              </button>
            ))}
          </div>
          <PanelMeta source="HF · abliterated / heretic / uncensored" note="families deduped" updated={updatedLabel} />
        </div>
      </div>
      {recs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)]">
          {recs.map((m: any, i: number) => (
            <a
              key={`${m.id || m.name}-${i}`}
              href={m.url || `https://huggingface.co/${m.id || `${m.author}/${m.name}`}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[var(--bg-deep)] hover:bg-[var(--bg-elevated)] transition-colors duration-150 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-[var(--accent-green)] tabular-nums shrink-0 leading-none">#{i + 1}</span>
                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-green)] truncate transition-colors">{m.name || m.id}</span>
                    {m.recommended && (
                      <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-full text-[var(--accent-green)] bg-[var(--accent-green)]/[0.10] shrink-0">rec</span>
                    )}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5 line-clamp-2">
                    {m.why || meta.hint}
                    {m.author ? ` · ${m.author}` : ''}
                    {m.daysAgo != null ? ` · ${m.daysAgo}d ago` : ''}
                  </div>
                </div>
                <div className="text-right shrink-0 text-[10px] tabular-nums text-[var(--text-muted)] flex flex-col gap-0.5">
                  <span>{m.likes || 0} ♥</span>
                  {m.downloads != null && <span>{fmtCompact(m.downloads || 0)} ↓</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="space-y-3 p-5">
          <div className="skeleton-shimmer h-3 w-40 rounded" />
          <div className="skeleton-shimmer h-8 w-48 rounded" />
        </div>
      )}
      {trending.length > 0 && (
        <div className="px-5 py-3 border-t border-[var(--border-default)] flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] uppercase tracking-wide text-[var(--text-disabled)] mr-1">Trending families</span>
          {trending.map((m: any) => (
            <a
              key={m.id || m.name}
              href={m.url || `https://huggingface.co/${m.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[var(--text-tertiary)] hover:text-[var(--accent-green)] truncate max-w-[180px]"
              title={m.id || m.name}
            >
              {(m.name || m.id || '').split('/').pop()}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Curated HF watchlist — the frontier/open-weight repos Delta V
   actually tracks. IDs verified against the HF API (Aug 2026);
   gated repos (Meta Llama, MiniMax M1, …) still render as links,
   live stats are simply skipped for them (HTTP 401).
   The panel enriches from the hf.json snapshot AND a one-shot live
   fetch, so the chips are a stable curated set instead of whatever
   the trending cron happened to drop first.
   ───────────────────────────────────────────────────────────── */
const HF_WATCHLIST = [
  'deepseek-ai/DeepSeek-V3.2',
  'deepseek-ai/DeepSeek-R1',
  'Qwen/Qwen3-235B-A22B',
  'MiniMaxAI/MiniMax-M1-80k',
  'moonshotai/Kimi-K2-Instruct',
  'zai-org/GLM-4.6',
  'meta-llama/Llama-4-Maverick-17B-128E',
  'microsoft/Phi-4',
  'google/gemma-3-27b-it',
  'mistralai/Mistral-Small-3.2-24B-Instruct-2506',
];

const HF_WATCHLIST_KEYS = HF_WATCHLIST.map((id) => id.toLowerCase());

/** Index hf.json snapshot models for lookups (full id, short name, url). */
export function indexHfModels(models: any[]) {
  const by = new Map<string, any>();
  for (const m of models || []) {
    const name = String(m?.name || '').trim();
    if (!name) continue;
    by.set(name.toLowerCase(), m);
    const short = name.includes('/') ? name.split('/').pop()!.toLowerCase() : name.toLowerCase();
    by.set(short, m);
    if (m?.url) by.set(String(m.url).toLowerCase(), m);
  }
  return by;
}

function watchlistIdMatch(name: string): string | null {
  const n = String(name || '').toLowerCase();
  const short = n.includes('/') ? n.split('/').pop()! : n;
  if (HF_WATCHLIST_KEYS.includes(n)) return n;
  for (const key of HF_WATCHLIST_KEYS) {
    if (key.endsWith('/' + short)) return key;
  }
  return null;
}

/** Returns the curated watchlist (ordered, stats-enriched) plus the full
 *  display set: curated first, then snapshot models not already curated. */
function useCuratedWatchlist(rawModels: any[]) {
  const snapshotBy = useMemo(() => indexHfModels(rawModels), [rawModels]);
  const [live, setLive] = useState<Record<string, any>>({});

  const missing = useMemo(
    () => HF_WATCHLIST.filter((id) => !snapshotBy.has(id.toLowerCase())),
    [snapshotBy],
  );
  const missingKey = missing.join('|');

  useEffect(() => {
    if (!missingKey) return;
    let cancelled = false;
    Promise.allSettled(
      missing.map((id) =>
        fetch(`https://huggingface.co/api/models/${id}`, {
          headers: { accept: 'application/json' },
        })
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`http ${r.status}`))))
          .then((d) => {
            const [author, short] = id.split('/');
            return {
              [id.toLowerCase()]: {
                name: id,
                author,
                description:
                  (typeof d?.cardData?.summary === 'string' ? d.cardData.summary : '') ||
                  (typeof d?.description === 'string' ? d.description : '') ||
                  '',
                pipeline: d?.pipeline_tag || '',
                likes: d?.likes || 0,
                downloads: d?.downloads || 0,
                url: `https://huggingface.co/${id}`,
                short,
              },
            };
          })
          .catch(() => ({})),
      ),
    ).then((results) => {
      if (cancelled) return;
      const merged: Record<string, any> = {};
      for (const r of results) {
        if (r.status === 'fulfilled') Object.assign(merged, r.value);
      }
      setLive(merged);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missingKey, missing]);

  const curated = useMemo(() => {
    return HF_WATCHLIST.map((id) => {
      const k = id.toLowerCase();
      const snap = snapshotBy.get(k);
      const hit = live[k];
      if (snap) return snap;
      if (hit) return hit;
      return {
        name: id,
        author: id.split('/')[0],
        description: '',
        pipeline: '',
        likes: 0,
        downloads: 0,
        url: `https://huggingface.co/${id}`,
      };
    });
  }, [snapshotBy, live]);

  const display = useMemo(() => {
    const seen = new Set<string>();
    const out: any[] = [...curated];
    for (const c of curated) seen.add(String(c?.name || '').toLowerCase());
    for (const m of rawModels || []) {
      const n = String(m?.name || '').toLowerCase();
      if (!n || seen.has(n) || watchlistIdMatch(m?.name)) continue;
      seen.add(n);
      out.push(m);
    }
    return out;
  }, [curated, rawModels]);

  return { curated, display };
}

export default function AIDashboard({
  items, dd, catBoxes, TC, ago, ts,
}: {
  items: Item[]; dd: any; patents: PatentsData | null;
  catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; ts: (iso: string) => string;
}) {
  const aiCat = catBoxes.find((c: any) => c.id === 'ai');
  const hwCat = catBoxes.find((c: any) => c.id === 'hardware');
  const models: any[] = dd?.hfModels || [];
  const spaces: any[] = dd?.hfSpaces || [];
  const { curated: hfWatch, display: hfDisplay } = useCuratedWatchlist(models);
  const totalModels = hfWatch.length;
  const totalDownloads = hfWatch.reduce((s: number, m: any) => s + (m.downloads || 0), 0);
  const totalSpaces = spaces.length;

  const externalLabFeed: Item[] = dd?.aiLabFeed || [];
  const labSnap: Item[] = dd?.aiLabsSnap || [];

  const labResearch = useMemo(() => {
    const fromSignals = (items || []).filter((it) => {
      const src = (it.source || '').toLowerCase();
      const blob = `${it.title} ${it.summary || ''} ${src}`.toLowerCase();
      const labHit = LAB_ORGS.some((lab) => blob.includes(lab) || src.includes(lab));
      const sourceHit = LAB_SOURCES.some((s) => src.includes(s));
      const researchish =
        /paper|arxiv|research|technical report|preprint|release|announc|blog|model card|whitepaper|benchmark|leaderboard|eval|alignment|transformer|diffusion|agent|llm|foundation model/.test(blob)
        || sourceHit;
      const tagOk = !it.tag || it.tag === 'ai' || it.tag === 'hardware' || it.tag === 'science';
      // Broader: lab OR research source OR (AI-tagged researchish)
      if (sourceHit) return true;
      if (labHit && researchish) return true;
      if (tagOk && researchish && (labHit || /openai|anthropic|deepmind|mistral|meta ai|google|nvidia|hf|hugging/.test(blob))) return true;
      if (tagOk && (src.includes('lesswrong') || src.includes('alignment'))) return true;
      return false;
    });

    const perSrc: Record<string, number> = {};
    const merged = [...labSnap, ...externalLabFeed, ...fromSignals];
    const seen = new Set<string>();
    return merged.filter((it) => {
      const k = (it.title || '').toLowerCase().slice(0, 90);
      if (!k || seen.has(k)) return false;
      const src = (it.source || '').toLowerCase();
      const cap = src.includes('google') ? 3 : 5;
      perSrc[src] = (perSrc[src] || 0) + 1;
      if (perSrc[src] > cap) return false;
      seen.add(k);
      return true;
    }).slice(0, 18);
  }, [items, externalLabFeed, labSnap]);

  const tweetFeed = useMemo(() => {
    const isX = (src: string) =>
      src.startsWith('x:') || src.includes('twitter') || src.includes('nitter') || src.startsWith('@');

    const persona = (items || []).filter((it) => {
      const src = (it.source || '').toLowerCase();
      if (!isX(src)) return false;
      return AI_PERSONAS.some((p) => src.includes(p));
    });

    // Broader: X posts that look like AI frontier chatter
    const aiX = (items || []).filter((it) => {
      const src = (it.source || '').toLowerCase();
      if (!isX(src)) return false;
      if (AI_PERSONAS.some((p) => src.includes(p))) return true;
      const blob = `${it.title} ${it.summary || ''}`.toLowerCase();
      const tagOk = !it.tag || it.tag === 'ai' || it.tag === 'hardware' || it.tag === 'science';
      return tagOk && /llm|gpt|claude|gemini|model|agent|ai |ml |training|inference|open.?weight|alignment|transformer|diffusion|hugging|openai|anthropic|deepseek|qwen/.test(blob);
    });

    // Sci / AI X accounts already in pipeline even if not on persona list
    const pipelineX = (items || []).filter((it) => {
      const src = (it.source || '').toLowerCase();
      if (!isX(src)) return false;
      return /scitechera|emostaque|ylecun|nono2357|huggingface|openai|anthropic|deepmind|metaai|karpathy|sama/.test(src);
    });

    const snap: Item[] = dd?.aiPersonasSnap || [];
    const merged = [...snap, ...persona, ...pipelineX, ...aiX];
    const seen = new Set<string>();
    return merged.filter((it) => {
      const k = `${(it.source || '').toLowerCase()}|${(it.title || '').toLowerCase().slice(0, 60)}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }).slice(0, 24);
  }, [items, dd?.aiPersonasSnap]);

  const frontierItems = useMemo(() => {
    const extra = [
      ...((dd?.aiLabsSnap || []) as Item[]),
      ...((dd?.aiPersonasSnap || []) as Item[]),
    ];
    const merged = [...extra, ...(items || [])];
    const seen = new Set<string>();
    return merged.filter((it) => {
      if (!isAiFrontierItem(it)) return false;
      const k = (it.url || it.title || '').toLowerCase().slice(0, 90);
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    }).slice(0, 36);
  }, [items, dd?.aiLabsSnap, dd?.aiPersonasSnap]);

  return (
    <div className="space-y-5">
      {/* ── DATA FIRST ── */}
      <AIFrontierSignals items={frontierItems} ts={ts} />

      {/* HF watchlist stats */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 bg-gradient-to-r from-[var(--accent-cyan)]/[0.04] via-[var(--accent-purple)]/[0.04] to-transparent">
        {totalModels ? (
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">Models in watchlist</div>
              <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                <AnimatedValue value={totalModels} format={(n: number) => n.toLocaleString()} className="tabular-nums" />
              </div>
              <div className="mt-1.5 max-w-md">
                <PanelMeta
                  source="Hugging Face live + snapshot"
                  note="curated frontier watchlist (open-weight · MoE · vision) — not the full HF catalog"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hfWatch.map((m: any) => {
                  const id = m.name || m.id || '';
                  const href = m.url || `https://huggingface.co/${id}`;
                  return (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/[0.10] truncate max-w-[220px]"
                      title={id}
                    >
                      {id}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Watchlist downloads</div>
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

      <FrontierWatch models={hfDisplay} spaces={spaces} />

      <AbliteratedModels
        models={dd?.abliterated || []}
        byUse={dd?.abliteratedByUse || null}
        updated={dd?.abliteratedAt || null}
      />

      <ArenaLeaderboard lb={dd?.arenaLB} updated={dd?.arenaUpdated} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiCat && <CategoryBox cat={aiCat} ago={ago} TC={TC} />}
        {hwCat && <CategoryBox cat={hwCat} ago={ago} TC={TC} />}
      </div>

      {/* ── SOCIAL / RESEARCH FEEDS LAST ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-cyan)]/[0.05] to-transparent">
            <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold">Lab research</span>
            <PanelMeta
              source={dd?.aiLabsUpdatedAt || dd?.aiFeedsUpdatedAt ? 'DeepMind · OpenAI · Qwen · HF · arXiv' : 'signals'}
              updated={(dd?.aiLabsUpdatedAt || dd?.aiFeedsUpdatedAt)
                ? new Date(dd.aiLabsUpdatedAt || dd.aiFeedsUpdatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : null}
              note={`${labResearch.length} items · Google capped`}
            />
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[340px] overflow-y-auto scrollbar-hide">
            {labResearch.length === 0 ? (
              <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">No lab items</div>
            ) : labResearch.map((it, i) => (
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
                className="block px-5 py-2.5 hover:bg-white/[0.02] group">
                <div className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] line-clamp-2 leading-snug">{it.title}</div>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--text-muted)]">
                  <span className="truncate max-w-[140px]">{it.source}</span>
                  <span className="ml-auto tabular-nums">{ago(it.published_at)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-purple)]/[0.05] to-transparent">
            <span className="text-xs text-[var(--accent-purple)] uppercase tracking-[1.5px] font-bold">Persona posts</span>
            <PanelMeta
              source={dd?.aiPersonasUpdatedAt ? 'nitter · X personas' : 'X / pipeline'}
              note={`${tweetFeed.length} posts · agents / local / gen-AI`}
            />
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[340px] overflow-y-auto scrollbar-hide">
            {tweetFeed.length === 0 ? (
              <div className="px-5 py-6 text-center text-[10px] text-[var(--text-disabled)]">No posts yet</div>
            ) : tweetFeed.map((it, i) => (
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"
                className="block px-5 py-2.5 hover:bg-white/[0.02] group">
                <div className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] line-clamp-2 leading-snug">{it.title}</div>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--text-muted)]">
                  <span className="truncate max-w-[140px]">{(it.source || '').replace(/^(x:|X:)\s*/i, '@')}</span>
                  <span className="ml-auto tabular-nums">{ago(it.published_at)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
