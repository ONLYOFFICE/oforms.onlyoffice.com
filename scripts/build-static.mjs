// Builds a fully static copy of the site into a separate folder, meant to be
// served from a sub-path on a second domain (default: /templates).
//
//   npm run build:static
//
// It runs a dedicated `next build` with STATIC_BASE_PATH set (so basePath /
// assetPrefix / NEXT_PUBLIC_STATIC_URL are baked in — see next.config.js), then
// assembles the build output into <STATIC_OUT_DIR>/<prefix>/ :
//
//   static-build/
//     templates/
//       _next/static/...          <- JS/CSS chunks (from .next/static)
//       _next/data/<BUILD_ID>/...  <- getStaticProps JSON (client navigation)
//       en.html, ar/....html, ...  <- prerendered pages (from .next/server/pages)
//       fonts/, images/, ...       <- public/ assets
//
// Serve static-build/ from the domain root => the site lives at
// https://<domain>/templates/. The normal `npm run build` is untouched.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PREFIX = (process.env.STATIC_BASE_PATH || "/templates").replace(/\/+$/, "");
const OUT = path.resolve(root, process.env.STATIC_OUT_DIR || "static-build");
// Pages that rely on getServerSideProps — no server here, so they are skipped.
const EXCLUDE_PAGES = new Set(["editor", "form-submit"]);

const NEXT = path.join(root, ".next");
const pagesDir = path.join(NEXT, "server", "pages");
const prefixDir = path.join(OUT, PREFIX.replace(/^\//, "")); // static-build/templates

function log(msg) {
  console.log(`[build-static] ${msg}`);
}

// 1. Dedicated production build with the sub-path baked in.
log(`Building with basePath=${PREFIX} (this can take a few minutes) ...`);
const build = spawnSync("npm", ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_BASE_PATH: PREFIX, NEXT_PUBLIC_STATIC_URL: PREFIX },
});
if (build.status !== 0) {
  log("next build failed — aborting.");
  process.exit(build.status || 1);
}

const BUILD_ID = fs.readFileSync(path.join(NEXT, "BUILD_ID"), "utf8").trim();
const dataDir = path.join(prefixDir, "_next", "data", BUILD_ID);

// 2. Fresh output folder.
log(`Assembling into ${OUT} ...`);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(prefixDir, { recursive: true });

// 3. Static chunks (JS/CSS).
fs.cpSync(path.join(NEXT, "static"), path.join(prefixDir, "_next", "static"), {
  recursive: true,
});

// 4. public/* (fonts, images, locales, robots.txt, sitemap.xml).
for (const entry of fs.readdirSync(path.join(root, "public"))) {
  fs.cpSync(path.join(root, "public", entry), path.join(prefixDir, entry), {
    recursive: true,
  });
}

// 5. Prerendered pages + their getStaticProps JSON.
let htmlCount = 0;
let dataCount = 0;
let skipped = 0;

function isExcluded(rel) {
  const base = rel.replace(/\.html$/, "");
  if (base.includes("[")) return true; // dynamic route placeholder, never a real page
  const segs = base.split("/");
  return EXCLUDE_PAGES.has(segs[segs.length - 1]) || EXCLUDE_PAGES.has(segs[0]);
}

function walkPages(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === "api") continue; // API routes need a server
      walkPages(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;

    const rel = path.relative(pagesDir, full).split(path.sep).join("/");
    if (isExcluded(rel)) {
      skipped++;
      continue;
    }

    const htmlDest = path.join(prefixDir, rel);
    fs.mkdirSync(path.dirname(htmlDest), { recursive: true });
    fs.copyFileSync(full, htmlDest);
    htmlCount++;

    const jsonSrc = full.replace(/\.html$/, ".json");
    if (fs.existsSync(jsonSrc)) {
      const jsonDest = path.join(dataDir, rel.replace(/\.html$/, ".json"));
      fs.mkdirSync(path.dirname(jsonDest), { recursive: true });
      fs.copyFileSync(jsonSrc, jsonDest);
      dataCount++;
    }
  }
}
walkPages(pagesDir);

// 6. Prefix public url() paths inside compiled CSS (@font-face, svg icons).
// assetPrefix does not rewrite absolute /fonts and /images urls in user CSS.
let cssFixed = 0;
let jsFixed = 0;

function walkFiles(dir, fn) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkFiles(full, fn);
    else fn(full);
  }
}

const staticOut = path.join(prefixDir, "_next", "static");
walkFiles(staticOut, (full) => {
  if (full.endsWith(".css")) {
    const css = fs.readFileSync(full, "utf8");
    const fixed = css.replace(
      /url\((['"]?)\/(fonts|images)\//g,
      (_m, q, dir) => `url(${q}${PREFIX}/${dir}/`,
    );
    if (fixed !== css) {
      fs.writeFileSync(full, fixed);
      cssFixed++;
    }
  } else if (full.endsWith(".js")) {
    // Safety net: if the turbopack chunk loader base was not prefixed by
    // assetPrefix, point it at the sub-path so lazy chunks resolve.
    const js = fs.readFileSync(full, "utf8");
    if (js.includes('let t="/_next/"')) {
      fs.writeFileSync(full, js.split('let t="/_next/"').join(`let t="${PREFIX}/_next/"`));
      jsFixed++;
    }
  }
});

log("Done.");
console.log(`
  Output folder : ${OUT}
  Served at     : https://<static-domain>${PREFIX}/
  HTML pages    : ${htmlCount} (skipped ${skipped}: ${[...EXCLUDE_PAGES].join(", ")}, api, dynamic)
  Data JSON     : ${dataCount}
  CSS url() fix : ${cssFixed} file(s)
  JS base fix   : ${jsFixed} file(s)
`);
