"use client";

/* Floating low-poly shapes in brand colors. Follows the pointer and the scroll a little.
   Shapes stay near the edges so text stays readable. Pauses when off screen. */

import { useEffect, useRef } from "react";
import * as THREE from "three";

const palette = [0x22577a, 0x38a3a5, 0x57cc99, 0x80ed99, 0x6c5dd3, 0xc7f9cc];

export default function GeoCanvas({ density = 12, side = "both" }: { density?: number; side?: "both" | "right" }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current!;
    const small = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    cam.position.z = 18;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe0e8, 1.5));
    const dl = new THREE.DirectionalLight(0xffffff, 1.8);
    dl.position.set(4, 8, 6);
    scene.add(dl);

    const geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.28, 12, 32),
      new THREE.BoxGeometry(1.3, 1.3, 1.3),
      new THREE.TetrahedronGeometry(1.1, 0),
      new THREE.DodecahedronGeometry(0.95, 0),
    ];
    let seed = 11;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const n = small ? Math.ceil(density / 2) : density;
    const items = Array.from({ length: n }, (_, i) => {
      const wire = i % 4 === 3;
      const mat = wire
        ? new THREE.MeshBasicMaterial({ color: palette[i % palette.length], wireframe: true, transparent: true, opacity: 0.55 })
        : new THREE.MeshStandardMaterial({ color: palette[i % palette.length], flatShading: true, roughness: 0.45, metalness: 0.05, transparent: true, opacity: 0.92 });
      const m = new THREE.Mesh(geos[i % geos.length], mat);
      const onRight = side === "right" || i % 2 === 0;
      const x = (onRight ? 1 : -1) * (5 + rnd() * 6);
      const y = (rnd() - 0.5) * 9;
      const z = -rnd() * 8;
      const s = 0.45 + rnd() * 0.9;
      m.position.set(x, y, z);
      m.scale.setScalar(s);
      scene.add(m);
      return { m, base: m.position.clone(), rs: new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(0.6), ph: rnd() * 6 };
    });

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      cam.aspect = w / Math.max(1, h);
      cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const ptr = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      ptr.x = e.clientX / window.innerWidth - 0.5;
      ptr.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = false;
    const t0 = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = (performance.now() - t0) / 1000;
      cur.x += (ptr.x - cur.x) * 0.05;
      cur.y += (ptr.y - cur.y) * 0.05;
      const rect = el.getBoundingClientRect();
      const scrollK = (rect.top / window.innerHeight) * 1.5;
      items.forEach((it, i) => {
        it.m.rotation.x += it.rs.x * 0.01;
        it.m.rotation.y += it.rs.y * 0.01;
        it.m.position.y = it.base.y + Math.sin(t * 0.5 + it.ph) * 0.35 + scrollK * (0.4 + (i % 3) * 0.25);
        it.m.position.x = it.base.x + cur.x * (1 + (i % 3) * 0.6);
      });
      cam.position.x = cur.x * 1.2;
      cam.position.y = -cur.y * 0.8;
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        frame();
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    requestAnimationFrame(() => el.parentElement?.classList.add("on"));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      geos.forEach((g) => g.dispose());
      items.forEach((it) => (it.m.material as THREE.Material).dispose());
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [density, side]);
  return <div ref={host} style={{ position: "absolute", inset: 0 }} />;
}
