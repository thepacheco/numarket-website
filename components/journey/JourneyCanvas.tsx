"use client";

/* ============================================================
   The Data Journey — one WebGL scene driven by scroll.
   progress 0 → 1 moves through seven stages:
   0 Chaos · 1 Pull · 2 Clean · 3 Secure · 4 See · 5 Act · 6 Own
   The scene only renders while on screen and pauses otherwise.
   ============================================================ */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { panelTextures, tileTexture } from "./panels";

const STAGES = 7;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const smooth = (t: number) => t * t * (3 - 2 * t);
/* progress within stage s (0..1), with an optional per-item delay */
const stageT = (p: number, s: number, delay = 0, span = 0.85) => clamp((p * STAGES - s - delay) / span);

const CHAOS = new THREE.Color("#e07a5f");
const CLEAN = new THREE.Color("#57cc99");

type Cam = { pos: THREE.Vector3; look: THREE.Vector3 };
const camKeys: Cam[] = [
  { pos: new THREE.Vector3(0, 1.2, 15), look: new THREE.Vector3(0, 0.6, 0) },
  { pos: new THREE.Vector3(0, 3.2, 12.5), look: new THREE.Vector3(0, 1.8, 0) },
  { pos: new THREE.Vector3(0, 5.2, 9.5), look: new THREE.Vector3(0, 1.4, 0) },
  { pos: new THREE.Vector3(0, 3.0, 10), look: new THREE.Vector3(0, -0.6, 0) },
  { pos: new THREE.Vector3(0, 1.2, 12), look: new THREE.Vector3(0, 0.2, 0) },
  { pos: new THREE.Vector3(-0.9, 1.9, 8.4), look: new THREE.Vector3(-2.1, 1.85, 0.6) },
  { pos: new THREE.Vector3(0, 2.2, 13.5), look: new THREE.Vector3(0, 1.2, 0) },
];

