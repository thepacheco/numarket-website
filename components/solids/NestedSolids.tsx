"use client";

import { useEffect, useRef, useState } from "react";
import { solids, solidColor, solidInk, type SolidKind } from "./geometry";
import { drawSolid, fitCanvas, subscribe } from "./draw";

export const layers: { kind: SolidKind; name: string; line: string; shape: string }[] = [
  { kind: "foundation", name: "Foundation", line: "Your data, collected, cleaned, and secured. Everything sits on it.", shape: "Cube" },
  { kind: "workspace", name: "Workspace", line: "Your reports and your apps, built from our standard blocks.", shape: "Dodecahedron" },
  { kind: "insight", name: "Insight Review", line: "An analyst tells you what changed and what to do next.", shape: "Octahedron" },
  { kind: "engineering", name: "Engineering", line: "Optional. Anything custom, built for you alone.", shape: "Icosahedron" },
];
const nested = [0.36, 0.56, 0.78, 1.0];

/* The four product solids orbit apart, then move in and nest into one shape:
   cube → dodecahedron → octahedron → icosahedron. Hover a layer to pull it out. */
export default function NestedSolids() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [together, setTogether] = useState(false);
  const [hot, setHot] = useState<number | null>(null);
  const [locked, setLocked] = useState(0);
  const want = useRef(0);
  const hotRef = useRef<number | null>(null);
  hotRef.current = hot;
  want.current = together ? 1 : 0;

  useEffect(() => {
    const c = ref.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let p = 0,
      orbit = 0,
      spin = 0,
      lastLocked = -1;
    const hl = [0, 0, 0, 0];
    const ff = getComputedStyle(document.body).fontFamily || "sans-serif";
    const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
    const draw = () => {
      const { ctx, w, h } = fitCanvas(c);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.4;
      const order = [3, 2, 1, 0];
      let nLocked = 0;
      for (const i of order) {
        const k = layers[i].kind;
        const local = ease(Math.max(0, Math.min(1, p * 1.6 - i * 0.2)));
        if (local > 0.98) nLocked++;
        const ang = orbit + (i * Math.PI) / 2 + Math.PI / 4;
        const ax = w / 2 + Math.cos(ang) * R * 0.95,
          ay = h / 2 + Math.sin(ang) * R * 0.62;
        const cx = ax + (w / 2 - ax) * local,
          cy = ay + (h / 2 - ay) * local;
        const out = hl[i];
        const r = R * (0.3 + (nested[i] - 0.3) * local) * (1 + out * 0.08);
        const dim = hotRef.current !== null && hotRef.current !== i ? 0.3 : 1;
        drawSolid(ctx, solids[k], {
          cx,
          cy: cy - out * R * 0.05,
          r,
          rot: { x: 0.45, y: spin * (i % 2 ? -1 : 1) + i * 0.6, z: 0.05 * i },
          edge: k === "foundation" ? solidColor.foundation.edge : solidInk[k],
          face: solidColor[k].face,
          alpha: dim,
          faceAlpha: 0.06 + out * 0.08,
          glow: out,
          width: 1.3 + (1 - local) * 0.3,
          dashed: k === "engineering",
        });
        if (local < 0.6) {
          ctx.font = `600 13px ${ff}`;
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(11,31,46,${(1 - local / 0.6) * dim})`;
          ctx.fillText(layers[i].name, cx, cy + r * 1.25 + 14);
        }
      }
      if (nLocked !== lastLocked) {
        lastLocked = nLocked;
        setLocked(nLocked);
      }
    };
    const tick = (_t: number, dt: number) => {
      const target = want.current;
      p += (target - p) * Math.min(1, dt * 1.6);
      if (Math.abs(target - p) < 0.002) p = target;
      orbit += dt * 0.25 * (1 - p);
      spin += dt * ((Math.PI * 2) / 28);
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
    if (reduced) {
      p = 1;
      draw();
    }
    const timer = window.setTimeout(() => setTogether(true), 3000);
    const onScroll = () => {
      if (window.scrollY > 60) setTogether(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onMove = (ev: PointerEvent) => {
      if (want.current < 1) return;
      const b = c.getBoundingClientRect();
      const d = Math.hypot(ev.clientX - (b.left + b.width / 2), ev.clientY - (b.top + b.height / 2)) / (Math.min(b.width, b.height) * 0.4);
      setHot(d < 0.44 ? 0 : d < 0.66 ? 1 : d < 0.88 ? 2 : d < 1.08 ? 3 : null);
    };
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerleave", () => setHot(null));
    return () => {
      unsub?.();
      io.disconnect();
      ro.disconnect();
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      c.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="nested">
      <div className="nested-stage">
        <canvas ref={ref} className="nested-canvas" role="img" aria-label="Four product shapes that nest into one: Foundation at the center, then Workspace, Insight Review, and Engineering on the outside." />
        <button type="button" className="btn btn-secondary nested-toggle" onClick={() => setTogether((v) => !v)}>
          {together ? "Take it apart" : "Put it together"}
        </button>
      </div>
      <ol className="nested-legend">
        {layers.map((l, i) => (
          <li key={l.kind} className={`${hot === i ? "on" : ""} ${together && locked > i ? "locked" : ""}`} onMouseEnter={() => together && setHot(i)} onMouseLeave={() => setHot(null)}>
            <button type="button" onFocus={() => together && setHot(i)} onBlur={() => setHot(null)} onClick={() => setTogether(true)}>
              <span className={`nl-dot k-${l.kind}`} aria-hidden="true" />
              <span>
                <b>{l.name}</b>
                <small>
                  {l.shape}
                  {i === 0 ? " · at the center" : i === 3 ? " · outer shell, optional" : ""}
                </small>
                <span className="nl-line">{l.line}</span>
              </span>
              <span className="nl-check" aria-hidden="true">
                ✓
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
