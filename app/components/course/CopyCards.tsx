'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBasePath } from '@/lib/site';
import { CopyButton } from '@/app/components/course/lesson/CopyButton';

/**
 * Templates as copy-paste, not downloads.
 *
 * Hermes takes `SOUL.md` in the New profile dialog and `AGENTS.md` is pasted
 * into a project folder, so the useful action is "put this on the clipboard",
 * never "put a .md in ~/Downloads and go find it". Cards fetch their file from
 * `public/` at click time: the files stay the single source of truth and none
 * of their text ships in the page payload.
 */
export type CopyCardItem = { src: string; title: string; why: string };

export function CopyCards({ items }: { items: CopyCardItem[] }) {
  const [open, setOpen] = useState<CopyCardItem | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpen(null);
    setText('');
    setError(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setText('');
    setError(false);
    dialogRef.current?.showModal();

    fetch(withBasePath(open.src))
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((body) => !cancelled && setText(body))
      .catch(() => !cancelled && setError(true));

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <>
      <div className="course-souls">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            className="course-soul-card"
            onClick={() => setOpen(item)}
          >
            <span className="course-soul-name">{item.title}</span>
            <span className="course-soul-why">{item.why}</span>
            <span className="course-soul-cue" aria-hidden>
              View &amp; copy
            </span>
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} className="course-soul-dialog" onClose={close}>
        {open && (
          <>
            <div className="course-soul-dialog-head">
              <div>
                <div className="course-soul-dialog-title">{open.title}</div>
                <div className="course-soul-dialog-sub">{open.why}</div>
              </div>
              <div className="course-soul-dialog-actions">
                {text && <CopyButton value={text} />}
                <button
                  type="button"
                  onClick={close}
                  className="course-soul-close"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
            <pre className="course-soul-body">
              {error ? `Could not load this template. It lives at ${open.src}` : text || 'Loading…'}
            </pre>
          </>
        )}
      </dialog>
    </>
  );
}
