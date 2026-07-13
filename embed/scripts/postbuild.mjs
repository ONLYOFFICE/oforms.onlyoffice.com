/**
 * Rewrites root-absolute /fonts and /images urls in the built CSS to the CDN
 * base, so @font-face (from global.css) and any CSS icons resolve inside the
 * desktop tab. JS icon urls already go through getAssetUrl at build time.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const CDN = (process.env.EMBED_STATIC_URL || "https://oforms.onlyoffice.com").replace(/\/$/, "");
const cssFile = join(dist, "oforms.css");

const css = await readFile(cssFile, "utf8");
const fixed = css.replace(
  /url\((['"]?)\/(fonts|images)\//g,
  (_m, q, dir) => `url(${q}${CDN}/${dir}/`,
);
await writeFile(cssFile, fixed);
const count = (css.match(/url\((['"]?)\/(fonts|images)\//g) || []).length;
console.log(`postbuild: prefixed ${count} css asset url(s) with ${CDN}`);

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
