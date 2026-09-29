import Link from "next/link";
import IndGlyph from "./IndGlyph";
import { industries } from "@/content/industries";
import { leakFor, leakTotal } from "@/lib/savings";
import { fmt } from "@/lib/sample-data";

/* Big-number wall: the yearly leak for a sample small company in each industry.
   Same math as the calculator on each industry page. */
export default function MoneyStats() {
  return (
    <div className="money-grid">
      {industries.map((i) => {
        const leak = leakFor(i.slug, "small");
        const lost = leakTotal(leak);
        return (
          <Link key={i.slug} href={`/solutions/${i.slug}`} className={`money-cell ind-${i.slug}`}>
            <span className="money-ind">
              <IndGlyph /> {i.short}
            </span>
            <span className="money-num tnum">{fmt(lost, "money")}</span>
            <span className="money-what">a year lost to {leak.short.toLowerCase()}</span>
            <span className="money-fix">
              Fix 15%, get <b className="tnum">{fmt(lost * 0.15, "money")}</b> back <span aria-hidden="true">→</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
