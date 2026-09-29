/* The eight industry dioramas. Each shows the business itself, the money leak
   (mode "leak"), and what changes once the data is clean (mode "fixed"). */

import * as THREE from "three";
import type { IndustrySlug } from "@/content/industries";
import { Kit, P, anchor, clamp01, ease, lerp, type LabelSpec, type Mode, type Scene } from "./kit";

const TAU = Math.PI * 2;

/* ---------------- shared bits ---------------- */

function stadiumShape(L: number, r: number) {
  const s = new THREE.Shape();
  s.moveTo(-L / 2, -r);
  s.lineTo(L / 2, -r);
  s.absarc(L / 2, 0, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-L / 2, r);
  s.absarc(-L / 2, 0, r, Math.PI / 2, (3 * Math.PI) / 2, false);
  return s;
}

function flat(shape: THREE.Shape, color: number, k: Kit, y = 0, depth = 0.04) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 40 });
  const m = new THREE.Mesh(g, k.mat(color));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  return m;
}

/* Point on a stadium loop. u in [0,1). Heading h is a rotation.y for a model facing +x. */
function stad(u: number, L: number, R: number) {
  const per = 2 * L + TAU * R;
  let d = (((u % 1) + 1) % 1) * per;
  if (d < L) return { x: -L / 2 + d, z: R, h: 0 };
  d -= L;
  if (d < Math.PI * R) {
    const a = Math.PI / 2 - d / R;
    return { x: L / 2 + R * Math.cos(a), z: R * Math.sin(a), h: Math.PI / 2 - a };
  }
  d -= Math.PI * R;
  if (d < L) return { x: L / 2 - d, z: -R, h: Math.PI };
  d -= L;
  const a = -Math.PI / 2 - d / R;
  return { x: -L / 2 + R * Math.cos(a), z: R * Math.sin(a), h: Math.PI / 2 - a };
}

/* A thin bar from a to b (wires, cables, tie lines). */
function bar(k: Kit, a: THREE.Vector3, b: THREE.Vector3, color: number, t = 0.025) {
  const len = a.distanceTo(b);
  const m = k.box(t, t, len, color, 0, 0, 0, 0.004);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.lookAt(b);
  m.castShadow = false;
  return m;
}

