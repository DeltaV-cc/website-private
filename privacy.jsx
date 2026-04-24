// privacy.jsx — Delta V Privacy Policy page
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
        <a href="index.html" className="nav-brand">
          <DeltaMark size={18} />
          <span className="mono nav-brand-txt">DELTA V</span>
        </a>
        <div className="nav-links mono">
          <a href="index.html#services">Services</a>
          <a href="index.html#why">Why us</a>
          <a href="index.html#engage">Engage</a>
        </div>
        <a href="index.html" className="nav-cta mono">← Back to site</a>
      </div>
    </nav>
  );
}

// ─── Content ─────────────────────────────────────────────────
const ARTICLES = [
  {
    n: '01',
    slug: 'commitment',
    title: 'Our Commitment',
    body: (
      <>
        <p>
          Delta V SRL (&ldquo;Delta V&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) goes
          beyond legal minimums to protect your privacy. While compliant with the General Data
          Protection Regulation (GDPR) and Romanian Law No. 506/2004, we adopt stricter standards
          to ensure your data is handled with the utmost care, transparency, and respect.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, and safeguard your personal data when
          you use <strong>deltav.com</strong> (the &ldquo;Site&rdquo;) or our services.
        </p>
      </>
    ),
  },
  {
    n: '02',
    slug: 'controller',
    title: 'Data Controller',
    body: (
      <>
        <p>
          Delta V SRL, registered with the Trade Registry under number <strong>51301377</strong>,
          located at <strong>Bucharest</strong>, Romania, is the data controller.
        </p>
        <p>
          Contact: <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or Signal{' '}
          <strong>@DeltaV.01</strong>.
        </p>
      </>
    ),
  },
  {
    n: '03',
    slug: 'data-we-collect',
    title: 'Data We Collect',
    body: (
      <>
        <p>We collect only what&rsquo;s strictly necessary:</p>
        <ul className="legal-list">
          <li data-i="a.">
            <strong>Personal Data.</strong> Name, email address, phone number (if provided), and
            message content submitted via our contact form or direct communication.
          </li>
          <li data-i="b.">
            <strong>Usage Data.</strong> Minimal analytics (e.g., anonymized IP address, page
            visits) via privacy-first tools; no invasive tracking.
          </li>
          <li data-i="c.">
            <strong>Third-Party Data.</strong> None if you contact us through secure channels
            (e.g., Signal ID). We might use various proprietary services and protocols to work
            with you and you consent to their own terms of policy. We will do our best to inform
            you about the associated risks (Cloudflare, Google, HuggingFace, GitHub, Microsoft,
            MetaAI, Groq, Discord).
          </li>
        </ul>
        <p>
          We <strong>do not</strong> collect sensitive data (e.g., biometric, health) unless
          explicitly required for a service and consented to by you.
        </p>
      </>
    ),
  },
  {
    n: '04',
    slug: 'how-we-use',
    title: 'How We Use Your Data',
    body: (
      <>
        <p>We process data solely for:</p>
        <ul className="legal-list">
          <li data-i="a.">
            Responding to your inquiries and delivering Services (e.g., IT, AI, crypto consulting).
            All data or knowledge (passwords, infrastructure plans) related to previous
            collaboration shall be deleted as soon as legally possible.
          </li>
          <li data-i="b.">Improving the Site with anonymized insights.</li>
          <li data-i="c.">Legal compliance (e.g., tax obligations).</li>
        </ul>
        <p>
          Legal bases include <strong>explicit consent</strong> (opt-in only), contract necessity,
          and limited legitimate interests (e.g., security). We avoid broad or vague processing
          purposes.
        </p>
      </>
    ),
  },
  {
    n: '05',
    slug: 'cookies',
    title: 'Cookies',
    body: (
      <>
        <p>
          We use only <strong>essential cookies</strong> for Site functionality (e.g., session
          management). No advertising or third-party tracking cookies are deployed.
        </p>
        <p>
          You can disable cookies via browser settings without losing core functionality.
        </p>
      </>
    ),
  },
  {
    n: '06',
    slug: 'sharing',
    title: 'Data Sharing',
    body: (
      <>
        <p>We share data only when unavoidable:</p>
        <ul className="legal-list">
          <li data-i="a.">
            With vetted service providers under enhanced data protection agreements exceeding
            GDPR requirements.
          </li>
          <li data-i="b.">With authorities, only under a verified legal mandate.</li>
        </ul>
        <div className="legal-callout">
          <span className="legal-callout-label">// Non-negotiable</span>
          <p className="legal-callout-body">
            We never sell, rent, or monetize your data. Third-party recipients are contractually
            bound to delete data after use.
          </p>
        </div>
      </>
    ),
  },
  {
    n: '07',
    slug: 'retention',
    title: 'Data Retention & Deletion',
    body: (
      <>
        <p>We delete your data faster than required by law:</p>
        <ul className="legal-list">
          <li data-i="a.">
            <strong>Contact Data.</strong> Personal data from inquiries (e.g., name, email,
            message) is deleted within <strong>90 days</strong> of resolving your request, unless
            you explicitly request otherwise or a contract requires retention.
          </li>
          <li data-i="b.">
            <strong>Client Records.</strong> Data tied to Services (e.g., contracts, invoices) is
            retained for <strong>1 year</strong> after the service ends, unless tax or legal
            obligations mandate longer (max 5 years under Romanian law), then deleted promptly.
          </li>
          <li data-i="c.">
            <strong>Usage Data.</strong> Anonymized analytics are kept for <strong>30 days</strong>,
            then purged.
          </li>
        </ul>
        <p>
          You can request immediate deletion at any time (see §&nbsp;08), and we&rsquo;ll comply
          unless legally prevented. We proactively notify you before deletion deadlines to confirm
          your preferences.
        </p>
      </>
    ),
  },
  {
    n: '08',
    slug: 'rights',
    title: 'Your Enhanced Rights',
    body: (
      <>
        <p>Beyond GDPR, we offer:</p>
        <ul className="legal-list">
          <li data-i="a.">
            <strong>Access.</strong> Full data reports in human-readable format within 15 days
            (faster than GDPR&rsquo;s 30 days).
          </li>
          <li data-i="b.">
            <strong>Rectification / Erasure.</strong> Immediate updates or deletion upon request,
            no questions asked, unless legally required to retain.
          </li>
          <li data-i="c.">
            <strong>Restriction / Objection.</strong> Stop processing instantly upon request,
            beyond GDPR&rsquo;s scope.
          </li>
          <li data-i="d.">
            <strong>Portability.</strong> Data in open formats within 15 days.
          </li>
          <li data-i="e.">
            <strong>Consent Withdrawal.</strong> Revoke consent anytime with one click or
            message; no penalties.
          </li>
          <li data-i="f.">
            <strong>Proactive Disclosure.</strong> We&rsquo;ll notify you of any data use changes
            before they occur.
          </li>
          <li data-i="g.">
            <strong>Complaints.</strong> File with us directly or the Romanian National
            Supervisory Authority for Personal Data Processing (ANSPDCP).
          </li>
        </ul>
        <p>
          Exercise rights at <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or Signal{' '}
          <strong>@DeltaV.01</strong>.
        </p>
      </>
    ),
  },
  {
    n: '09',
    slug: 'security',
    title: 'Security',
    body: (
      <>
        <p>We exceed GDPR with:</p>
        <ul className="legal-list">
          <li data-i="a.">
            End-to-end encryption for all communications (e.g., Signal integration).
          </li>
          <li data-i="b.">
            Regular third-party security audits, results available upon request.
          </li>
          <li data-i="c.">
            Zero-knowledge principles where possible (e.g., we can&rsquo;t access your crypto
            wallet data).
          </li>
        </ul>
        <p>
          Despite this, no system is infallible; use at your own risk.
        </p>
      </>
    ),
  },
  {
    n: '10',
    slug: 'transfers',
    title: 'International Transfers',
    body: (
      <>
        <p>
          Data stays in the <strong>EEA</strong> unless you request otherwise. If transferred
          (e.g., to US providers like Hugging Face), we use enhanced safeguards (e.g., Standard
          Contractual Clauses plus encryption), exceeding GDPR baselines.
        </p>
      </>
    ),
  },
  {
    n: '11',
    slug: 'third-party',
    title: 'Third-Party Links',
    body: (
      <>
        <p>
          Links to third-party sites (e.g., Signal, Cloudflare) are not our responsibility. We
          vet them for privacy but can&rsquo;t control their practices.
        </p>
      </>
    ),
  },
  {
    n: '12',
    slug: 'updates',
    title: 'Updates',
    body: (
      <>
        <p>
          We&rsquo;ll notify you of changes <strong>30 days in advance</strong> via email or Site
          banner. Continued use post-update implies acceptance.
        </p>
      </>
    ),
  },
  {
    n: '13',
    slug: 'contact',
    title: 'Contact Us',
    body: (
      <>
        <p>
          For privacy concerns, reach us at{' '}
          <a href="mailto:contact@deltav.cc">contact@deltav.cc</a> or Signal{' '}
          <strong>@DeltaV.01</strong>.
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
function PrivacyPage() {
  return (
    <>
      <div className="scroll-progress"><div className="scroll-progress-fill" id="sp-fill" /></div>
      <LegalNav />

      <header className="legal-head">
        <div className="legal-watermark" aria-hidden>Privacy</div>
        <div className="container legal-head-inner">
          <div className="legal-crumbs mono">
            <a href="index.html">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
              <span>Back</span>
            </a>
            <span className="sep">/</span>
            <span>Legal</span>
            <span className="sep">/</span>
            <span style={{ color: 'var(--accent)' }}>Privacy</span>
          </div>

          <div className="legal-kicker mono">
            <span className="dot pulse" />
            <span>§ 00 · Privacy Policy</span>
          </div>

          <h1 className="display legal-title">
            Privacy <em>Policy</em><span className="period">.</span>
          </h1>

          <div className="legal-meta">
            <div className="legal-meta-col">
              <span className="legal-meta-k mono">Last updated</span>
              <span className="legal-meta-v">March 30, 2025</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-k mono">Framework</span>
              <span className="legal-meta-v">GDPR · Law 506/2004 · Beyond</span>
            </div>
            <div className="legal-meta-col">
              <span className="legal-meta-k mono">Controller</span>
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
            Questions about your <em>data</em>?
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
              <a href="index.html" className="footer-brand">
                <DeltaMark size={22} />
                <span className="mono" style={{ letterSpacing: '.14em', fontWeight: 600 }}>DELTA V</span>
              </a>
            </div>
            <div className="footer-col">
              <a href="cgu.html">CGU</a>
              <a href="privacy.html" style={{ color: 'var(--accent)' }}>Privacy Policy</a>
            </div>
            <div className="footer-col footer-col-meta">
              <span className="mono">© 2026 Delta V</span>
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

ReactDOM.createRoot(document.getElementById('root')).render(<PrivacyPage />);
