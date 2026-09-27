"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Fades sections in as they scroll into view. Content stays visible if JS is off. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in), .stagger:not(.in)"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));

    /* Gentle parallax for hero art: elements with data-parallax drift as you scroll. */
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        par.forEach((el) => {
          const k = Number(el.dataset.parallax) || 0.1;
          el.style.transform = `translate3d(0, ${Math.min(160, window.scrollY * k)}px, 0)`;
        });
      });
    };
    if (par.length) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
  return null;
}
