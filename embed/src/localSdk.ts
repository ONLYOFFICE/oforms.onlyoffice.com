import { FALLBACK, type Locale } from "./locale";

/**
 * Templates that ship inside the desktop install itself
 * (desktop-apps/common/templates), reported live by the desktop at runtime —
 * see AscDesktopEditor.LocalFileTemplates()/window.onaddtemplates below.
 * There's no CMS/S3 file for these; "Use this template" opens them via
 * AscDesktopEditor.execCommand("create:new", ...) instead — see
 * openLocalTemplate() in main.tsx.
 */

// name (as AscDesktopEditor reports it) -> our taxonomy, curated once per
// locale from desktop-apps/common/templates (a private repo). The desktop is
// the live source of truth for *which* templates exist and where their files
// are; this only supplies the category/purpose it doesn't know about.
interface LookupEntry {
  subcategories: unknown[];
  size?: number; // KB, statted once from a desktop-apps/common/templates checkout
}

const modules = import.meta.glob("../local-templates/*.json", {
  eager: true,
  import: "default",
}) as Record<string, { name: string; subcategories: unknown[]; size?: number }[]>;

const lookups: Record<string, Map<string, LookupEntry>> = {};
for (const [path, entries] of Object.entries(modules)) {
  const m = path.match(/local-templates\/([a-z-]+)\.json$/);
  if (m) {
    lookups[m[1]] = new Map(
      entries.map((e) => [e.name, { subcategories: e.subcategories, size: e.size }]),
    );
  }
}

// Tries each candidate locale's lookup in order — used so a desktop culture
// that the rest of the embed doesn't support (e.g. "ru", which has no CMS
// catalog or UI translations at all) can still get its own local templates
// categorized by their real name, ahead of falling back to English.
function lookupFor(candidates: string[], name: string): LookupEntry {
  for (const locale of candidates) {
    const hit = lookups[locale]?.get(name);
    if (hit) return hit;
  }
  return { subcategories: [] };
}

type Ext = "docx" | "xlsx" | "pptx" | "pdf";

const EXT_BY_SUFFIX: Record<string, Ext> = {
  dotx: "docx",
  docx: "docx",
  xltx: "xlsx",
  xlsx: "xlsx",
  potx: "pptx",
  pptx: "pptx",
  pdf: "pdf",
};

function extFromPath(path: string): Ext | null {
  const m = /\.([a-z0-9]+)$/i.exec(path);
  return m ? (EXT_BY_SUFFIX[m[1].toLowerCase()] ?? null) : null;
}

