import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "System Status", description: "Status of numarket client services.", robots: { index: false } };

const components = ["Client Workspaces", "Data refresh (automatic updates)", "Ask Your Data", "Website"];

export default function Status() {
  return (
    <>
      <PageHero eyebrow="System status" title="Platform status" lead="Live status will appear here once our monitoring service is connected. We never show uptime numbers that aren't measured." />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="table-wrap">
            <table className="t" style={{ minWidth: 0 }}>
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {components.map((c) => (
                  <tr key={c}>
                    <th scope="row">{c}</th>
                    <td className="muted">Monitoring not yet connected</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 20 }}>
            Clients: if something looks wrong, email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
