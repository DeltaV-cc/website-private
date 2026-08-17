/**
 * Ink Garden — the drawing engine, extracted verbatim from InkGarden.tsx.
 *
 * It lives in its own module for one reason: a 1350x940 background field is
 * 19,300 cells, and drawing it costs ~51 ms per frame. On the main thread that
 * is a long task, eleven times a second, forever. Here the code is agnostic of
 * where it runs, so the worker can own the loop and leave the main thread free.
 *
 * The formulas are unchanged. Same settings, same comet, same wave, same
 * flicker — the output is pixel-identical to the original component.
 */

export type RenderMode =
  | 'characters' | 'dither' | 'mosaic' | 'pixel' | 'dots' | 'cross' | 'diamond'
  | 'voxel' | 'lego' | 'mixed' | 'lines' | 'diagonal' | 'braille' | 'disco'
  | 'hexdump' | 'matrix' | 'rings' | 'hearts' | 'stars' | 'hexagons'
  | 'triangles' | 'bubbles' | 'hatch' | 'contour' | 'halfblocks';

/** Both contexts expose the same 2D drawing surface we use here. */
export type Ctx2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
/** Structural shape shared by HTMLCanvasElement and OffscreenCanvas. */
export type Surface = { width: number; height: number; getContext(id: '2d', options?: { willReadFrequently?: boolean }): Ctx2D | null };

const chars = ' .·:;+*#%@ΔV';
const tint = '#8d79b4';
const sourceComet = { headX: 638, headY: 518, tailX: 724, tailY: 356 };

function hexRgb(hex: string) {
  const value = hex.replace('#', '');
  return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16) };
}

type Settings = {
  cellSize: number; density: number; coverage: number; brightness: number; contrast: number;
  saturation: number; grayscale: number; invert: boolean; tintOpacity: number;
  edgeEmphasis: number; bgOpacity: number; animSpeed: number; animIntensity: number;
};

