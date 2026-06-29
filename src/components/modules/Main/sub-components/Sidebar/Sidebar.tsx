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

  const selectedPurpose = router.query.purpose
    ? String(router.query.purpose)
    : purposes[0]?.key;

  const getHomeQuery = (
    extra: Record<string, string>,
  ): Record<string, string> => {
    const query: Record<string, string> = { ...extra };
    const country = getSelected("country");
    if (country.length) query.country = country.join(",");
    if (router.query.purpose) query.purpose = String(router.query.purpose);
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
    delete query.subcategory;

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

  const totalChecked =
    filterKeys.reduce((sum, key) => sum + getSelected(key).length, 0) +
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

  return (
    <aside className={clsx(styles.sidebar, isOpen && styles["sidebar-open"])}>
      <div className={styles["sidebar-header"]}>
        <button
          onClick={() => setIsOpen(false)}
          className={styles["sidebar-close-btn"]}
          style={
            {
              "--sidebar-close-btn-icon": `url(${getAssetUrl("/images/cross-x2.svg")})`,
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
              count: getSelected("country").length,
              options: countries.map((country) => ({
                value: country.code.toLowerCase(),
                label: country.name,
                count: country.count,
                checked: getSelected("country").includes(
                  country.code.toLowerCase(),
                ),
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
              count: getSelected("subcategory").length,
              categories: purposeCategories.map(
                ({ category, subcategories }) => ({
                  heading: category.name,
                  queryKey: `category-${category.id}`,
                  options: subcategories.map((sub) => ({
                    value: sub.urlReq,
                    label: sub.name,
                    count: sub.count,
                    checked: getSelected("subcategory").includes(sub.urlReq),
                    onChange: () => toggleSubcategoryValue(sub.urlReq),
                  })),
                }),
              ),
            },
          ] as ISidebarItem[]
        ).map((item, index) => (
          <SidebarItem key={index} {...item} />
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
