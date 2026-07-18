'use client';

import { useEffect, useRef } from 'react';

type RenderMode = 'characters' | 'dither' | 'mosaic' | 'pixel' | 'dots' | 'cross' | 'diamond' | 'voxel' | 'lego' | 'mixed' | 'lines' | 'diagonal' | 'braille' | 'disco' | 'hexdump' | 'matrix' | 'rings' | 'hearts' | 'stars' | 'hexagons' | 'triangles' | 'bubbles' | 'hatch' | 'contour' | 'halfblocks';
type InkGardenProps = { compact?: boolean; background?: boolean; source?: string; renderMode?: RenderMode };

const chars = ' .·:;+*#%@';
const tint = '#8d79b4';
const sourcePhoto = '/website-private/images/ink-garden-panorama.png';

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
    const reduce = background || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const photo = new Image(); photo.src = source;
    const sourceCanvas = document.createElement('canvas'); const sourceCtx = sourceCanvas.getContext('2d');
    let raf = 0;
    const settings = { cellSize: background ? 9 : compact ? 5 : 6, density: 20, coverage: 100, brightness: 30, contrast: 120, saturation: 100, grayscale: 0, invert: false, tintOpacity: 0, edgeEmphasis: 0, bgOpacity: 90, animSpeed: .35, animIntensity: .08 };
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = host.clientWidth * ratio; canvas.height = host.clientHeight * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); sourceCanvas.width = host.clientWidth; sourceCanvas.height = host.clientHeight; };
    const drawShape = (mode: RenderMode, x: number, y: number, size: number, level: number, fill: string, time: number, ix: number, iy: number) => {
      ctx.fillStyle = fill; ctx.strokeStyle = fill; ctx.lineWidth = Math.max(1, size / 8); const q = size * (.25 + level * .75);
      if (mode === 'characters' || mode === 'hexdump' || mode === 'matrix') { ctx.font = `${size}px ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const set = mode === 'hexdump' ? '0123456789ABCDEF' : mode === 'matrix' ? '01アイ' : chars; ctx.fillText(set[Math.floor((level + ix * .013) * (set.length - 1))], x, y); return; }
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
      const w = host.clientWidth; const h = host.clientHeight; ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#080b0a'; ctx.fillRect(0, 0, w, h);
      if (photo.complete && photo.naturalWidth) { const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight); const sw = photo.naturalWidth * scale; const sh = photo.naturalHeight * scale; const imageY = (h - sh) / 2; ctx.save(); ctx.globalAlpha = background ? .3 : .46; ctx.filter = 'blur(1.5px) brightness(1.18) saturate(.9)'; ctx.drawImage(photo, (w - sw) / 2, imageY, sw, sh); ctx.restore(); }
      if (photo.complete && photo.naturalWidth && sourceCtx) { sourceCtx.clearRect(0, 0, w, h); const scale = Math.max(w / photo.naturalWidth, h / photo.naturalHeight); const sw = photo.naturalWidth * scale; const sh = photo.naturalHeight * scale; const imageY = (h - sh) / 2; sourceCtx.globalAlpha = settings.bgOpacity / 100; sourceCtx.drawImage(photo, (w - sw) / 2, imageY, sw, sh); }
      const data = sourceCtx?.getImageData(0, 0, w, h).data; const cols = Math.ceil(w / settings.cellSize); const rows = Math.ceil(h / (settings.cellSize * 1.35));
      ctx.save(); ctx.globalAlpha = background ? .18 : .34;
      for (let iy = 0; iy < rows; iy++) for (let ix = 0; ix < cols; ix++) {
        const px = Math.min(w - 1, Math.floor((ix + .5) * settings.cellSize)); const py = Math.min(h - 1, Math.floor((iy + .5) * settings.cellSize * 1.35)); const index = (py * w + px) * 4; const r = data?.[index] ?? 75; const g = data?.[index + 1] ?? 62; const b = data?.[index + 2] ?? 80; let level = (r * .299 + g * .587 + b * .114) / 255;
        const yNorm = iy / Math.max(1, rows - 1); const trailCenter = .28 + (.58 - yNorm) * .52; const trailFade = Math.max(0, 1 - Math.abs(yNorm - .38) * 1.25); const trail = Math.max(0, 1 - Math.abs(ix / cols - trailCenter) * 18) * trailFade; level = Math.max(level * .7, trail * .58); const wave = reduce ? 0 : Math.sin(time * .001 * settings.animSpeed + ix * .12 + iy * .035) * settings.animIntensity; level = Math.max(0, Math.min(1, level + wave));
        let mode: RenderMode = renderMode;
        if (renderMode === 'mixed') {
          const pattern = (ix * 7 + iy * 11) % 12;
          mode = pattern < 5 ? 'characters' : pattern < 8 ? 'pixel' : pattern < 10 ? 'lines' : 'halfblocks';
        }
        drawShape(mode, px, py, settings.cellSize, level, colour(r, g, b, settings), time, ix, iy);
      }
      ctx.restore();
      ctx.globalAlpha = background ? .025 : .07; ctx.fillStyle = '#d7f5f2';
      for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const start = () => { resize(); draw(0); }; photo.onload = start; start(); window.addEventListener('resize', resize); return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [background, compact, source, renderMode]);
  return <div className={`ink-garden ${compact ? 'ink-garden-compact' : ''} ${background ? 'ink-garden-background' : ''}`} aria-label={background ? undefined : 'Ink Garden ASCII art field'} aria-hidden={background || undefined} role={background ? undefined : 'img'}><div className="ascii-mist-label">ΔV / INK GARDEN</div><canvas ref={canvasRef} /></div>;
}
