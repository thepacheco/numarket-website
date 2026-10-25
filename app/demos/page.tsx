import type { Metadata } from "next";
import DemosByProduct from "@/components/DemosByProduct";
import { CtaBand, PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Demos",
  description: "Try each product on sample data: clean data and forms in Foundation, a dashboard and status report in Workspace, an Insight Review, and custom Engineering apps.",
};

export default function Demos() {
  return (
    <>
      <PageHero
        eyebrow="Demos · Sample data"
        title={
          <>
            See it work, <em className="accent">one product at a time.</em>
          </>
        }
        lead="Pick a product, then a view. Switch the industry any time."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="sr-only">Demos by product</h2>
          <DemosByProduct />
          <div className="portal-strip">
            <div>
              <b>Want the whole thing?</b>
              <span>Open the Portal your team would sign into. Pick a person and see exactly what they see.</span>
            </div>
            <a href={site.portalDemoUrl} className="btn btn-secondary" target="_blank" rel="noopener">
              Open the Portal demo
            </a>
          </div>
        </div>
      </section>
      <CtaBand title={<>Want to see it on <em className="accent">your</em> numbers?</>} />
    </>
  );
}
