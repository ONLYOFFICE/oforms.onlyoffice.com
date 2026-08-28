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

export type Theme = Record<string, string | null>;

/**
 * Applies design tokens as inline custom properties on `root`.
 *
 * Every colour in this app resolves through `var(--token, fallback)`, which is
 * what lets the desktop host restyle the page at runtime — a literal value
 * could never be reached from outside.
 */
export function applyTheme(theme: Theme, root: HTMLElement): void {
  for (const [name, value] of Object.entries(theme)) {
    const prop = name.startsWith("--") ? name : `--${name}`;
    if (value == null) root.style.removeProperty(prop);
    else root.style.setProperty(prop, value);
  }
}

/**
 * Parses the `theme` query param. Accepts either JSON or a compact
 * `name:value;name:value` list, so a desktop can pass tokens without needing
 * to URL-encode a whole JSON document.
 */
export function parseThemeParam(raw: string | null): Theme | null {
  if (!raw) return null;

  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      return parsed && typeof parsed === "object" ? (parsed as Theme) : null;
    } catch {
      return null;
    }
  }

  const theme: Theme = {};
  for (const pair of trimmed.split(";")) {
    const index = pair.indexOf(":");
    if (index < 1) continue;
    const name = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    if (name && value) theme[name] = value;
  }
  return Object.keys(theme).length ? theme : null;
}
