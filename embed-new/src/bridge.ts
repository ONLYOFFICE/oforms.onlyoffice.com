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
 * postMessage bridge to whatever is embedding this page.
 *
 * Opening a template means something different in every host — an editor tab in
 * Desktop, a file in a room in DocSpace — so the page states the intent and the
 * host decides, rather than this file becoming a registry of hosts.
 */
import { openTemplateNatively } from "./desktopVars";
import type { ITemplate } from "./types";

const ALLOWED_ORIGINS = (process.env.EMBED_HOST_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export interface IHostMessage {
  type: "theme" | "locale";
  value?: string;
}

export const isEmbedded = (): boolean => window.parent !== window;

/**
 * Messages go out with targetOrigin "*" because a file:// host has origin
 * "null", which cannot be named as a target. Nothing sent here is sensitive —
 * it is catalog data the page already fetched from a public URL.
 */
function send(message: unknown): void {
  if (!isEmbedded()) return;
  window.parent.postMessage(message, "*");
}

export const notifyReady = (): void => send({ type: "ready" });

// Templates carry a single file, so there is no format to choose between.
// The name becomes the editor's tab title; without it the header shows the
// url's filename, which is a hash.
export function requestOpenTemplate(template: ITemplate): void {
  const file = template.file_oform?.[0];
  if (!file?.url || !file.ext) return;

  const name = template.name_form.trim() + file.ext;

  // Desktop opens natively; every other host does it its own way.
  if (!openTemplateNatively(file.url, name)) {
    send({ type: "openTemplate", url: file.url, name });
  }
}

/** Inbound messages are origin-checked; unknown senders are ignored. */
export function onHostMessage(
  handler: (message: IHostMessage) => void,
): () => void {
  const listener = (event: MessageEvent) => {
    if (ALLOWED_ORIGINS.length && !ALLOWED_ORIGINS.includes(event.origin)) {
      return;
    }
    const data = event.data as IHostMessage | null;
    if (!data || typeof data !== "object" || typeof data.type !== "string") {
      return;
    }
    if (data.type === "theme" || data.type === "locale") {
      handler(data);
    }
  };

  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}
