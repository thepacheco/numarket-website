/* Small toolkit for the isometric industry dioramas: rounded boxes, cylinders,
   a floating platform, trees, and a few shared vehicles. Units are meters-ish;
   the platform top sits at y = 0. */

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type Mode = "hero" | "leak" | "fixed";
export type Tone = "bad" | "good" | "plain";
export type LabelSpec = { key: string; text: string; tone?: Tone; at: THREE.Object3D };

export type Scene = {
  root: THREE.Group;
  /* Called every frame. t = seconds since start, dt = seconds since last frame. */
  update: (t: number, dt: number, mode: Mode) => void;
  /* Labels to show right now; the canvas keeps DOM nodes in sync by key. */
  labels: (mode: Mode) => LabelSpec[];
  view?: number; // world units visible vertically
};

export const P = {
  slab: 0xf3f7fa,
  slabSide: 0xe2eaf0,
  road: 0xcfd8df,
  line: 0xffffff,
  grass: 0xd4ecd9,
  white: 0xfbfcfd,
  wall: 0xeef3f6,
  roof: 0xd6e0e7,
  glass: 0x27455a,
  dark: 0x1e2830,
  steel: 0x9aa6af,
  navy: 0x22577a,
  teal: 0x38a3a5,
  green: 0x57cc99,
  deepGreen: 0x2e9e6b,
  red: 0xe0694f,
  amber: 0xf2b632,
  kraft: 0xd8a96b,
  pallet: 0xb88d58,
  concrete: 0xd9dee3,
  tree: 0x6fc48c,
  treeDark: 0x4fae74,
  trunk: 0x9b7653,
};

export class Kit {
  private mats = new Map<string, THREE.MeshStandardMaterial>();
  private geos: THREE.BufferGeometry[] = [];

