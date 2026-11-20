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

import CONFIG from "@src/config/config.json";
import { languages } from "@src/config/languages";
import { IHreflang } from "@src/components/modules/Head/Head.types";

const DEFAULT_LOCALE = CONFIG.defaultLanguage;

const ALL_LOCALES = languages.map(({ shortKey }) => shortKey);

const getSiteUrl = (): string =>
  (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

const normalizePath = (path?: string): string => {
  if (!path || path === "/") return "";

  const [withoutHash] = path.split("#");
  const [withoutQuery] = withoutHash.split("?");
  const trimmed = withoutQuery.replace(/\/+$/, "");

  if (!trimmed) return "";

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const getLocalePath = (path?: string, locale?: string): string => {
  const prefix = !locale || locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return `${prefix}${normalizePath(path)}`;
};

const getCanonicalUrl = (path?: string, locale?: string): string => {
  const siteUrl = getSiteUrl();

  if (!siteUrl) return "";

  return `${siteUrl}${getLocalePath(path, locale)}`;
};

const buildHreflangs = (
  path?: string,
  localized = false,
  locales: readonly string[] = ALL_LOCALES,
): IHreflang[] => {
  if (!localized) return [];

  const links = ALL_LOCALES.filter((locale) => locales.includes(locale)).map(
    (locale) => ({
      hrefLang: locale,
      href: getCanonicalUrl(path, locale),
    }),
  );

  if (links.length < 2) return [];

  const defaultLink = links.find((link) => link.hrefLang === DEFAULT_LOCALE);

  if (!defaultLink) return links;

  return [...links, { hrefLang: "x-default", href: defaultLink.href }];
};

export {
  getSiteUrl,
  getLocalePath,
  getCanonicalUrl,
  buildHreflangs,
  DEFAULT_LOCALE,
};
