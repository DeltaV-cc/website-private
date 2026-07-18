/* IntelHub — Infosec Dashboard
   CISA KEV + NVD CVEs + HIBP Breaches + Watchlist */
'use client';

import { KevEntry, CveEntry, BreachEntry } from '../types';
import { SeverityBadge, fmtCompact } from './Shared';

export default function InfosecDashboard({
  dd2, watchlist, catBoxes, TC, ago,
}: {
  dd2: any; watchlist: any[]; catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string;
}) {
  const kev: KevEntry[] = dd2?.kev || [];
  const cves: CveEntry[] = dd2?.cves || [];
  const breaches: BreachEntry[] = dd2?.breaches || [];
  const cyberCat = catBoxes.find((c: any) => c.id === 'cybersec');

  const totalKEV = kev.length;
  const criticalCVEs = cves.filter((c: CveEntry) => c.severity === 'CRITICAL' || c.score >= 9).length;
  const totalExposed = breaches.reduce((s: number, b: BreachEntry) => s + (b.count || 0), 0);

  return (
    <div className="space-y-5">
      {/* Stats Banner */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 bg-gradient-to-r from-[var(--accent-red)]/[0.06] via-[var(--accent-orange)]/[0.04] to-transparent">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">Threat Landscape</div>
            <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
              {totalKEV || '...'} <span className="text-sm font-normal text-[var(--text-tertiary)]">active KEV exploits</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-[10px] text-[var(--text-muted)] uppercase">Critical CVEs</div>
              <div className={`text-lg font-bold tabular-nums ${criticalCVEs > 0 ? 'text-[var(--accent-red)]' : 'text-[var(--text-tertiary)]'}`}>
                {cves.length ? criticalCVEs : '...'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[var(--text-muted)] uppercase">Records Exposed</div>
              <div className="text-lg font-bold tabular-nums text-[var(--accent-orange)]">
                {breaches.length ? fmtCompact(totalExposed) : '...'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[var(--text-muted)] uppercase">Watchlist</div>
              <div className="text-lg font-bold tabular-nums text-[var(--accent-amber)]">{watchlist.length || '...'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* KEV — Known Exploited Vulns */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-red)]/[0.06] to-transparent">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse" />
              <span className="text-xs text-[var(--accent-red)] uppercase tracking-[1.5px] font-bold">CISA KEV</span>
              <span className="text-[10px] text-[var(--text-muted)]">Known Exploited Vulns</span>
            </div>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
            {kev.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">Loading CISA KEV data...</div>
            ) : kev.slice(0, 8).map((v: KevEntry, i: number) => (
              <div key={i} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-semibold text-[var(--accent-red)]">{v.cve}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Due: {v.dueDate ? new Date(v.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-snug mb-1">{v.name}</div>
                <div className="text-[10px] text-[var(--text-tertiary)]">{v.vendor} — {v.product}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent CVEs */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-orange)]/[0.06] to-transparent">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">Recent CVEs</span>
              <span className="text-[10px] text-[var(--text-muted)]">NVD Feed</span>
            </div>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
            {cves.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">Loading NVD data...</div>
            ) : cves.slice(0, 8).map((cve: CveEntry, i: number) => (
              <div key={i} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">{cve.id}</span>
                  <SeverityBadge sev={cve.severity} score={cve.score} />
                  {cve.published && (
                    <span className="text-[10px] text-[var(--text-muted)] ml-auto tabular-nums">
                      {new Date(cve.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-snug line-clamp-2">{cve.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Breaches */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-amber)]/[0.06] to-transparent">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--accent-amber)] uppercase tracking-[1.5px] font-bold">Data Breaches</span>
              <span className="text-[10px] text-[var(--text-muted)]">Have I Been Pwned</span>
            </div>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
            {breaches.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">Loading breach data...</div>
            ) : breaches.slice(0, 8).map((b: BreachEntry, i: number) => (
              <div key={i} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{b.name}</span>
                  <span className="text-[10px] tabular-nums font-semibold text-[var(--accent-red)]">
                    {b.count ? fmtCompact(b.count) : '?'} records
                  </span>
                </div>
                {b.domain && <div className="text-[10px] text-[var(--accent-cyan)] mb-0.5">{b.domain}</div>}
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
                  {b.date && <span>{b.date}</span>}
                  {b.data && <span className="truncate">{b.data}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cybersec Feed */}
        <div>
          {cyberCat ? (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-[var(--border-default)] bg-gradient-to-r from-[var(--accent-orange)]/[0.06] to-transparent">
                <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">{cyberCat.label} Signals</span>
                <span className="text-[10px] text-[var(--text-muted)] ml-2">{cyberCat.items.length} items</span>
              </div>
              <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
                {cyberCat.items.length === 0 ? (
                  <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">No recent signals</div>
                ) : cyberCat.items.slice(0, 10).map((it: any, j: number) => (
                  <a key={j} href={it.url} target="_blank" rel="noopener noreferrer"
                    className="block px-4 py-2.5 hover:bg-white/[0.03] group">
                    <div className="text-xs font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-2">{it.title}</div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#ededed]/20">
                      <span className="truncate max-w-[80px]">{it.source}</span>
                      <span className="ml-auto tabular-nums">{ago(it.published_at)}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center">
              <span className="text-xs text-[var(--text-disabled)]">No cybersec signals in the current window</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
