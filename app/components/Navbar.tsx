'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/ai/', label: 'AI' },
  { href: '/web3/', label: 'Web3' },
  { href: '/opsec/', label: 'OpSec' },
  { href: '/intelhub/', label: 'IntelHub' },
  { href: '/contact/', label: 'Contact' },
];
const FORGE_LINKS = [
  { href: '/blog/', label: 'Blog', detail: 'Essays and field notes' },
  { href: '/tutorials/', label: 'Tutorials', detail: 'Builds and walkthroughs' },
  { href: '/forge/course/', label: 'AI Course', detail: 'AI Mastery curriculum' },
];

function isActive(pathname: string, href: string) {
  const base = href.replace(/\/$/, '');
  return pathname === href || pathname === base || pathname.startsWith(`${base}/`);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false); const [forgeOpen, setForgeOpen] = useState(false); const [query, setQuery] = useState('');
  const pathname = usePathname() || '/'; const router = useRouter(); const menuId = useId(); const forgeId = useId(); const forgeRef = useRef<HTMLDivElement>(null);
  // Route links close the menus explicitly; this effect also handles browser back/forward.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); setForgeOpen(false); }, [pathname]);
  useEffect(() => { if (!forgeOpen) return; const close = (event: MouseEvent) => { if (!forgeRef.current?.contains(event.target as Node)) setForgeOpen(false); }; const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setForgeOpen(false); }; document.addEventListener('mousedown', close); document.addEventListener('keydown', key); return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', key); }; }, [forgeOpen]);
  useEffect(() => { if (!mobileOpen) return; const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false); }; document.addEventListener('keydown', key); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', key); document.body.style.overflow = previous; }; }, [mobileOpen]);
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const value = query.trim(); router.push(value ? `/research/?q=${encodeURIComponent(value)}` : '/research/'); };

  return <nav className="fixed top-0 w-full z-50 border-b border-[var(--border-default)] bg-[var(--bg-deep)]/90 backdrop-blur-xl" aria-label="Primary">
    <div className="max-w-[1440px] mx-auto px-5 md:px-8"><div className="flex items-center gap-5 min-h-16">
      <Link href="/" className="flex items-center gap-2.5 text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors group flex-shrink-0" aria-label="Delta V - Home"><Logo size={28} /><span className="text-lg font-semibold tracking-[-.5px]">Delta V</span></Link>
      <div className="hidden lg:flex items-center gap-0.5" role="list">
        {NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} role="listitem" aria-current={isActive(pathname, item.href) ? 'page' : undefined} className={`relative px-3 py-2 text-sm transition-colors ${isActive(pathname, item.href) ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{item.label}{isActive(pathname, item.href) && <span className="absolute left-3 right-3 -bottom-[1px] h-px bg-[var(--accent-cyan)]" aria-hidden="true" />}</Link>)}
        <div ref={forgeRef} className="relative" onMouseEnter={() => setForgeOpen(true)} onMouseLeave={() => setForgeOpen(false)} onFocus={() => setForgeOpen(true)}>
          <div className={`flex items-center ${isActive(pathname, '/forge/') ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}><Link href="/forge/" className="px-3 py-2 text-sm">Forge</Link><button type="button" aria-expanded={forgeOpen} aria-controls={forgeId} aria-label="Show Forge resources" onClick={() => setForgeOpen((value) => !value)} className="px-1 py-2 text-xs text-[var(--accent-purple)]">⌄</button></div>
          {forgeOpen && <div id={forgeId} className="absolute right-0 top-full mt-3 w-64 border border-[var(--border-default)] bg-[var(--bg-surface)] p-2 shadow-[var(--shadow-lg)]" role="menu">{FORGE_LINKS.map((item) => <Link key={item.href} href={item.href} role="menuitem" className="block px-3 py-3 hover:bg-[var(--bg-hover)]" onClick={() => setForgeOpen(false)}><span className="block text-sm text-[var(--text-primary)]">{item.label}</span><span className="block mt-1 text-xs text-[var(--text-muted)]">{item.detail}</span></Link>)}</div>}
        </div>
      </div>
      <form className="hidden md:flex items-center ml-auto w-44 xl:w-56 border-b border-[var(--border-default)] focus-within:border-[var(--accent-cyan)] transition-colors" onSubmit={submitSearch}><label htmlFor="nav-research" className="sr-only">Research</label><svg className="w-4 h-4 text-[var(--accent-cyan)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5" strokeLinecap="round"/></svg><input id="nav-research" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="research" className="min-w-0 w-full bg-transparent px-2 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none" /></form>
      <button type="button" className="lg:hidden ml-auto p-2 text-[var(--text-primary)]" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls={menuId}><span className="text-xl">{mobileOpen ? '×' : '☰'}</span></button>
    </div></div>
    {mobileOpen && <div id={menuId} className="lg:hidden border-t border-[var(--border-default)] bg-[var(--bg-deep)] max-h-[calc(100dvh-4rem)] overflow-y-auto" role="dialog" aria-modal="true"><div className="px-5 py-4"><form className="flex items-center gap-2 border-b border-[var(--border-default)] mb-4" onSubmit={submitSearch}><span className="text-[var(--accent-cyan)]">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="research" className="w-full bg-transparent py-3 text-sm placeholder:text-[var(--text-muted)] focus:outline-none" /></form>{NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} className="block py-3 text-[var(--text-secondary)]" onClick={() => setMobileOpen(false)}>{item.label}</Link>)}<button type="button" className="flex w-full items-center justify-between py-3 text-left text-[var(--text-secondary)]" aria-expanded={forgeOpen} onClick={() => setForgeOpen((value) => !value)}>Forge <span className="text-[var(--accent-purple)]">{forgeOpen ? '−' : '+'}</span></button>{forgeOpen && <div className="pl-4 border-l border-[var(--border-default)]">{FORGE_LINKS.map((item) => <Link key={item.href} href={item.href} className="block py-3 text-sm text-[var(--text-tertiary)]" onClick={() => setMobileOpen(false)}>{item.label}</Link>)}</div>}</div></div>}
  </nav>;
}
