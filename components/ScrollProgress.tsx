"use client";

import { useEffect, useRef } from "react";

/* A thin brand-gradient line at the top that fills as you read. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let t = false;
    const on = () => {
      if (t) return;
      t = true;
      requestAnimationFrame(() => {
        t = false;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
