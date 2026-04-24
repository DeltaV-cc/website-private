// hero-bloom.jsx — embeds the amaranth/starbloom-flower artwork as an optimised iframe background.
// Lazy loaded, only activates when near the viewport, with a smooth fade-in once the frame loads.

function HeroBloom() {
  const wrapRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [skip, setSkip] = React.useState(false);

  React.useEffect(() => {
    // Skip the animated iframe on (a) skip-motion users and (b)
    // small viewports — it's a heavy external iframe and the hero
    // already reads fine without it on phones.
    const mq = window.matchMedia('(prefers-skip-motion: reduce), (max-width: 720px)');
    setSkip(mq.matches);
    const onMq = (e) => setSkip(e.matches);
    mq.addEventListener?.('change', onMq);
    return () => mq.removeEventListener?.('change', onMq);
  }, []);

  React.useEffect(() => {
    if (skip) return;
    const el = wrapRef.current;
    if (!el) return;
    // Only attach iframe once hero is in viewport (IntersectionObserver)
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShouldLoad(true); io.disconnect(); } },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skip]);

  // Pause iframe rendering when tab hidden / hero scrolled far offscreen by
  // pointing it at a blank data-url; restore src when visible again.
  React.useEffect(() => {
    if (!loaded) return;
    const frame = frameRef.current;
    if (!frame) return;
    const realSrc = 'https://joannezichenpeng.github.io/amaranth/';
    let offscreen = false;

    const off = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !offscreen) {
          offscreen = true;
          frame.dataset.src = frame.src;
          frame.src = 'about:blank';
        } else if (e.isIntersecting && offscreen) {
          offscreen = false;
          frame.src = realSrc;
        }
      },
      { rootMargin: '0px', threshold: 0 }
    );
    off.observe(wrapRef.current);

    const onVis = () => {
      if (document.hidden && !offscreen) {
        offscreen = true;
        frame.src = 'about:blank';
      } else if (!document.hidden && offscreen && wrapRef.current) {
        const r = wrapRef.current.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          offscreen = false;
          frame.src = realSrc;
        }
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => { off.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, [loaded]);

  const wrapStyle = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 3, overflow: 'hidden',
    background: 'var(--ink)',
  };

  const frameStyle = {
    position: 'absolute',
    top: '58%', left: '72%',
    width: 'min(120vh, 95vw)',
    aspectRatio: '1 / 1',
    transform: 'translate(-50%, -50%)',
    border: 0, display: 'block',
    opacity: loaded ? 1 : 0,
    transition: 'opacity 1200ms cubic-bezier(0.16,1,0.3,1)',
    willChange: 'opacity',
    pointerEvents: 'none',
    // Lighten: keeps the brighter of iframe-bg vs the hero --ink behind it.
    // Since --ink is dark but non-zero and the bloom is bright, the flower
    // shows through while the iframe's own (possibly off-black) backdrop is
    // neutralised against our hero ink — no visible rectangular seam.
    mixBlendMode: 'lighten',
    // Radial mask: iframe fades to transparent at its edges so there is
    // no hard boundary between iframe content and the page ink.
    WebkitMaskImage:
      'radial-gradient(closest-side at 50% 50%, #000 0%, #000 50%, rgba(0,0,0,0.6) 72%, transparent 96%)',
    maskImage:
      'radial-gradient(closest-side at 50% 50%, #000 0%, #000 50%, rgba(0,0,0,0.6) 72%, transparent 96%)',
  };

  const vignetteStyle = {
    position:'absolute', inset:0, pointerEvents:'none',
    // Very gentle fade that only darkens edges/bottom — iframe mask
    // already handles the main blend, this just eases top + sides.
    background:
      'linear-gradient(to right, var(--ink) 0%, transparent 22%),' +
      'linear-gradient(to bottom, transparent 70%, var(--ink) 100%)',
  };

  const grainStyle = {
    position:'absolute', inset:0, pointerEvents:'none', opacity: 0.05,
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px)',
    backgroundSize: '3px 3px',
    mixBlendMode: 'overlay',
  };

  return (
    <div className="hero-bloom" aria-hidden ref={wrapRef} style={wrapStyle}>
      {!skip && shouldLoad && (
        <iframe
          ref={frameRef}
          src="https://joannezichenpeng.github.io/amaranth/"
          title="Delta V — generative bloom"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
          style={frameStyle}
          onLoad={() => setLoaded(true)}
        />
      )}
      <div style={vignetteStyle} />
      <div style={grainStyle} />
    </div>
  );
}

window.HeroBloom = HeroBloom;

