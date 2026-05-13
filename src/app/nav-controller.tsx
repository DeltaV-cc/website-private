"use client";

import { useEffect } from "react";

const SECTION_IDS = ["services", "why", "engage"] as const;

export function NavController() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    const progress = document.querySelector<HTMLElement>(".scroll-progress-fill");
    const links = new Map<string, HTMLAnchorElement>();

    for (const id of SECTION_IDS) {
      const link = document.querySelector<HTMLAnchorElement>(
        `.nav-links a[href="#${id}"], .mobile-nav a[href="#${id}"]`,
      );
      if (link) links.set(id, link);
    }

    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("is-scrolled", y > 80);

      if (progress) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progress.style.transform = `scaleX(${ratio})`;
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections: HTMLElement[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) sections.push(el);
    }

    let activeId: string | null = null;
    function setActive(id: string | null) {
      if (id === activeId) return;
      activeId = id;
      for (const [linkId, link] of links) {
        link.classList.toggle("is-active", linkId === id);
        if (linkId === id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive((visible[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const s of sections) io.observe(s);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return null;
}
