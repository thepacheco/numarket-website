import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import IndustryExplorer from "@/components/IndustryExplorer";
import { needLinks } from "@/components/nav-data";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { industries } from "@/content/industries";

export const metadata: Metadata = { title: "Solutions", description: "numarket by size, by industry, and by need." };

const needIcons = ["spreadsheet", "sparkle", "check", "layers"];
const needDemo = ["Collapse 5 file versions into one", "Ask AI on messy vs. clean data", "Make 3 reports agree", "Run a migration"];

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Pick your business. <em className="accent">See it work.</em>
          </>
        }
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <IndustryExplorer />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="By need" title="What are you trying to fix?" lead="Each one has its own hands-on demo." />
          <div className="grid g4 stagger">
            {needLinks.map((n, i) => (
              <Link key={n.href} href={n.href} className="card need-card">
                <div className="icon-badge">
                  <Icon name={needIcons[i]} />
                </div>
                <h3>{n.title}</h3>
                <p className="small">
                  <Icon name="play" width={12} height={12} style={{ display: "inline", marginRight: 6 }} />
                  {needDemo[i]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="By industry" title="Built around how you run." />
          <div className="ind-grid stagger">
            {industries.map((i) => (
              <Link key={i.slug} href={`/solutions/${i.slug}`} className="ind-card">
                <span className="ind-ic">
                  <Icon name={i.icon} />
                </span>
                <b>{i.short}</b>
                <span className="small muted">“{i.questions[0]}”</span>
              </Link>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 20 }}>
            Something else? <Link href="/contact">Ask us.</Link>
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
