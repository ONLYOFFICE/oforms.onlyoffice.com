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
import { FILTER_KEYS, toggleFilterValue } from "@src/utils/queryFilters";
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
}: ISidebar) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const countryCodes = countries.map((country) => country.code.toLowerCase());

  const { filters, toggle, select, setPurpose, clearAll, apply } =
    useTemplateFilters({
      type: ALLOWED_TYPES,
      country: countryCodes,
      subcategory: Object.values(categoriesByPurpose).flatMap((categories) =>
        categories.flatMap(({ subcategories }) =>
          subcategories.map((sub) => sub.urlReq),
        ),
      ),
    });

  const purposeKeys = purposes.map((item) => item.key);

  const categoryPurpose = selectedCategory
    ? Object.entries(categoriesByPurpose).find(([, categories]) =>
        categories.some(({ category }) => category.urlReq === selectedCategory),
      )?.[0]
    : undefined;

  const selectedPurpose =
    filters.purpose && purposeKeys.includes(filters.purpose)
      ? filters.purpose
      : (categoryPurpose ?? purposes[0]?.key);

  const purposeCategories = selectedPurpose
    ? (categoriesByPurpose[selectedPurpose] ?? [])
    : [];

  const typeOptions = [
    { value: "docx", label: "Documents", count: docxForms },
    { value: "xlsx", label: "Spreadsheets", count: xlsxForms },
    { value: "pptx", label: "Presentations", count: pptxForms },
    { value: "pdf", label: "PdfForms", count: pdfForms },
  ]
    .filter((type) => type.count > 0)
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
    if (!filters.subcategory.length && categorySubcategories.length) {
      apply(
        toggleFilterValue(
          { ...filters, subcategory: categorySubcategories },
          "subcategory",
          value,
        ),
      );
      return;
    }

    toggle("subcategory", value);
  };

  const selectedCountries = getSelectedCountries(
    filters.country,
    router.locale,
    countryCodes,
  );
  const selectedSubcategories = filters.subcategory;

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

  const isDefaultCountrySelected =
    selectedCountries.length === 1 && selectedCountries[0] === defaultCountry;

  const checkedCountryCount = isDefaultCountrySelected
    ? 0
    : selectedCountries.length;

  const checkedCategoryCount =
    selectedSubcategories.length || categorySubcategories.length;

  const totalChecked =
    FILTER_KEYS.filter((key) => key !== "country" && key !== "subcategory")
      .reduce((sum, key) => sum + filters[key].length, 0) +
    checkedCountryCount +
    checkedCategoryCount;

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
            totalChecked > 0 && styles["sidebar-wrapper-with-clear-btn"],
          )}
        >
          <div>
            {(
              [
                {
                  heading: t("Countries"),
                  text: t("ShowingSpeakingCountries"),
                  type: "radio",
                  count: checkedCountryCount,
                  options: sortedCountries.map((country) => ({
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
                  count: typeOptions.filter((type) => type.checked).length,
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
                  categories: purposeCategories.map(
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

          {totalChecked > 0 && (
            <div className={styles["sidebar-clear-btn-wrapper"]}>
              <button
                type="button"
                className={styles["sidebar-clear-btn"]}
                onClick={clearAll}
              >
                {t("ClearAllFilters")} ({totalChecked})
              </button>
            </div>
          )}
        </div>
      </Scrollbar>
    </aside>
  );
};

export { Sidebar };
