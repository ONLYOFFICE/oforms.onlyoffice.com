import "@src/styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainTemplate } from "@src/components/templates/Main";
import { RouterProvider } from "../shims/next-router";
import { initI18n } from "./i18n";
import allForms from "../data/main.en.json";

const mount =
  document.getElementById("oforms-root") ?? document.getElementById("root");

if (!mount) {
  throw new Error('oforms embed: mount node #oforms-root not found');
}

const locale = mount.dataset.locale || "en";

initI18n(locale).then(() => {
  createRoot(mount).render(
    <StrictMode>
      <RouterProvider locale={locale}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MainTemplate allForms={allForms as any} />
      </RouterProvider>
    </StrictMode>,
  );
});
