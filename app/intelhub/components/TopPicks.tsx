/* ================================================================
   IntelHub — Top Picks section (URL-free titles + brief)
   ================================================================ */
'use client';

import { Item } from '../types';

export default function TopPicks({
  top3, TC, ts,
}: {
  top3: any[]; TC: Record<string, string>; ts: (iso: string) => string;
}) {
  if (top3.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs text-[#ededed]/25 uppercase tracking-[.25em] font-bold">Top Picks</span>
          <span className="w-px h-3 bg-white/[0.06]" />
          <span className="text-xs text-[#ededed]/10">chiefstaff</span>
        </div>
        <div className="text-[#ededed]/15 text-sm italic">Top picks after triage.</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs text-[#ededed]/25 uppercase tracking-[.25em] font-bold">Top Picks</span>
        <span className="w-px h-3 bg-white/[0.06]" />
        <span className="text-xs text-[#ededed]/10">chiefstaff</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3.map((it: any, i: number) => {
          const cleanTitle = (it.title || '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
          const brief = (it.summary || '').replace(/https?:\/\/\S+/g, '').trim().slice(0, 160);
          return (
            <a
              key={i}
              href={it.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-5 border border-[#222] hover:border-white/15 bg-gradient-to-b from-white/[0.03] to-white/[0.005] hover:from-white/[0.06] transition-all duration-300"
            >
              <div className="text-base font-semibold leading-snug text-[#ededed]/90 group-hover:text-white group-hover:underline decoration-white/20 underline-offset-4">
                {cleanTitle}
              </div>
              {brief && (
                <p className="text-[#ededed]/35 text-sm mt-2 line-clamp-2 leading-relaxed">{brief}</p>
              )}
              <div className="flex items-center gap-2 mt-3 text-xs text-[#ededed]/25">
                {it.tag && <span className={`px-2 py-0.5 rounded-lg font-semibold text-xs ${TC[it.tag] || ''}`}>#{it.tag}</span>}
                <span>{it.source}</span>
                <span className="ml-auto tabular-nums">{ts(it.published_at)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
