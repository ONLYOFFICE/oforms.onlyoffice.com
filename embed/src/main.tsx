import "@src/styles/global.css";
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { EmbedApp } from "./EmbedApp";
import { initI18n } from "./i18n";
import { loadData, fetchFreshData } from "./data";
import { normalizeLocale, type Locale } from "./locale";
import type { Template } from "./TemplateModal";
import { applyTheme, type Theme } from "./theme";

type Target = string | Element;

interface RenderOptions {
  locale?: string;
  /** Called when the user clicks "Use this template" in a template's popup. */
  onEdit?: (template: Template) => void;
  /** Label of the popup's confirm button (default "Use this template"). */
  editLabel?: string;
  /** Label of the popup's cancel button (default "Cancel"). */
  cancelLabel?: string;
  /** Color overrides, e.g. `{ "main-heading-color": "#eaeaea" }` — see
   *  theme.default.json for every available name and its default value. */
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
  return typeof target === "string" ? document.querySelector(target) : (target ?? null);
}

interface OformFile {
  name?: string;
  url?: string;
  size?: number;
  ext?: string;
}

/** Compare desktop editor versions; true if v1 >= v2 (matches the old client). */
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

/** Open a template in the desktop editor via the native bridge.
 *  Format selection mirrors the previous desktop client:
 *  docx > pptx > xlsx, and for forms pdf (editor > 8.1) else docxf. */
