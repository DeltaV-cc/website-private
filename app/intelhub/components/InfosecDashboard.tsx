/* ================================================================
   IntelHub — Infosec Dashboard tab
   ================================================================ */
'use client';

import { Item } from '../types';
import { TileBox, TileRow, SeverityBadge, ShieldIcon, PackageIcon, BellIcon } from './Shared';

export default function InfosecDashboard({
  items, dd2, watchlist, TC, ago,
  SOCMED_SOURCES,
}: {
  items: Item[]; dd2: any; watchlist: any[]; TC: Record<string, string>;
  ago: (iso: string) => string; SOCMED_SOURCES: string[];
}) {
  return (
    <div className="space-y-5">
      {/* ── Active Threats banner ── */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.03] p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-red-400 uppercase tracking-[.15em] font-bold">Active Threats</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {/* KEV */}
          {dd2?.kev?.length > 0 ? (
            <div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3">
              <div className="flex items-center gap-2 font-semibold text-red-300 mb-1">
                <ShieldIcon />
                <span>KEV: {dd2.kev.length} active</span>
              </div>
              <div className="text-[#ededed]/50 text-xs">CISA Known Exploited. Apply patches within due dates.</div>
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-3">
              <div className="flex items-center gap-2 font-semibold text-red-300 mb-1">
                <ShieldIcon />
                <span>Check assets</span>
              </div>
              <div className="text-[#ededed]/50 text-xs">Revoke wallet approvals via revoke.cash</div>
            </div>
          )}
          {/* CVEs */}
          {dd2?.cves?.filter((c: any) => c.severity === 'CRITICAL' || c.severity === 'HIGH').length > 0 ? (
            <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3">
              <div className="flex items-center gap-2 font-semibold text-orange-300 mb-1">
                <PackageIcon />
                <span>{dd2.cves.filter((c: any) => c.severity === 'CRITICAL' || c.severity === 'HIGH').length} critical CVEs</span>
              </div>
              <div className="text-[#ededed]/50 text-xs">Update affected systems immediately.</div>
            </div>
          ) : (
            <div className="rounded-xl border border-orange-500/10 bg-orange-500/[0.02] p-3">
              <div className="flex items-center gap-2 font-semibold text-orange-300 mb-1">
                <PackageIcon />
                <span>Pending CVEs</span>
              </div>
              <div className="text-[#ededed]/50 text-xs">Run audit. Patch compromised packages.</div>
            </div>
          )}
          {/* Breaches */}
          {dd2?.breaches?.length > 0 ? (
            <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3">
              <div className="flex items-center gap-2 font-semibold text-yellow-300 mb-1">
                <BellIcon />
                <span>{dd2.breaches.length} breaches detected</span>
              </div>
              <div className="text-[#ededed]/50 text-xs">Check HIBP. Rotate credentials immediately.</div>
            </div>
          ) : (
            <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] p-3">
              <div className="flex items-center gap-2 font-semibold text-yellow-300 mb-1">
                <BellIcon />
                <span>No major breaches</span>
              </div>
              <div className="text-[#ededed]/50 text-xs">Continue monitoring exposure.</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Intel Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TileBox
          title="CISA Alerts"
          accent="text-emerald-400"
          color="border-l-emerald-400"
          count={items.filter(i => i.source?.toLowerCase().includes('cisa')).length}
        >
          {items
            .filter(i => i.source?.toLowerCase().includes('cisa'))
            .slice(0, 6)
            .map((it, j) => (
              <TileRow key={j} it={it} ago={ago} />
            ))}
        </TileBox>

        <TileBox title="CISA KEV" accent="text-red-400" color="border-l-red-400" count={dd2?.kev?.length || 0}>
          {(dd2?.kev || []).map((v: any, j: number) => (
            <div key={j} className="px-4 py-3 border-b border-[#222] last:border-0">
              <div className="text-sm font-medium text-[#ededed]/70">{v.cve}</div>
              <div className="text-xs text-[#ededed]/35 mt-0.5 line-clamp-2">{v.vendor} — {v.product}: {v.name}</div>
              <div className="text-xs text-red-400/60 mt-1">Due: {v.dueDate?.slice(0, 10)}</div>
            </div>
          ))}
        </TileBox>

        <TileBox title="Latest CVEs" accent="text-orange-400" color="border-l-orange-400" count={dd2?.cves?.length || 0}>
          {(dd2?.cves || []).map((c: any, j: number) => (
            <div key={j} className="px-4 py-3 border-b border-[#222] last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[#ededed]/70">{c.id}</span>
                <SeverityBadge sev={c.severity} score={c.score} />
              </div>
              <div className="text-xs text-[#ededed]/30 mt-0.5 line-clamp-2">{c.description}</div>
            </div>
          ))}
        </TileBox>

        <TileBox title="Recent Breaches" accent="text-pink-400" color="border-l-pink-400" count={dd2?.breaches?.length || 0}>
          {(dd2?.breaches || []).map((b: any, j: number) => (
            <div key={j} className="px-4 py-3 border-b border-[#222] last:border-0">
              <div className="text-sm font-medium text-[#ededed]/70">{b.name}</div>
              <div className="text-xs text-[#ededed]/35 mt-0.5">{b.domain} · {b.count?.toLocaleString()} accounts · {b.data}</div>
              <div className="text-xs text-[#ededed]/20 mt-0.5">{b.date}</div>
            </div>
          ))}
        </TileBox>
      </div>

      {/* ── Cybersec Watchlist ── */}
      {watchlist.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <TileBox title="Cybersec Watchlist" accent="text-rose-400" color="border-l-rose-400" count={watchlist.length}>
            {watchlist.map((w: any, j: number) => (
              <a
                key={j}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 hover:bg-white/[0.03] group"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#ededed]/70 group-hover:text-[#ededed]/90 line-clamp-2 leading-snug">
                      {w.title}
                    </div>
                    <div className="text-xs text-[#ededed]/25 mt-1">
                      {w.source}
                      {w.summary ? (
                        <>
                          <span className="mx-1.5">·</span>
                          <span className="text-[#ededed]/15">{w.summary}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs">
                  <span className="text-rose-400/50">Expires {new Date(w.expires).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </TileBox>
        </div>
      )}

      {/* ── Social Media ── */}
      <div className="grid grid-cols-1 gap-4">
        <TileBox
          title="Social Media"
          accent="text-sky-400"
          color="border-l-sky-400"
          count={items.filter(i => SOCMED_SOURCES.some(s => i.source?.toLowerCase().includes(s))).length}
        >
          {items
            .filter(i => SOCMED_SOURCES.some(s => i.source?.toLowerCase().includes(s)))
            .slice(0, 12)
            .map((it, j) => (
              <TileRow key={j} it={it} ago={ago} />
            ))}
        </TileBox>
      </div>
    </div>
  );
}
