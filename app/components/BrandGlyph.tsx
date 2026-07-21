type BrandGlyphProps = { kind?: 'ai' | 'web3' | 'forge' | 'opsec'; className?: string };

const paths = {
  ai: <><path d="M9.2 5.1A3.2 3.2 0 0 0 6 8.3v.4A3.3 3.3 0 0 0 4.8 14a3.2 3.2 0 0 0 3 4.8h1.8M14.8 5.1A3.2 3.2 0 0 1 18 8.3v.4a3.3 3.3 0 0 1 1.2 5.3 3.2 3.2 0 0 1-3 4.8h-1.8M12 4v16" /><path d="m8.2 9.2 2.2 2M15.8 9.2l-2.2 2M8.2 14.8l2.2-2M15.8 14.8l-2.2-2" /><circle cx="12" cy="12" r="2.2" /><circle cx="7" cy="8" r="1.35" /><circle cx="17" cy="8" r="1.35" /><circle cx="7" cy="16" r="1.35" /><circle cx="17" cy="16" r="1.35" /></>,
  web3: <><path d="M9.5 10.8 14.5 9M9.5 13.2l5 1.8" /><circle cx="7" cy="12" r="2.75" /><circle cx="17" cy="8" r="2.75" /><circle cx="17" cy="16" r="2.75" /></>,
  forge: <><path d="M3.5 16.7h17l-1.6 2.2H5.1l-1.6-2.2Z" /><path d="M6.2 16.7 8 12.5h7.2l2.6 4.2" /><path d="M8 12.5V9.2h7.2l4.3 1.1c-1.1 1.5-2.6 2.2-4.3 2.2" /><path d="M7 9.2h8.2" /><path d="M9 18.9h6" /></>,
  opsec: <><path d="M12 3 19 6v5c0 4.5-2.7 7.8-7 10-4.3-2.2-7-5.5-7-10V6l7-3Z" /><path d="m8 12 2.5 2.5L16 9" /></>,
};

export default function BrandGlyph({ kind = 'ai', className = '' }: BrandGlyphProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[kind]}</svg>;
}
