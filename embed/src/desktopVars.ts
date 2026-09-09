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

/**
 * The only file that knows ONLYOFFICE Desktop exists, except index.html, which
 * reads `RendererProcessVariable.theme` before this bundle is parsed.
 *
 * CEF injects `AscDesktopEditor` into every V8 context, so this is the frame's
 * own global — reading the parent's would be a cross-origin access and throw.
 */

declare global {
  interface Window {
    AscDesktopEditor?: { openTemplate?: (url: string, name: string) => void };
    RendererProcessVariable?: { lang?: string };
  }
}

/** The translation file's name, so `de` or `pt_BR`. Null outside Desktop. */
export const readDesktopLang = (): string | null =>
  window.RendererProcessVariable?.lang ?? null;

/** False when the bridge is absent — every host but Desktop. */
export function openTemplateNatively(url: string, name: string): boolean {
  const editor = window.AscDesktopEditor;
  if (typeof editor?.openTemplate !== "function") return false;
  editor.openTemplate(url, name);
  return true;
}
