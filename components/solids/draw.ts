/* Draws a wireframe solid on a 2D canvas with depth cues: nearer edges are
   darker and thicker, faces are a faint tint sorted back to front. One shared
   animation loop drives every solid on the page. */

import type { Solid, V3 } from "./geometry";

export type Rot = { x: number; y: number; z?: number };

export function rotate(v: V3, r: Rot): V3 {
  let [x, y, z] = v;
  const cz = Math.cos(r.z ?? 0),
    sz = Math.sin(r.z ?? 0);
  [x, y] = [x * cz - y * sz, x * sz + y * cz];
  const cy = Math.cos(r.y),
    sy = Math.sin(r.y);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  const cx = Math.cos(r.x),
    sx = Math.sin(r.x);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  return [x, y, z];
}

const rgbCache = new Map<string, [number, number, number]>();
export function rgba(hex: string, a: number) {
  let c = rgbCache.get(hex);
  if (!c) {
    const n = parseInt(hex.slice(1), 16);
    c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    rgbCache.set(hex, c);
  }
  return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;
}

export type DrawOpts = {
  cx: number;
  cy: number;
  r: number; // px radius
  rot: Rot;
  edge: string;
  face: string;
  alpha?: number; // overall opacity
  faceAlpha?: number; // 0.08 idle, 0.15 hover
  glow?: number; // 0..1 brightens edges
  width?: number; // base line width in px
  dashed?: boolean;
  /* Foundation: lattice point positions (already in solid space) and their colors */
  points?: V3[];
  pointColor?: string | ((i: number) => string);
  showEdges?: number; // 0..1 fade for edges (lattice assembly)
};

const P = 3.4; // perspective distance in radii

export function drawSolid(ctx: CanvasRenderingContext2D, s: Solid, o: DrawOpts) {
  const a = o.alpha ?? 1;
  const proj = (v: V3) => {
    const p = rotate(v, o.rot);
    const k = P / (P - p[2]);
    return [o.cx + p[0] * o.r * k, o.cy - p[1] * o.r * k, p[2]] as V3;
  };
  const pv = s.verts.map(proj);
  // faces, back to front
  const fa = (o.faceAlpha ?? 0.08) * a;
  if (fa > 0.002) {
    const order = s.faces.map((f, i) => ({ i, z: f.reduce((t, k) => t + pv[k][2], 0) / f.length })).sort((p, q) => p.z - q.z);
    for (const { i, z } of order) {
      const f = s.faces[i];
      ctx.beginPath();
      f.forEach((k, j) => (j ? ctx.lineTo(pv[k][0], pv[k][1]) : ctx.moveTo(pv[k][0], pv[k][1])));
      ctx.closePath();
      ctx.fillStyle = rgba(o.face, fa * (0.55 + 0.45 * ((z + 1) / 2)));
      ctx.fill();
    }
  }
  const w = o.width ?? 1.4;
  const glow = o.glow ?? 0;
  const edgeFade = o.showEdges ?? 1;
  // faint interior grid (lattice)
  if (s.grid && s.points && edgeFade > 0) {
    const pp = (o.points ?? s.points).map(proj);
    ctx.lineWidth = w * 0.6;
    for (const [i, j] of s.grid) {
      const z = (pp[i][2] + pp[j][2]) / 2;
      ctx.strokeStyle = rgba(o.edge, a * edgeFade * (0.1 + 0.12 * ((z + 1) / 2)) * (1 + glow));
      ctx.beginPath();
      ctx.moveTo(pp[i][0], pp[i][1]);
      ctx.lineTo(pp[j][0], pp[j][1]);
      ctx.stroke();
    }
  }
  // edges, back to front so near ones sit on top
  if (edgeFade > 0) {
    ctx.setLineDash(o.dashed ?? s.dashed ? [w * 3, w * 2.6] : []);
    ctx.lineCap = "round";
    const es = s.edges.map(([i, j]) => ({ i, j, z: (pv[i][2] + pv[j][2]) / 2 })).sort((p, q) => p.z - q.z);
    for (const { i, j, z } of es) {
      const d = (z + 1) / 2;
      ctx.lineWidth = w * (0.7 + 0.6 * d) * (1 + glow * 0.35);
      ctx.strokeStyle = rgba(o.edge, a * edgeFade * Math.min(1, (0.28 + 0.72 * d) * (1 + glow * 0.6)));
      ctx.beginPath();
      ctx.moveTo(pv[i][0], pv[i][1]);
      ctx.lineTo(pv[j][0], pv[j][1]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }
  // lattice points
  if (s.points) {
    const pts = (o.points ?? s.points).map(proj);
    const order = pts.map((p, i) => ({ i, z: p[2] })).sort((p, q) => p.z - q.z);
    for (const { i, z } of order) {
      const d = (z + 1) / 2;
      const col = typeof o.pointColor === "function" ? o.pointColor(i) : o.pointColor ?? o.edge;
      ctx.fillStyle = rgba(col, a * (0.45 + 0.55 * d));
      ctx.beginPath();
      ctx.arc(pts[i][0], pts[i][1], Math.max(1.2, w * (1.1 + 0.9 * d)), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/* ---------- one shared requestAnimationFrame loop ---------- */
type Tick = (t: number, dt: number) => void;
const subs = new Set<Tick>();
let raf = 0;
let last = 0;
function loop(now: number) {
  const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
  last = now;
  subs.forEach((f) => f(now / 1000, dt));
  raf = subs.size ? requestAnimationFrame(loop) : 0;
  if (!raf) last = 0;
}
export function subscribe(f: Tick) {
  subs.add(f);
  if (!raf) raf = requestAnimationFrame(loop);
  return () => {
    subs.delete(f);
  };
}

/* Sizes a canvas to its box at up to 2x pixel ratio; returns CSS width/height. */
export function fitCanvas(c: HTMLCanvasElement) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = c.clientWidth || 1,
    h = c.clientHeight || 1;
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
  }
  const ctx = c.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}
