import { industries, type IndustrySlug } from "@/content/industries";
import { estimateNotes } from "@/lib/savings";
import { sampleCompany } from "@/lib/ask";
import type { Size } from "@/lib/sample-data";

/* The label and assumptions that sit next to every loss figure. */
export default function EstimateNote({ slug, size, assume, compact }: { slug: IndustrySlug; size: Size; assume?: number; compact?: boolean }) {
  const ind = industries.find((i) => i.slug === slug)!;
  const notes = estimateNotes(slug, size, sampleCompany[slug], ind.sites[size].length, ind.siteNoun.many.replace("All ", "").toLowerCase(), assume);
  return (
    <div className={`est-note ${compact ? "compact" : ""}`}>
      {!compact && <span className="est-label">Illustrative estimate for a typical company in this industry</span>}
      <details>
        <summary>How we estimated this</summary>
        <ul>
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
