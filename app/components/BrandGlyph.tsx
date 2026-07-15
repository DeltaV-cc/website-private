type BrandGlyphProps = { kind?: 'ai' | 'web3' | 'forge' | 'opsec'; className?: string };

const paths = {
  ai: <><path d="M12 4v16M4 12h16" /><circle cx="12" cy="12" r="8" /><path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" /></>,
  web3: <><path d="M12 3 19 7v10l-7 4-7-4V7l7-4Z" /><path d="m5 7 7 4 7-4M12 11v10" /></>,
  forge: <><path d="M5 19 19 5M7 5h12v12" /><path d="M4 12a8 8 0 0 0 8 8" /><circle cx="7" cy="17" r="1" /></>,
  opsec: <><path d="M12 3 19 6v5c0 4.5-2.7 7.8-7 10-4.3-2.2-7-5.5-7-10V6l7-3Z" /><path d="m8 12 2.5 2.5L16 9" /></>,
};

export default function BrandGlyph({ kind = 'ai', className = '' }: BrandGlyphProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[kind]}</svg>;
}
