import {
  BUSINESS_CATEGORY_GROUPS,
  PERSONAL_CATEGORY_GROUPS,
  TYPE_TO_FORMAT,
  COUNTRIES_MAIN,
} from "./filter-data";

const FORMATS = ["xlsx", "pdf", "docx", "pptx"];
const COUNTRY_VALUES = COUNTRIES_MAIN.map((c) => c.value);

const SAMPLE_TEMPLATES = [
  {
    name: "Balance sheet",
    description: "Get a ready-made balance sheet by editing the 1 template or just download",
  },
  {
    name: "Arbitration agreement template",
    description: "Establish a clear mechanism for resolving disputes between parties...",
  },
  {
    name: "Sales Contract",
    description: "Outline terms, secure agreements, and ensure clear responsibilities between...",
  },
  {
    name: "Project Budget",
    description: "Use this Project Budget Template to plan, track, and manage expenses...",
  },
  {
    name: "Project brief",
    description: "Get a ready-made balance sheet by editing the 1 template or just download",
  },
  {
    name: "SWOT analysis",
    description: "Access the SWOT Analysis template in Moodle to evaluate Strengths...",
  },
  {
    name: "Lesson planner",
    description: "Easily organize your lessons with our customizable lesson planner available",
  },
  {
    name: "Strategic plan",
    description: "Use this Project Budget Template to plan, track, and manage expenses...",
  },
];

const TEMPLATES_PER_SUBCATEGORY = 4;

const buildSections = (groups, purpose) => {
  let counter = 0;

  return groups.map((group) => ({
    key: group.key,
    title: toTitleCase(group.title),
    templates: group.items.flatMap((item) =>
      Array.from({ length: TEMPLATES_PER_SUBCATEGORY }, (_, i) => {
        const sample = SAMPLE_TEMPLATES[i % SAMPLE_TEMPLATES.length];
        const country = COUNTRY_VALUES[counter % COUNTRY_VALUES.length];
        counter += 1;
        return {
          id: `${item.value}-${i}`,
          name: sample.name,
          description: sample.description,
          format: FORMATS[i % FORMATS.length],
          category: item.value,
          categoryGroup: group.key,
          country,
          purpose,
        };
      })
    ),
  }));
};

export const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export const BUSINESS_TEMPLATE_SECTIONS = buildSections(BUSINESS_CATEGORY_GROUPS, "business");
export const PERSONAL_TEMPLATE_SECTIONS = buildSections(PERSONAL_CATEGORY_GROUPS, "personal");

export const TEMPLATE_SECTIONS_BY_PURPOSE = {
  business: BUSINESS_TEMPLATE_SECTIONS,
  personal: PERSONAL_TEMPLATE_SECTIONS,
};

const allBusinessTemplates = BUSINESS_TEMPLATE_SECTIONS.flatMap((s) => s.templates);
const allPersonalTemplates = PERSONAL_TEMPLATE_SECTIONS.flatMap((s) => s.templates);

const buildCounts = (templates) => {
  const typeCounts = {};
  Object.entries(TYPE_TO_FORMAT).forEach(([typeValue, format]) => {
    typeCounts[typeValue] = templates.filter((t) => t.format === format).length;
  });

  const categoryCounts = {};
  templates.forEach((t) => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });

  const countryCounts = {};
  templates.forEach((t) => {
    countryCounts[t.country] = (countryCounts[t.country] || 0) + 1;
  });

  return { typeCounts, categoryCounts, countryCounts };
};

export const COUNTS_BY_PURPOSE = {
  business: buildCounts(allBusinessTemplates),
  personal: buildCounts(allPersonalTemplates),
};

export const PURPOSE_COUNTS = {
  business: allBusinessTemplates.length,
  personal: allPersonalTemplates.length,
};

export const POPULAR_TEMPLATES = [
  ...BUSINESS_TEMPLATE_SECTIONS[0].templates.slice(0, 4),
  ...BUSINESS_TEMPLATE_SECTIONS[1].templates.slice(0, 4),
].map((t, i) => ({ ...t, id: `popular-${i}` }));
