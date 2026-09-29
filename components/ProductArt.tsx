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
  workspace: "A live dashboard, a phone input screen, and a plain-English question with its answer.",
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

export const FoundationArt = () => <RenderedArt kind="foundation" eager />;
export const InsightArt = () => <RenderedArt kind="insight" eager />;
export const EngineeringArt = () => <RenderedArt kind="engineering" eager />;

export function ProductArt({ kind, eager }: { kind: ProductKind; eager?: boolean }) {
  if (kind === "platform") return <RenderedArt kind="foundation" eager={eager} />;
  return <RenderedArt kind={kind} eager={eager} />;
}

/* ---------- product glyphs: tiny isometric objects, one per product ---------- */

const gShade: Record<ProductKind, [string, string, string]> = {
  foundation: ["#5aa3c9", "#1d4a68", "#2a6a91"],
  workspace: ["#7fd1c3", "#1f7476", "#2a8f91"],
  insight: ["#9ee6bd", "#1f7a52", "#2e9e6b"],
  engineering: ["#b7adf6", "#4a3cb0", "#6c5dd3"],
  platform: ["#9fb4c4", "#1b3346", "#2b4a60"],
};

export function ProductGlyph({ kind, small }: { kind: ProductKind; small?: boolean }) {
  const [top, left, right] = gShade[kind];
  const B = (a: number, b: number, c: number, w: number, d: number, h: number, cls?: string, colors?: [string, string, string]) => {
    const [t, l, r] = colors ?? [top, left, right];
    return (
      <g className={cls}>
        <Box a={a} b={b} c={c} w={w} d={d} h={h} top={t} left={l} right={r} />
      </g>
    );
  };
  let body: React.ReactNode;
  if (kind === "foundation") body = <>{B(-8, -8, -6, 16, 16, 3)}{B(-8, -8, -1, 16, 16, 3)}<g className="g-top">{B(-8, -8, 4, 16, 16, 3)}</g></>;
  else if (kind === "workspace")
    body = (
      <>
        {B(-9, -7, -6, 18, 14, 1.5, undefined, ["#e6f5f5", "#9cc9ca", "#bfdede"])}
        <g className="g-top">
          {B(-9, -7, 3, 18, 14, 1.5)}
          {B(-6, -4, 4.5, 3, 3, 4, undefined, ["#ffffff", "#cfe9e9", "#e6f5f5"])}
          {B(-1, -4, 4.5, 3, 3, 7, undefined, ["#ffffff", "#cfe9e9", "#e6f5f5"])}
        </g>
      </>
    );
  else if (kind === "insight")
    body = (
      <>
        <ellipse cx="0" cy="6" rx="14" ry="7" fill="#e6f7ee" stroke="#9ee6bd" />
        <ellipse cx="0" cy="6" rx="8" ry="4" fill="none" stroke="#2e9e6b" />
        <ellipse cx="0" cy="6" rx="2.6" ry="1.3" fill="#1f7a52" />
        <g className="g-top">{B(-6, -1, 7, 12, 2, 10)}</g>
      </>
    );
  else if (kind === "engineering")
    body = (
      <>
        {B(-13, -2, -4, 9, 9, 9, undefined, ["#e3e7ec", "#98a4b0", "#bcc6cf"])}
        <circle cx="0" cy="1" r="1.8" fill="#6c5dd3" />
        <g className="g-top">{B(3, -2, -4, 9, 9, 12)}</g>
      </>
    );
  else body = <>{B(-8, -8, -6, 16, 16, 2)}{B(-8, -8, -2, 16, 16, 2)}{B(-8, -8, 2, 16, 16, 2)}<g className="g-top">{B(-8, -8, 6, 16, 16, 2)}</g></>;
  return (
    <span className={`pglyph pg-${kind} ${small ? "sm" : ""}`} aria-hidden="true">
      <svg viewBox="-17 -17 34 34">{body}</svg>
    </span>
  );
}
