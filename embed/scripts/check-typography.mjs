/*
 * Typography conformance for the embed panel.
 *
 * Every piece of text in the redesigned panel must render in Segoe-UI at one of
 * the six Figma text styles (Page title, Title 1 Strong, Title 2, Normal, Body,
 * Body Strong). Anything else means a component invented its own step -- the
 * failure mode that put a line-height:1 label off the scale during the build.
 *
 * Usage:
 *   node scripts/check-typography.mjs [url=http://localhost:5173/] [width=1358]
 * Chrome path override: CHROME_PATH.
 */
import puppeteer from "puppeteer-core";
// The six Figma text styles, as `fontWeight fontSize/lineHeight`.
const ALLOWED = new Set([
  "700 20px/28px", // Page title
  "700 17px/24px", // Title 1 Strong
  "700 14px/20px", // Title 2
  "400 14px/20px", // Normal
  "400 12px/16px", // Body
  "600 12px/16px", // Body Strong
]);
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [url = "http://localhost:5173/", width = "1358"] = process.argv.slice(2);

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const p = await b.newPage();
await p.setViewport({ width: Number(width), height: 1000 });
await p.goto(url, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 2500));
const styles = await p.evaluate(() => {
  const out = new Map();
  document
    .querySelectorAll("h1,h2,h3,h4,p,li,a,span,button,input,b,label")
    .forEach((el) => {
      if (!el.offsetParent && el.tagName !== "INPUT") return;
      const hasText = [...el.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent.trim(),
      );
      if (!hasText && el.tagName !== "INPUT") return;
      const cs = getComputedStyle(el);
      const key = `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight}`;
      const fam = cs.fontFamily;
      const k = key + " | " + fam;
      if (!out.has(k))
        out.set(k, {
          key,
          fam,
          count: 0,
          sample: (el.textContent || "").trim().slice(0, 32),
        });
      out.get(k).count++;
    });
  return [...out.values()];
});
await b.close();
let bad = 0;
for (const s of styles) {
  const famOk = /Segoe-UI/.test(s.fam);
  const sizeOk = ALLOWED.has(s.key);
  if (!famOk || !sizeOk) bad++;
  console.log(
    `${famOk && sizeOk ? "ok  " : "BAD "} ${s.key.padEnd(16)} x${String(s.count).padStart(3)}  ${s.fam.split(",")[0].padEnd(12)} "${s.sample}"`,
  );
}
console.log(
  bad
    ? `\n${bad} off-scale text style(s)`
    : "\nall text on the Figma type scale",
);
