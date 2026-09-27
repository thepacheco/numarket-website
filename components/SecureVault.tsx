"use client";

import { useState } from "react";
import Icon from "./Icon";

/* Layered shields around your database. Hover or tap a ring to see what it does. */
const layers = [
  { key: "backup", label: "Backups", color: "#6c5dd3", title: "Backups", body: "Your data is backed up automatically, so a bad day never means lost data." },
  { key: "audit", label: "Audit log", color: "#2e9e6b", title: "Everything logged", body: "Every login and every change is recorded — who, what, and when." },
  { key: "access", label: "Access", color: "#2a8f91", title: "You control who sees what", body: "Named accounts, multi-factor sign-in, and roles you decide." },
  { key: "encrypt", label: "Encryption", color: "#22577a", title: "Encrypted", body: "Encrypted at rest and in transit. Your database is yours alone — never shared." },
];

export default function SecureVault() {
  const [on, setOn] = useState<string | null>("encrypt");
  const cur = layers.find((l) => l.key === on);
  return (
    <div className="vault2">
      <div className="v-scene">
        {layers.map((l, i) => {
          const inset = i * 9;
          return (
            <button
              key={l.key}
              type="button"
              className={`v-ring ${on === l.key ? "on" : on ? "dim" : ""}`}
              style={{ inset: `${inset}%`, ["--vc" as string]: l.color }}
              onMouseEnter={() => setOn(l.key)}
              onFocus={() => setOn(l.key)}
              onClick={() => setOn(l.key)}
              aria-pressed={on === l.key}
            >
              <span>{l.label}</span>
            </button>
          );
        })}
        <div className="v-core">
          <Icon name="database" />
        </div>
      </div>
      <div className="v-detail" aria-live="polite">
        {cur && (
          <div className="card" key={cur.key} style={{ borderTop: `4px solid ${cur.color}` }}>
            <h3>{cur.title}</h3>
            <p>{cur.body}</p>
          </div>
        )}
        <div className="v-list">
          {layers.map((l) => (
            <button key={l.key} type="button" className="chip-btn" onClick={() => setOn(l.key)} aria-pressed={on === l.key}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
