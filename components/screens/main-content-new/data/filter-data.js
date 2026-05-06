export const TYPE_ITEMS = [
  { value: "documents", label: "Documents" },
  { value: "spreadsheets", label: "Spreadsheets" },
  { value: "presentations", label: "Presentations" },
  { value: "pdf-forms", label: "PDF forms" },
];

export const COUNTRIES_MAIN = [
  { value: "usa", label: "USA" },
  { value: "uk", label: "United Kingdom (UK)" },
  { value: "canada", label: "Canada" },
  { value: "india", label: "India" },
  { value: "australia", label: "Australia" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "ireland", label: "Ireland" },
  { value: "south-africa", label: "South Africa" },
  { value: "singapore", label: "Singapore" },
];

export const PURPOSE_ITEMS = [
  { value: "business", label: "Business" },
  { value: "personal", label: "Personal" },
];

export const DEFAULT_PURPOSE = "business";

export const TYPE_TO_FORMAT = {
  documents: "docx",
  spreadsheets: "xlsx",
  presentations: "pptx",
  "pdf-forms": "pdf",
};

export const BUSINESS_CATEGORY_GROUPS = [
  {
    key: "contracts",
    title: "CONTRACTS & LEGAL",
    items: [
      { value: "agreements", label: "Agreements & Contracts" },
      { value: "nda", label: "Non-Disclosure (NDA)" },
      { value: "power-of-attorney", label: "Power of Attorney" },
      { value: "wills", label: "Wills & Estates" },
      { value: "legal-notices", label: "Legal Notices" },
    ],
  },
  {
    key: "finance",
    title: "FINANCE",
    items: [
      { value: "invoices", label: "Invoices & Billing" },
      { value: "receipts", label: "Receipts & Records" },
      { value: "budgets", label: "Budgets & Forecasts" },
      { value: "expense", label: "Expense Reports" },
      { value: "purchase", label: "Purchase Orders" },
    ],
  },
  {
    key: "sales",
    title: "SALES & MARKETING",
    items: [
      { value: "proposals", label: "Proposals & Quotes" },
      { value: "business-plans", label: "Business Plans" },
      { value: "marketing", label: "Marketing & Sales" },
      { value: "pitch-decks", label: "Presentations & Pitch Decks" },
    ],
  },
  {
    key: "hr",
    title: "HR & EMPLOYMENT",
    items: [
      { value: "job-offers", label: "Job Offers & Contracts" },
      { value: "performance", label: "Performance Reviews" },
      { value: "policies", label: "Policies & Procedures" },
      { value: "resignation", label: "Resignation & Termination" },
    ],
  },
  {
    key: "operations",
    title: "OPERATIONS & MANAGEMENT",
    items: [
      { value: "project-mgmt", label: "Project Management" },
      { value: "meeting-minutes", label: "Meeting Minutes" },
      { value: "schedules", label: "Schedules & Planners" },
      { value: "checklists", label: "Checklists & Trackers" },
      { value: "reports", label: "Reports & Analysis" },
    ],
  },
  {
    key: "real-estate",
    title: "REAL ESTATE",
    items: [
      { value: "lease", label: "Lease & Rental Agreements" },
      { value: "property", label: "Property Purchase" },
    ],
  },
  {
    key: "forms-apps",
    title: "FORMS & APPLICATIONS",
    items: [
      { value: "applications", label: "Applications & Registrations" },
      { value: "consent", label: "Consent Forms" },
      { value: "request-forms", label: "Request Forms" },
    ],
  },
  {
    key: "home-edu",
    title: "HOME & EDUCATION",
    items: [
      { value: "letters", label: "Letters & Correspondence" },
      { value: "personal-finance", label: "Personal Finance" },
      { value: "education", label: "Education" },
      { value: "others", label: "Others" },
    ],
  },
  {
    key: "integrations",
    title: "INTEGRATIONS",
    items: [
      { value: "odoo", label: "Odoo" },
      { value: "moodle", label: "Moodle" },
    ],
  },
];

export const PERSONAL_CATEGORY_GROUPS = [
  {
    key: "organization",
    title: "ORGANIZATION & PRODUCTIVITY",
    items: [
      { value: "checklist", label: "Checklist" },
      { value: "todo-list", label: "To-do List" },
      { value: "weekly-planner", label: "Weekly Planner" },
    ],
  },
  {
    key: "smart-goal",
    title: "SMART GOAL",
    items: [
      { value: "smart-goal", label: "SMART Goal" },
    ],
  },
  {
    key: "everyday-life",
    title: "EVERYDAY LIFE",
    items: [
      { value: "grocery-list", label: "Grocery List" },
      { value: "meal-planner", label: "Meal Planner" },
      { value: "recipe", label: "Recipe" },
    ],
  },
  {
    key: "travel",
    title: "TRAVEL",
    items: [
      { value: "travel-planner", label: "Travel Planner" },
      { value: "travel-itinerary", label: "Travel Itinerary" },
      { value: "health-lifestyle", label: "Health & Lifestyle" },
      { value: "workout-planner", label: "Workout Planner" },
    ],
  },
  {
    key: "events-holidays",
    title: "EVENTS & HOLIDAYS",
    items: [
      { value: "christmas", label: "Christmas & New Year" },
      { value: "halloween", label: "Halloween" },
      { value: "valentines", label: "St. Valentine's" },
      { value: "st-patricks", label: "St. Patrick's" },
      { value: "easter", label: "Easter" },
      { value: "ramadan", label: "Ramadan" },
      { value: "mothers-day", label: "Mother's Day" },
    ],
  },
  {
    key: "personal-events",
    title: "PERSONAL EVENTS",
    items: [
      { value: "birthday", label: "Birthday" },
      { value: "wedding", label: "Wedding" },
    ],
  },
  {
    key: "gifts-achievements",
    title: "GIFTS & ACHIEVEMENTS",
    items: [
      { value: "gift-certificate", label: "Gift Certificate" },
      { value: "certificate-achievement", label: "Certificate of Achievement" },
    ],
  },
  {
    key: "leisure",
    title: "LEISURE",
    items: [
      { value: "bingo-card", label: "Bingo Card" },
    ],
  },
];

export const CATEGORY_GROUPS_BY_PURPOSE = {
  business: BUSINESS_CATEGORY_GROUPS,
  personal: PERSONAL_CATEGORY_GROUPS,
};
