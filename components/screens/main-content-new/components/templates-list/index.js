import { useMemo, useState } from "react";
import TemplatesToolbar from "../templates-toolbar";
import TemplatesSection from "../templates-section";
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
      return arr.sort((a, b) => Number(b.popular) - Number(a.popular));
    case "newest":
    default:
      return arr;
  }
};

const EMPTY_SECTIONS = { business: [], personal: [] };

const TemplatesList = ({
  activeType = [],
  activeCountry = [],
  activePurpose = DEFAULT_PURPOSE,
  activeCategory = [],
  sectionsByPurpose = EMPTY_SECTIONS,
  defaultSections = [],
  popularTemplates = [],
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("newest");

  const hasActiveFilters =
    activeType.length > 0 ||
    activeCountry.length > 0 ||
    activeCategory.length > 0 ||
    !!searchValue.trim();
  const useDefaultLayout = !hasActiveFilters && activePurpose === DEFAULT_PURPOSE;

  const purposeSections = useDefaultLayout
    ? defaultSections
    : (sectionsByPurpose[activePurpose] ?? []);

  const matchesFilters = (template) => {
    if (activeType.length > 0) {
      const allowedFormats = activeType
        .map((t) => TYPE_TO_FORMAT[t])
        .filter(Boolean);
      const formats = template.formats ?? (template.format ? [template.format] : []);
      const intersect = formats.some((f) => allowedFormats.includes(f));
      if (!intersect) return false;
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
    () => sortTemplates(popularTemplates.filter(matchesFilters), sortValue),
    [popularTemplates, activeType, activeCountry, activeCategory, searchValue, sortValue]
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
              href={section.href ?? `/category/${section.key}`}
            />
          ))}
        </>
      ) : (
        <div className="empty-state" role="status">
          No templates match the selected filters.
        </div>
      )}
    </StyledTemplatesList>
  );
};

export default TemplatesList;
