
export const ITEM_TO_CMS = {
  // BUSINESS
  agreements:               { collection: "types",        slug: "agreement-templates" },
  "legal-notices":          { collection: "types",        slug: "statement-templates" },
  proposals:                { collection: "types",        slug: "proposal-templates" },
  "business-plans":         { collection: "categories",   slug: "business-templates" },
  marketing:                { collection: "categories",   slug: "sales-templates" },
  "job-offers":             { collection: "types",        slug: "agreement-templates" },
  performance:              { collection: "categories",   slug: "hr-templates" },
  "project-mgmt":           { collection: "categories",   slug: "productivity-templates" },
  checklists:               { collection: "categories",   slug: "productivity-templates" },
  lease:                    { collection: "categories",   slug: "rental-and-lease-templates" },
  property:                 { collection: "categories",   slug: "real-estate-templates" },
  letters:                  { collection: "types",        slug: "letter-templates" },
  applications:             { collection: "types",        slug: "official-form-templates" },
  consent:                  { collection: "types",        slug: "official-form-templates" },
  "request-forms":          { collection: "types",        slug: "official-form-templates" },
  invoices:                 { collection: "categories",   slug: "financial-templates" },
  receipts:                 { collection: "categories",   slug: "financial-templates" },
  budgets:                  { collection: "categories",   slug: "financial-templates" },
  expense:                  { collection: "categories",   slug: "financial-templates" },
  purchase:                 { collection: "categories",   slug: "financial-templates" },
  "personal-finance":       { collection: "categories",   slug: "financial-templates" },
  others:                   { collection: "categories",   slug: "miscellaneous-templates" },
  odoo:                     { collection: "categories",   slug: "available-in-odoo" },
  moodle:                   { collection: "categories",   slug: "available-in-moodle" },

  // PERSONAL
  checklist:                { collection: "compilations", slug: "checklist-templates" },
  "todo-list":              { collection: "compilations", slug: "to-do-list-templates" },
  "weekly-planner":         { collection: "compilations", slug: "weekly-planner-templates" },
  "smart-goal":             { collection: "compilations", slug: "smart-goal-templates" },
  "grocery-list":           { collection: "compilations", slug: "grocery-list-templates" },
  "meal-planner":           { collection: "compilations", slug: "meal-planner-templates" },
  recipe:                   { collection: "compilations", slug: "recipe-templates" },
  "travel-planner":         { collection: "compilations", slug: "travel-planner-templates" },
  "travel-itinerary":       { collection: "compilations", slug: "travel-itinerary-templates" },
  "health-lifestyle":       { collection: "categories",   slug: "healthcare-templates" },
  "workout-planner":        { collection: "compilations", slug: "workout-planner-templates" },
  christmas:                { collection: "compilations", slug: ["christmas-templates", "new-year-templates"] },
  halloween:                { collection: "compilations", slug: "halloween-templates" },
  valentines:               { collection: "compilations", slug: "st-valentine-templates" },
  "st-patricks":            { collection: "compilations", slug: "st-patrick-templates" },
  easter:                   { collection: "compilations", slug: "easter-templates" },
  ramadan:                  { collection: "compilations", slug: "ramadan-templates" },
  "mothers-day":            { collection: "compilations", slug: "mother-day-templates" },
  wedding:                  { collection: "compilations", slug: ["wedding-guest-list-templates", "wedding-seating-plan-templates"] },
  "gift-certificate":       { collection: "compilations", slug: "gift-certificate-templates" },
  "certificate-achievement":{ collection: "compilations", slug: "certificate-of-achievement-templates" },
  "bingo-card":             { collection: "compilations", slug: "bingo-card-templates" },
};

export const COLLECTION_KEY_BY_NAME = {
  categories:   "categories",
  types:        "types",
  compilations: "compilations",
};

export const matchesItem = (form, itemValue) => {
  const map = ITEM_TO_CMS[itemValue];
  if (!map) return false;
  const formSlugs = form[map.collection];
  if (!Array.isArray(formSlugs)) return false;
  const wanted = Array.isArray(map.slug) ? map.slug : [map.slug];
  return wanted.some((s) => formSlugs.includes(s));
};
