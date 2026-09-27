"use client";

/* 3D shells around the database core. Each shell matches a ring button
   in SecureVault; the selected one glows. Renders only while on screen. */

import { useEffect, useRef } from "react";
import * as THREE from "three";

const colors = [0x6c5dd3, 0x2e9e6b, 0x2a8f91, 0x22577a];

export default function VaultCanvas({ active }: { active: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const host = hostRef.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    cam.position.z = 5;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfe0e8, 1.6));
    const dl = new THREE.DirectionalLight(0xffffff, 1.6);
    dl.position.set(2, 3, 4);
    scene.add(dl);

    const shells = colors.map((c, i) => {
      const r = (1 - 0.18 * i) * 0.93;
      const g = new THREE.Group();
      const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.3 }));
      const skin = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.985, 48, 32),
        new THREE.MeshStandardMaterial({ color: c, transparent: true, opacity: 0.05, roughness: 0.3, depthWrite: false })
      );
      g.add(wire, skin);
      scene.add(g);
      return { g, wire, skin };
    });
    const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), new THREE.MeshStandardMaterial({ color: 0x0b1f2e, emissive: 0x2e9e6b, emissiveIntensity: 0.35, metalness: 0.3, roughness: 0.35 }));
    scene.add(core);

    const resize = () => {
      const s = host.clientWidth;
      renderer.setSize(s, s, false);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let raf = 0;
    let running = false;
    const t0 = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = (performance.now() - t0) / 1000;
      shells.forEach((sh, i) => {
        const on = activeRef.current === i;
        const wm = sh.wire.material as THREE.MeshBasicMaterial;
        const sm = sh.skin.material as THREE.MeshStandardMaterial;
        wm.opacity += ((on ? 0.85 : 0.22) - wm.opacity) * 0.12;
        sm.opacity += ((on ? 0.16 : 0.04) - sm.opacity) * 0.12;
        sh.g.rotation.y = t * (0.12 + i * 0.07) * (i % 2 ? -1 : 1);
        sh.g.rotation.x = Math.sin(t * 0.3 + i) * 0.25;
        const target = on ? 1.02 : 1;
        sh.g.scale.setScalar(sh.g.scale.x + (target - sh.g.scale.x) * 0.1);
      });
      core.rotation.set(t * 0.5, t * 0.7, 0);
      renderer.render(scene, cam);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        frame();
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(host);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        (m.material as THREE.Material | undefined)?.dispose?.();
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="v-canvas" aria-hidden="true" />;
}
