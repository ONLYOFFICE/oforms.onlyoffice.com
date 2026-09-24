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
    const values = filters[name];
    if (values.length) params.set(name, values.join(","));
  });

  if (filters.sort !== DEFAULT_SORT_KEY) params.set("sort", filters.sort);

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
