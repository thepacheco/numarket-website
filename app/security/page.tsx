import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import SecureVault from "@/components/SecureVault";
import SecurityControls from "@/components/SecurityControls";
import SecurityLayers from "@/components/SecurityLayers";
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
  { q: "Where is my data stored?", a: "In your own dedicated account on Snowflake, an enterprise cloud data platform. If your company requires it to stay in your own cloud account, that's by request on Large." },
  { q: "How do you connect to our systems?", a: "Through the official connection your software already provides. You click “Allow,” and we get read-only access: it can copy data out, not change anything in your system." },
  { q: "Is anything stored on laptops?", a: "No. No client data is stored on laptops or personal devices." },
  { q: "What contracts do we sign?", a: "A Master Services Agreement with a data-ownership clause, plus a Data Processing Addendum." },
  { q: "What if there's an incident?", a: "We notify you within 72 hours of any confirmed security incident, with what happened and what we're doing about it." },
  { q: "How does leaving work?", a: "Within 30 days of the end of your contract: your data in open files (Parquet and CSV) in your own cloud storage, the structure, the cleaning rules, your app code, and your business definitions — or, where the database provider allows it, we move the whole database account into your name. No charge. Then we delete our copies and confirm in writing." },
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
        lead="You approve a read-only connection to each tool. Your data lands in a database that's yours alone."
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
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Three layers" title="Follow your data from your tools to our team." lead="The three places security questions come up, in the order your data travels." />
          <SecurityLayers />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Layers of protection" title="Tap a ring." />
          <SecureVault />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we actually do" title="The controls behind the promises." lead="Pick a category." />
          <SecurityControls />
        </div>
      </section>
      <section className="section soft">
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
