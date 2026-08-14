'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { withBasePath } from '@/lib/site';

/**
 * A screenshot that opens full-size on click.
 *
 * These are captures of a desktop app shown inside a ~550px reading column, so
 * the UI text in them is unreadable at rest. Click (or Enter/Space — it is a
 * real button) to open the same file in a dialog at up to its natural size.
 * No second asset: the enlarged view is the same `src`, so nothing extra is
 * downloaded until the reader asks for it.
 */
export function CourseShot({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const resolved = withBasePath(src);

  const show = useCallback(() => {
    setOpen(true);
    setZoomed(false);
    dialogRef.current?.showModal();
  }, []);

  const hide = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
    setZoomed(false);
  }, []);

  /**
   * Zoom to 1:1 around the point clicked, rather than jumping to the top-left
   * corner — on a 1920px screenshot the interesting part is rarely the corner.
   * The scroll has to wait for the layout that `zoomed` triggers, hence the
   * ref + layout effect rather than scrolling inline.
   */
  const focusPoint = useRef<{ x: number; y: number } | null>(null);

  const toggleZoom = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (zoomed) {
        setZoomed(false);
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      focusPoint.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      setZoomed(true);
    },
    [zoomed],
  );

  useLayoutEffect(() => {
    const box = scrollRef.current;
    const point = focusPoint.current;
    if (!zoomed || !box || !point) return;
    box.scrollLeft = point.x * box.scrollWidth - box.clientWidth / 2;
    box.scrollTop = point.y * box.scrollHeight - box.clientHeight / 2;
  }, [zoomed]);

  /** Drag to pan while zoomed — the obvious gesture once it is bigger than the frame. */
  const onPanStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const box = scrollRef.current;
    if (!box || !box.classList.contains('is-zoomed')) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const left = box.scrollLeft;
    const top = box.scrollTop;
    let moved = false;

    const move = (ev: MouseEvent) => {
      if (Math.abs(ev.clientX - startX) > 3 || Math.abs(ev.clientY - startY) > 3) moved = true;
      box.scrollLeft = left - (ev.clientX - startX);
      box.scrollTop = top - (ev.clientY - startY);
    };
    const up = (ev: MouseEvent) => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      // A drag should pan, not toggle back to fit.
      if (moved) ev.stopPropagation();
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up, { capture: true });
  }, []);

  return (
    <>
      <figure className="course-shot">
        <button type="button" className="course-shot-trigger" onClick={show}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolved}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
          />
          <span className="course-shot-zoom" aria-hidden>
            Click to enlarge
          </span>
        </button>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>

      <dialog ref={dialogRef} className="course-shot-dialog" onClose={hide}>
        {open && (
          <>
            <div className="course-shot-bar">
              <span className="course-shot-hint">
                {zoomed ? 'Click image to fit · drag to pan' : 'Click image to zoom to full size'}
              </span>
              <a href={resolved} target="_blank" rel="noopener noreferrer">
                Open original ↗
              </a>
              <button type="button" onClick={hide} aria-label="Close image">
                ✕
              </button>
            </div>
            <div
              ref={scrollRef}
              className={`course-shot-scroll${zoomed ? ' is-zoomed' : ''}`}
              onMouseDown={onPanStart}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolved}
                alt={alt}
                width={width}
                height={height}
                onClick={toggleZoom}
              />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
