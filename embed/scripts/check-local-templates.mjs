/*
 * Local-template regression suite.
 *
 * Stubs the desktop bridge (window.AscDesktopEditor.LocalFileTemplates plus the
 * window.onaddtemplates callback) so the real src/localSdk.ts path runs in a
 * plain browser, then asserts:
 *   - on-device templates sort ahead of the catalogue in every list
 *   - the card's trailing slot shows the right source glyph
 *   - Purpose never hides a local template
 *
 * That last one matters: Purpose is always active without the user choosing it,
 * and a local template's purpose comes from name-matched CMS taxonomy that is
 * often personal-only or missing entirely. The two fixtures below are exactly
 * those cases -- a personal-purpose match and an unmatched name.
 *
 * Usage:
 *   node scripts/check-local-templates.mjs <url>
 */
import puppeteer from "puppeteer-core";
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

// Stub the desktop bridge before anything loads, so the real localSdk path runs.
await p.evaluateOnNewDocument(() => {
  window.AscDesktopEditor = {
    LocalFileTemplates() {
      setTimeout(() => {
        window.onaddtemplates?.([
          {
            id: 1,
            name: "Gift Certificate",
            path: "C:/Templates/EN/Gift Certificate.docx",
            type: 0,
          },
          {
            id: 2,
            name: "Totally Unknown Thing",
            path: "C:/Templates/EN/Unknown.docx",
            type: 0,
          },
        ]);
      }, 30);
    },
  };
});

await p.setViewport({ width: 954, height: 900 });
await p.goto(process.argv[2], { waitUntil: "networkidle2" });
await wait(3500);

const H = [
  "const lo=(t)=>{const m=t.match(/^_(.+)_[^_]+_[^_]+$/);return m?m[1]:t;};",
  'const all=(n)=>[...document.querySelectorAll("[class]")].filter(e=>[...e.classList].some(t=>lo(t)===n));',
  "const one=(n)=>all(n)[0];",
].join("\n");
const ev = (body, ...a) =>
  p.evaluate(new Function("...a", H + "\n" + body), ...a);

const R = [];
const ck = (name, ok, detail) => {
  R.push(ok);
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  -- " + detail : ""}`,
  );
};

const read = () =>
  ev(`return all("template-card").slice(0, 8).map(c=>{
  const src=c.querySelector('[class*="template-card-source"]');
  const svg=src?.querySelector("svg");
  return {
    name: c.querySelector('[class*="template-card-name"]')?.textContent,
    label: src?.getAttribute("aria-label") ?? null,
    box: svg ? svg.getAttribute("width")+"x"+svg.getAttribute("height") : null,
    color: src ? getComputedStyle(src).color : null,
  };
});`);

const cards = await read();
console.log(JSON.stringify(cards.slice(0, 5), null, 1));

ck(
  "local templates render",
  cards.some((c) => c.label === "Stored on this device"),
);
ck(
  "local templates come first",
  cards[0]?.label === "Stored on this device" &&
    cards[1]?.label === "Stored on this device",
  `${cards[0]?.name} / ${cards[1]?.name}`,
);
ck(
  "cloud templates follow",
  cards[2]?.label === "From the ONLYOFFICE library",
  cards[2]?.name,
);
ck(
  "local glyph is the 14x13 monitor export",
  cards[0]?.box === "14x13",
  cards[0]?.box,
);
ck(
  "cloud glyph is the 16x12 cloud export",
  cards[2]?.box === "16x12",
  cards[2]?.box,
);
ck(
  "indicator inherits a token colour",
  cards[0]?.color === "rgba(0, 0, 0, 0.4)",
  cards[0]?.color,
);

// Slot geometry: it must reoccupy the 24px the "..." button held, 8px from the edge.
const geo = await ev(`
  const card=one("template-card"), cr=card.getBoundingClientRect();
  const src=one("template-card-source").getBoundingClientRect();
  return {w:Math.round(src.width), h:Math.round(src.height), rightInset:+(cr.right-src.right).toFixed(1)};`);
ck(
  "indicator is a 24x24 slot",
  geo.w === 24 && geo.h === 24,
  `${geo.w}x${geo.h}`,
);
ck(
  "indicator sits 8px from the card edge",
  geo.rightInset === 9,
  `${geo.rightInset} (8px padding + 1px border)`,
);

// Ordering must survive filtering and search.
await ev(
  `const c=all("chip").find(e=>/Documents/.test(e.textContent)); c && c.click();`,
);
await wait(700);
const filtered = await read();
ck(
  "local stays first after a Type filter",
  filtered[0]?.label === "Stored on this device",
  filtered[0]?.name,
);

await ev(
  `const c=all("chip").find(e=>/Documents/.test(e.textContent)); c && c.click();`,
);
await wait(500);
await p.type("input", "certificate");
await p.keyboard.press("Enter");
await wait(900);
const searched = await read();
ck(
  "local stays first in search results",
  searched[0]?.label === "Stored on this device",
  `${searched[0]?.name} (${searched.length} shown)`,
);

console.log(
  "\n" + (errs.length ? "JS ERRORS:\n" + errs.join("\n") : "no JS errors"),
);
console.log(`\n${R.filter(Boolean).length}/${R.length} assertions pass`);
await b.close();
