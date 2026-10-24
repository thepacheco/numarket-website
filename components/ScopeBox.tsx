import SolidIcon from "./solids/SolidIcon";
import { engineering, money } from "@/content/tiers";

/* Where one product ends and the next begins, in one box.
   Foundation vs. Engineering (Operating Decisions v2.2, §1) and
   Workspace vs. Engineering (Site Revisions v2.1, 1.1). */
type K = "foundation" | "workspace" | "engineering";

const info: Record<K, { name: string; tag: string; body: string; foot: string }> = {
  foundation: {
    name: "Foundation",
    tag: "Cleans data that's already digital",
    body: "We connect the systems and spreadsheets you already use, clean and match what's in them, and keep it updated in your private database.",
    foot: "Monthly. Priced by how many sources you have.",
  },
  workspace: {
    name: "Workspace",
    tag: "Configured, not built",
    body: "We pick from a library we've already built — dashboard layouts, form templates, Ask Your Data, alerts, report layouts — and point it at your data.",
    foot: "Fast. Included in the monthly price. Maintained by us.",
  },
  engineering: {
    name: "Engineering",
    tag: "Built from scratch, for you alone",
    body: "Getting from paper to digital with phone forms or scanning, a crew-scheduling app, an automation that posts approved change orders into QuickBooks, a portal your customers sign into.",
    foot: `Priced as a project: from ${money(engineering.from)}, or ${money(engineering.hourly)}/hr.`,
  },
};

const lines: Record<string, string> = {
  "foundation,engineering": "Foundation cleans data that's already digital. Getting from paper to digital is an Engineering project.",
  "workspace,engineering": "Workspace is the app every client gets, set up for your business. Engineering is when you need something built that doesn't exist yet.",
  "foundation,workspace,engineering": "Foundation cleans data that's already digital. Workspace is the app every client gets. Engineering builds what doesn't exist yet — including getting from paper to digital.",
};

export default function ScopeBox({ show }: { show: K[] }) {
  return (
    <div className="wve">
      <h2 className="sr-only">{show.map((k) => info[k].name).join(" or ")}?</h2>
      <p className="wve-line">{lines[show.join(",")]}</p>
      <div className={`wve-cols n${show.length}`}>
        {show.map((k) => (
          <div key={k}>
            <h3>
              <SolidIcon kind={k} size={26} /> {info[k].name}
            </h3>
            <p className="wve-tag">{info[k].tag}</p>
            <p>{info[k].body}</p>
            <p className="small muted">{info[k].foot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
