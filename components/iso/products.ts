/* Isometric product illustrations, built with the same kit as the industry
   scenes. Rendered once to images (see app/render and scripts/render-art.mjs). */

import * as THREE from "three";
import { Kit, P } from "./kit";

export type ArtKind = "foundation" | "workspace" | "insight" | "engineering";

const FONT = () => getComputedStyle(document.body).fontFamily || "sans-serif";

/* A flat canvas-drawn surface (screen, card) laid on the +z face of a box. */
function face(w: number, h: number, draw: (g: CanvasRenderingContext2D, W: number, H: number) => void, px = 512) {
  const c = document.createElement("canvas");
  c.width = px;
  c.height = Math.round((px * h) / w);
  const g = c.getContext("2d")!;
  draw(g, c.width, c.height);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  return m;
}

function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  g.fillStyle = fill;
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
  g.fill();
}

function tube(k: Kit, pts: [number, number, number][], color: number, r = 0.07) {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, r, 12, false), k.mat(color));
  m.castShadow = true;
  return { m, curve };
}

/* database: stacked disks */
function dbStack(k: Kit, x: number, z: number, cols: number[], r = 1.25) {
  const g = new THREE.Group();
  cols.forEach((c, i) => {
    g.add(k.cyl(r, 0.46, c, 0, i * 0.56, 0, 48));
    g.add(k.cyl(r * 0.98, 0.04, 0xffffff, 0, i * 0.56 + 0.46, 0, 48));
  });
  g.position.set(x, 0, z);
  return g;
}

function foundation(k: Kit) {
  const root = new THREE.Group();
  root.add(k.platform(9, 9));
  const blues = [0x1d4a68, 0x2a6a91, 0x3b86b0];
  root.add(dbStack(k, 0.6, -0.4, blues, 1.35));
  // lock plate on top
  root.add(k.box(0.9, 0.12, 0.9, 0xffffff, 0.6, 1.62, -0.4, 0.2));
  root.add(k.box(0.36, 0.34, 0.1, P.green, 0.6, 1.74, -0.4, 0.05));
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.04, 10, 24, Math.PI), k.mat(P.green));
  shackle.position.set(0.6, 2.08, -0.4);
  root.add(shackle);
  // sources
  const sheet = new THREE.Group();
  for (let i = 0; i < 3; i++) sheet.add(k.box(1.1, 0.07, 1.4, 0xffffff, 0, i * 0.1, 0, 0.03), k.box(1.1, 0.075, 0.26, 0x2e9e6b, 0, i * 0.1, -0.57, 0.02));
  sheet.position.set(-2.7, 0, 2.0);
  sheet.rotation.y = 0.25;
  root.add(sheet);
  const server = new THREE.Group();
  server.add(k.box(0.9, 1.4, 0.9, 0xdfe5ea, 0, 0, 0, 0.08));
  for (let i = 0; i < 4; i++) server.add(k.box(0.7, 0.05, 0.02, 0x8e9aa4, 0, 0.3 + i * 0.25, 0.46, 0.01), k.box(0.06, 0.06, 0.02, P.green, 0.28, 0.3 + i * 0.25, 0.47, 0.01));
  server.position.set(-3.0, 0, -2.2);
  root.add(server);
  const inv = new THREE.Group();
  for (let i = 0; i < 4; i++) inv.add(k.box(1.0, 0.07, 1.3, 0xffffff, 0, i * 0.1, 0, 0.03), k.box(1.0, 0.075, 0.24, 0x22577a, 0, i * 0.1, -0.53, 0.02));
  inv.position.set(2.9, 0, 2.5);
  inv.rotation.y = -0.3;
  root.add(inv);
  // pipes with clean tiles riding them
  const pipes = [
    tube(k, [[-2.5, 0.25, 1.6], [-1.4, 0.25, 1.2], [-0.3, 0.3, 0.5]], 0x7fd1c3),
    tube(k, [[-2.6, 0.6, -1.9], [-1.5, 0.45, -1.2], [-0.5, 0.35, -0.6]], 0x7fd1c3),
    tube(k, [[2.5, 0.2, 2.2], [1.8, 0.25, 1.4], [1.3, 0.3, 0.7]], 0x7fd1c3),
  ];
  pipes.forEach((p) => {
    root.add(p.m);
    [0.35, 0.7].forEach((u) => {
      const q = p.curve.getPointAt(u);
      root.add(k.box(0.26, 0.2, 0.26, P.green, q.x, q.y + 0.02, q.z, 0.05));
    });
  });
  return root;
}

