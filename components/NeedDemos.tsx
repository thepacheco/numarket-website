"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { messyTotal, reports, trueTotal, versions, type Row } from "@/lib/demo-data";
import { constructionJobs, fmt } from "@/lib/sample-data";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* ---------- Get AI-ready ---------- */
export function AiCompare() {
  const [asked, setAsked] = useState(false);
  const sales = reports[2];
  return (
    <div className="demo-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <div className="msg q" style={{ justifySelf: "start" }}>
          What was our revenue last quarter?
        </div>
        {!asked && (
          <button type="button" className="btn btn-primary" onClick={() => setAsked(true)}>
            Ask the AI <Icon name="send" width={16} height={16} />
          </button>
        )}
      </div>
      <div className="ai-compare">
        <div className="ai-side bad">
          <h3 className="h4">
            <Icon name="alert" width={18} height={18} style={{ color: "var(--risk)" }} /> On messy data
          </h3>
          {asked ? (
            <div style={{ animation: "popIn .4s" }}>
              <p>
                <b>Revenue last quarter was {money(messyTotal(sales.rows))}.</b>
              </p>
              <p className="small muted" style={{ marginTop: 8 }}>
                Confident — and wrong. It read the Sales report, which still includes a cancelled deal. Finance and Operations would each give a different
                answer.
              </p>
            </div>
          ) : (
            <p className="muted small">Waiting for a question…</p>
          )}
        </div>
        <div className="ai-side good">
          <h3 className="h4">
            <Icon name="check" width={18} height={18} style={{ color: "var(--good)" }} /> On clean data
          </h3>
          {asked ? (
            <div style={{ animation: "popIn .4s .25s both" }}>
              <p>
                <b>Revenue last quarter was {money(trueTotal)}.</b>
              </p>
              <p className="small muted" style={{ marginTop: 8 }}>
                From one matched set of 5 customers. Duplicates removed, names matched, cancelled deals excluded.
              </p>
            </div>
          ) : (
            <p className="muted small">Waiting for a question…</p>
          )}
        </div>
      </div>
      {asked && (
        <button type="button" className="btn btn-ghost" style={{ marginTop: 12 }} onClick={() => setAsked(false)}>
          <Icon name="refresh" width={16} height={16} /> Reset
        </button>
      )}
    </div>
  );
}

/* ---------- Move off old systems ---------- */

export { MigrationDemo, ReconcileDemo, SpreadsheetDemo } from "./NarratedDemos";
