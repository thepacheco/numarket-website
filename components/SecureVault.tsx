"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Icon from "./Icon";

const VaultCanvas = dynamic(() => import("./journey/VaultCanvas"), { ssr: false });

/* Layered shields around your database. Hover or tap a ring to see what it does. */
const layers = [
  { key: "backup", label: "Backups", color: "#6c5dd3", title: "Backups", body: "Your data is backed up automatically, so a bad day never means lost data." },
  { key: "audit", label: "Audit log", color: "#2e9e6b", title: "Everything logged", body: "Every login and every change is recorded — who, what, and when." },
  { key: "access", label: "Access", color: "#2a8f91", title: "You control who sees what", body: "Named accounts, multi-factor sign-in, and roles you decide." },
  { key: "encrypt", label: "Encryption", color: "#22577a", title: "Encrypted", body: "Encrypted at rest and in transit. Your database is yours alone — never shared." },
];

export default function SecureVault() {
  const [on, setOn] = useState<string | null>("encrypt");
  const [three, setThree] = useState(false);
  const cur = layers.find((l) => l.key === on);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const c = document.createElement("canvas");
      setThree(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      /* no WebGL: the flat rings still work */
    }
  }, []);
  return (
    <div className="vault2">
      <div className={`v-scene ${three ? "has3d" : ""}`}>
        {three && <VaultCanvas active={layers.findIndex((l) => l.key === on)} />}
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
        {!three && (
          <div className="v-core">
            <Icon name="database" />
          </div>
        )}
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