function workspace(k: Kit) {
  const root = new THREE.Group();
  root.add(k.platform(7.6, 6.4));
  const teal = 0x2a8f91;
  const font = FONT();
  // monitor
  const mon = new THREE.Group();
  mon.add(k.box(0.9, 0.08, 0.6, 0xc9d2d9, 0, 0, 0, 0.04));
  mon.add(k.box(0.14, 0.9, 0.14, 0xc9d2d9, 0, 0.08, 0, 0.04));
  mon.add(k.box(4.0, 2.5, 0.14, P.dark, 0, 0.9, 0, 0.1));
  const scr = face(3.8, 2.3, (g, W, H) => {
    rr(g, 0, 0, W, H, 18, "#f7fafc");
    g.fillStyle = "#0b1f2e";
    g.font = `700 ${H * 0.075}px ${font}`;
    g.fillText("Dashboard · live", W * 0.05, H * 0.13);
    [["Spent", "$7.88M"], ["Over budget", "2 jobs"], ["Open RFIs", "11"]].forEach(([l, v], i) => {
      const x = W * 0.05 + i * W * 0.31;
      rr(g, x, H * 0.2, W * 0.28, H * 0.22, 12, "#ffffff");
      g.fillStyle = "#5c6f81";
      g.font = `600 ${H * 0.045}px ${font}`;
      g.fillText(l, x + W * 0.02, H * 0.28);
      g.fillStyle = i === 1 ? "#b93b22" : "#0b1f2e";
      g.font = `700 ${H * 0.08}px ${font}`;
      g.fillText(v, x + W * 0.02, H * 0.38);
    });
    const bars = [0.45, 0.62, 0.52, 0.8, 0.68, 0.9, 0.74];
    bars.forEach((b, i) => {
      const bw = W * 0.09;
      const x = W * 0.06 + i * W * 0.128;
      const h = H * 0.42 * b;
      rr(g, x, H * 0.92 - h, bw, h, 6, i === 5 ? "#e07a5f" : "#2a8f91");
    });
  });
  scr.position.set(0, 2.15, 0.075);
  mon.add(scr);
  mon.position.set(-0.4, 0, -1.0);
  mon.rotation.y = 0.35;
  root.add(mon);
  // phone with a form
  const ph = new THREE.Group();
  ph.add(k.box(0.95, 1.8, 0.1, P.dark, 0, 0, 0, 0.12));
  const pscr = face(0.85, 1.66, (g, W, H) => {
    rr(g, 0, 0, W, H, 24, "#ffffff");
    g.fillStyle = "#0b1f2e";
    g.font = `700 ${W * 0.085}px ${font}`;
    g.fillText("Update job", W * 0.1, H * 0.1);
    ["Job", "Cost to date", "% complete"].forEach((l, i) => {
      g.strokeStyle = "#d6e0e7";
      g.lineWidth = 4;
      g.strokeRect(W * 0.1, H * (0.18 + i * 0.17), W * 0.8, H * 0.11);
      g.fillStyle = "#5c6f81";
      g.font = `600 ${W * 0.06}px ${font}`;
      g.fillText(l, W * 0.15, H * (0.25 + i * 0.17));
    });
    rr(g, W * 0.1, H * 0.74, W * 0.8, H * 0.1, 14, "#2a8f91");
    g.fillStyle = "#fff";
    g.font = `700 ${W * 0.07}px ${font}`;
    g.fillText("Save", W * 0.4, H * 0.805);
  }, 256);
  pscr.position.set(0, 0.9, 0.055);
  ph.add(pscr);
  ph.position.set(2.1, 0.12, 1.3);
  ph.rotation.set(-0.1, 0.55, 0);
  root.add(ph);
  const dock = k.box(1.2, 0.12, 0.6, 0xc9d2d9, 2.1, 0, 1.42, 0.05);
  dock.rotation.y = 0.55;
  root.add(dock);
  // chat bubbles
  const b1 = face(2.6, 0.5, (g, W, H) => {
    rr(g, 0, 0, W, H, H / 2, "#ffffff");
    g.fillStyle = "#0b1f2e";
    g.font = `600 ${H * 0.36}px ${font}`;
    g.fillText("Which jobs are over budget?", W * 0.06, H * 0.64);
  });
  b1.position.set(-2.3, 2.5, 1.4);
  root.add(b1);
  const b2 = face(2.2, 0.5, (g, W, H) => {
    rr(g, 0, 0, W, H, H / 2, "#2a8f91");
    g.fillStyle = "#ffffff";
    g.font = `700 ${H * 0.38}px ${font}`;
    g.fillText("2 jobs · $1.10M over", W * 0.08, H * 0.64);
  });
  b2.position.set(-1.8, 1.85, 1.9);
  root.add(b2);
  [b1, b2].forEach((b) => (b.rotation.y = Math.PI / 4));
  root.add(k.box(0.5, 0.4, 0.5, teal, -3.0, 0, 2.5, 0.1), k.box(0.4, 0.7, 0.4, 0x7fd1c3, -2.45, 0, 2.75, 0.1));
  return root;
}

