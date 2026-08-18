import { useTranslation } from "react-i18next";
import type { TAllowedTypes } from "@src/utils/allowedTypes";
import { SegmentedControl, Separator, TextButton } from "../../ui";
import type { TLastOpened } from "../../usePanelState";
import { CategoryGroup } from "./CategoryGroup";
import { ChipGroup } from "./ChipGroup";
import { FilterSection } from "./FilterSection";
import { NavList } from "./NavList";
import type { IFilterPanel } from "./FilterPanel.types";
import styles from "./FilterPanel.module.scss";

const TYPE_OPTIONS: { value: TAllowedTypes; labelKey: string }[] = [
  { value: "docx", labelKey: "Documents" },
  { value: "xlsx", labelKey: "Spreadsheets" },
  { value: "pptx", labelKey: "Presentations" },
  { value: "pdf", labelKey: "PdfForms" },
];

const LAST_OPENED_OPTIONS: { value: TLastOpened; labelKey: string }[] = [
  { value: "3days", labelKey: "Last3Days" },
  { value: "week", labelKey: "LastWeek" },
  { value: "3month", labelKey: "Last3Months" },
  { value: "year", labelKey: "LastYear" },
];

/** Figma shows the first two Category groups open and the rest collapsed. */
const OPEN_CATEGORY_GROUPS = 2;

/** Figma Country row shows six chips plus a "+N" chip. */
const COUNTRY_LIMIT = 6;

const FilterPanel = ({ state, headerAction }: IFilterPanel) => {
  const { t } = useTranslation("EmbedPanel");
  // MainTemplate carries these labels translated in all nine locales. Figma
  // words some of them in the singular ("Country", "Category") but no
  // translations exist for those forms, and an English panel in eight locales
  // is the worse trade -- revisit if the singular strings get translated.
  const { t: tMain } = useTranslation("MainTemplate");

  const isRecent = state.view === "recent";

  return (
    <aside className={styles["filter-panel"]}>
      <div className={styles["filter-panel-scroll"]}>
        <div className={styles["filter-panel-header"]}>
          <h2 className={styles["filter-panel-title"]}>{t("Templates")}</h2>
          {headerAction}
        </div>

        <div className={styles["filter-panel-list"]}>
          <NavList view={state.view} onChange={state.setView} />
          <Separator tightAbove />

          {isRecent ? (
            <FilterSection
              label={t("LastOpened")}
              count={state.lastOpened ? 1 : 0}
              tall
            >
              <ChipGroup
                options={LAST_OPENED_OPTIONS.map(({ value, labelKey }) => ({
                  value,
                  label: tMain(labelKey),
                }))}
                selected={state.lastOpened ? [state.lastOpened] : []}
                // Single-select: picking the active one clears it.
                onToggle={(value) =>
                  state.setLastOpened(
                    state.lastOpened === value ? null : (value as TLastOpened),
                  )
                }
              />
            </FilterSection>
          ) : (
            <>
              <FilterSection
                label={tMain("Type")}
                count={state.types.length}
                tall
              >
                <ChipGroup
                  options={TYPE_OPTIONS.map(({ value, labelKey }) => ({
                    value,
                    label: tMain(labelKey),
                    count: state.typeCounts[value] ?? 0,
                  }))}
                  selected={state.types}
                  onToggle={(value) => state.toggleType(value as TAllowedTypes)}
                />
              </FilterSection>

              <Separator />

              <FilterSection
                label={tMain("Countries")}
                count={state.countries.length}
              >
                <p className={styles["filter-panel-hint"]}>
                  {tMain("ShowingEnglishSpeakingCountries")}
                </p>
                <ChipGroup
                  options={state.countryOptions.map((country) => ({
                    value: country.code.toLowerCase(),
                    label: country.name,
                    count: country.count,
                  }))}
                  selected={state.countries}
                  onToggle={state.toggleCountry}
                  limit={COUNTRY_LIMIT}
                />
              </FilterSection>

              {state.purposes.length > 1 && (
                <>
                  <Separator />
                  <FilterSection label={tMain("Purpose")} tight>
                    <SegmentedControl
                      options={state.purposes.map((purpose) => ({
                        value: purpose.key,
                        label: purpose.name,
                      }))}
                      value={state.purpose}
                      onChange={state.setPurpose}
                    />
                  </FilterSection>
                </>
              )}

              {state.categoryGroups.length > 0 && (
                <>
                  <Separator />
                  <FilterSection
                    label={tMain("Сategories")}
                    count={state.subcategories.length}
                  >
                    {state.categoryGroups.map((group, index) => (
                      <CategoryGroup
                        key={group.category.id}
                        label={group.category.name}
                        options={group.subcategories.map((sub) => ({
                          value: sub.urlReq,
                          label: sub.name,
                          count: sub.count,
                        }))}
                        selected={state.subcategories}
                        onToggle={state.toggleSubcategory}
                        defaultCollapsed={index >= OPEN_CATEGORY_GROUPS}
                      />
                    ))}
                  </FilterSection>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles["filter-panel-footer"]}>
        <TextButton
          label={tMain("ClearAllFilters")}
          onClick={state.clearFilters}
          disabled={state.activeFilterCount === 0 && !state.lastOpened}
        />
      </div>
    </aside>
  );
};

export { FilterPanel };
