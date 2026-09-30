import type { Metadata } from "next";
import { PlanCards, PriceConfigurator, ProductPriceTable } from "@/components/PricingTiers";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { faq } from "@/content/faq";
import { TermsGlance } from "@/components/PricingOps";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Each product has its own published price by size. Take all three as a plan and save about 10%. Engineering is quoted per project.",
};

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Priced by product. <em className="accent">Bundled by plan.</em>
          </>
        }
        lead="Pick your size and the products you want. Take all three and it becomes a plan that saves about 10%."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="sr-only">Build your price</h2>
          <PriceConfigurator />
        </div>
      </section>

      <section className="section soft" id="plans">
        <div className="container">
          <SectionHead eyebrow="The plans" title="All three products, bundled." lead="Click a plan to see everything it includes." />
          <PlanCards />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Or buy separately" title="Every product has its own price." lead="Foundation is required. Everything else sits on it." />
          <ProductPriceTable />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="The rules" title="No fine print." />
          <TermsGlance />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Platform usage" title="What's “platform usage”?" lead="Running your database costs money. Foundation includes it, up to an allowance." />
            <p className="muted">Over the allowance? Billed at cost + 15%, on its own invoice line. We warn you at 85%.</p>
          </div>
          <div className="card">
            <h3>Mid allowance: $800/mo</h3>
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
          <SectionHead eyebrow="FAQ" title="Pricing questions." />
          <Faq items={faq.pricing} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
