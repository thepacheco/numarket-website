"use client";

import { useEffect, useRef, useState } from "react";
import { fmt, type Fmt } from "@/lib/sample-data";

function useWidth<T extends HTMLElement>(initial = 560) {
  const ref = useRef<T>(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function niceTicks(min: number, max: number, count = 4) {
  if (max === min) max = min + 1;
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(+v.toFixed(10));
  return ticks;
}

/* ---------- Line chart: two series, crosshair tooltip ---------- */

export function LineChart({
  points,
  aLabel,
  bLabel,
  format,
  title,
  height = 220,
}: {
  height?: number;
  points: { label: string; a: number; b: number }[];
  aLabel: string;
  bLabel: string;
  format: Fmt;
  title: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { l: 56, r: 14, t: 12, b: 28 };
  const vals = points.flatMap((p) => [p.a, p.b]);
  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);
  const lowPad = minV - (maxV - minV) * 0.15;
  const ticks = niceTicks(minV > 0 && lowPad > 0 ? lowPad : Math.min(0, minV), maxV);
  const y0 = ticks[0];
  const y1 = ticks[ticks.length - 1];
  const iw = width - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const x = (i: number) => pad.l + (points.length === 1 ? iw / 2 : (i * iw) / (points.length - 1));
  const y = (v: number) => pad.t + ih - ((v - y0) / (y1 - y0)) * ih;
  const path = (k: "a" | "b") => points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p[k]).toFixed(1)}`).join("");
  const axisFmt = format === "money2" ? "money2" : format === "hrs" ? "num" : format;
  const every = Math.ceil(points.length / Math.max(3, Math.floor(iw / 70)));

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const box = (e.currentTarget as SVGRectElement).getBoundingClientRect();
    const px = e.clientX - box.left;
    const i = Math.round((px / box.width) * (points.length - 1));
    setHover(Math.max(0, Math.min(points.length - 1, i)));
  };

  const h = hover != null ? points[hover] : null;
  const tipLeft = hover != null ? Math.min(Math.max(x(hover) - 80, 0), width - 170) : 0;

  return (
    <figure className="chart" ref={ref}>
      <figcaption className="chart-title">{title}</figcaption>
      <div className="legend" aria-hidden="true">
        <span>
          <i className="key dashed" /> {aLabel}
        </span>
        <span>
          <i className="key solid" /> {bLabel}
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <svg width={width} height={height} role="img" aria-label={`${title}. ${aLabel} and ${bLabel} by month.`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={width - pad.r} y1={y(t)} y2={y(t)} className="grid" />
              <text x={pad.l - 8} y={y(t)} className="axis" textAnchor="end" dominantBaseline="middle">
                {fmt(t, axisFmt)}
              </text>
            </g>
          ))}
          {points.map((p, i) =>
            i % every === 0 || i === points.length - 1 ? (
              <text key={p.label} x={x(i)} y={height - 8} className="axis" textAnchor="middle">
                {p.label}
              </text>
            ) : null
          )}
          <path d={path("a")} className="line-a" />
          <path d={path("b")} className="line-b" />
          {hover != null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} className="crosshair" />
              <circle cx={x(hover)} cy={y(points[hover].a)} r={4.5} className="dot-a" />
              <circle cx={x(hover)} cy={y(points[hover].b)} r={4.5} className="dot-b" />
            </g>
          )}
          <rect
            x={pad.l}
            y={pad.t}
            width={iw}
            height={ih}
            fill="transparent"
            onPointerMove={onMove}
            onPointerDown={onMove}
            onPointerLeave={() => setHover(null)}
          />
        </svg>
        {h && (
          <div className="tip" style={{ left: tipLeft, top: 0 }}>
            <div className="tip-h">{h.label}</div>
            <div className="tip-r">
              <i className="key dashed" />
              <b>{fmt(h.a, format)}</b> <span>{aLabel}</span>
            </div>
            <div className="tip-r">
              <i className="key solid" />
              <b>{fmt(h.b, format)}</b> <span>{bLabel}</span>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}

/* ---------- Horizontal bar chart: per-bar tooltip, direct labels ---------- */

export function BarChart({ items, format, title }: { items: { label: string; value: number }[]; format: Fmt; title: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const total = items.reduce((s, x) => s + x.value, 0);
  const max = Math.max(...items.map((x) => x.value), 1);
  const sorted = [...items].sort((a, b) => b.value - a.value);
  return (
    <figure className="chart">
      <figcaption className="chart-title">{title}</figcaption>
      <ul className="bars">
        {sorted.map((it, i) => (
          <li
            key={it.label}
            tabIndex={0}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={hover === i ? "on" : ""}
            aria-label={`${it.label}: ${fmt(it.value, format)}, ${fmt(total ? it.value / total : 0, "pct")} of total`}
          >
            <span className="bar-label">{it.label}</span>
            <span className="bar-track">
              <span className="bar-fill" style={{ width: `${(it.value / max) * 100}%` }} />
            </span>
            <span className="bar-val tnum">{hover === i ? fmt(total ? it.value / total : 0, "pct") : fmt(it.value, format)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
