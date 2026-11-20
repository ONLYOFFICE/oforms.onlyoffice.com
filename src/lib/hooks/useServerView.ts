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

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { DEFAULT_SORT_KEY } from "@src/utils/helpers";
import { clearViewPending } from "@src/utils/viewPending";
import { localeCountry } from "@src/utils/localeCountry";
import {
  FILTER_KEYS,
  parseFilters,
  TAllowedValues,
  TRawQuery,
} from "@src/utils/queryFilters";
import { useFetchedState } from "./useFetchedState";

const ALLOWED_VALUES: TAllowedValues = { type: ALLOWED_TYPES };

const buildViewQuery = (
  locale: string,
  query: TRawQuery,
  extra?: Record<string, string | undefined>,
) => {
  const params = new URLSearchParams();
  params.set("locale", locale);

  Object.entries(extra ?? {}).forEach(([name, value]) => {
    if (value) params.set(name, value);
  });

  const filters = parseFilters(query, ALLOWED_VALUES);
  const isDefaultCountry =
    filters.country.length === 1 &&
    filters.country[0] === localeCountry(locale);

  FILTER_KEYS.forEach((name) => {
    if (name === "country" && isDefaultCountry) return;
    if (name === "subcategory" && extra?.category) return;
    const values = filters[name];
    if (values.length) params.set(name, values.join(","));
  });

  if (filters.purpose && !extra?.category)
    params.set("purpose", filters.purpose);

  if (filters.sort && filters.sort !== DEFAULT_SORT_KEY)
    params.set("sort", filters.sort);

  return params.toString();
};

export const useServerView = <T>(
  initialView: T,
  extra?: Record<string, string | undefined>,
): { view: T; isInitialLoading: boolean } => {
  const router = useRouter();
  const locale = router.locale ?? "en";
  const [isInitial, setIsInitial] = useState(true);

  const initialQuery = buildViewQuery(locale, {}, { ...extra, query: "" });
  const query = router.isReady
    ? buildViewQuery(locale, router.query, extra)
    : initialQuery;

  const { value, isLoading } = useFetchedState(
    query === initialQuery ? null : `/api/forms?${query}`,
    initialView,
    "[useServerView]",
  );

  useLayoutEffect(() => {
    if (router.isReady) clearViewPending();
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady && !isLoading) setIsInitial(false);
  }, [router.isReady, isLoading]);

  return {
    view: value,
    isInitialLoading: isInitial && isLoading,
  };
};
