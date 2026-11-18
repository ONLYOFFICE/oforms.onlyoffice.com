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
import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
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
const DRY_RUN = process.argv.includes("--dry-run");
const ALL = process.argv.includes("--all");
const PREVIEWS = join(dirname(fileURLToPath(import.meta.url)), "generate-previews.py");

const LOCALES = new Set(["ar", "de", "en", "es", "fr", "it", "ja", "pt", "zh"]);
const EXTS = new Set([".docx", ".xlsx", ".pptx", ".pdf"]);
const PAGE = 100; // DocSpace refuses more.
const PARALLEL = 4;
// ~3 s a file: a run cut short by the job timeout loses at most ~2.5 min of rendering.
const BATCH = 50;
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

const inParallel = (items, fn) => {
  const queue = [...items];
  const worker = async () => {
    for (let item; (item = queue.shift()); ) await fn(item);
  };
  return Promise.all(Array.from({ length: PARALLEL }, worker));
};

const run = async (cmd, args, options) =>
  (await promisify(execFile)(cmd, args, { maxBuffer: 64 << 20, ...options })).stdout;
const aws = (...args) => run("aws", args);

// path → upload time under one prefix; the CLI follows the listing's pages itself.
async function listBucket(url) {
  const { host: bucket, pathname } = new URL(url);
  const prefix = `${pathname.slice(1)}/`;
  const out = await aws("s3api", "list-objects-v2", "--bucket", bucket, "--prefix", prefix, "--output", "json");
  const objects = new Map();
  for (const o of JSON.parse(out || "{}").Contents ?? []) {
    objects.set(o.Key.slice(prefix.length), Date.parse(o.LastModified));
  }
  return objects;
}

// One request per 1,000 keys, where `aws s3 rm` costs a CLI start per key.
async function deleteImages(keys) {
  const { host: bucket, pathname } = new URL(IMAGES);
  for (let i = 0; i < keys.length; i += 1000) {
    const Objects = keys.slice(i, i + 1000).map((key) => ({ Key: `${pathname.slice(1)}/${key}` }));
    await aws("s3api", "delete-objects", "--bucket", bucket, "--delete", JSON.stringify({ Objects, Quiet: true }));
  }
}

// Exits 1 when any file failed; which ones shows in their missing cards.
const render = (input, output) =>
  new Promise((resolve, reject) => {
    spawn("python3", ["-u", PREVIEWS, "--strip", input, output], { stdio: "inherit" })
      .on("error", reject)
      .on("exit", (code) =>
        code === 0 || code === 1 ? resolve() : reject(new Error(`generate-previews.py exited ${code}`)),
      );
  });

const stemOf = (path) => path.slice(0, -extname(path).length);
// ar/docx/123.page.4.webp → ar/docx/123.docx
const fileOf = (key) => `${key.replace(/\.(card|page\.\d+)\.webp$/, "")}.${key.split("/")[1]}`;

// Files go up before their images: a card older than its file means "render again".
async function syncBatch(batch, images) {
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
    await render(src, out);

    await inParallel(batch.filter((item) => item.changed), async ({ path, name }) => {
      await aws("s3", "cp", join(src, path), `${BUCKET}/${path}`, "--only-show-errors", "--cache-control", IMMUTABLE);
      console.log(`  ↑ ${path}  ${name}`);
    });

    await aws("s3", "cp", out, IMAGES, "--recursive", "--only-show-errors",
      "--content-type", "image/webp", "--cache-control", IMMUTABLE);
    const rendered = new Set(await readdir(out, { recursive: true }));
    const done = new Set(batch.filter(({ path }) => rendered.has(`${stemOf(path)}.card.webp`)).map(({ path }) => path));
    // Pages past the new last page; a failed render keeps the old images until the retry.
    await deleteImages([...images.keys()].filter((key) => done.has(fileOf(key)) && !rendered.has(key)));
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

  const [objects, images] = await Promise.all([listBucket(BUCKET), listBucket(IMAGES)]);
  const work = [];
  for (const [path, { file, name }] of files) {
    const uploaded = objects.get(path);
    // No size check: a stripped object is a new save, not the file in the room.
    const changed = ALL || !uploaded || Date.parse(file.updated) > uploaded;
    const card = images.get(`${stemOf(path)}.card.webp`);
    if (changed || !card || card < uploaded) work.push({ path, file, name, changed });
  }
  const changed = work.filter((item) => item.changed).length;
  const orphans = [...objects.keys()].filter((path) => !files.has(path));
  const orphanImages = [...images.keys()].filter((key) => !files.has(fileOf(key)));

  console.log(
    `${files.size} files in the room, ${changed} new or changed, ${work.length} to render, ` +
      `${orphans.length} files and ${orphanImages.length} images to delete, ${skipped.length} skipped`,
  );
  for (const name of skipped) console.log(`  skipped ${name}`);
  if (DRY_RUN) {
    for (const { path, name, changed } of work) console.log(`  would ${changed ? "upload" : "render"} ${path}  ${name}`);
    for (const path of orphans) console.log(`  would delete ${path}`);
    for (const key of orphanImages) console.log(`  would delete images/${key}`);
    return;
  }

  let failed = 0;
  for (let i = 0; i < work.length; i += BATCH) {
    console.log(`== ${i + 1}–${Math.min(i + BATCH, work.length)} of ${work.length}`);
    failed += await syncBatch(work.slice(i, i + BATCH), images);
  }

  for (const path of orphans) {
    await aws("s3", "rm", `${BUCKET}/${path}`, "--only-show-errors");
    console.log(`  ✗ ${path}`);
  }
  await deleteImages(orphanImages);

  if (failed) {
    console.error(`${failed} previews failed; their files retry on the next run`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
