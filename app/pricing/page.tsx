import type { Metadata } from "next";
import { PlanCards, PriceConfigurator, ProductPriceTable } from "@/components/PricingTiers";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { faq } from "@/content/faq";
import { addOns } from "@/content/tiers";
import { TermsGlance } from "@/components/PricingOps";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Published prices by size. Take all three products and a discount applies, shown line by line. Engineering is quoted per project.",
};

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            One price for your size. <em className="accent">Every line shown.</em>
          </>
        }
        lead="Pick your size and the products you want. You see each product's price, the discount for taking all three, and the total."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="sr-only">Build your price</h2>
          <PriceConfigurator />
        </div>
      </section>

      <section className="section soft" id="plans">
        <div className="container">
          <SectionHead eyebrow="All three products" title="By size." lead="Foundation, Workspace, and Insight Review together, with the discount applied. Click a size to see everything it includes." />
          <PlanCards />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Product by product" title="Taking only some products?" lead="Foundation is required, because everything else is built on your data. These are the prices before the all-three discount." />
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
          <SectionHead eyebrow="Terms" title="Contract terms." lead="The same terms go into your agreement." />
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
