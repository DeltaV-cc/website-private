/**
 * Outbound research links for IntelHub entities.
 *
 * Macro equities / patent holders → Artemis company pages.
 * Web3 on-chain (chains, DEX, pure DeFi protocols) → DeFi Llama first.
 * Web3 CeFi / equity-adjacent names → Artemis (more relevant research surface).
 *
 * Artemis SPA often returns 200 for unknown slugs; we still link best-effort.
 */

const ARTEMIS_COMPANY = 'https://www.artemis.ai/company';
const LLAMA_CHAIN = 'https://defillama.com/chain';
const LLAMA_PROTOCOL = 'https://defillama.com/protocol';
const LLAMA_STABLE = 'https://defillama.com/stablecoin';

/** Ticker / short name → Artemis slug overrides */
const ARTEMIS_TICKER_SLUG: Record<string, string> = {
  aapl: 'apple',
  msft: 'microsoft',
  googl: 'alphabet',
  goog: 'alphabet',
  amzn: 'amazon',
  meta: 'meta',
  nvda: 'nvidia',
  tsm: 'tsmc',
  tsmc: 'tsmc',
  avgo: 'broadcom',
  amd: 'amd',
  intc: 'intel',
  qcom: 'qualcomm',
  mu: 'micron',
  asml: 'asml',
  lcid: 'lucid',
  tsla: 'tesla',
  coin: 'coinbase',
  mstr: 'microstrategy',
  hoo: 'robinhood',
  hood: 'robinhood',
  blk: 'blackrock',
  jpm: 'jpmorgan',
  gs: 'goldman-sachs',
  v: 'visa',
  ma: 'mastercard',
  pypl: 'paypal',
  sq: 'block',
  ibm: 'ibm',
  samsung: 'samsung',
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
  usdt: 'tether',
  usdc: 'circle',
};

/** Names that are CeFi / equity-research better on Artemis than DeFi Llama */
const CEFI_NAME_RE =
  /\b(coinbase|binance|kraken|robinhood|blackrock|fidelity|circle|tether|microstrategy|strategy|paypal|block|cash\s*app|visa|mastercard|galaxy|grayscale|invesco|vaneck|bitwise|21shares|etf|nasdaq|cboe|cme|dtcc|swift|stripe|plaid|revolut|nubank|sofi|interactive\s*brokers|schwab|vanguard|state\s*street)\b/i;

const CORP_SUFFIX_RE =
  /\b(inc\.?|incorporated|corp\.?|corporation|ltd\.?|limited|llc|plc|co\.?|company|holdings?|group|technologies|technology|systems?|class\s+[a-z]\b.*|common\s+stock.*|ordinary\s+shares?)\b/gi;

export function slugifyEntity(raw: string): string {
  return (raw || '')
    .toLowerCase()
    .replace(CORP_SUFFIX_RE, ' ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .slice(0, 64);
}

/** Artemis company page from ticker and/or company name. */
export function artemisCompanyUrl(opts: { symbol?: string; name?: string }): string {
  const sym = (opts.symbol || '').trim().toLowerCase().replace(/[^a-z0-9.]/g, '');
  if (sym && ARTEMIS_TICKER_SLUG[sym]) {
    return `${ARTEMIS_COMPANY}/${ARTEMIS_TICKER_SLUG[sym]}`;
  }
  // multi-class tickers BRK.B → try base
  const base = sym.split('.')[0];
  if (base && ARTEMIS_TICKER_SLUG[base]) {
    return `${ARTEMIS_COMPANY}/${ARTEMIS_TICKER_SLUG[base]}`;
  }
  const fromName = slugifyEntity(opts.name || '');
  if (fromName) return `${ARTEMIS_COMPANY}/${fromName}`;
  if (sym) return `${ARTEMIS_COMPANY}/${sym.replace(/\./g, '-')}`;
  return ARTEMIS_COMPANY;
}

export function defillamaChainUrl(name: string): string {
  return `${LLAMA_CHAIN}/${encodeURIComponent(name)}`;
}

export function defillamaProtocolUrl(nameOrSlug: string): string {
  const slug = slugifyEntity(nameOrSlug) || nameOrSlug;
  return `${LLAMA_PROTOCOL}/${encodeURIComponent(slug)}`;
}

export function defillamaStablecoinUrl(name: string): string {
  return `${LLAMA_STABLE}/${encodeURIComponent(slugifyEntity(name) || name)}`;
}

export function isCefiEntity(name: string, symbol?: string): boolean {
  const blob = `${name || ''} ${symbol || ''}`;
  if (CEFI_NAME_RE.test(blob)) return true;
  // Known equity-crypto tickers
  const s = (symbol || '').toUpperCase();
  return ['COIN', 'MSTR', 'HOOD', 'SQ', 'PYPL', 'BLK'].includes(s);
}

/**
 * Web3 link policy:
 * - chain → DeFi Llama chain
 * - protocol / dex / pure crypto → DeFi Llama protocol
 * - stablecoin → DeFi Llama stablecoin (Artemis for USDT/USDC issuers as secondary is possible)
 * - cefi / company → Artemis company
 */
export type Web3EntityKind = 'chain' | 'protocol' | 'stablecoin' | 'token' | 'exchange' | 'auto';

export function web3EntityLink(
  name: string,
  kind: Web3EntityKind = 'auto',
  symbol?: string,
): { href: string; source: 'defillama' | 'artemis'; label: string } {
  const n = name || symbol || '';
  const k = kind === 'auto' ? (isCefiEntity(n, symbol) ? 'exchange' : 'protocol') : kind;

  if (k === 'chain') {
    return { href: defillamaChainUrl(n), source: 'defillama', label: 'DeFi Llama' };
  }
  if (k === 'exchange' || isCefiEntity(n, symbol)) {
    return {
      href: artemisCompanyUrl({ name: n, symbol }),
      source: 'artemis',
      label: 'Artemis',
    };
  }
  if (k === 'stablecoin') {
    // Issuer research on Artemis when known; else Llama stable page
    if (isCefiEntity(n, symbol) || /tether|usdt|circle|usdc|paypal|pyusd/i.test(n)) {
      return {
        href: artemisCompanyUrl({ name: n, symbol }),
        source: 'artemis',
        label: 'Artemis',
      };
    }
    return { href: defillamaStablecoinUrl(n), source: 'defillama', label: 'DeFi Llama' };
  }
  // protocol / token default: DeFi Llama
  return { href: defillamaProtocolUrl(n), source: 'defillama', label: 'DeFi Llama' };
}

/** Macro top-movers: equities always Artemis; crypto prefers Artemis (equity+crypto desk) with Llama fallback unused in UI. */
export function macroMoverLink(row: {
  asset?: string;
  symbol?: string;
  name?: string;
}): { href: string; source: 'artemis' | 'defillama' } {
  // Equities + crypto majors both map to Artemis company pages (bitcoin, ethereum, …)
  return {
    href: artemisCompanyUrl({ symbol: row.symbol, name: row.name || row.symbol }),
    source: 'artemis',
  };
}
