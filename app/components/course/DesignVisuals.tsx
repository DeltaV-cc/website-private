'use client';

import React from 'react';
import ArchitectureDiagram, { ArchitectureFlow } from '@/app/components/ArchitectureDiagram';

/** Rent vs own — core mental model for Open Design */
export function RentVsOwnVisual() {
  return (
    <figure
      className="my-8 rounded-2xl border border-[var(--border-default)] overflow-hidden"
      aria-label="Rented design versus owned design"
    >
      <div className="grid md:grid-cols-2">
        <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[var(--border-default)] bg-[var(--bg-deep)]">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-amber)]">
            Rented
          </div>
          <div className="mt-3 space-y-3">
            {[
              { t: 'Chat tab', d: 'PNG lives in scroll history' },
              { t: 'Closed SaaS', d: 'Project locked to subscription' },
              { t: 'No system', d: 'Every prompt reinvents the brand' },
            ].map((row) => (
              <div
                key={row.t}
                className="rounded-xl border border-[var(--accent-amber)]/20 bg-[var(--bg-surface)] px-4 py-3"
              >
                <div className="text-sm font-medium text-[var(--text-primary)] line-through decoration-[var(--accent-amber)]/50">
                  {row.t}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{row.d}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--text-tertiary)]">When the tab dies, the work dies.</p>
        </div>
        <div className="p-5 md:p-6 bg-[var(--bg-card)]">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
            Owned (this course)
          </div>
          <div className="mt-3 space-y-3">
            {[
              { t: 'design-lab/ folder', d: 'One tree for every artifact' },
              { t: 'PPTX / HTML / PNG', d: 'Open offline — no agent required' },
              { t: 'DESIGN.md', d: 'Brand contract the agent reloads' },
            ].map((row) => (
              <div
                key={row.t}
                className="rounded-xl border border-[var(--accent-cyan)]/30 bg-[var(--bg-deep)] px-4 py-3"
              >
                <div className="text-sm font-medium text-[var(--text-primary)]">{row.t}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{row.d}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--accent-cyan)]">Success = file you can open tomorrow.</p>
        </div>
      </div>
    </figure>
  );
}

/** Stack: You → Hermes → Open Design → files */
export function DesignStackVisual() {
  return (
    <ArchitectureDiagram
      title="Design stack"
      subtitle="Roles — do not blur them"
      layers={[
        {
          id: 'you',
          label: 'You',
          accent: 'orange',
          nodes: [
            { title: 'Brief', subtitle: 'Audience, claim, constraints', accent: 'orange' },
            { title: 'Taste + approve', subtitle: 'Open files before anyone else', accent: 'orange' },
          ],
        },
        {
          id: 'hermes',
          label: 'Hermes (already installed)',
          accent: 'cyan',
          nodes: [
            { title: 'Agent loop', subtitle: 'Tools · skills · write files', accent: 'cyan' },
            { title: 'Profile + SOUL', subtitle: 'From Own Your AI Part I', accent: 'cyan' },
          ],
        },
        {
          id: 'od',
          label: 'Open Design',
          accent: 'purple',
          nodes: [
            { title: 'Workspace', subtitle: 'Preview · systems · export', accent: 'purple' },
            { title: 'DESIGN.md', subtitle: 'Brand contract on disk', accent: 'purple' },
          ],
        },
        {
          id: 'files',
          label: 'Owned output',
          accent: 'amber',
          nodes: [
            { title: 'decks/', subtitle: 'PPTX · HTML · PDF', accent: 'amber' },
            { title: 'images/', subtitle: 'Stills + prompts-used.md', accent: 'amber' },
            { title: 'content/', subtitle: 'Campaign pack', accent: 'amber' },
          ],
        },
      ]}
    />
  );
}

/** Quality loop visual */
export function DesignLoopVisual() {
  return (
    <ArchitectureFlow
      title="Quality loop (never skip “open file”)"
      accent="cyan"
      steps={[
        { label: 'Brief', detail: 'Spine on disk' },
        { label: 'Generate', detail: 'Agent writes files' },
        { label: 'Open file', detail: 'Offline check' },
        { label: 'Edit', detail: '3 concrete fixes' },
        { label: 'Export', detail: 'Handoff zip' },
      ]}
    />
  );
}

/** Two-part journey */
export function TwoPartJourneyVisual() {
  return (
    <figure className="my-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
      <figcaption className="px-5 pt-4 pb-2 text-sm font-semibold">Course journey</figcaption>
      <div className="p-4 md:p-5 flex flex-col md:flex-row gap-3 items-stretch">
        <div className="flex-1 rounded-xl border border-[var(--accent-cyan)]/35 bg-[var(--bg-deep)] p-4">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
            Part I
          </div>
          <div className="mt-2 text-base font-semibold">See it differently</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['00 Welcome', '01 Stack', '02 Deck', '03 Images', '04 Pack'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border-default)] px-2.5 py-1 text-[11px] text-[var(--text-secondary)]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">Aha: offline deck + stills + campaign folder</p>
        </div>
        <div className="hidden md:flex items-center text-[var(--accent-cyan)]" aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 rounded-xl border border-[var(--accent-orange)]/35 bg-[var(--bg-deep)] p-4">
          <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
            Part II
          </div>
          <div className="mt-2 text-base font-semibold">Own the system</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['05 Brand', '06 Models', '07 Skills', '08 Export', '09 Habits', '10 Done'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border-default)] px-2.5 py-1 text-[11px] text-[var(--text-secondary)]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">Repeatable: DESIGN.md · Kimi · Imagine · handoff</p>
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="rounded-lg border border-dashed border-[var(--border-default)] px-3 py-2 text-xs text-[var(--text-tertiary)]">
          Out of scope → Open Video (HyperFrames / Remotion) — not this course
        </div>
      </div>
    </figure>
  );
}