function gable(k: Kit, w: number, d: number, h: number, color: number, x: number, y: number, z: number) {
  const g = new THREE.CylinderGeometry(h, h, d, 3, 1);
  const m = new THREE.Mesh(g, k.mat(color));
  m.rotation.x = -Math.PI / 2; // ridge up
  m.scale.set(w / (h * Math.sqrt(3)), 1, 1);
  m.position.set(x, y + h / 2, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

const L = (key: string, text: string, at: THREE.Object3D, tone: LabelSpec["tone"] = "plain"): LabelSpec => ({ key, text, at, tone });

/* ---------------- logistics: a semi on a loop between warehouse and customer ---------------- */
function logistics(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(14.6, 9.6));
  const Ls = 4.2,
    R = 1.95,
    W = 1.3;
  const road = stadiumShape(Ls, R + W / 2);
  road.holes.push(stadiumShape(Ls, R - W / 2));
  root.add(flat(road, P.road, k));
  root.add(flat(stadiumShape(Ls, R - W / 2 - 0.12), P.grass, k, 0, 0.03));
  const per = 2 * Ls + TAU * R;
  for (let i = 0; i < Math.floor(per / 0.6); i++) {
    const p = stad(i / Math.floor(per / 0.6), Ls, R);
    const d = k.box(0.28, 0.01, 0.05, P.line, p.x, 0.04, p.z, 0.004);
    d.rotation.y = p.h;
    d.castShadow = false;
    root.add(d);
  }
  // warehouse (left)
  const wh = new THREE.Group();
  wh.position.set(-5.9, 0, 0);
  wh.add(k.box(2.0, 1.8, 3.6, P.wall, 0, 0, 0, 0.08));
  wh.add(k.box(2.2, 0.14, 3.8, P.roof, 0, 1.8, 0, 0.05));
  wh.add(k.box(2.02, 0.24, 3.62, accent, 0, 1.46, 0, 0.03));
  for (const dz of [-1.15, 0, 1.15]) {
    wh.add(k.box(0.06, 0.95, 0.74, 0x4b5a66, 1.0, 0, dz, 0.02));
    wh.add(k.box(0.24, 0.12, 0.8, P.concrete, 1.13, 0, dz, 0.02));
  }
  wh.add(k.cargo(-0.3, 0, 2.4), k.cargo(0.45, 0, 2.4), k.cargo(0.08, 0.57, 2.4));
  root.add(wh);
  // customer store (right)
  const st = new THREE.Group();
  st.position.set(5.8, 0, -0.3);
  st.add(k.box(1.9, 1.4, 2.8, P.white, 0, 0, 0, 0.08));
  st.add(k.box(2.0, 0.12, 2.9, P.roof, 0, 1.4, 0, 0.04));
  st.add(k.box(1.5, 0.62, 0.06, P.glass, 0, 0.22, 1.4, 0.02));
  st.add(k.box(1.8, 0.07, 0.5, P.teal, 0, 0.98, 1.62, 0.03));
  st.add(k.box(1.92, 0.2, 0.06, P.teal, 0, 1.12, 1.41, 0.02));
  st.add(k.box(0.06, 0.85, 0.7, 0x4b5a66, 0.95, 0, 0.3, 0.02));
  root.add(st);
  for (const [x, z, s] of [
    [-3.2, 3.9, 1],
    [3.4, 3.9, 0.9],
    [-3.6, -3.9, 0.9],
    [0.8, -4.0, 1],
    [6.4, -3.6, 0.8],
    [-0.8, 0.1, 0.8],
    [1.0, -0.3, 0.95],
  ])
    root.add(k.tree(x, z, s));
  const { g: truck, load } = k.semi(accent);
  truck.scale.setScalar(0.86);
  root.add(truck);
  const loadMat = k.mat(P.kraft, { unique: true });
  load.children.forEach((c) => c.children.forEach((m) => (m as THREE.Mesh).material === k.mat(P.kraft) && ((m as THREE.Mesh).material = loadMat)));
  const aWh = anchor(wh, 0, 2.3, 0);
  const aSt = anchor(st, 0, 1.9, 0);
  const aTr = anchor(truck, 0, 2.3, 0);
  let u = 0.06;
  let outbound = true;
  let sc = 1;
  const sCust = (Ls + (Math.PI * R) / 2) / per;
  const sWh = (2 * Ls + 1.5 * Math.PI * R) / per;
  const kraft = new THREE.Color(P.kraft);
  const booked = new THREE.Color(0x9fd8b8);
  return {
    root,
    update(t, dt, mode) {
      u = (u + dt * 0.042) % 1;
      const p = stad(u, Ls, R);
      truck.position.set(p.x, 0.04, p.z);
      truck.rotation.y = p.h;
      outbound = u < sCust || u >= sWh;
      const nearCust = Math.abs(u - sCust) < 0.025;
      const nearWh = Math.abs(u - sWh) < 0.025;
      let target = 1;
      if (mode === "leak") target = outbound ? 1 : 0;
      else if (nearCust || nearWh) target = 0.001;
      if (mode === "leak" && (nearCust || nearWh)) target = 0.001;
      sc += (target - sc) * Math.min(1, dt * 7);
      load.children.forEach((c) => c.scale.setScalar(Math.max(0.001, sc)));
      if (sc < 0.05) loadMat.color.copy(outbound || mode === "leak" ? kraft : booked);
    },
    labels(mode) {
      const out = [L("wh", "Warehouse", aWh), L("st", "Customer", aSt)];
      if (mode === "leak") out.push(outbound ? L("tr", "Loaded", aTr) : L("tr", "Driving back empty", aTr, "bad"));
      if (mode === "fixed") out.push(outbound ? L("tr", "Loaded", aTr) : L("tr", "Return load booked", aTr, "good"));
      return out;
    },
  };
}

/* ---------------- construction: a tower crane topping out a building, and the budget ---------------- */
function construction(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(14, 10));
  root.add(k.patch(8.6, 6.6, 0xeee2cf, -1.5, 0.3));
  // building under construction
  const B = new THREE.Group();
  B.position.set(-2.6, 0, 0.9);
  root.add(B);
  const FW = 3.4,
    FD = 2.8,
    FH = 0.8;
  const glass = k.mat(0x9cc3d6, { opacity: 0.6 });
  for (let f = 0; f < 4; f++) {
    B.add(k.box(FW, 0.14, FD, P.concrete, 0, f * FH, 0, 0.03));
    for (const cx of [-FW / 2 + 0.12, 0, FW / 2 - 0.12]) for (const cz of [-FD / 2 + 0.12, FD / 2 - 0.12]) B.add(k.box(0.14, FH - 0.14, 0.14, 0xbfc7ce, cx, f * FH + 0.14, cz, 0.02));
    if (f < 2) B.add(k.box(FW - 0.24, FH - 0.2, FD - 0.24, glass, 0, f * FH + 0.15, 0, 0.02));
  }
  const deckY = 4 * FH;
  B.add(k.box(FW, 0.14, FD, P.concrete, 0, deckY, 0, 0.03));
  const placed = k.box(1.3, 0.14, 0.22, 0xc4522f, 0.4, deckY + 0.14, 0.3, 0.02);
  B.add(placed);
  // beams waiting on the ground
  const stackAt = new THREE.Vector3(2.2, 0, 2.2);
  for (let i = 0; i < 3; i++) root.add(k.box(1.3, 0.14, 0.22, 0xc4522f, stackAt.x, i * 0.15, stackAt.z + (i % 2) * 0.05, 0.02));
  // site office + fence
  root.add(k.box(1.8, 0.8, 0.9, P.white, -5.4, 0, -3.5, 0.06), k.box(1.8, 0.12, 0.9, accent, -5.4, 0.8, -3.5, 0.03));
  for (let x = -5.6; x <= 2.8; x += 0.9) root.add(k.box(0.05, 0.4, 0.05, P.steel, x, 0, 3.8, 0.01));
  root.add(k.box(8.5, 0.04, 0.03, P.steel, -1.4, 0.34, 3.8, 0.01));
  // tower crane
  const crane = new THREE.Group();
  crane.position.set(0.9, 0, -1.6);
  root.add(crane);
  const H = 5.2,
    m = 0.36;
  crane.add(k.box(1.0, 0.3, 1.0, P.concrete, 0, 0, 0, 0.04));
  for (const cx of [-1, 1]) for (const cz of [-1, 1]) crane.add(k.box(0.05, H, 0.05, P.amber, (cx * m) / 2, 0.3, (cz * m) / 2, 0.01));
  for (let y = 0.7; y < H; y += 0.45) {
    crane.add(k.box(m + 0.04, 0.03, 0.03, P.amber, 0, y, -m / 2, 0.005), k.box(m + 0.04, 0.03, 0.03, P.amber, 0, y, m / 2, 0.005));
    crane.add(k.box(0.03, 0.03, m + 0.04, P.amber, -m / 2, y, 0, 0.005), k.box(0.03, 0.03, m + 0.04, P.amber, m / 2, y, 0, 0.005));
  }
  const slew = new THREE.Group();
  slew.position.set(0, H + 0.3, 0);
  crane.add(slew);
  slew.add(k.box(0.52, 0.3, 0.52, P.amber, 0, 0, 0, 0.04));
  slew.add(k.box(0.4, 0.36, 0.4, P.white, 0.2, -0.36, 0.42, 0.06), k.box(0.03, 0.2, 0.34, P.glass, 0.41, -0.26, 0.42, 0.01));
  slew.add(k.box(4.4, 0.22, 0.26, P.amber, 2.3, 0.3, 0, 0.03));
  slew.add(k.box(1.9, 0.22, 0.26, P.amber, -1.0, 0.3, 0, 0.03));
  slew.add(k.box(0.6, 0.5, 0.42, P.concrete, -1.6, 0.0, 0, 0.04));
  slew.add(k.box(0.12, 1.0, 0.12, P.amber, 0, 0.52, 0, 0.02));
  slew.add(bar(k, new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(4.4, 0.52, 0), P.steel, 0.02));
  slew.add(bar(k, new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(-1.9, 0.52, 0), P.steel, 0.02));
  const trolley = k.box(0.3, 0.12, 0.32, P.dark, 3, 0.18, 0, 0.02);
  slew.add(trolley);
  const cable = k.box(0.02, 1, 0.02, P.dark, 0, 0, 0, 0.004);
  cable.castShadow = false;
  slew.add(cable);
  const hook = new THREE.Group();
  hook.add(k.box(0.16, 0.16, 0.16, P.amber, 0, 0, 0, 0.03));
  const beam = k.box(1.3, 0.14, 0.22, 0xc4522f, 0, -0.16, 0, 0.02);
  hook.add(beam);
  slew.add(hook);
  // budget vs actual columns
  const bars = new THREE.Group();
  bars.position.set(4.6, 0, 0.2);
  root.add(bars);
  bars.add(k.box(1.6, 0.1, 3.4, P.white, 0, 0, -0.2, 0.05));
  bars.add(k.box(0.9, 2.6, 0.9, P.navy, 0, 0.1, -1.1, 0.08));
  const actMat = k.mat(P.deepGreen, { unique: true });
  const actPivot = new THREE.Group();
  actPivot.position.set(0, 0.1, 0.7);
  const act = k.box(0.9, 1, 0.9, actMat, 0, 0, 0, 0.08);
  actPivot.add(act);
  bars.add(actPivot);
  const line = k.box(1.4, 0.03, 3.2, k.mat(P.navy, { opacity: 0.3 }), 0, 2.69, -0.2, 0.01);
  line.castShadow = false;
  bars.add(line);
  const aBud = anchor(bars, 0, 3.05, -1.1);
  const aAct = anchor(actPivot, 0, 1, 0);
  const aTop = anchor(B, 0, deckY + 1.2, 0);
  const pick = Math.atan2(-(stackAt.z - crane.position.z), stackAt.x - crane.position.x);
  const drop = Math.atan2(-(B.position.z + 0.3 - crane.position.z), B.position.x + 0.4 - crane.position.x);
  const dPick = Math.hypot(stackAt.x - crane.position.x, stackAt.z - crane.position.z);
  const dDrop = Math.hypot(B.position.x + 0.4 - crane.position.x, B.position.z + 0.3 - crane.position.z);
  const hookTop = 5.0 - (H + 0.3);
  const hookPick = 0.72 - (H + 0.3);
  const hookDrop = deckY + 0.14 + 0.3 - (H + 0.3);
  let h = 1;
  let over = false;
  const red = new THREE.Color(P.red),
    good = new THREE.Color(P.deepGreen);
  let unwrap = drop < pick ? drop + TAU : drop;
  if (Math.abs(unwrap - pick) > Math.PI) unwrap -= TAU;
  return {
    root,
    update(t, dt, mode) {
      const c = t % 12;
      let ang = pick,
        dist = dPick,
        hy = hookTop,
        carrying = false;
      if (c < 1.5) {
        hy = lerp(hookTop, hookPick, ease(c / 1.5));
      } else if (c < 3) {
        hy = lerp(hookPick, hookTop, ease((c - 1.5) / 1.5));
        carrying = true;
      } else if (c < 6) {
        const e = ease((c - 3) / 3);
        ang = lerp(pick, unwrap, e);
        dist = lerp(dPick, dDrop, e);
        carrying = true;
      } else if (c < 7.5) {
        ang = unwrap;
        dist = dDrop;
        hy = lerp(hookTop, hookDrop, ease((c - 6) / 1.5));
        carrying = true;
      } else if (c < 9) {
        ang = unwrap;
        dist = dDrop;
        hy = lerp(hookDrop, hookTop, ease((c - 7.5) / 1.5));
      } else {
        const e = ease((c - 9) / 3);
        ang = lerp(unwrap, pick, e);
        dist = lerp(dDrop, dPick, e);
      }
      slew.rotation.y = ang;
      trolley.position.x = dist;
      hook.position.set(dist, hy, 0);
      cable.scale.y = Math.max(0.01, 0.18 - hy);
      cable.position.set(dist, hy + (0.18 - hy) / 2, 0);
      beam.visible = carrying;
      beam.rotation.y = -ang + drop;
      placed.visible = c >= 7.5 && c < 11.6;
      const target = mode === "leak" ? 0.8 + 2.6 * ease(((t % 14) - 0.3) / 3) : mode === "fixed" ? 2.35 : 2.1;
      h += (target - h) * Math.min(1, dt * 3);
      actPivot.scale.y = h;
      over = h > 2.62;
      actMat.color.lerp(over ? red : good, Math.min(1, dt * 6));
    },
    labels(mode) {
      const out = [L("bud", "Budget", aBud), L("act", "Actual cost", aAct, over ? "bad" : mode === "fixed" ? "good" : "plain")];
      out.push(L("top", mode === "hero" ? "Tower A · Level 5" : "Level 5 going up", aTop));
      return out;
    },
  };
}

