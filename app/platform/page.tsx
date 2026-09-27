import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Platform",
  description: "What's under the hood, in plain English.",
};

const layers = [
  ["Ask Your Data", "Plain-English questions, answered from your numbers.", "Snowflake Cortex, with business definitions written for your company."],
  ["Workspace", "The app your team uses.", "Streamlit apps: dashboards, input screens, and alerts."],
  ["Clean layer", "Rules that fix and check your data every time it updates.", "dbt models and tests. Bad rows are flagged, not published."],
  ["Your private database", "Your own encrypted database, on an enterprise cloud data platform.", "A dedicated Snowflake account per client. Open formats where possible."],
  ["Connectors", "Secure pipes that copy your data automatically, read-only.", "Airbyte or Fivetran, direct APIs, and SharePoint / OneDrive / Google Drive sync."],
  ["Your sources", "Spreadsheets, accounting, project tools, HR, ERP.", "Whatever you use today. Nothing to replace."],
];

export default function Platform() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={
          <>
            Under the hood, <em className="accent">in plain English.</em>
          </>
        }
        lead="You don't need to know any of this to use numarket. But if you — or your IT team — want to know how it works, here it is."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="layers">
            {layers.map(([name, plain, tech], i) => (
              <div className="layer" key={name} style={{ ["--d" as string]: i }}>
                <div className="layer-n">{layers.length - i}</div>
                <div>
                  <h3>{name}</h3>
                  <p>{plain}</p>
                </div>
                <p className="layer-tech">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container grid g2">
          <div>
            <SectionHead eyebrow="Your platform or ours" title="Same stack. Your choice of home." />
            <p className="muted">
              Small and mid-size clients live in numarket&apos;s managed environment, in their own dedicated account that they own. Larger organizations
              on Command can keep everything inside the cloud platform IT already runs — Snowflake, Azure, Databricks, and others.
            </p>
          </div>
          <div>
            <SectionHead eyebrow="If you leave" title="You take it with you." />
            <p className="muted">
              Your data is kept in open formats wherever possible. If you leave after your term, we export everything (CSV or Parquet) or hand the whole
              account over to you within 30 days, at no charge.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
