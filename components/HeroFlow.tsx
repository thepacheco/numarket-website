"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "./Icon";
import ProductSolid from "./solids/ProductSolid";
import { fmt, overBudgetSummary } from "@/lib/sample-data";

/* The hero's picture of what we do, top to bottom: your systems arrive messy,
   flow into one clean, private place (the Foundation cube assembles from
   scattered points), and come out as a dashboard number and an analyst's
   action item. Thin lines with moving dots carry the data; the same line
   style as the shapes floating behind the hero. */

const sources = [
  { icon: "dollar", name: "QuickBooks", issue: "2 duplicates" },
  { icon: "construction", name: "Procore", issue: "1 miscoded job" },
  { icon: "spreadsheet", name: "Spreadsheets", issue: "3 versions" },
];

type Pt = { x: number; y: number };
const curve = (a: Pt, b: Pt) => {
  const my = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
};

export default function HeroFlow() {
  const ob = overBudgetSummary();
  const worst = ob.rows[0];
  const box = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<{ inn: string[]; out: string[]; w: number; h: number } | null>(null);
  const [go, setGo] = useState(false);

  /* the lines follow the real positions of the cards, at any width */
  useLayoutEffect(() => {
    const el = box.current!;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const at = (sel: string) => [...el.querySelectorAll<HTMLElement>(sel)].map((n) => n.getBoundingClientRect());
      const core = el.querySelector<HTMLElement>(".hf-core")!.getBoundingClientRect();
      const top = { x: core.left + core.width / 2 - b.left, y: core.top + core.height * 0.18 - b.top };
      const bottom = { x: top.x, y: core.top + core.height * 0.82 - b.top };
      const inn = at(".hf-src").map((r) => curve({ x: r.left + r.width / 2 - b.left, y: r.bottom - b.top }, top));
      const out = at(".hf-card").map((r) => curve(bottom, { x: r.left + r.width / 2 - b.left, y: r.top - b.top }));
      setPaths({ inn, out, w: b.width, h: b.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setGo(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div ref={box} className={`hf ${go ? "go" : ""}`} role="img" aria-label={`Your systems (QuickBooks, Procore, spreadsheets) flow into one clean, private database, which gives you a dashboard showing ${worst.site} ${fmt(worst.over, "money")} over budget and an analyst's action item to review its change orders.`}>
      {paths && (
        <svg className="hf-lines" viewBox={`0 0 ${paths.w} ${paths.h}`} aria-hidden="true">
          {paths.inn.map((d, i) => (
            <g key={`i${i}`}>
              <path id={`hf-in-${i}`} d={d} className="hf-path in" />
              <circle r="3.2" className="hf-dot in">
                <animateMotion dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite">
                  <mpath href={`#hf-in-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
          {paths.out.map((d, i) => (
            <g key={`o${i}`}>
              <path id={`hf-out-${i}`} d={d} className="hf-path out" />
              <circle r="3.2" className="hf-dot out">
                <animateMotion dur="2.2s" begin={`${1.2 + i * 0.5}s`} repeatCount="indefinite">
                  <mpath href={`#hf-out-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>
      )}

      <div className="hf-row">
        <span className="hf-cap">Your systems, as they are</span>
        <div className="hf-sources">
          {sources.map((s, i) => (
            <div key={s.name} className={`hf-src s${i}`}>
              <span className="hf-ico">
                <Icon name={s.icon} />
              </span>
              <b>{s.name}</b>
              <span className="hf-badge bad">{s.issue}</span>
              <span className="hf-badge ok">
                <Icon name="check" /> Clean
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hf-mid">
        <span />
        <div className="hf-core" data-solid-host>
          <ProductSolid kind="foundation" assemble scale={0.36} />
        </div>
        <span className="hf-cap hf-cap-core">
          <b>Your data</b>
          cleaned, checked, in one private place
        </span>
      </div>

      <div className="hf-out">
        <div className="hf-card hf-dash">
          <span className="hf-tag">Your dashboard</span>
          <small>Cost vs. budget for work done</small>
          <b className="tnum hf-big">{fmt(worst.over, "money")} over</b>
          <small>{worst.site}</small>
          <span className="hf-bars" aria-hidden="true">
            <i style={{ height: "52%" }} />
            <i style={{ height: "74%" }} />
            <i className="risk" style={{ height: "96%" }} />
            <i style={{ height: "61%" }} />
            <i style={{ height: "40%" }} />
          </span>
        </div>
        <div className="hf-card hf-act">
          <span className="hf-tag">Your analyst</span>
          <span className="hf-who">
            <span className="hf-av">AC</span> Avery, your analyst
          </span>
          <b>Review change orders on {worst.site}</b>
          <small>Owner: PM team · Due Friday</small>
        </div>
      </div>
    </div>
  );
}