/* ---------------- manufacturing: a line with a press; downtime stops it ---------------- */
function manufacturing(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(16, 10.5));
  root.add(k.patch(12.5, 1.9, 0xe4eaef, -0.2, 0.4));
  const z0 = 0.4,
    x0 = -4.9,
    x1 = 4.5,
    len = x1 - x0;
  for (let x = x0 + 0.4; x < x1; x += 1.3) for (const dz of [-0.38, 0.38]) root.add(k.box(0.08, 0.6, 0.08, 0x6b7782, x, 0, z0 + dz, 0.01));
  root.add(k.box(len, 0.14, 1.0, 0x55616c, (x0 + x1) / 2, 0.6, z0, 0.04));
  root.add(k.box(len, 0.03, 0.84, 0x2f3a44, (x0 + x1) / 2, 0.74, z0, 0.01));
  const slats: THREE.Mesh[] = [];
  for (let i = 0; i < 28; i++) {
    const s = k.box(0.05, 0.012, 0.8, 0x5d6975, 0, 0.77, z0, 0.004);
    s.castShadow = false;
    slats.push(s);
    root.add(s);
  }
  // input machine
  const cnc = new THREE.Group();
  cnc.position.set(-6.1, 0, z0);
  cnc.add(k.box(1.5, 1.8, 1.9, P.white, 0, 0, 0, 0.1));
  cnc.add(k.box(1.52, 0.3, 1.92, accent, 0, 1.5, 0, 0.05));
  cnc.add(k.box(0.8, 0.6, 0.04, P.glass, 0.1, 0.7, 0.96, 0.02));
  cnc.add(k.box(0.06, 0.5, 0.9, 0x3a4550, 0.76, 0.6, 0, 0.02));
  root.add(cnc);
  // press
  const pressX = -0.6;
  const press = new THREE.Group();
  press.position.set(pressX, 0, z0);
  for (const dz of [-0.62, 0.62]) press.add(k.box(0.22, 2.4, 0.22, accent, 0, 0, dz, 0.04));
  press.add(k.box(0.5, 0.4, 1.5, accent, 0, 2.3, 0, 0.06));
  const piston = k.box(0.56, 0.7, 0.66, 0xdfe5ea, 0, 0, 0, 0.05);
  press.add(piston);
  const beacon = k.mat(P.green, { emissive: P.green, ei: 0.9, unique: true });
  press.add(k.cyl(0.1, 0.24, beacon, 0, 2.7, 0, 16));
  root.add(press);
  root.add(k.person(0x3a6ea5, pressX + 0.3, 0, z0 + 1.35));
  // output pallet
  const outX = 5.7;
  root.add(k.box(1.3, 0.1, 1.3, P.pallet, outX, 0, z0, 0.02));
  const stack: THREE.Mesh[] = [];
  for (let i = 0; i < 9; i++) {
    const b = k.box(0.4, 0.4, 0.4, accent, outX - 0.42 + (i % 3) * 0.42, 0.1 + Math.floor(i / 3) * 0.42, z0 - 0.21 + 0, 0.05);
    b.visible = false;
    stack.push(b);
    root.add(b);
  }
  // racks at the back
  for (const rx of [-3.2, 0.2, 3.6]) {
    for (const dx of [-1.3, 1.3]) root.add(k.box(0.08, 2.0, 0.08, P.navy, rx + dx, 0, -3.2, 0.01), k.box(0.08, 2.0, 0.08, P.navy, rx + dx, 0, -2.4, 0.01));
    for (const y of [0.15, 0.95, 1.75]) {
      root.add(k.box(2.7, 0.06, 0.9, P.amber, rx, y, -2.8, 0.01));
      for (let j = 0; j < 3; j++) if ((j + y * 10) % 3 !== 1) root.add(k.box(0.7, 0.55, 0.65, P.kraft, rx - 0.85 + j * 0.85, y + 0.06, -2.8, 0.04));
    }
  }
  // parts on the belt
  const raw = k.mat(0xb9c2c9);
  const done = k.mat(accent);
  const parts: THREE.Mesh[] = [];
  for (let i = 0; i < 7; i++) {
    const p = k.box(0.42, 0.36, 0.42, raw, 0, 0.77, z0, 0.06);
    parts.push(p);
    root.add(p);
  }
  let pos = 0;
  let stacked = 0;
  let running = true;
  let lastLap = 0;
  const aPress = anchor(press, 0, 3.2, 0);
  const aOut = anchor(root, outX, 1.6, z0);
  const green = new THREE.Color(P.green),
    red = new THREE.Color(P.red);
  return {
    root,
    update(t, dt, mode) {
      running = mode !== "leak" || t % 7 < 4.2;
      const v = running ? 0.9 : 0;
      pos += v * dt;
      slats.forEach((s, i) => (s.position.x = x0 + 0.05 + ((i * (len / slats.length) + pos) % (len - 0.1))));
      const gap = len / parts.length;
      parts.forEach((p, i) => {
        const x = x0 + ((i * gap + pos) % len);
        p.position.x = x;
        p.material = x > pressX + 0.1 ? done : raw;
        p.scale.setScalar(x > x1 - 0.3 ? Math.max(0.01, (x1 - x) / 0.3) : x < x0 + 0.3 ? Math.max(0.01, (x - x0) / 0.3) : 1);
      });
      const lap = Math.floor(pos / gap);
      if (lap !== lastLap) {
        lastLap = lap;
        stacked = (stacked + 1) % 10;
        stack.forEach((b, i) => (b.visible = i < stacked));
      }
      const stroke = running ? Math.max(0, Math.sin(pos * 4.2)) : 0;
      piston.position.set(0, 1.52 + 0.45 * (1 - stroke), 0);
      const bc = running ? green : red;
      beacon.color.copy(bc);
      beacon.emissive.copy(bc);
      beacon.emissiveIntensity = running ? 0.8 : 0.6 + 0.6 * Math.abs(Math.sin(t * 6));
    },
    labels(mode) {
      const out = [L("out", "Finished parts", aOut)];
      if (mode === "leak") out.push(running ? L("pr", "Running", aPress) : L("pr", "Stopped · no cause logged", aPress, "bad"));
      else if (mode === "fixed") out.push(L("pr", "Top cause fixed · running", aPress, "good"));
      else out.push(L("pr", "Line 2 · Stamping", aPress));
      return out;
    },
  };
}

