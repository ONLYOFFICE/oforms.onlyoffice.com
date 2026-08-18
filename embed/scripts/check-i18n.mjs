/*
 * Localisation regression suite for the embed panel.
 *
 * Switches through every supported locale and asserts that no panel copy falls
 * back to English, then checks that the result-count plural resolves per
 * language. This exists because the panel once shipped English labels in eight
 * of nine locales: strings had been moved to an `en`-only namespace to pick up
 * different wording, and nothing caught it.
 *
 * The plural check drives the count through the Favorites view, where starring
 * N cards pins the count to exactly N. It never reloads the page -- a reload
 * drops back to the default locale, and stored favourites are only read at
 * mount.
 *
 * Usage:
 *   node scripts/check-i18n.mjs <url>
 * Prereqs: a server for the panel, puppeteer-core resolvable from the repo root.
 */
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Strings that mean the panel fell through to the English bundle.
const ENGLISH = [
  "Templates",
  "All Templates",
  "Search",
  "Search templates",
  "Stored on this device",
  "From the ONLYOFFICE library",
  "Add to favorites",
];

/** locale code, a substring of its option label, how many plural forms to probe */
const LOCALES = [
  ["en", null, 2],
  ["de", "deutsch", 2],
  ["es", "espa", 2],
  ["fr", "fran", 2],
  ["it", "italian", 2],
  ["pt", "portug", 2],
  ["ja", "\u65e5\u672c", 2],
  ["zh", "\u4e2d\u6587", 2],
  // Arabic distinguishes one / two / few, so probe a third.
  ["ar", "\u0639\u0631\u0628", 3],
];

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const p = await b.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
p.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("404"))
    errs.push("console: " + m.text());
});
await p.setViewport({ width: 954, height: 900 });
await p.goto(process.argv[2] ?? "http://localhost:5173/", {
  waitUntil: "networkidle2",
});
await wait(2500);

const H = [
  "const lo=(t)=>{const m=t.match(/^_(.+)_[^_]+_[^_]+$/);return m?m[1]:t;};",
  'const all=(n)=>[...document.querySelectorAll("[class]")].filter(e=>[...e.classList].some(t=>lo(t)===n));',
  "const one=(n)=>all(n)[0];",
].join("\n");
const ev = (body, ...a) =>
  p.evaluate(new Function("...a", H + "\n" + body), ...a);

const nav = async (i) => {
  await ev(`all("nav-item")[a[0]].click();`, i);
  await wait(700);
};

const clearFavorites = async () => {
  await nav(2);
  for (let guard = 0; guard < 12; guard++) {
    const left = await ev(
      `const s=all("template-card-star")[0]; if(!s) return 0; s.click(); return all("template-card").length;`,
    );
    await wait(300);
    if (!left || left <= 1) break;
  }
  await wait(300);
};

const pickLocale = async (match) => {
  await ev(`one("button").click();`);
  await wait(400);
  const ok = await ev(
    `const o=all("option").find(e=>e.textContent.trim().toLowerCase().includes(a[0].toLowerCase())); if(!o) return false; o.click(); return true;`,
    match,
  );
  await wait(2200);
  return ok;
};

let failures = 0;
for (const [code, match, forms] of LOCALES) {
  if (match && !(await pickLocale(match))) {
    console.log(`FAIL  ${code}: no such option in the language switcher`);
    failures++;
    continue;
  }
  await nav(0);

  const r = await ev(`return {
    lang: one("embed")?.getAttribute("lang"),
    dir: one("embed")?.getAttribute("dir"),
    strings: [
      one("filter-panel-title")?.textContent,
      one("list-header-title")?.textContent,
      one("search-bar-button")?.textContent,
      document.querySelector("input")?.placeholder,
      one("template-card-source")?.getAttribute("aria-label"),
      one("template-card-star")?.getAttribute("aria-label"),
      ...all("nav-item").map(e=>e.textContent.trim()),
    ].filter(Boolean),
  };`);

  const leaked =
    code === "en" ? [] : r.strings.filter((s) => ENGLISH.includes(s));
  const langOk = r.lang === code;
  const dirOk = r.dir === (code === "ar" ? "rtl" : "ltr");

  // Plural forms, via the Favorites count.
  await clearFavorites();
  const plurals = [];
  for (let n = 1; n <= forms; n++) {
    await nav(0);
    await ev(`all("template-card-star")[a[0]].click();`, n - 1);
    await wait(350);
    await nav(2);
    plurals.push(
      await ev(`return one("list-header-count")?.textContent ?? "(none)";`),
    );
  }
  await clearFavorites();

  const distinct = new Set(plurals).size === plurals.length;
  // ja/zh have one invariant form, so identical strings are correct there.
  const pluralOk = ["ja", "zh"].includes(code) ? true : distinct;

  const ok = langOk && dirOk && !leaked.length && pluralOk;
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${code.padEnd(3)} dir=${r.dir}  plurals: ${plurals.map((s) => `"${s}"`).join(" / ")}`,
  );
  if (!langOk)
    console.log(`      lang attribute is "${r.lang}", expected "${code}"`);
  if (!dirOk) console.log(`      dir is "${r.dir}"`);
  if (leaked.length)
    console.log(`      untranslated: ${JSON.stringify(leaked)}`);
  if (!pluralOk) console.log(`      plural forms did not differ across counts`);
}

console.log(
  "\n" + (errs.length ? "JS ERRORS:\n" + errs.join("\n") : "no JS errors"),
);
console.log(
  failures
    ? `\n${failures} locale(s) failed`
    : `\nall ${LOCALES.length} locales render translated copy with correct plurals`,
);
if (failures) process.exitCode = 1;
await b.close();
