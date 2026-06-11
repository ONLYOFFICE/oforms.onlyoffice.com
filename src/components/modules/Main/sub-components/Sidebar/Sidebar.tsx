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
import { SidebarItem } from "./sub-components/SidebarItem";
import { FILTER_PARAMS } from "@src/components/modules/Main/Main.constants";
import { ISidebar } from "./Sidebar.types";
import styles from "./Sidebar.module.scss";

const Sidebar = ({
  typeFormsCount,
  docxForms,
  xlsxForms,
  pptxForms,
  pdfForms,
  categories,
  types,
  compilations,
  activeSubCategory,
}: ISidebar) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const PAGE_EXT: Record<string, string> = {
    "/document-templates": "docx",
    "/spreadsheet-templates": "xlsx",
    "/presentation-templates": "pptx",
    "/pdf-form-templates": "pdf",
  };
  const pageExt = PAGE_EXT[router.pathname];
  const isFormPage = router.pathname.startsWith("/form");
  const isSearchPage = router.pathname === "/searchresult";

  const parseIds = (param: string | string[] | undefined) =>
    param ? String(param).split(",").filter(Boolean) : [];

  const withOpened = (query: Record<string, string | string[]>) => {
    if (router.query.opened) {
      return { ...query, opened: router.query.opened };
    }
    return query;
  };

  const isSubCategoryChecked = (group: string, id: number) =>
    isFormPage &&
    activeSubCategory?.relation === group &&
    activeSubCategory?.id === id;

  const isTypeChecked = (ext: string) =>
    isFormPage
      ? false
      : pageExt
        ? pageExt === ext || parseIds(router.query.type).includes(ext)
        : parseIds(router.query.type).includes(ext);

  const toggleFilter = (group: string, id: string) => {
    if (group === "type" && pageExt) {
      if (pageExt === id) {
        router.push({ pathname: "/", query: withOpened({}) }, undefined, {
          scroll: false,
        });
        return;
      }

      const current = parseIds(router.query.type).filter(
        (item) => item !== pageExt,
      );
      const ids = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      router.push(
        {
          pathname: "/",
          query: withOpened({ type: [pageExt, ...ids].join(",") }),
        },
        undefined,
        { scroll: false },
      );
      return;
    }

    if (isFormPage) {
      if (group === "type") {
        router.push(
          { pathname: "/", query: withOpened({ type: id }) },
          undefined,
          { scroll: false },
        );
        return;
      }

      const query: Record<string, string> = {};

      if (activeSubCategory) {
        query[activeSubCategory.relation] = String(activeSubCategory.id);
      }

      const current = parseIds(query[group]);
      const ids = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      if (ids.length > 0) {
        query[group] = ids.join(",");
      } else {
        delete query[group];
      }

      router.push({ pathname: "/", query: withOpened(query) }, undefined, {
        scroll: false,
      });
      return;
    }

    if (isSearchPage) {
      router.push(
        { pathname: "/", query: withOpened({ [group]: id }) },
        undefined,
        { scroll: false },
      );
      return;
    }

    const current = parseIds(router.query[group]);

    const ids = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    const query = { ...router.query };
    if (group === "type") {
      delete query.categories;
      delete query.types;
      delete query.compilations;
    }
    if (ids.length > 0) {
      query[group] = ids.join(",");
    } else {
      delete query[group];
    }

    router.push({ pathname: router.pathname, query }, undefined, {
      scroll: false,
    });
  };

  const countByKey = (key: string) => {
    if (isFormPage) {
      return activeSubCategory?.relation === key ? 1 : 0;
    }

    if (key === "type" && pageExt) {
      const ids = parseIds(router.query.type).filter(
        (item) => item !== pageExt,
      );
      return ids.length + 1;
    }

    return parseIds(router.query[key]).length;
  };

  const getTypeFormsCountByExt = (ext: string) =>
    typeFormsCount?.data?.find((item) => item.attributes.ext === ext)
      ?.attributes.oforms.data.attributes.count ?? 0;

  const totalChecked = FILTER_PARAMS.reduce(
    (sum, key) => sum + countByKey(key),
    0,
  );

  const clearAllFilters = () => {
    if (pageExt || isFormPage) {
      router.push({ pathname: "/", query: withOpened({}) }, undefined, {
        scroll: false,
      });
      return;
    }

    const query = { ...router.query };
    FILTER_PARAMS.forEach((key) => {
      delete query[key];
    });
    router.push({ pathname: router.pathname, query }, undefined, {
      scroll: false,
    });
  };

  return (
    <aside>
      {[
        {
          heading: t("Type"),
          count: countByKey("type"),
          options: [
            ...(docxForms?.data?.length || getTypeFormsCountByExt("docx")
              ? [
                  {
                    value: "docx",
                    label: t("Documents"),
                    count:
                      docxForms?.meta.pagination.total ??
                      getTypeFormsCountByExt("docx"),
                    checked: isTypeChecked("docx"),
                    onChange: () => toggleFilter("type", "docx"),
                  },
                ]
              : []),
            ...(xlsxForms?.data?.length || getTypeFormsCountByExt("xlsx")
              ? [
                  {
                    value: "xlsx",
                    label: t("Spreadsheets"),
                    count:
                      xlsxForms?.meta.pagination.total ??
                      getTypeFormsCountByExt("xlsx"),
                    checked: isTypeChecked("xlsx"),
                    onChange: () => toggleFilter("type", "xlsx"),
                  },
                ]
              : []),
            ...(pptxForms?.data?.length || getTypeFormsCountByExt("pptx")
              ? [
                  {
                    value: "pptx",
                    label: t("Presentations"),
                    count:
                      pptxForms?.meta.pagination.total ??
                      getTypeFormsCountByExt("pptx"),
                    checked: isTypeChecked("pptx"),
                    onChange: () => toggleFilter("type", "pptx"),
                  },
                ]
              : []),
            ...(pdfForms?.data?.length || getTypeFormsCountByExt("pdf")
              ? [
                  {
                    value: "pdf",
                    label: t("PdfForms"),
                    count:
                      pdfForms?.meta.pagination.total ??
                      getTypeFormsCountByExt("pdf"),
                    checked: isTypeChecked("pdf"),
                    onChange: () => toggleFilter("type", "pdf"),
                  },
                ]
              : []),
          ],
        },
        {
          heading: t("Сategories"),
          count:
            countByKey("categories") +
            countByKey("types") +
            countByKey("compilations"),
          categories: [
            ...(categories.data.length > 0
              ? [
                  {
                    heading: t("TemplatesByBranch"),
                    queryKey: "categories",
                    options: categories.data.map((item) => ({
                      value: `categories-${item.id}`,
                      label: item.attributes.categorie,
                      count: item.attributes.oforms.data.attributes.count,
                      checked:
                        parseIds(router.query.categories).includes(
                          String(item.id),
                        ) || isSubCategoryChecked("categories", item.id),
                      onChange: () =>
                        toggleFilter("categories", String(item.id)),
                    })),
                  },
                ]
              : []),
            ...(types.data.length > 0
              ? [
                  {
                    heading: t("TemplatesByType"),
                    queryKey: "types",
                    options: types.data.map((item) => ({
                      value: `types-${item.id}`,
                      label: item.attributes.type,
                      count: item.attributes.oforms.data.attributes.count,
                      checked:
                        parseIds(router.query.types).includes(
                          String(item.id),
                        ) || isSubCategoryChecked("types", item.id),
                      onChange: () => toggleFilter("types", String(item.id)),
                    })),
                  },
                ]
              : []),
            ...(compilations.data.length > 0
              ? [
                  {
                    heading: t("PopularCompilations"),
                    queryKey: "compilations",
                    options: compilations.data.map((item) => ({
                      value: `compilations-${item.id}`,
                      label: item.attributes.compilation,
                      count: item.attributes.oforms.data.attributes.count,
                      checked:
                        parseIds(router.query.compilations).includes(
                          String(item.id),
                        ) || isSubCategoryChecked("compilations", item.id),
                      onChange: () =>
                        toggleFilter("compilations", String(item.id)),
                    })),
                  },
                ]
              : []),
          ],
        },
      ].map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}

      {!!totalChecked && (
        <button
          type="button"
          className={styles["sidebar-clear-btn"]}
          onClick={clearAllFilters}
        >
          {t("ClearAllFilters")} ({totalChecked})
        </button>
      )}
    </aside>
  );
};

export { Sidebar };
