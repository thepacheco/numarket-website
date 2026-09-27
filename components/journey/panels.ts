/* Draws the app panels shown in the 3D Data Journey onto canvases.
   The numbers come from the same sample data as the rest of the site. */

import * as THREE from "three";
import { buildView, fmt, overBudgetSummary } from "@/lib/sample-data";

const W = 640;
const H = 420;
const S = 2; // supersample for crisp text

function base(font: string) {
  const c = document.createElement("canvas");
  c.width = W * S;
  c.height = H * S;
  const g = c.getContext("2d")!;
  g.scale(S, S);
  const r = 28;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.roundRect(4, 4, W - 8, H - 8, r);
  g.fill();
  g.strokeStyle = "#dbe4ea";
  g.lineWidth = 3;
  g.stroke();
  g.textBaseline = "alphabetic";
  const t = (text: string, x: number, y: number, size: number, color = "#0b1f2e", weight = 600) => {
    g.font = `${weight} ${size}px ${font}`;
    g.fillStyle = color;
    g.fillText(text, x, y);
  };
  return { c, g, t };
}

function tex(c: HTMLCanvasElement) {
  const tx = new THREE.CanvasTexture(c);
  tx.colorSpace = THREE.SRGBColorSpace;
  tx.anisotropy = 4;
  return tx;
}

export function panelTextures(font: string) {
  const v = buildView("construction", "large", null, 12);
  const ob = overBudgetSummary();
  const worst = ob.rows[0];

  /* 1. Dashboard */
  const d = base(font);
  d.t("Summit Builders · Dashboard", 34, 58, 22, "#52667a", 600);
  const kp = v.kpis;
  [kp[0], kp[1]].forEach((k, i) => {
    const x = 34 + i * 290;
    d.g.fillStyle = "#f5f7fa";
    d.g.beginPath();
    d.g.roundRect(x, 82, 270, 104, 16);
    d.g.fill();
    d.t(k.label, x + 18, 116, 18, "#52667a", 600);
    d.t(fmt(k.value, k.fmt), x + 18, 164, 40, "#0b1f2e", 700);
  });
  const vals = v.table.map((r) => r.values.find((x) => x.key === "actual")!.value);
  const mx = Math.max(...vals);
  v.table.forEach((r, i) => {
    const bh = (vals[i] / mx) * 170;
    const x = 44 + i * 116;
    d.g.fillStyle = r.status === "good" ? "#2e9e6b" : r.status === "watch" ? "#d4a02a" : "#d9603f";
    d.g.beginPath();
    d.g.roundRect(x, 380 - bh, 72, bh, [8, 8, 0, 0]);
    d.g.fill();
  });

  /* 2. Input form */
  const f = base(font);
  f.t("Update job budget", 34, 64, 28, "#0b1f2e", 700);
  const field = (label: string, value: string, y: number) => {
    f.t(label, 34, y, 18, "#52667a", 600);
    f.g.strokeStyle = "#cfd9e1";
    f.g.lineWidth = 2;
    f.g.beginPath();
    f.g.roundRect(34, y + 12, W - 68, 56, 12);
    f.g.stroke();
    f.t(value, 52, y + 50, 22, "#0b1f2e", 500);
  };
  field("Job", worst.site, 110);
  field("Cost to date", fmt(v.table.find((r) => r.site === worst.site)!.values.find((x) => x.key === "actual")!.value, "money"), 214);
  f.g.fillStyle = "#22577a";
  f.g.beginPath();
  f.g.roundRect(34, 322, 200, 58, 29);
  f.g.fill();
  f.t("Save update", 72, 359, 22, "#ffffff", 700);

  /* 3. Ask Your Data */
  const a = base(font);
  a.t("Ask Your Data", 34, 60, 22, "#52667a", 600);
  a.g.fillStyle = "#22577a";
  a.g.beginPath();
  a.g.roundRect(W - 440, 90, 406, 70, 20);
  a.g.fill();
  a.t("Which jobs are over budget?", W - 418, 134, 24, "#ffffff", 600);
  a.g.fillStyle = "#e6f7ee";
  a.g.beginPath();
  a.g.roundRect(34, 190, 470, 150, 20);
  a.g.fill();
  a.t(`${ob.count} jobs · ${fmt(ob.total, "money")} over`, 58, 240, 30, "#1f8a5b", 700);
  ob.rows.slice(0, 2).forEach((r, i) => a.t(`${r.site}: ${fmt(r.over, "money")}`, 58, 284 + i * 34, 21, "#243746", 500));

  /* 4. Alert */
  const al = base(font);
  al.g.fillStyle = "#fdebe6";
  al.g.beginPath();
  al.g.roundRect(4, 4, W - 8, H - 8, 28);
  al.g.fill();
  al.g.fillStyle = "#b93b22";
  al.g.beginPath();
  al.g.roundRect(4, 4, 14, H - 8, [28, 0, 0, 28]);
  al.g.fill();
  al.t("ALERT", 44, 70, 20, "#b93b22", 700);
  al.t("Budget line crossed", 44, 128, 34, "#0b1f2e", 700);
  al.t(`${worst.site}`, 44, 190, 26, "#243746", 600);
  al.t(`${fmt(worst.over, "money")} over budget for work done`, 44, 232, 22, "#52667a", 500);
  al.t("Sent to: Project manager", 44, 340, 20, "#52667a", 500);

  /* 5. Action item (back of the dashboard) */
  const ac = base(font);
  ac.g.fillStyle = "#f4fbf7";
  ac.g.beginPath();
  ac.g.roundRect(4, 4, W - 8, H - 8, 28);
  ac.g.fill();
  ac.g.strokeStyle = "#57cc99";
  ac.g.lineWidth = 4;
  ac.g.stroke();
  ac.t("ACTION ITEM", 40, 70, 20, "#1f8a5b", 700);
  ac.t("Review change orders", 40, 130, 36, "#0b1f2e", 700);
  ac.t(`on ${worst.site}`, 40, 178, 36, "#0b1f2e", 700);
  ac.t(v.action.detail.split(". ")[1] ?? "", 40, 236, 20, "#52667a", 500);
  ac.t("Owner: PM team", 40, 330, 22, "#243746", 600);
  ac.t("Due: Friday", 300, 330, 22, "#243746", 600);

  return { dashboard: tex(d.c), form: tex(f.c), ask: tex(a.c), alert: tex(al.c), action: tex(ac.c) };
}

/* The pattern on every tile: a tiny spreadsheet. Tinted per tile by instance color. */
export function tileTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 172;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, 256, 172);
  g.fillStyle = "#b9c4cc";
  for (let r = 0; r < 4; r++) g.fillRect(26, 34 + r * 30, r % 2 ? 150 : 200, 12);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
