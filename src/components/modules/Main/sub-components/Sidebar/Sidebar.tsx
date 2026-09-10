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
import { SidebarItem } from "./sub-components/SidebarItem";
import { ISidebarItem } from "./sub-components/SidebarItem/SidebarItem.types";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { getSelectedCountries, localeCountry } from "@src/utils/localeCountry";
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
  selectedType,
  selectedCategory,
}: ISidebar) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const isSearchResult = router.pathname === "/searchresult";
  const isSlug = router.pathname === "/[slug]";
  const redirectsToHome = isSearchResult || isSlug;

  const purposeKeys = purposes.map((item) => item.key);
  const requestedPurpose = router.query.purpose
    ? String(router.query.purpose)
    : undefined;
  const isValidPurpose = (value: string | undefined): value is string =>
    !!value && purposeKeys.includes(value);

  const categoryPurpose = selectedCategory
    ? Object.entries(categoriesByPurpose).find(([, categories]) =>
        categories.some(({ category }) => category.urlReq === selectedCategory),
      )?.[0]
    : undefined;

  const selectedPurpose = isValidPurpose(requestedPurpose)
    ? requestedPurpose
    : (categoryPurpose ?? purposes[0]?.key);

  const CARRIED_QUERY_KEYS = [
    "type",
    "country",
    "subcategory",
    "sort",
    "categories-expanded",
    "categories-opened",
  ];

  const getHomeQuery = (
    extra: Record<string, string>,
  ): Record<string, string> => {
    const query: Record<string, string> = {};

    const selections: Record<string, () => string[]> = {
      type: getTypeSelection,
      subcategory: getSubcategorySelection,
    };

    CARRIED_QUERY_KEYS.forEach((key) => {
      const value = selections[key]?.() ?? getSelected(key);
      if (value.length) query[key] = value.join(",");
    });

    if (isValidPurpose(requestedPurpose)) query.purpose = requestedPurpose;

    return { ...query, ...extra };
  };

  const purposeCategories = selectedPurpose
    ? (categoriesByPurpose[selectedPurpose] ?? [])
    : [];

  const getSubcategorySelection = () => {
    const selected = getSelected("subcategory");
    return selected.length ? selected : categorySubcategories;
  };

  const getTypeSelection = () =>
    selectedType
      ? Array.from(new Set([selectedType, ...getSelected("type")]))
      : getSelected("type");

  const getSelected = (key: string) => {
    const value = router.query[key];
    const raw = Array.isArray(value) ? value.join(",") : value;
    return raw ? raw.split(",").filter(Boolean) : [];
  };

  const isTypeChecked = (value: string) =>
    getSelected("type").includes(value) || selectedType === value;

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
      checked: isTypeChecked(type.value),
      onChange: () => toggleTypeValue(type.value),
    }));

  const toggleQueryValue = (key: string, value: string) => {
    const selected = getSelected(key);
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    const query = { ...router.query };
    if (next.length) {
      query[key] = next.join(",");
    } else {
      delete query[key];
    }

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

  const toggleTypeValue = (value: string) => {
    const selected = getTypeSelection();
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    if (selectedType || redirectsToHome) {
      const query = getHomeQuery({});
      delete query.type;

      if (next.length) query.type = next.join(",");

      router.push({ pathname: "/", query }, undefined, { scroll: false });
      return;
    }

    const query = { ...router.query };

    if (next.length) {
      query.type = next.join(",");
    } else {
      delete query.type;
    }

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

  const selectCountryValue = (value: string) => {
    if (selectedType || isSearchResult) {
      const query = getHomeQuery({ country: value });

      router.push({ pathname: "/", query }, undefined, { scroll: false });
      return;
    }

    const query = { ...router.query };
    query.country = value;

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

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
    if (selectedType || redirectsToHome) {
      const selected = getSubcategorySelection();
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      const query = getHomeQuery({});
      delete query.subcategory;

      if (next.length) query.subcategory = next.join(",");

      router.push({ pathname: "/", query }, undefined, { scroll: false });
      return;
    }

    toggleQueryValue("subcategory", value);
  };

  const filterKeys = ["type", "country", "subcategory"];

  const allowedValues: Record<string, Set<string>> = {
    type: new Set(ALLOWED_TYPES),
    country: new Set(countries.map((country) => country.code.toLowerCase())),
    subcategory: new Set(
      Object.values(categoriesByPurpose).flatMap((categories) =>
        categories.flatMap(({ subcategories }) =>
          subcategories.map((sub) => sub.urlReq),
        ),
      ),
    ),
  };

  const getValidSelected = (key: string) => {
    const selected = getSelected(key);
    const allowed = allowedValues[key];
    return allowed ? selected.filter((value) => allowed.has(value)) : selected;
  };

  const selectedCountries = getSelectedCountries(
    getValidSelected("country"),
    router.locale,
    countries.map((country) => country.code.toLowerCase()),
  );
  const selectedSubcategories = getValidSelected("subcategory");

  const isSubcategoryChecked = (subcategoryUrlReq: string) =>
    selectedSubcategories.length
      ? selectedSubcategories.includes(subcategoryUrlReq)
      : categorySubcategories.includes(subcategoryUrlReq);

  const defaultCountry = localeCountry(router.locale);
  const isDefaultCountrySelected =
    selectedCountries.length === 1 && selectedCountries[0] === defaultCountry;

  const checkedCountryCount = isDefaultCountrySelected
    ? 0
    : selectedCountries.length;

  const checkedCategoryCount =
    selectedSubcategories.length || categorySubcategories.length;

  const totalChecked =
    filterKeys
      .filter((key) => key !== "country" && key !== "subcategory")
      .reduce((sum, key) => sum + getValidSelected(key).length, 0) +
    checkedCountryCount +
    checkedCategoryCount +
    (selectedType ? 1 : 0);

  const clearedKeys = [
    ...filterKeys,
    "categories-opened",
    "categories-expanded",
  ];

  const clearAllFilters = () => {
    if (selectedType || selectedCategory) {
      const query = getHomeQuery({});
      clearedKeys.forEach((key) => {
        delete query[key];
      });

      router.push({ pathname: "/", query }, undefined, { scroll: false });
      return;
    }

    const query = { ...router.query };
    clearedKeys.forEach((key) => {
      delete query[key];
    });

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

  return (
    <aside className={clsx(styles.sidebar, isOpen && styles["sidebar-open"])}>
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

      <div className={styles["sidebar-wrapper"]}>
        {(
          [
            {
              heading: t("Countries"),
              text: t("ShowingSpeakingCountries"),
              type: "radio",
              count: checkedCountryCount,
              options: countries.map((country) => ({
                value: country.code.toLowerCase(),
                label: country.name,
                count: country.count,
                checked: selectedCountries.includes(country.code.toLowerCase()),
                onChange: () => selectCountryValue(country.code.toLowerCase()),
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
                onChange: () =>
                  router.push(
                    {
                      query: { ...router.query, purpose: item.key },
                    },
                    undefined,
                    { scroll: false, shallow: true },
                  ),
              })),
            },
            {
              heading: t("Сategories"),
              count: checkedCategoryCount,
              categories: purposeCategories.map(
                ({ category, subcategories }) => ({
                  heading: category.name,
                  queryKey: `category-${category.urlReq}`,
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

        {totalChecked > 0 && (
          <button
            type="button"
            className={styles["sidebar-clear-btn"]}
            onClick={clearAllFilters}
          >
            {t("ClearAllFilters")} ({totalChecked})
          </button>
        )}
      </div>
    </aside>
  );
};

export { Sidebar };