/** Folder tree visual */
export function FolderTreeVisual() {
  const rows = [
    { name: 'design-lab/', note: 'course root', depth: 0, accent: true },
    { name: 'brief.md', note: 'spine', depth: 1 },
    { name: 'brand/DESIGN.md', note: 'contract', depth: 1 },
    { name: 'decks/', note: 'PPTX · HTML', depth: 1 },
    { name: 'images/', note: 'stills', depth: 1 },
    { name: 'images/prompts-used.md', note: 'regenerate', depth: 2 },
    { name: 'content/[campaign]/', note: 'pack', depth: 1 },
    { name: 'handoff/README.md', note: 'offline', depth: 1 },
  ];
  return (
    <figure className="my-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
      <figcaption className="px-5 pt-4 pb-2 text-sm font-semibold">Folder contract</figcaption>
      <ul className="px-4 pb-5 font-mono text-xs md:text-sm space-y-1">
        {rows.map((r) => (
          <li
            key={r.name}
            className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--bg-hover)]"
            style={{ paddingLeft: `${0.5 + r.depth * 1.1}rem` }}
          >
            <span className={r.accent ? 'text-[var(--accent-cyan)] font-semibold' : 'text-[var(--text-primary)]'}>
              {r.depth > 0 ? '└ ' : ''}
              {r.name}
            </span>
            <span className="text-[var(--text-muted)] text-[11px]">{r.note}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Kimi vs Imagine split */
export function ModelSplitVisual() {
  return (
    <figure className="my-8 grid sm:grid-cols-2 gap-3">
      <div className="rounded-2xl border border-[var(--accent-cyan)]/35 bg-[var(--bg-deep)] p-5">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-cyan)]">
          Kimi
        </div>
        <div className="mt-2 text-lg font-semibold">Builds structure</div>
        <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
          <li>· Decks / HTML layout</li>
          <li>· DESIGN.md edits</li>
          <li>· Multi-file projects</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-[var(--accent-orange)]/35 bg-[var(--bg-deep)] p-5">
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--accent-orange)]">
          Grok Imagine
        </div>
        <div className="mt-2 text-lg font-semibold">Paints stills</div>
        <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
          <li>· Heroes / social squares</li>
          <li>· Variants & mood</li>
          <li>· Keyframes for later video</li>
        </ul>
      </div>
      <p className="sm:col-span-2 text-center text-xs text-[var(--text-muted)]">
        Free OD models = fallback · No video models in this course
      </p>
    </figure>
  );
}

