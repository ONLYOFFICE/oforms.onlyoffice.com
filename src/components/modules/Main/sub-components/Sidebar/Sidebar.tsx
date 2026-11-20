/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useRef, useState } from "react";
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
import { resolvePurpose } from "@src/components/templates/Main/Main.utils";
import {
  COUNTRIES_COLLAPSE_QUERY_PARAM,
  toggleFilterValue,
} from "@src/utils/queryFilters";
import { ISidebar } from "./Sidebar.types";
import styles from "./Sidebar.module.scss";

const VISIBLE_COUNTRIES_LIMIT = 8;
const SCROLLBAR_HIDE_DELAY = 2000;

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
  categorySubcategories,
  redirectToHome,
}: ISidebar) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const scrollbarTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showScrollbar = () => {
    setIsScrollbarVisible(true);
    clearTimeout(scrollbarTimeoutRef.current);
    scrollbarTimeoutRef.current = setTimeout(
      () => setIsScrollbarVisible(false),
      SCROLLBAR_HIDE_DELAY,
    );
  };

  const hideScrollbar = () => {
    clearTimeout(scrollbarTimeoutRef.current);
    setIsScrollbarVisible(false);
  };

  useEffect(() => () => clearTimeout(scrollbarTimeoutRef.current), []);

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

  const selectedPurpose = resolvePurpose(
    purposes.map((item) => item.key),
    categoriesByPurpose,
    {
      purpose: filters.purpose,
      category: selectedCategory,
      subcategory: filters.subcategory,
    },
  );

  const purposeCategories = selectedPurpose
    ? (categoriesByPurpose[selectedPurpose] ?? [])
    : [];

  const purposeSubcategories = new Set(
    purposeCategories.flatMap(({ subcategories }) =>
      subcategories.map((sub) => sub.urlReq),
    ),
  );

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

    apply(next, { toHome: true });
  };

  const selectPurpose = (purpose: string) => {
    if (!selectedCategory) {
      setPurpose(purpose);
      return;
    }

    apply(
      { ...filters, subcategory: categorySubcategories, purpose },
      { toHome: true },
    );
  };

  const selectedCountries = getSelectedCountries(
    filters.country,
    router.locale,
    countryCodes,
  );
  const selectedSubcategories = (
    selectedCategory ? categorySubcategories : filters.subcategory
  ).filter((sub) => purposeSubcategories.has(sub));

  const isSubcategoryChecked = (subcategoryUrlReq: string) =>
    selectedSubcategories.includes(subcategoryUrlReq);

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
  const toCountryOption = (country: (typeof countries)[number]) => ({
    value: country.code.toLowerCase(),
    label: country.name,
    count: country.count,
    checked: selectedCountries.includes(country.code.toLowerCase()),
    onChange: () => select("country", country.code.toLowerCase()),
  });
  const topCountryOptions = visibleCountries
    .slice(0, VISIBLE_COUNTRIES_LIMIT)
    .map(toCountryOption);
  const otherCountryOptions = visibleCountries
    .slice(VISIBLE_COUNTRIES_LIMIT)
    .map(toCountryOption);
  const visiblePurposeCategories = purposeCategories
    .map(({ category, subcategories }) => ({
      category,
      subcategories: subcategories.filter((sub) => sub.count > 0),
    }))
    .filter(({ subcategories }) => subcategories.length > 0);

  const checkedCategoryCount = visiblePurposeCategories
    .flatMap(({ subcategories }) => subcategories)
    .filter((sub) => isSubcategoryChecked(sub.urlReq)).length;

  const checkedTypeCount = typeOptions.filter((type) => type.checked).length;

  const hasSelectedFilters =
    filters.type.length > 0 || selectedSubcategories.length > 0;

  const totalChecked = checkedTypeCount + checkedCategoryCount;

  const isClearBtnVisible = hasSelectedFilters || totalChecked > 0;

  return (
    <aside
      className={clsx(styles.sidebar, isOpen && styles["sidebar-open"])}
      onMouseEnter={showScrollbar}
      onMouseLeave={hideScrollbar}
    >
      <Scrollbar
        className={styles["sidebar-scrollbar"]}
        contentProps={{ className: styles["sidebar-scrollbar-content"] }}
        trackYProps={{
          className: clsx(
            styles["sidebar-scrollbar-track"],
            isScrollbarVisible && styles["sidebar-scrollbar-track-visible"],
            isClearBtnVisible &&
              styles["sidebar-scrollbar-track-with-clear-btn"],
          ),
        }}
        thumbYProps={{ className: styles["sidebar-scrollbar-thumb"] }}
        rtl={router.locale ? isRtlLocale(router.locale) : false}
        noScrollX
        removeTrackXWhenNotUsed
        removeTrackYWhenNotUsed
        onScroll={showScrollbar}
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
                  options: topCountryOptions,
                  categories: otherCountryOptions.length
                    ? [
                        {
                          heading: t("OtherCountries"),
                          collapseQueryKey: "other-countries",
                          collapseQueryParam: COUNTRIES_COLLAPSE_QUERY_PARAM,
                          defaultOpen: otherCountryOptions.some(
                            (option) => option.checked,
                          ),
                          options: otherCountryOptions,
                        },
                      ]
                    : undefined,
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
                    onChange: () => selectPurpose(item.key),
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