/* ---------------- food: trays to the van, extras to the bin ---------------- */
function food(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(16, 10.5));
  root.add(k.patch(13, 7.5, 0xf0e8ee, -0.3, 0.1));
  const z0 = -0.4;
  // oven
  const oven = new THREE.Group();
  oven.position.set(-5.8, 0, z0);
  oven.add(k.box(1.7, 1.6, 1.8, 0xc9d2d9, 0, 0, 0, 0.1));
  oven.add(k.box(0.05, 0.6, 1.2, k.mat(0xffa654, { emissive: 0xff8a3d, ei: 0.8 }), 0.86, 0.5, 0, 0.02));
  oven.add(k.box(1.72, 0.2, 1.82, accent, 0, 1.4, 0, 0.04));
  oven.add(k.cyl(0.14, 0.7, P.steel, -0.4, 1.6, -0.4, 14));
  root.add(oven);
  // belt to the junction and on to the van
  const xa = -4.95,
    xj = 1.4,
    xb = 3.2;
  root.add(k.box(xb - xa, 0.12, 0.9, 0x55616c, (xa + xb) / 2, 0.62, z0, 0.04));
  root.add(k.box(xb - xa, 0.03, 0.76, 0x6d7a86, (xa + xb) / 2, 0.74, z0, 0.01));
  for (let x = xa + 0.4; x < xb; x += 1.3) for (const dz of [-0.34, 0.34]) root.add(k.box(0.08, 0.62, 0.08, 0x6b7782, x, 0, z0 + dz, 0.01));
  // chute to the bin
  const chute = k.box(0.7, 0.05, 2.2, P.steel, xj, 0.45, z0 + 1.45, 0.02);
  chute.rotation.x = 0.28;
  root.add(chute);
  const binZ = z0 + 3.0;
  root.add(k.cyl(0.6, 0.6, 0x3d6b4f, xj, 0, binZ, 28), k.box(1.3, 0.08, 0.5, 0x2f5540, xj, 0.6, binZ + 0.62, 0.02));
  // prep tables + cooks
  for (const [x, z] of [
    [-3.2, -2.6],
    [-0.6, -2.6],
  ]) {
    root.add(k.box(1.8, 0.75, 0.8, 0xdfe5ea, x, 0, z, 0.04));
    root.add(k.person(P.white, x, 0, z - 0.75));
  }
  // van
  const van = k.van(accent);
  van.position.set(4.45, 0, z0);
  root.add(van);
  // trays
  const plate = k.mat(P.white);
  const meal = k.mat(0xe9b872);
  const trays = Array.from({ length: 10 }, () => {
    const g = new THREE.Group();
    g.add(k.box(0.72, 0.07, 0.56, plate, 0, 0, 0, 0.02));
    const dome = k.sphere(0.23, meal, 0, 0.07, 0);
    dome.scale.y = 0.55;
    g.add(dome);
    g.visible = false;
    root.add(g);
    return { g, born: -99, waste: false };
  });
  let n = 0;
  let next = 0;
  const aBin = anchor(root, xj, 1.6, binZ);
  const aVan = anchor(van, 0, 1.7, 0);
  const aOven = anchor(oven, 0, 2.5, 0);
  return {
    root,
    update(t, dt, mode) {
      const every = mode === "fixed" ? 1.35 : 0.95;
      if (t >= next) {
        const tr = trays[n % trays.length];
        tr.born = t;
        tr.waste = mode === "leak" && n % 3 === 1;
        tr.g.visible = true;
        n++;
        next = t + every;
      }
      trays.forEach((tr) => {
        const a = t - tr.born;
        const v = 1.35;
        const toJ = (xj - xa) / v;
        if (a < 0 || tr.born < 0) return;
        let x = xa + a * v,
          y = 0.78,
          z = z0,
          s = 1;
        if (tr.waste && a > toJ) {
          const b = a - toJ;
          x = xj;
          z = z0 + Math.min(1, b / 1.3) * 2.6;
          y = b < 1.3 ? lerp(0.78, 0.95, b / 1.3) : 0.95 - (b - 1.3) * 2.2;
          if (b > 1.6) s = 0;
        } else if (x > xb - 0.1) {
          s = Math.max(0, 1 - (x - xb + 0.1) / 0.4);
        }
        if (s <= 0) {
          tr.g.visible = false;
          tr.born = -99;
          return;
        }
        tr.g.position.set(x, y, z);
        tr.g.scale.setScalar(s);
      });
    },
    labels(mode) {
      const out = [L("van", "Out for delivery", aVan)];
      if (mode === "leak") out.push(L("bin", "Made, never eaten", aBin, "bad"), L("ov", "Cooking last week's count", aOven));
      else if (mode === "fixed") out.push(L("ov", "Cooking tomorrow's real demand", aOven, "good"));
      else out.push(L("ov", "Kitchen", aOven));
      return out;
    },
  };
}

