"use client";

import { useEffect, useRef } from "react";
import { solids, solidColor, solidInk, type SolidKind, type V3 } from "./geometry";
import { drawSolid, fitCanvas, rgba, subscribe } from "./draw";

const CHAOS = "#E07A5F";

function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16),
    pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

/* One product's solid, slowly turning. Hover (on the card it sits in) doubles the
   speed and brightens the edges. Foundation assembles from scattered points the
   first time it's seen. */
export default function ProductSolid({ kind, assemble = false, className = "", scale = 0.36, label }: { kind: SolidKind; assemble?: boolean; className?: string; scale?: number; label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const s = solids[kind];
    const col = solidColor[kind];
    const ink = solidInk[kind];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const host = (c.closest("[data-solid-host]") as HTMLElement) ?? c;
    let hover = false,
      glow = 0,
      spin = 0.6,
      tx = 0,
      ty = 0,
      ptx = 0,
      pty = 0,
      built = assemble && kind === "foundation" && !reduced ? 0 : 1,
      seen = false;
    const scatter: V3[] = (s.points ?? []).map((_, i) => {
      const a = i * 2.39996,
        z = ((i * 37) % 27) / 13 - 1;
      const rr = 1.25 + ((i * 13) % 7) / 10;
      return [Math.cos(a) * rr * Math.sqrt(1 - z * z), z * 1.1, Math.sin(a) * rr * Math.sqrt(1 - z * z)];
    });
    const cur: V3[] = (s.points ?? []).map((p) => [...p] as V3);
    const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

    const draw = (t: number) => {
      const { ctx, w, h } = fitCanvas(c);
      ctx.clearRect(0, 0, w, h);
      const r = Math.min(w, h) * scale * (1 + glow * 0.04);
      const e = ease(built);
      if (s.points)
        s.points.forEach((p, i) => {
          const q = scatter[i];
          cur[i] = [q[0] + (p[0] - q[0]) * e, q[1] + (p[1] - q[1]) * e, q[2] + (p[2] - q[2]) * e];
        });
      drawSolid(ctx, s, {
        cx: w / 2,
        cy: h / 2 + (reduced ? 0 : Math.sin(t * 0.8) * r * 0.035),
        r,
        rot: { x: 0.42 + tx + (reduced ? 0 : Math.sin(t * 0.3) * 0.06), y: spin + ty, z: 0.08 },
        edge: kind === "foundation" ? col.edge : ink,
        face: col.face,
        faceAlpha: (0.08 + 0.07 * glow) * (kind === "foundation" ? 1.6 : 1) * e,
        glow,
        width: Math.max(1.1, r / 70),
        points: s.points ? cur : undefined,
        pointColor: s.points ? mix(CHAOS, col.edge, Math.min(1, e * 1.15)) : undefined,
        showEdges: s.points ? Math.max(0, (e - 0.55) / 0.45) : 1,
      });
      if (glow > 0.01) {
        const g = ctx.createRadialGradient(w / 2, h / 2, r * 0.2, w / 2, h / 2, r * 1.5);
        g.addColorStop(0, rgba(col.face, 0.1 * glow));
        g.addColorStop(1, rgba(col.face, 0));
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const tick = (t: number, dt: number) => {
      glow += ((hover ? 1 : 0) - glow) * Math.min(1, dt * 6);
      spin += dt * ((Math.PI * 2) / 25) * (1 + glow);
      tx += (ptx - tx) * Math.min(1, dt * 4);
      ty += (pty - ty) * Math.min(1, dt * 4);
      if (seen && built < 1) built = Math.min(1, built + dt / 1.8);
      draw(t);
    };

    const onEnter = () => (hover = true);
    const onLeave = () => {
      hover = false;
      ptx = pty = 0;
    };
    const onMove = (ev: PointerEvent) => {
      const b = c.getBoundingClientRect();
      const nx = (ev.clientX - (b.left + b.width / 2)) / (b.width / 2);
      const ny = (ev.clientY - (b.top + b.height / 2)) / (b.height / 2);
      const max = (6 * Math.PI) / 180;
      pty = Math.max(-1, Math.min(1, nx)) * max;
      ptx = Math.max(-1, Math.min(1, ny)) * max;
    };
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("focusin", onEnter);
    host.addEventListener("focusout", onLeave);
    if (fine) host.addEventListener("pointermove", onMove);

    let unsub: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          seen = true;
          if (reduced) {
            built = 1;
            draw(0);
          } else if (!unsub) unsub = subscribe(tick);
        } else if (unsub) {
          unsub();
          unsub = null;
        }
      },
      { rootMargin: "100px" }
    );
    io.observe(c);
    const ro = new ResizeObserver(() => draw(performance.now() / 1000));
    ro.observe(c);
    draw(0);
    return () => {
      unsub?.();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("focusin", onEnter);
      host.removeEventListener("focusout", onLeave);
      host.removeEventListener("pointermove", onMove);
    };
  }, [kind, assemble, scale]);
  return <canvas ref={ref} className={`solid-canvas ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
}
