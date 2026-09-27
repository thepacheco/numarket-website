"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Scale-style scroll story: a sticky visual that changes as each step scrolls past. */
export default function ScrollStory({ steps, visual }: { steps: { eyebrow?: string; title: ReactNode; body: ReactNode }[]; visual: (active: number) => ReactNode }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="story">
      <div className="story-visual">
        <div className="story-sticky">{visual(active)}</div>
      </div>
      <div className="story-steps">
        {steps.map((s, i) => (
          <div
            key={i}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`story-step ${i === active ? "on" : ""}`}
          >
            {s.eyebrow && <span className="sn">{s.eyebrow}</span>}
            <h3>{s.title}</h3>
            <div style={{ fontSize: 18, color: "var(--text-2)", maxWidth: 460 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
