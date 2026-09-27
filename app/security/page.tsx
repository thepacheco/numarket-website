import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import SecureVault from "@/components/SecureVault";
import { CtaBand, Faq, PageHero, SectionHead } from "@/components/ui";
import { faq } from "@/content/faq";

export const metadata: Metadata = { title: "Security & Trust", description: "Your data is yours. Private by design, least access, everything logged, and leave with everything." };

const promises = [
  { icon: "key", title: "Yours", body: "The contract says so." },
  { icon: "lock", title: "Private", body: "Your own encrypted database." },
  { icon: "users", title: "Least access", body: "Named accounts + multi-factor." },
  { icon: "file", title: "Logged", body: "Every login and change." },
  { icon: "own", title: "Portable", body: "Leave with everything in 30 days." },
];

const details = [
  { q: "Where is my data stored?", a: "In your own dedicated account on Snowflake, an enterprise cloud data platform. On Command, it can live in your own cloud instead." },
  { q: "How do you connect to our systems?", a: "Read-only wherever possible. We never need to change anything in your source systems." },
  { q: "Is anything stored on laptops?", a: "No. No client data is stored on laptops or personal devices." },
  { q: "What contracts do we sign?", a: "A Master Services Agreement with a data-ownership clause, plus a Data Processing Addendum." },
  { q: "Can you support healthcare data?", a: "Yes. A HIPAA-eligible configuration and a Business Associate Agreement are available on Command or on request." },
  { q: "What if there's an incident?", a: "We notify you within 72 hours of any confirmed security incident, with what happened and what we're doing about it." },
  { q: "How does leaving work?", a: "After your term: a full export (CSV or Parquet) or a complete account handover within 30 days, at no charge." },
];

export default function Security() {
  return (
    <>
      <PageHero
        eyebrow="Security & trust"
        title={
          <>
            Your data. <em className="accent">Your rules.</em>
          </>
        }
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <ul className="promise-row stagger">
            {promises.map((p) => (
              <li key={p.title}>
                <span className="icon-badge" style={{ margin: 0 }}>
                  <Icon name={p.icon} />
                </span>
                <b>{p.title}</b>
                <span className="small muted">{p.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Layers of protection" title="Tap a ring." />
          <SecureVault />
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div>
            <SectionHead eyebrow="The detail" title="Straight answers." />
            <p className="muted small">
              We don&apos;t claim certifications we don&apos;t hold. Snowflake&apos;s certifications, including SOC 2, belong to Snowflake as our platform provider. See
              the <Link href="/legal/dpa">DPA summary</Link>.
            </p>
          </div>
          <Faq items={[...details, ...faq.security]} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
