import type { Metadata } from "next";
import Link from "next/link";
import PricingTiers from "@/components/PricingTiers";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { tierComparison, addOns } from "@/content/tiers";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Published starting prices. A one-time setup and a monthly subscription. No per-user fees. Fixed quotes after a free Readiness Check.",
};

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Clear pricing. <em className="accent">No surprise bills.</em>
          </>
        }
        lead="A one-time setup to build your foundation, then a monthly subscription to run it. Published starting prices, fixed quotes after your free Readiness Check, and no per-user fees."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <PricingTiers />
          <div className="card" style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3>Start with a free AI Readiness Check</h3>
              <p>30 minutes. No cost. You get a readiness score and 3 specific findings.</p>
            </div>
            <div className="btn-row">
              <Link href="/getting-started#estimator" className="btn btn-secondary">
                Estimate my cost
              </Link>
              <Link href="/contact" className="btn btn-primary">
                Book it
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Compare" title="Everything in each plan." />
          <div className="table-wrap">
            <table className="t">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Insight</th>
                  <th scope="col" className="hl">
                    Operate
                  </th>
                  <th scope="col">Command</th>
                </tr>
              </thead>
              <tbody>
                {tierComparison.map(([label, a, b, c]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{a}</td>
                    <td className="hl">{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Platform usage"
              title="What's “platform usage”?"
              lead="Your private database costs money to store and run. We include that cost up to an allowance. Most small and mid-size clients stay well inside it."
            />
            <p className="muted">
              If usage ever goes above the allowance, the overage is billed at cost + 15% and shown on its own line on your invoice. We alert you before you
              get close — never after.
            </p>
          </div>
          <div className="card">
            <h3>Operate allowance: $800/mo</h3>
            <p className="small">Illustration of how the allowance works.</p>
            <div className="usage">
              <div className="usage-bar">
                <span className="usage-typ" style={{ width: "55%" }} />
                <span className="usage-alert" style={{ left: "85%" }} />
              </div>
              <div className="usage-legend">
                <span>
                  <i className="sw typ" /> Usage so far this month
                </span>
                <span>
                  <i className="sw alert" /> We alert you here (85%)
                </span>
              </div>
              <div className="usage-scale tnum">
                <span>$0</span>
                <span>$400</span>
                <span>$800 included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Add-ons" title="Grow when you're ready." />
          <div className="grid g4">
            {addOns.map((a) => (
              <div key={a.name} className="card">
                <h3>{a.name}</h3>
                <p>{a.note}</p>
                <p style={{ marginTop: 12, fontWeight: 700, color: "var(--ink)" }}>{a.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Pricing questions." />
          <Faq items={faq.pricing} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
