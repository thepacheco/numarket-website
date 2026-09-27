"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { tiers, money } from "@/content/tiers";

export default function PricingTiers() {
  const [mode, setMode] = useState<"split" | "year">("split");
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <div className="seg" role="group" aria-label="Price display">
          <button type="button" aria-pressed={mode === "split"} onClick={() => setMode("split")}>
            Setup + monthly
          </button>
          <button type="button" aria-pressed={mode === "year"} onClick={() => setMode("year")}>
            First-year total
          </button>
        </div>
      </div>
      <div className="grid g3">
        {tiers.map((t) => (
          <div key={t.id} className={`card tier ${t.popular ? "popular" : ""}`}>
            {t.popular && <span className="badge">Most popular</span>}
            <div>
              <h2 className="tier-name">{t.name}</h2>
              <p className="small">{t.bestFor}</p>
            </div>
            <div className="price" aria-live="polite">
              <span className="per">From</span>
              {mode === "split" ? (
                <>
                  <span className="big tnum">
                    {money(t.monthlyFrom)}
                    <span className="per">/mo</span>
                  </span>
                  <span className="per">+ {money(t.setupFrom)} one-time setup</span>
                </>
              ) : (
                <>
                  <span className="big tnum">{money(t.setupFrom + t.monthlyFrom * 12)}</span>
                  <span className="per">
                    first year · then {money(t.monthlyFrom * 12)}/yr
                  </span>
                </>
              )}
            </div>
            <ul>
              {t.highlights.map((h) => (
                <li key={h}>
                  <Icon name="check" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className={`btn ${t.popular ? "btn-primary" : "btn-secondary"}`}>
              Get a Free Readiness Check
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
