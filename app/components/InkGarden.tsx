'use client';

import { useEffect, useRef } from 'react';
import { withBasePath } from '@/lib/site';
import { createInkGardenRenderer, type RenderMode, type Surface } from './inkGarden/renderer';

type InkGardenProps = { compact?: boolean; background?: boolean; source?: string; renderMode?: RenderMode; className?: string };

const sourcePhoto = withBasePath('/images/ink-garden-panorama.webp');

/**
 * Which worker owns which canvas.
 *
 * `transferControlToOffscreen` is one-shot per element, and React reuses the
 * same <canvas> node across Fast Refresh and Activity reconnects — the effect
 * re-runs on a node that was already handed over. A ref cannot survive that
 * (it is reset on remount), so ownership is tracked on the element itself.
 */
const OWNERS = new WeakMap<HTMLCanvasElement, Worker>();

/**
 * Ink Garden — the ASCII field behind the whole site.
 *
 * The drawing itself lives in `inkGarden/renderer.ts` and runs inside
 * `inkGarden/worker.ts`. That split is the whole point: a full-viewport field
 * is ~19,000 cells and costs ~51 ms to draw, so running it on the main thread
 * meant a long task eleven times a second, for as long as the page was open.
 * Off-thread, the art is unchanged and the page stays responsive.
 *
 * Browsers without OffscreenCanvas (Safari before 16.4) fall back to the
 * original main-thread loop, so nothing regresses for them.
 */
export default function InkGarden({ compact = false, background = false, source = sourcePhoto, renderMode = 'mixed', className = '' }: InkGardenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionKey = `${background}|${compact}|${renderMode}|${source}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const metrics = () => ({
      w: Math.max(1, host.clientWidth),
      h: Math.max(1, host.clientHeight),
      dpr: window.devicePixelRatio || 1,
      narrow: window.innerWidth <= 640,
    });

    const offscreenSupported =
      typeof Worker !== 'undefined' &&
      typeof OffscreenCanvas !== 'undefined' &&
      typeof canvas.transferControlToOffscreen === 'function';

    if (offscreenSupported) {
      let worker = OWNERS.get(canvas);
      if (!worker) {
        worker = new Worker(new URL('./inkGarden/worker.ts', import.meta.url), { type: 'module' });
        OWNERS.set(canvas, worker);
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage(
          { type: 'init', canvas: offscreen, background, compact, renderMode, reduce, src: source, ...metrics() },
          [offscreen],
        );
      } else {
        // Re-attached to a canvas this worker already owns: just re-sync size.
        worker.postMessage({ type: 'resize', ...metrics() });
      }

      let intersecting = background;
      const sync = () => worker.postMessage({ type: 'run', running: intersecting && document.visibilityState === 'visible' });

      const resizeObserver = new ResizeObserver(() => worker.postMessage({ type: 'resize', ...metrics() }));
      resizeObserver.observe(host);

      const intersectionObserver = 'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => { intersecting = entry?.isIntersecting ?? true; sync(); }, { rootMargin: '240px' })
        : null;
      intersectionObserver?.observe(host);

      document.addEventListener('visibilitychange', sync);
      sync();

      const owned = worker;
      return () => {
        document.removeEventListener('visibilitychange', sync);
        resizeObserver.disconnect();
        intersectionObserver?.disconnect();
        owned.postMessage({ type: 'run', running: false });
        // Kill the worker only if the canvas really left the page. On a Fast
        // Refresh or Activity reconnect the node is still in the document and
        // gets its worker back, because it can never be transferred again.
        setTimeout(() => {
          if (!canvas.isConnected && OWNERS.get(canvas) === owned) {
            OWNERS.delete(canvas);
            owned.terminate();
          }
        }, 0);
      };
    }

    // ── Fallback: the original main-thread loop, unchanged in behaviour ──
    const renderer = createInkGardenRenderer({
      background, compact, renderMode, reduce,
      createSurface: (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c as Surface; },
    });
    renderer.attach(canvas as Surface);

    let raf = 0; let lastFrame = 0; let visible = background; let loadStarted = false;
    const photo = new Image(); photo.decoding = 'async';

    const scheduleFrame = () => {
      if (reduce || !visible || document.visibilityState !== 'visible' || raf) return;
      raf = requestAnimationFrame((next) => {
        raf = 0;
        if (next - lastFrame < renderer.frameInterval) { scheduleFrame(); return; }
        lastFrame = next; renderer.draw(next); scheduleFrame();
      });
    };
    const resize = () => { const m = metrics(); renderer.resize(m.w, m.h, m.dpr, m.narrow); };
    const startLoading = () => { if (loadStarted) return; loadStarted = true; photo.src = source; };
    const paint = () => { resize(); renderer.draw(performance.now()); scheduleFrame(); };
    photo.onload = () => { renderer.setImage(photo, photo.naturalWidth, photo.naturalHeight); paint(); };

    const intersectionObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting ?? true;
          if (visible) { startLoading(); scheduleFrame(); } else { cancelAnimationFrame(raf); raf = 0; }
        }, { rootMargin: '240px' })
      : null;
    intersectionObserver?.observe(host);
    if (background) startLoading();
    resize();

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && visible) scheduleFrame();
      else { cancelAnimationFrame(raf); raf = 0; }
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [background, compact, source, renderMode, optionKey]);

  return (
    <div
      className={`ink-garden ${compact ? 'ink-garden-compact' : ''} ${background ? 'ink-garden-background' : ''} ${className}`}
      aria-label={background ? undefined : 'Ink Garden ASCII art field'}
      aria-hidden={background || undefined}
      role={background ? undefined : 'img'}
    >
      <div className="ascii-mist-label">ΔV / INK GARDEN</div>
      <canvas key={optionKey} ref={canvasRef} />
    </div>
  );
}