export default function JourneyCanvas({ progress, onReady }: { progress: React.MutableRefObject<number>; onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const small = window.innerWidth < 768;
    const COUNT = small ? 70 : 180;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf2f7f9, 18, 34);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd6e4ea, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(5, 10, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fe8c0, 0.8);
    rim.position.set(-8, 4, -6);
    scene.add(rim);

    /* ---------- ground glow ---------- */
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
      grd.addColorStop(0, "rgba(87,204,153,0.55)");
      grd.addColorStop(1, "rgba(87,204,153,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    })();
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, opacity: 0 }));
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -2.25;
    scene.add(glow);

    /* ---------- tiles (instanced) ---------- */
    const tGeo = new RoundedBoxGeometry(0.9, 0.6, 0.07, 3, 0.05);
    const tMat = new THREE.MeshStandardMaterial({ map: tileTexture(), roughness: 0.5, metalness: 0.02 });
    const tiles = new THREE.InstancedMesh(tGeo, tMat, COUNT);
    tiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(tiles);

    const rnd = (() => {
      let s = 7;
      return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    })();
    type T = {
      start: THREE.Vector3;
      rot: THREE.Euler;
      phase: number;
      d: number;
      ring: THREE.Vector3;
      line: THREE.Vector3;
      slot: THREE.Vector3;
      dup: boolean;
    };
    const data: T[] = [];
    for (let i = 0; i < COUNT; i++) {
      const dup = i > 0 && rnd() < 0.14;
      const prev = data[i - 1];
      const start = dup
        ? prev.start.clone().add(new THREE.Vector3(0.16, -0.12, 0.06))
        : new THREE.Vector3((rnd() - 0.5) * (small ? 10 : 20), (rnd() - 0.4) * 9, (rnd() - 0.6) * 10);
      const rot = dup ? new THREE.Euler(prev.rot.x + 0.1, prev.rot.y, prev.rot.z + 0.12) : new THREE.Euler((rnd() - 0.5) * 2.2, (rnd() - 0.5) * 2.2, (rnd() - 0.5) * 2.2);
      const a = rnd() * Math.PI * 2;
      const ring = new THREE.Vector3(Math.cos(a) * 2.3, 2.4, Math.sin(a) * 2.3);
      const cols = Math.ceil(Math.sqrt(COUNT * 1.5));
      const rows = Math.ceil(COUNT / cols);
      const line = new THREE.Vector3(((i % cols) - (cols - 1) / 2) * 0.62, 0.9, (Math.floor(i / cols) - (rows - 1) / 2) * 0.46);
      const layer = Math.floor((i / COUNT) * 9);
      const sa = i * 2.399;
      const sr = 0.35 + (i % 4) * 0.28;
      const slot = new THREE.Vector3(Math.cos(sa) * sr, -2.05 + layer * 0.19, Math.sin(sa) * sr);
      data.push({ start, rot, phase: rnd() * Math.PI * 2, d: rnd(), ring, line, slot, dup });
    }

    /* ---------- filter ring ---------- */
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x38a3a5, emissive: 0x38a3a5, emissiveIntensity: 0.6, transparent: true, opacity: 0 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.05, 16, 160), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2.4;
    scene.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.015, 8, 160), ringMat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 2.4;
    scene.add(ring2);

    /* ---------- database core ---------- */
    const core = new THREE.Group();
    core.position.y = -1;
    scene.add(core);
    const shellMat = new THREE.MeshStandardMaterial({ color: 0x38a3a5, transparent: true, opacity: 0, roughness: 0.15, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false });
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.75, 2.3, 72, 1, true), shellMat);
    core.add(shell);
    const fillMat = new THREE.MeshStandardMaterial({ color: 0x22577a, roughness: 0.35, metalness: 0.15, emissive: 0x0b3a4f, emissiveIntensity: 0.4 });
    const fill = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.62, 1, 72), fillMat);
    fill.position.y = -1.15;
    fill.scale.y = 0.001;
    core.add(fill);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x80ed99, emissive: 0x57cc99, emissiveIntensity: 0.9, transparent: true, opacity: 0 });
    const cap = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.035, 12, 120), capMat);
    cap.rotation.x = Math.PI / 2;
    cap.position.y = 1.15;
    core.add(cap);
    const cap2 = cap.clone();
    cap2.position.y = -1.15;
    core.add(cap2);

    /* hex shield */
    const shieldMat = new THREE.MeshBasicMaterial({ color: 0x57cc99, wireframe: true, transparent: true, opacity: 0 });
    const shield = new THREE.Mesh(new THREE.IcosahedronGeometry(2.9, 1), shieldMat);
    shield.position.y = -0.9;
    scene.add(shield);

    /* ---------- panels ---------- */
    const font = getComputedStyle(document.body).fontFamily || "sans-serif";
    const tx = panelTextures(font);
    const pGeo = new THREE.PlaneGeometry(2.6, 1.706);
    const mk = (map: THREE.Texture) => new THREE.MeshBasicMaterial({ map, transparent: true, opacity: 0, side: THREE.FrontSide, toneMapped: false, depthTest: false });
    const panelDefs = [
      { front: tx.dashboard, back: tx.action, to: new THREE.Vector3(-2.1, 1.85, 0.6) },
      { front: tx.form, to: new THREE.Vector3(2.6, 1.75, 0.6) },
      { front: tx.ask, to: new THREE.Vector3(-1.8, -1.35, 1.6) },
      { front: tx.alert, to: new THREE.Vector3(2.6, -1.35, 1.6) },
    ];
    const panels = panelDefs.map((pd) => {
      const g = new THREE.Group();
      const f = new THREE.Mesh(pGeo, mk(pd.front));
      f.renderOrder = 10;
      g.add(f);
      let b: THREE.Mesh | null = null;
      if (pd.back) {
        b = new THREE.Mesh(pGeo, mk(pd.back));
        b.rotation.y = Math.PI;
        b.renderOrder = 10;
        g.add(b);
      }
      g.visible = false;
      scene.add(g);
      return { g, f, b, to: pd.to };
    });

    /* ---------- key ---------- */
    const keyG = new THREE.Group();
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x57cc99, emissive: 0x2e9e6b, emissiveIntensity: 0.5, metalness: 0.4, roughness: 0.3, transparent: true, opacity: 0 });
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.14, 20, 60), keyMat);
    bow.position.x = -0.9;
    keyG.add(bow);
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 0.2), keyMat);
    shaft.position.x = 0.3;
    keyG.add(shaft);
    [0.75, 0.95].forEach((x, i) => {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.14, i ? 0.42 : 0.3, 0.2), keyMat);
      tooth.position.set(x, -0.2 - (i ? 0.06 : 0), 0);
      keyG.add(tooth);
    });
    keyG.visible = false;
    scene.add(keyG);

    /* ---------- loop ---------- */
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();
    const col = new THREE.Color();
    const flatQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
    const tmpQ = new THREE.Quaternion();
    const camPos = camKeys[0].pos.clone();
    const camLook = camKeys[0].look.clone();
    const bez = (a: THREE.Vector3, c: THREE.Vector3, b: THREE.Vector3, t: number, out: THREE.Vector3) => {
      const u = 1 - t;
      return out.set(u * u * a.x + 2 * u * t * c.x + t * t * b.x, u * u * a.y + 2 * u * t * c.y + t * t * b.y, u * u * a.z + 2 * u * t * c.z + t * t * b.z);
    };
    const ctrl = new THREE.Vector3();
    const from = new THREE.Vector3();
    const eul = new THREE.Euler();
    let p = progress.current;
    let running = false;
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 1 ? 52 : 38;
      if (w >= 900) camera.setViewOffset(w * 1.42, h, 0, 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const time = (performance.now() - t0) / 1000;
      p += (progress.current - p) * 0.08;
      if ((window as unknown as { __jSnap?: boolean }).__jSnap) p = progress.current;

      /* camera */
      const cs = clamp(p * (STAGES - 1), 0, STAGES - 1);
      const ci = Math.min(STAGES - 2, Math.floor(cs));
      const ct = smooth(cs - ci);
      camPos.lerpVectors(camKeys[ci].pos, camKeys[ci + 1].pos, ct);
      camLook.lerpVectors(camKeys[ci].look, camKeys[ci + 1].look, ct);
      if (camera.aspect < 1) camPos.z *= 1.25;
      camera.position.copy(camPos);
      camera.position.x += Math.sin(time * 0.15) * 0.25;
      camera.lookAt(camLook);

      /* tiles */
      const pull = stageT(p, 1);
      const cleanG = stageT(p, 2);
      const secure = stageT(p, 3);
      for (let i = 0; i < COUNT; i++) {
        const d = data[i];
        const u = ease(stageT(p, 1, d.d * 0.15));
        const v = ease(stageT(p, 2, d.d * 0.15));
        const w = ease(stageT(p, 3, d.d * 0.15));
        // chaos float
        pos.copy(d.start);
        pos.y += Math.sin(time * 0.6 + d.phase) * 0.18 * (1 - u);
        pos.x += Math.cos(time * 0.4 + d.phase) * 0.1 * (1 - u);
        if (u > 0) {
          ctrl.set(d.start.x * 0.35, Math.max(d.start.y, d.ring.y) + 3, d.start.z * 0.35);
          from.copy(pos);
          bez(from, ctrl, d.ring, u, pos);
        }
        if (v > 0) pos.lerp(d.line, v);
        if (w > 0) pos.lerp(d.slot, w);
        // rotation: tumbling → flat
        eul.set(d.rot.x + Math.sin(time * 0.3 + d.phase) * 0.2 * (1 - u), d.rot.y + time * 0.1 * (1 - u), d.rot.z);
        tmpQ.setFromEuler(eul);
        q.copy(tmpQ).slerp(flatQ, clamp(v * 1.2));
        // scale: duplicates merge away during clean; everything shrinks into the core
        let s = (1 - 0.38 * v) * (1 - 0.25 * w);
        if (d.dup) s *= 1 - smooth(clamp(v * 1.6));
        scl.set(s, s, s);
        m4.compose(pos, q, scl);
        tiles.setMatrixAt(i, m4);
        col.copy(CHAOS).lerp(CLEAN, smooth(clamp((v - 0.05) * 2.2)));
        tiles.setColorAt(i, col);
      }
      tiles.instanceMatrix.needsUpdate = true;
      if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;

      /* ring: shows during pull + clean */
      const ringVis = clamp(pull * 3) * (1 - clamp((cleanG - 0.7) * 3));
      ringMat.opacity = ringVis * 0.95;
      ring.rotation.z = time * 0.3;
      ring2.rotation.z = -time * 0.2;
      ring.scale.setScalar(1 + Math.sin(time * 2) * 0.01);

      /* core fills during secure */
      const see = stageT(p, 4);
      const act = stageT(p, 5);
      const own = stageT(p, 6);
      shellMat.opacity = clamp(cleanG * 2) * 0.22 + secure * 0.12;
      fill.visible = secure > 0.01;
      fill.scale.y = Math.max(0.001, secure * 2.1);
      fill.position.y = -1.15 + (secure * 2.1) / 2;
      capMat.opacity = clamp(secure * 2);
      glow.material.opacity = clamp(cleanG * 1.5) * 0.9;
      shieldMat.opacity = clamp((secure - 0.3) * 2) * (1 - clamp(see * 1.5)) * 0.55;
      shield.scale.setScalar(0.55 + 0.45 * ease(clamp((secure - 0.2) * 1.4)));
      shield.rotation.y = time * 0.15;
      shield.rotation.x = time * 0.05;
      core.rotation.y = time * 0.1;

      /* panels unfold during see */
      panels.forEach((pn, i) => {
        const k = ease(clamp(see * 1.4 - i * 0.12));
        pn.g.visible = k > 0.001;
        pn.g.position.set(pn.to.x * k * (camera.aspect < 1 ? 0.72 : 1), -0.6 + (pn.to.y + 0.6) * k + Math.sin(time * 0.8 + i) * 0.05 * k, pn.to.z * k);
        pn.g.scale.setScalar(0.25 + 0.75 * k);
        const faceCam = Math.atan2(camera.position.x - pn.g.position.x, camera.position.z - pn.g.position.z);
        let ry = faceCam * 0.6 + (1 - k) * (i % 2 ? -1 : 1) * 1.2;
        const fade = (1 - (i === 0 ? 0 : clamp(act * 1.5) * 0.6)) * (1 - own * (i === 0 ? 0.55 : 0.85));
        if (i === 0) ry += ease(clamp(act * 1.3)) * Math.PI;
        pn.g.rotation.y = ry;
        (pn.f.material as THREE.MeshBasicMaterial).opacity = k * fade;
        if (pn.b) (pn.b.material as THREE.MeshBasicMaterial).opacity = k * fade;
      });

      /* key */
      const kk = ease(own);
      keyG.visible = kk > 0.001;
      keyMat.opacity = kk;
      keyG.position.set(0, 1.2 + kk * 1.4 + Math.sin(time) * 0.08, 3.2);
      keyG.rotation.set(0.15, Math.sin(time * 0.7) * 0.6, -0.25);
      keyG.scale.setScalar(0.3 + kk * 0.85);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { rootMargin: "100px" }
    );
    io.observe(host);
    const onVis = () => (document.hidden ? stop() : inView && start());
    document.addEventListener("visibilitychange", onVis);
    renderer.render(scene, camera);
    onReady?.();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => {
          (x as THREE.MeshBasicMaterial).map?.dispose();
          x.dispose();
        });
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [progress, onReady]);

  return <div ref={hostRef} className="j-canvas" aria-hidden="true" />;
}
