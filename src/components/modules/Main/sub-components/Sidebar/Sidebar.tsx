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

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { SidebarItem } from "./sub-components/SidebarItem";
import { ISidebarItem } from "./sub-components/SidebarItem/SidebarItem.types";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
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
  const selectedPurpose = isValidPurpose(requestedPurpose)
    ? requestedPurpose
    : purposes[0]?.key;

  const getHomeQuery = (
    extra: Record<string, string>,
  ): Record<string, string> => {
    const query: Record<string, string> = { ...extra };
    const country = getSelected("country");
    if (country.length) query.country = country.join(",");
    if (isValidPurpose(requestedPurpose)) query.purpose = requestedPurpose;
    return query;
  };

  const purposeCategories = selectedPurpose
    ? (categoriesByPurpose[selectedPurpose] ?? [])
    : [];

  const getSelected = (key: string) => {
    const value = router.query[key];
    const raw = Array.isArray(value) ? value.join(",") : value;
    return raw ? raw.split(",").filter(Boolean) : [];
  };

  const isTypeChecked = (value: string) =>
    getSelected("type").includes(value) || selectedType === value;

  const checkedTypeCount = ["docx", "xlsx", "pptx", "pdf"].filter(
    isTypeChecked,
  ).length;

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
    if (selectedType) {
      const next = selectedType === value ? [] : [value];

      router.push(
        { pathname: "/", query: next.length ? { type: next.join(",") } : {} },
        undefined,
        { scroll: false },
      );
      return;
    }

    if (redirectsToHome) {
      const selected = getSelected("type");
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      router.push(
        {
          pathname: "/",
          query: getHomeQuery(next.length ? { type: next.join(",") } : {}),
        },
        undefined,
        { scroll: false },
      );
      return;
    }

    const selected = getSelected("type");
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    const query = { ...router.query };
    delete query.country;
    delete query.subcategory;

    if (next.length) {
      query.type = next.join(",");
    } else {
      delete query.type;
    }

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

  const toggleCountryValue = (value: string) => {
    const selected = getSelected("country");
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    const query = { ...router.query };

    if (next.length) {
      query.country = next.join(",");
    } else {
      delete query.country;
    }

    router.push({ pathname: router.pathname, query }, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  const toggleSubcategoryValue = (value: string) => {
    if (selectedType) {
      router.push(
        { pathname: "/", query: { type: selectedType, subcategory: value } },
        undefined,
        { scroll: false },
      );
      return;
    }

    if (redirectsToHome) {
      router.push(
        { pathname: "/", query: getHomeQuery({ subcategory: value }) },
        undefined,
        { scroll: false },
      );
      return;
    }

    toggleQueryValue("subcategory", value);
  };

  const filterKeys = ["type", "country", "subcategory"];

  const allowedValues: Record<string, string[]> = {
    type: ALLOWED_TYPES,
    country: countries.map((country) => country.code.toLowerCase()),
    subcategory: Object.values(categoriesByPurpose).flatMap((categories) =>
      categories.flatMap(({ subcategories }) =>
        subcategories.map((sub) => sub.urlReq),
      ),
    ),
  };

  const getValidSelected = (key: string) => {
    const selected = getSelected(key);
    const allowed = allowedValues[key];
    return allowed
      ? selected.filter((value) => allowed.includes(value))
      : selected;
  };

  const totalChecked =
    filterKeys.reduce((sum, key) => sum + getValidSelected(key).length, 0) +
    (selectedType ? 1 : 0);

  const clearAllFilters = () => {
    if (selectedType) {
      router.push({ pathname: "/", query: {} }, undefined, { scroll: false });
      return;
    }

    const query = { ...router.query };
    filterKeys.forEach((key) => {
      delete query[key];
    });

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

  const selectedCountries = getSelected("country");
  const selectedSubcategories = getSelected("subcategory");

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
              heading: t("Type"),
              count: checkedTypeCount,
              options: [
                {
                  value: "docx",
                  label: "Documents",
                  count: docxForms,
                },
                {
                  value: "xlsx",
                  label: "Spreadsheets",
                  count: xlsxForms,
                },
                {
                  value: "pptx",
                  label: "Presentations",
                  count: pptxForms,
                },
                {
                  value: "pdf",
                  label: "PdfForms",
                  count: pdfForms,
                },
              ].map((type) => ({
                value: type.value,
                label: t(type.label),
                count: type.count,
                checked: isTypeChecked(type.value),
                onChange: () => toggleTypeValue(type.value),
              })),
            },
            {
              heading: t("Countries"),
              text: t("ShowingEnglishSpeakingCountries"),
              count: selectedCountries.length,
              options: countries.map((country) => ({
                value: country.code.toLowerCase(),
                label: country.name,
                count: country.count,
                checked: selectedCountries.includes(country.code.toLowerCase()),
                onChange: () => toggleCountryValue(country.code.toLowerCase()),
              })),
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
              count: selectedSubcategories.length,
              categories: purposeCategories.map(
                ({ category, subcategories }) => ({
                  heading: category.name,
                  queryKey: `category-${category.id}`,
                  options: subcategories.map((sub) => ({
                    value: sub.urlReq,
                    label: sub.name,
                    count: sub.count,
                    checked: selectedSubcategories.includes(sub.urlReq),
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
