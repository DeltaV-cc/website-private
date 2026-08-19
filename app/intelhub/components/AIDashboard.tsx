/* IntelHub — AI Dashboard
   Frontier Watch + labs research + personas + HF orgs + Arena */
'use client';

import { useMemo, useState } from 'react';
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
];

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
  const [filter, setFilter] = useState<'all' | 'new' | 'downloads' | 'agent' | 'vision' | 'moe'>('all');

  const baseItems = useMemo(
    () => [
      ...models.map((m) => enrichItem(m, 'model')),
      ...spaces.map((s) => enrichItem(s, 'space')),
    ],
    [models, spaces],
  );

  const filterCounts = useMemo(() => {
    const keys = ['all', 'new', 'downloads', 'agent', 'vision', 'moe'] as const;
    const out: Record<string, number> = {};
    for (const k of keys) out[k] = baseItems.filter((x) => matchFilter(x, k)).length;
    return out;
  }, [baseItems]);

  const filtered = useMemo(() => {
    let allItems = baseItems.filter((x) => matchFilter(x, filter));
    if (filter === 'downloads' || filter === 'all') {
      allItems = [...allItems].sort((a, b) => (b.downloads || b.likes || 0) - (a.downloads || a.likes || 0));
    } else if (filter === 'new') {
      allItems = [...allItems].sort((a, b) => (a.downloads || 0) - (b.downloads || 0));
    } else {
      allItems = [...allItems].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return allItems.slice(0, 16);
  }, [baseItems, filter]);

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center gap-2 flex-wrap bg-gradient-to-r from-[var(--accent-cyan)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-cyan)] uppercase tracking-[1.5px] font-bold shrink-0">Frontier Watch</span>
        <span className="text-[10px] text-[var(--text-muted)] shrink-0">HF models & spaces · enriched snapshot</span>
        <div className="flex gap-1 text-[10px] ml-auto flex-wrap justify-end">
          {[
            { key: 'all', label: 'All' }, { key: 'new', label: 'New' }, { key: 'downloads', label: 'Popular' },
            { key: 'agent', label: 'Agent' }, { key: 'vision', label: 'Vision' }, { key: 'moe', label: 'MoE' },
          ].map(f => (
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
          <a key={`${item.name}-${i}`} href={item.url || '#'} target="_blank" rel="noopener noreferrer"
            className="block p-4 bg-[var(--bg-deep)] hover:bg-[var(--bg-elevated)] transition-colors duration-150 group">
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
                {item.downloads != null && <span>{fmtNum(item.downloads || 0)} ↓</span>}
              </div>
            </div>
            <div className="mt-1.5 text-[10px] text-[var(--text-muted)]">{item.author || 'HF'}</div>
          </a>
        )) : (
          <div className="col-span-2 px-5 py-8 text-center text-[10px] text-[var(--text-disabled)]">
            No matches for {filter}
          </div>
        )}
      </div>
    </div>
  );
}