// Same per-format phrasing already used for CMS template descriptions
// (sampled once from the site's own copy), single-format variant since each
// local template only has the one file. Lives here rather than in the
// lookup JSON because the desktop decides which names exist at runtime.
const DESCRIPTIONS: Record<string, Record<Ext, (n: string) => string>> = {
  ar: {
    pdf: (n) => `احصل على قالب ${n} جاهز عبر الإنترنت أو قم بتنزيله بصيغة PDF.`,
    docx: (n) => `احصل على قالب ${n} جاهز عبر الإنترنت أو قم بتنزيله بصيغة DOCX.`,
    pptx: (n) => `احصل على قالب ${n} جاهز عبر الإنترنت بتعديل القالب أو قم بتنزيله بصيغة PPTX.`,
    xlsx: (n) => `احصل على ${n} جاهز عبر الإنترنت عن طريق تحرير القالب أو قم بتنزيله بصيغة XLSX.`,
  },
  de: {
    pdf: (n) => `Erhalten Sie online eine fertige Vorlage für ${n}, oder laden Sie sie einfach als PDF herunter.`,
    docx: (n) => `Erhalten Sie online einen fertigen ${n} oder laden Sie einfach die ausfüllbare Vorlage im DOCX-Format herunter.`,
    pptx: (n) => `Erhalten Sie online eine fertige ${n}, indem Sie die Vorlage bearbeiten oder sie einfach im PPTX-Format herunterladen.`,
    xlsx: (n) => `Erhalten Sie online einen vorgefertigten ${n}, indem Sie die Vorlage bearbeiten, oder laden Sie sie einfach im XLSX-Format herunter.`,
  },
  en: {
    pdf: (n) => `Get a ready-made ${n} template online or just download it in PDF.`,
    docx: (n) => `Get a ready-made ${n} template online or just download it in DOCX.`,
    pptx: (n) => `Get a ready-made ${n} online by editing the template or just download it in PPTX.`,
    xlsx: (n) => `Get a ready-made ${n} by editing the template or just download it in XLSX.`,
  },
  es: {
    pdf: (n) => `Obtén una plantilla de ${n} en línea o descárgala en PDF.`,
    docx: (n) => `Obtén un ${n} ya preparado en línea o simplemente descarga la plantilla rellenable en DOCX.`,
    pptx: (n) => `Obtén un ${n} ya preparado en línea editando la plantilla o simplemente descárgalo en PPTX.`,
    xlsx: (n) => `Obtén un ${n} listo para usar al editar la plantilla online o simplemente descárgalo en XLSX.`,
  },
  fr: {
    pdf: (n) => `Obtenez un modèle de ${n} prêt à l'emploi en ligne ou téléchargez-le au format PDF.`,
    docx: (n) => `Obtenez un modèle de ${n} prêt à l'emploi ou téléchargez-le simplement au format DOCX.`,
    pptx: (n) => `Obtenez un modèle de ${n} prêt à l'emploi en ligne en modifiant le modèle ou en le téléchargeant au format PPTX.`,
    xlsx: (n) => `Obtenez un modèle de ${n} prêt à l'emploi en modifiant le modèle ou téléchargez-le simplement au format XLSX.`,
  },
  it: {
    pdf: (n) => `Ottieni un modello di ${n} già pronto online o scaricalo in PDF.`,
    docx: (n) => `Ottieni un modello di ${n} già pronto, oppure scaricalo in formato DOCX.`,
    pptx: (n) => `Ottieni un ${n} già pronto online modificando il modello o semplicemente scaricandolo in PPTX.`,
    xlsx: (n) => `Ottieni un ${n} pronto per l'uso modificando il modello online o semplicemente scaricandolo in formato XLSX.`,
  },
  ja: {
    pdf: (n) => `オンラインで${n}のテンプレートを入手するか、PDF形式でダウンロードできます。`,
    docx: (n) => `テンプレートを編集してオンラインで${n}を入手するか、DOCX形式でダウンロードできます。`,
    pptx: (n) => `テンプレートを編集してオンラインで既製の${n}を入手するか、PPTX形式でダウンロードするだけです。`,
    xlsx: (n) => `オンラインで編集できる、またはXLSX形式でダウンロードしてすぐに使える${n}です。`,
  },
  pt: {
    pdf: (n) => `Obtenha um modelo de ${n} pronto online ou apenas baixe-o em PDF.`,
    docx: (n) => `Obtenha um ${n} pronto online ou apenas baixe o modelo preenchível em DOCX.`,
    pptx: (n) => `Obtenha um ${n} pronto on-line editando o modelo ou apenas baixe-o em PPTX.`,
    xlsx: (n) => `Obtenha um ${n} pronto editando o modelo ou simplesmente baixe-o em XLSX.`,
  },
  zh: {
    pdf: (n) => `获取现成的${n}模板，可在线使用或直接下载 PDF 格式。`,
    docx: (n) => `在线获取现成的${n}模板，或直接下载 DOCX 格式。`,
    pptx: (n) => `在线获取现成的${n}模板，或直接下载 PPTX 格式。`,
    xlsx: (n) => `通过编辑模板在线获取现成的${n}，或直接下载 XLSX 格式。`,
  },
};

function descriptionFor(locale: Locale, ext: Ext, name: string): string {
  const formula = DESCRIPTIONS[locale]?.[ext] ?? DESCRIPTIONS[FALLBACK]?.[ext];
  return formula ? formula(name) : "";
}

