import Link from "next/link";
import Icon from "@/components/Icon";
import IndustryExplorer from "@/components/IndustryExplorer";
import { CtaBand, Dots, FeatureCard, PrimaryCta, SectionHead } from "@/components/ui";
import { steps } from "@/content/steps";
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

const why = [
  { icon: "clean", title: "We fix the foundation, not just the view.", body: "Dashboards on messy data are a Band-Aid. We clean it first." },
  { icon: "key", title: "You own it.", body: "No lock-in. Leave any time after your term with a clean database." },
  { icon: "users", title: "Built for your size.", body: "Simple and affordable for a 20-person company. Flexible enough for a large company's platform." },
  { icon: "chat", title: "People, not just software.", body: "A real analyst reviews your numbers and tells you what to do." },
  { icon: "spreadsheet", title: "Replace the spreadsheet shuffle.", body: "Your team enters data once, in one place. Everyone sees the same numbers." },
  { icon: "sparkle", title: "Ready for AI.", body: "Ask questions in plain English today. Plug in any AI tool tomorrow." },
];

const scenarios = [
  {
    who: "A regional general contractor",
    before: "Job costs lived in Excel, QuickBooks, and Procore. PMs rebuilt the same budget report every Friday, and overruns showed up at month-end.",
    after: "One Workspace shows every job's budget vs. actual as it happens. Supers log progress from a phone. The owner gets a short list of jobs to look at every Monday.",
  },
  {
    who: "A multi-site clinic group",
    before: "Staffing lived in spreadsheets and visits lived in the scheduling system. Nobody could see a short-staffed clinic until patients were already waiting.",
    after: "Managers see staffing gaps before the schedule is posted, next to wait times and denied claims — in one place.",
  },
  {
    who: "A professional services firm",
    before: "Hours, billing, and collections were in three systems. Partners found out about unbilled time at quarter-end.",
    after: "Partners see utilization, unbilled hours, and cash weekly, with the reasons time went unbilled.",
  },
];

export default function Home() {
  const small = effort[0];
  const large = effort[2];
  return (
    <>
      {/* 1. HERO */}
      <section className="hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Trust the Data.</span>
            <h1>
              Your data, <em className="accent">cleaned up</em> and working for you.
            </h1>
            <p className="lead">
              We gather your data from everywhere it lives, clean it, store it securely, and give your team live dashboards, simple apps, and
              clear next steps. Get ready for AI — without the headache.
            </p>
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
                <Icon name="clock" /> Live in weeks, not months
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

      {/* 2. PROBLEM */}
      <section className="section-tight">
        <div className="container">
          <div className="grid g3">
            <FeatureCard icon="spreadsheet" title="Your numbers live in 12 spreadsheets." body="Different versions, emailed around, rebuilt every week by hand." />
            <FeatureCard icon="alert" title="Nobody trusts the reports." body="Finance says one thing, operations says another. Meetings turn into arguments about whose number is right." />
            <FeatureCard icon="sparkle" title="Everyone says “use AI.” The data isn’t ready." body="AI is only as good as the data under it. On messy data it gives confident wrong answers." />
          </div>
        </div>
      </section>

      {/* 3. THE DATA JOURNEY */}
      <section className="section dark" id="journey">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Six steps from scattered to <em className="accent">sure.</em>
              </>
            }
            lead="We fix the foundation first — so when you use AI, it's actually right. Every client, every industry, the same six steps."
          />
          <div className="steps6">
            {steps.map((s) => (
              <div key={s.key}>
                <div className="n">STEP {s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.plain}</p>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <Link href="/how-it-works" className="btn btn-secondary">
              See the full walkthrough
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PICK YOUR BUSINESS */}
      <section className="section" id="pick-your-business">
        <div className="container">
          <SectionHead
            eyebrow="Pick your business"
            title={
              <>
                See what <em className="accent">your</em> numbers would look like.
              </>
            }
            lead="Pick an industry and a company size. Everything below changes: where the data lives, the dashboard, the questions it answers, and the action item. Filter it — every number is calculated from the same sample records, so it always adds up."
          />
          <IndustryExplorer syncUrl />
        </div>
      </section>

      {/* 6. TWO PATHS */}
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Two paths" title="Built for your size." center />
          <div className="grid g2">
            <Link href="/solutions/small-business" className="card">
              <div className="icon-badge">
                <Icon name="sprout" />
              </div>
              <span className="pill">10–250 employees</span>
              <h3 style={{ marginTop: 14 }}>Small & growing businesses</h3>
              <p>We host it, run it, and explain it. Very easy to start. About {small.timeRequired.replace("~", "").replace(" total", "")} of your time.</p>
              <span className="more">The data team you don&apos;t have to hire →</span>
            </Link>
            <Link href="/solutions/enterprise" className="card">
              <div className="icon-badge">
                <Icon name="building" />
              </div>
              <span className="pill navy">250+ employees</span>
              <h3 style={{ marginTop: 14 }}>Larger organizations</h3>
              <p>Your platform or ours. We work with IT, not against it — and make the investment you already made pay off.</p>
              <span className="more">Make your data ready for AI →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. HOW HARD / LONG / MUCH */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Before you ever get on a call"
            title={
              <>
                How hard. How long. <em className="accent">How much.</em>
              </>
            }
          />
          <div className="table-wrap">
            <table className="t">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {effort.map((e) => (
                    <th scope="col" key={e.id}>
                      {e.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Difficulty for you</th>
                  {effort.map((e) => (
                    <td key={e.id}>
                      <Dots n={e.difficulty} /> <span style={{ marginLeft: 6 }}>{e.difficultyLabel}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Your time required</th>
                  {effort.map((e) => (
                    <td key={e.id}>{e.timeRequired}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Time to first dashboard</th>
                  {effort.map((e) => (
                    <td key={e.id}>{e.firstDashboard}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Typical setup</th>
                  {effort.map((e) => (
                    <td key={e.id} className="tnum">
                      {e.setup}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Typical monthly</th>
                  {effort.map((e) => (
                    <td key={e.id} className="tnum">
                      {e.monthly}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="btn-row" style={{ marginTop: 24 }}>
            <Link href="/getting-started" className="btn btn-secondary">
              Get your estimate in 60 seconds
            </Link>
            <span className="muted small">
              Large organizations: {large.firstDashboard} to first dashboard.
            </span>
          </div>
        </div>
      </section>

      {/* 8. WHY */}
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Why numarket" title="A data department, without building one." />
          <div className="grid g3">
            {why.map((w) => (
              <FeatureCard key={w.title} icon={w.icon} title={w.title} body={w.body} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICING TEASER */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Clear pricing. No surprise bills." lead="A one-time setup and a monthly subscription. Published starting prices. Fixed quotes after your Readiness Check." />
          <div className="grid g3">
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

      {/* 10. PROOF — illustrative only until real, permissioned case studies exist */}
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="What changes" title="Before and after." lead="These are illustrative scenarios based on typical engagements — not named clients." />
          <div className="grid g3">
            {scenarios.map((s) => (
              <div className="card" key={s.who}>
                <span className="label-sample">Illustrative scenario</span>
                <h3 style={{ marginTop: 14 }}>{s.who}</h3>
                <p style={{ marginTop: 10 }}>
                  <strong style={{ color: "var(--ink)" }}>Before:</strong> {s.before}
                </p>
                <p style={{ marginTop: 10 }}>
                  <strong style={{ color: "var(--ink)" }}>After:</strong> {s.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
