import Link from "next/link";
import Icon from "@/components/Icon";
import SolidsField from "@/components/solids/SolidsField";
import IndustryExplorer from "@/components/IndustryExplorer";
import ProductBento from "@/components/ProductBento";
import DataJourney from "@/components/DataJourney";
import MoneyStats from "@/components/MoneyStats";
import { CtaBand, Dots, PrimaryCta, SectionHead } from "@/components/ui";
import { sizes, tiers, money } from "@/content/tiers";

/* Hero visual: messy tiles tidy themselves into rows above a secure core. */
const tiles = [
  { l: 17, t: 10, x: -60, y: 90, r: -14 },
  { l: 42, t: 10, x: 110, y: 160, r: 11 },
  { l: 67, t: 10, x: -40, y: 250, r: -8 },
  { l: 17, t: 27, x: 150, y: -60, r: 16 },
  { l: 42, t: 27, x: -170, y: 40, r: -19 },
  { l: 67, t: 27, x: 40, y: -130, r: 9 },
  { l: 17, t: 44, x: 120, y: -150, r: -6 },
  { l: 42, t: 44, x: 190, y: -40, r: 22 },
  { l: 67, t: 44, x: -150, y: -110, r: -12 },
];

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
            <p className="lead">We pull your numbers into one private database, keep them clean, and give your team dashboards that update automatically, plus an analyst who tells you what to do next. One predictable monthly fee.</p>
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
          <div className="journey" role="img" aria-label="Scattered files becoming organized rows of clean data above a secure database.">
            {tiles.map((t, i) => (
              <div
                key={i}
                className="tile clean"
                style={
                  {
                    left: `${t.l}%`,
                    top: `${t.t}%`,
                    "--x0": `${t.x}%`,
                    "--y0": `${t.y}%`,
                    "--r0": `${t.r}deg`,
                    "--x1": "0%",
                    "--y1": "0%",
                    animationDelay: `${i * 0.08}s`,
                  } as React.CSSProperties
                }
              >
                <i style={{ width: "80%" }} />
                <i style={{ width: "55%" }} />
                <i style={{ width: "68%" }} />
              </div>
            ))}
            <div className="core">
              <div>
                <Icon name="lock" />
                YOUR PRIVATE
                <br />
                DATABASE
              </div>
            </div>
            <div className="journey-label">
              <span>Scattered → </span>
              <b>Cleaned · Secured · Yours</b>
            </div>
          </div>
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
            lead="Four parts, one monthly fee. Tap one for a quick look."
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
            lead="Sample numbers that add up. Filter anything."
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
          <SectionHead eyebrow="Pricing" title="Clear pricing, published up front." lead="Each product has its own price. Take all three as a plan and save about 10%." />
          <div className="grid g3 stagger">
            {tiers.map((t) => (
              <Link href="/pricing" key={t.id} className={`card tier ${t.popular ? "popular" : ""}`}>
                {t.popular && <span className="badge">Most popular</span>}
                <div>
                  <h3>{t.name}</h3>
                  <p className="small">
                    {sizes.find((s) => s.id === t.size)!.name} · {sizes.find((s) => s.id === t.size)!.sources.toLowerCase()}
                  </p>
                </div>
                <div className="price">
                  <span className="per">From</span>
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
            <Link href="/pricing#how-it-runs" className="more">
              See exactly what the monthly fee pays for →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