// icon/path are native filesystem paths (backslashes on Windows, mixed
// separators even within one path per the sample AscDesktopEditor sent) —
// normalize one into the url path an <img>/background-image can load. Some
// paths come back with a Windows long-path device prefix (`\?\` or
// `\.\`, e.g. `\.\C:\Users\...\templates_cache\...\License agreement.jpg`
// — confirmed live, it's not just the plain `C:/Users/...` shape the one
// hand-sent sample used) — that prefix isn't meaningful in a url and has to be
// stripped, or the whole path resolves to garbage.
//
// Every segment is percent-encoded rather than run through encodeURI: the
// card preview ends up inside an unquoted CSS url() (see
// src/components/widgets/Card/Card.tsx), where `(`, `)` and `'` make it a
// bad-url-token and drop the whole background-image, while `#`/`?` would be
// parsed as fragment/query and cut the name short. encodeURI leaves all of
// those as-is, so cards for real template names — "Resume (sky blue).dotx",
// "Organizational chart (horizontal).dotx", "Valentine's Day gift
// certificate.pdf" — silently rendered blank.
function encodeSegment(segment: string): string {
  return encodeURIComponent(segment).replace(
    /[()'!*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function encodeNativePath(rawPath: string): string {
  if (!rawPath) return "";
  const stripped = rawPath.replace(/^\\\\[?.]\\/, "");
  const normalized = stripped.replace(/\\/g, "/");
  return normalized
    .split("/")
    .map((segment) =>
      /^[a-zA-Z]:$/.test(segment) ? segment : encodeSegment(segment),
    )
    .join("/");
}

function toFileUrl(rawPath: string): string {
  const encoded = encodeNativePath(rawPath);
  if (!encoded) return "";
  return /^[a-zA-Z]:\//.test(encoded) ? `file:///${encoded}` : `file://${encoded}`;
}

/**
 * The desktop's own pages are served over the onlyoffice:// scheme (the app is
 * at onlyoffice://plugin/C:/Program Files/.../index.html), so a file:// url is
 * not loadable from there — the browser refuses it outright ("Not allowed to
 * load local resource"), for <img>, background-image and fetch alike. That's
 * why local template cards came up blank in the app while the very same url
 * renders fine in a browser.
 *
 * Two dead ends, both measured live on 10.0.0 — don't try them again:
 *  - AscDesktopEditor.GetImageBase64(path), what sdkjs uses for local images
 *    inside the editors ("correct local images" in sdkjs/word/sdk-all.js),
 *    returns "" for every path shape (native, file:// url, backslashes) even
 *    though IsLocalFileExist, IsImageFile, GetImageFormat and getLocalFileSize
 *    all answer correctly for that same file.
 *  - a url of the page's own scheme (onlyoffice://plugin/<path>, which is what
 *    the desktop team suggested) fails with ERR_UNKNOWN_URL_SCHEME: the scheme
 *    is only wired up for navigations in this build, not for subresources —
 *    even the app's own index.html, sitting in the install dir it was loaded
 *    from, fails as an <img> src.
 *
 * What does work is reading the bytes and wrapping them in a blob: url.
 * loadLocalFile(path, cb) hands the callback a Uint8Array — the same API sdkjs
 * uses to read a picked csv/txt (see sdk-all-min.js) — and takes ~3ms per
 * preview. Being async, the preview isn't known while the card is first built:
 * the url starts out empty and the templates are re-emitted once the bytes
 * land, the same way a lazily generated icon is picked up by a rescan.
 */
const previewCache = new Map<string, string>();
const previewPending = new Set<string>();

function imageMime(editor: any, iconPath: string): string {
  try {
    // The cached previews carry a .jpg name but are not necessarily jpeg (the
    // ones the desktop writes are png), so ask the native side for the format
    // rather than trusting the extension.
    const format = editor.GetImageFormat(iconPath);
    return /^[a-z0-9]+$/i.test(format) ? `image/${String(format).toLowerCase()}` : "image/png";
  } catch {
    return "image/png";
  }
}

// The blob urls are deliberately never revoked: they're keyed by icon path and
// reused across rescans and locale switches (a template's preview doesn't
// change while the app runs), and it's a few dozen of them at ~13 KB each.
function readPreview(iconPath: string, onReady: () => void): void {
  if (previewPending.has(iconPath)) return;
  previewPending.add(iconPath);
  const editor = (window as any).AscDesktopEditor;
  try {
    editor.loadLocalFile(iconPath, (bytes: Uint8Array | null) => {
      previewPending.delete(iconPath);
      if (!bytes || !bytes.length) return;
      const blob = new Blob([bytes], { type: imageMime(editor, iconPath) });
      previewCache.set(iconPath, URL.createObjectURL(blob));
      onReady();
    });
  } catch {
    previewPending.delete(iconPath);
  }
}

function toPreviewUrl(iconPath: string, onReady: () => void): string {
  if (!iconPath) return "";
  const cached = previewCache.get(iconPath);
  if (cached) return cached;

  const editor = (window as any).AscDesktopEditor;
  if (!editor || typeof editor.loadLocalFile !== "function") {
    // Plain browser (the embed's own dev harness) — a file:// url loads there.
    return toFileUrl(iconPath);
  }

  readPreview(iconPath, onReady);
  // Empty for now; onReady re-emits the templates once the bytes are in.
  return "";
}

interface SdkTemplateItem {
  id: number;
  name: string;
  path: string;
  icon?: string;
  type?: number;
}

let nextId = -1;

function toTemplate(
  item: SdkTemplateItem,
  locale: Locale,
  categoryCandidates: string[],
  onPreviewReady: () => void,
  existing?: any,
): any | null {
  const ext = extFromPath(item.path);
  if (!ext) return null;
  const assetExt = /\.([a-z0-9]+)$/i.exec(item.path)?.[1] ?? ext;
  // A rescan re-reports templates already known (that's how late-generated
  // icons arrive) — reuse the id so React keeps the same card mounted instead
  // of remounting it and re-loading a preview it was already showing.
  const id = existing?.id ?? nextId--;
  const { subcategories, size } = lookupFor(categoryCandidates, item.name);

  return {
    id,
    documentId: `local-${locale}-${item.id}`,
    name_form: item.name,
    description_card: descriptionFor(locale, ext, item.name),
    url: `local-${locale}-${ext}-${item.id}`,
    popular_template: null,
    createdAt: "1970-01-01T00:00:00.000Z",
    card_prewiew: {
      id,
      documentId: `local-${locale}-${item.id}-preview`,
      url: toPreviewUrl(item.icon ?? "", onPreviewReady),
      width: 260,
      height: 184,
    },
    form_exts: [{ id, documentId: `local-${locale}-${item.id}-ext`, ext }],
    file_oform: [
      {
        id,
        documentId: `local-${locale}-${item.id}-file`,
        name: item.path.split(/[\\/]/).pop() ?? item.name,
        ext: `.${assetExt}`,
        size,
        url: item.path,
      },
    ],
    countries: [],
    subcategories,
    __local: true,
    __sdkId: item.id,
    __sdkType: item.type,
    __sdkPath: item.path,
    // Kept so a preview that finishes loading after the card was built can be
    // matched back to it — see emit() in requestLocalTemplates.
    __sdkIcon: item.icon,
  };
}

// Mirrors _reload_templates in desktop-apps/common/loginpage/src/paneltemplates.js.
function localeFallbackChain(rawCulture: string): string[] {
  const chain = [rawCulture];
  const base = rawCulture.split(/[-_]/)[0].toLowerCase();
  if (base !== rawCulture) chain.push(base);
  chain.push("en-US", "en_US", "en");
  return Array.from(new Set(chain));
}

/**
 * Asks the desktop for its local templates and reports the merged, ready-to-
 * render list every time it hears back. `window.onaddtemplates` is a plain
 * global function the native side calls directly by name (see
 * desktop-apps/common/loginpage/src/sdk.js) — not an addEventListener-style
 * subscription — so it has to be assigned before LocalFileTemplates() is
 * called. No-ops (no console noise, no guessed paths) if AscDesktopEditor or
 * this method isn't present — e.g. a plain browser, or an older desktop.
 *
 * `culture` is the desktop's *raw* UI culture (e.g. "ru-RU"), separate from
 * `locale` (normalized to one of the 9 the rest of the embed supports — see
 * locale.ts). This lets a culture the embed has no CMS/UI translations for at
 * all — Russian, currently — still get its OWN local templates (there's a
 * real desktop-apps/common/templates/RU) instead of only the English ones,
 * even though the surrounding catalog/UI still renders in English.
 *
 * Confirmed by inspecting the live implementation in DevTools: calling
 * LocalFileTemplates() alone doesn't trigger the scan — it just stashes the
 * locale list and (once) arms a "resize" listener that's what actually calls
 * the native (underscore-prefixed) method. So a synthetic resize is
 * dispatched right after, to fire that listener immediately instead of
 * waiting for a real window resize that may never happen.
 *
 * Preview icons are generated lazily on the desktop's side — the first
 * response can list a template with no `icon` yet (confirmed live: a fresh
 * scan came back with none of them, a later one had some filled in). So this
 * re-scans to pick those up as they finish, instead of leaving a card blank
 * forever just because it was asked for too early. Stops early once every
 * known template has an icon.
 *
 * The rescans back off (2s, then 2s, 4s, 6s… capped at 10s, ~1.5 min in
 * total): a warm templates_cache settles after one or two scans, while a
 * fresh install has to render every preview from scratch — a few dozen of
 * them, well past the ~10s the previous fixed 5×2s window allowed, which left
 * the last ones blank until the app was restarted.
 */
const ICON_POLL_BASE_MS = 2000;
const ICON_POLL_MAX_MS = 10000;
const MAX_ICON_POLLS = 12;
const PREVIEW_EMIT_DEBOUNCE_MS = 100;

let activePollTimer: ReturnType<typeof setTimeout> | null = null;

export function requestLocalTemplates(
  locale: Locale,
  culture: string | undefined,
  onUpdate: (templates: any[]) => void,
): void {
  const editor = (window as any).AscDesktopEditor;
  if (activePollTimer) {
    clearTimeout(activePollTimer);
    activePollTimer = null;
  }
  if (!editor || typeof editor.LocalFileTemplates !== "function") return;

  const rawBase = culture ? culture.split(/[-_]/)[0].toLowerCase() : locale;
  const categoryCandidates = Array.from(new Set([rawBase, locale, FALLBACK]));
  const chain = localeFallbackChain(culture || locale);
  const byPath = new Map<string, any>();

  const scan = () => {
    editor.LocalFileTemplates(chain);
    if (typeof window !== "undefined") window.dispatchEvent(new Event("resize"));
  };

  // Previews are read asynchronously (see toPreviewUrl), so a card can be built
  // before its own is in: fill in whatever has landed since, then report.
  const emit = () => {
    for (const template of byPath.values()) {
      if (template.card_prewiew.url || !template.__sdkIcon) continue;
      const preview = previewCache.get(template.__sdkIcon);
      if (preview) template.card_prewiew.url = preview;
    }
    onUpdate(Array.from(byPath.values()));
  };

  // The reads come back one native callback at a time, a few ms apart — coalesce
  // them into a single re-render instead of one per template.
  let emitScheduled = false;
  const scheduleEmit = () => {
    if (emitScheduled) return;
    emitScheduled = true;
    setTimeout(() => {
      emitScheduled = false;
      emit();
    }, PREVIEW_EMIT_DEBOUNCE_MS);
  };

  (window as any).onaddtemplates = (payload: SdkTemplateItem[] | SdkTemplateItem) => {
    const items = Array.isArray(payload) ? payload : [payload];
    for (const item of items) {
      if (!item?.path) continue;
      const existing = byPath.get(item.path);
      const template = toTemplate(
        item,
        locale,
        categoryCandidates,
        scheduleEmit,
        existing,
      );
      if (!template) continue;
      // A rescan can come back without an icon it had already reported — keep
      // the known one rather than blanking a card that was already fine.
      if (!template.card_prewiew.url && existing?.card_prewiew?.url) {
        template.card_prewiew.url = existing.card_prewiew.url;
        template.__sdkIcon = template.__sdkIcon ?? existing.__sdkIcon;
      }
      byPath.set(item.path, template);
    }
    emit();
  };

  scan();

  let polls = 0;
  const pollForIcons = () => {
    const templates = Array.from(byPath.values());
    // Waits on the icon *paths*, not the previews: once the desktop has reported
    // an icon for every template there's nothing left for a rescan to find, and
    // reading its bytes is on its own (async) track.
    const allHaveIcons =
      templates.length > 0 && templates.every((t) => t.__sdkIcon || t.card_prewiew?.url);
    if (allHaveIcons || ++polls > MAX_ICON_POLLS) {
      activePollTimer = null;
      return;
    }
    scan();
    activePollTimer = setTimeout(
      pollForIcons,
      Math.min(ICON_POLL_BASE_MS * polls, ICON_POLL_MAX_MS),
    );
  };
  activePollTimer = setTimeout(pollForIcons, ICON_POLL_BASE_MS);
}
