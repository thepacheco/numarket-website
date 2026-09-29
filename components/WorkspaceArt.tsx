"use client";

import { useState } from "react";
import { constructionJobs, fmt, overBudgetSummary } from "@/lib/sample-data";

/* Three app screens stacked in 3D. Point at (or tap) one and a flat,
   full-size copy appears beside the stack so it can actually be read. */
const titles = ["Dashboard · live", "Update job budget", "Ask Your Data"];

export default function WorkspaceArt({ interactive = true }: { interactive?: boolean }) {
  const [on, setOn] = useState<number | null>(null);
  const ob = overBudgetSummary();
  const jobs = constructionJobs().slice(0, 3);
  const maxV = Math.max(...jobs.map((j) => Math.max(j.cost, j.earned)));
  const pick = (i: number) =>
    interactive
      ? {
          tabIndex: 0,
          role: "button",
          "aria-label": `Show the ${titles[i]} screen`,
          onMouseEnter: () => setOn(i),
          onFocus: () => setOn(i),
          onClick: () => setOn(i),
        }
      : {};
  return (
    <div className={`art art-workspace ${on !== null ? "peeking" : ""}`} role={interactive ? "group" : "img"} aria-label="Three app screens stacked in 3D: a dashboard, an input form, and a chat." onMouseLeave={() => setOn(null)}>
      <div className="ws-stage">
        <div className={`ws-panel ws-dash ${on === 0 ? "hot" : ""}`} {...pick(0)}>
          <b className="ws-title">{titles[0]}</b>
          <div className="ws-bars">
            <i style={{ height: "40%" }} />
            <i style={{ height: "65%" }} />
            <i style={{ height: "52%" }} />
            <i style={{ height: "85%" }} />
            <i style={{ height: "70%" }} />
          </div>
        </div>
        <div className={`ws-panel ws-form ${on === 1 ? "hot" : ""}`} {...pick(1)}>
          <b className="ws-title">{titles[1]}</b>
          <span className="ws-input" />
          <span className="ws-input" />
          <span className="ws-btn">Save</span>
        </div>
        <div className={`ws-panel ws-chat ${on === 2 ? "hot" : ""}`} {...pick(2)}>
          <b className="ws-title">{titles[2]}</b>
          <span className="ws-bubble q">Which jobs are over budget?</span>
          <span className="ws-bubble a">
            {ob.count} jobs · {fmt(ob.total, "money")} over
          </span>
        </div>
      </div>
      {interactive && (
        <div className="ws-hint" aria-hidden="true">
          Point at a screen to read it
        </div>
      )}
      {on !== null && (
        <div className="ws-peek" key={on} aria-hidden="true">
          <b className="ws-peek-t">{titles[on]}</b>
          {on === 0 && (
            <div className="peek-dash">
              <span className="small muted">Cost vs. earned value · last 12 months</span>
              {jobs.map((j) => (
                <div key={j.site} className="pd-row">
                  <span>{j.site}</span>
                  <span className="pd-track">
                    <i className="earned" style={{ width: `${(j.earned / maxV) * 100}%` }} />
                    <i className={`cost ${j.cost > j.earned ? "over" : ""}`} style={{ width: `${(j.cost / maxV) * 100}%` }} />
                  </span>
                  <b className="tnum">{fmt(j.cost - j.earned, "money")}</b>
                </div>
              ))}
            </div>
          )}
          {on === 1 && (
            <div className="peek-form">
              <label>
                Job <span>{jobs[1].site}</span>
              </label>
              <label>
                Cost to date <span className="tnum">{fmt(jobs[1].cost, "money")}</span>
              </label>
              <label>
                Percent complete <span className="tnum">{Math.round(jobs[1].progress * 100)}%</span>
              </label>
              <span className="pf-btn">Save · everyone sees it now</span>
            </div>
          )}
          {on === 2 && (
            <div className="peek-chat">
              <span className="q">Which jobs are over budget?</span>
              <span className="a">
                {ob.count} jobs are over — {fmt(ob.total, "money")} in total. Biggest: {ob.rows[0]?.site} ({fmt(ob.rows[0]?.over ?? 0, "money")}).
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
