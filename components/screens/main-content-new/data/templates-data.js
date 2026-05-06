import CONFIG from "@config/config.json";
import {
  BUSINESS_CATEGORY_GROUPS,
  PERSONAL_CATEGORY_GROUPS,
  TYPE_TO_FORMAT,
} from "./filter-data";
import { ITEM_TO_CMS, matchesItem } from "./cms-mapping";

const CMS_BASE = CONFIG.api.cms || "";

const absolutePreviewUrl = (url) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (!CMS_BASE) return url;
  return `${CMS_BASE.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
};

const DEFAULT_SECTION_LIMIT = 4;

const formMatchesSource = (form, source) => {
  if (source.ext) return form.formats.includes(source.ext);
  const list = form[source.collection];
  return Array.isArray(list) && list.includes(source.slug);
};

const DEFAULT_SECTIONS_CONFIG = [
  {
    key: "agreements",
    title: "Agreements & Contracts",
    href: "/form/types/agreement-templates",
    sources: [{ collection: "types", slug: "agreement-templates" }],
  },
  {
    key: "invoices",
    title: "Invoices & Billing",
    href: "/form/financial-templates",
    sources: [{ collection: "categories", slug: "financial-templates" }],
  },
  {
    key: "hr-employment",
    title: "HR & Employment",
    href: "/form/employment-templates",
    sources: [
      { collection: "categories", slug: "employment-templates" },
      { collection: "categories", slug: "hr-templates" },
    ],
  },
  {
    key: "documents",
    title: "Document Templates",
    href: "/document-templates",
    sources: [{ ext: "docx" }],
  },
  {
    key: "pdf-forms",
    title: "PDF Forms Templates",
    href: "/pdf-form-templates",
    sources: [{ ext: "pdf" }],
  },
  {
    key: "spreadsheets",
    title: "Spreadsheet Templates",
    href: "/spreadsheet-templates",
    sources: [{ ext: "xlsx" }],
  },
  {
    key: "presentations",
    title: "Presentation Templates",
    href: "/presentation-templates",
    sources: [{ ext: "pptx" }],
  },
];

export const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const TEMPLATES_PER_SUBCATEGORY = 4;
const FORMAT_PRIORITY = ["docx", "xlsx", "pptx", "pdf"];

const pickPrimaryFormat = (formats) => {
  if (!formats || formats.length === 0) return null;
  for (const f of FORMAT_PRIORITY) if (formats.includes(f)) return f;
  return formats[0];
};

// Normalizes a Strapi v4 oform entry into a flat template object.
export const normalizeOforms = (cmsResponse) => {
  const data = cmsResponse?.data ?? [];
  return data.map((entry) => {
    const a = entry.attributes ?? {};
    const formats =
      a.form_exts?.data?.map((e) => e.attributes?.ext).filter(Boolean) ?? [];
    const categories =
      a.categories?.data?.map((c) => c.attributes?.urlReq).filter(Boolean) ?? [];
    const types =
      a.types?.data?.map((t) => t.attributes?.urlReq).filter(Boolean) ?? [];
    const compilations =
      a.compilations?.data?.map((c) => c.attributes?.urlReq).filter(Boolean) ?? [];
    const preview = absolutePreviewUrl(a.card_prewiew?.data?.attributes?.url);

    return {
      id: entry.id,
      name: a.name_form ?? "",
      description: a.description_card ?? "",
      url: a.url ?? "",
      popular: !!a.popular_template,
      formats,
      format: pickPrimaryFormat(formats),
      preview,
      categories,
      types,
      compilations,
    };
  });
};

const buildSections = (groups, purpose, forms) =>
  groups.map((group) => ({
    key: group.key,
    title: toTitleCase(group.title),
    purpose,
    templates: group.items.flatMap((item) => {
      if (!ITEM_TO_CMS[item.value]) return [];
      const matched = forms.filter((f) => matchesItem(f, item.value));
      return matched.slice(0, TEMPLATES_PER_SUBCATEGORY).map((f) => ({
        ...f,
        category: item.value,
        categoryGroup: group.key,
        purpose,
      }));
    }),
  }));

const buildCounts = (groups, forms) => {
  const typeCounts = {};
  Object.entries(TYPE_TO_FORMAT).forEach(([typeValue, ext]) => {
    typeCounts[typeValue] = forms.filter((f) => f.formats.includes(ext)).length;
  });

  const categoryCounts = {};
  groups.forEach((group) => {
    group.items.forEach((item) => {
      categoryCounts[item.value] = forms.filter((f) =>
        matchesItem(f, item.value)
      ).length;
    });
  });

  // Country data is not available in the CMS; counts stay at 0 for now.
  const countryCounts = {};

  return { typeCounts, categoryCounts, countryCounts };
};

const purposeForms = (groups, forms) =>
  forms.filter((f) =>
    groups.some((g) => g.items.some((it) => matchesItem(f, it.value)))
  );

const buildDefaultSections = (forms) =>
  DEFAULT_SECTIONS_CONFIG.map((cfg) => {
    const seen = new Set();
    const matched = [];
    for (const f of forms) {
      if (seen.has(f.id)) continue;
      if (cfg.sources.some((s) => formMatchesSource(f, s))) {
        seen.add(f.id);
        matched.push(f);
        if (matched.length >= DEFAULT_SECTION_LIMIT) break;
      }
    }
    return {
      key: cfg.key,
      title: cfg.title,
      href: cfg.href,
      templates: matched.map((f) => ({
        ...f,
        category: null,
        categoryGroup: null,
        purpose: null,
      })),
    };
  });

export const buildTemplatesData = (forms) => {
  const safeForms = Array.isArray(forms) ? forms : [];

  const businessSections = buildSections(BUSINESS_CATEGORY_GROUPS, "business", safeForms);
  const personalSections = buildSections(PERSONAL_CATEGORY_GROUPS, "personal", safeForms);

  const businessForms = purposeForms(BUSINESS_CATEGORY_GROUPS, safeForms);
  const personalForms = purposeForms(PERSONAL_CATEGORY_GROUPS, safeForms);

  const popularBase = safeForms.filter((f) => f.popular);
  const popular = (popularBase.length > 0 ? popularBase : safeForms)
    .slice(0, 8)
    .map((f) => ({ ...f, category: null, categoryGroup: null, purpose: null }));

  return {
    TEMPLATE_SECTIONS_BY_PURPOSE: {
      business: businessSections,
      personal: personalSections,
    },
    DEFAULT_SECTIONS: buildDefaultSections(safeForms),
    COUNTS_BY_PURPOSE: {
      business: buildCounts(BUSINESS_CATEGORY_GROUPS, businessForms),
      personal: buildCounts(PERSONAL_CATEGORY_GROUPS, personalForms),
    },
    PURPOSE_COUNTS: {
      business: businessForms.length,
      personal: personalForms.length,
    },
    POPULAR_TEMPLATES: popular,
  };
};

const EMPTY = buildTemplatesData([]);

export const TEMPLATE_SECTIONS_BY_PURPOSE = EMPTY.TEMPLATE_SECTIONS_BY_PURPOSE;
export const COUNTS_BY_PURPOSE = EMPTY.COUNTS_BY_PURPOSE;
export const PURPOSE_COUNTS = EMPTY.PURPOSE_COUNTS;
export const POPULAR_TEMPLATES = EMPTY.POPULAR_TEMPLATES;
