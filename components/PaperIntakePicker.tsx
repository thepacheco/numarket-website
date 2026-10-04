"use client";

import { useState } from "react";
import IndGlyph from "./IndGlyph";
import PaperIntake from "./PaperIntake";
import { engApps } from "@/content/engApps";
import { industries, type IndustrySlug } from "@/content/industries";

/* The paper-to-digital demo with an industry filter above it. */
export default function PaperIntakePicker() {
  const [slug, setSlug] = useState<IndustrySlug>("construction");
  return (
    <div className="demo-card">
      <div className="calc-inds" role="tablist" aria-label="Industry" style={{ marginBottom: 16 }}>
        {industries.map((i) => (
          <button key={i.slug} type="button" role="tab" aria-selected={slug === i.slug} className={`ind-chip ind-${i.slug}`} onClick={() => setSlug(i.slug)}>
            <IndGlyph /> {i.short}
          </button>
        ))}
      </div>
      <p className="ea-line">
        Replacing: {engApps[slug].intake.paper.toLowerCase()} <span className="label-sample">Engineering project · Sample data</span>
      </p>
      <PaperIntake slug={slug} key={slug} />
    </div>
  );
}