/* ---------------- healthcare: claims fly from clinic to insurer ---------------- */
function healthcare(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(16, 10));
  for (let i = 0; i < 9; i++) root.add(k.patch(0.6, 0.9, 0xdfe6eb, -3.1 + i * 0.8, 1.9 - i * 0.07));
  // parking by the clinic
  root.add(k.patch(3.2, 2.0, 0xd8dee3, -5.0, 3.2));
  [0xc4522f, P.navy, 0xdfe5ea].forEach((c, i) => root.add(k.box(0.5, 0.34, 0.9, c, -6.0 + i * 0.9, 0.04, 3.2, 0.14), k.box(0.44, 0.2, 0.5, P.glass, -6.0 + i * 0.9, 0.38, 3.15, 0.08)));
  // clinic
  const cl = new THREE.Group();
  cl.position.set(-5.2, 0, 0.3);
  cl.add(k.box(2.8, 1.7, 3.0, P.white, 0, 0, 0, 0.1));
  cl.add(k.box(2.9, 0.14, 3.1, P.roof, 0, 1.7, 0, 0.05));
  cl.add(k.box(2.82, 0.22, 3.02, accent, 0, 1.36, 0, 0.03));
  cl.add(k.box(0.05, 0.8, 1.0, P.glass, 1.4, 0, 0, 0.02));
  cl.add(k.box(0.6, 0.6, 0.12, accent, 0.5, 1.84, 0.9, 0.06));
  cl.add(k.box(0.36, 0.1, 0.13, P.white, 0.5, 2.09, 0.9, 0.01), k.box(0.1, 0.36, 0.13, P.white, 0.5, 1.96, 0.9, 0.01));
  root.add(cl);
  // insurer
  const ins = new THREE.Group();
  ins.position.set(5.2, 0, -0.3);
  ins.add(k.box(3.0, 0.2, 3.0, P.concrete, 0, 0, 0, 0.04));
  ins.add(k.box(2.4, 1.9, 2.5, 0xe9eef2, 0.2, 0.2, 0, 0.06));
  for (const z of [-0.9, -0.3, 0.3, 0.9]) ins.add(k.cyl(0.11, 1.9, P.white, -1.2, 0.2, z, 16));
  ins.add(k.box(3.0, 0.24, 3.0, P.white, 0, 2.1, 0, 0.04));
  ins.add(gable(k, 3.0, 3.0, 0.5, P.roof, 0, 2.34, 0));
  root.add(ins);
  // check gate (fixed mode)
  const gate = new THREE.Group();
  gate.position.set(-2.3, 0, 0.1);
  const glow = k.mat(P.teal, { emissive: P.teal, ei: 0.5, unique: true });
  gate.add(k.box(0.18, 3.5, 0.18, glow, 0, 0, -0.9, 0.04), k.box(0.18, 3.5, 0.18, glow, 0, 0, 0.9, 0.04), k.box(0.22, 0.18, 2.0, glow, 0, 3.5, 0, 0.04));
  root.add(gate);
  for (const [x, z] of [
    [-6.6, 3.6],
    [-3.2, 3.8],
    [2.2, -3.6],
    [6.6, 3.4],
    [0, 3.7],
  ])
    root.add(k.tree(x, z, 0.9));
  // claims
  const from = new THREE.Vector3(-3.7, 1.5, 0.3);
  const to = new THREE.Vector3(3.8, 1.6, -0.3);
  const sheet = k.mat(P.white);
  const claims = Array.from({ length: 9 }, () => {
    const g = new THREE.Group();
    g.add(k.box(0.78, 0.04, 0.56, sheet, 0, 0, 0, 0.012));
    for (const lz of [0.02, 0.14]) g.add(k.box(0.5, 0.045, 0.05, 0xc9d2d9, -0.06, 0, lz, 0.005));
    const stripe = k.box(0.78, 0.05, 0.14, k.mat(P.navy, { unique: true }), 0, 0, -0.2, 0.01);
    g.add(stripe);
    g.visible = false;
    root.add(g);
    return { g, stripe: stripe.material as THREE.MeshStandardMaterial, born: -99, bad: false };
  });
  const cNavy = new THREE.Color(P.navy),
    cGood = new THREE.Color(P.deepGreen),
    cBad = new THREE.Color(P.red),
    cAmber = new THREE.Color(P.amber);
  let n = 0,
    next = 0;
  const aCl = anchor(cl, 0, 2.6, 0);
  const aIns = anchor(ins, 0, 3.2, 0);
  const aMid = anchor(root, 1.8, 4.2, -0.2);
  const aGate = anchor(gate, 0, 4.1, 0);
  const at = (p: number, hgt: number) => new THREE.Vector3(lerp(from.x, to.x, p), lerp(from.y, to.y, p) + Math.sin(p * Math.PI) * hgt, lerp(from.z, to.z, p));
  return {
    root,
    update(t, dt, mode) {
      gate.visible = mode === "fixed";
      glow.emissiveIntensity = 0.4 + 0.25 * Math.sin(t * 3);
      if (t >= next) {
        const c = claims[n % claims.length];
        c.born = t;
        c.bad = n % 4 === 1;
        c.g.visible = true;
        n++;
        next = t + 0.75;
      }
      claims.forEach((c) => {
        if (c.born < 0) return;
        const a = (t - c.born) / 3.2;
        const flawed = c.bad && mode !== "hero";
        const fixedHere = mode === "fixed" && a > 0.2;
        let p: THREE.Vector3;
        let col = cNavy;
        if (a <= 1) {
          p = at(a, 2.2);
          col = flawed && !fixedHere ? cAmber : cNavy;
          if (a > 0.92) col = flawed && mode === "leak" ? cBad : cGood;
        } else if (flawed && mode === "leak") {
          const b = (a - 1) * 1.6;
          p = at(1 - b, 1.1);
          col = cBad;
          if (b >= 1) {
            c.g.visible = false;
            c.born = -99;
            return;
          }
        } else {
          col = cGood;
          const b = (a - 1) * 4;
          p = to.clone();
          c.g.scale.setScalar(Math.max(0.01, 1 - b));
          if (b >= 1) {
            c.g.visible = false;
            c.born = -99;
            c.g.scale.setScalar(1);
            return;
          }
        }
        c.g.position.copy(p);
        c.g.rotation.y = Math.sin(a * 5) * 0.3;
        c.stripe.color.copy(col);
      });
    },
    labels(mode) {
      const out = [L("cl", "Clinic", aCl), L("ins", "Insurer", aIns)];
      if (mode === "leak") out.push(L("mid", "1 in 4 claims come back denied", aMid, "bad"));
      if (mode === "fixed") out.push(L("gate", "Checked before sending", aGate, "good"));
      return out;
    },
  };
}

