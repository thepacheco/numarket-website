import type { Metadata } from "next";
import { PlanCards, PriceConfigurator, ProductPriceTable } from "@/components/PricingTiers";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { faq } from "@/content/faq";
import { addOns } from "@/content/tiers";
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

      <section className="section soft" id="add-ons">
        <div className="container">
          <SectionHead eyebrow="As you grow" title="Everything that grows has a price." lead="Normal use is included in your plan. If you add sources, history, questions, or people who query the database directly, here is exactly what it costs. Nothing is billed without a warning first." />
          <div className="addons">
            {addOns.map((a) => (
              <div key={a.name} className="addon">
                <div>
                  <b>{a.name}</b>
                  <span className="small muted">{a.why}</span>
                </div>
                <span className="addon-price tnum">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The rules" title="No fine print." />
          <TermsGlance />
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Platform usage" title="What's “platform usage”?" lead="Updating your database, storing your history, and paid connectors to some systems cost money each month. Foundation includes that, up to an allowance most clients never reach." />
            <p className="muted">You see it on your Usage page. We warn you at 70% and again at 85%. Over the allowance? Billed at cost + 15%, on its own invoice line.</p>
          </div>
          <div className="card">
            <h3>Mid allowance: $800/mo</h3>
            <p className="small">Illustration of how the allowance works.</p>
            <div className="usage">
              <div className="usage-bar">
                <span className="usage-typ" style={{ width: "55%" }} />
                <span className="usage-alert" style={{ left: "70%" }} />
                <span className="usage-alert" style={{ left: "85%" }} />
              </div>
              <div className="usage-legend">
                <span>
                  <i className="sw typ" /> Usage so far this month
                </span>
                <span>
                  <i className="sw alert" /> We warn you at 70% and 85%
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
