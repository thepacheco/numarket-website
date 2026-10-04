"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";
import { buildView, fmt } from "@/lib/sample-data";
import { industries, type IndustrySlug } from "@/content/industries";
import { sampleCompany } from "@/lib/ask";

/* A sample Insight Review: what changed, what's at risk, and three action items
   with owners and due dates. Every line is calculated from the sample records. */
export default function SampleReview({ slug = "construction", interactive = true }: { slug?: IndustrySlug; interactive?: boolean }) {
  const review = useMemo(() => {
    const v = buildView(slug, "large", null, 3);
    const changes = v.kpis
      .map((k) => ({ k, rel: k.prior ? (k.value - k.prior) / Math.abs(k.prior) : 0 }))
      .filter((x) => Math.abs(x.rel) > 0.005)
      .sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel))
      .slice(0, 3)
      .map(({ k, rel }) => {
        const good = k.better === "up" ? rel > 0 : k.better === "down" ? rel < 0 : null;
        return { label: k.label, now: fmt(k.value, k.fmt), dir: rel > 0 ? "up" : "down", pct: `${Math.abs(rel * 100).toFixed(1)}%`, good };
      });
    const rank = { risk: 0, watch: 1, good: 2 } as const;
    const sk = v.tableKpis.find((k) => k.key === v.statusKey)!;
    const atRisk = [...v.table]
      .filter((r) => r.status !== "good")
      .sort((a, b) => rank[a.status] - rank[b.status])
      .slice(0, 3)
      .map((r) => ({ site: r.site, status: r.status, what: `${sk.label}: ${fmt(r.values.find((x) => x.key === v.statusKey)!.value, sk.fmt)}` }));
    const sites = [v.action.site, ...atRisk.map((r) => r.site).filter((s) => s !== v.action.site), ...v.sites].filter((s, i, a) => a.indexOf(s) === i).slice(0, 3);
    const actions = sites.map((s) => buildView(slug, "large", s, 3).action);
    /* the standing usage check: data volume and platform use vs. the allowance */
    const usage = { rows: Math.round((v.rowCount * 1375) / 1000) * 1000, pct: 48 + (slug.length * 7) % 30 };
    return { changes, atRisk, actions, usage };
  }, [slug]);
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const ind = industries.find((i) => i.slug === slug)!;
  const count = done.filter(Boolean).length;
  return (
    <article className="review-doc" key={slug}>
      <header className="rd-head">
        <div>
          <span className="label-sample">Sample data</span>
          <h3>Insight Review · {sampleCompany[slug]}</h3>
          <p className="small muted">
            {ind.name} · last 3 months compared with the 3 before · prepared by your numarket analyst
          </p>
        </div>
        {interactive && (
          <div className="rd-count" aria-live="polite">
            <b className="tnum">
              {count} of {review.actions.length}
            </b>
            <span>actions completed</span>
          </div>
        )}
      </header>
      <div className="rd-grid">
        <section>
          <h4>What changed</h4>
          <ul className="rd-list">
            {review.changes.map((c) => (
              <li key={c.label}>
                <span className={`rd-arrow ${c.good === null ? "" : c.good ? "good" : "bad"}`} aria-hidden="true">
                  {c.dir === "up" ? "▲" : "▼"}
                </span>
                <span>
                  <b>{c.label}</b> is {c.now}, {c.dir} {c.pct}.
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4>What&apos;s at risk</h4>
          <ul className="rd-list">
            {review.atRisk.length ? (
              review.atRisk.map((r) => (
                <li key={r.site}>
                  <span className={`status-dot ${r.status}`} aria-hidden="true" />
                  <span>
                    <b>{r.site}</b> — {r.what}
                  </span>
                </li>
              ))
            ) : (
              <li>Nothing flagged this period.</li>
            )}
          </ul>
        </section>
      </div>
      <section className="rd-actions">
        <h4>Action items</h4>
        <ol>
          {review.actions.map((a, i) => (
            <li key={a.headline} className={done[i] ? "done" : ""}>
              {interactive ? (
                <label>
                  <input type="checkbox" checked={done[i]} onChange={() => setDone((d) => d.map((x, j) => (j === i ? !x : x)))} />
                  <span className="rd-box" aria-hidden="true">
                    <Icon name="check" width={14} height={14} />
                  </span>
                  <span className="rd-a">
                    <b>{a.headline}</b>
                    <span>{a.detail}</span>
                    <small>
                      Owner: {a.owner} · Due: {a.due}
                    </small>
                  </span>
                </label>
              ) : (
                <span className="rd-a">
                  <b>{a.headline}</b>
                  <span>{a.detail}</span>
                  <small>
                    Owner: {a.owner} · Due: {a.due}
                  </small>
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
      <section className="rd-usage">
        <h4>Usage check</h4>
        <div className="rd-usage-row">
          <span>
            <b className="tnum">{review.usage.rows.toLocaleString("en-US")}</b> new rows this month
          </span>
          <span className="rd-meter" aria-hidden="true">
            <i style={{ width: `${review.usage.pct}%` }} />
          </span>
          <span>
            <b className="tnum">{review.usage.pct}%</b> of your platform allowance · steady, no change needed
          </span>
        </div>
      </section>
    </article>
  );
}
