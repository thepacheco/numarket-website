import type { Metadata } from "next";
import IndustryExplorer from "@/components/IndustryExplorer";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Demos",
  description: "Interactive sample dashboards for eight industries. Filter them — every number is calculated from the same sample records.",
};

export default function Demos() {
  return (
    <>
      <PageHero
        eyebrow="Demos · Sample data"
        title={
          <>
            This is what your team would see — <em className="accent">built on your data.</em>
          </>
        }
        lead="Pick an industry and a company size, then filter by site and time period. Every KPI, chart, table row, and action item is calculated from the same sample records, so the numbers always add up. Click a row in the table to drill in."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <IndustryExplorer syncUrl />
        </div>
      </section>
      <CtaBand title={<>Want to see it on <em className="accent">your</em> numbers?</>} />
    </>
  );
}
