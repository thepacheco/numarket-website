"use client";

import ScrollStory from "./ScrollStory";
import IndustryScene from "./IndustryScenes";
import IndustryIso from "./IndustryIso";
import { industries, type IndustrySlug } from "@/content/industries";
import { firstYearCost, leakFor, leakTotal } from "@/lib/savings";
import { fmt, type Size } from "@/lib/sample-data";
import { sampleCompany } from "@/lib/ask";

/* The data map: sources on the left, your database in the middle, what you get on the right. */
function DataMap({ slug, s, leakLine, saveLine }: { slug: IndustrySlug; s: number; leakLine: [string, string]; saveLine: [string, string] }) {
  const ind = industries.find((i) => i.slug === slug)!;
  const src = ind.sources.slice(0, 5);
  const H = 420;
  const gap = H / (src.length + 1);
  const scatter = [
    [-30, -20, -8],
    [40, 30, 6],
    [-10, 50, -12],
    [30, -40, 10],
    [-40, 10, 7],
  ];
  return (
    <svg className="dmap" data-s={s} viewBox="0 0 640 420" role="img" aria-label={`Data map for ${sampleCompany[slug]}, step ${s + 1}`}>
      {src.map((name, i) => {
        const y = gap * (i + 1);
        return <path key={`l${i}`} className="link" d={`M 190 ${y} C 250 ${y}, 250 210, 290 210`} />;
      })}
      <path className="olink" d="M 390 210 C 430 210, 430 130, 450 130" />
      <path className="olink" d="M 390 210 C 430 210, 430 290, 450 290" />
      {src.map((name, i) => {
        const y = gap * (i + 1);
        const [dx, dy, dr] = scatter[i % scatter.length];
        return (
          <g key={name} className="src" style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px`, ["--dr" as string]: `${dr}deg`, transformBox: "fill-box", transformOrigin: "center" }}>
            <rect x="14" y={y - 20} width="176" height="40" rx="10" />
            <text x="30" y={y + 5}>
              {name.length > 20 ? name.slice(0, 19) + "…" : name}
            </text>
          </g>
        );
      })}
      <g className="hub">
        <rect x="290" y="170" width="100" height="80" rx="16" />
        <text x="340" y="206" textAnchor="middle">
          Your
        </text>
        <text x="340" y="224" textAnchor="middle">
          database
        </text>
      </g>
      <g className="out leak">
        <rect x="450" y="92" width="182" height="76" rx="12" />
        <text x="464" y="120">
          {leakLine[0]}
        </text>
        <text x="464" y="146" className="sub">
          {leakLine[1]}
        </text>
      </g>
      <g className="out save">
        <rect x="450" y="252" width="182" height="76" rx="12" />
        <text x="464" y="280">
          {saveLine[0]}
        </text>
        <text x="464" y="306" className="sub">
          {saveLine[1]}
        </text>
      </g>
    </svg>
  );
}

export default function IndustryStory({ slug, size = "large" }: { slug: IndustrySlug; size?: Size }) {
  const ind = industries.find((i) => i.slug === slug)!;
  const leak = leakFor(slug, size);
  const lost = leakTotal(leak);
  const saved = lost * 0.15;
  const co = sampleCompany[slug];
  const leakLine: [string, string] = [fmt(lost, "money") + " a year", `lost to ${leak.short.toLowerCase()}`];
  const saveLine: [string, string] = [`${fmt(saved, "money")} saved`, "if you fix 15% of it"];
  const leakText = `${fmt(lost, "money")} a year · ${leak.short.toLowerCase()}`;
  const fixText = `${fmt(saved, "money")} a year saved at 15%`;
  const steps = [
    {
      eyebrow: "Today",
      title: `Your numbers live in ${["zero", "one", "two", "three", "four", "five", "six"][ind.sources.length]} places.`,
      body: <p>{`${co} runs on ${ind.sources.slice(0, -1).join(", ")} and ${ind.sources[ind.sources.length - 1]}. None of them talk to each other.`}</p>,
    },
    {
      eyebrow: "Step 1 · Collect",
      title: "We connect them. Read-only.",
      body: <p>Secure pipes copy the data automatically. Nothing changes in your tools.</p>,
    },
    {
      eyebrow: "Step 2 · Clean",
      title: "Names match. Duplicates go.",
      body: <p>Everything lands in one private database, checked every time it updates.</p>,
    },
    {
      eyebrow: "Step 3 · See",
      title: "The leak shows up.",
      body: (
        <p>
          <b style={{ color: "var(--ink)" }}>{leak.title}:</b> {fmt(lost, "money")} a year in this sample — worst at {leak.worst}.
        </p>
      ),
    },
    {
      eyebrow: "Step 4 · Act",
      title: "Fix a slice. Keep the money.",
      body: (
        <>
          <p>
            Fixing just 15% is worth <span className="big-num" style={{ fontSize: 34, display: "inline" }}>{fmt(saved, "money")}</span> a year.
          </p>
          <p className="small" style={{ marginTop: 8 }}>
            numarket&apos;s first year costs {fmt(firstYearCost(size), "money")}. Try your own numbers below.
          </p>
        </>
      ),
    },
  ];
  return (
    <ScrollStory
      steps={steps}
      visual={(a) =>
        a < 3 ? (
          <DataMap slug={slug} s={a} leakLine={leakLine} saveLine={saveLine} />
        ) : (
          <IndustryIso
            slug={slug}
            mode={a === 4 ? "fixed" : "leak"}
            label={a === 4 ? fixText : leakText}
            chip={a === 4 ? { text: fixText, tone: "good" } : { text: leakText, tone: "bad" }}
            fallback={<IndustryScene slug={slug} fixed={a === 4} leakText={leakText} fixText={fixText} />}
          />
        )
      }
    />
  );
}
