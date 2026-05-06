import { useMemo, useState } from "react";
import TemplatesToolbar from "../templates-toolbar";
import TemplatesSection from "../templates-section";
import {
  TEMPLATE_SECTIONS_BY_PURPOSE,
  POPULAR_TEMPLATES,
} from "../../data/templates-data";
import { DEFAULT_PURPOSE, TYPE_TO_FORMAT } from "../../data/filter-data";
import StyledTemplatesList from "./styled-templates-list";

const sortTemplates = (templates, sortValue) => {
  const arr = [...templates];
  switch (sortValue) {
    case "az":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "oldest":
      return arr.reverse();
    case "popular":
      return arr.sort((a, b) => a.name.length - b.name.length);
    case "newest":
    default:
      return arr;
  }
};

const TemplatesList = ({
  activeType = [],
  activeCountry = [],
  activePurpose = DEFAULT_PURPOSE,
  activeCategory = [],
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("newest");

  const purposeSections = TEMPLATE_SECTIONS_BY_PURPOSE[activePurpose] ?? [];

  const matchesFilters = (template) => {
    if (activeType.length > 0) {
      const allowedFormats = activeType
        .map((t) => TYPE_TO_FORMAT[t])
        .filter(Boolean);
      if (!allowedFormats.includes(template.format)) return false;
    }

    if (activeCountry.length > 0 && !activeCountry.includes(template.country)) {
      return false;
    }

    if (activeCategory.length > 0 && !activeCategory.includes(template.category)) {
      return false;
    }

    if (searchValue) {
      const q = searchValue.trim().toLowerCase();
      const haystack = `${template.name} ${template.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  };

  const filteredPopular = useMemo(
    () => sortTemplates(POPULAR_TEMPLATES.filter(matchesFilters), sortValue),
    [activeType, activeCountry, activeCategory, searchValue, sortValue]
  );

  const filteredSections = useMemo(
    () =>
      purposeSections
        .map((section) => ({
          ...section,
          templates: sortTemplates(section.templates.filter(matchesFilters), sortValue),
        }))
        .filter((section) => section.templates.length > 0),
    [purposeSections, activeType, activeCategory, searchValue, sortValue]
  );

  const totalCount =
    filteredPopular.length +
    filteredSections.reduce((sum, s) => sum + s.templates.length, 0);

  const hasResults = totalCount > 0;

  return (
    <StyledTemplatesList>
      <TemplatesToolbar
        totalCount={totalCount}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      {hasResults ? (
        <>
          <TemplatesSection
            title="Popular Templates"
            templates={filteredPopular}
            href="/popular"
          />

          {filteredSections.map((section) => (
            <TemplatesSection
              key={section.key}
              title={section.title}
              templates={section.templates}
              href={`/category/${section.key}`}
            />
          ))}
        </>
      ) : (
        <div className="empty-state">
          No templates match the selected filters.
        </div>
      )}
    </StyledTemplatesList>
  );
};

export default TemplatesList;
