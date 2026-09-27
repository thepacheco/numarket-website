import Link from "next/link";
import Icon from "@/components/Icon";
import IndustryExplorer from "@/components/IndustryExplorer";
import ProductBento from "@/components/ProductBento";
import StepScene from "@/components/StepScene";
import WorkspaceDemo from "@/components/WorkspaceDemo";
import { CtaBand, Dots, PrimaryCta, SectionHead } from "@/components/ui";
import { tiers, money } from "@/content/tiers";
import { effort } from "@/content/effort";

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

const scenarios = [
  { who: "Regional contractor", before: "Friday budget reports rebuilt by hand", after: "Every job's budget, live, every morning" },
  { who: "Multi-site clinic group", before: "Staffing gaps found when patients wait", after: "Gaps seen before the schedule posts" },
  { who: "Professional services firm", before: "Unbilled time found at quarter-end", after: "Utilization and cash, weekly" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Trust the Data.</span>
            <h1>
              Your data, <em className="accent">cleaned up</em> and working for you.
            </h1>
            <p className="lead">We gather it, clean it, secure it, and turn it into live dashboards and clear next steps. Ready for AI — and you own all of it.</p>
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
                <Icon name="clock" /> Live in weeks
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

      {/* THE SIX STEPS — one scene that changes per step */}
      <section className="section" id="journey">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Six steps from scattered to <em className="accent">sure.</em>
              </>
            }
          />
          <StepScene />
        </div>
      </section>

      {/* PRODUCTS — each with its own object */}
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Products" title="Four pieces. One foundation." lead="Tap a product to take a quick look." />
          <ProductBento />
        </div>
      </section>

      {/* PICK YOUR BUSINESS */}
      <section className="section" id="pick-your-business">
        <div className="container">
          <SectionHead
            eyebrow="Pick your business"
            title={
              <>
                See what <em className="accent">your</em> numbers would look like.
              </>
            }
            lead="Switch industries. Filter it. Every number adds up."
          />
          <IndustryExplorer syncUrl />
        </div>
      </section>

      {/* WORKSPACE DEMO */}
      <section className="section soft" id="try-it">
        <div className="container">
          <SectionHead
            eyebrow="Try it"
            title={
              <>
                Your team doesn&apos;t just look at data. <em className="accent">They work in it.</em>
              </>
            }
            lead="Change a number and watch the dashboard react. Or ask a question."
          />
          <WorkspaceDemo />
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Two paths" title="Built for your size." center />
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
                  <dt>Live in</dt>
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
                  <dt>Live in</dt>
                  <dd>6–10 weeks</dd>
                </div>
              </dl>
              <span className="more">Make your data AI-ready →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW HARD / LONG / MUCH — cards, not a table */}
      <section className="section soft">
        <div className="container">
          <SectionHead
            eyebrow="Before you ever call"
            title={
              <>
                How hard. How long. <em className="accent">How much.</em>
              </>
            }
          />
          <div className="grid g3 stagger">
            {effort.map((e) => (
              <div className="card effort-card" key={e.id}>
                <span className="pill navy">{e.label}</span>
                <div className="effort-row">
                  <Dots n={e.difficulty} /> <b>{e.difficultyLabel}</b>
                </div>
                <dl className="est-grid">
                  <div>
                    <dt>Your time</dt>
                    <dd>{e.timeRequired.replace(" total", "")}</dd>
                  </div>
                  <div>
                    <dt>First dashboard</dt>
                    <dd>{e.firstDashboard}</dd>
                  </div>
                  <div>
                    <dt>Setup</dt>
                    <dd className="tnum">{e.setup}</dd>
                  </div>
                  <div>
                    <dt>Monthly</dt>
                    <dd className="tnum">{e.monthly}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 24 }}>
            <Link href="/getting-started#estimator" className="btn btn-secondary">
              Get your estimate in 60 seconds
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Clear pricing. No surprise bills." />
          <div className="grid g3 stagger">
            {tiers.map((t) => (
              <Link href="/pricing" key={t.id} className={`card tier ${t.popular ? "popular" : ""}`}>
                {t.popular && <span className="badge">Most popular</span>}
                <div>
                  <h3>{t.name}</h3>
                  <p className="small">{t.bestFor}</p>
                </div>
                <div className="price">
                  <span className="per">From</span>
                  <span className="big tnum">
                    {money(t.monthlyFrom)}
                    <span className="per">/mo</span>
                  </span>
                  <span className="per">+ {money(t.setupFrom)} setup</span>
                </div>
                <span className="more">Compare plans →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER — illustrative only */}
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="What changes" title="Before and after." lead="Illustrative scenarios — not named clients." />
          <div className="grid g3 stagger">
            {scenarios.map((s) => (
              <div className="card ba-card" key={s.who}>
                <span className="label-sample">Illustrative</span>
                <h3 style={{ marginTop: 12 }}>{s.who}</h3>
                <div className="ba">
                  <span className="ba-before">{s.before}</span>
                  <Icon name="arrow" className="ba-arrow" />
                  <span className="ba-after">{s.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