function openInDesktop(template: Template): void {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editor = (window as any).AscDesktopEditor;
  const files: OformFile[] = template?.file_oform ?? [];
  const name: string = template?.name_form ?? "template";

  const byExt = (ext: string) =>
    files.find((f) => String(f.ext ?? "").replace(/^\./, "").toLowerCase() === ext);

  // No native bridge (browser/preview) -> open the template page on the site.
  if (!editor || typeof editor.openTemplate !== "function") {
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
    const url = String(template?.url ?? "");
    const path = url.startsWith("/") ? url : `/${url}`;
    if (typeof window !== "undefined") window.open(site + path, "_blank", "noopener");
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

  // Form template: pdf for editor > 8.1, docxf otherwise.
  const m = /AscDesktopEditor\/([\d.]+)/.exec(ua);
  const gte81 = m ? versionGte(m[1], "8.1") : true;
  const pdf = byExt("pdf");
  const docxf = byExt("docxf");
  if (gte81 && pdf) return open(pdf, "pdf");
  if (!gte81 && docxf) return open(docxf, "docxf");
  if (pdf) return open(pdf, "pdf");
  if (docxf) return open(docxf, "docxf");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderApp(root: Root, locale: Locale, data: any): void {
  root.render(
    <StrictMode>
      <EmbedApp
        locale={locale}
        data={data}
        onLocaleChange={setLocale}
        onEdit={options.onEdit ?? openInDesktop}
        editLabel={options.editLabel ?? "Use this template"}
        cancelLabel={options.cancelLabel ?? "Cancel"}
      />
    </StrictMode>,
  );
}

async function mount(el: Element, culture?: string): Promise<void> {
  const locale = normalizeLocale(culture);
  await initI18n(locale);
  const data = await loadData(locale); // bundled snapshot — instant

  const root = instance && instance.el === el ? instance.root : createRoot(el);
  instance = { el, root, locale };
  renderApp(root, locale, data);

  // Background: swap in a fresher copy from the site, if still on this locale.
  fetchFreshData(locale).then((fresh) => {
    if (fresh && instance && instance.el === el && instance.locale === locale) {
      renderApp(instance.root, locale, fresh);
      console.info(
        `[oforms-embed] catalog revalidated (${locale}, ${fresh.data?.length ?? 0} templates)`,
      );
    }
  });
}

// Locale pushed by the desktop before render() was called.
let pendingLocale: string | null = null;

/** Render the catalog into `target`. Call whenever the container exists. */
export function render(target: Target, opts?: RenderOptions): Promise<boolean> {
  const el = resolve(target);
  if (!el) {
    console.error("[oforms-embed] render: target not found:", target);
    return Promise.resolve(false);
  }
  options = { onEdit: opts?.onEdit, editLabel: opts?.editLabel, cancelLabel: opts?.cancelLabel };
  if (opts?.theme && el instanceof HTMLElement) applyTheme(opts.theme, el);
  const locale = opts?.locale ?? pendingLocale ?? undefined;
  return mount(el, locale).then(() => true);
}

/** Change language at runtime (accepts a culture code like "ru-RU" or "de"). */
export function setLocale(culture: string): Promise<boolean> {
  if (!instance) {
    console.warn("[oforms-embed] setLocale called before render — ignored");
    return Promise.resolve(false);
  }
  return mount(instance.el, culture).then(() => true);
}

/** Apply color overrides at runtime (e.g. when the desktop's theme changes) —
 *  no re-render needed, just updates CSS custom properties on the mount root. */
export function setTheme(theme: Theme): boolean {
  if (!instance || !(instance.el instanceof HTMLElement)) {
    console.warn("[oforms-embed] setTheme called before render — ignored");
    return false;
  }
  applyTheme(theme, instance.el);
  return true;
}

/** Unmount and clean up. */
export function destroy(): void {
  if (!instance) return;
  instance.root.unmount();
  instance = null;
}

/** Apply a locale from the desktop: switch now if rendered, else remember it. */
function applyDesktopLocale(culture: string) {
  if (!culture) return;
  if (instance) setLocale(culture);
  else pendingLocale = culture;
}

/** Extract the current locale from a native message. The desktop's
 *  "settings:init" carries `{ locale: { current: "en-US", langs: {...} } }`
 *  (observed on Desktop Editors 9.3); string shapes are kept as a fallback.
 *  "settings:lang" is also accepted in case it carries the new locale. */
function localeFromSettings(command: unknown, param: unknown): string | null {
  if (command !== "settings:init" && command !== "settings:lang") return null;
  try {
    if (typeof param === "string" && !param.trim().startsWith("{")) {
      // Non-JSON payload (e.g. settings:lang "restart:false") — take a culture
      // code if one is present, otherwise ignore.
      const m = /([a-z]{2,3}(?:-[A-Za-z]{2,4})+)/.exec(param);
      return m ? m[1] : null;
    }
    const data =
      typeof param === "string" ? JSON.parse(param) : (param as Record<string, unknown>);
    const raw =
      data?.locale ?? data?.lang ?? data?.language ?? data?.culture ?? data?.lng;
    if (raw && typeof raw === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const current = (raw as any).current ?? (raw as any).value;
      return current ? String(current) : null;
    }
    return raw ? String(raw) : null;
  } catch {
    return null;
  }
}

/** Subscribe to the ONLYOFFICE Desktop native bridge to follow its UI language.
 *  Desktop builds deliver native messages in one of two ways: via
 *  attachEvent("on_native_message") or by calling a global
 *  window.on_native_message(cmd, param) — hook both. */
function subscribeDesktopLocale() {
  const handle = (command: unknown, param: unknown) => {
    console.debug("[oforms-embed] native message:", command, param);
    const loc = localeFromSettings(command, param);
    if (loc) applyDesktopLocale(loc);
  };
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor = (window as any).AscDesktopEditor;
    if (editor && typeof editor.attachEvent === "function") {
      editor.attachEvent("on_native_message", handle);
    }
  } catch (e) {
    console.warn("[oforms-embed] could not subscribe to desktop messages", e);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const prev = w.on_native_message;
    w.on_native_message = function (command: unknown, param: unknown) {
      handle(command, param);
      if (typeof prev === "function") {
        // eslint-disable-next-line prefer-rest-params
        return prev.apply(this, arguments);
      }
    };
  } catch (e) {
    console.warn("[oforms-embed] could not install global on_native_message", e);
  }
}

// The IIFE build assigns these exports to window.OformsEmbed (lib.name).
// This explicit assignment also makes them available in dev (module) mode.
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    OformsEmbed?: any;
  }
}
if (typeof window !== "undefined") {
  window.OformsEmbed = { render, setLocale, setTheme, destroy };
  subscribeDesktopLocale();
  // Convenience for standalone/demo pages: auto-render an opted-in element.
  const auto = () => {
    const el = document.querySelector("[data-oforms-auto]");
    if (el) render(el, { locale: el.getAttribute("data-locale") || undefined });
  };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", auto);
  else auto();
}
