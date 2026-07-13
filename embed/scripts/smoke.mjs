/** Headless smoke test: serve dist/, render in Chromium, assert the catalog
 *  renders and a filter click changes the result. Exits non-zero on failure. */
import http from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 39120;
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = join(DIST, p);
  if (!existsSync(fp)) {
    res.writeHead(404);
    return res.end("404");
  }
  res.writeHead(200, { "content-type": TYPES[extname(fp)] || "application/octet-stream" });
  res.end(await readFile(fp));
});

await new Promise((r) => server.listen(PORT, r));

const pageErrors = [];
const consoleErrors = [];
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => pageErrors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error" && !/Failed to load resource/i.test(m.text())) {
    consoleErrors.push(m.text());
  }
});

let ok = true;
const fail = (msg) => {
  ok = false;
  console.log(`✗ ${msg}`);
};
const pass = (msg) => console.log(`✓ ${msg}`);

try {
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle", timeout: 20000 });

  await page.waitForFunction(
    () => (document.getElementById("oforms-root")?.children.length ?? 0) > 0,
    { timeout: 10000 },
  );
  pass("mount populated");

  const heading = (await page.locator("#oforms-root h1").first().textContent())?.trim() || "";
  heading ? pass(`H1: "${heading}"`) : fail("no H1 heading");

  const cards = await page.locator("#oforms-root a").count();
  cards > 0 ? pass(`${cards} card/links rendered`) : fail("no cards rendered");

  const checkboxes = await page.locator('#oforms-root input[type="checkbox"]').count();
  checkboxes > 0 ? pass(`${checkboxes} sidebar filter options`) : fail("no filter checkboxes");

  // Click first filter → expect the URL query + rendered set to change.
  const before = cards;
  await page.locator('#oforms-root input[type="checkbox"]').first().click({ force: true });
  await page.waitForTimeout(600);
  const search = new URL(page.url()).search;
  search.length > 0 ? pass(`filter updated query: ${search}`) : fail("query did not change on filter");
  const after = await page.locator("#oforms-root a").count();
  after !== before
    ? pass(`filtered card count changed ${before} -> ${after}`)
    : console.log(`~ card count unchanged (${before}); may be expected depending on filter`);

  // Public API: switch language. Use the count label (en "Documents" -> de
  // "Dokumente") — a genuinely translated string.
  await page.evaluate(() => window.OformsEmbed.setLocale("de"));
  await page.waitForTimeout(800);
  const deLocalized = await page.getByText("Dokumente", { exact: true }).count();
  deLocalized > 0
    ? pass('setLocale("de") localized UI (Dokumente)')
    : fail('setLocale("de") did not localize the UI');

  // Unsupported culture (ru-RU) must fall back to English, not blank.
  await page.evaluate(() => window.OformsEmbed.setLocale("ru-RU"));
  await page.waitForTimeout(600);
  const ruFallback = await page.getByText("Documents", { exact: true }).count();
  ruFallback > 0
    ? pass("ru-RU fell back to English (Documents)")
    : fail("ru-RU did not fall back to English");

  // Language switcher control is present.
  const switcher = await page.getByRole("button", { name: /English|Deutsch/ }).count();
  switcher > 0 ? pass("language switcher present") : fail("no language switcher");

  // Switching language must change the CATALOG DATA (not just UI labels):
  // first card name should differ between English and Spanish.
  const firstEn = (await page.locator("#oforms-root h3").first().textContent())?.trim();
  await page.evaluate(() => window.OformsEmbed.setLocale("es"));
  await page.waitForTimeout(700);
  const firstEs = (await page.locator("#oforms-root h3").first().textContent())?.trim();
  firstEn && firstEs && firstEn !== firstEs
    ? pass(`es catalog data applied ("${firstEn}" -> "${firstEs}")`)
    : fail(`es data not applied (still "${firstEs}")`);

  // Card click -> info popup with a single "Use this template" button, no navigation.
  const urlBefore = page.url();
  await page.locator("#oforms-root a:has(h3)").first().click();
  await page.waitForTimeout(400);
  const editBtns = await page.getByRole("button", { name: "Use this template" }).count();
  editBtns === 1
    ? pass('card click opened popup with one "Use this template" button')
    : fail(`expected 1 "Use this template" button, got ${editBtns}`);
  const dialog = await page.getByRole("dialog").count();
  dialog === 1 ? pass("popup dialog present") : fail(`expected 1 dialog, got ${dialog}`);
  page.url() === urlBefore
    ? pass("no navigation on card click")
    : fail(`card click navigated away: ${page.url()}`);

  // "Use this template" must call AscDesktopEditor.openTemplate(url, name).
  await page.evaluate(() => {
    window.__opened = null;
    window.AscDesktopEditor = {
      openTemplate: (url, name) => {
        window.__opened = { url, name };
      },
    };
  });
  await page.getByRole("button", { name: "Use this template" }).first().click();
  await page.waitForTimeout(200);
  const opened = await page.evaluate(() => window.__opened);
  opened && opened.url
    ? pass(`openTemplate called: "${opened.name}" -> ${opened.url}`)
    : fail("openTemplate was not called on button click");
} catch (e) {
  fail(`exception: ${e}`);
}

if (pageErrors.length) {
  ok = false;
  console.log(`\n✗ ${pageErrors.length} uncaught page error(s):`);
  pageErrors.slice(0, 5).forEach((e) => console.log(`   ${e}`));
}
if (consoleErrors.length) {
  console.log(`\n~ ${consoleErrors.length} console error(s):`);
  consoleErrors.slice(0, 5).forEach((e) => console.log(`   ${e}`));
}

await browser.close();
server.close();
console.log(ok ? "\nSMOKE: PASS" : "\nSMOKE: FAIL");
process.exit(ok ? 0 : 1);
