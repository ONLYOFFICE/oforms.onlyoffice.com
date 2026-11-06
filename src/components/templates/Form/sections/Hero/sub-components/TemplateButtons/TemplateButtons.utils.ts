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
