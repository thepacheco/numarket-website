"use client";

/* Renders one isometric industry diorama with live labels. Pauses off screen,
   and draws a single still frame when the visitor prefers reduced motion. */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { IndustrySlug } from "@/content/industries";
import { Kit, type LabelSpec, type Mode } from "./kit";
import { accents, builders } from "./scenes";

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 8, 64, 64, 64);
  grd.addColorStop(0, "rgba(11,31,46,0.22)");
  grd.addColorStop(1, "rgba(11,31,46,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function IsoCanvas({ slug, mode, onReady }: { slug: IndustrySlug; mode: Mode; onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  const kick = useRef<() => void>(() => {});
  const readyRef = useRef(onReady);
  modeRef.current = mode;
  readyRef.current = onReady;

  useEffect(() => {
    kick.current();
  }, [mode]);

  useEffect(() => {
    const host = hostRef.current!;
    const layer = layerRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const kit = new Kit();
    const built = builders[slug](kit, accents[slug]);
    scene.add(built.root);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9e3ea, 1.35));
    const sun = new THREE.DirectionalLight(0xffffff, 1.75);
    sun.position.set(-5, 14, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 40 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 3;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xe8f4ff, 0.45);
    fill.position.set(8, 6, -4);
    scene.add(fill);

    const shadowTex = shadowTexture();
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, 20), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    scene.add(floor);

    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    const dir = new THREE.Vector3(1, 0.86, 1).normalize();
    cam.position.copy(dir.clone().multiplyScalar(60));
    cam.lookAt(0, 0, 0);
    cam.updateMatrixWorld();

    /* Fit the whole diorama in view, whatever the box's shape. */
    const box = new THREE.Box3().setFromObject(built.root);
    const corners = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => new THREE.Vector3(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y + 0.6 : box.min.y, i & 4 ? box.max.z : box.min.z));
    const view = corners.map((c) => c.clone().applyMatrix4(cam.matrixWorldInverse));
    const minX = Math.min(...view.map((v) => v.x)),
      maxX = Math.max(...view.map((v) => v.x)),
      minY = Math.min(...view.map((v) => v.y)),
      maxY = Math.max(...view.map((v) => v.y));
    let W = 1,
      H = 1;
    const fit = () => {
      W = host.clientWidth || 1;
      H = host.clientHeight || 1;
      renderer.setSize(W, H, false);
      const pad = 1.03;
      let w = (maxX - minX) * pad,
        h = (maxY - minY) * pad;
      const cx = (minX + maxX) / 2,
        cy = (minY + maxY) / 2;
      if (w / h > W / H) h = w / (W / H);
      else w = h * (W / H);
      Object.assign(cam, { left: cx - w / 2, right: cx + w / 2, top: cy + h / 2, bottom: cy - h / 2 });
      cam.updateProjectionMatrix();
    };
    fit();

    /* Labels: plain DOM, positioned from 3D anchors every frame. */
    const els = new Map<string, HTMLDivElement>();
    const v = new THREE.Vector3();
    const syncLabels = (specs: LabelSpec[]) => {
      const seen = new Set<string>();
      for (const s of specs) {
        let el = els.get(s.key);
        if (!el) {
          el = document.createElement("div");
          el.className = "iso-label";
          layer.appendChild(el);
          els.set(s.key, el);
        }
        if (el.dataset.text !== s.text) {
          el.textContent = s.text;
          el.dataset.text = s.text;
        }
        const tone = s.tone ?? "plain";
        if (el.dataset.tone !== tone) el.dataset.tone = tone;
        v.setFromMatrixPosition(s.at.matrixWorld).project(cam);
        el.style.transform = `translate(${((v.x + 1) / 2) * W}px, ${((1 - v.y) / 2) * H}px) translate(-50%, -100%)`;
        el.classList.add("on");
        seen.add(s.key);
      }
      els.forEach((el, k) => !seen.has(k) && el.classList.remove("on"));
    };

    let t = 0;
    let last = performance.now();
    const draw = () => {
      renderer.render(scene, cam);
      syncLabels(built.labels(modeRef.current));
    };
    const step = (dt: number) => {
      t += dt;
      built.update(t, dt, modeRef.current);
    };

    let raf = 0;
    let running = false;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      draw();
    };
    const still = () => {
      for (let i = 0; i < 160; i++) step(0.05);
      draw();
    };

    if (reduced) {
      still();
      kick.current = still;
    } else {
      step(0.016);
      draw();
    }
    readyRef.current?.();

    const ro = new ResizeObserver(() => {
      fit();
      if (!running) draw();
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      if (reduced) return;
      if (e.isIntersecting && !running) {
        running = true;
        last = performance.now();
        frame();
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      kit.dispose();
      shadowTex.dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
      els.forEach((el) => el.remove());
    };
  }, [slug]);

  return (
    <div className="iso-canvas" ref={hostRef} aria-hidden="true">
      <div className="iso-labels" ref={layerRef} />
    </div>
  );
}
