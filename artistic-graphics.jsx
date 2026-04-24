// artistic-graphics.jsx — decorative artistic layers for Delta V landing
// Exports to window: Constellation, OrbitalDiagram, GhostNumeral, CornerFrame, AsciiPanel, GridField

(function () {
  const { useEffect, useRef, useState } = React;

  // ─── Constellation: animated node + edge network ───────────
  // Draws on a canvas behind a section. Nodes drift slowly, connected
  // by hairlines where they're close enough. Accent-colored.
  function Constellation({
    density = 0.00009,         // nodes per px^2
    maxLink = 160,             // max distance for a link, px
    speed = 0.08,              // base drift speed
    className = '',
    opacity = 0.55,
  }) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const nodesRef = useRef([]);
    const rafRef = useRef(0);
    const activeRef = useRef(false);

    useEffect(() => {
      const wrap = wrapRef.current, canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      const ctx = canvas.getContext('2d');

      let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
      const getAccent = () => {
        const s = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        return s || 'oklch(0.82 0.14 220)';
      };

      const resize = () => {
        const r = wrap.getBoundingClientRect();
        w = Math.max(1, r.width); h = Math.max(1, r.height);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // rebuild nodes based on area
        const target = Math.max(16, Math.min(140, Math.round(w * h * density)));
        const nodes = nodesRef.current;
        if (nodes.length < target) {
          for (let i = nodes.length; i < target; i++) {
            nodes.push({
              x: Math.random() * w, y: Math.random() * h,
              vx: (Math.random() - 0.5) * speed,
              vy: (Math.random() - 0.5) * speed,
              r: 0.8 + Math.random() * 1.4,
            });
          }
        } else if (nodes.length > target) {
          nodes.length = target;
        } else {
          // wrap existing nodes inside new bounds
          for (const n of nodes) {
            if (n.x > w) n.x = Math.random() * w;
            if (n.y > h) n.y = Math.random() * h;
          }
        }
      };

      const draw = () => {
        if (!activeRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
        ctx.clearRect(0, 0, w, h);
        const accent = getAccent();
        const nodes = nodesRef.current;

        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0) n.x = w; else if (n.x > w) n.x = 0;
          if (n.y < 0) n.y = h; else if (n.y > h) n.y = 0;
        }
        // links
        ctx.lineWidth = 0.6;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d = Math.hypot(dx, dy);
            if (d < maxLink) {
              const alpha = (1 - d / maxLink) * 0.35;
              ctx.strokeStyle = `color-mix(in oklch, ${accent} ${Math.round(alpha * 100)}%, transparent)`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        // nodes
        for (const n of nodes) {
          ctx.fillStyle = accent;
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        rafRef.current = requestAnimationFrame(draw);
      };

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      const io = new IntersectionObserver(([e]) => { activeRef.current = e.isIntersecting; }, { threshold: 0 });
      io.observe(wrap);

      rafRef.current = requestAnimationFrame(draw);
      return () => {
        cancelAnimationFrame(rafRef.current);
        ro.disconnect(); io.disconnect();
      };
    }, [density, maxLink, speed]);

    return (
      <div ref={wrapRef} className={`constellation ${className}`} aria-hidden
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, zIndex: 0 }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
    );
  }

  // ─── OrbitalDiagram: rotating ring set ─────────────────────
  function OrbitalDiagram({ size = 520, className = '', style = {} }) {
    return (
      <svg
        className={`orbital ${className}`} aria-hidden
        viewBox="0 0 520 520"
        style={{ width: size, height: size, display: 'block', ...style }}
      >
        <defs>
          <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="260" cy="260" r="240" fill="url(#orb-glow)" />

        {/* static rule crosshair */}
        <g stroke="var(--rule-soft)" strokeWidth="1" fill="none">
          <line x1="20" y1="260" x2="500" y2="260" />
          <line x1="260" y1="20" x2="260" y2="500" />
        </g>

        {/* Ring 1 — tight circle with dashes */}
        <g className="orb-ring orb-ring-1">
          <circle cx="260" cy="260" r="90" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="260" cy="170" r="3.5" fill="var(--accent)" />
        </g>

        {/* Ring 2 — tilted ellipse */}
        <g className="orb-ring orb-ring-2" transform="rotate(-24 260 260)">
          <ellipse cx="260" cy="260" rx="150" ry="60" fill="none" stroke="var(--paper-mute)" strokeWidth="1" />
          <circle cx="410" cy="260" r="2.5" fill="var(--paper)" />
        </g>

        {/* Ring 3 — large outer circle */}
        <g className="orb-ring orb-ring-3">
          <circle cx="260" cy="260" r="210" fill="none" stroke="var(--rule)" strokeWidth="1" />
          <circle cx="260" cy="50" r="2.5" fill="var(--paper-dim)" />
          <circle cx="470" cy="260" r="1.8" fill="var(--paper-mute)" />
        </g>

        {/* tick marks at cardinal points on outer ring */}
        <g stroke="var(--paper-mute)" strokeWidth="1">
          <line x1="260" y1="40" x2="260" y2="60" />
          <line x1="260" y1="460" x2="260" y2="480" />
          <line x1="40" y1="260" x2="60" y2="260" />
          <line x1="460" y1="260" x2="480" y2="260" />
        </g>

        {/* mono annotations */}
        <g fontFamily="var(--f-mono)" fontSize="9" fill="var(--paper-mute)" letterSpacing="1">
          <text x="264" y="36">N · ∆V</text>
          <text x="264" y="492">S · 02</text>
          <text x="12"  y="264">W</text>
          <text x="486" y="264">E</text>
        </g>

        {/* center mark */}
        <circle cx="260" cy="260" r="4" fill="var(--accent)" />
        <circle cx="260" cy="260" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }

  // ─── GhostNumeral: huge outlined display numeral, parallaxed ──
  function GhostNumeral({ children, style = {}, className = '' }) {
    const ref = useRef(null);
    const [y, setY] = useState(0);
    useEffect(() => {
      const onScroll = () => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = r.top + r.height / 2;
        const delta = (center - vh / 2) / vh;  // -1..1
        setY(delta * -40); // move up as we scroll past
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
      <span
        ref={ref}
        aria-hidden
        className={`ghost-numeral display ${className}`}
        style={{ transform: `translateY(${y}px)`, ...style }}
      >
        {children}
      </span>
    );
  }

  // ─── CornerFrame: technical-drawing crosshair markers ──────
  function CornerFrame({ label = '', children, className = '' }) {
    return (
      <div className={`corner-frame ${className}`}>
        <span className="corner-frame-tl" aria-hidden />
        <span className="corner-frame-tr" aria-hidden />
        <span className="corner-frame-bl" aria-hidden />
        <span className="corner-frame-br" aria-hidden />
        {label ? <span className="corner-frame-label mono">{label}</span> : null}
        {children}
      </div>
    );
  }

  // ─── AsciiPanel: monospace block with mark ─────────────────
  const ASCII_BLOCK = String.raw`
   ┌──────────────────────────────┐
   │   ∆V · SIGNAL → NOISE         │
   │   ────────────────            │
   │   decentralize · self-host    │
   │   verify · don't trust        │
   │   operate · iterate · ship    │
   └──────────────────────────────┘
          ╲        ╱
           ╲      ╱
            ╲    ╱
             ╲  ╱
              ╲╱
              ∆V
  `;

  function AsciiPanel({ className = '' }) {
    return (
      <pre className={`ascii-panel mono ${className}`} aria-hidden>{ASCII_BLOCK}</pre>
    );
  }

  // ─── GridField: subtle dotted-grid background with vignette ──
  function GridField({ className = '', opacity = 0.5 }) {
    return (
      <div className={`grid-field ${className}`} aria-hidden
           style={{ opacity }}>
      </div>
    );
  }

  // ─── CoordTag: tiny "lat/long"-style section label chip ────
  function CoordTag({ n, label, style = {} }) {
    return (
      <div className="coord-tag mono" style={style} aria-hidden>
        <span className="coord-tag-n">{n}</span>
        <span className="coord-tag-bar" />
        <span className="coord-tag-l">{label}</span>
      </div>
    );
  }

  // ─── StatsBar: editorial KPIs band ─────────────────────────
  const STATS = [
    { k: '04', v: 'Disciplines' },
    { k: '100%', v: 'Self-ownership' },
    { k: '∞', v: 'Iteration' },
    { k: 'E2E', v: 'Encrypted by default' },
  ];
  function StatsBar() {
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
      <div ref={ref} className={`stats-bar ${seen ? 'is-in' : ''}`} aria-hidden>
        {STATS.map((s, i) => (
          <div key={s.k} className="stats-cell" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="stats-k display">{s.k}</span>
            <span className="stats-v mono">{s.v}</span>
          </div>
        ))}
      </div>
    );
  }

  // ─── useScrollShift: scroll-linked translation relative to an anchor ──
  function useScrollShift(ref, { speed = 0.1, axis = 'y' } = {}) {
    const [t, setT] = useState(0);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const measure = () => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = r.top + r.height / 2;
        setT((center - vh / 2) * speed);
      };
      const onScroll = () => measure();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      measure();
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }, [speed, axis]);
    return t;
  }

  // ─── DriftLayer: parallax a decorative child relative to scroll ────
  function DriftLayer({ children, speed = 0.15, rotateSpeed = 0, style = {}, className = '' }) {
    const ref = useRef(null);
    const shift = useScrollShift(ref, { speed });
    const rot = rotateSpeed ? useScrollShift(ref, { speed: rotateSpeed }) : 0;
    return (
      <div
        ref={ref}
        className={`drift-layer ${className}`}
        aria-hidden
        style={{
          transform: `translate3d(0, ${-shift}px, 0) rotate(${rot * 0.05}deg)`,
          willChange: 'transform',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  // ─── FloatingMarks: cluster of tiny mono tags that parallax differently ──
  // Each mark has its own speed multiplier to create depth.
  function FloatingMarks({ marks = [] }) {
    return (
      <div className="floating-marks" aria-hidden>
        {marks.map((m, i) => (
          <DriftLayer key={i} speed={m.speed || 0.12 + i * 0.04}
                      style={{
                        position: 'absolute',
                        left: m.x, top: m.y,
                        pointerEvents: 'none',
                      }}>
            <div className={`float-mark ${m.kind || ''}`}>
              {m.kind === 'cross' ? <CrossMark size={m.size || 14} /> :
               m.kind === 'ring' ? <RingMark size={m.size || 22} /> :
               m.kind === 'dash' ? <DashMark length={m.size || 40} /> :
               <span className="float-mark-text mono">{m.text}</span>}
            </div>
          </DriftLayer>
        ))}
      </div>
    );
  }

  function CrossMark({ size = 14 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden
           stroke="currentColor" strokeWidth="1" fill="none">
        <line x1="7" y1="1" x2="7" y2="13" />
        <line x1="1" y1="7" x2="13" y2="7" />
      </svg>
    );
  }
  function RingMark({ size = 22 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden
           stroke="currentColor" strokeWidth="1" fill="none">
        <circle cx="11" cy="11" r="10" />
        <circle cx="11" cy="11" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  function DashMark({ length = 40 }) {
    return (
      <svg width={length} height="4" viewBox={`0 0 ${length} 4`} aria-hidden
           stroke="currentColor" strokeWidth="1" fill="none">
        <line x1="0" y1="2" x2={length} y2="2" strokeDasharray="4 3" />
      </svg>
    );
  }

  // ─── VerticalRule: thin vertical line that draws in as you scroll ───
  function VerticalRule({ side = 'left', offset = 24 }) {
    const ref = useRef(null);
    const [p, setP] = useState(0);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const measure = () => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = (vh - r.top) / (vh + r.height);
        setP(Math.max(0, Math.min(1, raw)));
      };
      window.addEventListener('scroll', measure, { passive: true });
      window.addEventListener('resize', measure);
      measure();
      return () => { window.removeEventListener('scroll', measure); window.removeEventListener('resize', measure); };
    }, []);
    const style = {
      position: 'absolute',
      [side]: offset,
      top: 0, bottom: 0, width: 1,
      pointerEvents: 'none', zIndex: 0,
      overflow: 'hidden',
    };
    return (
      <div ref={ref} className="vrule" aria-hidden style={style}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent, var(--rule-soft) 10%, var(--rule-soft) 90%, transparent)',
          transform: `scaleY(${p})`,
          transformOrigin: 'top',
          transition: 'transform 120ms linear',
          willChange: 'transform',
        }} />
      </div>
    );
  }

  // ─── FloatingGlyph: a single parallaxing glyph anchored by CSS ─────
  function FloatingGlyph({ kind = 'delta', size = 80, style = {}, speed = 0.2 }) {
    const ref = useRef(null);
    const shift = useScrollShift(ref, { speed });
    const glyph = {
      delta:  <path d="M40 12 L70 64 L10 64 Z" />,
      circle: <circle cx="40" cy="40" r="30" />,
      square: <rect x="12" y="12" width="56" height="56" />,
      diamond:<path d="M40 8 L72 40 L40 72 L8 40 Z" />,
      plus:   <g><line x1="40" y1="10" x2="40" y2="70" /><line x1="10" y1="40" x2="70" y2="40" /></g>,
      ring:   <g><circle cx="40" cy="40" r="32" /><circle cx="40" cy="40" r="20" /></g>,
    }[kind];
    return (
      <div ref={ref} aria-hidden className="float-glyph"
           style={{
             transform: `translate3d(0, ${-shift}px, 0)`,
             willChange: 'transform',
             ...style,
           }}>
        <svg width={size} height={size} viewBox="0 0 80 80"
             stroke="currentColor" strokeWidth="1" fill="none">
          {glyph}
        </svg>
      </div>
    );
  }

  // ─── NoiseFrame: hairline border with subtle noise, for section edges ──
  function SectionEdge({ position = 'top' }) {
    return (
      <div className={`section-edge section-edge-${position}`} aria-hidden>
        <span className="section-edge-cap section-edge-cap-l" />
        <span className="section-edge-rule" />
        <span className="section-edge-cap section-edge-cap-r" />
      </div>
    );
  }

  Object.assign(window, {
    Constellation, OrbitalDiagram, GhostNumeral, CornerFrame, AsciiPanel, GridField, CoordTag, StatsBar,
    DriftLayer, FloatingMarks, VerticalRule, FloatingGlyph, SectionEdge, useScrollShift,
  });
})();
