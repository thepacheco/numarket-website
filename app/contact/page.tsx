import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — Get a Free Readiness Check",
  description: "Book a free 30-minute AI Readiness Check, or send us a note. We reply within 1 business day.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Free Readiness Check"
        title={
          <>
            Let&apos;s see how ready <em className="accent">your data</em> is.
          </>
        }
        lead={`30 minutes. Free. We reply within ${site.responseTime}.`}
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div style={{ display: "grid", gap: 20 }}>
            {site.calendlyUrl ? (
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <iframe src={site.calendlyUrl} title="Book a Readiness Check" style={{ width: "100%", height: 680, border: 0 }} loading="lazy" />
              </div>
            ) : (
              <div className="card">
                <h2 className="tier-name">What you get in 30 minutes</h2>
                <ul className="check-list" style={{ marginTop: 14 }}>
                  {[
                    "A readiness score from 1 (Scattered) to 5 (AI-ready)",
                    "3 specific findings about your data",
                    "A rough idea of cost and timeline to fix them",
                    "No pitch deck. No obligation.",
                  ].map((t) => (
                    <li key={t}>
                      <Icon name="check" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="card">
              <h2 className="tier-name">Prefer to talk now?</h2>
              <p style={{ marginTop: 10, display: "grid", gap: 8 }}>
                <a href={site.phoneHref} style={{ display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 600 }}>
                  <Icon name="phone" width={18} height={18} /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} style={{ display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 600 }}>
                  <Icon name="mail" width={18} height={18} /> {site.email}
                </a>
              </p>
              <p className="small" style={{ marginTop: 12 }}>
                Based in {site.city}. Serving clients nationally.
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
