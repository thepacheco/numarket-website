"use client";

/* Internal: renders one product model to a transparent canvas for export. */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Kit } from "./kit";
import { productBuilders, type ArtKind } from "./products";

export default function RenderStill({ kind, w = 900, h = 720 }: { kind: ArtKind; w?: number; h?: number }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(2);
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const kit = new Kit();
    const root = productBuilders[kind](kit);
    scene.add(root);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd9e3ea, 1.35));
    const sun = new THREE.DirectionalLight(0xffffff, 1.75);
    sun.position.set(-5, 14, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xe8f4ff, 0.45);
    fill.position.set(8, 6, -4);
    scene.add(fill);
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    cam.position.copy(new THREE.Vector3(1, 0.86, 1).normalize().multiplyScalar(60));
    cam.lookAt(0, 0, 0);
    cam.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(root);
    const pts = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => new THREE.Vector3(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).applyMatrix4(cam.matrixWorldInverse));
    const minX = Math.min(...pts.map((v) => v.x)),
      maxX = Math.max(...pts.map((v) => v.x)),
      minY = Math.min(...pts.map((v) => v.y)),
      maxY = Math.max(...pts.map((v) => v.y));
    let bw = (maxX - minX) * 1.04,
      bh = (maxY - minY) * 1.04;
    const cx = (minX + maxX) / 2,
      cy = (minY + maxY) / 2;
    if (bw / bh > w / h) bh = bw / (w / h);
    else bw = bh * (w / h);
    Object.assign(cam, { left: cx - bw / 2, right: cx + bw / 2, top: cy + bh / 2, bottom: cy - bh / 2 });
    cam.updateProjectionMatrix();
    document.fonts.ready.then(() => {
      renderer.render(scene, cam);
      document.body.dataset.done = "1";
    });
    return () => {
      kit.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [kind, w, h]);
  return <div ref={host} id="still" style={{ width: w, height: h }} />;
}
