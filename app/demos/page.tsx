import type { Metadata } from "next";
import DemosByProduct from "@/components/DemosByProduct";
import { CtaBand, PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Demos",
  description: "Try each product on sample data: Foundation cleaning, a Workspace dashboard and input screen, an Insight Review, and a custom Engineering app — for eight industries.",
};

export default function Demos() {
  return (
    <>
      <PageHero
        eyebrow="Demos · Sample data"
        title={
          <>
            See each product work — <em className="accent">on sample data.</em>
          </>
        }
        lead="Pick your industry, then a product. Every number comes from the same sample records."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="portal-demo">
            <div>
              <p className="portal-demo-eyebrow">The real software</p>
              <h2>Open the numarket Portal</h2>
              <p>The app your team signs into: dashboards, status reports as PDFs, input screens, uploads, and Ask Your Data. Pick a person (owner, project manager, superintendent, or CFO) and see exactly what they see. A fictional construction company; resets every night. No sign-up.</p>
            </div>
            <a href={site.portalDemoUrl} className="btn btn-primary" target="_blank" rel="noopener">
              Open the live demo
            </a>
          </div>
          <h2 className="sr-only">Demos by product</h2>
          <DemosByProduct />
        </div>
      </section>
      <CtaBand title={<>Want to see it on <em className="accent">your</em> numbers?</>} />
    </>
  );
}