function colour(r: number, g: number, b: number, settings: Settings) {
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

export type RendererOptions = {
  background: boolean;
  compact: boolean;
  renderMode: RenderMode;
  reduce: boolean;
  /** Host-provided surface factory: document.createElement on the main thread, OffscreenCanvas in the worker. */
  createSurface: (w: number, h: number) => Surface;
};

/**
 * Per-cell values that never change between frames in background mode, where
 * the comet is stationary (cometDrift and cometRise are hard-zero) and the wind
 * is off. Hoisting them out of the loop removes an imageData lookup, two hypot
 * calls and an rgb() string build per cell per frame — the string alone was the
 * single most expensive thing in there. Only `wave` and `artFlicker` are left,
 * because only those two read `time`.
 */
type CellCache = {
  cols: number; rows: number;
  px: Float32Array; py: Float32Array;
  base: Float32Array;
  mode: Uint8Array;
  fill: string[];
};

const MODE_ORDER: RenderMode[] = ['characters', 'pixel', 'lines', 'halfblocks'];

export function createInkGardenRenderer(options: RendererOptions) {
  const { background, compact, renderMode, reduce, createSurface } = options;

  const settings: Settings = {
    cellSize: background ? 7 : compact ? 5 : 6, density: 20, coverage: 100, brightness: 30,
    contrast: 120, saturation: 100, grayscale: 0, invert: false, tintOpacity: 0,
    edgeEmphasis: 0, bgOpacity: 90, animSpeed: background ? 1.1 : .35,
    animIntensity: background ? .2 : .08,
  };
  const renderScale = 1;

  /** Cadence of the original component: ~11 fps for the backdrop, ~31 fps for the compact field. */
  const frameInterval = background ? 90 : 32;

  let ctx: Ctx2D | null = null;
  let target: Surface | null = null;
  let sourceCanvas: Surface | null = null;
  let sourceCtx: Ctx2D | null = null;
  let imageData: Uint8ClampedArray | null = null;
  let photo: { width: number; height: number; image: CanvasImageSource } | null = null;
  let cache: CellCache | null = null;

  let width = 1, height = 1, narrow = false;
  let cometHead = { x: .34, y: .63 };
  let cometTail = { x: .39, y: .44 };

  const drawShape = (mode: RenderMode, x: number, y: number, size: number, level: number, fill: string, time: number, ix: number, iy: number) => {
    if (!ctx) return;
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

  const renderSize = () => ({ w: Math.max(1, Math.ceil(width * renderScale)), h: Math.max(1, Math.ceil(height * renderScale)) });

  /** Rebuilds the per-cell cache. Mirrors the loop in `draw` with time fixed at zero. */
  const buildCache = () => {
    cache = null;
    if (!background || !imageData) return;
    const { w, h } = renderSize();
    const data = imageData;
    const cols = Math.ceil(w / settings.cellSize);
    const rows = Math.ceil(h / (settings.cellSize * 1.35));
    const n = cols * rows;
    const px = new Float32Array(n), py = new Float32Array(n), base = new Float32Array(n);
    const mode = new Uint8Array(n), fill: string[] = new Array(n);

    for (let iy = 0; iy < rows; iy++) for (let ix = 0; ix < cols; ix++) {
      const k = iy * cols + ix;
      const cx = Math.min(w - 1, Math.floor((ix + .5) * settings.cellSize));
      const cy = Math.min(h - 1, Math.floor((iy + .5) * settings.cellSize * 1.35));
      const index = (cy * w + cx) * 4;
      const r = data[index] ?? 75, g = data[index + 1] ?? 62, b = data[index + 2] ?? 80;
      let level = (r * .299 + g * .587 + b * .114) / 255;

      const xNorm = ix / Math.max(1, cols - 1); const yNorm = iy / Math.max(1, rows - 1);
      // background mode: cometDrift and cometRise are hard-zero in the original.
      const trailCenter = .28 + (.58 - yNorm) * .52;
      const trailFade = Math.max(0, 1 - Math.abs(yNorm - .38) * 1.25);
      const trail = Math.max(0, 1 - Math.abs(xNorm - trailCenter) * 18) * trailFade;
      const headX = cometHead.x, headY = cometHead.y, tailX = cometTail.x, tailY = cometTail.y;
      const tailDx = tailX - headX; const tailDy = tailY - headY;
      const tailLength = tailDx * tailDx + tailDy * tailDy;
      const rawProjection = ((xNorm - headX) * tailDx + (yNorm - headY) * tailDy) / tailLength;
      const projection = Math.max(0, Math.min(1, rawProjection));
      const closestX = headX + tailDx * projection; const closestY = headY + tailDy * projection;
      const tailWidth = .008 + projection * .018;
      const tailGlow = rawProjection >= 0 && rawProjection <= 1 ? Math.max(0, 1 - Math.hypot(xNorm - closestX, yNorm - closestY) / tailWidth) * (1 - projection * .72) : 0;
      const headGlow = Math.max(0, 1 - Math.hypot(xNorm - headX, yNorm - headY) / .04);
      level = Math.max(level * .7, trail * .58, tailGlow * .82, headGlow);

      let cellMode: RenderMode = renderMode;
      if (renderMode === 'mixed') {
        const pattern = (ix * 7 + iy * 11) % 12;
        cellMode = pattern < 5 ? 'characters' : pattern < 8 ? 'pixel' : pattern < 10 ? 'lines' : 'halfblocks';
      }
      const glow = Math.max(tailGlow, headGlow); const redAmount = 1 - projection;
      const cometFill = tailGlow > .06
        ? `rgb(${Math.round(70 + redAmount * 180)},${Math.round(155 - redAmount * 80)},${Math.round(205 - redAmount * 90)})`
        : headGlow > .08
          ? `rgb(${Math.round(210 + headGlow * 45)},${Math.round(175 + headGlow * 65)},${Math.round(160 + headGlow * 75)})`
          : null;

      px[k] = cx; py[k] = cy; base[k] = level; fill[k] = cometFill || (glow > .08 ? `rgb(${Math.round(100 + glow * 155)},${Math.round(190 + glow * 65)},255)` : colour(r, g, b, settings));
      const mi = MODE_ORDER.indexOf(cellMode);
      mode[k] = mi >= 0 ? mi : 255;
    }
    cache = { cols, rows, px, py, base, mode, fill };
  };

  const prepare = () => {
    if (!photo || !sourceCtx || !sourceCanvas) return;
    const { w, h } = renderSize();
    const scale = Math.max(w / photo.width, h / photo.height);
    const sw = photo.width * scale; const sh = photo.height * scale;
    const imagePosition = background ? (narrow ? .24 : .48) : .38;
    const imageX = (w - sw) / 2 + Math.max(0, sw - w) * imagePosition; const imageY = (h - sh) / 2;
    cometHead = { x: (imageX + sourceComet.headX * scale) / w, y: (imageY + sourceComet.headY * scale) / h };
    cometTail = { x: (imageX + sourceComet.tailX * scale) / w, y: (imageY + sourceComet.tailY * scale) / h };
    sourceCtx.clearRect(0, 0, w, h);
    sourceCtx.globalAlpha = settings.bgOpacity / 100;
    sourceCtx.drawImage(photo.image, imageX, imageY, sw, sh);
    sourceCtx.globalAlpha = 1;
    imageData = sourceCtx.getImageData(0, 0, w, h).data;
    buildCache();
  };

  const draw = (time: number) => {
    if (!ctx || !target) return;
    const { w, h } = renderSize();
    ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#080b0a'; ctx.fillRect(0, 0, w, h);
    const backgroundPulse = 0;
    if (imageData && sourceCanvas && sourceCanvas.width === w) { ctx.save(); ctx.globalAlpha = background ? .66 : .46; ctx.filter = 'blur(.8px) brightness(1.08) saturate(1.08)'; ctx.drawImage(sourceCanvas as CanvasImageSource, 0, 0, w, h); ctx.restore(); }
    if (background && cometHead.x > 0 && cometHead.x < 1 && cometHead.y > 0 && cometHead.y < 1) { const hx = cometHead.x * w; const hy = cometHead.y * h; const tx = cometTail.x * w; const ty = cometTail.y * h; ctx.save(); ctx.globalCompositeOperation = 'screen'; const headGlow = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.max(34, w * .055)); headGlow.addColorStop(0, 'rgba(238, 252, 255, .55)'); headGlow.addColorStop(.24, 'rgba(125, 220, 255, .24)'); headGlow.addColorStop(1, 'rgba(125, 220, 255, 0)'); ctx.fillStyle = headGlow; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = 'rgba(151, 228, 255, .22)'; ctx.lineWidth = Math.max(2, w * .0022); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(tx, ty); ctx.stroke(); ctx.restore(); }

    ctx.save(); ctx.globalAlpha = background ? .3 : .34;

    if (cache && cache.cols === Math.ceil(w / settings.cellSize)) {
      // Fast path (background): everything but the two time-driven sines is cached.
      const { cols, rows, px, py, base, mode, fill } = cache;
      const shapeSize = settings.cellSize * .82;
      for (let iy = 0; iy < rows; iy++) for (let ix = 0; ix < cols; ix++) {
        const k = iy * cols + ix;
        const wave = reduce ? 0 : Math.sin(time * .0022 * settings.animSpeed + ix * .12 + iy * .035) * settings.animIntensity;
        const level = Math.max(0, Math.min(1, base[k] + wave));
        const artFlicker = reduce ? 0 : Math.sin(time * .004 * settings.animSpeed + ix * .23 + iy * .17) * .5 + .5;
        ctx.globalAlpha = .22 + artFlicker * .1;
        drawShape(MODE_ORDER[mode[k]] ?? renderMode, px[k], py[k], shapeSize, level, fill[k], time, ix, iy);
      }
    } else {
      const data = imageData; const cols = Math.ceil(w / settings.cellSize); const rows = Math.ceil(h / (settings.cellSize * 1.35));
      for (let iy = 0; iy < rows; iy++) for (let ix = 0; ix < cols; ix++) {
        const px = Math.min(w - 1, Math.floor((ix + .5) * settings.cellSize)); const py = Math.min(h - 1, Math.floor((iy + .5) * settings.cellSize * 1.35)); const index = (py * w + px) * 4; const r = data?.[index] ?? 75; const g = data?.[index + 1] ?? 62; const b = data?.[index + 2] ?? 80; let level = (r * .299 + g * .587 + b * .114) / 255;
        const xNorm = ix / Math.max(1, cols - 1); const yNorm = iy / Math.max(1, rows - 1); const cometDrift = background ? 0 : reduce ? 0 : Math.sin(time * .00045 * settings.animSpeed) * .045; const cometRise = background ? 0 : reduce ? 0 : -Math.sin(time * .00045 * settings.animSpeed) * .026; const trailCenter = .28 + (.58 - yNorm) * .52 + cometDrift; const trailFade = Math.max(0, 1 - Math.abs(yNorm - .38) * 1.25); const trail = Math.max(0, 1 - Math.abs(xNorm - trailCenter) * 18) * trailFade;
        const headX = (background ? cometHead.x : .43) + cometDrift; const headY = (background ? cometHead.y : .58) + cometRise; const tailX = background ? cometTail.x : headX - .19; const tailY = background ? cometTail.y : headY - .16; const tailDx = tailX - headX; const tailDy = tailY - headY; const tailLength = tailDx * tailDx + tailDy * tailDy; const rawProjection = ((xNorm - headX) * tailDx + (yNorm - headY) * tailDy) / tailLength; const projection = Math.max(0, Math.min(1, rawProjection)); const closestX = headX + tailDx * projection; const closestY = headY + tailDy * projection; const tailWidth = .008 + projection * .018; const tailGlow = rawProjection >= 0 && rawProjection <= 1 ? Math.max(0, 1 - Math.hypot(xNorm - closestX, yNorm - closestY) / tailWidth) * (1 - projection * .72) : 0; const headGlow = Math.max(0, 1 - Math.hypot(xNorm - headX, yNorm - headY) / .04); level = Math.max(level * .7, trail * .58, tailGlow * .82, headGlow);
        const globalPulse = backgroundPulse * .15; const wave = reduce ? 0 : (Math.sin(time * .0022 * settings.animSpeed + ix * .12 + iy * .035) * settings.animIntensity) + globalPulse; level = Math.max(0, Math.min(1, level + wave));
        let mode: RenderMode = renderMode;
        if (renderMode === 'mixed') {
          const pattern = (ix * 7 + iy * 11) % 12;
          mode = pattern < 5 ? 'characters' : pattern < 8 ? 'pixel' : pattern < 10 ? 'lines' : 'halfblocks';
        }
        const glow = Math.max(tailGlow, headGlow); const redAmount = 1 - projection; const cometFill = tailGlow > .06 ? `rgb(${Math.round(70 + redAmount * 180)},${Math.round(155 - redAmount * 80)},${Math.round(205 - redAmount * 90)})` : headGlow > .08 ? `rgb(${Math.round(210 + headGlow * 45)},${Math.round(175 + headGlow * 65)},${Math.round(160 + headGlow * 75)})` : null; const fill = cometFill || (glow > .08 ? `rgb(${Math.round(100 + glow * 155)},${Math.round(190 + glow * 65)},255)` : colour(r, g, b, settings)); const artFlicker = reduce ? 0 : Math.sin(time * .004 * settings.animSpeed + ix * .23 + iy * .17) * .5 + .5; ctx.globalAlpha = background ? .22 + artFlicker * .1 : .34; const wind = background || reduce ? 0 : Math.sin(time * .0014 * settings.animSpeed + iy * .15 + ix * .018) * Math.max(0, (yNorm - .68) / .32) * settings.cellSize * .62; const shapeSize = background ? settings.cellSize * .82 : settings.cellSize; drawShape(mode, px + wind, py, shapeSize, level, fill, time, ix, iy);
      }
    }
    ctx.restore();
    ctx.globalAlpha = background ? .045 : .07; ctx.fillStyle = '#d7f5f2';
    for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
    ctx.globalAlpha = 1;
  };

  return {
    frameInterval,
    attach(canvas: Surface) {
      target = canvas;
      ctx = canvas.getContext('2d');
    },
    resize(w: number, h: number, dpr: number, isNarrow: boolean) {
      width = w; height = h; narrow = isNarrow;
      if (!target || !ctx) return;
      const ratio = background ? 1 : Math.min(dpr || 1, 2);
      const size = renderSize();
      target.width = size.w * ratio; target.height = size.h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // The source surface exists to be read back with getImageData, which is
      // exactly what this hint is for — Chrome warns without it.
      if (!sourceCanvas) { sourceCanvas = createSurface(size.w, size.h); sourceCtx = sourceCanvas.getContext('2d', { willReadFrequently: true }); }
      sourceCanvas.width = size.w; sourceCanvas.height = size.h;
      imageData = null; cache = null;
      if (photo) prepare();
    },
    setImage(image: CanvasImageSource, w: number, h: number) {
      photo = { image, width: w, height: h };
      prepare();
    },
    draw,
    hasImage: () => photo !== null,
  };
}
