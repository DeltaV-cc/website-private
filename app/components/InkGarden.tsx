'use client';

import { useEffect, useRef } from 'react';

type RenderMode = 'characters' | 'dither' | 'mosaic' | 'pixel' | 'dots' | 'cross' | 'diamond' | 'voxel' | 'lego' | 'mixed' | 'lines' | 'diagonal' | 'braille' | 'disco' | 'hexdump' | 'matrix' | 'rings' | 'hearts' | 'stars' | 'hexagons' | 'triangles' | 'bubbles' | 'hatch' | 'contour' | 'halfblocks';
type InkGardenProps = { compact?: boolean; background?: boolean; source?: string; renderMode?: RenderMode };

const chars = ' .·:;+*#%@ΔV';
const tint = '#8d79b4';
const sourcePhoto = '/website-private/images/ink-garden-panorama.webp';

function hexRgb(hex: string) {
  const value = hex.replace('#', '');
  return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16) };
}

function colour(r: number, g: number, b: number, settings: { brightness: number; contrast: number; saturation: number; grayscale: number; invert: boolean; tintOpacity: number }) {
  const brightness = settings.brightness * 2.55;
  r += brightness; g += brightness; b += brightness;
  const factor = (259 * (settings.contrast + 255)) / (255 * (259 - settings.contrast));
  r = factor * (r - 128) + 128; g = factor * (g - 128) + 128; b = factor * (b - 128) + 128;
  const grey = .299 * r + .587 * g + .114 * b;
  const saturation = settings.saturation / 100;
  r = grey + (r - grey) * saturation; g = grey + (g - grey) * saturation; b = grey + (b - grey) * saturation;
  const mono = settings.grayscale / 100;
  r += (grey - r) * mono; g += (grey - g) * mono; b += (grey - b) * mono;
  if (settings.invert) { r = 255 - r; g = 255 - g; b = 255 - b; }
  if (settings.tintOpacity) { const t = hexRgb(tint); const mix = settings.tintOpacity / 100; r = r * (1 - mix) + t.r * mix; g = g * (1 - mix) + t.g * mix; b = b * (1 - mix) + t.b * mix; }
  return `rgb(${Math.max(0, Math.min(255, r))},${Math.max(0, Math.min(255, g))},${Math.max(0, Math.min(255, b))})`;
}

