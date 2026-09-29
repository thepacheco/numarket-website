/* Renders the isometric product illustrations to public/art/*.webp.
   Usage: npm run build && npx next start -p 3101, then:
   node scripts/render-art.mjs [http://localhost:3101]
   Needs Playwright + Chromium (set CHROME to a Chromium binary if needed). */
import { chromium } from "playwright";
import sharp from "sharp";

const base = process.argv[2] || "http://localhost:3101";
const kinds = ["foundation", "workspace", "insight", "engineering"];
const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1000, height: 820 } });
for (const k of kinds) {
  await page.goto(`${base}/render/${k}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.body.dataset.done === "1", null, { timeout: 60000 });
  await page.addStyleTag({ content: "html,body{background:transparent!important} header,footer,.site-header,.site-footer,.scroll-progress{display:none!important}" });
  const png = await page.evaluate(() => document.querySelector("#still canvas").toDataURL("image/png"));
  const buf = Buffer.from(png.split(",")[1], "base64");
  await sharp(buf).trim().webp({ quality: 88, alphaQuality: 90 }).toFile(`public/art/${k}.webp`);
  const meta = await sharp(`public/art/${k}.webp`).metadata();
  console.log(k, meta.width, meta.height);
}
await browser.close();
