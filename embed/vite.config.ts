import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const STATIC_URL =
  process.env.EMBED_STATIC_URL || "https://oforms.onlyoffice.com";
const SITE_URL = process.env.EMBED_SITE_URL || "https://oforms.onlyoffice.com";

export default defineConfig({
  plugins: [react()],

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
