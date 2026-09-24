/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import Scrollbar from "react-scrollbars-custom";
import { SidebarItem } from "./sub-components/SidebarItem";
import { ISidebarItem } from "./sub-components/SidebarItem/SidebarItem.types";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { getSelectedCountries, localeCountry } from "@src/utils/localeCountry";
import { isRtlLocale } from "@src/utils/rtl";
import { useTemplateFilters } from "@src/lib/hooks/useTemplateFilters";
import { toggleFilterValue } from "@src/utils/queryFilters";
import { CATEGORY_PATHNAME } from "@src/utils/filterNavigation";
import { ISidebar } from "./Sidebar.types";
import styles from "./Sidebar.module.scss";

const Sidebar = ({
  isOpen,
  setIsOpen,
  countries,
  purposes,
  categoriesByPurpose,
  docxForms,
  xlsxForms,
  pptxForms,
  pdfForms,
  selectedCategory,
  clearFiltersVisible,
  redirectToHome,
}: ISidebar) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const countryCodes = countries.map((country) => country.code.toLowerCase());

  const { filters, toggle, select, setPurpose, clearAll, apply } =
    useTemplateFilters(
      {
        type: ALLOWED_TYPES,
        country: countryCodes,
        subcategory: Object.values(categoriesByPurpose).flatMap((categories) =>
          categories.flatMap(({ subcategories }) =>
            subcategories.map((sub) => sub.urlReq),
          ),
        ),
      },
      { redirectToHome },
    );

  const purposeKeys = purposes.map((item) => item.key);

  const categoryPurpose = selectedCategory
    ? Object.entries(categoriesByPurpose).find(([, categories]) =>
        categories.some(({ category }) => category.urlReq === selectedCategory),
      )?.[0]
    : undefined;

  const subcategoryPurpose = purposes.find(({ key }) =>
    categoriesByPurpose[key]?.some(({ subcategories }) =>
      subcategories.some((sub) => filters.subcategory.includes(sub.urlReq)),
    ),
  )?.key;

  const selectedPurpose =
    filters.purpose && purposeKeys.includes(filters.purpose)
      ? filters.purpose
      : (categoryPurpose ?? subcategoryPurpose ?? purposes[0]?.key);

  const purposeCategories = selectedPurpose
    ? (categoriesByPurpose[selectedPurpose] ?? [])
    : [];

  const typeOptions = [
    { value: "docx", label: "Documents", count: docxForms },
    { value: "xlsx", label: "Spreadsheets", count: xlsxForms },
    { value: "pptx", label: "Presentations", count: pptxForms },
    { value: "pdf", label: "PdfForms", count: pdfForms },
  ]
    .filter((type) => type.count > 0 || filters.type.includes(type.value))
    .map((type) => ({
      value: type.value,
      label: t(type.label),
      count: type.count,
      checked: filters.type.includes(type.value),
      onChange: () => toggle("type", type.value),
    }));

  const categorySubcategories = selectedCategory
    ? Array.from(
        new Set(
          Object.values(categoriesByPurpose)
            .flat()
            .filter(({ category }) => category.urlReq === selectedCategory)
            .flatMap(({ subcategories }) =>
              subcategories.map((sub) => sub.urlReq),
            ),
        ),
      )
    : [];

  const toggleSubcategoryValue = (value: string) => {
    if (!selectedCategory) {
      toggle("subcategory", value);
      return;
    }

    const next = toggleFilterValue(
      { ...filters, subcategory: categorySubcategories },
      "subcategory",
      value,
    );

    if (!next.subcategory.length) {
      clearAll();
      return;
    }

    apply(next);
  };

  const selectedCountries = getSelectedCountries(
    filters.country,
    router.locale,
    countryCodes,
  );
  const selectedSubcategories =
    router.pathname === CATEGORY_PATHNAME ? [] : filters.subcategory;

  const isSubcategoryChecked = (subcategoryUrlReq: string) =>
    selectedSubcategories.length
      ? selectedSubcategories.includes(subcategoryUrlReq)
      : categorySubcategories.includes(subcategoryUrlReq);

  const defaultCountry = localeCountry(router.locale);

  const isDefaultCountry = (code: string) =>
    code.toLowerCase() === defaultCountry;

  const sortedCountries = [...countries].sort(
    (a, b) =>
      Number(isDefaultCountry(b.code)) - Number(isDefaultCountry(a.code)),
  );

  const visibleCountries = sortedCountries.filter(
    (country) =>
      country.count > 0 ||
      selectedCountries.includes(country.code.toLowerCase()),
  );
  const isSubcategoryVisible = (sub: { urlReq: string; count: number }) =>
    sub.count > 0 || selectedSubcategories.includes(sub.urlReq);
  const visiblePurposeCategories = purposeCategories
    .map(({ category, subcategories }) => ({
      category,
      subcategories: subcategories.filter(isSubcategoryVisible),
    }))
    .filter(({ subcategories }) => subcategories.length > 0);
  const visibleSubcategories = new Set(
    Object.values(categoriesByPurpose)
      .flat()
      .flatMap(({ subcategories }) =>
        subcategories.filter(isSubcategoryVisible).map((sub) => sub.urlReq),
      ),
  );

  const isDefaultCountrySelected =
    selectedCountries.length === 1 && selectedCountries[0] === defaultCountry;

  const checkedCountryCount = isDefaultCountrySelected
    ? 0
    : selectedCountries.filter((code) =>
        visibleCountries.some((country) => country.code.toLowerCase() === code),
      ).length;

  const checkedCategoryCount = selectedSubcategories.length
    ? selectedSubcategories.filter((sub) => visibleSubcategories.has(sub))
        .length
    : categorySubcategories.length;

  const checkedTypeCount = typeOptions.filter((type) => type.checked).length;

  const hasSelectedFilters =
    filters.type.length > 0 ||
    selectedSubcategories.length > 0 ||
    (filters.country.length > 0 && !isDefaultCountrySelected);

  const totalChecked =
    checkedTypeCount + checkedCountryCount + checkedCategoryCount;

  const isClearBtnVisible =
    clearFiltersVisible ?? (hasSelectedFilters || totalChecked > 0);

  return (
    <aside className={clsx(styles.sidebar, isOpen && styles["sidebar-open"])}>
      <Scrollbar
        className={styles["sidebar-scrollbar"]}
        contentProps={{ className: styles["sidebar-scrollbar-content"] }}
        trackYProps={{ className: styles["sidebar-scrollbar-track"] }}
        thumbYProps={{ className: styles["sidebar-scrollbar-thumb"] }}
        rtl={router.locale ? isRtlLocale(router.locale) : false}
        noScrollX
        removeTrackXWhenNotUsed
        removeTrackYWhenNotUsed
      >
        <div className={styles["sidebar-header"]}>
          <button
            onClick={() => setIsOpen(false)}
            className={styles["sidebar-close-btn"]}
            type="button"
            style={
              {
                "--sidebar-close-btn-icon": `url(${getAssetUrl("/images/modules/main/cross.svg")})`,
              } as React.CSSProperties
            }
          ></button>
        </div>

        <div
          className={clsx(
            styles["sidebar-wrapper"],
            isClearBtnVisible && styles["sidebar-wrapper-with-clear-btn"],
          )}
        >
          <div>
            {(
              [
                {
                  heading: t("Countries"),
                  text: visibleCountries.length
                    ? t("ShowingSpeakingCountries")
                    : undefined,
                  type: "radio",
                  count: checkedCountryCount,
                  options: visibleCountries.map((country) => ({
                    value: country.code.toLowerCase(),
                    label: country.name,
                    count: country.count,
                    checked: selectedCountries.includes(
                      country.code.toLowerCase(),
                    ),
                    onChange: () =>
                      select("country", country.code.toLowerCase()),
                  })),
                },
                {
                  heading: t("Type"),
                  count: checkedTypeCount,
                  options: typeOptions,
                },
                {
                  heading: t("Purpose"),
                  optionsType: "switch",
                  options: purposes.map((item) => ({
                    value: item.key,
                    label: item.name,
                    checked: selectedPurpose === item.key,
                    onChange: () => setPurpose(item.key),
                  })),
                },
                {
                  heading: t("Сategories"),
                  count: checkedCategoryCount,
                  categories: visiblePurposeCategories.map(
                    ({ category, subcategories }) => ({
                      heading: category.name,
                      queryKey: `category-${category.urlReq}`,
                      defaultOpen: subcategories.some((sub) =>
                        selectedSubcategories.includes(sub.urlReq),
                      ),
                      options: subcategories.map((sub) => ({
                        value: sub.urlReq,
                        label: sub.name,
                        count: sub.count,
                        checked: isSubcategoryChecked(sub.urlReq),
                        onChange: () => toggleSubcategoryValue(sub.urlReq),
                      })),
                    }),
                  ),
                },
              ] as ISidebarItem[]
            ).map((item) => (
              <SidebarItem key={item.heading} {...item} />
            ))}
          </div>

          {isClearBtnVisible && (
            <div className={styles["sidebar-clear-btn-wrapper"]}>
              <button
                type="button"
                className={styles["sidebar-clear-btn"]}
                onClick={clearAll}
              >
                {t("ClearAllFilters")}
                {totalChecked > 0 && ` (${totalChecked})`}
              </button>
            </div>
          )}
        </div>
      </Scrollbar>
    </aside>
  );
};

export { Sidebar };