/* ---------------- utilities: crews idle at the depot vs out on planned work ---------------- */
function utilities(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(17, 11));
  const roadZ = 2.9;
  root.add(k.patch(16.2, 1.1, P.road, 0, roadZ));
  for (let x = -7.5; x < 8; x += 0.8) root.add(k.box(0.34, 0.01, 0.05, P.line, x, 0.04, roadZ, 0.004));
  // depot
  const dp = new THREE.Group();
  dp.position.set(-5.7, 0, 0.2);
  dp.add(k.box(3.0, 1.5, 2.4, P.wall, 0, 0, 0, 0.08));
  dp.add(k.box(3.1, 0.14, 2.5, P.roof, 0, 1.5, 0, 0.05));
  dp.add(k.box(3.02, 0.22, 2.42, accent, 0, 1.2, 0, 0.03));
  for (const x of [-0.95, 0, 0.95]) dp.add(k.box(0.78, 0.95, 0.05, 0x4b5a66, x, 0, 1.21, 0.02));
  root.add(dp);
  // substation
  const sub = new THREE.Group();
  sub.position.set(-5.8, 0, -3.4);
  sub.add(k.box(2.6, 0.08, 1.6, P.concrete, 0, 0, 0, 0.02));
  for (const x of [-0.7, 0.2]) sub.add(k.box(0.7, 0.8, 0.7, 0x8e9aa4, x, 0.08, 0, 0.06), k.cyl(0.07, 0.35, P.white, x, 0.88, 0, 10));
  for (let x = -1.2; x <= 1.2; x += 0.4) sub.add(k.box(0.03, 0.5, 0.03, P.steel, x, 0.08, 0.8, 0.005));
  root.add(sub);
  // poles + wires
  const poleZ = 1.5;
  const poleX = [-2.6, 0.2, 3.0, 5.8];
  const tops: THREE.Vector3[] = [];
  poleX.forEach((x) => {
    root.add(k.cyl(0.07, 3.3, 0x8b6b4a, x, 0, poleZ, 10));
    root.add(k.box(0.08, 0.08, 1.0, 0x6d5238, x, 3.0, poleZ, 0.01));
    tops.push(new THREE.Vector3(x, 3.12, poleZ));
  });
  for (let i = 0; i < tops.length - 1; i++)
    for (const dz of [-0.42, 0, 0.42]) root.add(bar(k, tops[i].clone().add(new THREE.Vector3(0, 0, dz)), tops[i + 1].clone().add(new THREE.Vector3(0, 0, dz)), 0x3a4550, 0.02));
  root.add(k.cyl(0.18, 0.45, 0x8e9aa4, poleX[2] + 0.2, 2.3, poleZ, 14));
  // homes
  const lit = k.mat(0xffd98a, { emissive: 0xffc861, ei: 0.55 });
  [
    [0.8, -2.8],
    [3.0, -3.0],
    [5.4, -2.7],
  ].forEach(([x, z], i) => {
    root.add(k.box(1.5, 0.95, 1.3, [P.white, 0xf3ece2, 0xe8f0f5][i], x, 0, z, 0.06));
    root.add(gable(k, 1.6, 1.4, 0.45, [0xc4522f, P.navy, 0x6c7a86][i], x, 0.95, z));
    root.add(k.box(0.3, 0.3, 0.04, lit, x - 0.35, 0.4, z + 0.66, 0.02), k.box(0.3, 0.3, 0.04, lit, x + 0.35, 0.4, z + 0.66, 0.02));
  });
  for (const [x, z] of [
    [-2.0, -3.9],
    [7.2, -1.2],
    [-7.4, 4.3],
    [1.8, 4.3],
  ])
    root.add(k.tree(x, z, 0.9));
  // work orders waiting on two poles
  const markers = [0, 2].map((i) => {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), k.mat(P.amber, { emissive: P.amber, ei: 0.4, unique: true }));
    m.position.set(poleX[i], 3.9, poleZ);
    root.add(m);
    return m;
  });
  // crews
  const trucks = [0, 1, 2].map((i) => {
    const bt = k.bucketTruck(accent);
    bt.g.scale.setScalar(0.85);
    bt.g.position.set(-7.0 + i * 1.6, 0, roadZ);
    root.add(bt.g);
    return { ...bt, home: -7.0 + i * 1.6 };
  });
  /* the front truck goes farthest so nobody drives through anybody */
  const jobs: Record<number, { x: number; delay: number }> = { 2: { x: poleX[2] - 0.9, delay: 0 }, 1: { x: poleX[0] - 0.9, delay: 0.6 } };
  let modeAt = 0,
    lastMode: Mode | null = null;
  const aDp = anchor(dp, 0, 2.2, 0);
  const aMk = anchor(root, poleX[2], 4.5, poleZ);
  const amber = new THREE.Color(P.amber),
    done = new THREE.Color(P.green);
  return {
    root,
    update(t, dt, mode) {
      if (mode !== lastMode) {
        lastMode = mode;
        modeAt = t;
      }
      const a = t - modeAt;
      const go = mode !== "leak";
      trucks.forEach((tr, i) => {
        const job = go ? jobs[i] : undefined;
        const e = job ? ease((a - job.delay) / 3) : 1;
        tr.g.position.x = job ? lerp(tr.home, job.x, e) : tr.home;
        const working = !!job && e >= 1;
        const want = working ? 0.75 + Math.sin(t * 0.8 + i) * 0.05 : 0;
        tr.boom.rotation.z += (want - tr.boom.rotation.z) * Math.min(1, dt * 2);
      });
      markers.forEach((m, i) => {
        const fixedNow = go && a > 3.8 + i * 0.4;
        const mm = m.material as THREE.MeshStandardMaterial;
        mm.color.copy(fixedNow ? done : amber);
        mm.emissive.copy(fixedNow ? done : amber);
        m.rotation.y = t * 1.5;
        m.position.y = 3.9 + Math.sin(t * 2 + i) * 0.08;
      });
    },
    labels(mode) {
      if (mode === "leak") return [L("dp", "3 crews idle · paid by the hour", aDp, "bad"), L("mk", "Planned work waiting", aMk)];
      if (mode === "fixed") return [L("dp", "Depot", aDp), L("mk", "Idle time filled with planned work", aMk, "good")];
      return [L("dp", "Crew depot", aDp)];
    },
  };
}

