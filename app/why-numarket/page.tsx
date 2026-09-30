import type { Metadata } from "next";
import { CtaBand, FeatureCard, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Why numarket", description: "Bigger than a freelancer. Far easier and cheaper than a big-firm transformation." };

const points = [
  ["clean", "We fix the foundation, not just the view.", "Dashboards on messy data are a Band-Aid. We clean it first."],
  ["key", "You own your data.", "No lock-in. Leave with your data, cleaning rules, apps, and dictionary."],
  ["users", "Built for your size.", "Simple and affordable for a 20-person company. Flexible enough to work inside a large company's platform."],
  ["chat", "People, not just software.", "A real analyst reviews your numbers and tells you what to do."],
  ["spreadsheet", "Replace the spreadsheet shuffle.", "Your team enters data once, in one place, and everyone sees the same numbers."],
  ["sparkle", "Ready for AI.", "Ask questions in plain English today. Plug in any AI tool tomorrow."],
  ["dollar", "Clear pricing.", "Every product has a published price. Fixed setup quotes. No surprise bills."],
];

const cols = ["numarket", "Hire in-house", "Big consulting firm", "DIY software"];
const rows: [string, string[]][] = [
  ["Cost", ["Priced by product; plans from $2,500/mo + setup", "$85K–$110K/yr per analyst + tools", "$150K–$500K+", "Licenses + your team's time"]],
  ["Time to value", ["2–10 weeks", "Months to hire and ramp", "Months", "Depends on your team"]],
  ["Who cleans the data", ["We do", "Your hire (if they can)", "They do, once", "You do"]],
  ["Who explains it", ["An analyst, every month", "Your hire", "A final presentation", "Nobody"]],
  ["Lock-in", ["None — you own your data", "Knowledge leaves with the person", "Often", "Vendor lock-in"]],
  ["AI-ready", ["Yes, by design", "Maybe", "Yes, at a price", "Rarely"]],
];

export default function Why() {
  return (
    <>
      <PageHero
        eyebrow="Why numarket"
        title={
          <>
            The data department for companies <em className="accent">that don&apos;t have one.</em>
          </>
        }
        lead="Bigger than a freelancer. Easier than a big firm."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="sr-only">Your options, side by side</h2>
          <div className="table-wrap why-table">
            <table className="t">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {cols.map((c, i) => (
                    <th scope="col" key={c} className={i === 0 ? "hl" : ""}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, vals]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {vals.map((v, i) => (
                      <td key={i} className={i === 0 ? "hl" : ""}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="The short version" title="Seven reasons." />
        </div>
        <div className="container grid g3 stagger">
          {points.map(([i, t, b]) => (
            <FeatureCard key={t} icon={i} title={t} body={b} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
