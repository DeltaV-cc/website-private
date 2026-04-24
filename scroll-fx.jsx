// scroll-fx.jsx — scroll-linked animation primitives for Delta V
// Exposes: useScrollY, useScrollProgress, LineReveal, WordReveal, ScrollProgress,
//          StickyMarker, Magnetic, ScrollPin

(function () {
  const { useEffect, useRef, useState, useLayoutEffect } = React;

  // ── useScrollY: cheap global scroll position with rAF throttle ──
  let __scrollListeners = new Set();
  let __scrollTicking = false;
  let __scrollY = 0;
  function __onScroll() {
    __scrollY = window.scrollY;
    if (!__scrollTicking) {
      __scrollTicking = true;
      requestAnimationFrame(() => {
        __scrollTicking = false;
        __scrollListeners.forEach(fn => fn(__scrollY));
      });
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', __onScroll, { passive: true });
  }
  function useScrollY() {
    const [y, setY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
    useEffect(() => {
      __scrollListeners.add(setY);
      return () => { __scrollListeners.delete(setY); };
    }, []);
    return y;
  }

  // ── useElementProgress: returns 0..1 progress of an element through viewport ──
  // 0 when element top hits viewport bottom; 1 when element bottom hits viewport top.
  function useElementProgress(ref, opts = {}) {
    const [p, setP] = useState(0);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const measure = () => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height + vh;
        const offset = vh - r.top;
        const raw = offset / total;
        setP(Math.max(0, Math.min(1, raw)));
      };
      __scrollListeners.add(measure);
      window.addEventListener('resize', measure, { passive: true });
      measure();
      return () => {
        __scrollListeners.delete(measure);
        window.removeEventListener('resize', measure);
      };
    }, []);
    return p;
  }

  // ── useInView: fires once on enter ──
  function useInView(ref, rootMargin = '-10% 0px -10% 0px') {
    const [seen, setSeen] = useState(false);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      }, { rootMargin });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return seen;
  }

  // ── LineReveal: unmasks its children line-by-line from below ──
  // Children should be block-level lines. Each child is wrapped in an
  // overflow-hidden span; its content translates up from 110% with stagger.
  function LineReveal({ children, delay = 0, stagger = 80, className = '', as: Tag = 'div' }) {
    const ref = useRef(null);
    const seen = useInView(ref);
    const kids = React.Children.toArray(children);
    return (
      <Tag ref={ref} className={`lr-wrap ${className}`}>
        {kids.map((k, i) => (
          <span className={`lr-line ${seen ? 'is-in' : ''}`} key={i}>
            <span className="lr-inner" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
              {k}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  // ── WordReveal: splits a string into words, each fades+rises with stagger ──
  function WordReveal({ text, delay = 0, stagger = 28, className = '' }) {
    const ref = useRef(null);
    const seen = useInView(ref);
    const words = String(text).split(' ');
    return (
      <span ref={ref} className={`wr-wrap ${className}`}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className={`wr-word ${seen ? 'is-in' : ''}`} style={{ transitionDelay: `${delay + i * stagger}ms` }}>
              {w}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    );
  }

  // ── ScrollProgress: thin bar pinned to top showing read progress ──
  function ScrollProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
      const measure = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setP(max > 0 ? window.scrollY / max : 0);
      };
      __scrollListeners.add(measure); measure();
      return () => __scrollListeners.delete(measure);
    }, []);
    return (
      <div className="scroll-progress" aria-hidden>
        <div className="scroll-progress-fill" style={{ transform: `scaleX(${p})` }} />
      </div>
    );
  }

  // ── Magnetic: cursor attractor on children via transform ──
  function Magnetic({ children, strength = 0.25, className = '' }) {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
      const loop = () => { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
        el.style.transform = `translate(${cx}px, ${cy}px)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(loop);
      };
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        tx = mx * strength; ty = my * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      };
      const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        cancelAnimationFrame(raf);
      };
    }, [strength]);
    return <span ref={ref} className={`magnetic ${className}`} style={{ display: 'inline-flex' }}>{children}</span>;
  }

  // ── ParallaxY: translates children relative to scroll within its parent section ──
  function ParallaxY({ children, speed = 0.1, className = '' }) {
    const ref = useRef(null);
    const [y, setY] = useState(0);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const measure = () => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - window.innerHeight / 2;
        setY(-center * speed);
      };
      __scrollListeners.add(measure);
      window.addEventListener('resize', measure);
      measure();
      return () => { __scrollListeners.delete(measure); window.removeEventListener('resize', measure); };
    }, [speed]);
    return (
      <div ref={ref} className={className} style={{ transform: `translate3d(0, ${y}px, 0)`, willChange: 'transform' }}>
        {children}
      </div>
    );
  }

  // Expose globally — each <script type="text/babel"> has its own scope.
  Object.assign(window, {
    useScrollY, useElementProgress, useInView,
    LineReveal, WordReveal, ScrollProgress, Magnetic, ParallaxY,
  });
})();
