"use client";

import { useState } from "react";

const stack = ["Ask Your Data", "Workspace", "Clean layer", "Your private database"];

export default function PlatformToggle() {
  const [where, setWhere] = useState<"ours" | "yours">("ours");
  return (
    <div className="home-toggle">
      <div className="seg" role="group" aria-label="Where it runs" style={{ justifySelf: "start" }}>
        <button type="button" aria-pressed={where === "ours"} onClick={() => setWhere("ours")}>
          We host it
        </button>
        <button type="button" aria-pressed={where === "yours"} onClick={() => setWhere("yours")}>
          Your cloud
        </button>
      </div>
      <div className="homes">
        <div className={`home-box ${where === "ours" ? "active" : ""}`}>
          <b>numarket&apos;s managed environment</b>
          <span className="small muted">Small, Mid, and Large. Your own separate account; you own your data.</span>
          <div className="stack-mini">
            {stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className={`home-box ${where === "yours" ? "active" : ""}`}>
          <b>Your existing cloud</b>
          <span className="small muted">Command. Snowflake, Azure, Databricks…</span>
          <div className="stack-mini">
            {stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="small muted">Same stack either way. Either way, you own your data.</p>
    </div>
  );
}
