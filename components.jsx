// components.jsx — Delta V landing (content aligned with deltav.cc)
const { useState, useEffect, useRef } = React;

// ─── ΔV Logo mark ────────────────────────────────────────────
function DeltaMark({ size = 20, animate = false }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        fontFamily: 'var(--f-display)',
        fontWeight: 600,
        fontSize: `${size}px`,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: 'currentColor',
      }}
    >
      ΔV
    </span>
  );
}

// ─── Reveal wrapper ──────────────────────────────────────────
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...p }) {
  const ref = useRef(null);
  const [isIn, setIsIn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsIn(true); io.unobserve(el); }
    }, { rootMargin: '-8% 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${isIn ? 'is-in' : ''} ${className}`} style={{ transitionDelay: delay ? `${delay}ms` : undefined }} {...p}>{children}</Tag>;
}

// ─── NAV ─────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 20);
    s(); window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-brand">
          <DeltaMark size={18} animate />
          <span className="mono nav-brand-txt">DELTA V</span>
        </a>
        <div className="nav-links mono">
          <a href="#services">Services</a>
          <a href="#why">Why us</a>
          <a href="#engage">Engage</a>
        </div>
        <a href="#engage" className="nav-cta mono">Get in touch →</a>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const sy = useScrollY();
  const parY = Math.min(sy * 0.25, 220);

  return (
    <header className="hero" id="top" ref={ref} style={{position:'relative', overflow:'hidden'}}>
      <HeroBloom />
      <div className="container hero-inner" style={{zIndex:20}}>
        <LineReveal as="h1" className="hero-h display" delay={200} stagger={110}>
          <span className="hero-line l1" style={{ transform: `translateY(${-parY * 0.30}px)` }}>Delta V</span>
          <span className="hero-line l2" style={{ transform: `translateY(${-parY * 0.38}px)` }}>Accelerates your</span>
          <span className="hero-line l3" style={{ transform: `translateY(${-parY * 0.46}px)` }}><em>Adoption</em></span>
          <span className="hero-line l4" style={{ transform: `translateY(${-parY * 0.54}px)` }}>of Decentralized</span>
          <span className="hero-line l5" style={{ transform: `translateY(${-parY * 0.62}px)` }}>Technologies<span className="period">.</span></span>
        </LineReveal>

        <div className="hero-foot">
          <div className="hero-lede">
            <Reveal delay={900}>
              <p>
                Tech foundations, strategic growth, cybersecurity, and research,
                built for a decentralized world.
              </p>
            </Reveal>
          </div>

          <div className="hero-cta">
            <Reveal delay={1000}>
              <Magnetic strength={0.35}>
                <a href="#services" className="cta-primary">
                  <span>Explore services</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 10h8M7 6v5M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>

      </div>
    </header>
  );
}

// ─── SERVICES ────────────────────────────────────────────────
const SERVICES = [
  {
    n: '01', title: 'Tech Foundations', lede: 'Build IT systems ready for tomorrow\u2019s challenge.',
    items: [
      { name: 'Web & Mobile Apps', price: '$100–500 / page' },
      { name: 'IT Infrastructure', price: 'from $80' },
      { name: 'Scalable Web3 Integration', price: 'Contact us' },
      { name: 'Web3 Apps', price: 'Contact us' },
    ],
  },
  {
    n: '02', title: 'Growth Boost', lede: 'Expand your reach across regions with confidence.',
    items: [
      { name: 'Strategic Expansion Support', price: 'EU / Swiss markets' },
      { name: 'Public Good Advocacy & Fundraising', price: '' },
    ],
  },
  {
    n: '03', title: 'Cybersecurity', lede: 'Secure operations with state-of-the-art solutions.',
    items: [
      { name: 'Cybersecurity & Privacy Audits', price: '$100 retail' },
      { name: 'GenAI & Agent Development', price: '$50 / hour' },
      { name: 'CryptoSec', price: '$50 / month or 10% profits' },
      { name: 'Threat Monitoring', price: '$50–$5,000 / month' },
    ],
  },
  {
    n: '04', title: 'Research Services', lede: 'Uncover market trends with data-driven insights.',
    items: [
      { name: 'Market Research Reports', price: '$2,000' },
      { name: 'On-chain / OSINT Analysis', price: '10% funds or $80 / hr' },
      { name: 'Training', price: '$80 / hour' },
    ],
  },
];

