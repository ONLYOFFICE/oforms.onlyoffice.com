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

import { IExtCategory } from "@src/types/template";
import { ICategoryTree } from "@src/components/modules/Main/Main.types";
import { IFormsData } from "@src/types/data";
import { ALLOWED_TYPES, TAllowedTypes } from "@src/utils/allowedTypes";

export const getQueryValues = (
  value: string | string[] | undefined,
): string[] => {
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw ? raw.split(",").filter(Boolean) : [];
};

export const getTemplatesByExt = (
  forms: IFormsData["data"][number][] | undefined,
  ext: TAllowedTypes,
  limit = 8,
) =>
  forms
    ?.filter((form) => form.form_exts?.some((item) => item.ext === ext))
    .map((form) => ({
      ...form,
      form_exts: [...form.form_exts].sort(
        (a, b) => ALLOWED_TYPES.indexOf(a.ext) - ALLOWED_TYPES.indexOf(b.ext),
      ),
    }))
    .slice(0, limit) ?? [];

export const getPopularTemplates = (
  forms: IFormsData["data"][number][] | undefined,
  limit = 8,
) => forms?.filter((form) => form.popular_template).slice(0, limit) ?? [];

type TSortKey = "popular" | "asc" | "desc" | "name_asc" | "name_desc";
const SORT_MAP: Record<TSortKey, string> = {
  asc: "createdAt:desc",
  desc: "createdAt:asc",
  name_asc: "name_form:asc",
  name_desc: "name_form:desc",
  popular: "popular_template:desc",
};

export const normalizeSortKey = (
  value: string | string[] | undefined,
): TSortKey => {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && raw in SORT_MAP ? (raw as TSortKey) : "asc";
};

export const sortForms = (
  forms: IFormsData["data"][number][] | undefined,
  sort: TSortKey,
) => {
  const [field, direction] = SORT_MAP[sort].split(":");
  const dir = direction === "desc" ? -1 : 1;
  const result = [...(forms ?? [])];

  return result.sort((a, b) => {
    switch (field) {
      case "name_form":
        return (
          dir *
          a.name_form.localeCompare(b.name_form, undefined, {
            sensitivity: "base",
          })
        );
      case "popular_template":
        return (
          dir *
          (Number(Boolean(a.popular_template)) -
            Number(Boolean(b.popular_template)))
        );
      case "createdAt":
      default:
        return (
          dir *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        );
    }
  });
};

export const getExtCount = (
  extFormsCount: IExtCategory["extFormsCount"],
  ext: TAllowedTypes,
): number =>
  extFormsCount.data.find((item) => item.ext === ext)?.oforms.count ?? 0;

export const getPurposes = (
  purposeWithCategoriesCount: IExtCategory["purposeWithCategoriesCount"],
) =>
  purposeWithCategoriesCount.data
    .map(({ id, documentId, name, key, createdAt }) => ({
      id,
      documentId,
      name,
      key,
      createdAt,
    }))
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

export const getCategoriesByPurpose = (
  purposeWithCategoriesCount: IExtCategory["purposeWithCategoriesCount"],
  selectedCountries: string[] = [],
): Record<string, ICategoryTree[]> => {
  const result: Record<string, ICategoryTree[]> = {};

  const getSubcategoryCount = (
    oforms: IExtCategory["purposeWithCategoriesCount"]["data"][number]["parent_categories"][number]["subcategories"][number]["oforms"],
  ): number => {
    if (!selectedCountries.length) return oforms.length;
    return oforms.filter((oform) =>
      oform.countries?.some((country) =>
        selectedCountries.includes(country.code.toLowerCase()),
      ),
    ).length;
  };

  purposeWithCategoriesCount.data.forEach((purpose) => {
    result[purpose.key] = [...purpose.parent_categories]
      .map((category) => ({
        category: {
          id: category.id,
          documentId: category.documentId,
          name: category.name,
          urlReq: category.urlReq,
          createdAt: category.createdAt,
          purpose: {
            id: purpose.id,
            documentId: purpose.documentId,
            name: purpose.name,
            key: purpose.key,
            createdAt: purpose.createdAt,
          },
        },
        subcategories: [...category.subcategories]
          .map((sub) => ({
            id: sub.id,
            documentId: sub.documentId,
            name: sub.name,
            urlReq: sub.urlReq,
            createdAt: sub.createdAt,
            count: getSubcategoryCount(sub.oforms),
          }))
          .filter((sub) => sub.count > 0)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          ),
      }))
      .filter((category) => category.subcategories.length > 0)
      .sort(
        (a, b) =>
          new Date(a.category.createdAt).getTime() -
          new Date(b.category.createdAt).getTime(),
      );
  });

  return result;
};
