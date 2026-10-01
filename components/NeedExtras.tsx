"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { readinessLevels } from "@/content/effort";

/* The five readiness levels, as a ladder you can click through. */
export function ReadinessLadder() {
  const [lvl, setLvl] = useState(2);
  const cur = readinessLevels[lvl - 1];
  return (
    <div className="ladder">
      <ol className="ladder-steps">
        {readinessLevels.map((l) => (
          <li key={l.level}>
            <button type="button" aria-pressed={lvl === l.level} className={`lad ${l.level <= lvl ? "lit" : ""}`} onClick={() => setLvl(l.level)} style={{ ["--h" as string]: `${28 + l.level * 14}%` }}>
              <span className="lad-bar" aria-hidden="true" />
              <b>{l.level}</b>
              <span>{l.name}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="ladder-detail" aria-live="polite" key={lvl}>
        <span className="pill navy">
          Level {cur.level} · {cur.name}
        </span>
        <p>
          <b>What it looks like:</b> {cur.looks}
        </p>
        <p>
          <b>What it takes:</b> {cur.takes}
        </p>
        <p className="small muted">
          Most companies we talk to are at level 1 or 2. <Link href="/getting-started#quiz">Find your level in 5 questions →</Link>
        </p>
      </div>
    </div>
  );
}

/* Why answers go wrong on messy data — four plain examples. */
export function WhatGoesWrong({ items }: { items: { t: string; ex: string; fix: string }[] }) {
  return (
    <div className="wgw">
      {items.map((x) => (
        <div key={x.t} className="wgw-card">
          <h3>{x.t}</h3>
          <p className="wgw-ex">{x.ex}</p>
          <p className="wgw-fix">
            <Icon name="check" width={15} height={15} /> {x.fix}
          </p>
        </div>
      ))}
    </div>
  );
}

/* What the automatic checks look like on a normal morning. */
export function CheckLog() {
  const rows: [string, string, boolean, string][] = [
    ["6:00", "No duplicate invoice numbers", true, "41,208 rows"],
    ["6:00", "Job totals match QuickBooks", true, "to the cent"],
    ["6:01", "Every job has a project manager", true, "312 jobs"],
    ["6:01", "Costs within the expected range", false, "3 rows held back"],
    ["6:02", "Data is fresh (updated in the last 24h)", true, "all 5 sources"],
  ];
  return (
    <div className="checklog">
      <div className="cl-head">
        <span className="label-sample">Sample data</span>
        <b>This morning&apos;s checks</b>
      </div>
      <ol>
        {rows.map(([t, name, ok, note]) => (
          <li key={name} className={ok ? "ok" : "bad"}>
            <span className="cl-t tnum">{t}</span>
            <span className="cl-i" aria-hidden="true">
              {ok ? "✓" : "!"}
            </span>
            <span className="cl-n">{name}</span>
            <span className="cl-note">{note}</span>
          </li>
        ))}
      </ol>
      <p className="cl-foot">
        The 3 odd rows were held back from every dashboard. We were alerted and fixed them at the source before 9:00. Nobody on your team had to do anything.
      </p>
    </div>
  );
}

/* Three entries from a data dictionary. */
export function DictionarySample() {
  const d: [string, string, string, string][] = [
    ["Revenue", "Invoiced amount, excluding tax, counted on the invoice date.", "QuickBooks invoices", "Finance lead"],
    ["Cost to date", "Every cost posted to a job, including committed subcontracts.", "QuickBooks + Procore", "Project controls"],
    ["Customer", "One company, no matter how its name is spelled in each system.", "CRM + QuickBooks, matched", "Operations"],
  ];
  return (
    <div className="dict-sample">
      {d.map(([name, means, from, owner]) => (
        <dl key={name}>
          <dt>{name}</dt>
          <dd>
            <span>Means</span>
            {means}
          </dd>
          <dd>
            <span>Comes from</span>
            {from}
          </dd>
          <dd>
            <span>Owned by</span>
            {owner}
          </dd>
        </dl>
      ))}
    </div>
  );
}
