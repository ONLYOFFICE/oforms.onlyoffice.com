/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Copies template files from a DocSpace room to S3 and renders their previews.
 *
 * Room layout, as import-docspace.mjs writes it: <locale>/<ext>/<card title>.<ext>.
 * Objects are <locale>/<ext>/<docspace id>.<ext> under FILES_BUCKET_URL, overwritten
 * in place. A file is uploaded when it is missing or was saved in DocSpace after the
 * object was uploaded. Before upload, files lose their author, last editor and catalog
 * meta: generate-previews.py --strip empties them while it has the file open, so a
 * file whose render fails goes up as saved in the room.
 *
 * Previews from generate-previews.py go to <locale>/<ext>/<docspace id>.*.webp under
 * the sibling images/ prefix, rendered for every uploaded file and for every file whose
 * card is missing or older than it, so a failed or interrupted render is retried on the
 * next run. Objects and images with no file in the room are deleted.
 *
 * data/<locale>.json, beside them, holds a record per file with the custom properties the
 * strip emptied, newest first. A file whose record is missing or older than the room file
 * is rendered for it. After each batch, the locales whose records differ are rewritten;
 * the other records stay as they are, so a run cut short keeps what it rendered.
 * Locales render in parallel, RENDERERS at a time, so their output interleaves.
 *
 * Usage:
 *   node embed/scripts/sync-docspace.mjs [--dry-run] [--all]
 *
 * --all uploads and renders every file, changed or not.
 *
 * Env: DOCSPACE_URL, DOCSPACE_API_KEY, DOCSPACE_FOLDER_ID,
 *      FILES_BUCKET_URL (s3://bucket/files), DOCBUILDER_LICENSE (see generate-previews.py).
 * Needs python3 with generate-previews.py's packages, and the aws CLI with
 * read and write access to the bucket.
 */
import { createWriteStream } from "node:fs";
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { execFile, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const env = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value.replace(/\/$/, "");
};

const DOCSPACE = env("DOCSPACE_URL");
const API_KEY = env("DOCSPACE_API_KEY");
const FOLDER_ID = env("DOCSPACE_FOLDER_ID");
const BUCKET = env("FILES_BUCKET_URL");
const IMAGES = BUCKET.replace(/\/files$/, "/images");
if (IMAGES === BUCKET) throw new Error("FILES_BUCKET_URL must end in /files");
const DATA = BUCKET.replace(/\/files$/, "/data");
const DRY_RUN = process.argv.includes("--dry-run");
const ALL = process.argv.includes("--all");
const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const PREVIEWS = join(SCRIPTS, "generate-previews.py");

const LOCALES = new Set(["ar", "de", "en", "es", "fr", "it", "ja", "pt", "zh"]);
const CATEGORIES = new Set(Object.keys(JSON.parse(
  await readFile(join(SCRIPTS, "../../public/locales/en/embed.json"), "utf8")).CategoryNames));
const EXTS = new Set([".docx", ".xlsx", ".pptx", ".pdf"]);
const PAGE = 100; // DocSpace refuses more.
const PARALLEL = 4;
// One generate-previews.py process per batch. --strip runs a script on every file, and
// Builder keeps each file's JS context until its process exits (~150 MB a file on macOS,
// BUILDER-LEAK.md): 50 a process was killed on the runner in its first batch.
const BATCH = 10;
// Locales rendered at once, one worker each so their data/<locale>.json uploads never race.
// Each holds a process of BATCH files in memory.
const RENDERERS = 4;
const IMMUTABLE = "public, max-age=31536000, immutable";

const auth = { Authorization: `Bearer ${API_KEY}` };

async function get(path) {
  const res = await fetch(`${DOCSPACE}/api/2.0/${path}`, { headers: auth });
  if (!res.ok) throw new Error(`DocSpace ${res.status} GET ${path}`);
  const body = await res.json();
  return body.response ?? body;
}

async function listFolder(id) {
  const files = [];
  const folders = [];
  for (let start = 0; ; start += PAGE) {
    const page = await get(`files/${id}?startIndex=${start}&count=${PAGE}&withSubFolders=false`);
    files.push(...page.files);
    folders.push(...page.folders);
    if (start + PAGE >= page.total) return { files, folders };
  }
}

const inParallel = (items, fn, count = PARALLEL) => {
  const queue = [...items];
  const worker = async () => {
    for (let item; (item = queue.shift()); ) await fn(item);
  };
  return Promise.all(Array.from({ length: count }, worker));
};

const run = async (cmd, args, options) =>
  (await promisify(execFile)(cmd, args, { maxBuffer: 64 << 20, ...options })).stdout;
const aws = (...args) => run("aws", args);

// path → {time, size} under one prefix; the CLI follows the listing's pages itself.
async function listBucket(url) {
  const { host: bucket, pathname } = new URL(url);
  const prefix = `${pathname.slice(1)}/`;
  const out = await aws("s3api", "list-objects-v2", "--bucket", bucket, "--prefix", prefix, "--output", "json");
  const objects = new Map();
  for (const o of JSON.parse(out || "{}").Contents ?? []) {
    objects.set(o.Key.slice(prefix.length), { time: Date.parse(o.LastModified), size: o.Size });
  }
  return objects;
}

// path → the record the last run wrote. Listed first, so a missing file is not an error.
async function readData() {
  const records = new Map();
  for (const key of (await listBucket(DATA)).keys()) {
    for (const record of JSON.parse(String(await aws("s3", "cp", `${DATA}/${key}`, "-")))) records.set(record.path, record);
  }
  return records;
}

// One request per 1,000 keys, where `aws s3 rm` costs a CLI start per key.
async function deleteImages(keys) {
  const { host: bucket, pathname } = new URL(IMAGES);
  for (let i = 0; i < keys.length; i += 1000) {
    const Objects = keys.slice(i, i + 1000).map((key) => ({ Key: `${pathname.slice(1)}/${key}` }));
    await aws("s3api", "delete-objects", "--bucket", bucket, "--delete", JSON.stringify({ Objects, Quiet: true }));
  }
}

// Exits 3 when any file failed; which ones shows in their missing cards. Resolves to the
// signal or code when the process died instead: one file can crash Builder (SIGSEGV).
const render = (input, output) =>
  new Promise((resolve, reject) => {
    spawn("python3", ["-u", PREVIEWS, "--strip", input, output], { stdio: "inherit" })
      .on("error", reject)
      .on("exit", (code, signal) => resolve(code === 0 || code === 3 ? null : (signal ?? code)));
  });

const stemOf = (path) => path.slice(0, -extname(path).length);
// ar/docx/123.page.4.webp → ar/docx/123.docx
const fileOf = (key) => `${key.replace(/\.(card|page\.\d+)\.webp$/, "")}.${key.split("/")[1]}`;
const localeOf = (path) => path.slice(0, path.indexOf("/"));
// ISO dates, so plain comparison; localeCompare would build a collator per call.
const newest = (a, b) => {
  const x = a.meta?.added ?? "";
  const y = b.meta?.added ?? "";
  return x < y ? 1 : x > y ? -1 : a.path < b.path ? -1 : 1;
};

// locale → {set: {path: record}, remove: [path]} since the last applyChanges.
const changes = new Map();
const changeOf = (locale) => changes.get(locale) ?? changes.set(locale, { set: {}, remove: [] }).get(locale);

// Uploads data/<locale>.json for each given locale with a change; only these are rewritten.
// Taken off `changes` before the upload, since other locales' workers add to it meanwhile.
async function applyChanges(records, locales = [...changes.keys()]) {
  const dir = await mkdtemp(join(tmpdir(), "oforms-data-"));
  try {
    for (const locale of locales) {
      const change = changes.get(locale);
      if (!change) continue;
      changes.delete(locale);
      const { set, remove } = change;
      for (const path of remove) records.delete(path);
      const added = Object.keys(set).filter((path) => !records.has(path)).length;
      for (const [path, record] of Object.entries(set)) records.set(path, record);
      const list = [...records.values()].filter((r) => localeOf(r.path) === locale).sort(newest);
      const local = join(dir, `${locale}.json`);
      await writeFile(local, JSON.stringify(list));
      await aws("s3", "cp", local, `${DATA}/${locale}.json`, "--only-show-errors",
        "--content-type", "application/json", "--cache-control", IMMUTABLE);
      console.log(
        `  ↑ data/${locale}.json  ${list.length} templates: ${added} added, ` +
          `${Object.keys(set).length - added} updated, ${remove.length} removed`,
      );
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// Editors type the properties, so nothing stops a typo but this.
function check(records) {
  const problems = [];
  const slugs = new Set();
  for (const { path, meta } of records.values()) {
    if (!meta) {
      problems.push(`${path}: no properties, the strip failed`);
      continue;
    }
    const missing = ["slug", "category", "card-title", "added"].filter((name) => !meta[name]);
    if (missing.length) problems.push(`${path}: no ${missing.join(", ")}`);
    if (meta.category && !CATEGORIES.has(meta.category)) problems.push(`${path}: unknown category ${meta.category}`);
    if (meta.added && !/^\d{4}-\d{2}-\d{2}/.test(meta.added)) problems.push(`${path}: added ${meta.added} is not YYYY-MM-DD`);
    const slug = `${localeOf(path)}/${meta.slug}`;
    if (meta.slug && slugs.has(slug)) problems.push(`${path}: slug ${meta.slug} is taken`);
    slugs.add(slug);
  }
  return problems;
}

// Files go up before their images: a card older than its file means "render again".
// Records each file whose record changed and returns how many previews failed.
async function syncBatch(batch, { objects, images, records }) {
  const dir = await mkdtemp(join(tmpdir(), "oforms-sync-"));
  const src = join(dir, "files");
  const out = join(dir, "images");
  try {
    await inParallel(batch, async (item) => {
      const res = await fetch(item.file.viewUrl, { headers: auth });
      if (!res.ok) throw new Error(`DocSpace ${res.status} downloading ${item.name}`);
      const local = join(src, item.path);
      await mkdir(dirname(local), { recursive: true });
      await pipeline(Readable.fromWeb(res.body), createWriteStream(local));
    });

    await mkdir(out);
    const crashed = await render(src, out);
    // Nothing goes up: the strip may not have run on any of them. The next run retries.
    if (crashed) {
      console.log(`  ✗ ${localeOf(batch[0].path)}: generate-previews.py died (${crashed}): this batch is not uploaded`);
      return batch.length;
    }

    await inParallel(batch.filter((item) => item.changed), async ({ path, name }) => {
      await aws("s3", "cp", join(src, path), `${BUCKET}/${path}`, "--only-show-errors", "--cache-control", IMMUTABLE);
      console.log(`  ↑ ${path}  ${name}`);
    });

    await aws("s3", "cp", out, IMAGES, "--recursive", "--only-show-errors", "--exclude", "*.meta.json",
      "--content-type", "image/webp", "--cache-control", IMMUTABLE);
    const rendered = new Set(await readdir(out, { recursive: true }));
    const done = new Set(batch.filter(({ path }) => rendered.has(`${stemOf(path)}.card.webp`)).map(({ path }) => path));
    // Pages past the new last page; a failed render keeps the old images until the retry.
    await deleteImages([...images.keys()].filter((key) => done.has(fileOf(key)) && !rendered.has(key)));

    for (const { path, file, changed } of batch) {
      const stem = stemOf(path);
      // No meta.json: the strip failed, so the file went up as it is in the room.
      const meta = rendered.has(`${stem}.meta.json`)
        ? JSON.parse(await readFile(join(out, `${stem}.meta.json`), "utf8"))
        : null;
      const pages = [...(done.has(path) ? rendered : images.keys())].filter((key) => key.startsWith(`${stem}.page.`));
      const record = {
        path,
        id: file.id,
        version: file.version,
        updated: file.updated,
        size: changed ? (await stat(join(src, path))).size : objects.get(path).size,
        pages: pages.length,
        meta,
      };
      // A file that keeps failing is rendered every run; an unchanged record is no change.
      if (JSON.stringify(record) !== JSON.stringify(records.get(path))) changeOf(localeOf(path)).set[path] = record;
    }
    return batch.length - done.size;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function main() {
  const { folders } = await listFolder(FOLDER_ID);

  const files = new Map();
  const skipped = [];
  for (const folder of folders) {
    if (!LOCALES.has(folder.title)) {
      skipped.push(`${folder.title}/`);
      continue;
    }
    for (const extFolder of (await listFolder(folder.id)).folders) {
      for (const file of (await listFolder(extFolder.id)).files) {
        const ext = file.fileExst?.toLowerCase();
        const name = `${folder.title}/${extFolder.title}/${file.title}`;
        if (EXTS.has(ext)) files.set(`${folder.title}/${ext.slice(1)}/${file.id}${ext}`, { file, name });
        else skipped.push(name);
      }
    }
  }
  // A wrong folder id lists nothing, and would delete every object.
  if (files.size === 0) throw new Error(`no template files in DocSpace folder ${FOLDER_ID}`);

  const [objects, images, records] = await Promise.all([listBucket(BUCKET), listBucket(IMAGES), readData()]);
  const work = [];
  for (const [path, { file, name }] of files) {
    const uploaded = objects.get(path)?.time;
    // No size check: a stripped object is a new save, not the file in the room.
    const changed = ALL || !uploaded || Date.parse(file.updated) > uploaded;
    const card = images.get(`${stemOf(path)}.card.webp`)?.time;
    // The properties come from the strip, so a record is only written by a render.
    const stale = records.get(path)?.updated !== file.updated;
    if (changed || !card || card < uploaded || stale) work.push({ path, file, name, changed });
  }
  const changed = work.filter((item) => item.changed).length;
  const orphans = [...objects.keys()].filter((path) => !files.has(path));
  const orphanImages = [...images.keys()].filter((key) => !files.has(fileOf(key)));
  const gone = [...records.keys()].filter((path) => !files.has(path));

  console.log(
    `${files.size} files in the room, ${changed} new or changed, ${work.length} to render, ` +
      `${orphans.length} files, ${orphanImages.length} images and ${gone.length} records to delete, ` +
      `${skipped.length} skipped`,
  );
  for (const name of skipped) console.log(`  skipped ${name}`);
  if (DRY_RUN) {
    for (const { path, name, changed } of work) console.log(`  would ${changed ? "upload" : "render"} ${path}  ${name}`);
    for (const path of orphans) console.log(`  would delete ${path}`);
    for (const key of orphanImages) console.log(`  would delete images/${key}`);
    for (const path of gone) console.log(`  would delete the record of ${path}`);
    return;
  }

  for (const path of gone) changeOf(localeOf(path)).remove.push(path);

  const byLocale = Map.groupBy(work, (item) => localeOf(item.path));
  console.log(`rendering ${byLocale.size} locales, ${RENDERERS} at a time`);
  let failed = 0;
  await inParallel([...byLocale].sort((a, b) => b[1].length - a[1].length), async ([locale, items]) => {
    for (let i = 0; i < items.length; i += BATCH) {
      console.log(`== ${locale} ${i + 1}–${Math.min(i + BATCH, items.length)} of ${items.length}`);
      // Not `failed += await …`: that reads `failed` before the await, losing other workers' counts.
      const batchFailed = await syncBatch(items.slice(i, i + BATCH), { objects, images, records });
      failed += batchFailed;
      await applyChanges(records, [locale]);
    }
  }, RENDERERS);

  for (const path of orphans) {
    await aws("s3", "rm", `${BUCKET}/${path}`, "--only-show-errors");
    console.log(`  ✗ ${path}`);
  }
  await deleteImages(orphanImages);
  await applyChanges(records);

  const problems = check(records);
  for (const problem of problems) console.error(`  ! ${problem}`);
  if (failed) console.error(`${failed} previews failed; their files retry on the next run`);
  if (failed || problems.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
