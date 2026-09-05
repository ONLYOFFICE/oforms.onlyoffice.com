/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Where the catalog JSON lives. Kept on S3/CloudFront rather than GitHub Pages:
// ~17 MB across all locales would burn the Pages bandwidth allowance. The
// `access-control-allow-origin: *` these objects answer with is S3's — Next
// never serves this path.
const DATA_URL =
  process.env.EMBED_DATA_URL ||
  "https://oforms.onlyoffice.com/oforms-editor/embed";

// Origins allowed to talk to this page over postMessage. The desktop host runs
// from file:// (origin "null"), so that is included deliberately.
const HOST_ORIGINS = process.env.EMBED_HOST_ORIGINS || "null,file://";

export default defineConfig({
  plugins: [react()],

  // Relative, so the same build works from a GitHub Pages sub-path, a custom
  // domain, or a plain directory — without knowing the deploy path up front.
  base: "./",

  define: {
    "process.env.EMBED_DATA_URL": JSON.stringify(DATA_URL),
    "process.env.EMBED_HOST_ORIGINS": JSON.stringify(HOST_ORIGINS),
  },

  resolve: {
    // Card and icon assets are shared with the site. Served over https here,
    // so they are ordinary hashed asset imports — no data-URI inlining needed.
    alias: { "@public": r("../public") },
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
  },
});
