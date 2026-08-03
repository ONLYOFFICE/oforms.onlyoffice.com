/**
 * Rewrites root-absolute /images urls in the built CSS to the CDN base, so CSS
 * icons resolve inside the desktop tab. JS icon urls already go through
 * getAssetUrl at build time.
 *
 * Fonts are handled entirely by Vite: src/global.css points at src/fonts/*.woff2
 * with relative urls, and the library-mode build inlines module-graph assets, so
 * every @font-face in the built CSS should carry a `data:` uri. This script only
 * verifies that — a face left pointing at a file or a CDN would render in a
 * fallback font inside the desktop tab, where there is nothing to serve it.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const CDN = (
  process.env.EMBED_STATIC_URL || "https://oforms.onlyoffice.com"
).replace(/\/$/, "");
const cssFile = join(dist, "oforms.css");

const css = await readFile(cssFile, "utf8");
let prefixed = 0;

const fixed = css.replace(/url\((['"]?)\/images\/([^)'"]+)\1\)/g, (m, q, rest) => {
  prefixed++;
  return `url(${q}${CDN}/images/${rest}${q})`;
});

await writeFile(cssFile, fixed);
console.log(`postbuild: prefixed ${prefixed} css url(s) with ${CDN}`);

// Every src: in every @font-face must be a data: uri — anything else is a runtime
// dependency the embed can't satisfy. Both counts are reported so a face that
// silently stopped being bundled is visible in the build log.
const faces = [...fixed.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
const external = faces
  .flatMap((body) => [...body.matchAll(/url\((['"]?)(?!data:)([^)'"]+)\1\)/g)])
  .map((m) => m[2]);
console.log(
  `postbuild: ${faces.length} @font-face rule(s), ${faces.length - external.length} inlined as data: uri(s)`,
);

if (!faces.length) {
  console.error(
    "postbuild: ERROR the built css declares no @font-face — the embed would render in the\n" +
      "  host tab's fallback font. Check that src/main.tsx still imports src/global.css\n" +
      "  (which declares the @font-face rules).",
  );
  process.exitCode = 1;
} else if (external.length) {
  console.error(
    `postbuild: ERROR ${external.length} @font-face src(s) are not inlined: ${[...new Set(external)].join(", ")}\n` +
      `  The face would have to be fetched at runtime, which the desktop tab can't do. Check that\n` +
      `  the file exists under src/fonts/ and that src/global.css references it with a RELATIVE url\n` +
      `  (a root-absolute /fonts/... url resolves against publicDir and is never inlined).`,
  );
  process.exitCode = 1;
}

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
      // (a culture code like "en-US"); unsupported languages fall back to English.
      OformsEmbed.render("#oforms-root", { locale: "en" });
    </script>
  </body>
</html>
`;
await writeFile(join(dist, "index.html"), html);
console.log(
  "postbuild: wrote dist/index.html (classic script, no server needed)",
);

// Ship the default theme JSON alongside the bundle — a starting point for the
// host to build its own override object from (see README "Theming").
const themeDefaultSrc = join(__dirname, "..", "theme.default.json");
const themeDefaultDist = join(dist, "theme.default.json");
await writeFile(themeDefaultDist, await readFile(themeDefaultSrc, "utf8"));
console.log("postbuild: wrote dist/theme.default.json");
