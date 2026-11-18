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
 * Copies template files from a DocSpace room to S3.
 *
 * Room layout, as import-docspace.mjs writes it: <locale>/<ext>/<card title>.<ext>.
 * Objects are <locale>/<ext>/<docspace id>.<ext> under FILES_BUCKET_URL, overwritten
 * in place. A file is uploaded when it is missing or was saved in DocSpace after the
 * object was uploaded. Objects with no file in the room are deleted. Before upload,
 * .docx/.xlsx/.pptx lose their author and last editor, as onlyoffice/tools/metadata does.
 *
 * Usage:
 *   node embed/scripts/sync-docspace.mjs [--dry-run]
 *
 * Env: DOCSPACE_URL, DOCSPACE_API_KEY, DOCSPACE_FOLDER_ID,
 *      FILES_BUCKET_URL (s3://bucket/files).
 * Needs zip, unzip and the aws CLI with read and write access to the bucket.
 */
import { createWriteStream } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { execFile } from "node:child_process";
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
const DRY_RUN = process.argv.includes("--dry-run");

const LOCALES = new Set(["ar", "de", "en", "es", "fr", "it", "ja", "pt", "zh"]);
const EXTS = new Set([".docx", ".xlsx", ".pptx", ".pdf"]);
const OOXML = new Set([".docx", ".xlsx", ".pptx"]);
const PAGE = 100; // DocSpace refuses more.
const PARALLEL = 4;

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

// ONLYOFFICE saves the editor's name as lastModifiedBy: 112 of 1,897 files today.
const AUTHOR = /<(dc:creator|cp:lastModifiedBy)\b[^>]*>[^<]+<\/\1>/g;

// Replaces only core.xml inside the zip: 0.08 s on the largest file, 58 MB.
async function stripAuthor(file) {
  const core = await run("unzip", ["-p", file, "docProps/core.xml"]);
  const stripped = core.replace(AUTHOR, "");
  if (stripped === core) return false;
  const dir = `${file}.d`;
  await mkdir(join(dir, "docProps"), { recursive: true });
  await writeFile(join(dir, "docProps", "core.xml"), stripped);
  await run("zip", ["-qX", file, "docProps/core.xml"], { cwd: dir });
  await rm(dir, { recursive: true });
  return true;
}

// path → upload time; the CLI follows the listing's pages itself.
async function listBucket() {
  const { host: bucket, pathname } = new URL(BUCKET);
  const prefix = `${pathname.slice(1)}/`;
  const out = await aws("s3api", "list-objects-v2", "--bucket", bucket, "--prefix", prefix, "--output", "json");
  const objects = new Map();
  for (const o of JSON.parse(out || "{}").Contents ?? []) {
    objects.set(o.Key.slice(prefix.length), Date.parse(o.LastModified));
  }
  return objects;
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

  const objects = await listBucket();
  // No size check: a stripped object is smaller than its file in the room.
  const changed = [...files].filter(([path, { file }]) => {
    const uploaded = objects.get(path);
    return !uploaded || Date.parse(file.updated) > uploaded;
  });
  const orphans = [...objects.keys()].filter((path) => !files.has(path));

  console.log(
    `${files.size} files in the room, ${changed.length} new or changed, ` +
      `${orphans.length} to delete, ${skipped.length} skipped`,
  );
  for (const name of skipped) console.log(`  skipped ${name}`);
  if (DRY_RUN) {
    for (const [path, { name }] of changed) console.log(`  would upload ${path}  ${name}`);
    for (const path of orphans) console.log(`  would delete ${path}`);
    return;
  }

  const dir = await mkdtemp(join(tmpdir(), "oforms-sync-"));
  try {
    await inParallel(changed, async ([path, { file, name }]) => {
      const res = await fetch(file.viewUrl, { headers: auth });
      if (!res.ok) throw new Error(`DocSpace ${res.status} downloading ${name}`);
      const local = join(dir, path.replaceAll("/", "_"));
      await pipeline(Readable.fromWeb(res.body), createWriteStream(local));
      const stripped = OOXML.has(extname(path)) && (await stripAuthor(local));
      await aws("s3", "cp", local, `${BUCKET}/${path}`, "--only-show-errors",
        "--cache-control", "public, max-age=31536000, immutable");
      await rm(local);
      console.log(`  ✓ ${path}  ${name}${stripped ? "  (author removed)" : ""}`);
    });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }

  for (const path of orphans) {
    await aws("s3", "rm", `${BUCKET}/${path}`, "--only-show-errors");
    console.log(`  ✗ ${path}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
