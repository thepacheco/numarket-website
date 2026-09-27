import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About Us", description: "Founded in Atlanta to make every company's data trustworthy and ready for AI." };

const values = [
  ["Trust the data.", "If the numbers aren't right, nothing built on them is."],
  ["Show before we sell.", "We demo real, working tools — not slides."],
  ["Plain language.", "If a restaurant owner wouldn't understand it, we rewrite it."],
  ["You own it.", "Your data, your database, your decision to stay or go."],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Good companies deserve <em className="accent">numbers they can trust.</em>
          </>
        }
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="prose">
            <p className="lead" style={{ marginBottom: 18 }}>
              numarket was founded in Atlanta by a data scientist with 7+ years of analytics work across energy, construction, healthcare, manufacturing,
              aerospace, pharmaceutical, and food production.
            </p>
            <p>
              Across every one of those industries, the same problem kept showing up: good companies making decisions on messy data. Numbers that
              didn&apos;t agree. Reports rebuilt by hand every week. Leaders told to &ldquo;use AI&rdquo; on data that wasn&apos;t ready for it.
            </p>
            <p>numarket exists to fix that — the foundation first, then the tools on top, with a real person explaining what it all means.</p>
          </div>
          <div className="card">
            <span className="eyebrow">Mission</span>
            <h3 style={{ margin: "10px 0 0", fontSize: 26 }}>Make every company&apos;s data trustworthy and ready for AI.</h3>
            <p style={{ marginTop: 18 }}>
              Headquartered in {site.city}. Serving clients nationally.
            </p>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Values" title="What we stand for." />
          <div className="grid g4 stagger">
            {values.map(([t, b]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
