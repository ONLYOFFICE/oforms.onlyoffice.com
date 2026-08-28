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

export const SUPPORTED = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "it",
  "ja",
  "pt",
  "zh",
] as const;

export type Locale = (typeof SUPPORTED)[number];

export const FALLBACK: Locale = "en";

export const LANGUAGES: { shortKey: Locale; longKey: string }[] = [
  { shortKey: "en", longKey: "English" },
  { shortKey: "fr", longKey: "Français" },
  { shortKey: "de", longKey: "Deutsch" },
  { shortKey: "es", longKey: "Español" },
  { shortKey: "pt", longKey: "Português" },
  { shortKey: "it", longKey: "Italiano" },
  { shortKey: "ja", longKey: "日本語" },
  { shortKey: "zh", longKey: "中文" },
  { shortKey: "ar", longKey: "عربي" },
];

const RTL_LOCALES: readonly string[] = ["ar"];

export const isRtlLocale = (locale: string): boolean =>
  RTL_LOCALES.includes(locale);

/** "ru-RU" -> "ru", "pt-BR" -> "pt", "EN" -> "en". */
const baseOf = (culture: string): string =>
  String(culture || "")
    .trim()
    .toLowerCase()
    .split(/[-_]/)[0];

export function normalizeLocale(culture: string | null | undefined): Locale {
  const base = baseOf(culture ?? "");
  return (SUPPORTED as readonly string[]).includes(base)
    ? (base as Locale)
    : FALLBACK;
}