/* ---------------- professional services: hours travel to the invoice ---------------- */
function professional(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(16, 10.5));
  root.add(k.patch(7.4, 6.8, 0xe9e6f3, -3.6, 0.2));
  const desks = [
    [-5.3, -1.6],
    [-5.3, 1.3],
    [-2.3, -1.6],
    [-2.3, 1.3],
  ];
  desks.forEach(([x, z], i) => {
    root.add(k.box(1.4, 0.7, 0.8, P.white, x, 0, z, 0.04));
    root.add(k.box(0.62, 0.4, 0.05, P.dark, x, 0.82, z - 0.25, 0.02), k.box(0.08, 0.14, 0.08, P.steel, x, 0.7, z - 0.25, 0.01));
    root.add(k.box(0.5, 0.45, 0.5, 0x9aa7b3, x, 0, z + 0.7, 0.08));
    root.add(k.person([accent, 0x3a6ea5, 0x2e9e6b, 0xc4522f][i], x, 0.2, z + 0.7));
  });
  // rail to invoicing
  const railY = 1.35,
    rz = -0.15,
    r0 = -0.6,
    r1 = 4.3,
    g0 = 1.5,
    g1 = 2.3;
  const railMat = k.mat(0xc9d2d9);
  root.add(k.box(g0 - r0, 0.08, 0.36, railMat, (r0 + g0) / 2, railY - 0.08, rz, 0.02));
  root.add(k.box(r1 - g1, 0.08, 0.36, railMat, (g1 + r1) / 2, railY - 0.08, rz, 0.02));
  const bridge = k.box(g1 - g0, 0.08, 0.36, k.mat(P.green), (g0 + g1) / 2, railY - 0.08, rz, 0.02);
  root.add(bridge);
  for (const x of [r0 + 0.2, g0 - 0.1, g1 + 0.1, r1 - 0.2]) root.add(k.box(0.08, railY - 0.08, 0.08, P.steel, x, 0, rz, 0.01));
  // unbilled bin
  root.add(k.box(1.1, 0.5, 1.0, 0x8e9aa4, (g0 + g1) / 2, 0, rz, 0.05));
  // invoicing
  const inv = new THREE.Group();
  inv.position.set(5.4, 0, rz);
  inv.add(k.box(1.5, 1.4, 1.3, P.white, 0, 0, 0, 0.1));
  inv.add(k.box(1.52, 0.24, 1.32, accent, 0, 1.12, 0, 0.04));
  inv.add(k.box(0.05, 0.1, 0.8, P.dark, -0.76, 1.25, 0, 0.02));
  inv.add(k.box(0.9, 0.05, 0.7, P.steel, 0, 0, 1.0, 0.02));
  root.add(inv);
  const papers: THREE.Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const p = k.box(0.62, 0.02, 0.46, P.white, 5.4, 0.06 + i * 0.03, rz + 1.0, 0.005);
    p.visible = false;
    papers.push(p);
    root.add(p);
  }
  root.add(k.tree(6.6, 3.9, 0.9), k.tree(-6.8, 3.9, 0.8), k.tree(3.2, -3.9, 1));
  const blockMat = k.mat(accent);
  const blocks = Array.from({ length: 14 }, () => {
    const m = k.box(0.24, 0.24, 0.24, blockMat, 0, 0, 0, 0.04);
    m.visible = false;
    root.add(m);
    return { m, born: -99, desk: 0, fall: false };
  });
  let n = 0,
    next = 0,
    billed = 0;
  const aBin = anchor(root, (g0 + g1) / 2, 1.0, rz);
  const aInv = anchor(inv, 0, 2.0, 0);
  const aTeam = anchor(root, -3.8, 1.8, 0);
  return {
    root,
    update(t, dt, mode) {
      bridge.visible = mode !== "leak";
      if (t >= next) {
        const b = blocks[n % blocks.length];
        b.born = t;
        b.desk = n % 4;
        b.fall = mode === "leak" && n % 3 === 1;
        b.m.visible = true;
        n++;
        next = t + 0.75;
      }
      blocks.forEach((b) => {
        if (b.born < 0) return;
        const a = t - b.born;
        const [dx, dz] = desks[b.desk];
        let x: number,
          y: number,
          z: number,
          s = 1;
        if (a < 0.5) {
          x = dx;
          z = dz;
          y = lerp(0.8, 1.6, ease(a / 0.5));
        } else if (a < 1.8) {
          const e = ease((a - 0.5) / 1.3);
          x = lerp(dx, r0, e);
          z = lerp(dz, rz, e);
          y = 1.6 + Math.sin(e * Math.PI) * 0.4 - e * 0.13;
        } else {
          const c = a - 1.8;
          x = r0 + c * 1.5;
          z = rz;
          y = railY + 0.12;
          if (b.fall && x > (g0 + g1) / 2 - 0.2) {
            const fx = (g0 + g1) / 2 - 0.2;
            const ft = (x - fx) / 1.5;
            x = fx + ft * 0.5;
            y = railY + 0.12 - 4.9 * ft * ft;
            if (y < 0.3) s = 0;
          } else if (x > r1) {
            s = Math.max(0, 1 - (x - r1) / 0.4);
            if (s === 0) {
              billed = (billed + 1) % 7;
              papers.forEach((p, i) => (p.visible = i < billed));
            }
          }
        }
        if (s <= 0) {
          b.m.visible = false;
          b.born = -99;
          return;
        }
        b.m.position.set(x, y, z);
        b.m.scale.setScalar(s);
      });
    },
    labels(mode) {
      const out = [L("team", "Hours worked", aTeam), L("inv", "Invoice", aInv, mode === "fixed" ? "good" : "plain")];
      if (mode === "leak") out.push(L("bin", "Never billed", aBin, "bad"));
      if (mode === "fixed") out.push(L("bin", "Caught before month-end", aBin, "good"));
      return out;
    },
  };
}

