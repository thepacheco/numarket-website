"use client";

import { useState } from "react";
import Icon from "./Icon";

/* Before/after of an owner's Monday morning, on a phone. */
export default function MondayPhone() {
  const [after, setAfter] = useState(true);
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "center" }}>
      <div className="seg" role="group" aria-label="Before or after">
        <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
          Before
        </button>
        <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
          With numarket
        </button>
      </div>
      <div className="phone">
        <div className="phone-screen" key={String(after)} style={{ animation: "popIn .4s" }}>
          {after ? (
            <>
              <span className="small muted" style={{ fontWeight: 600 }}>
                Summit Builders · Workspace
              </span>
              <h4>Good morning.</h4>
              <div className="grid g2" style={{ gap: 8 }}>
                <div className="kpi">
                  <div className="kpi-l">Cash</div>
                  <div className="kpi-v tnum" style={{ fontSize: 20 }}>
                    $412K
                  </div>
                </div>
                <div className="kpi">
                  <div className="kpi-l">Jobs on budget</div>
                  <div className="kpi-v tnum" style={{ fontSize: 20 }}>
                    2 of 3
                  </div>
                </div>
              </div>
              <span className="small" style={{ fontWeight: 700 }}>
                3 action items
              </span>
              <ul className="feed">
                <li>
                  <Icon name="alert" width={16} height={16} style={{ color: "var(--risk)", flex: "none" }} /> Main St: review design-error change orders
                </li>
                <li>
                  <Icon name="clock" width={16} height={16} style={{ color: "var(--watch)", flex: "none" }} /> 4 RFIs open over 7 days
                </li>
                <li>
                  <Icon name="check" width={16} height={16} style={{ color: "var(--good)", flex: "none" }} /> Invoice Elm Park draw #3
                </li>
              </ul>
            </>
          ) : (
            <>
              <span className="small muted" style={{ fontWeight: 600 }}>
                Inbox · 14 unread
              </span>
              <h4>Where are last week&apos;s numbers?</h4>
              <ul className="feed">
                {["RE: RE: budget v3 FINAL", "Can you resend the job report?", "Which spreadsheet is current??", "Numbers don't match QuickBooks", "Updated file attached (again)"].map((m) => (
                  <li key={m} style={{ borderStyle: "dashed", borderColor: "rgba(224,122,95,.5)" }}>
                    <Icon name="mail" width={16} height={16} style={{ color: "var(--chaos)", flex: "none" }} /> {m}
                  </li>
                ))}
              </ul>
              <span className="small muted">Picture of last week: maybe Wednesday.</span>
            </>
          )}
        </div>
      </div>
      <span className="label-sample">Sample</span>
    </div>
  );
}
