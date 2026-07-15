'use client';
/* LMSys Chatbot Arena leaderboard display */
export default function ArenaLeaderboard({ lb }: { lb: any }) {
  if (!lb || !Array.isArray(lb) || lb.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-purple)]/[0.06] to-transparent">
        <span className="text-xs text-[var(--accent-purple)] uppercase tracking-[1.5px] font-bold">Chatbot Arena</span>
        <span className="text-[10px] text-[var(--text-muted)]">LMSys ELO</span>
      </div>
      <div className="divide-y divide-white/[0.02] max-h-[300px] overflow-y-auto">
        {lb.slice(0, 10).map((model: any, i: number) => (
          <div key={i} className="flex items-center gap-3 px-5 py-2.5 text-xs hover:bg-white/[0.03] transition-colors">
            <span className="w-5 text-right tabular-nums text-[var(--text-muted)] font-medium">{i + 1}</span>
            <span className="flex-1 text-[var(--text-secondary)] truncate">{model.name || model.model_name || ''}</span>
            <span className="tabular-nums text-[var(--text-primary)] font-semibold">{model.elo || model.score || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