  mat(color: number, o: { emissive?: number; ei?: number; opacity?: number; rough?: number; metal?: number; unique?: boolean } = {}) {
    const key = `${color}|${o.emissive ?? ""}|${o.ei ?? ""}|${o.opacity ?? ""}|${o.rough ?? ""}|${o.metal ?? ""}`;
    if (!o.unique && this.mats.has(key)) return this.mats.get(key)!;
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: o.rough ?? 0.78,
      metalness: o.metal ?? 0,
      emissive: o.emissive ?? 0x000000,
      emissiveIntensity: o.ei ?? 0,
      transparent: o.opacity !== undefined,
      opacity: o.opacity ?? 1,
    });
    if (!o.unique) this.mats.set(key, m);
    return m;
  }

  /* Rounded box whose BOTTOM sits at (x, y, z). */
  box(w: number, h: number, d: number, color: number | THREE.Material, x = 0, y = 0, z = 0, r = 0.06) {
    const rr = Math.max(0.001, Math.min(r, Math.min(w, h, d) / 2 - 0.001));
    const g = new RoundedBoxGeometry(w, h, d, 2, rr);
    this.geos.push(g);
    const m = new THREE.Mesh(g, typeof color === "number" ? this.mat(color) : color);
    m.position.set(x, y + h / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  /* Upright cylinder whose bottom sits at (x, y, z). */
  cyl(r: number, h: number, color: number | THREE.Material, x = 0, y = 0, z = 0, seg = 24, rTop?: number) {
    const g = new THREE.CylinderGeometry(rTop ?? r, r, h, seg);
    this.geos.push(g);
    const m = new THREE.Mesh(g, typeof color === "number" ? this.mat(color) : color);
    m.position.set(x, y + h / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  sphere(r: number, color: number | THREE.Material, x = 0, y = 0, z = 0) {
    const g = new THREE.SphereGeometry(r, 24, 16);
    this.geos.push(g);
    const m = new THREE.Mesh(g, typeof color === "number" ? this.mat(color) : color);
    m.position.set(x, y, z);
    m.castShadow = true;
    return m;
  }

  /* Floating slab the whole scene sits on. */
  platform(w: number, d: number) {
    const g = new THREE.Group();
    const top = this.box(w, 0.5, d, this.mat(P.slab), 0, -0.5, 0, 0.22);
    top.castShadow = false;
    g.add(top);
    const lip = this.box(w - 0.3, 0.3, d - 0.3, this.mat(P.slabSide), 0, -0.72, 0, 0.12);
    lip.castShadow = false;
    g.add(lip);
    return g;
  }

  /* Flat patch lying on the platform (roads, grass, pads). */
  patch(w: number, d: number, color: number, x = 0, z = 0, y = 0.005) {
    const m = this.box(w, 0.04, d, color, x, y - 0.02, z, 0.02);
    m.castShadow = false;
    return m;
  }

  tree(x: number, z: number, s = 1) {
    const g = new THREE.Group();
    g.add(this.cyl(0.07 * s, 0.35 * s, P.trunk, 0, 0, 0, 8));
    const c1 = this.cyl(0.36 * s, 0.7 * s, P.tree, 0, 0.28 * s, 0, 14, 0.001);
    const c2 = this.cyl(0.28 * s, 0.55 * s, P.treeDark, 0, 0.62 * s, 0, 14, 0.001);
    g.add(c1, c2);
    g.position.set(x, 0, z);
    return g;
  }

  wheel(x: number, z: number, r = 0.19, w = 0.16) {
    const g = new THREE.Group();
    const tire = this.cyl(r, w, P.dark, 0, -w / 2, 0, 20);
    const hub = this.cyl(r * 0.45, w + 0.01, P.steel, 0, -w / 2 - 0.005, 0, 14);
    g.add(tire, hub);
    g.rotation.x = Math.PI / 2;
    g.position.set(x, r, z);
    return g;
  }

  /* Cargo: a pallet with a stack of boxes on it. */
  cargo(x: number, y: number, z: number, color: number = P.kraft) {
    const g = new THREE.Group();
    g.add(this.box(0.62, 0.07, 0.66, P.pallet, 0, 0, 0, 0.01));
    g.add(this.box(0.56, 0.5, 0.6, color, 0, 0.07, 0, 0.04));
    g.add(this.box(0.57, 0.03, 0.08, 0xb98b4f, 0, 0.33, 0, 0.01));
    g.position.set(x, y, z);
    return g;
  }

  /* A conventional US tractor-trailer. Faces +x. Returns the cargo group so scenes can load/unload it. */
  semi(cab: number) {
    const g = new THREE.Group();
    const trailerWhite = this.mat(P.white);
    // chassis rails
    g.add(this.box(3.9, 0.1, 0.5, P.dark, -0.2, 0.26, 0, 0.02));
    // trailer: floor, roof, front wall, posts (open sides so the load is visible)
    g.add(this.box(2.5, 0.1, 0.84, 0x55616b, -0.85, 0.38, 0, 0.02));
    g.add(this.box(2.52, 0.09, 0.86, trailerWhite, -0.85, 1.36, 0, 0.03));
    g.add(this.box(0.08, 0.92, 0.84, trailerWhite, 0.36, 0.46, 0, 0.02));
    for (const px of [-2.06, -1.25, -0.45])
      for (const pz of [-0.39, 0.39]) g.add(this.box(0.06, 0.9, 0.06, trailerWhite, px, 0.47, pz, 0.01));
    g.add(this.box(2.5, 0.1, 0.86, cab, -0.85, 1.28, 0, 0.02)); // colored band under the roof
    g.add(this.box(0.04, 0.12, 0.7, P.red, -2.11, 0.4, 0, 0.01)); // tail lights bar
    // tractor
    const cabMat = this.mat(cab);
    g.add(this.box(0.62, 0.92, 0.8, cabMat, 1.0, 0.38, 0, 0.1)); // cab
    g.add(this.box(0.5, 0.17, 0.76, cabMat, 0.92, 1.28, 0, 0.07)); // roof fairing
    g.add(this.box(0.58, 0.5, 0.74, cabMat, 1.55, 0.38, 0, 0.1)); // hood
    g.add(this.box(0.04, 0.36, 0.68, P.glass, 1.32, 0.86, 0, 0.02)); // windshield
    g.add(this.box(0.3, 0.28, 0.82, P.glass, 1.02, 0.9, 0, 0.02)); // side windows
    g.add(this.box(0.04, 0.34, 0.5, 0x3a4550, 1.85, 0.44, 0, 0.02)); // grille
    for (const hz of [-0.28, 0.28]) g.add(this.box(0.03, 0.08, 0.12, 0xfff4d0, 1.86, 0.62, hz, 0.01));
    g.add(this.box(0.08, 0.1, 0.84, P.steel, 1.87, 0.3, 0, 0.02)); // bumper
    for (const ez of [-0.43, 0.43]) g.add(this.cyl(0.035, 1.0, P.steel, 0.62, 0.45, ez, 10));
    for (const tz of [-0.42, 0.42]) {
      const tank = this.cyl(0.1, 0.36, P.steel, 0, 0, 0, 16);
      tank.rotation.z = Math.PI / 2;
      tank.position.set(1.02, 0.3, tz);
      g.add(tank);
    }
    // wheels: steer, drive tandem, trailer tandem
    for (const wx of [1.58, 0.72, 0.38, -1.55, -1.9]) for (const wz of [-0.37, 0.37]) g.add(this.wheel(wx, wz));
    // load
    const load = new THREE.Group();
    for (const cx of [-1.72, -1.07, -0.42]) load.add(this.cargo(cx, 0.48, 0));
    g.add(load);
    return { g, load };
  }

  /* Delivery van. Faces +x. */
  van(color: number) {
    const g = new THREE.Group();
    g.add(this.box(1.35, 0.95, 0.8, P.white, -0.2, 0.26, 0, 0.12));
    g.add(this.box(0.5, 0.62, 0.78, P.white, 0.68, 0.26, 0, 0.14));
    g.add(this.box(1.36, 0.12, 0.82, color, -0.2, 0.55, 0, 0.03));
    g.add(this.box(0.04, 0.28, 0.64, P.glass, 0.92, 0.56, 0, 0.02));
    g.add(this.box(0.3, 0.24, 0.8, P.glass, 0.66, 0.58, 0, 0.03));
    for (const wx of [0.62, -0.6]) for (const wz of [-0.33, 0.33]) g.add(this.wheel(wx, wz, 0.16, 0.14));
    return g;
  }

  /* Service truck with a bucket boom. Faces +x. Returns the boom pivot. */
  bucketTruck(color: number) {
    const g = new THREE.Group();
    g.add(this.box(1.9, 0.1, 0.62, P.dark, 0, 0.22, 0, 0.02));
    g.add(this.box(0.56, 0.7, 0.72, color, 0.62, 0.3, 0, 0.1));
    g.add(this.box(0.04, 0.28, 0.6, P.glass, 0.9, 0.6, 0, 0.02));
    g.add(this.box(1.1, 0.42, 0.76, P.white, -0.38, 0.3, 0, 0.06));
    const pivot = new THREE.Group();
    pivot.position.set(-0.3, 0.8, 0);
    const arm = this.box(1.3, 0.1, 0.1, P.white, 0.65, -0.05, 0, 0.03);
    pivot.add(arm);
    const bucket = this.box(0.26, 0.24, 0.26, P.amber, 1.3, -0.1, 0, 0.04);
    pivot.add(bucket);
    g.add(pivot);
    for (const wx of [0.6, -0.55]) for (const wz of [-0.3, 0.3]) g.add(this.wheel(wx, wz, 0.16, 0.14));
    return { g, boom: pivot };
  }

  person(color: number, x = 0, y = 0, z = 0) {
    const g = new THREE.Group();
    g.add(this.box(0.28, 0.42, 0.2, color, 0, 0, 0, 0.1));
    g.add(this.sphere(0.11, 0xf1c9a5, 0, 0.55, 0));
    g.position.set(x, y, z);
    return g;
  }

  dispose() {
    this.geos.forEach((g) => g.dispose());
    this.mats.forEach((m) => m.dispose());
  }
}

/* An Object3D used only as a label anchor. */
export function anchor(parent: THREE.Object3D, x: number, y: number, z: number) {
  const o = new THREE.Object3D();
  o.position.set(x, y, z);
  parent.add(o);
  return o;
}

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const ease = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
