/* ============================================================
   Product art: one distinct 3D object per product.
   Isometric SVG + CSS 3D. No libraries, no images, and every
   animation stops for visitors who prefer reduced motion.
   ============================================================ */

import type React from "react";
import WorkspaceArt from "./WorkspaceArt";

export { WorkspaceArt };

export type ProductKind = "foundation" | "workspace" | "insight" | "engineering" | "platform";

/* ---------- isometric helpers ---------- */

const C30 = 0.866;
export const p = (a: number, b: number, c: number) => `${((a - b) * C30).toFixed(1)},${((a + b) * 0.5 - c).toFixed(1)}`;

export function Box({
  a,
  b,
  c,
  w,
  d,
  h,
  top,
  left,
  right,
  stroke,
}: {
  a: number;
  b: number;
  c: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  stroke?: string;
}) {
  const s = stroke ? { stroke, strokeWidth: 1, strokeLinejoin: "round" as const } : {};
  return (
    <g>
      <polygon points={[p(a, b + d, c), p(a + w, b + d, c), p(a + w, b + d, c + h), p(a, b + d, c + h)].join(" ")} fill={left} {...s} />
      <polygon points={[p(a + w, b, c), p(a + w, b + d, c), p(a + w, b + d, c + h), p(a + w, b, c + h)].join(" ")} fill={right} {...s} />
      <polygon points={[p(a, b, c + h), p(a + w, b, c + h), p(a + w, b + d, c + h), p(a, b + d, c + h)].join(" ")} fill={top} {...s} />
    </g>
  );
}

/* ---------- Product illustrations: isometric 3D models rendered to images
   (components/iso/products.ts → scripts/render-art.mjs → public/art). ---------- */

const artSize = {
  foundation: [1706, 970],
  workspace: [1554, 1097],
  insight: [1598, 1116],
  engineering: [1706, 1081],
} as const;
const artAlt = {
  foundation: "Your tools feeding clean data through pipes into one locked, private database.",
  workspace: "A dashboard, a phone input screen, and a plain-English question with its answer.",
  insight: "An analyst's review board with three action items, each with an owner and a due date.",
  engineering: "An old server's records moving through a check gate into a new database, verified.",
} as const;

export function RenderedArt({ kind, eager }: { kind: keyof typeof artSize; eager?: boolean }) {
  const [w, h] = artSize[kind];
  return (
    <div className={`art art-img art-${kind}-img`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/art/${kind}.webp`} width={w} height={h} alt={artAlt[kind]} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

export const EngineeringArt = () => <RenderedArt kind="engineering" />;
