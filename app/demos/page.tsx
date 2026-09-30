import type { Metadata } from "next";
import DemosByProduct from "@/components/DemosByProduct";
import { CtaBand, PageHero } from "@/components/ui";

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
          <h2 className="sr-only">Demos by product</h2>
          <DemosByProduct />
        </div>
      </section>
      <CtaBand title={<>Want to see it on <em className="accent">your</em> numbers?</>} />
    </>
  );
}
