"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "a";
  delay?: number;
  href?: string;
};

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  href,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  const revealClassName = `reveal ${className}`.trim();

  if (as === "a") {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={revealClassName}
        href={href}
        style={style}
      >
        {children}
      </a>
    );
  }

  if (as === "article") {
    return (
      <article
        ref={ref as Ref<HTMLElement>}
        className={revealClassName}
        style={style}
      >
        {children}
      </article>
    );
  }

  if (as === "section") {
    return (
      <section
        ref={ref as Ref<HTMLElement>}
        className={revealClassName}
        style={style}
      >
        {children}
      </section>
    );
  }

  if (as === "header") {
    return (
      <header
        ref={ref as Ref<HTMLElement>}
        className={revealClassName}
        style={style}
      >
        {children}
      </header>
    );
  }

  if (as === "footer") {
    return (
      <footer
        ref={ref as Ref<HTMLElement>}
        className={revealClassName}
        style={style}
      >
        {children}
      </footer>
    );
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={revealClassName}
      style={style}
    >
      {children}
    </div>
  );
}
