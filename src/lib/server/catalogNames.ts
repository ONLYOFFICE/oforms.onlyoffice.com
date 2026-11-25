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

import enEmbed from "@/public/locales/en/embed.json";
import deEmbed from "@/public/locales/de/embed.json";
import frEmbed from "@/public/locales/fr/embed.json";
import esEmbed from "@/public/locales/es/embed.json";
import ptEmbed from "@/public/locales/pt/embed.json";
import itEmbed from "@/public/locales/it/embed.json";
import jaEmbed from "@/public/locales/ja/embed.json";
import zhEmbed from "@/public/locales/zh/embed.json";
import arEmbed from "@/public/locales/ar/embed.json";
import enSeo from "@/public/locales/en/category-seo.json";
import deSeo from "@/public/locales/de/category-seo.json";
import frSeo from "@/public/locales/fr/category-seo.json";
import esSeo from "@/public/locales/es/category-seo.json";
import ptSeo from "@/public/locales/pt/category-seo.json";
import itSeo from "@/public/locales/it/category-seo.json";
import jaSeo from "@/public/locales/ja/category-seo.json";
import zhSeo from "@/public/locales/zh/category-seo.json";
import arSeo from "@/public/locales/ar/category-seo.json";

type TNames = Record<string, string | undefined>;
type TSeo = Record<string, { title: string; description: string } | undefined>;

// The names the embed shows, so the two catalogs name a category the same way.
const EMBED: Record<string, { CategoryNames: TNames; PurposeNames: TNames }> = {
  en: enEmbed,
  de: deEmbed,
  fr: frEmbed,
  es: esEmbed,
  pt: ptEmbed,
  it: itEmbed,
  ja: jaEmbed,
  zh: zhEmbed,
  ar: arEmbed,
};

const SEO: Record<string, TSeo> = {
  en: enSeo,
  de: deSeo,
  fr: frSeo,
  es: esSeo,
  pt: ptSeo,
  it: itSeo,
  ja: jaSeo,
  zh: zhSeo,
  ar: arSeo,
};

export const categoryName = (locale: string, slug: string): string =>
  EMBED[locale]?.CategoryNames[slug] ?? EMBED.en.CategoryNames[slug] ?? slug;

export const purposeName = (locale: string, key: string): string =>
  EMBED[locale]?.PurposeNames[key] ?? EMBED.en.PurposeNames[key] ?? key;

export const categorySeo = (locale: string, slug: string) =>
  SEO[locale]?.[slug] ?? SEO.en[slug];

const regionNames = new Map<string, Intl.DisplayNames>();

export const countryName = (locale: string, code: string): string => {
  let names = regionNames.get(locale);
  if (!names) {
    names = new Intl.DisplayNames([locale], { type: "region" });
    regionNames.set(locale, names);
  }
  return names.of(code.toUpperCase()) ?? code;
};

const collators = new Map<string, Intl.Collator>();

export const collatorFor = (locale: string): Intl.Collator => {
  let collator = collators.get(locale);
  if (!collator) {
    collator = new Intl.Collator(locale);
    collators.set(locale, collator);
  }
  return collator;
};
