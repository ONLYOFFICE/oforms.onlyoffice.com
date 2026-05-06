import { useMemo } from "react";
import FilterAccordion from "../filter-accordion";
import FilterItems from "../filter-items";
import {
  TYPE_ITEMS,
  COUNTRIES_MAIN,
  PURPOSE_ITEMS,
  CATEGORY_GROUPS_BY_PURPOSE,
  DEFAULT_PURPOSE,
} from "../../data/filter-data";
import { COUNTS_BY_PURPOSE, PURPOSE_COUNTS } from "../../data/templates-data";
import StyledFilterSidebar from "./styled-filter-sidebar";

const EMPTY_COUNTS = { typeCounts: {}, categoryCounts: {}, countryCounts: {} };

const FilterSidebar = ({
  activeType,
  setActiveType,
  activeCountry,
  setActiveCountry,
  activePurpose,
  setActivePurpose,
  activeCategory,
  setActiveCategory,
}) => {
  const { typeCounts, categoryCounts, countryCounts } = COUNTS_BY_PURPOSE[activePurpose] ?? EMPTY_COUNTS;

  const enrichedTypeItems = useMemo(
    () => TYPE_ITEMS.map((item) => ({ ...item, count: typeCounts[item.value] ?? 0 })),
    [typeCounts]
  );

  const enrichedCountryItems = useMemo(
    () => COUNTRIES_MAIN.map((item) => ({ ...item, count: countryCounts[item.value] ?? 0 })),
    [countryCounts]
  );

  const enrichedPurposeItems = useMemo(
    () => PURPOSE_ITEMS.map((item) => ({ ...item, count: PURPOSE_COUNTS[item.value] ?? 0 })),
    []
  );

  const enrichedCategoryGroups = useMemo(() => {
    const groups = CATEGORY_GROUPS_BY_PURPOSE[activePurpose] ?? [];
    return groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, count: categoryCounts[item.value] ?? 0 })),
    }));
  }, [activePurpose, categoryCounts]);

  const toggle = (setter, current, value) => {
    setter(current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    );
  };

  const handlePurposeChange = (value) => {
    if (value === activePurpose) return;
    setActivePurpose(value);
    setActiveCategory([]);
  };

  const totalActive =
    activeType.length +
    activeCountry.length +
    activeCategory.length;

  const hasActiveFilters = totalActive > 0 || activePurpose !== DEFAULT_PURPOSE;

  const clearAll = () => {
    setActiveType([]);
    setActiveCountry([]);
    setActivePurpose(DEFAULT_PURPOSE);
    setActiveCategory([]);
  };

  return (
    <StyledFilterSidebar>
      <FilterAccordion title="Type" defaultOpen level={1} selectedCount={activeType.length}>
        <FilterItems
          items={enrichedTypeItems}
          activeItems={activeType}
          onToggle={(v) => toggle(setActiveType, activeType, v)}
        />
      </FilterAccordion>

      <FilterAccordion title="Countries" defaultOpen level={1} selectedCount={activeCountry.length}>
        <p className="countries-hint">
          Showing English-speaking countries first based on your language settings.
        </p>
        <FilterItems
          items={enrichedCountryItems}
          activeItems={activeCountry}
          onToggle={(v) => toggle(setActiveCountry, activeCountry, v)}
        />
        <FilterAccordion title="OTHER COUNTRIES" level={2}>
          {/* other countries pills */}
        </FilterAccordion>
      </FilterAccordion>

      <FilterAccordion title="Purpose" defaultOpen level={1}>
        <FilterItems
          variant="switch"
          items={enrichedPurposeItems}
          activeItems={[activePurpose]}
          onToggle={handlePurposeChange}
        />
      </FilterAccordion>

      <FilterAccordion
        key={activePurpose}
        title="Categories"
        defaultOpen
        level={1}
        selectedCount={activeCategory.length}
      >
        {enrichedCategoryGroups.map((group) => (
          <FilterAccordion key={group.key} title={group.title} level={2} defaultOpen>
            <FilterItems
              items={group.items}
              activeItems={activeCategory}
              onToggle={(v) => toggle(setActiveCategory, activeCategory, v)}
            />
          </FilterAccordion>
        ))}
      </FilterAccordion>

      <button
        className={`clear-btn ${hasActiveFilters ? "active" : ""}`}
        type="button"
        onClick={clearAll}
        disabled={!hasActiveFilters}
      >
        Clear all filters{totalActive > 0 ? ` (${totalActive})` : ""}
      </button>
    </StyledFilterSidebar>
  );
};

export default FilterSidebar;
