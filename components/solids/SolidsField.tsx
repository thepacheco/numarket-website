"use client";

import { useEffect, useRef } from "react";
import { solids, solidColor, solidInk, type SolidKind } from "./geometry";
import { drawSolid, fitCanvas, subscribe } from "./draw";

const kinds: SolidKind[] = ["foundation", "workspace", "insight", "engineering"];

/* Small solids scattered across the whole section, drifting slowly behind the
   content. Anything that falls in the text zone stays at or below 0.18 opacity. */
export default function SolidsField({ count, textZone = "left", seed = 7, className = "" }: { count?: number; textZone?: "left" | "center" | "none"; seed?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rnd = seed;
    const rand = () => {
      rnd = (rnd * 16807) % 2147483647;
      return (rnd - 1) / 2147483646;
    };
    type Item = { kind: SolidKind; fx: number; fy: number; size: number; op: number; ph: number; spd: number; tilt: number };
    let items: Item[] = [];
    const layout = (w: number, h: number) => {
      rnd = seed;
      const n = count ?? Math.max(6, Math.min(12, Math.round((w * h) / 90000)));
      const cols = n > 8 ? 4 : 3;
      const rows = Math.ceil(n / cols);
      items = Array.from({ length: n }, (_, i) => {
        const cx = (i % cols) + 0.15 + rand() * 0.7;
        const cy = Math.floor(i / cols) + 0.15 + rand() * 0.7;
        const fx = cx / cols,
          fy = cy / rows;
        const inText = textZone === "left" ? fx < 0.56 : textZone === "center" ? fx > 0.2 && fx < 0.8 : false;
        const op = inText ? 0.1 + rand() * 0.08 : 0.18 + rand() * 0.17;
        return { kind: kinds[(i + Math.floor(rand() * 4)) % 4], fx, fy, size: 14 + rand() * 26, op, ph: rand() * 6.28, spd: 0.6 + rand() * 0.6, tilt: rand() * 0.8 };
      });
    };
    let lw = 0,
      lh = 0;
    const draw = (t: number) => {
      const { ctx, w, h } = fitCanvas(c);
      if (w !== lw || h !== lh) {
        layout(w, h);
        lw = w;
        lh = h;
      }
      ctx.clearRect(0, 0, w, h);
      const k = Math.min(1.4, Math.max(0.8, h / 520));
      for (const it of items) {
        const dx = reduced ? 0 : Math.sin(t * 0.12 * it.spd + it.ph) * 14;
        const dy = reduced ? 0 : Math.cos(t * 0.1 * it.spd + it.ph) * 10;
        drawSolid(ctx, solids[it.kind], {
          cx: it.fx * w + dx,
          cy: it.fy * h + dy,
          r: it.size * k,
          rot: { x: 0.4 + it.tilt, y: it.ph + t * ((Math.PI * 2) / 30) * it.spd, z: it.tilt * 0.3 },
          edge: it.kind === "foundation" ? solidColor.foundation.edge : solidInk[it.kind],
          face: solidColor[it.kind].face,
          alpha: it.op,
          faceAlpha: 0.1,
          width: 1.1,
        });
      }
    };
    let unsub: (() => void) | null = null;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        if (reduced) draw(0);
        else if (!unsub) unsub = subscribe((t) => draw(t));
      } else if (unsub) {
        unsub();
        unsub = null;
      }
    });
    io.observe(c);
    const ro = new ResizeObserver(() => draw(performance.now() / 1000));
    ro.observe(c);
    return () => {
      unsub?.();
      io.disconnect();
      ro.disconnect();
    };
  }, [count, textZone, seed]);
  return <canvas ref={ref} className={`solids-field ${className}`} aria-hidden="true" />;
}
