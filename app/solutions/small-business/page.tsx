import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBand, Dots, Faq, PageHero, PrimaryCta, SectionHead } from "@/components/ui";
import IndustryExplorer from "@/components/IndustryExplorer";
import { effort } from "@/content/effort";
import { tiers, money } from "@/content/tiers";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Small & Growing Businesses",
  description: "The data team you don't have to hire. We host it, run it, and explain it.",
};

export default function SmallBusiness() {
  const e = effort[0];
  return (
    <>
      <PageHero
        eyebrow="Small & growing businesses"
        title={
          <>
            The data team you <em className="accent">don&apos;t have to hire.</em>
          </>
        }
        lead="We host it, run it, and explain it. You get live numbers, simple apps that replace your spreadsheets, and a short list of what to do next — for less than one hire."
      >
        <div className="btn-row">
          <PrimaryCta />
          <Link href="/getting-started#estimator" className="btn btn-secondary">
            Estimate my cost
          </Link>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="container grid g3">
          <div className="card">
            <h3>“I don&apos;t know my real numbers until month-end.”</h3>
            <p>Your Workspace updates on its own. See cash, jobs, and orders as they happen.</p>
          </div>
          <div className="card">
            <h3>“Everything lives in someone&apos;s spreadsheet.”</h3>
            <p>Your team enters updates in one simple screen. Everyone sees the same numbers.</p>
          </div>
          <div className="card">
            <h3>“Everyone says use AI. I don&apos;t know where to start.”</h3>
            <p>Start with clean data. Then ask it questions in plain English.</p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div>
            <SectionHead eyebrow="A day in the life" title="Monday, 7:30 a.m." />
            <div className="grid" style={{ gap: 16 }}>
              <div className="card">
                <span className="pill warn">Before</span>
                <p style={{ marginTop: 10 }}>
                  You email three people for last week&apos;s numbers. One spreadsheet is out of date. By Wednesday you have a picture of last week.
                </p>
              </div>
              <div className="card">
                <span className="pill">After</span>
                <p style={{ marginTop: 10 }}>
                  You open your phone. Cash, jobs, and orders are already there — plus three action items with owners. Coffee isn&apos;t cold yet.
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <span className="pill navy">Your effort</span>
            <h3 style={{ margin: "14px 0 6px" }}>
              <Dots n={e.difficulty} /> {e.difficultyLabel}
            </h3>
            <dl className="est-grid" style={{ margin: "16px 0 20px" }}>
              <div>
                <dt>Your time</dt>
                <dd>{e.timeRequired}</dd>
              </div>
              <div>
                <dt>First dashboard</dt>
                <dd>{e.firstDashboard}</dd>
              </div>
              <div>
                <dt>Typical setup</dt>
                <dd className="tnum">{e.setup}</dd>
              </div>
              <div>
                <dt>Typical monthly</dt>
                <dd className="tnum">{e.monthly}</dd>
              </div>
            </dl>
            <CheckList items={e.checklist} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="See it" title="What your Workspace could look like." lead="Sample data sized for a small business. Switch industries to find yours." />
          <IndustryExplorer initialSize="small" />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Plans" title="Two plans built for your size." />
          <div className="grid g2">
            {tiers
              .filter((t) => t.id !== "command")
              .map((t) => (
                <div key={t.id} className={`card tier ${t.popular ? "popular" : ""}`}>
                  {t.popular && <span className="badge">Most popular</span>}
                  <h3>{t.name}</h3>
                  <div className="price">
                    <span className="big tnum">
                      {money(t.monthlyFrom)}
                      <span className="per">/mo</span>
                    </span>
                    <span className="per">+ {money(t.setupFrom)} setup</span>
                  </div>
                  <CheckList items={t.highlights} />
                </div>
              ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link href="/pricing">Compare every plan →</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Questions small businesses ask." />
          <Faq items={faq.smallBusiness} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
