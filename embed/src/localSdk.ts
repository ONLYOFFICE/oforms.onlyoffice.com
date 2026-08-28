import { FALLBACK, type Locale } from "./locale";

interface LookupEntry {
  subcategories: unknown[];
  size?: number;
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

function sizeFor(name: string): number | undefined {
  for (const map of Object.values(lookups)) {
    const size = map.get(name)?.size;
    if (size !== undefined) return size;
  }
  return undefined;
}

function lookupFor(candidates: string[], name: string): LookupEntry {
  for (const locale of candidates) {
    const hit = lookups[locale]?.get(name);
    if (hit) return hit;
  }
  return { subcategories: [], size: sizeFor(name) };
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

const previewCache = new Map<string, string>();
const previewPending = new Set<string>();

function imageMime(editor: any, iconPath: string): string {
  try {
    const format = editor.GetImageFormat(iconPath);
    return /^[a-z0-9]+$/i.test(format) ? `image/${String(format).toLowerCase()}` : "image/png";
  } catch {
    return "image/png";
  }
}

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
    return toFileUrl(iconPath);
  }

  readPreview(iconPath, onReady);
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

const ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  quot: '"',
  lt: "<",
  gt: ">",
  nbsp: " ",
};

function decodeEntities(value: string): string {
  if (!value || value.indexOf("&") === -1) return value;
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, body: string) => {
    if (body[0] !== "#") return ENTITIES[body.toLowerCase()] ?? match;
    const code =
      body[1] === "x" || body[1] === "X"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

function decodeItem(item: SdkTemplateItem): SdkTemplateItem {
  return {
    ...item,
    name: decodeEntities(item.name),
    path: decodeEntities(item.path),
    icon: item.icon ? decodeEntities(item.icon) : item.icon,
  };
}

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
    __sdkIcon: item.icon,
  };
}

function localeFallbackChain(rawCulture: string): string[] {
  const chain = [rawCulture];
  const base = rawCulture.split(/[-_]/)[0].toLowerCase();
  if (base !== rawCulture) chain.push(base);
  chain.push("en-US", "en_US", "en");
  return Array.from(new Set(chain));
}

const ICON_POLL_BASE_MS = 2000;
const ICON_POLL_MAX_MS = 10000;
const MAX_ICON_POLLS = 12;
const PREVIEW_EMIT_DEBOUNCE_MS = 100;

let activePollTimer: ReturnType<typeof setTimeout> | null = null;

const MIN_PREVIEW_SCALE = 200;
const MAX_PREVIEW_SCALE = 400;

function previewScale(): number {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const doubled = Math.round(dpr * 2 * 100);
  return Math.min(MAX_PREVIEW_SCALE, Math.max(MIN_PREVIEW_SCALE, doubled));
}

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
  if (
    !editor ||
    (typeof editor._LocalFileTemplates !== "function" &&
      typeof editor.LocalFileTemplates !== "function")
  ) {
    return;
  }

  const rawBase = culture ? culture.split(/[-_]/)[0].toLowerCase() : locale;
  const categoryCandidates = Array.from(new Set([rawBase, locale]));
  const chain = localeFallbackChain(culture || locale);
  const byPath = new Map<string, any>();

  const scan = () => {
    if (typeof editor._LocalFileTemplates === "function") {
      editor._LocalFileTemplates(chain, previewScale());
      return;
    }
    editor.LocalFileTemplates(chain);
    if (typeof window !== "undefined") window.dispatchEvent(new Event("resize"));
  };

  const emit = () => {
    for (const template of byPath.values()) {
      if (template.card_prewiew.url || !template.__sdkIcon) continue;
      const preview = previewCache.get(template.__sdkIcon);
      if (preview) template.card_prewiew.url = preview;
    }
    onUpdate(Array.from(byPath.values()));
  };

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
    for (const raw of items) {
      if (!raw?.path) continue;
      const item = decodeItem(raw);
      const existing = byPath.get(item.path);
      const template = toTemplate(
        item,
        locale,
        categoryCandidates,
        scheduleEmit,
        existing,
      );
      if (!template) continue;
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
