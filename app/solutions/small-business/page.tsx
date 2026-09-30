import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBand, Dots, Faq, PageHero, SectionHead } from "@/components/ui";
import IndustryExplorer from "@/components/IndustryExplorer";
import MondayPhone from "@/components/MondayPhone";
import { effort } from "@/content/effort";
import { tiers, money } from "@/content/tiers";
import { faq } from "@/content/faq";
import { WorkspaceArt } from "@/components/ProductArt";

export const metadata: Metadata = { title: "Small & Growing Businesses", description: "The data team you don't have to hire. We host it, run it, and explain it." };

export default function SmallBusiness() {
  const e = effort[0];
  return (
    <>
      <PageHero
        art={<WorkspaceArt />}
        eyebrow="Small & growing businesses"
        title={
          <>
            The data team you <em className="accent">don&apos;t have to hire.</em>
          </>
        }
        lead="We host it, run it, and explain it — for less than one hire."
      >
        <Link href="/getting-started#estimator" className="more">
          Estimate your cost and timeline →
        </Link>
      </PageHero>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div>
            <SectionHead eyebrow="Monday, 7:30 a.m." title="Your week, before coffee." lead="Flip between before and after." />
            <div className="card">
              <span className="pill navy">Your effort</span>
              <div className="effort-row" style={{ margin: "12px 0" }}>
                <Dots n={e.difficulty} /> <b>{e.difficultyLabel}</b> · {e.timeRequired}
              </div>
              <CheckList items={e.checklist} />
            </div>
          </div>
          <MondayPhone />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="See it" title="Sized for a small business." />
          <IndustryExplorer initialSize="small" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Plans" title="Two plans built for your size." />
          <div className="grid g2 stagger">
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
                  <CheckList items={[...t.includes.foundation.slice(0, 2), ...t.includes.workspace.slice(0, 2), t.includes.insight[0]]} />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Questions owners ask." />
          <Faq items={faq.smallBusiness} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