const SVC_GLYPH_KINDS = ['foundation', 'growth', 'security', 'research'];

function ServiceRow({ s, i }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { rootMargin: '-10% 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} className={`svc reveal ${seen ? 'is-in' : ''} svc-open`} style={{ transitionDelay: `${i * 60}ms` }}>
      <div className="svc-head">
        <span className="svc-num mono">{s.n}</span>
        <span className="svc-glyph-wrap">
          <ServiceGlyph kind={SVC_GLYPH_KINDS[i]} seen={seen} />
        </span>
        <div className="svc-title-wrap">
          <h3 className="svc-title display">{s.title}</h3>
          <p className="svc-lede">{s.lede}</p>
        </div>
      </div>
      <div className="svc-body">
        <div className="svc-items">
          {s.items.map((it, k) => (
            <div className="svc-item" key={k}>
              <span className="svc-item-num mono paper-mute">{s.n}.{String(k+1).padStart(2,'0')}</span>
              <span className="svc-item-name">{it.name}</span>
              <span className="svc-item-price">{it.price}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sect-head sect-head-lg">
          <Reveal><span className="mono sect-num">§ 01</span></Reveal>
          <Reveal delay={80}><span className="mono tag-paren">(Services)</span></Reveal>
          <LineReveal as="h2" className="sect-title display" delay={180}>
            <span>Four disciplines.</span>
          </LineReveal>
        </div>
        <div className="svc-list">
          {SERVICES.map((s, i) => <ServiceRow key={s.n} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ──────────────────────────────────────────────────
const PILLARS = [
  { n: '01', title: 'Tech Natives', body: 'Passionate professionals at the forefront of decentralization and digital upskilling. We don\u2019t just consult, we build, operate, and live the stack.' },
  { n: '02', title: 'Self-Ownership Focused', body: 'Every solution we deliver prioritizes user control. Decentralized tools that keep data, keys, and decisions where they belong: with you.' },
];

function Why() {
  return (
    <section className="section why" id="why">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sect-head sect-head-lg">
          <Reveal><span className="mono sect-num">§ 02</span></Reveal>
          <Reveal delay={80}><span className="mono tag-paren">(Why Delta V)</span></Reveal>
          <LineReveal as="h2" className="sect-title display" delay={180} stagger={110}>
            <span>We believe decentralization</span>
            <span>isn’t a trend. It’s a <em>fundamental shift</em>.</span>
          </LineReveal>
          <Reveal delay={560}>
            <p className="sect-lede">Our work reflects that conviction.</p>
          </Reveal>
        </div>
        <div className="why-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} as="article" className="pillar" delay={i * 140}>
              <div className="pillar-top">
                <span className="mono pillar-num">{p.n}</span>
              </div>
              <h3 className="pillar-title display">
                <WordReveal text={p.title} delay={i * 140 + 200} stagger={45} />
              </h3>
              <p className="pillar-body">{p.body}</p>
              <span className="pillar-trace" aria-hidden />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ENGAGE / CONTACT ───────────────────────────────────────
function Engage() {
  return (
    <section className="section engage" id="engage">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sect-head sect-head-lg">
          <Reveal><span className="mono sect-num">§ 03</span></Reveal>
          <Reveal delay={80}><span className="mono tag-paren">(Get in touch)</span></Reveal>
          <LineReveal as="h2" className="sect-title display engage-title" delay={180} stagger={110}>
            <span>Let’s build the</span>
            <span><em>decentralized</em> future</span>
            <span>together<span className="period">.</span></span>
          </LineReveal>
        </div>

        <div className="engage-grid">
          <Reveal as="a" href="mailto:contact@deltav.cc" className="channel channel-primary" delay={80}>
            <span className="channel-label mono">Email</span>
            <span className="channel-value display">contact@deltav.cc</span>
            <span className="channel-arrow mono">Compose →</span>
          </Reveal>

          <Reveal as="div" className="channel channel-signal" delay={160}>
            <span className="channel-label mono">Signal</span>
            <span className="channel-value display">@DeltaV.01</span>
            <span className="channel-meta">Prefer encrypted communications? Signal ensures end-to-end privacy for sensitive inquiries.</span>
            <img
              src="assets/SignalUsernameQr.png"
              alt="Signal QR Code — @DeltaV.01"
              loading="lazy"
              className="channel-qr"
            />
          </Reveal>
        </div>


      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-mega-wrap">
          <div className="footer-mega display" aria-hidden>
            DELTA&nbsp;V
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-col">
            <a href="#top" className="footer-brand">
              <DeltaMark size={22} />
              <span className="mono" style={{letterSpacing:'.14em', fontWeight:600}}>DELTA V</span>
            </a>
          </div>
          <div className="footer-col">
            <a href="cgu.html">CGU</a>
            <a href="privacy.html">Privacy Policy</a>
          </div>
          <div className="footer-col footer-col-meta">
            <span className="mono">© 2025 Delta V</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────
const DV_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "cyan",
  "typePair": "fraunces-inter",
  "motion": "editorial",
  "showGrid": false
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  cyan:    { c: 'oklch(0.82 0.14 220)',  ink: 'oklch(0.18 0.03 220)' },
  copper:  { c: 'oklch(0.75 0.13 55)',   ink: 'oklch(0.18 0.03 55)'  },
  lime:    { c: 'oklch(0.88 0.18 125)',  ink: 'oklch(0.18 0.03 125)' },
  plasma:  { c: 'oklch(0.74 0.20 320)',  ink: 'oklch(0.18 0.03 320)' },
  paper:   { c: 'oklch(0.97 0.005 240)', ink: 'oklch(0.13 0.01 240)' },
};

const TYPE_MAP = {
  'fraunces-inter': { d: '"Fraunces", serif', b: '"Inter Tight", sans-serif' },
  'playfair-inter': { d: '"Playfair Display", serif', b: '"Inter Tight", sans-serif' },
  'dm-inter':       { d: '"DM Serif Display", serif', b: '"Inter Tight", sans-serif' },
  'fraunces-mono':  { d: '"Fraunces", serif', b: '"JetBrains Mono", monospace' },
};

function App() {
  const [t, setTweak] = useTweaks(DV_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    const a = ACCENT_MAP[t.accent] || ACCENT_MAP.cyan;
    r.style.setProperty('--accent', a.c);
    r.style.setProperty('--accent-ink', a.ink);
    const ty = TYPE_MAP[t.typePair] || TYPE_MAP['fraunces-inter'];
    r.style.setProperty('--f-display', ty.d);
    r.style.setProperty('--f-body', ty.b);
    document.body.classList.toggle('motion-minimal', t.motion === 'minimal');
    document.body.classList.toggle('motion-rich', t.motion === 'rich');
    document.body.classList.toggle('show-grid', !!t.showGrid);
  }, [t.accent, t.typePair, t.motion, t.showGrid]);

  return (
    <>
      <SpaceBG />
      <ScrollProgress />
      <Nav />
      <Hero />
      <HeroEndSeparator />
      <TransitionBand items={[
        'Tech foundations',
        'Growth boost',
        'Cybersecurity',
        'Research services',
        'Decentralized technology',
        'Self-ownership focused',
        'Tech natives',
        'Accelerate adoption',
      ]} />
      <Services />
      <Why />
      <Engage />
      <Footer />

      <TweaksPanel title="Tweaks · Delta V">
        <TweakSection label="Brand" />
        <TweakRadio label="Accent" value={t.accent}
          options={['cyan','copper','lime','plasma','paper']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Type pair" value={t.typePair}
          options={['fraunces-inter','playfair-inter','dm-inter','fraunces-mono']}
          onChange={(v) => setTweak('typePair', v)} />
        <TweakSection label="Motion" />
        <TweakRadio label="Motion" value={t.motion}
          options={['minimal','editorial','rich']}
          onChange={(v) => setTweak('motion', v)} />
        <TweakSection label="Dev" />
        <TweakToggle label="Show grid overlay" value={t.showGrid}
          onChange={(v) => setTweak('showGrid', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
