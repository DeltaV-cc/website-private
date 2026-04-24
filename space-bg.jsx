// space-bg.jsx — page-wide "space nebula" atmosphere
// Soft blurred orbs drift with parallax + horizontal sine drift + gentle
// scale breathing + subtle rotation. Scroll velocity + scroll progress
// are exposed as CSS variables so gradients can hue-shift and brighten
// as the page moves. Twinkling stars and a single aurora beam add depth
// without breaking the minimalist atmosphere.

(function () {
  const { useEffect, useMemo, useRef } = React;

  function SpaceBG() {
    const ref = useRef(null);

    // Stable pseudo-random star positions (deterministic so hydration is
    // consistent and we don't shuffle on re-render).
    const twinkles = useMemo(() => {
      const out = [];
      for (let i = 0; i < 18; i++) {
        const s = i * 73 + 11;
        out.push({
          x: (s * 29) % 100,
          y: (s * 47) % 100,
          size: 1 + ((s * 7) % 4) / 3,
          delay: ((s * 17) % 8000) / 1000,
          dur: 5.5 + ((s * 13) % 6500) / 1000,
        });
      }
      return out;
    }, []);

    useEffect(() => {
      const root = ref.current;
      if (!root) return;
      const orbs = Array.from(root.querySelectorAll('[data-orb]'));
      if (!orbs.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let raf = 0;
      let target = window.scrollY;
      let current = target;
      let vel = 0;
      let lastScroll = target;
      let lastTime = performance.now();

      const tick = () => {
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        lastTime = now;
        const t = now / 1000;

        current += (target - current) * 0.05;

        const rawVel = (target - lastScroll) / dt;
        vel += (rawVel - vel) * 0.08;
        lastScroll = target;
        const vClamp = Math.max(-4, Math.min(4, vel));

        const totalH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, target / totalH));
        root.style.setProperty('--sbg-progress', progress.toFixed(4));
        root.style.setProperty('--sbg-vel', vClamp.toFixed(3));
        root.style.setProperty('--sbg-vabs', Math.abs(vClamp).toFixed(3));

        for (const el of orbs) {
          const speed   = parseFloat(el.dataset.speed   || '0.08');
          const phase   = parseFloat(el.dataset.phase   || '0');
          const driftX  = parseFloat(el.dataset.driftx  || '40');
          const breathe = parseFloat(el.dataset.breathe || '18');
          const rotSpd  = parseFloat(el.dataset.rot     || '0.004');

          const ty = -current * speed * 0.6;
          const tx = Math.sin((current * 0.0006) + phase) * driftX;
          const sc = 1 + Math.sin((t / breathe) * Math.PI * 2 + phase * 1.3) * 0.04;
          const rt = current * rotSpd * 0.5 + phase * 40;

          el.style.transform =
            `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(3)}) rotate(${rt.toFixed(2)}deg)`;
        }

        raf = requestAnimationFrame(tick);
      };

      const onScroll = () => { target = window.scrollY; };
      window.addEventListener('scroll', onScroll, { passive: true });
      raf = requestAnimationFrame(tick);
      return () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(raf);
      };
    }, []);

    return (
      <div className="space-bg" ref={ref} aria-hidden>
        <div className="space-bg-base" />

        <div className="space-orb space-orb-1" data-orb data-speed="0.04" data-phase="0.0" data-driftx="45" data-breathe="34" data-rot="0.0018" />
        <div className="space-orb space-orb-2" data-orb data-speed="0.09" data-phase="1.4" data-driftx="60" data-breathe="40" data-rot="-0.0022" />
        <div className="space-orb space-orb-3" data-orb data-speed="0.14" data-phase="2.8" data-driftx="38" data-breathe="46" data-rot="0.0026" />
        <div className="space-orb space-orb-4" data-orb data-speed="0.19" data-phase="0.7" data-driftx="65" data-breathe="38" data-rot="-0.0018" />
        <div className="space-orb space-orb-5" data-orb data-speed="0.25" data-phase="2.1" data-driftx="52" data-breathe="44" data-rot="0.0022" />

        <span className="space-aurora" aria-hidden />

        <div className="space-bg-stars" />
        <div className="space-bg-twinkle" aria-hidden>
          {twinkles.map((s, i) => (
            <span
              key={i}
              className="twinkle"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
              }}
            />
          ))}
        </div>
        <div className="space-bg-grain" />
      </div>
    );
  }

  window.SpaceBG = SpaceBG;
})();
