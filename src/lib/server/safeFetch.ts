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

import { MAX_UPLOAD_FILE_SIZE } from "@src/utils/formSubmit";

export const MAX_REMOTE_FILE_SIZE = MAX_UPLOAD_FILE_SIZE;
const REMOTE_FETCH_TIMEOUT = 2 * 60 * 1000;

const hostOf = (value: string | undefined): string | null => {
  if (!value) return null;

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.hostname.toLowerCase();
  } catch {
    return null;
  }
};

export class RemoteHostsNotConfiguredError extends Error {
  constructor() {
    super(
      "Remote fetch allow-list is empty: set EDITOR_API_URL and BUCKET so template downloads can be validated",
    );
  }
}

const getAllowedHosts = (): string[] => {
  const hosts = [
    hostOf(process.env.EDITOR_API_URL),
    hostOf(process.env.BUCKET),
  ].filter((host): host is string => host !== null);

  if (hosts.length === 0) {
    throw new RemoteHostsNotConfiguredError();
  }

  return hosts;
};

export const isAllowedRemoteUrl = (value: string): boolean => {
  const allowedHosts = getAllowedHosts();

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;

  return allowedHosts.includes(url.hostname.toLowerCase());
};

export const remoteUrlFileName = (value: string): string | null => {
  try {
    return decodeURIComponent(new URL(value).pathname.split("/").pop() ?? "");
  } catch {
    return null;
  }
};

export class RemoteFetchError extends Error {}

export const fetchAllowedUrl = async (
  value: string,
  {
    maxBytes = MAX_REMOTE_FILE_SIZE,
    timeoutMs = REMOTE_FETCH_TIMEOUT,
  }: { maxBytes?: number; timeoutMs?: number } = {},
): Promise<Buffer<ArrayBuffer>> => {
  if (!isAllowedRemoteUrl(value)) {
    throw new RemoteFetchError("Remote URL is not allowed");
  }

  const response = await fetch(value, {
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (response.status >= 300 && response.status < 400) {
    throw new RemoteFetchError("Remote URL responded with a redirect");
  }

  if (!response.ok) {
    throw new RemoteFetchError(`Remote request failed: ${response.status}`);
  }

  const declaredSize = Number(response.headers.get("content-length"));

  if (Number.isFinite(declaredSize) && declaredSize > maxBytes) {
    throw new RemoteFetchError("Remote file is too large");
  }

  if (!response.body) {
    throw new RemoteFetchError("Remote response has no body");
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  try {
    for (;;) {
      const { done, value: chunk } = await reader.read();
      if (done) break;

      received += chunk.byteLength;

      if (received > maxBytes) {
        throw new RemoteFetchError("Remote file is too large");
      }

      chunks.push(chunk);
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }

  const body = new Uint8Array(received);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return Buffer.from(body);
};
