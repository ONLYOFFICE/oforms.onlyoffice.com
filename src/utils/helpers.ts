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

import { TAllowedTypes } from "@src/utils/allowedTypes";
import { extOf } from "@src/utils/templateFiles";
import { TCatalogItem } from "@src/types/room";

export const getQueryValues = (
  value: string | string[] | undefined,
): string[] => {
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw ? Array.from(new Set(raw.split(",").filter(Boolean))) : [];
};

export const getTemplatesByExt = (
  forms: TCatalogItem[],
  ext: TAllowedTypes,
  limit = 8,
) => forms.filter((form) => extOf(form) === ext).slice(0, limit);

export const getPopularTemplates = (forms: TCatalogItem[], limit = 8) =>
  forms.filter(({ meta }) => meta.popular).slice(0, limit);

const POPULAR_TEMPLATES_MIN_FORMS = 8;

const hashString = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const stableShuffle = <T extends { id: number | string }>(
  items: T[],
  seed: string,
): T[] =>
  items
    .map((item) => ({ item, key: hashString(`${seed}:${item.id}`) }))
    .sort(
      (a, b) =>
        a.key - b.key || String(a.item.id).localeCompare(String(b.item.id)),
    )
    .map(({ item }) => item);

export const fillPopularTemplates = (
  popular: TCatalogItem[],
  pool: TCatalogItem[],
  min = 4,
) => {
  if (!popular.length || popular.length >= min) return popular;

  const usedIds = new Set(popular.map((form) => form.id));
  const seed = popular.map((form) => form.id).join(",");

  return [
    ...popular,
    ...stableShuffle(
      pool.filter((form) => !usedIds.has(form.id)),
      seed,
    ).slice(0, min - popular.length),
  ];
};

export const getSectionPopularTemplates = (forms: TCatalogItem[]) =>
  forms.length < POPULAR_TEMPLATES_MIN_FORMS
    ? []
    : fillPopularTemplates(getPopularTemplates(forms), forms);

export type TSortKey = "popular" | "asc" | "desc" | "name_asc" | "name_desc";
const SORT_MAP: Record<TSortKey, string> = {
  asc: "added:desc",
  desc: "added:asc",
  name_asc: "name:asc",
  name_desc: "name:desc",
  popular: "popular:desc",
};

export const SORT_KEYS = Object.keys(SORT_MAP) as TSortKey[];
export const DEFAULT_SORT_KEY: TSortKey = "asc";

export const normalizeSortKey = (
  value: string | string[] | undefined,
): TSortKey => {
  const raw = (Array.isArray(value) ? value[0] : value)?.toLowerCase();
  return raw && Object.hasOwn(SORT_MAP, raw)
    ? (raw as TSortKey)
    : DEFAULT_SORT_KEY;
};

const names = new Intl.Collator(undefined, { sensitivity: "base" });

export const sortForms = (forms: TCatalogItem[], sort: TSortKey) => {
  const [field, direction] = SORT_MAP[sort].split(":");
  const dir = direction === "desc" ? -1 : 1;

  return [...forms].sort((a, b) => {
    switch (field) {
      case "name":
        return dir * names.compare(a.meta["card-title"], b.meta["card-title"]);
      case "popular":
        return dir * (Number(!!a.meta.popular) - Number(!!b.meta.popular));
      case "added":
      default:
        return (
          dir *
          (a.meta.added < b.meta.added
            ? -1
            : a.meta.added > b.meta.added
              ? 1
              : 0)
        );
    }
  });
};
