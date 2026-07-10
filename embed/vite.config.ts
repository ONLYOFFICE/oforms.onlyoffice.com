import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Where the desktop bundle loads assets (fonts, icons, card previews) and where
// outbound links (cards, search) point. Both default to the live oforms site;
// override with EMBED_STATIC_URL / EMBED_SITE_URL at build time.
const STATIC_URL = process.env.EMBED_STATIC_URL || "https://oforms.onlyoffice.com";
const SITE_URL = process.env.EMBED_SITE_URL || "https://oforms.onlyoffice.com";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Reuse the real app source.
      "@src": r("../src"),
      // Next.js shims — let the real components run outside Next.
      "next/link": r("./shims/next-link.tsx"),
      "next/router": r("./shims/next-router.tsx"),
      "next/head": r("./shims/next-head.tsx"),
      "next/image": r("./shims/next-image.tsx"),
      "next-i18next": r("./shims/next-i18next.ts"),
    },
  },

  // Inline the env reads our components make (getAssetUrl, ui/Link).
  define: {
    "process.env.NEXT_PUBLIC_STATIC_URL": JSON.stringify(STATIC_URL),
    "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(SITE_URL),
    "process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN": JSON.stringify(SITE_URL),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // Matches next.config.js sassOptions.loadPaths so `@use "media"` etc. resolve.
        loadPaths: [r("../src/styles")],
      },
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false, // one CSS file
    assetsInlineLimit: 0,
    // Classic IIFE bundle (not an ES module) so the two files work with NO
    // server — openable from file://, or embedded straight into the app.
    lib: {
      entry: r("./src/main.tsx"),
      formats: ["iife"],
      name: "OformsEmbed",
      fileName: () => "oforms.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (info) =>
          info.name && info.name.endsWith(".css") ? "oforms.css" : "assets/[name][extname]",
      },
    },
  },
});
