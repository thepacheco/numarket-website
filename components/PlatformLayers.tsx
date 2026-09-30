"use client";

import { useState } from "react";
import Icon from "./Icon";

/* Exploded stack: click a layer to lift it and read what it does. */
const layers = [
  { name: "Ask Your Data", icon: "chat", plain: "Plain-English questions, answered from your numbers.", tech: "Snowflake Cortex + business definitions written for you." },
  { name: "Workspace", icon: "window", plain: "The app your team uses.", tech: "Streamlit apps inside Snowflake, with single sign-on through Microsoft, Google, or Okta." },
  { name: "Clean layer", icon: "clean", plain: "Rules that fix and check every update.", tech: "dbt models and tests, run on a schedule. Bad rows are flagged, not published." },
  { name: "Your private database", icon: "lock", plain: "Encrypted, and separate from every other client.", tech: "Its own separate Snowflake account inside numarket's Snowflake organization. You own the data in it." },
  { name: "Connectors", icon: "plug", plain: "Secure, read-only pipes.", tech: "Snowflake's own connectors or open-source Airbyte; paid connectors only on Large. APIs and SharePoint / OneDrive / Drive file sync." },
  { name: "Your sources", icon: "spreadsheet", plain: "Whatever you use today.", tech: "Accounting, project tools, HR, ERP, spreadsheets." },
];

export default function PlatformLayers() {
  const [sel, setSel] = useState(3);
  const cur = layers[sel];
  return (
    <div className="pl">
      <div className="pl-stack" role="listbox" aria-label="Platform layers">
        {layers.map((l, i) => (
          <button
            key={l.name}
            type="button"
            role="option"
            aria-selected={sel === i}
            className={`pl-layer ${sel === i ? "on" : ""}`}
            style={{ ["--i" as string]: i }}
            onClick={() => setSel(i)}
            onMouseEnter={() => setSel(i)}
            onFocus={() => setSel(i)}
          >
            <span className="pl-face">
              <Icon name={l.icon} width={18} height={18} /> {l.name}
            </span>
          </button>
        ))}
      </div>
      <div className="pl-detail" aria-live="polite">
        <div className="card" key={cur.name} style={{ animation: "popIn .35s" }}>
          <span className="pill navy">Layer {layers.length - sel} of {layers.length}</span>
          <h3 style={{ margin: "14px 0 8px", fontSize: 24 }}>{cur.name}</h3>
          <p style={{ fontSize: 18, color: "var(--ink)" }}>{cur.plain}</p>
          <p className="small muted" style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
            <b>Built on:</b> {cur.tech}
          </p>
        </div>
      </div>
    </div>
  );
}
