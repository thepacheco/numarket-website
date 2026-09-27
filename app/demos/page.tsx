import type { Metadata } from "next";
import IndustryExplorer from "@/components/IndustryExplorer";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import WorkspaceDemo from "@/components/WorkspaceDemo";

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
        lead="Pick an industry. Filter it. Click a row to drill in. Every number adds up."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <IndustryExplorer syncUrl />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Workspace" title="Change a number. Ask a question." />
          <WorkspaceDemo />
        </div>
      </section>
      <CtaBand title={<>Want to see it on <em className="accent">your</em> numbers?</>} />
    </>
  );
}
