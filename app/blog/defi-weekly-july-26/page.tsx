'use client';

import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';
import { siteAssetUrl } from '@/lib/site';

export default function DeFiWeeklyJuly26() {
  const [artemisBody, setArtemisBody] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(siteAssetUrl('/data/artemis-newsletter.json'))
      .then((r) => r.json())
      .then((d) => setArtemisBody(d?.latest_weekly?.body_html || null))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <BlogPostLayout
      title="Weekly Delta Financial Brief — July 26, 2026"
      date="July 26, 2026"
      category="Weekly Delta Financial Brief"
      type="Dashboard"
      readingTime="10 min read"
      footerVariant="weekly"
      excerpt="S&P Pantera Digital Asset Index launches, powered by Artemis revenue data. Robinhood Chain hits $500M daily DEX volume as tokenized RWAs grow 4.5x. BTC holds $64K through a flat macro week."
    >
      {/* ========================================================
          MARKET PULSE — weekly data only, no text
          ======================================================== */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 my-6">
        <h2 className="!text-lg !font-semibold !mt-0 mb-3">Market Pulse — This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">BTC Range</div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              <span className="text-[var(--accent-red)]">$63,686</span>
              <span className="text-[var(--text-muted)] mx-1">–</span>
              <span className="text-[var(--accent-green)]">$66,910</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Low · High</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">ETH Range</div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              <span className="text-[var(--accent-red)]">$1,843</span>
              <span className="text-[var(--text-muted)] mx-1">–</span>
              <span className="text-[var(--accent-green)]">$1,963</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Low · High</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">Total MCap</div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">$2.32T</div>
            <div className="text-[10px] text-[var(--accent-green)] mt-0.5">+1.5% WoW</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px] mb-1">24h Vol / 30d Avg</div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">75%</div>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex-1 h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent-green)] rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">75%</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">$51B of $68B avg</div>
          </div>
        </div>
      </div>

      {/* ========================================================
          TODAY WE HIGHLIGHT — 6 items, unified
          ======================================================== */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 my-6">
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-[1px] mb-4">Today We Highlight</div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">S&P Pantera Digital Asset Index Launches — A Fundamentals-Based Benchmark</p>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">S&P Dow Jones Indices and Pantera Capital launched the SPPDA index, powered by Artemis on-chain revenue data. 18 revenue-generating tokens with capped market-cap weighting. Top constituents: ETH, BNB, SOL. Bitcoin and XRP excluded — they fail the protocol revenue criteria. A milestone for fundamentals-based crypto indexing in institutional portfolios.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">Robinhood Chain: $500M Daily DEX Volume — Memecoins Still Lead, RWAs Rising</p>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">Robinhood Chain hit ~$500M daily DEX volume (mostly memecoins via Uniswap and pons.family launchpad), $595M TVL (Morpho/Ethena leading), and 250K DAU. Tokenized RWAs reached $19M market cap — up 4.5x in a month. Jon Ma: &ldquo;RWAs are growing on Robinhood chain, but still primarily a memecoin chain.&rdquo;</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">BTC Holds $64K — Semis Recover, ETF Flows Stabilize</p>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">Risk assets traded flat for the week. BTC ranged $63,686–$66,910, closing near $65,340. Spot ETF outflows stabilized after a 6-week bleeding streak. Semiconductors recovered lost ground. BTC dominance at 56.5% — capital still rotating defensively into BTC over alts.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">S&P Pantera Index Signals Institutional Shift to On-Chain Fundamentals</p>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">The SPPDA marks the first time a major index provider has built a crypto benchmark on protocol revenue rather than market cap alone. Artemis data feeds the screening and weighting. For asset managers, this unlocks a new category: fundamentals-weighted crypto exposure that looks more like equity factor investing than passive beta.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">Ostium Oracle Manipulation — $23.75M Drained via Fake BTC Price Feed</p>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">An attacker exploited Ostium&apos;s trusted price forwarder on Arbitrum, submitting a fake $60K Bitcoin quote to drain $23.75M from the OLP vault. The entire attack — looped leveraged trades settled against a manipulated price — executed in a single 5.5-minute atomic transaction. The protocol&apos;s own bug bounty had excluded the keeper/forwarder path used.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold mb-1">PMUSD Depeg Deepens — Day 86 at $0.44, PSI Holds at 93.4</p>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">PMUSD hit 5,602 bps below peg — trading at $0.44 on a $37.8M float. Now on day 86 of decline. PSI remains at 93.4 (34th consecutive BEDROCK day) as the broader $317B+ stablecoin market absorbs the stress. DEWS shows 11 names at ALERT or worse, but institutional-grade assets (USDT, USDC, DAI) remain structurally sound.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-4 pt-3 border-t border-[var(--border-default)]">Sources: Artemis, S&P Global, Pantera Capital, Glassnode, Rekt News, Pharos Watch</p>
      </div>

      {/* ========================================================
          ARTEMIS BODY — full newsletter, no banner
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-10 mb-4">This Week&apos;s Briefing</h2>
      <div className="my-6">
        {artemisBody ? (
          <>
            <style>{`
              .artemis-body h1:first-child,
              .artemis-body h1:first-of-type,
              .artemis-body h2:first-child,
              .artemis-body h2:first-of-type,
              .artemis-body h3:first-child,
              .artemis-body h3:first-of-type { display: none !important; }
            `}</style>
            <div 
              className="artemis-body prose prose-invert max-w-none
                [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--text-primary)] [&_h2]:mt-8 [&_h2]:mb-4
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--text-primary)] [&_h3]:mt-6 [&_h3]:mb-3
                [&_p]:text-sm [&_p]:text-[var(--text-tertiary)] [&_p]:leading-relaxed [&_p]:mb-3
                [&_strong]:text-[var(--text-primary)]
                [&_ul]:text-sm [&_ul]:text-[var(--text-tertiary)] [&_ul]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1
                [&_li]:mb-1
                [&_img]:rounded-xl [&_img]:border [&_img]:border-[var(--border-default)] [&_img]:my-4 [&_img]:w-full
                [&_figure]:my-4
                [&_figcaption]:text-[10px] [&_figcaption]:text-[var(--text-muted)] [&_figcaption]:mt-1
                [&_a]:text-[var(--accent-gold)] [&_a]:hover:underline
                [&_hr]:border-[var(--border-default)] [&_hr]:my-6
                [&_.captioned-image-container]:my-6
                [&_.image-caption]:text-[10px] [&_.image-caption]:text-[var(--text-muted)]"
              dangerouslySetInnerHTML={{ __html: artemisBody }}
            />
          </>
        ) : loaded ? null : (
          <div className="text-center py-12 text-sm text-[var(--text-muted)]">
            Loading Artemis newsletter…
          </div>
        )}
      </div>

      {/* ========================================================
          DIVIDER
          ======================================================== */}
      <div className="flex items-center gap-3 my-10">
        <div className="flex-1 h-px bg-[var(--bg-elevated)]" />
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[2px]">Delta V Inputs</span>
        <div className="flex-1 h-px bg-[var(--bg-elevated)]" />
      </div>

      {/* ========================================================
          REKT WATCH — Last 7 Days (all hacks published July 19–26)
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Rekt Watch — Last 7 Days</h2>
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 my-4">
        <div className="border-l-2 border-[var(--accent-red)] pl-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[var(--text-primary)]">Ostium — $23.75M</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-red)]/15 text-[var(--accent-red)]">Oracle Manipulation</span>
            <span className="text-[10px] text-[var(--text-muted)]">July 15 · Reported July 21</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Attacker exploited Ostium&apos;s trusted price forwarder on Arbitrum. Submitted a fake $60K BTC quote, settled looped leveraged trades against the manipulated price, and drained the OLP vault in a single 5.5-minute atomic transaction. The keeper/forwarder path used was explicitly excluded from the protocol&apos;s bug bounty.{' '}
            <a href="https://rekt.news/ostium-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full post-mortem</a></p>
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-3">Also in recent weeks (outside the 7-day window but still relevant):</p>
        <div className="space-y-2">
          <div className="border-l-2 border-[var(--accent-red)]/50 pl-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-[var(--text-tertiary)]">Bonzo Finance — $9.05M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-red)]/10 text-[var(--accent-red)]/70">Oracle Verifier Flaw</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">Supra oracle verifier accepted zeroed signature against zeroed key. Flaw unpatched for two years.{' '}
              <a href="https://rekt.news/bonzo-finance-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Report</a></p>
          </div>
          <div className="border-l-2 border-[var(--accent-red)]/50 pl-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-[var(--text-tertiary)]">BonkDAO — $19.3M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-red)]/10 text-[var(--accent-red)]/70">Governance Attack</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">Attacker bought 1% of BONK, passed malicious proposal with 2.9% turnout. No code broken.{' '}
              <a href="https://rekt.news/bonkdao-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Report</a></p>
          </div>
          <div className="border-l-2 border-[var(--accent-red)]/50 pl-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs text-[var(--text-tertiary)]">Summer Finance — $6.04M</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-red)]/10 text-[var(--accent-red)]/70">Stale Asset NAV</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">Capped-for-removal Ark still counted in vault NAV. Flash loans inflated share prices.{' '}
              <a href="https://rekt.news/summer-finance-rekt" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Report</a></p>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)]">
          <p className="text-xs text-[var(--text-tertiary)]">
            <strong className="text-[var(--text-primary)]">Takeaway:</strong> Oracle manipulation remains the #1 DeFi attack vector this month — Ostium ($23.75M) and Bonzo ($9.05M) both exploited oracle/pricer flaws. Combined with the BonkDAO governance attack, July losses total $58.2M across four incidents. Oracles and governance are the soft underbelly; code audits don&apos;t catch trusted-relayer logic or voter apathy.
          </p>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-3">Source: Rekt News</p>
      </div>

      {/* ========================================================
          PHAROS WATCH — stablecoins
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-10 mb-4">Pharos Watch — Stablecoins</h2>
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 my-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
          <h3 className="text-base font-semibold text-[var(--text-primary)]">PMUSD Finds No Floor — Day 86 at $0.44</h3>
        </div>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
          Pharos digest #153 (July 27): PMUSD depegged further to <strong className="text-[var(--accent-red)]">5,602 bps below peg</strong>, trading at $0.44 on a $37.8M market cap. Now on day 86 of decline with no floor in sight. PSI held at 93.4 — its 34th consecutive BEDROCK day — as the broader $317B+ stablecoin market absorbed the stress without contagion.
        </p>
        <div className="grid md:grid-cols-3 gap-3 my-4">
          <div className="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-default)]">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px]">Active Depegs</div>
            <div className="text-lg font-mono text-[var(--accent-red)]">11</div>
            <div className="text-[10px] text-[var(--text-muted)]">PMUSD · USX · USDA · apxUSD · +7 at ALERT</div>
          </div>
          <div className="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-default)]">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px]">PSI</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">93.4</div>
            <div className="text-[10px] text-[var(--text-muted)]">BEDROCK · 34th day · $317B mcap</div>
          </div>
          <div className="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-default)]">
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[1px]">Total Stablecoin MCap</div>
            <div className="text-lg font-mono text-[var(--accent-green)]">$317B</div>
            <div className="text-[10px] text-[var(--text-muted)]">USDT $114B · USDC $55B · DAI $5B</div>
          </div>
        </div>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mt-3">
          The stablecoin market is bifurcating: institutional-grade assets (USDT, USDC, DAI) structurally sound, while small-cap algorithmic pegs enter systemic failure. PMUSD at $0.44 with zero recovery mechanism is the most extreme case since Terra. No contagion to majors — yet.{' '}
          <a href="https://pharos.watch/digest/2026-07-27/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Full digest</a>
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-3">Sources: Pharos Watch (digests #152–#153), DeFi Llama</p>
      </div>

      {/* ========================================================
          UPCOMING EVENTS & UNLOCKS
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-10 mb-4">Upcoming Events & Unlocks</h2>
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 my-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold">Plasma (XPL) — 1B Token Unlock 🔥</p>
              <p className="text-xs text-[var(--text-muted)]">July 28 · US Public Sale vesting ends · 10% of total supply · Largest unlock of the week</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold">Audiera (BEAT) — $67.78M Unlock</p>
              <p className="text-xs text-[var(--text-muted)]">August 1 · 21.25M tokens · 6.87% of circulating supply · Token surged 32% ahead of unlock</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold">Connex (CONX) — $15.70M Unlock</p>
              <p className="text-xs text-[var(--text-muted)]">Late July · Ecosystem + Treasury allocation · Notable cliff unlock</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold">Arbitrum (ARB) — Next Major Unlock August 16</p>
              <p className="text-xs text-[var(--text-muted)]">~92M ARB · Team + Investors · Plan positioning ahead of the date</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] flex-shrink-0" />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-semibold">Sei (SEI) — Next Unlock Window August 13–15</p>
              <p className="text-xs text-[var(--text-muted)]">~55M SEI · Private sale + Team + Staking rewards</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-3 pt-3 border-t border-[var(--border-default)]">
          Total unlocks this week: <strong className="text-[var(--text-primary)]">~$85M+</strong>. Plasma&apos;s 1B XPL unlock is the headline event — 10% of supply entering circulation from the 2025 US Public Sale. BEAT at $67M is the most liquid.{' '}
          <a href="https://defillama.com/unlocks/calendar" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">DeFi Llama unlocks</a>
          {' · '}
          <a href="https://tokenomist.ai/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">Tokenomist</a>
        </p>
      </div>

      {/* ========================================================
          REGULATION
          ======================================================== */}
      <h2 className="text-2xl font-semibold text-[var(--text-primary)] mt-10 mb-4">Regulation</h2>
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 my-4">
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
          MiCA&apos;s July 1 transitional deadline passed — only MiCA-authorized CASPs can now serve EU clients. The European Commission is consulting on MiCA 2.0 updates covering stablecoins, tokenization, and non-EU issuer access. Meanwhile, EU Chat Control 1.0 was extended to April 2028 via a backdoor parliamentary procedure, keeping encrypted messaging scanning in scope. The permanent EU CSA Regulation negotiations remain deadlocked over encryption and mass surveillance concerns.
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-3">Sources: CoinDesk, Euronews, European Commission</p>
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-8 pt-4 border-t border-[var(--border-default)]">
        Artemis: <a href="https://research.artemis.ai/p/this-week-in-digital-finance-07262026" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-gold)] hover:underline">This Week in Digital Finance (07.26.2026)</a>
        {' · '}Sources: DeFi Llama · Glassnode · Dune · Rekt News · Pharos Watch · Tokenomist · S&P Global · X feed
        {' · '}Compiled by Delta V Intelligence.
      </p>
    </BlogPostLayout>
  );
}