function insight(k: Kit) {
  const root = new THREE.Group();
  root.add(k.platform(7.6, 6.6));
  const font = FONT();
  // desk + analyst
  root.add(k.box(2.4, 0.8, 1.1, 0xffffff, -0.6, 0, 1.0, 0.06));
  root.add(k.box(1.1, 0.06, 0.75, 0xc9d2d9, -0.6, 0.8, 0.95, 0.03), k.box(1.1, 0.7, 0.05, P.dark, -0.6, 0.86, 0.6, 0.03));
  root.add(k.box(0.6, 0.5, 0.6, 0x9aa7b3, -0.6, 0, 2.0, 0.1));
  root.add(k.person(0x2e9e6b, -0.6, 0.25, 1.95));
  // review board
  const board = new THREE.Group();
  board.add(k.box(0.12, 2.6, 0.12, 0xc9d2d9, -1.2, 0, 0, 0.04), k.box(0.12, 2.6, 0.12, 0xc9d2d9, 1.2, 0, 0, 0.04));
  board.add(k.box(3.0, 1.9, 0.1, 0xffffff, 0, 1.1, 0, 0.06));
  const chart = face(2.8, 1.7, (g, W, H) => {
    rr(g, 0, 0, W, H, 14, "#ffffff");
    g.fillStyle = "#0b1f2e";
    g.font = `700 ${H * 0.1}px ${font}`;
    g.fillText("What changed this month", W * 0.05, H * 0.15);
    g.strokeStyle = "#2e9e6b";
    g.lineWidth = 8;
    g.beginPath();
    [0.8, 0.72, 0.75, 0.6, 0.55, 0.4, 0.3].forEach((v, i) => {
      const x = W * 0.06 + i * W * 0.145,
        y = H * v;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    });
    g.stroke();
    g.fillStyle = "#e07a5f";
    g.beginPath();
    g.arc(W * 0.06 + 3 * W * 0.145, H * 0.6, 14, 0, Math.PI * 2);
    g.fill();
  });
  chart.position.set(0, 2.05, 0.056);
  board.add(chart);
  board.position.set(-0.9, 0, -1.9);
  board.rotation.y = 0.45;
  root.add(board);
  // action items, floating
  const items = [
    ["Review change orders", "PM team · Friday"],
    ["Book backhauls", "Dispatch · 2 weeks"],
    ["Add 6 per-diem shifts", "Nurse manager · Mon"],
  ];
  items.forEach(([t, s], i) => {
    const card = face(2.9, 0.72, (g, W, H) => {
      rr(g, 0, 0, W, H, 20, "#ffffff");
      g.fillStyle = "#2e9e6b";
      g.beginPath();
      g.arc(H * 0.5, H * 0.5, H * 0.26, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "#fff";
      g.lineWidth = 7;
      g.beginPath();
      g.moveTo(H * 0.38, H * 0.5);
      g.lineTo(H * 0.47, H * 0.6);
      g.lineTo(H * 0.64, H * 0.4);
      g.stroke();
      g.fillStyle = "#0b1f2e";
      g.font = `700 ${H * 0.24}px ${font}`;
      g.fillText(t, H * 0.95, H * 0.45);
      g.fillStyle = "#5c6f81";
      g.font = `600 ${H * 0.19}px ${font}`;
      g.fillText(s, H * 0.95, H * 0.74);
    });
    card.position.set(2.3 + i * 0.1, 1.0 + i * 0.85, 1.7 - i * 0.1);
    card.rotation.set(-0.12, Math.PI / 4, 0);
    card.castShadow = true;
    root.add(card);
  });
  return root;
}

function engineering(k: Kit) {
  const root = new THREE.Group();
  root.add(k.platform(10, 7.5));
  // old server rack
  const rack = new THREE.Group();
  rack.add(k.box(1.4, 2.6, 1.3, 0xa5b0b9, 0, 0, 0, 0.06));
  for (let i = 0; i < 7; i++) {
    rack.add(k.box(1.1, 0.22, 0.03, 0x7c8893, 0, 0.3 + i * 0.3, 0.66, 0.02));
    rack.add(k.box(0.07, 0.07, 0.03, i % 3 === 0 ? 0xf2b632 : 0x57cc99, 0.42, 0.37 + i * 0.3, 0.68, 0.01));
  }
  rack.position.set(-3.4, 0, -0.4);
  root.add(rack);
  // conveyor bridge with records moving across
  root.add(k.box(4.2, 0.12, 0.8, 0x55616c, -0.2, 0.9, 0.1, 0.04));
  for (const x of [-1.9, 1.6]) root.add(k.box(0.12, 0.9, 0.7, 0x6b7782, x, 0, 0.1, 0.02));
  const recs = [0xa5b0b9, 0xa5b0b9, 0x9d91f0, 0x6c5dd3];
  recs.forEach((c, i) => root.add(k.box(0.44, 0.34, 0.44, c, -1.6 + i * 1.05, 1.02, 0.1, 0.06)));
  // check gate
  const glow = k.mat(0x6c5dd3, { emissive: 0x6c5dd3, ei: 0.35 });
  root.add(k.box(0.12, 1.9, 0.12, glow, 0.35, 0.9, -0.45, 0.03), k.box(0.12, 1.9, 0.12, glow, 0.35, 0.9, 0.65, 0.03), k.box(0.16, 0.14, 1.26, glow, 0.35, 2.8, 0.1, 0.03));
  // new database
  root.add(dbStack(k, 3.2, 0.0, [0x4a3cb0, 0x6c5dd3, 0x8f82ea], 1.15));
  const ok = face(0.8, 0.8, (g, W, H) => {
    g.fillStyle = "#2e9e6b";
    g.beginPath();
    g.arc(W / 2, H / 2, W * 0.48, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "#fff";
    g.lineWidth = W * 0.09;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(W * 0.3, H * 0.52);
    g.lineTo(W * 0.45, H * 0.66);
    g.lineTo(W * 0.7, H * 0.36);
    g.stroke();
  }, 256);
  ok.position.set(3.2, 2.2, 0);
  ok.rotation.y = Math.PI / 4;
  root.add(ok);
  return root;
}

export const productBuilders: Record<ArtKind, (k: Kit) => THREE.Group> = { foundation, workspace, insight, engineering };
