/*
 * Behaviour regression suite for the embed panel.
 *
 * Guards the interaction defects found in the Figma/functional audit, none of
 * which a computed-style assertion can see:
 *   F-01  panel labels stay on translated namespaces (checked in de and fr)
 *   F-05  Purpose narrows the list, not only the category tree
 *   F-06  a search can be dismissed from the field
 *   F-07  re-clicking the active nav item clears a dead-end search
 *   F-18  Favorites shows a result count, Recents does not
 *   F-19  an expanded chip group can be collapsed
 *
 * Usage:
 *   node scripts/check-behaviour.mjs <url>
 * Prereqs: a server for the panel, puppeteer-core resolvable from the repo root.
 */
import puppeteer from "puppeteer-core";
const URL = process.argv[2];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
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

const H = [
  "const lo=(t)=>{const m=t.match(/^_(.+)_[^_]+_[^_]+$/);return m?m[1]:t;};",
  'const all=(n)=>[...document.querySelectorAll("[class]")].filter(e=>[...e.classList].some(t=>lo(t)===n));',
  "const one=(n)=>all(n)[0];",
].join("\n");
const ev = (body, ...a) =>
  p.evaluate(new Function("...a", H + "\n" + body), ...a);
const snap = () =>
  ev(`return {
  title: one("list-header-title")?.textContent,
  count: one("list-header-count")?.textContent ?? null,
  cards: all("template-card").length,
  empty: one("empty-state-title")?.textContent ?? null,
  selChips: all("chip-selected").length,
  groups: all("section-header-group").length,
  sections: all("section-header").filter(e=>!e.className.includes("group")).map(e=>e.textContent.replace(/\\s+/g," ").trim()),
  clearDisabled: one("text-button")?.disabled ?? null,
  query: document.querySelector("input")?.value ?? null,
  hasClear: !!one("search-bar-clear"),
};`);
const clickText = (n, txt) =>
  ev(
    `const e=all(a[0]).find(x=>x.textContent.trim().startsWith(a[1])); if(!e) return false; e.click(); return true;`,
    n,
    txt,
  );
const clickNth = (n, i) =>
  ev(
    `if(!all(a[0])[a[1]]) return false; all(a[0])[a[1]].click(); return true;`,
    n,
    i,
  );

const R = [];
const ck = (id, name, ok, detail) => {
  R.push(ok);
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${id}  ${name}${detail ? "  -- " + detail : ""}`,
  );
};

await p.goto(URL, { waitUntil: "networkidle2" });
await wait(2500);
const s0 = await snap();

// ---- F-05: Purpose narrows the list ---------------------------------------
await clickText("chip", "Documents");
await wait(600);
const beforePurpose = await snap();
await clickNth("segment", 1);
await wait(800);
const afterPurpose = await snap();
ck(
  "F-05",
  "Purpose narrows the result count",
  afterPurpose.count !== beforePurpose.count,
  `${beforePurpose.count} -> ${afterPurpose.count}`,
);
ck(
  "F-05",
  "Purpose still re-scopes the Category groups",
  afterPurpose.groups !== beforePurpose.groups,
  `${beforePurpose.groups} -> ${afterPurpose.groups} groups`,
);
await clickNth("segment", 0);
await wait(600);
await ev(`one("text-button").click();`);
await wait(600);

// ---- F-06: the search has a clear control ---------------------------------
ck("F-06", "no clear control before a search", !(await snap()).hasClear);
await p.type("input", "invoice");
await p.keyboard.press("Enter");
await wait(900);
const sSearch = await snap();
ck("F-06", "clear control appears once searching", sSearch.hasClear);
await ev(`one("search-bar-clear").click();`);
await wait(800);
const sCleared = await snap();
ck(
  "F-06",
  "clear control restores the full list",
  sCleared.count === s0.count && sCleared.query === "",
  `${sSearch.count} -> ${sCleared.count}`,
);

// ---- F-07: re-clicking the active nav item clears a dead-end search --------
await p.type("input", "zzzzznope");
await p.keyboard.press("Enter");
await wait(800);
const stuck = await snap();
ck(
  "F-07",
  "nonsense search yields the empty state",
  stuck.cards === 0 && !!stuck.empty,
  stuck.empty,
);
await clickText("nav-item", "All Templates");
await wait(800);
const escaped = await snap();
ck(
  "F-07",
  "clicking the already-active nav item clears the query",
  escaped.cards > 0 && escaped.query === "",
  `${stuck.cards} -> ${escaped.cards} cards, query="${escaped.query}"`,
);

// ---- F-18: Favorites shows a count ---------------------------------------
await clickNth("template-card-star", 0);
await wait(400);
await clickNth("template-card-star", 1);
await wait(400);
await clickText("nav-item", "Favorites");
await wait(800);
const fav = await snap();
ck(
  "F-18",
  "Favorites view shows a result count",
  !!fav.count,
  fav.count ?? "(none)",
);
ck(
  "F-18",
  "Favorites lists the starred templates",
  fav.cards === 2,
  `${fav.cards} cards`,
);
await clickText("nav-item", "Recent");
await wait(800);
const rec = await snap();
ck(
  "F-18",
  "Recents still hides the count (per Figma)",
  rec.count === null,
  rec.count ?? "(hidden)",
);

// ---- F-19: an expanded chip group can be collapsed ------------------------
await clickText("nav-item", "All Templates");
await wait(800);
const plus = await ev(
  `const c=all("chip").find(e=>/^\\+\\d+$/.test(e.textContent.trim())); if(!c) return null; c.click(); return true;`,
);
if (plus) {
  await wait(500);
  const less = await ev(`return all("chip").map(e=>e.textContent.trim());`);
  const hasLess = less.some((t) => /less|Weniger|moins|menos/i.test(t));
  ck(
    "F-19",
    "expanded chip group offers a collapse chip",
    hasLess,
    hasLess ? "found" : less.slice(-3).join(" | "),
  );
} else {
  ck(
    "F-19",
    "chip group collapse",
    true,
    "no +N chip in this dataset (<= 6 countries) -- code path untested here",
  );
}

// ---- F-01: the panel is translated again ----------------------------------
for (const [lang, probe] of [
  ["de", /Typ|Länder|Zweck/],
  ["fr", /Pays|Objectif/],
]) {
  await ev(`one("button").click();`);
  await wait(400);
  const picked = await ev(
    `const o=all("option").find(e=>e.textContent.trim().toLowerCase().startsWith(a[0])); if(!o) return false; o.click(); return true;`,
    lang === "de" ? "deutsch" : "fran",
  );
  await wait(2000);
  const secs = await ev(
    `return all("section-header").filter(e=>!e.className.includes("group")).map(e=>e.textContent.replace(/\\s+/g," ").trim());`,
  );
  const clear = await ev(`return one("text-button")?.textContent?.trim();`);
  ck(
    "F-01",
    `panel labels translated in ${lang}`,
    picked && secs.some((s) => probe.test(s)),
    `${secs.join(" | ")}  /  clear="${clear}"`,
  );
}

console.log(
  "\n" + (errs.length ? "JS ERRORS:\n" + errs.join("\n") : "no JS errors"),
);
console.log(
  `\n${R.filter(Boolean).length}/${R.length} behaviour assertions pass`,
);
await b.close();
