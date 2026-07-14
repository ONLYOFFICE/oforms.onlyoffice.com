/**
 * Rewrites root-absolute /fonts and /images urls in the built CSS to the CDN
 * base, so @font-face (from global.css) and any CSS icons resolve inside the
 * desktop tab. JS icon urls already go through getAssetUrl at build time.
 */
import { readFile, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const CDN = (process.env.EMBED_STATIC_URL || "https://oforms.onlyoffice.com").replace(/\/$/, "");
const cssFile = join(dist, "oforms.css");
const FONTS_DIR = join(__dirname, "..", "..", "public", "fonts");

// Fonts the catalog actually renders with, inlined into the CSS as base64 so
// the embed needs no font hosting (the prod site doesn't serve the redesign
// assets yet). Other weights/italics keep CDN urls and synthesize if missing.
const INLINE_FONTS = new Set([
  "Sora-Regular.woff2",
  "Sora-Medium.woff2",
  "Sora-SemiBold.woff2",
  "Sora-Bold.woff2",
  "Sora-ExtraBold.woff2",
  "OpenSans-Regular.woff2",
  "OpenSans-SemiBold.woff2",
  "OpenSans-Bold.woff2",
]);

const readFont = (name) => {
  try {
    return readFileSync(join(FONTS_DIR, name));
  } catch {
    return null;
  }
};
const magic = (buf) => (buf && buf.length > 4 ? buf.toString("latin1", 0, 4) : "");

const css = await readFile(cssFile, "utf8");
let inlined = 0;
let repaired = 0;
let prefixed = 0;

// Pass 1: whitelisted woff2 sources (url + format hint together). The actual
// container is validated by magic bytes — the repo's OpenSans "*.woff2" files
// are corrupt, so for those the valid .woff sibling is inlined instead, with
// the format hint corrected (otherwise the browser rejects the face).
let fixed = css.replace(
  /url\((['"]?)\/fonts\/([\w.-]+\.woff2)\1\)\s*format\((['"]?)woff2\3\)/g,
  (match, q, name, fq) => {
    if (INLINE_FONTS.has(name)) {
      const woff2 = readFont(name);
      if (magic(woff2) === "wOF2") {
        inlined++;
        return `url(data:font/woff2;base64,${woff2.toString("base64")}) format(${fq}woff2${fq})`;
      }
      const woff = readFont(name.replace(/\.woff2$/, ".woff"));
      if (magic(woff) === "wOFF") {
        repaired++;
        return `url(data:font/woff;base64,${woff.toString("base64")}) format(${fq}woff${fq})`;
      }
    }
    prefixed++;
    return `url(${q}${CDN}/fonts/${name}${q}) format(${fq}woff2${fq})`;
  },
);

// Pass 2: everything else root-absolute -> CDN.
fixed = fixed.replace(/url\((['"]?)\/(fonts|images)\/([^)'"]+)\1\)/g, (m, q, dir, rest) => {
  prefixed++;
  return `url(${q}${CDN}/${dir}/${rest}${q})`;
});

await writeFile(cssFile, fixed);
console.log(
  `postbuild: inlined ${inlined} woff2 + ${repaired} repaired woff font(s), prefixed ${prefixed} css url(s) with ${CDN}`,
);

// Classic (non-module) script tag => works with no server, even from file://.
// Demonstrates the real integration: load the script, then call render().
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ONLYOFFICE Forms</title>
    <link rel="stylesheet" href="oforms.css" />
  </head>
  <body>
    <div id="oforms-root"></div>
    <script src="oforms.js"></script>
    <script>
      // Host calls this when the container exists. Pass the desktop UI language
      // (a culture code like "ru-RU"); unsupported languages fall back to English.
      OformsEmbed.render("#oforms-root", { locale: "en" });
    </script>
  </body>
</html>
`;
await writeFile(join(dist, "index.html"), html);
console.log("postbuild: wrote dist/index.html (classic script, no server needed)");

// Desktop simulator page: stubs the AscDesktopEditor native bridge so the
// desktop integration (openTemplate, settings:init locale) can be tested in a
// plain browser. Regenerated on every build since dist/ is wiped.
const sim = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Desktop Simulator — ONLYOFFICE Forms</title>
  <link rel="stylesheet" href="oforms.css" />
  <script>
    // === Native bridge stub (must exist BEFORE oforms.js loads!) ===
    window.desktopSim = { nativeListeners: [] };
    window.AscDesktopEditor = {
      openTemplate: function (url, name) {
        console.info("[desktop-sim] openTemplate:", name, "\\u2192", url);
        alert("openTemplate\\n" + name + "\\n" + url);
      },
      attachEvent: function (event, cb) {
        console.info("[desktop-sim] attachEvent:", event);
        window.desktopSim.nativeListeners.push({ event: event, cb: cb });
      },
    };
    // Emulate the desktop changing its UI language:
    //   desktopSim.setLanguage("de-DE")
    window.desktopSim.setLanguage = function (locale) {
      window.desktopSim.nativeListeners
        .filter(function (l) { return l.event === "on_native_message"; })
        .forEach(function (l) { l.cb("settings:init", JSON.stringify({ locale: locale })); });
    };
    console.info('[desktop-sim] ready. Try: desktopSim.setLanguage("de-DE")');
  </script>
</head>
<body>
  <div id="oforms-root"></div>
  <script src="oforms.js"></script>
  <script>
    OformsEmbed.render("#oforms-root", {
      locale: "ru-RU", // what the desktop would pass; unsupported -> English
      editLabel: "\\u0418\\u0441\\u043f\\u043e\\u043b\\u044c\\u0437\\u043e\\u0432\\u0430\\u0442\\u044c \\u044d\\u0442\\u043e\\u0442 \\u0448\\u0430\\u0431\\u043b\\u043e\\u043d",
    });
  </script>
</body>
</html>
`;
await writeFile(join(dist, "desktop-sim.html"), sim);
console.log("postbuild: wrote dist/desktop-sim.html (AscDesktopEditor stub)");
