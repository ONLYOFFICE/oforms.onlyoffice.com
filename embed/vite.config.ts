import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const THEME_DEFAULTS_ID = "virtual:oforms-theme-defaults.css";

function themeDefaults() {
  return {
    name: "oforms-theme-defaults",
    resolveId(id: string) {
      return id === THEME_DEFAULTS_ID ? "\0" + THEME_DEFAULTS_ID : null;
    },
    load(id: string) {
      if (id !== "\0" + THEME_DEFAULTS_ID) return null;
      const tokens = JSON.parse(
        readFileSync(r("./theme.default.json"), "utf8"),
      ) as Record<string, string>;
      const body = Object.entries(tokens)
        .map(([name, value]) => `--${name}: ${value};`)
        .join("\n  ");
      return `:root {\n  ${body}\n}\n`;
    },
  };
}

const STATIC_URL =
  process.env.EMBED_STATIC_URL || "https://oforms.onlyoffice.com";
const SITE_URL = process.env.EMBED_SITE_URL || "https://oforms.onlyoffice.com";

export default defineConfig({
  plugins: [react(), themeDefaults()],

  resolve: {
    alias: {
      "@src/utils/getAssetUrl": r("./shims/get-asset-url.ts"),
      "@src": r("../src"),
      "next/link": r("./shims/next-link.tsx"),
      "next/router": r("./shims/next-router.tsx"),
      "next/head": r("./shims/next-head.tsx"),
      "next/image": r("./shims/next-image.tsx"),
      "next-i18next": r("./shims/next-i18next.ts"),
    },
  },

  define: {
    "process.env.NEXT_PUBLIC_STATIC_URL": JSON.stringify(STATIC_URL),
    "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(SITE_URL),
    "process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN": JSON.stringify(SITE_URL),
    "process.env.EMBED_DATA_URL": JSON.stringify(
      process.env.EMBED_DATA_URL || `${SITE_URL}/oforms-editor/embed`,
    ),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [r("../src/styles")],
      },
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: r("./src/main.tsx"),
      formats: ["iife"],
      name: "OformsEmbed",
      fileName: () => "oforms.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (info) =>
          info.name && info.name.endsWith(".css")
            ? "oforms.css"
            : "assets/[name][extname]",
      },
    },
  },
});
