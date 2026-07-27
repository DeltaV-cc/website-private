/* IntelHub — Infosec Dashboard
   CISA KEV + NVD CVEs + HIBP Breaches + Watchlist */
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { KevEntry, CveEntry, BreachEntry } from '../types';
import { SeverityBadge, fmtCompact, PanelMeta } from './Shared';

type InfosecMeta = {
  source: 'live' | 'snapshot' | 'mixed' | 'empty';
  updatedAt: string | null;
};

function nvdUrl(id: string) {
  return `https://nvd.nist.gov/vuln/detail/${encodeURIComponent(id)}`;
}
function cisaKevUrl(cve: string) {
  return `https://www.cisa.gov/known-exploited-vulnerabilities-catalog?search_api_fulltext=${encodeURIComponent(cve)}`;
}

function isOverdue(due?: string) {
  if (!due) return false;
  const t = new Date(due).getTime();
  return !isNaN(t) && t < Date.now();
}

export default function InfosecDashboard({
  dd2, watchlist, catBoxes, TC, ago, infosecMeta,
}: {
  dd2: any; watchlist: any[]; catBoxes: any[]; TC: Record<string, string>;
  ago: (iso: string) => string;
  infosecMeta?: InfosecMeta;
}) {
  const [sevFilter, setSevFilter] = useState<'all' | 'CRITICAL' | 'HIGH'>('all');

  const kev: KevEntry[] = dd2?.kev || [];
  const cves: CveEntry[] = dd2?.cves || [];
  const breaches: BreachEntry[] = useMemo(() => {
    const list: BreachEntry[] = dd2?.breaches || [];
    return [...list].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  }, [dd2?.breaches]);
  const cyberCat = catBoxes.find((c: any) => c.id === 'cybersec');

  const filteredCves = useMemo(() => {
    if (sevFilter === 'all') return cves;
    return cves.filter((c) => c.severity === sevFilter || (sevFilter === 'CRITICAL' && c.score >= 9));
  }, [cves, sevFilter]);

  const sortedKev = useMemo(() => {
    return [...kev].sort((a, b) => {
      const ao = isOverdue(a.dueDate) ? 0 : 1;
      const bo = isOverdue(b.dueDate) ? 0 : 1;
      if (ao !== bo) return ao - bo;
      return String(b.dateAdded || '').localeCompare(String(a.dateAdded || ''));
    });
  }, [kev]);

  const totalKEV = kev.length;
  const criticalCVEs = cves.filter((c: CveEntry) => c.severity === 'CRITICAL' || c.score >= 9).length;
  const totalExposed = breaches.reduce((s: number, b: BreachEntry) => s + (b.count || 0), 0);
  const overdueCount = kev.filter((k) => isOverdue(k.dueDate)).length;

  const staleNote =
    infosecMeta?.source === 'snapshot' ? 'snapshot fallback' :
    infosecMeta?.source === 'mixed' ? 'partial live' :
    undefined;

  const metaUpdated = infosecMeta?.updatedAt
    ? new Date(infosecMeta.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className="space-y-5">
      {/* Stats Banner */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 bg-gradient-to-r from-[var(--accent-red)]/[0.06] via-[var(--accent-orange)]/[0.04] to-transparent">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-1">Threat Landscape</div>
            <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">
              {totalKEV || '...'} <span className="text-sm font-normal text-[var(--text-tertiary)]">active KEV exploits</span>
            </div>
            <div className="mt-2">
              <PanelMeta
                source={infosecMeta?.source === 'live' ? 'CISA · NVD · HIBP' : 'CISA · NVD · HIBP'}
                updated={metaUpdated}
                note={staleNote}
              />
            </div>
          </div>
          <div className="flex items-center gap-6 md:gap-8 flex-wrap">
            <div className="text-right">
              <div className="text-[10px] text-[var(--text-muted)] uppercase">Critical CVEs</div>
              <div className={`text-lg font-bold tabular-nums ${criticalCVEs > 0 ? 'text-[var(--accent-red)]' : 'text-[var(--text-tertiary)]'}`}>
                {cves.length ? criticalCVEs : '...'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[var(--text-muted)] uppercase">KEV overdue</div>
              <div className={`text-lg font-bold tabular-nums ${overdueCount > 0 ? 'text-[var(--accent-red)]' : 'text-[var(--text-tertiary)]'}`}>
                {kev.length ? overdueCount : '...'}
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
              <div className="text-lg font-bold tabular-nums text-[var(--accent-amber)]">{watchlist.length || '0'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* KEV */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-red)]/[0.06] to-transparent">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse" />
              <span className="text-xs text-[var(--accent-red)] uppercase tracking-[1.5px] font-bold">CISA KEV</span>
              <span className="text-[10px] text-[var(--text-muted)]">Known Exploited Vulns</span>
            </div>
            <PanelMeta source="CISA" />
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
            {sortedKev.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">Loading CISA KEV data...</div>
            ) : sortedKev.slice(0, 10).map((v: KevEntry, i: number) => {
              const overdue = isOverdue(v.dueDate);
              return (
                <a
                  key={v.cve || i}
                  href={cisaKevUrl(v.cve)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-xs font-mono font-semibold text-[var(--accent-red)]">{v.cve}</span>
                    <span className={`text-[10px] tabular-nums ${overdue ? 'text-[var(--accent-red)] font-semibold' : 'text-[var(--text-muted)]'}`}>
                      {overdue ? 'OVERDUE · ' : 'Due: '}
                      {v.dueDate ? new Date(v.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-snug mb-1">{v.name}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">{v.vendor} — {v.product}</div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent CVEs */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between flex-wrap gap-2 bg-gradient-to-r from-[var(--accent-orange)]/[0.06] to-transparent">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">Recent CVEs</span>
              <span className="text-[10px] text-[var(--text-muted)]">NVD Feed</span>
            </div>
            <div className="flex gap-1 text-[10px]">
              {(['all', 'CRITICAL', 'HIGH'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSevFilter(k)}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    sevFilter === k
                      ? 'bg-white text-black font-medium'
                      : 'bg-white/[0.06] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {k === 'all' ? 'All' : k === 'CRITICAL' ? 'Crit' : 'High'}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
            {filteredCves.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">
                {cves.length === 0 ? 'Loading NVD data...' : 'No CVEs match this filter'}
              </div>
            ) : filteredCves.slice(0, 10).map((cve: CveEntry, i: number) => (
              <a
                key={cve.id || i}
                href={nvdUrl(cve.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">{cve.id}</span>
                  <SeverityBadge sev={cve.severity} score={cve.score} />
                  {cve.published && (
                    <span className="text-[10px] text-[var(--text-muted)] ml-auto tabular-nums">
                      {new Date(cve.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-snug line-clamp-2">{cve.description}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Breaches — sorted by date */}
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-amber)]/[0.06] to-transparent">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--accent-amber)] uppercase tracking-[1.5px] font-bold">Data Breaches</span>
              <span className="text-[10px] text-[var(--text-muted)]">Have I Been Pwned · by date</span>
            </div>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-[360px] overflow-y-auto">
            {breaches.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-[var(--text-disabled)]">Loading breach data...</div>
            ) : breaches.slice(0, 10).map((b: BreachEntry, i: number) => (
              <div key={b.name || i} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
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

        {/* Watchlist + Cybersec Feed */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--border-default)] flex items-center justify-between bg-gradient-to-r from-[var(--accent-amber)]/[0.06] to-transparent">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--accent-amber)] uppercase tracking-[1.5px] font-bold">Watchlist</span>
                <span className="text-[10px] text-[var(--text-muted)]">{watchlist.length} items</span>
              </div>
              <PanelMeta source="curated" />
            </div>
            <div className="divide-y divide-white/[0.02] max-h-[180px] overflow-y-auto">
              {watchlist.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs text-[var(--text-disabled)]">No active watchlist items</div>
              ) : watchlist.slice(0, 8).map((w: any, i: number) => (
                <a
                  key={i}
                  href={w.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 hover:bg-white/[0.03] group"
                >
                  <div className="text-xs font-medium text-[#ededed]/60 group-hover:text-[#ededed]/85 line-clamp-2">{w.title}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[#ededed]/20">
                    <span className="truncate max-w-[100px]">{w.source}</span>
                    {w.added && <span className="ml-auto tabular-nums">{ago(w.added)}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {cyberCat ? (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
              <div className="px-5 py-3 border-b border-[var(--border-default)] bg-gradient-to-r from-[var(--accent-orange)]/[0.06] to-transparent">
                <span className="text-xs text-[var(--accent-orange)] uppercase tracking-[1.5px] font-bold">{cyberCat.label} Signals</span>
                <span className="text-[10px] text-[var(--text-muted)] ml-2">{cyberCat.items.length} items</span>
              </div>
              <div className="divide-y divide-white/[0.02] max-h-[200px] overflow-y-auto">
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

          {/* Brand rail — same card language, light content enhancement */}
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1.5px] mb-2">Delta V OpSec</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link href="/opsec/sota-stack/" className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[var(--text-tertiary)] hover:text-[var(--accent-amber)] hover:bg-white/[0.08] transition-colors">SOTA Operator Stack</Link>
              <Link href="/opsec/" className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[var(--text-tertiary)] hover:text-[var(--accent-amber)] hover:bg-white/[0.08] transition-colors">OpSec pillar</Link>
              <Link href="/tutorials/" className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[var(--text-tertiary)] hover:text-[var(--accent-amber)] hover:bg-white/[0.08] transition-colors">Tutorials</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
