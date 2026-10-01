"use client";

import { useRef, useState } from "react";
import Icon from "./Icon";
import { site } from "@/content/site";

/* ---------- response targets by plan ---------- */
const plans = {
  Insight: { normal: ["1", "business day"], urgent: ["Same", "business day"], channels: "Email" },
  Operate: { normal: ["4", "business hours"], urgent: ["4", "hours"], channels: "Email, phone, shared channel" },
  Command: { normal: ["2", "hours"], urgent: ["1", "hour"], channels: "Dedicated analyst, every channel" },
} as const;
type Plan = keyof typeof plans;

function Ring({ k }: { k: number }) {
  const c = 2 * Math.PI * 18;
  return (
    <svg className="clock-ring" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="18" fill="none" stroke="var(--gray-100)" strokeWidth="5" />
      <circle cx="22" cy="22" r="18" fill="none" stroke="var(--green)" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${c * k} ${c}`} transform="rotate(-90 22 22)" style={{ transition: "stroke-dasharray .7s" }} />
    </svg>
  );
}

export function SlaPicker() {
  const [plan, setPlan] = useState<Plan>("Operate");
  const p = plans[plan];
  const speed = plan === "Insight" ? 0.35 : plan === "Operate" ? 0.65 : 0.95;
  return (
    <div className="sla">
      <div className="seg" role="group" aria-label="Plan" style={{ justifySelf: "start" }}>
        {(Object.keys(plans) as Plan[]).map((k) => (
          <button key={k} type="button" aria-pressed={plan === k} onClick={() => setPlan(k)}>
            {{ Insight: "Small", Operate: "Mid", Command: "Large" }[k]}
          </button>
        ))}
      </div>
      <div className="sla-cards" aria-live="polite">
        <div className="sla-card" key={`a${plan}`}>
          <Ring k={speed} />
          <span className="lbl2">Normal requests</span>
          <span>
            <span className="big-num">{p.normal[0]}</span> <b>{p.normal[1]}</b>
          </span>
          <span className="small muted">First response, during business hours</span>
        </div>
        <div className="sla-card" key={`b${plan}`}>
          <Ring k={Math.min(1, speed + 0.1)} />
          <span className="lbl2">Urgent (app down)</span>
          <span>
            <span className="big-num">{p.urgent[0]}</span> <b>{p.urgent[1]}</b>
          </span>
          <span className="small muted">First response when your Workspace is unavailable</span>
        </div>
        <div className="sla-card" key={`c${plan}`}>
          <Ring k={speed} />
          <span className="lbl2">How to reach us</span>
          <b style={{ fontSize: 20, color: "var(--ink)" }}>{p.channels}</b>
          <span className="small muted">Plus the docs, any time</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- support request form ---------- */
export function SupportForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(ref.current!);
    if (data.get("website")) return;
    const need = ["Name", "Work Email", "Company", "What's happening?"];
    const missing = need.filter((k) => !String(data.get(k) ?? "").trim());
    const email = String(data.get("Work Email") ?? "");
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) missing.push("a valid email address");
    if (missing.length) {
      setError(`Please complete: ${missing.join(", ")}.`);
      return;
    }
    setError("");
    setState("sending");
    const fields: Record<string, string> = { Form: "Support request", Submitted: new Date().toISOString(), Page: window.location.pathname };
    data.forEach((v, k) => {
      if (k !== "website") fields[k] = String(v);
    });
    try {
      await fetch(site.formEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(fields) });
      setState("done");
    } catch {
      setState("idle");
      setError(`Network error — please email ${site.email} or call ${site.phone}.`);
    }
  };
  if (state === "done")
    return (
      <div className="card form-done" role="status">
        <div className="icon-badge">
          <Icon name="check" />
        </div>
        <h3>Request received.</h3>
        <p>We&apos;ll confirm it within your plan&apos;s response time. For anything urgent, call {site.phone}.</p>
      </div>
    );
  return (
    <form ref={ref} className="card form" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="s-name">Name *</label>
          <input id="s-name" name="Name" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="s-email">Work email *</label>
          <input id="s-email" name="Work Email" type="email" autoComplete="email" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="s-co">Company *</label>
          <input id="s-co" name="Company" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="s-urg">How urgent?</label>
          <select id="s-urg" name="Urgency" defaultValue="Normal">
            <option>Normal</option>
            <option>Urgent — the Workspace is down</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="s-topic">Topic</label>
        <select id="s-topic" name="Topic" defaultValue="">
          <option value="">Select…</option>
          <option>A number looks wrong</option>
          <option>Change request (new dashboard, field, or source)</option>
          <option>Access and users</option>
          <option>Something isn&apos;t working</option>
          <option>Billing</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="s-msg">What&apos;s happening? *</label>
        <textarea id="s-msg" name="What's happening?" placeholder="The page, the number, and what you expected to see." />
      </div>
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send to support"} <Icon name="send" width={16} height={16} />
      </button>
      <p className="small muted">Urgent and the app is down? Call {site.phone}.</p>
    </form>
  );
}
