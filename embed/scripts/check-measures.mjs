/*
 * Figma-conformance check for the embed panel.
 *
 * Reads embed.measure.json -- the numbers taken off the Figma frames while the
 * panel was built -- and diffs them against getComputedStyle in a real browser,
 * at several panel widths. Exits non-zero on any mismatch, so a spacing
 * regression fails a build instead of waiting for a design review.
 *
 * `sel` is a CSS-modules LOCAL class name. Vite emits `_<local>_<hash>_<line>`,
 * so a local name is matched by exact-token comparison after stripping the
 * leading underscore and the two trailing segments -- substring matching would
 * make `chip` collide with `chip-group`.
 *
 * Usage:
 *   node scripts/check-measures.mjs <url> [widths=1358,954,720]
 * Prereqs: a server for the panel, plus puppeteer-core resolvable
 *   (npm install puppeteer-core --no-save at the repo root).
 * Chrome path override: CHROME_PATH.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const here = dirname(fileURLToPath(import.meta.url));
const [url = "http://localhost:5173/", widthsArg = "1358,954,720"] =
  process.argv.slice(2);
const widths = widthsArg.split(",").map(Number);
const config = JSON.parse(
  readFileSync(join(here, "..", "embed.measure.json"), "utf8"),
);

/**
 * Runs in-page: find one element by CSS-modules local name and read props.
 * `index` picks among repeated matches -- e.g. the panel's first filter-section
 * header is 40px tall by design and the rest are 32px.
 */
function readInPage(local, props, index) {
  const localOf = (token) => {
    // `_filter-panel_1cqgk_1` -> `filter-panel`
    const m = token.match(/^_(.+)_[^_]+_[^_]+$/);
    return m ? m[1] : token;
  };
  const matches = [...document.querySelectorAll("[class]")].filter((node) =>
    [...node.classList].some((token) => localOf(token) === local),
  );
  const el = matches[index ?? 0];
  if (!el) return null;
  const cs = getComputedStyle(el);
  return Object.fromEntries(props.map((p) => [p, cs[p]]));
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

/** Resolve a CSS-modules local name to a live element, or null. */
const findLocal = (local) =>
  page.evaluate((name) => {
    const localOf = (token) => {
      const m = token.match(/^_(.+)_[^_]+_[^_]+$/);
      return m ? m[1] : token;
    };
    return [...document.querySelectorAll("[class]")].some((node) =>
      [...node.classList].some((token) => localOf(token) === name),
    );
  }, local);

// networkidle2 fires before React has mounted the panel (the bundle carries the
// whole catalogue), so measuring straight away silently reports every element as
// missing. Wait for the grid, which is the last thing to appear.
await page.waitForFunction(
  () =>
    [...document.querySelectorAll("[class]")].some((n) =>
      [...n.classList].some((c) => /^_template-list-grid_/.test(c)),
    ),
  { timeout: 60000 },
);

// Note: below the drawer breakpoint the filter panel stays mounted (translated
// off-canvas with visibility:hidden), so every panel element is still
// measurable -- a "not found" there is a real regression, not a skip.

let pass = 0;
const failures = [];

for (const width of widths) {
  await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
  // Let the resize settle: the drawer breakpoint remounts part of the tree.
  await new Promise((r) => setTimeout(r, 400));
  if (!(await findLocal("template-list-grid"))) {
    failures.push(`${width}px  panel did not render`);
    console.log("  FAIL  panel did not render at this width");
    continue;
  }
  console.log(`\n===== width ${width} =====`);

  for (const rule of config) {
    const { sel, props, expect, index } = rule;
    const label = index ? `${sel}[${index}]` : sel;
    const actual = await page.evaluate(readInPage, sel, props, index);

    if (!actual) {
      failures.push(`${width}px  ${label}: element not found`);
      console.log(`  FAIL  ${label}  <- element not found`);
      continue;
    }

    for (const [prop, want] of Object.entries(expect)) {
      const got = actual[prop];
      if (got === want) {
        pass++;
      } else {
        failures.push(
          `${width}px  ${label}.${prop}: expected ${want}, got ${got}`,
        );
        console.log(`  FAIL  ${label}.${prop}  expected ${want}, got ${got}`);
      }
    }
  }
}

await browser.close();

console.log(`\n=== ${pass} pass, ${failures.length} fail ===`);
if (failures.length) {
  console.log(failures.map((f) => "  " + f).join("\n"));
  process.exitCode = 1;
}
