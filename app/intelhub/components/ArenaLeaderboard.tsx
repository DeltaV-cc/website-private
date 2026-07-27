'use client';
/* LMSys Chatbot Arena leaderboard display */

type ArenaModel = {
  rank?: number;
  name?: string;
  model_name?: string;
  vendor?: string;
  elo?: number;
  score?: number;
  votes?: number;
  ci?: number;
};

export default function ArenaLeaderboard({
  lb,
  updated,
}: {
  lb: ArenaModel[] | { models?: ArenaModel[]; updated?: string } | null | undefined;
  updated?: string | null;
}) {
  const models: ArenaModel[] = Array.isArray(lb)
    ? lb
    : Array.isArray(lb?.models)
      ? lb.models
      : [];
  const updatedLabel = updated || (lb && !Array.isArray(lb) ? lb.updated : null);

  if (!models.length) return null;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-purple)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-purple)] uppercase tracking-[1.5px] font-bold">Chatbot Arena</span>
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
          <span>LMSys ELO</span>
          {updatedLabel && <span className="text-[var(--text-disabled)]">· {updatedLabel}</span>}
        </div>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[300px] overflow-y-auto">
        {models.slice(0, 10).map((model, i) => (
          <div key={model.name || model.model_name || i} className="flex items-center gap-3 px-5 py-2.5 text-xs hover:bg-white/[0.03] transition-colors">
            <span className="w-5 text-right tabular-nums text-[var(--text-muted)] font-medium">{model.rank ?? i + 1}</span>
            <div className="flex-1 min-w-0">
              <span className="text-[var(--text-secondary)] truncate block">{model.name || model.model_name || ''}</span>
              {model.vendor && <span className="text-[9px] text-[var(--text-disabled)]">{model.vendor}</span>}
            </div>
            <span className="tabular-nums text-[var(--text-primary)] font-semibold">
              {typeof model.elo === 'number' ? Math.round(model.elo) : (model.score ?? '')}
            </span>
            {typeof model.votes === 'number' && (
              <span className="w-14 text-right tabular-nums text-[9px] text-[var(--text-disabled)] hidden sm:inline">
                {(model.votes / 1000).toFixed(0)}k votes
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
