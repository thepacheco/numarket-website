import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const dynamicParams = false;

type Doc = { title: string; lead: string; sections: [string, string][] };

const docs: Record<string, Doc> = {
  terms: {
    title: "Terms of Service",
    lead: "The terms for using the numarket.us website.",
    sections: [
      ["Acceptance", "By using this website you agree to these terms. If you don't agree, please don't use the site."],
      ["Use of the site", "You may browse the site and use its tools for your own business evaluation. Don't misuse it, attempt to break it, or scrape it."],
      ["Demos and estimates", "Demos use sample data and are not advice. Estimates from the Getting Started tools are illustrative only; a fixed quote follows a Readiness Check."],
      ["Intellectual property", "The site's content, design, and code belong to numarket LLC unless noted otherwise."],
      ["No warranty", "The site is provided “as is,” without warranties of any kind."],
      ["Limitation of liability", "To the fullest extent allowed by law, numarket is not liable for indirect or consequential damages arising from use of the site."],
      ["Client engagements", "Client work is governed by a separate signed Master Services Agreement, not these terms."],
      ["Governing law", "These terms are governed by the laws of the State of Georgia."],
      ["Contact", `Questions: ${site.email}.`],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lead: "What we collect on this website, why, and your choices.",
    sections: [
      ["What we collect", "What you type into our forms (name, work email, company, and the details you choose to share), and cookieless, aggregated site analytics."],
      ["How we use it", "To respond to you, prepare proposals, and improve the site."],
      ["No sale of personal information", "We do not sell your personal information."],
      ["Cookies", "Our analytics are cookieless. We do not use advertising cookies."],
      ["Service providers", "We use providers for hosting, scheduling, email, and form storage. They process data only on our behalf."],
      ["Retention", "We keep inquiry information only as long as needed for the purposes above, or as required by law."],
      ["Your rights", "You can ask to access, correct, or delete your information, subject to applicable state privacy laws."],
      ["Security", "We protect information with reasonable administrative, technical, and physical safeguards."],
      ["Children", "This site is not directed to children under 13."],
      ["Changes", "We'll post updates here with a new effective date."],
      ["Contact", `Privacy requests: ${site.email}.`],
    ],
  },
  dpa: {
    title: "Data Processing Addendum",
    lead: "A summary of how we handle client data. The full DPA is provided with every contract.",
    sections: [
      ["Roles", "The client owns its data (controller). numarket processes it on the client's behalf (processor)."],
      ["Purpose limitation", "We process client data only to deliver the services in the contract."],
      ["Confidentiality", "Everyone with access is bound by confidentiality obligations."],
      ["Subprocessors", "Snowflake (data platform), cloud hosting, and data connector providers. A current list is provided with the contract."],
      ["Security measures", "Dedicated encrypted database per client, role-based access, multi-factor sign-in, and audit logging."],
      ["Breach notification", "We notify the client within 72 hours of a confirmed security incident."],
      ["Return and deletion", "At termination, full export or account handover within 30 days, then deletion on request."],
      ["Audit rights", "Clients may request reasonable information to verify compliance."],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const d = docs[(await params).doc];
  return d ? { title: d.title, robots: { index: false } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const d = docs[(await params).doc];
  if (!d) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={d.title} lead={d.lead} />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container prose">
          <p className="notice" style={{ marginBottom: 28 }}>
            Draft — pending attorney review before publication.
          </p>
          {d.sections.map(([h, b]) => (
            <div key={h}>
              <h2>{h}</h2>
              <p>{b}</p>
            </div>
          ))}
          <p className="muted small" style={{ marginTop: 32 }}>
            © {site.year} {site.legalName} · {site.city}
          </p>
        </div>
      </section>
    </>
  );
}