export default function InkGarden({ compact = false, background = false, source = sourcePhoto, renderMode = 'mixed' }: InkGardenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; const host = canvas?.parentElement; const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const photo = new Image(); photo.decoding = 'async';
    const sourceCanvas = document.createElement('canvas'); const sourceCtx = sourceCanvas.getContext('2d');
    let raf = 0; let lastFrame = 0; let imageData: Uint8ClampedArray | null = null; let visible = background; let loadStarted = false;
    const settings = { cellSize: background ? 9 : compact ? 5 : 6, density: 20, coverage: 100, brightness: 30, contrast: 120, saturation: 100, grayscale: 0, invert: false, tintOpacity: 0, edgeEmphasis: 0, bgOpacity: 90, animSpeed: .35, animIntensity: .08 };
    const renderScale = 1;
    const renderSize = () => ({ w: Math.max(1, Math.ceil(host.clientWidth * renderScale)), h: Math.max(1, Math.ceil(host.clientHeight * renderScale)) });
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 2); const { w, h } = renderSize(); canvas.width = w * ratio; canvas.height = h * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); sourceCanvas.width = w; sourceCanvas.height = h; imageData = null; if (photo.complete && photo.naturalWidth && sourceCtx) prepare(); };
    const prepare = () => { if (!photo.complete || !photo.naturalWidth || !sourceCtx) return; const { w, h } = renderSize(); const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight); const sw = photo.naturalWidth * scale; const sh = photo.naturalHeight * scale; const imageX = (w - sw) / 2 + Math.max(0, sw - w) * (background ? .62 : .38); const imageY = (h - sh) / 2; sourceCtx.clearRect(0, 0, w, h); sourceCtx.globalAlpha = settings.bgOpacity / 100; sourceCtx.drawImage(photo, imageX, imageY, sw, sh); sourceCtx.globalAlpha = 1; imageData = sourceCtx.getImageData(0, 0, w, h).data; };
    const drawShape = (mode: RenderMode, x: number, y: number, size: number, level: number, fill: string, time: number, ix: number, iy: number) => {
      ctx.fillStyle = fill; ctx.strokeStyle = fill; ctx.lineWidth = Math.max(1, size / 8); const q = size * (.25 + level * .75);
      if (mode === 'characters' || mode === 'hexdump' || mode === 'matrix') { ctx.font = `${size}px ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const set = mode === 'hexdump' ? '0123456789ABCDEF' : mode === 'matrix' ? '01アイ' : chars; const charIndex = Math.min(set.length - 1, Math.floor((level + ix * .013) * (set.length - 1))); ctx.fillText(set[charIndex], x, y); return; }
      ctx.beginPath();
      if (mode === 'dots' || mode === 'disco' || mode === 'bubbles') ctx.arc(x, y, q / 2, 0, Math.PI * 2);
      else if (mode === 'rings') { ctx.arc(x, y, q / 2, 0, Math.PI * 2); ctx.stroke(); return; }
      else if (mode === 'cross') { ctx.moveTo(x - q, y); ctx.lineTo(x + q, y); ctx.moveTo(x, y - q); ctx.lineTo(x, y + q); ctx.stroke(); return; }
      else if (mode === 'diamond' || mode === 'triangles') { ctx.moveTo(x, y - q); ctx.lineTo(x + q, y + q); ctx.lineTo(mode === 'triangles' ? x - q : x - q, y + q); ctx.closePath(); }
      else if (mode === 'hexagons') { for (let i = 0; i < 6; i++) ctx.lineTo(x + Math.cos(i * Math.PI / 3) * q, y + Math.sin(i * Math.PI / 3) * q); ctx.closePath(); }
      else if (mode === 'hearts') { ctx.moveTo(x, y + q); ctx.bezierCurveTo(x - q * 1.5, y, x - q, y - q, x, y - q / 3); ctx.bezierCurveTo(x + q, y - q, x + q * 1.5, y, x, y + q); }
      else if (mode === 'lines' || mode === 'diagonal' || mode === 'hatch' || mode === 'contour') { const offset = mode === 'diagonal' ? q : 0; ctx.moveTo(x - q, y - offset); ctx.lineTo(x + q, y + offset); if (mode === 'hatch' || mode === 'contour') { ctx.moveTo(x - q, y + offset); ctx.lineTo(x + q, y - offset); } ctx.stroke(); return; }
      else { ctx.rect(x - q / 2, y - q / 2, q, q); }
      if (mode === 'pixel' || mode === 'mosaic' || mode === 'lego' || mode === 'voxel' || mode === 'mixed' || level > .58) ctx.fill(); else ctx.stroke();
      if (mode === 'halfblocks' || mode === 'braille') { ctx.fillRect(x - q / 2, y - q / 2, q, q / 2); }
      void time; void iy;
    };
    const draw = (time: number) => {
      const { w, h } = renderSize(); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#080b0a'; ctx.fillRect(0, 0, w, h);
      if (imageData && sourceCanvas.width === w) { ctx.save(); ctx.globalAlpha = background ? .4 : .46; ctx.filter = 'blur(1.5px) brightness(1.18) saturate(.9)'; ctx.drawImage(sourceCanvas, 0, 0, w, h); ctx.restore(); }
      const data = imageData; const cols = Math.ceil(w / settings.cellSize); const rows = Math.ceil(h / (settings.cellSize * 1.35));
      ctx.save(); ctx.globalAlpha = background ? .27 : .34;
      for (let iy = 0; iy < rows; iy++) for (let ix = 0; ix < cols; ix++) {
        const px = Math.min(w - 1, Math.floor((ix + .5) * settings.cellSize)); const py = Math.min(h - 1, Math.floor((iy + .5) * settings.cellSize * 1.35)); const index = (py * w + px) * 4; const r = data?.[index] ?? 75; const g = data?.[index + 1] ?? 62; const b = data?.[index + 2] ?? 80; let level = (r * .299 + g * .587 + b * .114) / 255;
        const xNorm = ix / Math.max(1, cols - 1); const yNorm = iy / Math.max(1, rows - 1); const cometPhase = time * .00045 * settings.animSpeed; const cometDrift = reduce ? 0 : Math.sin(cometPhase) * .045; const cometRise = reduce ? 0 : -Math.sin(cometPhase) * .026; const trailCenter = .28 + (.58 - yNorm) * .52 + cometDrift; const trailFade = Math.max(0, 1 - Math.abs(yNorm - .38) * 1.25); const trail = Math.max(0, 1 - Math.abs(xNorm - trailCenter) * 18) * trailFade;
      const headX = (background ? .64 : .43) + cometDrift; const headY = .58 + cometRise; const tailX = headX - .19; const tailY = headY - .16; const tailDx = tailX - headX; const tailDy = tailY - headY; const tailLength = tailDx * tailDx + tailDy * tailDy; const rawProjection = ((xNorm - headX) * tailDx + (yNorm - headY) * tailDy) / tailLength; const projection = Math.max(0, Math.min(1, rawProjection)); const closestX = headX + tailDx * projection; const closestY = headY + tailDy * projection; const tailWidth = .008 + projection * .018; const tailGlow = rawProjection >= 0 && rawProjection <= 1 ? Math.max(0, 1 - Math.hypot(xNorm - closestX, yNorm - closestY) / tailWidth) * (1 - projection * .72) : 0; const headGlow = Math.max(0, 1 - Math.hypot(xNorm - headX, yNorm - headY) / .04); level = Math.max(level * .7, trail * .58, tailGlow * .82, headGlow);
        const wave = reduce ? 0 : Math.sin(time * .001 * settings.animSpeed + ix * .12 + iy * .035) * settings.animIntensity; level = Math.max(0, Math.min(1, level + wave));
        let mode: RenderMode = renderMode;
        if (renderMode === 'mixed') {
          const pattern = (ix * 7 + iy * 11) % 12;
          mode = pattern < 5 ? 'characters' : pattern < 8 ? 'pixel' : pattern < 10 ? 'lines' : 'halfblocks';
        }
        const glow = Math.max(tailGlow, headGlow); const redAmount = 1 - projection; const cometFill = tailGlow > .06 ? `rgb(${Math.round(70 + redAmount * 180)},${Math.round(155 - redAmount * 80)},${Math.round(205 - redAmount * 90)})` : headGlow > .08 ? `rgb(${Math.round(210 + headGlow * 45)},${Math.round(175 + headGlow * 65)},${Math.round(160 + headGlow * 75)})` : null; const fill = cometFill || (glow > .08 ? `rgb(${Math.round(100 + glow * 155)},${Math.round(190 + glow * 65)},255)` : colour(r, g, b, settings)); const windBand = Math.max(0, (yNorm - .68) / .32); const wind = reduce ? 0 : Math.sin(time * .00072 * settings.animSpeed + iy * .15 + ix * .018) * windBand * settings.cellSize * .62; drawShape(mode, px + wind, py, settings.cellSize, level, fill, time, ix, iy);
      }
      ctx.restore();
      ctx.globalAlpha = background ? .045 : .07; ctx.fillStyle = '#d7f5f2';
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
      ctx.globalAlpha = 1;
      if (!reduce && visible && document.visibilityState === 'visible') raf = requestAnimationFrame((next) => { if (next - lastFrame < 32) { raf = requestAnimationFrame(draw); return; } lastFrame = next; draw(next); });
    };
    const startLoading = () => { if (loadStarted) return; loadStarted = true; photo.src = source; };
    const start = () => { resize(); prepare(); draw(performance.now()); };
    photo.onload = start;
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; if (visible) { startLoading(); if (!raf) draw(performance.now()); } }, { rootMargin: '240px' }) : null;
    observer?.observe(host);
    if (background) startLoading();
    start();
    const onVisibility = () => { if (document.visibilityState === 'visible' && visible && !raf) draw(performance.now()); };
    window.addEventListener('resize', resize); document.addEventListener('visibilitychange', onVisibility); return () => { cancelAnimationFrame(raf); observer?.disconnect(); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVisibility); };
  }, [background, compact, source, renderMode]);
  return <div className={`ink-garden ${compact ? 'ink-garden-compact' : ''} ${background ? 'ink-garden-background' : ''}`} aria-label={background ? undefined : 'Ink Garden ASCII art field'} aria-hidden={background || undefined} role={background ? undefined : 'img'}><div className="ascii-mist-label">ΔV / INK GARDEN</div><canvas ref={canvasRef} /></div>;
}
