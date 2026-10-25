import Link from "next/link";
import Icon from "@/components/Icon";
import SolidsField from "@/components/solids/SolidsField";
import HeroFlow from "@/components/HeroFlow";
import IndustryExplorer from "@/components/IndustryExplorer";
import ProductBento from "@/components/ProductBento";
import DataJourney from "@/components/DataJourney";
import MoneyStats from "@/components/MoneyStats";
import { CtaBand, Dots, PrimaryCta, SectionHead } from "@/components/ui";
import { sizes, tiers, money } from "@/content/tiers";

const problems = [
  { icon: "spreadsheet", text: "Numbers in 12 spreadsheets" },
  { icon: "alert", text: "Reports that don't agree" },
  { icon: "sparkle", text: "“Use AI” — on data that isn't ready" },
];


export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <SolidsField textZone="left" seed={3} />
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Your outside data team</span>
            <h1>
              The data team you <em className="accent">don&apos;t have to hire.</em>
            </h1>
            <p className="lead">Clean data, dashboards that update on their own, and an analyst who tells you what to do next. One monthly fee.</p>
            <div className="btn-row">
              <PrimaryCta />
              <Link href="#journey" className="btn btn-secondary">
                See how it works
              </Link>
            </div>
            <ul className="trust-strip">
              <li>
                <Icon name="key" /> You own your data
              </li>
              <li>
                <Icon name="check" /> No new software to buy
              </li>
              <li>
                <Icon name="clock" /> Up and running in weeks
              </li>
            </ul>
          </div>
          <HeroFlow />
        </div>
      </section>

      {/* PROBLEM — one line, not a wall */}
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <ul className="problem-strip stagger">
            {problems.map((p) => (
              <li key={p.text}>
                <span className="icon-badge" style={{ margin: 0 }}>
                  <Icon name={p.icon} />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRODUCTS — each with its own object */}
      <section className="section soft">
        <div className="container">
          <SectionHead
            eyebrow="What you get"
            title={
              <>
                Everything a data team does. <em className="accent">Done for you.</em>
              </>
            }
            lead="Three products on one monthly fee, plus custom apps when you need them. Tap one for a quick look."
          />
          <ProductBento />
        </div>
      </section>

      {/* THE DATA JOURNEY — scroll-driven 3D */}
      <div id="journey">
        <div className="container" style={{ paddingTop: 72 }}>
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                From scattered to <em className="accent">sure</em>, in six steps.
              </>
            }
            lead="Scroll. This is what happens to your data."
          />
        </div>
        <DataJourney />
      </div>

      {/* PICK YOUR BUSINESS */}
      <section className="section" id="pick-your-business">
        <div className="container">
          <SectionHead
            eyebrow="See it"
            title={
              <>
                Pick your business. <em className="accent">Get the dashboard.</em>
              </>
            }
          />
          <IndustryExplorer syncUrl />
        </div>
      </section>

      {/* WHAT IT'S WORTH */}
      <section className="section soft" id="savings">
        <div className="container">
          <SectionHead
            eyebrow="What it's worth"
            title={
              <>
                Messy data costs <em className="accent">real money.</em>
              </>
            }
            lead="What a typical small company in each industry loses a year. Tap yours for the math."
          />
          <MoneyStats />
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Who it's for" title="Built for your size." center />
          <div className="grid g2 stagger">
            <Link href="/solutions/small-business" className="card path-card">
              <div className="path-top">
                <div className="icon-badge">
                  <Icon name="sprout" />
                </div>
                <span className="pill">10–250 employees</span>
              </div>
              <h3>Small & growing</h3>
              <p>We host it, run it, and explain it.</p>
              <dl className="path-stats">
                <div>
                  <dt>Effort</dt>
                  <dd>
                    <Dots n={1} /> Very easy
                  </dd>
                </div>
                <div>
                  <dt>Up and running in</dt>
                  <dd>2–3 weeks</dd>
                </div>
              </dl>
              <span className="more">The data team you don&apos;t have to hire →</span>
            </Link>
            <Link href="/solutions/enterprise" className="card path-card">
              <div className="path-top">
                <div className="icon-badge">
                  <Icon name="building" />
                </div>
                <span className="pill navy">250+ employees</span>
              </div>
              <h3>Larger organizations</h3>
              <p>Your platform or ours. We work with IT.</p>
              <dl className="path-stats">
                <div>
                  <dt>Effort</dt>
                  <dd>
                    <Dots n={3} /> Moderate
                  </dd>
                </div>
                <div>
                  <dt>Up and running in</dt>
                  <dd>6–10 weeks</dd>
                </div>
              </dl>
              <span className="more">Work inside your platform →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Clear pricing, published up front." lead="Priced by size and by product. The total is exactly the sum, line by line." />
          <div className="grid g3 stagger">
            {tiers.map((t) => (
              <Link href="/pricing" key={t.id} className={`card tier ${t.popular ? "popular" : ""}`}>
                <div>
                  <h3>{t.name}</h3>
                  <p className="small">
                    {sizes.find((s) => s.id === t.size)!.sources} · {sizes.find((s) => s.id === t.size)!.users.toLowerCase()}
                  </p>
                </div>
                <div className="price">
                  {t.from && <span className="per">From</span>}
                  <span className="big tnum">
                    {money(t.monthlyFrom)}
                    <span className="per">/mo</span>
                  </span>
                  <span className="per">+ {money(t.setupFrom)} setup</span>
                </div>
                <span className="more">All three products · see what’s included →</span>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/pricing" className="more">
              See every line of the price →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
