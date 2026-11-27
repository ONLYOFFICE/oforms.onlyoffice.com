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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// data/<locale>.json, written by sync-docspace.mjs next to the files it lists.
const DATA_URL =
  process.env.EMBED_DATA_URL || "https://static-oforms.onlyoffice.com/data";

// The ?v= stamp, in index.html's meta tag rather than fetched: fetching it cost a serial
// round trip before the catalog url could be built, 369 → ~550 ms cold. The deploy runs
// after the sync and passes the newest catalog's upload time, so a code-only deploy keeps
// the stamp; a local build has no bucket to ask and takes its own time.
const DATA_VERSION = new Date(process.env.EMBED_DATA_TIME || Date.now())
  .toISOString()
  .replace(/\D/g, "")
  .slice(0, 14);

// Origins allowed to talk to this page over postMessage. Desktop's start page runs
// from onlyoffice://plugin/…; a file:// host reports origin "null".
const HOST_ORIGINS = process.env.EMBED_HOST_ORIGINS || "null,file://,onlyoffice://plugin";

// Where the site header and footer point their links, as on the website.
const SITE_URL = process.env.EMBED_SITE_URL || "https://www.onlyoffice.com";

const stampVersion = () => ({
  name: "embed-data-version",
  transformIndexHtml: (html: string) =>
    html
      .replace("__EMBED_DATA_VERSION__", DATA_VERSION)
      .replace("__EMBED_DATA_URL__", DATA_URL.replace(/\/$/, "")),
});

export default defineConfig({
  plugins: [react(), stampVersion()],

  // Relative, so the same build works from a GitHub Pages sub-path, a custom
  // domain, or a plain directory — without knowing the deploy path up front.
  base: "./",

  define: {
    "process.env.EMBED_DATA_URL": JSON.stringify(DATA_URL),
    "process.env.EMBED_HOST_ORIGINS": JSON.stringify(HOST_ORIGINS),
    "process.env.EMBED_SITE_URL": JSON.stringify(SITE_URL),
  },

  resolve: {
    // Card and icon assets are shared with the site. Served over https here,
    // so they are ordinary hashed asset imports — no data-URI inlining needed.
    alias: {
      "@public": r("../public"),
      // The site header and footer are written for Next; these two are all they use of it.
      "next/link": r("./src/site/next-link.cjs"),
      "next/router": r("./src/site/next-router.cjs"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: { api: "modern-compiler" },
    },
  },

  server: {
    // i18n resources are globbed from the repo-root public/locales.
    fs: { allow: [".."] },
  },

  // Copied verbatim into the build output — currently just _headers.
  publicDir: r("./static"),

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // This is a normal web page now, not a CEF-only bundle, so the floor is set
    // explicitly rather than inherited from Vite's modern default.
    target: ["es2020", "chrome87", "edge88", "firefox78", "safari14"],
    cssTarget: ["chrome87", "edge88", "firefox78", "safari14"],
    // The kit is CommonJS and requires the two stand-ins above, so they need the same transform.
    commonjsOptions: { include: [/node_modules/, /src\/site\/.*\.cjs$/] },
  },
});
