import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "System Status", description: "Status of numarket client services.", robots: { index: false } };

const components = ["Client Workspaces", "Data refresh (automatic updates)", "Ask Your Data", "Website"];

export default function Status() {
  return (
    <>
      <PageHero eyebrow="For clients" title="Is my Workspace working?" lead="This page will show, live, whether client Workspaces, data updates, and Ask Your Data are running. It turns on with automated monitoring when the first client goes live — until then, we show nothing rather than made-up numbers." />
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
