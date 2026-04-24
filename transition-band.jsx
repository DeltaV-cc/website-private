// transition-band.jsx — Editorial transition band between hero and services
// + SideRail (sticky section indicator) + ServiceGlyph set + DividerRule

(function () {
  const { useEffect, useRef, useState } = React;

  // ── DividerRule: animated hairline that draws from center outward ──
  function DividerRule({ label }) {
    const ref = useRef(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      }, { rootMargin: '-15% 0px -15% 0px' });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return (
      <div className={`div-rule ${seen ? 'is-in' : ''}`} ref={ref} aria-hidden>
        <span className="div-rule-line div-rule-l" />
        {label ? <span className="div-rule-label mono">{label}</span> : null}
        <span className="div-rule-line div-rule-r" />
      </div>
    );
  }

  // ── MarqueeBand: slow kinetic band of brand vocabulary ──
  // Uses two duplicated tracks so it loops seamlessly. Scroll velocity
  // nudges the speed (kinetic response), otherwise drifts on its own.
  function MarqueeBand({ items, speed = 28 }) {
    const trackRef = useRef(null);
    const bandRef = useRef(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
      const el = bandRef.current; if (!el) return;
      const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.05 });
      io.observe(el);
      return () => io.disconnect();
    }, []);

    useEffect(() => {
      if (!seen) return;
      const track = trackRef.current; if (!track) return;
      let raf = 0;
      let x = 0;
      let last = performance.now();
      let velocityBoost = 0;
      let prevScrollY = window.scrollY;

      const onScroll = () => {
        const dy = window.scrollY - prevScrollY;
        prevScrollY = window.scrollY;
        // Scroll velocity bleeds into marquee speed, then decays
        velocityBoost = Math.max(-240, Math.min(240, velocityBoost + dy * 1.2));
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const tick = (t) => {
        const dt = (t - last) / 1000; last = t;
        // base drift + velocity — px per second
        x -= (speed + velocityBoost) * dt;
        velocityBoost *= 0.92;
        // track width is doubled (two copies), wrap at -half
        const w = track.scrollWidth / 2;
        if (w > 0) {
          if (x <= -w) x += w;
          if (x > 0) x -= w;
        }
        track.style.transform = `translate3d(${x}px, 0, 0)`;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
      };
    }, [seen, speed]);

    return (
      <div className="mq-band" ref={bandRef} aria-hidden>
        <div className="mq-track" ref={trackRef}>
          {[0, 1].map(k => (
            <div className="mq-group" key={k}>
              {items.map((it, i) => (
                <span className="mq-item" key={`${k}-${i}`}>
                  <span className="mq-mark">◆</span>
                  <span className="mq-text display">{it}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── TransitionBand: full package between hero and services ──
  function TransitionBand({ items }) {
    return (
      <section className="transition-band" aria-hidden>
        <DividerRule label="§ Interlude" />
        <MarqueeBand items={items} speed={22} />
        <DividerRule />
      </section>
    );
  }

  // ── SideRail: sticky left-edge section indicator ──
  // Reads sections by data-rail attribute, updates on scroll.
  function SideRail({ sections }) {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const onScroll = () => {
        const y = window.scrollY + window.innerHeight * 0.4;
        setVisible(window.scrollY > window.innerHeight * 0.8);
        let idx = 0;
        sections.forEach((s, i) => {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= y) idx = i;
        });
        setActive(idx);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, [sections]);
    return (
      <aside className={`side-rail ${visible ? 'is-in' : ''}`} aria-hidden>
        <div className="side-rail-inner">
          {sections.map((s, i) => (
            <div key={s.id} className={`side-rail-item ${i === active ? 'is-active' : ''}`}>
              <span className="side-rail-dot" />
              <span className="side-rail-num mono">{s.n}</span>
              <span className="side-rail-label mono">{s.label}</span>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  // ── ServiceGlyph: tiny stroke-only SVG marks that draw in on reveal ──
  // Kind is 'foundation' | 'growth' | 'security' | 'research'
  function ServiceGlyph({ kind, seen }) {
    const cls = `svc-glyph ${seen ? 'is-in' : ''}`;
    const common = { width: 44, height: 44, viewBox: '0 0 44 44', fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (kind === 'foundation') {
      return (
        <svg {...common} className={cls} aria-hidden>
          <rect className="svc-glyph-p" x="8" y="28" width="28" height="6" rx="0.5" />
          <rect className="svc-glyph-p" x="11" y="20" width="22" height="6" rx="0.5" />
          <rect className="svc-glyph-p" x="14" y="12" width="16" height="6" rx="0.5" />
        </svg>
      );
    }
    if (kind === 'growth') {
      return (
        <svg {...common} className={cls} aria-hidden>
          <path className="svc-glyph-p" d="M8 32 L18 22 L24 28 L36 12" />
          <path className="svc-glyph-p" d="M28 12 L36 12 L36 20" />
          <circle className="svc-glyph-p" cx="18" cy="22" r="1.6" fill="currentColor" />
          <circle className="svc-glyph-p" cx="24" cy="28" r="1.6" fill="currentColor" />
        </svg>
      );
    }
    if (kind === 'security') {
      return (
        <svg {...common} className={cls} aria-hidden>
          <path className="svc-glyph-p" d="M22 7 L34 12 L34 22 C34 29 28 34 22 37 C16 34 10 29 10 22 L10 12 Z" />
          <path className="svc-glyph-p" d="M17 22 L21 26 L28 18" />
        </svg>
      );
    }
    if (kind === 'research') {
      return (
        <svg {...common} className={cls} aria-hidden>
          <circle className="svc-glyph-p" cx="19" cy="19" r="9" />
          <path className="svc-glyph-p" d="M26 26 L35 35" />
          <path className="svc-glyph-p" d="M14 19 H24 M19 14 V24" />
        </svg>
      );
    }
    return null;
  }

  // ── AnimatedSeparator: scroll-linked vertical stroke between hero + services ──
  function HeroEndSeparator() {
    const ref = useRef(null);
    const [p, setP] = useState(0);
    useEffect(() => {
      const measure = () => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when below viewport, 1 when fully above top
        const raw = (vh - r.top) / (vh + r.height);
        setP(Math.max(0, Math.min(1, raw)));
      };
      window.addEventListener('scroll', measure, { passive: true });
      window.addEventListener('resize', measure);
      measure();
      return () => {
        window.removeEventListener('scroll', measure);
        window.removeEventListener('resize', measure);
      };
    }, []);
    return (
      <div className="hero-end-sep" ref={ref} aria-hidden>
        <span className="hero-end-sep-line" style={{ transform: `scaleY(${p})` }} />
        <span className="hero-end-sep-dot" style={{ opacity: p }} />
      </div>
    );
  }

  Object.assign(window, { TransitionBand, MarqueeBand, DividerRule, SideRail, ServiceGlyph, HeroEndSeparator });
})();
