"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDeferredMount } from "./useDeferredMount";
import type { IndustrySlug } from "@/content/industries";
import type { Mode } from "./iso/kit";

const IsoCanvas = dynamic(() => import("./iso/IsoCanvas"), { ssr: false });

/* An isometric 3D scene of the industry. Falls back to `fallback` without WebGL. */
export default function IndustryIso({
  slug,
  mode,
  chip,
  fallback,
  className = "",
  label,
  eager = false,
}: {
  slug: IndustrySlug;
  mode: Mode;
  chip?: { text: string; tone: "bad" | "good" };
  fallback?: ReactNode;
  className?: string;
  label: string;
  /* also load after a short idle wait, even if the visitor hasn't moved yet (hero use) */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [gl, setGl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setGl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setGl(false);
    }
  }, []);
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (!eager) return;
    const id = window.setTimeout(() => setIdle(true), 2500);
    return () => window.clearTimeout(id);
  }, [eager]);
  const mount = useDeferredMount(ref, gl === true, "500px 0px") || (eager && idle && gl === true);
  return (
    <div ref={ref} className={`iso-wrap ind-${slug} ${ready ? "ready" : ""} ${className}`} role="img" aria-label={label}>
      {gl === false ? fallback : <div className="iso-ghost" aria-hidden="true" />}
      {gl && mount && <IsoCanvas slug={slug} mode={mode} onReady={() => setReady(true)} />}
      {chip && (
        <div className={`iso-chip ${chip.tone}`} key={chip.text}>
          {chip.text}
        </div>
      )}
    </div>
  );
}
