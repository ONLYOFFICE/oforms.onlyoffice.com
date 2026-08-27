/**
 * Rewrites root-absolute /images urls in the built CSS to the CDN base, so CSS
 * icons resolve inside the desktop tab. JS icon urls already go through
 * getAssetUrl at build time.
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
