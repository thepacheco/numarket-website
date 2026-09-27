import type { Metadata } from "next";
import Link from "next/link";
import PricingTiers from "@/components/PricingTiers";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { tierComparison, addOns } from "@/content/tiers";
import { faq } from "@/content/faq";
import { PricingArt } from "@/components/HeroArts";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Published starting prices. A one-time setup and a monthly subscription. No per-user fees. Fixed quotes after a free Readiness Check.",
};

export default function Pricing() {
  return (
    <>
      <PageHero
        art={<PricingArt />}
        eyebrow="Pricing"
        title={
          <>
            Clear pricing. <em className="accent">No surprise bills.</em>
          </>
        }
        lead="One-time setup. Monthly subscription. No per-user fees."
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
          <p className="small muted" style={{ marginBottom: 12 }}>Scroll sideways on small screens.</p>
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
              lead="Running your database costs money. We include it — up to an allowance."
            />
            <p className="muted">Over the allowance? Billed at cost + 15%, on its own invoice line. We warn you first.</p>
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
