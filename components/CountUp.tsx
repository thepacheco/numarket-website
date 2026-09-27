"use client";

import { useEffect, useRef, useState } from "react";

/* Counts up to a number when it scrolls into view. */
export default function CountUp({ to, prefix = "", suffix = "", duration = 1200 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setV(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className="tnum">
      {prefix}
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
