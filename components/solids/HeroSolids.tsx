"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { solids, solidColor, solidInk, type SolidKind } from "./geometry";
import { drawSolid, fitCanvas, subscribe } from "./draw";

/* The hero's picture of what you buy: the four product shapes drift in from
   apart and settle into one, turning slowly, in the same line style as the
   shapes floating behind the hero. Each label names what that layer is for
   you; hover one to lift its shape out. */
const parts: { kind: SolidKind; href: string; what: string; name: string }[] = [
  { kind: "foundation", href: "/products/foundation", what: "Your data", name: "Foundation" },
  { kind: "workspace", href: "/products/workspace", what: "Your dashboards", name: "Workspace" },
  { kind: "insight", href: "/products/insight-review", what: "Your analyst", name: "Insight Review" },
  { kind: "engineering", href: "/products/engineering", what: "Apps built for you", name: "Engineering" },
];
const nested = [0.36, 0.56, 0.78, 1.0];

export default function HeroSolids() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hot, setHot] = useState<number | null>(null);
  const hotRef = useRef<number | null>(null);
  hotRef.current = hot;

  useEffect(() => {
    const c = ref.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let p = reduced ? 1 : 0,
      orbit = 0,
      spin = 0,
      age = 0;
    const hl = [0, 0, 0, 0];
    const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
    const draw = () => {
      const { ctx, w, h } = fitCanvas(c);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      for (const i of [3, 2, 1, 0]) {
        const k = parts[i].kind;
        const local = ease(Math.max(0, Math.min(1, p * 1.6 - i * 0.2)));
        const ang = orbit + (i * Math.PI) / 2 + Math.PI / 4;
        const ax = w / 2 + Math.cos(ang) * R * 0.9,
          ay = h / 2 + Math.sin(ang) * R * 0.6;
        const out = hl[i];
        const cx = ax + (w / 2 - ax) * local,
          cy = ay + (h / 2 - ay) * local - out * R * 0.04;
        const r = R * (0.3 + (nested[i] - 0.3) * local) * (1 + out * 0.07);
        const dim = hotRef.current !== null && hotRef.current !== i ? 0.28 : 1;
        drawSolid(ctx, solids[k], {
          cx,
          cy,
          r,
          rot: { x: 0.45, y: spin * (i % 2 ? -1 : 1) + i * 0.6, z: 0.05 * i },
          edge: k === "foundation" ? solidColor.foundation.edge : solidInk[k],
          face: solidColor[k].face,
          alpha: dim,
          faceAlpha: 0.05 + out * 0.1,
          glow: out,
          width: 1.3,
          dashed: k === "engineering",
        });
      }
    };
    const tick = (_t: number, dt: number) => {
      age += dt;
      /* a beat apart, then they come together and stay */
      const target = age > 0.9 ? 1 : 0;
      p += (target - p) * Math.min(1, dt * 1.4);
      orbit += dt * 0.22 * (1 - p);
      spin += dt * ((Math.PI * 2) / 30);
      for (let i = 0; i < 4; i++) hl[i] += ((hotRef.current === i ? 1 : 0) - hl[i]) * Math.min(1, dt * 7);
      draw();
    };
    let unsub: (() => void) | null = null;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !unsub && !reduced) unsub = subscribe(tick);
      else if (!en.isIntersecting && unsub) {
        unsub();
        unsub = null;
      }
    });
    io.observe(c);
    const ro = new ResizeObserver(() => draw());
    ro.observe(c);
    draw();
    return () => {
      unsub?.();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="hero-solids">
      <canvas ref={ref} className="hero-solids-canvas" role="img" aria-label="Four product shapes nesting into one: your data at the center, then your dashboards, your analyst, and apps built for you on the outside." />
      <ul className="hero-solids-legend">
        {parts.map((x, i) => (
          <li key={x.kind}>
            <Link href={x.href} className={`k-${x.kind} ${hot === i ? "on" : ""}`} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(i)} onBlur={() => setHot(null)}>
              <span className={`nl-dot k-${x.kind}`} aria-hidden="true" />
              <span>
                <b>{x.what}</b>
                <small>{x.name}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