function TopOrgs({ models }: { models: any[] }) {
  const orgs = useMemo(() => {
    const map = new Map<string, { org: string; models: number; downloads: number; likes: number }>();
    for (const raw of models) {
      const m = enrichItem(raw, 'model');
      const org = (m.author || 'unknown').toLowerCase();
      if (!org || org === 'unknown') continue;
      const prev = map.get(org) || { org: m.author || org, models: 0, downloads: 0, likes: 0 };
      prev.models += 1;
      prev.downloads += m.downloads || 0;
      prev.likes += m.likes || 0;
      map.set(org, prev);
    }
    return [...map.values()].sort((a, b) => b.downloads - a.downloads).slice(0, 8);
  }, [models]);

  if (!orgs.length) return null;
  const maxDl = orgs[0]?.downloads || 1;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-purple)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-purple)] uppercase tracking-[1.5px] font-bold">Top HF orgs</span>
        <PanelMeta source="from watchlist models" note="by downloads" />
      </div>
      <div className="p-4 space-y-2 max-h-[280px] overflow-y-auto scrollbar-hide">
        {orgs.map((o, i) => (
          <a
            key={o.org}
            href={`https://huggingface.co/${encodeURIComponent(o.org)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-xs group"
          >
            <span className="w-5 text-right tabular-nums text-[var(--text-disabled)]">#{i + 1}</span>
            <span className="w-28 truncate text-[var(--text-secondary)] group-hover:text-[var(--accent-purple)]">{o.org}</span>
            <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)]/70 to-[var(--accent-cyan)]/40"
                style={{ width: `${Math.max(4, (o.downloads / maxDl) * 100)}%` }}
              />
            </div>
            <span className="w-10 text-right text-[var(--text-muted)] tabular-nums">{o.models}</span>
            <span className="w-16 text-right text-[var(--text-tertiary)] tabular-nums">{fmtCompact(o.downloads)}</span>
          </a>
        ))}
        <div className="flex justify-between text-[9px] text-[var(--text-disabled)] pt-1">
          <span>Org</span>
          <span>models · downloads in snapshot</span>
        </div>
      </div>
    </div>
  );
}

/** HF abliterated (refusal-removed) models — ranked by popularity × recentness.
 *  Data comes from the 6h cron snapshot (data/hf-abliterated.json, already sorted
 *  by `combo`); rendered defensively in case of missing sort. */
function AbliteratedModels({ models, updated }: { models: any[]; updated?: string | null }) {
  const rows = useMemo(() => {
    const list = Array.isArray(models) ? [...models] : [];
    const withCombo = list
      .map((m: any) => (typeof m.combo === 'number' ? m : { ...m, combo: 0.5 }));
    return withCombo.sort((a: any, b: any) => (b.combo ?? 0) - (a.combo ?? 0)).slice(0, 14);
  }, [models]);

  const updatedLabel = updated
    ? (() => {
        const d = new Date(updated);
        return isNaN(d.getTime()) ? updated : d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      })()
    : null;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-green)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-green)] uppercase tracking-[1.5px] font-bold">Abliterated models</span>
        <PanelMeta
          source="HF live · search 'abliterated'"
          note="ranked: popularity × recency"
          updated={updatedLabel}
        />
      </div>
      {rows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-default)]">
          {rows.map((m: any, i: number) => (
            <a
              key={`${m.id || m.name}-${i}`}
              href={m.url || `https://huggingface.co/${m.id || m.author}/${m.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[var(--bg-deep)] hover:bg-[var(--bg-elevated)] transition-colors duration-150 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-[var(--accent-green)] tabular-nums shrink-0 leading-none">#{i + 1}</span>
                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-green)] truncate transition-colors">{m.name || m.id}</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5 truncate">{m.author || 'HF'}{m.daysAgo != null ? ` · ${m.daysAgo}d ago` : ''}</div>
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
    </div>
  );
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
  const totalModels = models.length;
  const totalDownloads = models.reduce((s: number, m: any) => s + (m.downloads || 0), 0);
  const totalSpaces = spaces.length;

  const externalLabFeed: Item[] = dd?.aiLabFeed || [];

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

    const merged = [...externalLabFeed, ...fromSignals];
    const seen = new Set<string>();
    return merged.filter((it) => {
      const k = (it.title || '').toLowerCase().slice(0, 90);
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    }).slice(0, 16);
  }, [items, externalLabFeed]);

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

    const merged = [...persona, ...pipelineX, ...aiX];
    const seen = new Set<string>();
    return merged.filter((it) => {
      const k = `${(it.source || '').toLowerCase()}|${(it.title || '').toLowerCase().slice(0, 60)}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }).slice(0, 16);
  }, [items]);

  return (
    <div className="space-y-5">
      {/* ── DATA FIRST ── */}
      <AIFrontierSignals items={items} ts={ts} />

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
                  source="Hugging Face multi-query snapshot"
                  note="curated set (downloads · likes · gen · vision · moe · agent) — not the full HF catalog"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {models.slice(0, 6).map((m: any) => (
                  <a
                    key={m.name}
                    href={m.url || `https://huggingface.co/${m.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[var(--text-tertiary)] hover:text-[var(--accent-cyan)] truncate max-w-[160px]"
                    title={m.name}
                  >
                    {(m.name || '').split('/').pop()}
                  </a>
                ))}
                {models.length > 6 && (
                  <span className="text-[10px] text-[var(--text-disabled)] self-center">+{models.length - 6} more</span>
                )}
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

      <FrontierWatch models={models} spaces={spaces} />

      <AbliteratedModels models={dd?.abliterated || []} updated={dd?.abliteratedAt || null} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopOrgs models={models} />
        <ArenaLeaderboard lb={dd?.arenaLB} updated={dd?.arenaUpdated} />
      </div>

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
              source={dd?.aiFeedsUpdatedAt ? 'arXiv · HF · OpenAI · signals' : 'signals'}
              updated={dd?.aiFeedsUpdatedAt
                ? new Date(dd.aiFeedsUpdatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : null}
              note={`${labResearch.length} items`}
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
            <PanelMeta source="X / pipeline" note={`${tweetFeed.length} items · AI-related`} />
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
