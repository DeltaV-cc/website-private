// legal.jsx — Delta V Terms of Use (CGU) page
const { useState, useEffect, useRef } = React;

function DeltaMark({ size = 20 }) {
  return (
    <span aria-hidden style={{
      display: 'inline-block',
      fontFamily: 'var(--f-display)',
      fontWeight: 600,
      fontSize: `${size}px`,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'currentColor',
    }}>ΔV</span>
  );
}

function LegalNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 20);
    s(); window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="Delta V.html" className="nav-brand">
          <DeltaMark size={18} />
          <span className="mono nav-brand-txt">DELTA V</span>
        </a>
        <div className="nav-links mono">
          <a href="Delta V.html#services">Services</a>
          <a href="Delta V.html#why">Why us</a>
          <a href="Delta V.html#engage">Engage</a>
        </div>
        <a href="Delta V.html" className="nav-cta mono">← Back to site</a>
      </div>
    </nav>
  );
}

// ─── Content ─────────────────────────────────────────────────
const ARTICLES = [
  {
    n: '01',
    slug: 'acceptance',
    title: 'Acceptance of Terms',
    body: (
      <>
        <p>
          By accessing or using the website <strong>deltav.com</strong> (the &ldquo;Site&rdquo;) or any services
          provided by <strong>Delta V SRL</strong> (&ldquo;Delta V&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be
          bound by these Terms of Use (&ldquo;Terms&rdquo;).
        </p>
        <p>
          If you do not agree, you must not use the Site or our services. These Terms apply to all
          users, including visitors, clients, and partners.
        </p>
      </>
    ),
  },
  {
    n: '02',
    slug: 'company',
    title: 'Company Information',
    body: (
      <>
        <p>
          Delta V SRL is a Romanian company registered with the Trade Registry under
          number <strong>51301377</strong>, with its registered office at <strong>București, Sector 1</strong>,
          Romania.
        </p>
        <p>
          Contact: <a href="mailto:contact@deltav.cc">contact@deltav.cc</a>.
        </p>
      </>
    ),
  },
  {
    n: '03',
    slug: 'services',
    title: 'Services',
    body: (
      <>
        <p>
          Delta V provides <em>IT solutions, AI security, cryptocurrency services, research</em>, and
          related consulting (&ldquo;Services&rdquo;). Service details, pricing, and availability are subject
          to change without notice.
        </p>
        <p>
          Specific terms may apply to individual contracts, which take precedence over these
          Terms where applicable.
        </p>
      </>
    ),
  },
  {
    n: '04',
    slug: 'obligations',
    title: 'User Obligations',
    body: (
      <>
        <p>You agree to:</p>
        <ul className="legal-list">
          <li data-i="a.">Use the Site and Services lawfully and in accordance with these Terms.</li>
          <li data-i="b.">Not misuse, disrupt, or attempt to gain unauthorized access to our systems.</li>
          <li data-i="c.">Provide accurate information when engaging with us.</li>
          <li data-i="d.">Be solely responsible for any content you submit (e.g., via forms or emails).</li>
        </ul>
        <p>
          Failure to comply may result in suspension or termination of access without refund or
          liability on our part.
        </p>
      </>
    ),
  },
  {
    n: '05',
    slug: 'ip',
    title: 'Intellectual Property',
    body: (
      <>
        <div className="legal-callout">
          <span className="legal-callout-label">// MIT License</span>
          <p className="legal-callout-body">
            Permission is hereby granted, free of charge, to any person obtaining a copy of this
            software and associated documentation files (the &ldquo;Software&rdquo;), to deal in the Software
            without restriction, including without limitation the rights to use, copy, modify,
            merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to
            the following conditions: the above copyright notice and this permission notice shall
            be included in all copies or substantial portions of the Software. The Software is
            provided &ldquo;as is&rdquo;, without warranty of any kind.
          </p>
        </div>
        <p>
          <strong>Third-Party Content.</strong> Certain assets (e.g., images, iframes) may be owned by
          third parties and are not covered by this license. Their use is subject to their
          respective owners&rsquo; terms. Delta V is not responsible for your use of third-party content.
        </p>
      </>
    ),
  },
  {
    n: '06',
    slug: 'liability',
    title: 'Limitation of Liability',
    body: (
      <>
        <p>To the fullest extent permitted by Romanian law:</p>
        <ul className="legal-list">
          <li data-i="a.">
            The Site and Services are provided as-is, without warranties of any kind, express
            or implied, including fitness for a particular purpose.
          </li>
          <li data-i="b.">
            Delta V shall not be liable for any indirect, incidental, consequential, or punitive
            damages arising from your use of the Site or Services, including loss of data, profits,
            or business opportunities.
          </li>
          <li data-i="c.">
            Our total liability for any claim shall not exceed the amount paid by you for the
            specific Service giving rise to the claim.
          </li>
        </ul>
      </>
    ),
  },
  {
    n: '07',
    slug: 'third-party',
    title: 'Third-Party Content & Links',
    body: (
      <>
        <p>
          The Site may include links to third-party websites (e.g., iframe content) or services
          not controlled by Delta V. We are not responsible for their availability, accuracy, or
          compliance with laws. <strong>Use them at your own risk.</strong>
        </p>
      </>
    ),
  },
  {
    n: '08',
    slug: 'termination',
    title: 'Termination',
    body: (
      <>
        <p>
          We reserve the right to terminate or suspend your access to the Site or Services at our
          sole discretion, without notice, for any reason, including breach of these Terms,
          without liability.
        </p>
      </>
    ),
  },
  {
    n: '09',
    slug: 'force-majeure',
    title: 'Force Majeure',
    body: (
      <>
        <p>
          Delta V shall not be liable for any delays, failures, or interruptions in the
          performance of the Site or Services due to events beyond our reasonable control
          (&ldquo;<em>Force Majeure Events</em>&rdquo;), including but not limited to:
        </p>
        <ul className="legal-list">
          <li data-i="a.">Natural disasters (e.g., earthquakes, floods).</li>
          <li data-i="b.">Governmental actions, wars, or civil unrest.</li>
          <li data-i="c.">Cyberattacks, hacking, or security breaches affecting our systems or third-party platforms.</li>
          <li data-i="d.">
            Failures, vulnerabilities, or exploits in third-party digital asset platforms or
            cryptocurrency protocols (e.g., Safe Wallet, Rabby Wallet, MetaMask, or other
            blockchain networks) that may result in loss of funds, data, or functionality.
          </li>
          <li data-i="e.">
            Disruptions or limitations in AI operation platforms (e.g., Hugging Face, Replicate)
            including model failures, API downtimes, or computational errors.
          </li>
          <li data-i="f.">
            Service outages or technical failures in infrastructure providers (e.g., Cloudflare),
            including CDN downtimes, DNS issues, or DDoS attacks.
          </li>
        </ul>
        <p>
          In the event of a Force Majeure Event affecting digital asset or AI operations,
          Delta V is expressly relieved of liability for any resulting losses, including loss of
          cryptocurrency, tokens, or digital assets; inaccuracies or failures in AI-generated
          outputs; or interruptions in service availability. Users acknowledge the inherent risks
          of using decentralized and third-party technologies and assume full responsibility for
          such risks.
        </p>
      </>
    ),
  },
  {
    n: '10',
    slug: 'law',
    title: 'Governing Law & Jurisdiction',
    body: (
      <>
        <p>
          These Terms are governed by the laws of <strong>Romania</strong>. Any disputes shall be resolved
          exclusively in the courts of <strong>Bucharest, Romania</strong>.
        </p>
        <p>
          If you are an EU consumer, you may also have rights to pursue claims in your home
          jurisdiction under EU law.
        </p>
      </>
    ),
  },
  {
    n: '11',
    slug: 'amendments',
    title: 'Amendments',
    body: (
      <>
        <p>
          We may update these Terms at any time by posting the revised version on the Site.
          Continued use after changes constitutes acceptance. Check this page periodically.
        </p>
      </>
    ),
  },
  {
    n: '12',
    slug: 'contact',
    title: 'Contact Us',
    body: (
      <>
        <p>
          For questions or complaints, contact us at{' '}
          <a href="mailto:contact@deltav.cc">contact@deltav.cc</a>{' '}
          or via Signal at <strong>@DeltaV.01</strong>.
        </p>
      </>
    ),
  },
];

// ─── TOC with scroll spy ─────────────────────────────────────
function TOC() {
  const [active, setActive] = useState(ARTICLES[0].slug);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      let current = ARTICLES[0].slug;
      for (const a of ARTICLES) {
        const el = document.getElementById(a.slug);
        if (el && el.offsetTop <= y) current = a.slug;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside className="legal-toc">
      <div className="legal-toc-head mono">§ Contents</div>
      {ARTICLES.map((a) => (
        <a key={a.slug} href={`#${a.slug}`} className={active === a.slug ? 'is-active' : ''}>
          <span className="legal-toc-num">{a.n}</span>
          <span className="legal-toc-label">{a.title}</span>
        </a>
      ))}
    </aside>
  );
}

function Article({ a }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { rootMargin: '-5% 0px -5% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article id={a.slug} ref={ref} className={`legal-art reveal ${seen ? 'is-in' : ''}`}>
      <div className="legal-art-head">
        <span className="legal-art-num mono">§ {a.n}</span>
        <h2 className="legal-art-title">{a.title}</h2>
      </div>
      <div className="legal-art-body">{a.body}</div>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────
function LegalPage() {
  return (
    <>
      <div className="scroll-progress"><div className="scroll-progress-fill" id="sp-fill" /></div>
      <LegalNav />

      <header className="legal-head">
        <div className="legal-watermark" aria-hidden>CGU</div>
        <div className="container legal-head-inner">
          <div className="legal-crumbs mono">
            <a href="Delta V.html">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
              <span>Back</span>
            </a>
            <span className="sep">/</span>
            <span>Legal</span>
            <span className="sep">/</span>
            <span style={{ color: 'var(--accent)' }}>CGU</span>
          </div>

          <div className="legal-kicker mono">
            <span className="dot pulse" />
            <span>§ 00 · Terms of Use</span>
          </div>

          <h1 className="display legal-title">
            Terms of <em>Use</em><span className="period">.</span>
          </h1>

          <div className="legal-meta">
            <div className="legal-meta-col">
              <span className="legal-meta-k mono">Last updated</span>
              <span className="legal-meta-v">March 30, 2025</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-k mono">Jurisdiction</span>
              <span className="legal-meta-v">Romania · Bucharest courts</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-k mono">Entity</span>
              <span className="legal-meta-v mono">Delta V SRL · RO 51301377</span>
            </div>
          </div>
        </div>
      </header>

      <section className="container legal-body">
        <TOC />
        <div className="legal-articles">
          {ARTICLES.map((a) => <Article key={a.slug} a={a} />)}
        </div>
      </section>

      <section className="legal-close">
        <div className="container legal-close-inner">
          <h2 className="display legal-close-title">
            Questions about these <em>Terms</em>?
          </h2>
          <a href="mailto:contact@deltav.cc" className="legal-close-cta">
            <span>Get in touch</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="Delta V.html" className="footer-brand">
                <DeltaMark size={22} />
                <span className="mono" style={{ letterSpacing: '.14em', fontWeight: 600 }}>DELTA V</span>
              </a>
            </div>
            <div className="footer-col">
              <a href="CGU.html" style={{ color: 'var(--accent)' }}>CGU</a>
              <a href="Privacy.html">Privacy Policy</a>
            </div>
            <div className="footer-col footer-col-meta">
              <span className="mono">© 2025 Delta V</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Scroll progress wire-up ────────────────────────────────
(function () {
  const onScroll = () => {
    const fill = document.getElementById('sp-fill');
    if (!fill) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    fill.style.transform = `scaleX(${p})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  setTimeout(onScroll, 50);
})();

ReactDOM.createRoot(document.getElementById('root')).render(<LegalPage />);
