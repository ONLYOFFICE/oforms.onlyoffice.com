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

import {
  DEFAULT_SORT_KEY,
  getQueryValues,
  normalizeSortKey,
  TSortKey,
} from "@src/utils/helpers";

export type TQueryValue = string | string[] | undefined;
export type TRawQuery = Record<string, TQueryValue>;

export const FILTER_KEYS = ["type", "country", "subcategory"] as const;
export type TFilterKey = (typeof FILTER_KEYS)[number];

export const EXPAND_QUERY_PARAM = "categories-expanded";
export const COLLAPSE_QUERY_PARAM = "categories-opened";

export type TAllowedValues = Partial<Record<TFilterKey, Iterable<string>>>;

export interface ITemplateFilters {
  type: string[];
  country: string[];
  subcategory: string[];
  sort: TSortKey;
  purpose?: string;
  expanded: string[];
  opened: string[];
}

export const parseQueryList = (value: TQueryValue): string[] =>
  getQueryValues(value);

export const parseQueryValue = (value: TQueryValue): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const keepAllowed = (values: string[], allowed?: Iterable<string>) => {
  if (!allowed) return values;
  const set = allowed instanceof Set ? allowed : new Set(allowed);
  return values.filter((value) => set.has(value));
};

export const parseFilters = (
  query: TRawQuery,
  allowed: TAllowedValues = {},
): ITemplateFilters => ({
  type: keepAllowed(parseQueryList(query.type), allowed.type),
  country: keepAllowed(parseQueryList(query.country), allowed.country),
  subcategory: keepAllowed(
    parseQueryList(query.subcategory),
    allowed.subcategory,
  ),
  sort: normalizeSortKey(query.sort),
  purpose: parseQueryValue(query.purpose),
  expanded: parseQueryList(query[EXPAND_QUERY_PARAM]),
  opened: parseQueryList(query[COLLAPSE_QUERY_PARAM]),
});

export const serializeFilters = (
  filters: ITemplateFilters,
): Record<string, string> => {
  const query: Record<string, string> = {};

  const lists: Record<string, string[]> = {
    type: filters.type,
    country: filters.country,
    subcategory: filters.subcategory,
    [EXPAND_QUERY_PARAM]: filters.expanded,
    [COLLAPSE_QUERY_PARAM]: filters.opened,
  };

  Object.entries(lists).forEach(([key, values]) => {
    if (values.length) query[key] = values.join(",");
  });

  if (filters.purpose) query.purpose = filters.purpose;
  if (filters.sort !== DEFAULT_SORT_KEY) query.sort = filters.sort;

  return query;
};

export const toggleFilterValue = (
  filters: ITemplateFilters,
  key: TFilterKey,
  value: string,
): ITemplateFilters => {
  const current = filters[key];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  return { ...filters, [key]: next };
};

export const setFilterValue = (
  filters: ITemplateFilters,
  key: TFilterKey,
  value: string,
): ITemplateFilters => ({ ...filters, [key]: [value] });

export const clearFilters = (filters: ITemplateFilters): ITemplateFilters => ({
  ...filters,
  type: [],
  country: [],
  subcategory: [],
  expanded: [],
  opened: [],
});
