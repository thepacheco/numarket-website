"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { site } from "@/content/site";
import { industries } from "@/content/industries";

/* Field labels are the column names in the Google Sheet. Keep them stable. */
const systems: Record<string, string[]> = {
  "Accounting / ERP": ["QuickBooks", "Sage", "NetSuite", "Microsoft Dynamics", "SAP", "Oracle / JD Edwards"],
  "Project & operations": ["Procore", "Microsoft Project", "Primavera P6", "Smartsheet", "Monday.com", "Asana", "Jira"],
  "HR / workforce": ["ADP", "Workday", "UKG (Kronos)", "BambooHR", "Ceridian Dayforce"],
  Reporting: ["Power BI", "Tableau", "Looker / Google Data Studio", "Qlik"],
  Other: ["Spreadsheets (Excel / Google Sheets)", "Custom / In-house system", "Multiple systems", "Not sure / Other"],
};

const storage = [
  "Mostly spreadsheets / local files",
  "Microsoft 365 / SharePoint",
  "Google Workspace",
  "Cloud (AWS / Azure / GCP)",
  "On-premise servers",
  "Mix of cloud and on-premise",
  "Not sure",
];

type Variant = "contact" | "partner";

export default function ContactForm({ variant = "contact" }: { variant?: Variant }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [prefill, setPrefill] = useState<Record<string, string>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const isContact = variant === "contact";

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p: Record<string, string> = {};
    q.forEach((v, k) => (p[k] = v));
    setPrefill(p);
  }, []);

  const fromEstimator = prefill.from === "estimator";
  const defaultPath = prefill.tier ? (prefill.tier === "Command" ? "Larger organization" : "Small or growing business") : "";
  const defaultStart = prefill.timing === "asap" ? "ASAP" : prefill.timing === "soon" ? "1–3 months" : prefill.timing === "exploring" ? "Just exploring" : "";

  /* Returns true when the required fields are filled in. */
  function checkRequired() {
    const form = formRef.current!;
    const data = new FormData(form);
    const required = variant === "partner" ? ["First Name", "Last Name", "Work Email", "Firm Name"] : ["First Name", "Last Name", "Work Email", "Company"];
    const missing = required.filter((k) => !String(data.get(k) ?? "").trim());
    const email = String(data.get("Work Email") ?? "").trim();
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) missing.push("a valid email address");
    form.querySelectorAll<HTMLInputElement>("input[required]").forEach((el) => el.setAttribute("aria-invalid", String(!el.value.trim())));
    if (missing.length) {
      setError(`Please complete: ${missing.join(", ")}.`);
      if (isContact) setStep(1);
      return false;
    }
    setError("");
    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current!;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot: bots fill hidden fields
    if (!checkRequired()) return;
    setState("sending");

    const fields: Record<string, string> = { "Form": variant === "partner" ? "Partner inquiry" : "Readiness Check request", "Submitted": new Date().toISOString(), "Page": window.location.pathname };
    data.forEach((v, k) => {
      if (k !== "website") fields[k] = String(v);
    });

    try {
      await fetch(site.formEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(fields) });
      setState("done");
    } catch {
      setState("idle");
      setError(`Network error — please email us at ${site.email}.`);
    }
  }

  if (state === "done") {
    return (
      <div className="card form-done" role="status">
        <div className="icon-badge">
          <Icon name="check" />
        </div>
        <h3>Got it.</h3>
        <p>We&apos;ll reply within {site.responseTime} — and come prepared.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="card form" onSubmit={onSubmit} noValidate>
      {isContact && (
        <div className="form-steps" aria-label={`Step ${step} of 2`}>
          <span className={step === 1 ? "on" : ""}>
            <i>1</i> About you
          </span>
          <span className="line" />
          <span className={step === 2 ? "on" : ""}>
            <i>2</i> Details <span className="muted">(optional)</span>
          </span>
        </div>
      )}
      {fromEstimator && (
        <div className="notice">
          <strong>Your estimate is attached:</strong> {prefill.tier} · {prefill.estimate}
          {prefill.readiness ? ` · Readiness ${prefill.readiness}` : ""}
        </div>
      )}
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div hidden={isContact && step !== 1} className="form fade-in">
      <div className="form-row">
        <div className="field">
          <label htmlFor="fn">First name *</label>
          <input id="fn" name="First Name" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="ln">Last name *</label>
          <input id="ln" name="Last Name" required autoComplete="family-name" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="em">Work email *</label>
          <input id="em" name="Work Email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="ph">Phone</label>
          <input id="ph" name="Phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      {variant === "partner" ? (
        <>
          <div className="form-row">
            <div className="field">
              <label htmlFor="firm">Firm name *</label>
              <input id="firm" name="Firm Name" required autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="ftype">Firm type</label>
              <select id="ftype" name="Firm Type" defaultValue="">
                <option value="">Select…</option>
                <option>IT managed service provider</option>
                <option>CPA or fractional CFO firm</option>
                <option>Software reseller / implementer</option>
                <option>Industry consultant</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="nclients">Number of clients</label>
              <select id="nclients" name="Number of Clients" defaultValue="">
                <option value="">Select…</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>200+</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="prog">Program of interest</label>
              <select id="prog" name="Program" defaultValue="">
                <option value="">Select…</option>
                <option>Referral</option>
                <option>Co-sell</option>
                <option>White-label</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="inds">Industries you serve</label>
            <input id="inds" name="Industries Served" placeholder="e.g. construction, healthcare" />
          </div>
        </>
      ) : (
        <>
          <div className="form-row">
            <div className="field">
              <label htmlFor="co">Company *</label>
              <input id="co" name="Company" required autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="path">Which path fits you?</label>
              <select id="path" name="Path" key={defaultPath} defaultValue={defaultPath}>
                <option value="">Select…</option>
                <option>Small or growing business</option>
                <option>Larger organization</option>
                <option>Not sure</option>
              </select>
            </div>
          </div>
          </>
      )}
      </div>

      {isContact && (
        <div hidden={step !== 2} className="form fade-in">
          <div className="form-row">
            <div className="field">
              <label htmlFor="size">Company size</label>
              <select id="size" name="Company Size" defaultValue="">
                <option value="">Select…</option>
                <option>1–10 employees</option>
                <option>10–50 employees</option>
                <option>50–250 employees</option>
                <option>250–1,000 employees</option>
                <option>1,000+ employees</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="ind">Industry</label>
              <select id="ind" name="Industry" defaultValue="">
                <option value="">Select…</option>
                {industries.map((i) => (
                  <option key={i.slug}>{i.name}</option>
                ))}
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="sys">Primary data system</label>
              <select id="sys" name="Primary Data System" defaultValue="">
                <option value="">Select your main system…</option>
                {Object.entries(systems).map(([g, opts]) => (
                  <optgroup key={g} label={g}>
                    {opts.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="st">Where your data lives</label>
              <select id="st" name="Data Storage" defaultValue="">
                <option value="">Select…</option>
                {storage.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="ppl">People who need access</label>
              <input id="ppl" name="People Who Need Access" inputMode="numeric" key={prefill.users} defaultValue={prefill.users ?? ""} />
            </div>
            <div className="field">
              <label htmlFor="start">Preferred start</label>
              <select id="start" name="Preferred Start" key={defaultStart} defaultValue={defaultStart}>
                <option value="">Select…</option>
                <option>ASAP</option>
                <option>1–3 months</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="field" hidden={isContact && step !== 2}>
        <label htmlFor="msg">{variant === "partner" ? "Tell us about your clients" : "What are you trying to see more clearly?"}</label>
        <textarea
          id="msg"
          name={variant === "partner" ? "Message" : "What are you trying to see more clearly?"}
          placeholder={variant === "partner" ? "What are your clients asking for?" : "The decisions you're trying to make, the systems you use, what's frustrating today…"}
        />
      </div>

      {/* Estimator hand-off (hidden) */}
      {fromEstimator &&
        (
          [
            ["Estimator Tier", prefill.tier],
            ["Estimator Employees", prefill.employees],
            ["Estimator Sources", prefill.sources],
            ["Estimator Users", prefill.users],
            ["Estimator Data Location", prefill.location],
            ["Estimator Range", prefill.estimate],
            ["Readiness Level", prefill.readiness],
          ] as [string, string | undefined][]
        )
          .filter(([, v]) => v)
          .map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="btn-row">
        {isContact && step === 1 ? (
          <>
            <button
              key="next"
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (checkRequired()) setStep(2);
              }}
            >
              Next: a few details <Icon name="arrow" className="arrow" width={16} height={16} />
            </button>
            <button key="skip" type="submit" className="btn btn-ghost" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : "Skip and send"}
            </button>
          </>
        ) : (
          <>
            <button key="send" type="submit" className="btn btn-primary" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : variant === "partner" ? "Send partner inquiry" : "Send request"}
              {state !== "sending" && <Icon name="arrow" className="arrow" width={16} height={16} />}
            </button>
            {isContact && (
              <button key="back" type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                Back
              </button>
            )}
          </>
        )}
      </div>
      <p className="small muted">
        We reply within {site.responseTime}. We never sell your information. See our <a href="/legal/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}