/** Content pack composition */
export function ContentPackVisual() {
  return (
    <ArchitectureDiagram
      title="One content pack"
      subtitle="One campaign folder — human ships"
      layers={[
        {
          id: 'spine',
          label: 'Spine',
          accent: 'cyan',
          nodes: [{ title: 'brief.md', subtitle: 'Audience · claim · CTA · forbidden claims', accent: 'cyan' }],
        },
        {
          id: 'assets',
          label: 'Assets from Part I',
          accent: 'purple',
          nodes: [
            { title: 'Deck / title slide', subtitle: 'Module 02', accent: 'purple' },
            { title: 'Image set', subtitle: 'Module 03 + prompts-used.md', accent: 'purple' },
          ],
        },
        {
          id: 'posts',
          label: 'Words',
          accent: 'orange',
          nodes: [
            { title: 'Post A', subtitle: 'Problem angle', accent: 'orange' },
            { title: 'Post B', subtitle: 'Proof angle', accent: 'orange' },
            { title: 'Post C', subtitle: 'Ask / CTA', accent: 'orange' },
          ],
        },
      ]}
    />
  );
}

/** Map module slug → visual block(s) */
export function DesignModuleVisual({ slug }: { slug: string }) {
  switch (slug) {
    case '00':
      return (
        <>
          <RentVsOwnVisual />
          <TwoPartJourneyVisual />
          <FolderTreeVisual />
        </>
      );
    case '01':
      return <DesignStackVisual />;
    case '02':
      return <DesignLoopVisual />;
    case '03':
      return (
        <ArchitectureFlow
          title="Still production"
          accent="orange"
          steps={[
            { label: 'Purpose', detail: 'One aspect ratio' },
            { label: 'Style card', detail: 'Locked palette' },
            { label: 'Batch', detail: '6–10 raw' },
            { label: 'Cull', detail: '3–6 winners' },
            { label: 'Log', detail: 'prompts-used.md' },
          ]}
        />
      );
    case '04':
      return <ContentPackVisual />;
    case '05':
      return (
        <ArchitectureFlow
          title="Brand as contract"
          accent="purple"
          steps={[
            { label: 'Extract / write', detail: 'DESIGN.md' },
            { label: 'Save path', detail: 'brand/' },
            { label: 'Regenerate', detail: 'One slide only' },
            { label: 'Score', detail: 'Fix system, not only slide' },
          ]}
        />
      );
    case '06':
      return <ModelSplitVisual />;
    case '07':
      return (
        <ArchitectureFlow
          title="Skill filter"
          accent="cyan"
          steps={[
            { label: 'List', detail: 'All skills' },
            { label: 'Keep design', detail: 'Deck · brand · image' },
            { label: 'Disable motion', detail: 'Video → Course 03' },
            { label: 'One explicit run', detail: 'File on disk' },
          ]}
        />
      );
    case '08':
      return (
        <ArchitectureFlow
          title="Handoff package"
          accent="amber"
          steps={[
            { label: 'Sources', detail: 'design-lab/' },
            { label: 'Exports', detail: 'PPTX · PDF' },
            { label: 'Brand + prompts', detail: 'Regenerate' },
            { label: 'Quit Hermes', detail: 'Open offline' },
          ]}
        />
      );
    case '09':
      return <DesignLoopVisual />;
    case '10':
      return <TwoPartJourneyVisual />;
    default:
      return null;
  }
}
