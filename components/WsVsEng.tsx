import SolidIcon from "./solids/SolidIcon";

/* Workspace vs. Engineering, in one box (Site Revisions v2.1, 1.1). */
export default function WsVsEng() {
  return (
    <div className="wve">
      <h2 className="sr-only">Workspace or Engineering?</h2>
      <p className="wve-line">Workspace is the app every client gets, set up for your business. Engineering is when you need something built that doesn&apos;t exist yet.</p>
      <div className="wve-cols">
        <div>
          <h3>
            <SolidIcon kind="workspace" size={26} /> Workspace
          </h3>
          <p className="wve-tag">Configured, not built</p>
          <p>We pick from a library we&apos;ve already built — dashboard layouts, input-screen templates, Ask Your Data, alert rules — and point it at your data.</p>
          <p className="small muted">Fast. Included in the monthly price. Maintained by us.</p>
        </div>
        <div>
          <h3>
            <SolidIcon kind="engineering" size={26} /> Engineering
          </h3>
          <p className="wve-tag">Built from scratch, for you alone</p>
          <p>A crew-scheduling app, an estimate builder, an automation that pushes approved change orders back into QuickBooks, a portal your customers sign into.</p>
          <p className="small muted">Priced as a project: from $5,000, or $175/hr.</p>
        </div>
      </div>
    </div>
  );
}
