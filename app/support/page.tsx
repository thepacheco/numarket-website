import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { BubblesArt } from "@/components/HeroArts";
import { SupportForm } from "@/components/SupportParts";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Support", description: "Real people who know your data. How to reach us and how requests get resolved." };

const channels = [
  { icon: "mail", title: "Email", body: site.email, href: `mailto:${site.email}`, avail: "Every size", c: "var(--p-foundation)" },
  { icon: "phone", title: "Phone", body: site.phone, href: site.phoneHref, avail: "Every size · urgent issues", c: "var(--p-workspace)" },
  { icon: "chat", title: "Shared channel", body: "Slack or Teams, with your analyst in it", href: "#request", avail: "Mid and Large", c: "var(--p-insight)" },
];

const flow = [
  { icon: "send", t: "Tell us", d: "Email, call, or the form below.", time: "Any time", c: "var(--chaos)" },
  { icon: "target", t: "We look at it", d: "Urgent issues go first. You hear from a person, not a bot.", time: "Business hours", c: "var(--teal-700)" },
  { icon: "gear", t: "We fix it", d: "We trace it to the source and fix the cause, not the symptom.", time: "We tell you when", c: "var(--p-engineering)" },
  { icon: "check", t: "You confirm", d: "We show you the fix and add a check so it doesn't come back.", time: "Closed together", c: "var(--good)" },
];

const selfServe = [
  ["/docs/wrong-number", "A number looks wrong"],
  ["/docs/change-requests", "Request a change"],
  ["/docs/users", "Add or remove users"],
  ["/docs/sign-in", "Signing in"],
  ["/docs/alerts", "Set up an alert"],
  ["/docs/ask-your-data", "Ask Your Data tips"],
];

const levels = [
  { lv: "1", c: "var(--teal-700)", t: "Your analyst", d: "Most requests are resolved here." },
  { lv: "2", c: "var(--ink)", t: "Founder", d: `Still not right? Email ${site.email} with “Escalate” in the subject.` },
];

const supportFaq = [
  { q: "What counts as urgent?", a: "Your Workspace is down, or a number your team relies on today is clearly wrong. Call us for urgent issues." },
  { q: "Are change requests the same as support?", a: "No. Fixing something that's broken is always included. New dashboards, fields, or sources use your plan's monthly change hours — we tell you the estimate first." },
  { q: "What are business hours?", a: "Weekdays, Eastern Time. On Large, extended coverage can be agreed in the contract." },
  { q: "Can we talk to the same person every time?", a: "Yes. You have a named analyst who knows your data and your team." },
];

export default function Support() {
  return (
    <>
      <PageHero
        art={<BubblesArt />}
        eyebrow="Support"
        title={
          <>
            Real people who <em className="accent">know your data.</em>
          </>
        }
        lead="Not a ticket queue. The people who set up your Workspace answer."
      >
        <div className="btn-row">
          <a href="#request" className="btn btn-primary">
            Get help now
          </a>
          <a href={site.phoneHref} className="btn btn-secondary">
            Call {site.phone}
          </a>
        </div>
      </PageHero>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="sr-only">Ways to reach us</h2>
          <div className="channels stagger">
            {channels.map((c) => (
              <a key={c.title} href={c.href} className="channel" style={{ ["--cc" as string]: c.c }}>
                <span className="cic">
                  <Icon name={c.icon} />
                </span>
                <b>{c.title}</b>
                <span>{c.body}</span>
                <span className="avail">{c.avail}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="How it works" title="From “something's off” to fixed." center />
          <div className="flowline reveal">
            {flow.map((f) => (
              <div key={f.t} className="fstep" style={{ ["--fc" as string]: f.c }}>
                <span className="fic">
                  <Icon name={f.icon} />
                </span>
                <b>{f.t}</b>
                <span>{f.d}</span>
                <span className="ft">{f.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Guides" title="Look it up yourself." />
            <div className="selfserve stagger" style={{ gridTemplateColumns: "1fr" }}>
              {selfServe.map(([href, t]) => (
                <Link key={href} href={href}>
                  <Icon name="book" /> {t}
                  <Icon name="arrow" style={{ marginLeft: "auto" }} />
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              <Link href="/docs">All documentation →</Link> · <Link href="/status">System status →</Link>
            </p>
          </div>
          <div>
            <SectionHead eyebrow="Escalation" title="If it isn't resolved." />
            <ol className="escalate">
              {levels.map((l) => (
                <li key={l.lv}>
                  <span className="lv" style={{ ["--lc" as string]: l.c }}>
                    {l.lv}
                  </span>
                  <div>
                    <b>{l.t}</b>
                    <p>{l.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="request" style={{ scrollMarginTop: 80 }}>
        <div className="container split">
          <div>
            <SectionHead eyebrow="Clients" title="Send a support request." lead="The more specific, the faster we fix it." />
            <ul className="check-list">
              {["Which page and which number", "What you expected to see", "When you first noticed it"].map((t) => (
                <li key={t}>
                  <Icon name="check" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <SupportForm />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Support questions." />
          <Faq items={supportFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
