"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useDeferredMount } from "./useDeferredMount";

const GeoCanvas = dynamic(() => import("./journey/GeoCanvas"), { ssr: false });

/* Ambient 3D geometry behind a section. Loads only after the visitor interacts,
   never for reduced-motion visitors or browsers without WebGL. */
export default function GeoField({ density = 12, side = "both" }: { density?: number; side?: "both" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const c = document.createElement("canvas");
      setOk(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      /* no WebGL: the section keeps its CSS gradient */
    }
  }, []);
  const mount = useDeferredMount(ref, ok, "200px 0px");
  return (
    <div ref={ref} className="geo-field" aria-hidden="true">
      {mount && <GeoCanvas density={density} side={side} />}
    </div>
  );
}
