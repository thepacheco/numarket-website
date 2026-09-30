import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead } from "@/components/ui";
import SolidIcon from "@/components/solids/SolidIcon";
import SolidsField from "@/components/solids/SolidsField";
import { site } from "@/content/site";
import type { SolidKind } from "@/components/solids/geometry";

export const metadata: Metadata = { title: "About Us", description: "numarket exists to make every company's data trustworthy and ready for AI. Founded in Atlanta, serving clients nationally." };

const values: { kind: SolidKind; t: string; b: string }[] = [
  { kind: "foundation", t: "Trust the data.", b: "If the numbers aren't right, nothing built on them is — so we fix the foundation first." },
  { kind: "workspace", t: "Show before we sell.", b: "We demo working tools on sample data, not slides." },
  { kind: "insight", t: "Plain language.", b: "If a restaurant owner wouldn't understand it, we rewrite it." },
  { kind: "engineering", t: "You own it.", b: "Your data, your cleaning rules, your apps — and your decision to stay or go." },
];

const ahead = [
  ["More industries", "Deeper starting kits for the businesses we see most: construction, logistics, healthcare, manufacturing, and food."],
  ["The numarket Portal", "One branded app your team signs into with Microsoft or Google, with input screens designed for phones in the field."],
  ["A partner network", "Accountants, IT providers, and advisors who bring us in when a client's numbers need fixing."],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Make every company&apos;s data <em className="accent">trustworthy and ready for AI.</em>
          </>
        }
        lead="That's the whole mission. Everything we build points at it."
      />

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container about-story">
          <SectionHead eyebrow="Why we exist" title="Good companies, messy numbers." />
          <div className="prose about-prose">
            <p>
              numarket was founded in Atlanta by a data scientist with 7+ years of analytics work across energy, construction, healthcare, manufacturing,
              and food production.
            </p>
            <p>
              In every one of those industries, the same problem kept showing up: good companies making decisions on messy data. Numbers that didn&apos;t
              agree from one report to the next. The same spreadsheet rebuilt by hand every Friday. Leaders told to &ldquo;use AI&rdquo; on data that
              wasn&apos;t ready for it.
            </p>
            <p>
              Big companies solve this with a data team. Small and mid-size companies usually can&apos;t hire one — the people are expensive, hard to find,
              and a single hire can&apos;t do all of it. So they get left behind.
            </p>
            <p>
              numarket is that data team, run for you: we clean and secure the foundation first, put the numbers in front of your people, and have a real
              analyst tell you what to do next.
            </p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="How we work" title="Four rules we don't bend." />
          <div className="about-values stagger">
            {values.map((v) => (
              <div className="card about-value" key={v.t}>
                <SolidIcon kind={v.kind} size={40} />
                <h3>{v.t}</h3>
                <p>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Leadership" title="Who you'll work with." />
          <div className="leader card">
            <div className="leader-photo" aria-hidden="true">
              BP
            </div>
            <div>
              <h3>Brandon Pacheco</h3>
              <p className="leader-title">Founder</p>
              <p>
                Brandon founded numarket after 7+ years of data and analytics work across energy, construction, healthcare, manufacturing, and food
                production. Every client works with Brandon directly, from the first Readiness Check to the monthly reviews.
              </p>
              {site.linkedin && (
                <p style={{ marginTop: 10 }}>
                  <a href={site.linkedin}>LinkedIn →</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Where we're headed" title="What comes next." />
          <div className="grid g3 stagger">
            {ahead.map(([t, b]) => (
              <div className="card" key={t}>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-end">
        <SolidsField textZone="center" count={8} seed={19} />
        <div className="container about-end-in">
          <p className="about-where">
            <b>{site.city}</b> · Serving clients nationally
          </p>
          <div className="about-links">
            <Link href="/contact" className="about-link">
              <span>Work with us</span>
              <b>Start with a free Readiness Check →</b>
            </Link>
            <Link href="/partners" className="about-link">
              <span>Partner with us</span>
              <b>Refer, co-sell, or white-label →</b>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
