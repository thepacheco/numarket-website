"use client";

import { useEffect, useState } from "react";
import { useTween } from "./useTween";
import Icon from "./Icon";
import { industries, type IndustrySlug } from "@/content/industries";
import { firstYearCost, leakFor, leakTotal, planFor } from "@/lib/savings";
import { fmt, type Fmt, type Size } from "@/lib/sample-data";
import IndGlyph from "./IndGlyph";

function Num({ value, format, className }: { value: number; format: Fmt; className?: string }) {
  const v = useTween(value);
  return <span className={`tnum ${className ?? ""}`}>{fmt(v, format)}</span>;
}

export default function SavingsCalc({ initialIndustry = "logistics", initialSize = "small", picker = true }: { initialIndustry?: IndustrySlug; initialSize?: Size; picker?: boolean }) {
  const [slug, setSlug] = useState<IndustrySlug>(initialIndustry);
  const [size, setSize] = useState<Size>(initialSize);
  const [share, setShare] = useState(15);
  const [assume, setAssume] = useState<number | undefined>(undefined);
  useEffect(() => setAssume(undefined), [slug]);

  const leak = leakFor(slug, size, assume);
  const lost = leakTotal(leak);
  const saved = lost * (share / 100);
  const cost = firstYearCost(size);
  const payback = saved > 0 ? cost / (saved / 12) : Infinity;
  const max = Math.max(saved, cost);

  return (
    <div className="calc">
      {picker && (
        <div className="calc-top">
          <div className="calc-inds" role="tablist" aria-label="Industry">
            {industries.map((i) => (
              <button key={i.slug} type="button" role="tab" aria-selected={slug === i.slug} className={`ind-chip ind-${i.slug}`} onClick={() => setSlug(i.slug)}>
                <IndGlyph /> {i.short}
              </button>
            ))}
          </div>
          <div className="seg" role="group" aria-label="Company size">
            <button type="button" aria-pressed={size === "small"} onClick={() => setSize("small")}>
              Small / Growing
            </button>
            <button type="button" aria-pressed={size === "large"} onClick={() => setSize("large")}>
              Larger
            </button>
          </div>
        </div>
      )}

      <div className="calc-card" key={`${slug}-${size}`}>
        <div className="calc-head">
          <span className="label-sample">Sample math · 12 months</span>
          <h3>{leak.title}</h3>
          <p>{leak.why}</p>
          <p className="small muted">
            Worst at <b style={{ color: "var(--ink)" }}>{leak.worst}</b>.
          </p>
        </div>

        {/* Line 1: how much × cost each = lost */}
        <div className="eq" aria-live="polite">
          {leak.qty !== null && (
            <>
              <div className="eq-box">
                <Num value={leak.qty} format={leak.qtyFmt} className="eq-v" />
                <span className="eq-l">{leak.qtyLabel}</span>
              </div>
              <span className="eq-op" aria-hidden="true">
                ×
              </span>
              <div className="eq-box">
                <Num value={leak.unit} format="money2" className="eq-v" />
                <span className="eq-l">{leak.unitLabel}</span>
              </div>
              <span className="eq-op" aria-hidden="true">
                =
              </span>
            </>
          )}
          <div className="eq-box lost">
            <Num value={lost} format="money" className="eq-v" />
            <span className="eq-l">{leak.qty === null ? leak.qtyLabel : "Lost per year"}</span>
          </div>
        </div>

        {leak.assumption && (
          <div className="field calc-assume">
            <label htmlFor="calc-assume">
              {leak.assumption.label}: <b className="tnum">${(assume ?? leak.assumption.value).toFixed(2)}</b> <span className="muted small">(an assumption — change it)</span>
            </label>
            <input
              id="calc-assume"
              type="range"
              min={leak.assumption.min}
              max={leak.assumption.max}
              step={leak.assumption.step}
              value={assume ?? leak.assumption.value}
              onChange={(e) => setAssume(+e.target.value)}
            />
          </div>
        )}

        {/* Line 2: lost × share you fix = saved */}
        <div className="eq">
          <div className="eq-box lost small-box">
            <Num value={lost} format="money" className="eq-v" />
            <span className="eq-l">Lost per year</span>
          </div>
          <span className="eq-op" aria-hidden="true">
            ×
          </span>
          <div className="eq-box slider-box">
            <span className="eq-v tnum">{share}%</span>
            <label className="eq-l" htmlFor="calc-share">
              Share you fix <span className="muted">(you choose)</span>
            </label>
            <input id="calc-share" type="range" min={5} max={50} step={1} value={share} onChange={(e) => setShare(+e.target.value)} />
          </div>
          <span className="eq-op" aria-hidden="true">
            =
          </span>
          <div className="eq-box saved">
            <Num value={saved} format="money" className="eq-v" />
            <span className="eq-l">Saved per year</span>
          </div>
        </div>

        {/* Compare with what numarket costs */}
        <div className="cmp">
          <div className="cmp-row">
            <span>Saved per year</span>
            <span className="cmp-track">
              <span className="cmp-fill good" style={{ width: `${(saved / max) * 100}%` }} />
            </span>
            <b className="tnum">{fmt(saved, "money")}</b>
          </div>
          <div className="cmp-row">
            <span>
              numarket {planFor(size)}, first year
            </span>
            <span className="cmp-track">
              <span className="cmp-fill cost" style={{ width: `${(cost / max) * 100}%` }} />
            </span>
            <b className="tnum">{fmt(cost, "money")}</b>
          </div>
          <p className="cmp-note">
            <Icon name={payback <= 12 ? "check" : "clock"} width={18} height={18} />
            {payback <= 12
              ? `At ${share}%, it pays for itself in about ${Math.max(1, Math.round(payback))} month${Math.round(payback) === 1 ? "" : "s"}.`
              : `At ${share}%, it covers ${fmt(saved / cost, "pct")} of the first-year cost. Drag the slider to see what it takes.`}
          </p>
        </div>

        <p className="small muted calc-fix">
          <b style={{ color: "var(--ink)" }}>How we'd fix it:</b> {leak.fix}
        </p>
        <p className="small muted">Illustrative math on sample data. Your free Readiness Check runs it on your real numbers.</p>
      </div>
    </div>
  );
}