/* ---------------- real estate: lit units are leased, dark ones are empty ---------------- */
function realEstate(k: Kit, accent: number): Scene {
  const root = new THREE.Group();
  root.add(k.platform(16, 11));
  root.add(k.patch(15.4, 1.0, P.road, 0, 4.2));
  root.add(k.patch(4.2, 3.2, 0xd8dee3, 4.8, 1.8));
  const lit = k.mat(0xffd98a, { emissive: 0xffc861, ei: 0.6 });
  const dark = k.mat(0x33475a);
  const units: THREE.Mesh[] = [];
  const tower = (x: number, z: number, w: number, d: number, floors: number, wall: number) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const fh = 0.72;
    g.add(k.box(w, floors * fh + 0.2, d, wall, 0, 0, 0, 0.08));
    g.add(k.box(w + 0.1, 0.14, d + 0.1, P.roof, 0, floors * fh + 0.2, 0, 0.04));
    g.add(k.box(w * 0.4, 0.4, d * 0.4, 0xc9d2d9, -w * 0.2, floors * fh + 0.34, -d * 0.2, 0.04));
    const cols = Math.round(w / 0.62);
    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const u1 = k.box(0.36, 0.42, 0.04, lit, -w / 2 + (w / cols) * (c + 0.5), 0.3 + f * fh, d / 2 + 0.01, 0.02);
        const u2 = k.box(0.04, 0.42, 0.36, lit, w / 2 + 0.01, 0.3 + f * fh, -d / 2 + (d / cols) * (c + 0.5), 0.02);
        u1.castShadow = u2.castShadow = false;
        g.add(u1, u2);
        units.push(u1, u2);
      }
    }
    root.add(g);
    return g;
  };
  const tA = tower(-3.4, -0.8, 2.8, 2.8, 6, P.wall);
  tower(0.6, 0.3, 2.2, 2.2, 4, 0xf3ece2);
  // for-lease sign
  const sign = new THREE.Group();
  sign.position.set(-0.9, 0, 3.0);
  sign.add(k.box(0.06, 1.0, 0.06, P.steel, -0.4, 0, 0, 0.01), k.box(0.06, 1.0, 0.06, P.steel, 0.4, 0, 0, 0.01), k.box(1.1, 0.5, 0.06, accent, 0, 0.75, 0, 0.03));
  root.add(sign);
  // parking + cars
  const carCols = [0xc4522f, P.navy, 0xdfe5ea, 0x2e9e6b];
  for (let i = 0; i < 4; i++) {
    const c = k.box(0.5, 0.34, 0.9, carCols[i], 3.4 + i * 0.95, 0.04, 1.6, 0.14);
    root.add(c, k.box(0.44, 0.2, 0.5, P.glass, 3.4 + i * 0.95, 0.38, 1.55, 0.08));
  }
  const mover = k.box(0.9, 0.36, 0.5, P.white, 0, 0.04, 4.0, 0.14);
  root.add(mover, k.box(0.5, 0.2, 0.46, P.glass, 0, 0.4, 4.0, 0.08));
  const moverTop = root.children[root.children.length - 1];
  for (const [x, z] of [
    [-6.8, 3.2],
    [-6.6, -3.9],
    [2.8, -3.8],
    [6.8, -2.4],
    [-1.5, -4.2],
  ])
    root.add(k.tree(x, z, 1));
  // which units are empty (stable pick)
  const vacant = units.map((_, i) => (i * 37) % 11 === 3 || (i * 53) % 17 === 5).map((v, i) => v && i % 2 === 0);
  const vacantIdx = vacant.map((v, i) => (v ? i : -1)).filter((i) => i >= 0);
  let modeAt = 0,
    lastMode: Mode | null = null;
  const aTower = anchor(tA, 0, 5.2, 0);
  const aSign = anchor(sign, 0, 1.6, 0);
  return {
    root,
    update(t, dt, mode) {
      if (mode !== lastMode) {
        lastMode = mode;
        modeAt = t;
      }
      const a = t - modeAt;
      vacantIdx.forEach((ui, j) => {
        const on = mode === "hero" ? j % 4 !== 0 : mode === "fixed" ? a > 0.6 + j * 0.45 : false;
        units[ui].material = on ? lit : dark;
      });
      sign.visible = mode !== "fixed" || a < 0.6 + vacantIdx.length * 0.45;
      const mx = -7 + ((t * 1.4) % 14);
      mover.position.x = mx;
      moverTop.position.x = mx;
    },
    labels(mode) {
      const n = vacantIdx.length;
      if (mode === "leak") return [L("tw", `${n} units empty this month`, aTower, "bad"), L("sg", "For lease", aSign)];
      if (mode === "fixed") return [L("tw", "Renewals started 90 days out", aTower, "good")];
      return [L("tw", "Peachtree Lofts", aTower)];
    },
  };
}

export const builders: Record<IndustrySlug, (k: Kit, accent: number) => Scene> = {
  logistics,
  construction,
  manufacturing,
  "food-production": food,
  healthcare,
  utilities,
  "professional-services": professional,
  "real-estate": realEstate,
};

export const accents: Record<IndustrySlug, number> = {
  construction: 0xb77a12,
  manufacturing: 0x4f5fcf,
  "food-production": 0xc0406f,
  healthcare: 0x157f7a,
  utilities: 0x2a78c2,
  "professional-services": 0x7250cc,
  logistics: 0xc45a22,
  "real-estate": 0x3f8a35,
};

export { clamp01 };
