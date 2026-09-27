import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CtaBand, FeatureCard, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Partners", description: "Your clients are asking about AI. Be the firm with an answer." };

const programs = [
  ["Referral", "You introduce, we sell and deliver.", "15–20% of first-year revenue"],
  ["Co-sell", "We pitch together.", "20–25% of first-year revenue"],
  ["White-label (by invitation)", "You sell under your brand, we deliver.", "Revenue share, typically 30%"],
];

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={
          <>
            Your clients are asking about AI. <em className="accent">Be the firm with an answer.</em>
          </>
        }
        lead="We deliver. You earn. You stay the trusted advisor."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <h2 className="sr-only">Who partners with us</h2>
        <div className="container grid g4 stagger">
          <FeatureCard icon="code" title="IT managed service providers" body="Clients are asking about AI. Now you have a data offering." />
          <FeatureCard icon="dollar" title="CPA & fractional CFO firms" body="Clean data makes your advisory more valuable." />
          <FeatureCard icon="layers" title="Software resellers & implementers" body="You install the systems. We make the data usable afterward." />
          <FeatureCard icon="chat" title="Industry consultants" body="You advise. We build." />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Programs" title="Three ways to work together." />
          <div className="grid g3">
            {programs.map(([n, h, e]) => (
              <div className="card" key={n}>
                <h3>{n}</h3>
                <p>{h}</p>
                <p style={{ marginTop: 12, fontWeight: 700, color: "var(--ink)" }}>You earn: {e}</p>
              </div>
            ))}
          </div>
          <div className="steps6" style={{ marginTop: 32, gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
            <div>
              <div className="n">1</div>
              <h3>Introduce</h3>
              <p>Tell us about a client who needs better data.</p>
            </div>
            <div>
              <div className="n">2</div>
              <h3>We deliver</h3>
              <p>We run the Readiness Check, the build, and the ongoing work.</p>
            </div>
            <div>
              <div className="n">3</div>
              <h3>You earn</h3>
              <p>Get paid on first-year revenue. Stay the trusted advisor.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="apply">
        <div className="container split">
          <SectionHead eyebrow="Partner inquiry" title="Let's talk." lead="We reply within 1 business day." />
          <ContactForm variant="partner" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
