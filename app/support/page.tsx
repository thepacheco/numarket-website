import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Support", description: "How to get help, and how fast we respond on each plan." };

export default function Support() {
  return (
    <>
      <PageHero eyebrow="Support" title="Help when you need it." lead="Clients get a real person who knows their data." />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid g3 stagger">
            <div className="card">
              <h3>Email</h3>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="card">
              <h3>Phone</h3>
              <p>
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
            </div>
            <div className="card">
              <h3>Shared channel</h3>
              <p>Operate and Command clients get a shared Slack or Teams channel.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Response targets" title="How fast we respond." />
          <div className="table-wrap">
            <table className="t">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Insight</th>
                  <th scope="col">Operate</th>
                  <th scope="col">Command</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Business-hours response</th>
                  <td>1 business day</td>
                  <td>4 business hours</td>
                  <td>2 hours</td>
                </tr>
                <tr>
                  <th scope="row">Urgent issue (app down)</th>
                  <td>Same business day</td>
                  <td>4 hours</td>
                  <td>1 hour</td>
                </tr>
                <tr>
                  <th scope="row">Channels</th>
                  <td>Email</td>
                  <td>Email, phone, shared channel</td>
                  <td>Dedicated analyst, all channels</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 20 }}>
            Need a change? See <Link href="/docs#change-requests">how to request a change</Link>. Checking on the platform? See <Link href="/status">System Status</Link>.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
