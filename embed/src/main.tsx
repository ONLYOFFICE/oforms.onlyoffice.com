import "./global.css";
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { EmbedApp } from "./EmbedApp";
import { initI18n } from "./i18n";
import { loadData, fetchFreshData } from "./data";
import { normalizeLocale, type Locale } from "./locale";
import type { TTemplate } from "./EmbedApp/components/TemplateModal";
import { applyTheme, type Theme } from "./theme";
import { getDesktopLocale, watchDesktopLocale } from "./desktop";

type Target = string | Element;

interface RenderOptions {
  locale?: string;
  onEdit?: (template: TTemplate) => void;
  theme?: Theme;
}

interface Instance {
  el: Element;
  root: Root;
  locale: Locale;
}

let instance: Instance | null = null;
let options: RenderOptions = {};

function resolve(target: Target): Element | null {
  return typeof target === "string"
    ? document.querySelector(target)
    : (target ?? null);
}

interface OformFile {
  name?: string;
  url?: string;
  size?: number;
  ext?: string;
}

function versionGte(v1: string, v2: string): boolean {
  const a = v1.split(".").map(Number);
  const b = v2.split(".").map(Number);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const n1 = a[i] || 0;
    const n2 = b[i] || 0;
    if (n1 > n2) return true;
    if (n1 < n2) return false;
  }
  return true;
}

function openInDesktop(template: TTemplate): void {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const editor = (window as any).AscDesktopEditor;
  const files: OformFile[] = template?.file_oform ?? [];
  const name: string = template?.name_form ?? "template";

  const byExt = (ext: string) =>
    files.find(
      (f) =>
        String(f.ext ?? "")
          .replace(/^\./, "")
          .toLowerCase() === ext,
    );

  if (!editor || typeof editor.openTemplate !== "function") {
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
    const url = String(template?.url ?? "");
    const path = url.startsWith("/") ? url : `/${url}`;
    if (typeof window !== "undefined")
      window.open(site + path, "_blank", "noopener");
    return;
  }

  const open = (file: OformFile | undefined, ext: string) => {
    if (file?.url) editor.openTemplate(file.url, `${name}.${ext}`);
  };

  const docx = byExt("docx");
  const pptx = byExt("pptx");
  const xlsx = byExt("xlsx");
  if (docx) return open(docx, "docx");
  if (pptx) return open(pptx, "pptx");
  if (xlsx) return open(xlsx, "xlsx");

  const m = /AscDesktopEditor\/([\d.]+)/.exec(ua);
  const gte81 = m ? versionGte(m[1], "8.1") : true;
  const pdf = byExt("pdf");
  const docxf = byExt("docxf");
  if (gte81 && pdf) return open(pdf, "pdf");
  if (!gte81 && docxf) return open(docxf, "docxf");
  if (pdf) return open(pdf, "pdf");
  if (docxf) return open(docxf, "docxf");
}

function renderApp(root: Root, locale: Locale, data: any): void {
  root.render(
    <StrictMode>
      <EmbedApp
        locale={locale}
        data={data}
        onLocaleChange={setLocale}
        onEdit={options.onEdit ?? openInDesktop}
      />
    </StrictMode>,
  );
}

let pendingLocale: string | null = null;
let mountSeq = 0;

async function mount(el: Element, culture?: string): Promise<void> {
  const seq = ++mountSeq;
  const locale = normalizeLocale(culture);
  await initI18n(locale);
  const data = await loadData(locale);
  if (seq !== mountSeq) return; // superseded by a newer mount

  const root = instance && instance.el === el ? instance.root : createRoot(el);
  instance = { el, root, locale };
  renderApp(root, locale, data);

  fetchFreshData(locale).then((fresh) => {
    if (fresh && instance && instance.el === el && instance.locale === locale) {
      renderApp(instance.root, locale, fresh);
      console.info(
        `[oforms-embed] catalog revalidated (${locale}, ${fresh.data?.length ?? 0} templates)`,
      );
    }
  });

  // a desktop language change may have arrived while this mount was in flight
  if (pendingLocale) {
    const next = pendingLocale;
    pendingLocale = null;
    if (normalizeLocale(next) !== locale) await mount(el, next);
  }
}

export function render(target: Target, opts?: RenderOptions): Promise<boolean> {
  const el = resolve(target);
  if (!el) {
    console.error("[oforms-embed] render: target not found:", target);
    return Promise.resolve(false);
  }
  options = {
    onEdit: opts?.onEdit,
  };
  if (opts?.theme && el instanceof HTMLElement) applyTheme(opts.theme, el);
  const locale =
    opts?.locale ?? pendingLocale ?? getDesktopLocale() ?? undefined;
  pendingLocale = null;
  return mount(el, locale).then(() => true);
}

export function setLocale(culture: string): Promise<boolean> {
  if (!instance) {
    console.warn("[oforms-embed] setLocale called before render — ignored");
    return Promise.resolve(false);
  }
  return mount(instance.el, culture).then(() => true);
}

export function setTheme(theme: Theme): boolean {
  if (!instance || !(instance.el instanceof HTMLElement)) {
    console.warn("[oforms-embed] setTheme called before render — ignored");
    return false;
  }
  applyTheme(theme, instance.el);
  return true;
}

export function destroy(): void {
  if (!instance) return;
  instance.root.unmount();
  instance = null;
}

function applyDesktopLocale(culture: string) {
  if (!culture) return;
  if (instance && normalizeLocale(culture) === instance.locale) return;
  if (instance) setLocale(culture);
  else pendingLocale = culture;
}

declare global {
  interface Window {
    OformsEmbed?: any;
  }
}

if (typeof window !== "undefined") {
  window.OformsEmbed = { render, setLocale, setTheme, destroy };
  watchDesktopLocale(applyDesktopLocale);
  const auto = () => {
    const el = document.querySelector("[data-oforms-auto]");
    if (el) render(el, { locale: el.getAttribute("data-locale") || undefined });
  };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", auto);
  else auto();
}
