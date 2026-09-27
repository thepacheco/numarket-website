import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { faq } from "@/content/faq";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Trust",
  description: "Your data is yours. Private by design, least access, everything logged, and leave with everything.",
};

const promises = [
  { icon: "key", title: "Your data is yours.", body: "The contract says so. Always." },
  { icon: "lock", title: "Private by design.", body: "Every client gets their own separate, encrypted database. Your data is never mixed with anyone else's." },
  { icon: "users", title: "Least access.", body: "We only access what we need, through named accounts with multi-factor sign-in." },
  { icon: "file", title: "Everything logged.", body: "Every change and every login is recorded." },
  { icon: "own", title: "Leave with everything.", body: "After your term, a full export or account handover within 30 days." },
];

const details = [
  { h: "Where your data is stored", b: "In your own dedicated account on Snowflake, an enterprise-grade cloud data platform. On Command, it can live in your own cloud instead." },
  { h: "Encryption", b: "Your data is encrypted at rest and in transit." },
  { h: "Access control", b: "You decide who sees what. Access is role-based, with multi-factor sign-in for every named account." },
  { h: "Logging", b: "Every login and every change is recorded in an audit log." },
  { h: "Connections to your systems", b: "Read-only wherever possible. We never need to change anything in your source systems." },
  { h: "Devices", b: "No client data is stored on laptops or personal devices." },
  { h: "Healthcare", b: "HIPAA-eligible configuration and a Business Associate Agreement are available on Command or on request." },
  { h: "Contracts", b: "Every engagement includes a Master Services Agreement with a data-ownership clause and a Data Processing Addendum." },
  { h: "Incident response", b: "We notify you within 72 hours of any confirmed security incident, with what happened and what we're doing about it." },
  { h: "Leaving", b: "Full export (CSV or Parquet) or a complete account handover within 30 days of exit, at no charge." },
];

export default function Security() {
  return (
    <>
      <PageHero
        eyebrow="Security & trust"
        title={
          <>
            Your data. <em className="accent">Your rules.</em> Always.
          </>
        }
        lead="Five plain-language promises, and the detail behind each one."
      />
      <section className="section dark">
        <div className="container">
          <div className="vault" aria-hidden="true">
            <span className="ring r1" />
            <span className="ring r2" />
            <span className="ring r3" />
            <span className="ring r4" />
            <span className="vault-core">
              <Icon name="database" />
            </span>
          </div>
          <div className="grid g3" style={{ marginTop: 8 }}>
            {promises.map((p, i) => (
              <div key={p.title} className="card">
                <div className="icon-badge" style={{ background: "rgba(128,237,153,.1)", borderColor: "rgba(128,237,153,.3)", color: "var(--light-green)" }}>
                  <Icon name={p.icon} />
                </div>
                <h3>
                  {i + 1}. {p.title}
                </h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The detail" title="How it actually works." />
          <div className="grid g2">
            {details.map((d) => (
              <div key={d.h} className="card">
                <h3>{d.h}</h3>
                <p>{d.b}</p>
              </div>
            ))}
          </div>
          <p className="muted small" style={{ marginTop: 24 }}>
            numarket does not claim certifications it does not hold. Snowflake&apos;s own certifications, including SOC 2, belong to Snowflake as our platform
            provider. Our Data Processing Addendum is summarized on the <Link href="/legal/dpa">DPA page</Link>.
          </p>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Security questions." />
          <Faq items={faq.security} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
