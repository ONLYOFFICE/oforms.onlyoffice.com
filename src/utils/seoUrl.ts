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
