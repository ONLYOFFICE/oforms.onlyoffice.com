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

type TCallback = () => void;

interface IBrowserInfo {
  isOpera?: boolean;
  isFirefox?: boolean;
  isChrome?: boolean;
  isSafari?: boolean;
  isIOS?: boolean;
}

declare global {
  interface Window {
    MSStream?: unknown;
  }
  interface Navigator {
    msLaunchUri?: (uri: string) => void;
  }
}

function checkBrowser(): IBrowserInfo {
  if (typeof window === "undefined") {
    return {};
  }

  const userAgent = navigator.userAgent;

  return {
    isOpera: /OPR|Opera/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isIOS: /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream,
  };
}

function openUriWithTimeoutHack(
  uri: string,
  failCb: TCallback,
  successCb: TCallback,
): void {
  const timeout = setTimeout(() => {
    failCb();
    handler.remove();
  }, 1000);

  const handler = registerEvent(window, "blur", () => {
    clearTimeout(timeout);
    handler.remove();
    successCb();
  });

  window.location.href = encodeURI(uri);
}

function openUriWithHiddenFrame(
  uri: string,
  failCb: TCallback,
  successCb: TCallback,
): void {
  let handler: { remove: TCallback };

  const timeout = setTimeout(() => {
    failCb();
    handler.remove();
  }, 1000);

  handler = registerEvent(window, "blur", () => {
    clearTimeout(timeout);
    handler.remove();
    successCb();
  });

  const iframe = createHiddenIframe(document.body);
  iframe.src = encodeURI(uri);
}

function registerEvent(
  target: EventTarget,
  eventType: string,
  cb: EventListener,
): { remove: TCallback } {
  target.addEventListener(eventType, cb);
  return {
    remove: () => target.removeEventListener(eventType, cb),
  };
}

function createHiddenIframe(target: HTMLElement): HTMLIFrameElement {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  target.appendChild(iframe);
  return iframe;
}

function protocolCheck(
  uri: string,
  failCb?: TCallback,
  successCb?: TCallback,
  unsupportedCb?: TCallback,
): void {
  const failCallback = () => failCb && failCb();
  const successCallback = () => successCb && successCb();

  if (typeof window !== "undefined" && window.navigator.msLaunchUri) {
    openUriWithTimeoutHack(uri, failCallback, successCallback);
  } else {
    const browser = checkBrowser();
    if (browser.isFirefox || browser.isChrome || browser.isOpera) {
      openUriWithTimeoutHack(uri, failCallback, successCallback);
    } else if (browser.isSafari) {
      openUriWithHiddenFrame(uri, failCallback, successCallback);
    } else {
      unsupportedCb && unsupportedCb();
    }
  }
}

export function scriptProtocolCheck(
  uri: string,
  failCb?: TCallback,
  successCb?: TCallback,
  unsupportedCb?: TCallback,
): void {
  protocolCheck(
    uri,
    function () {
      failCb && failCb();
    },
    function () {
      successCb && successCb();
    },
    function () {
      unsupportedCb && unsupportedCb();
    },
  );
}
