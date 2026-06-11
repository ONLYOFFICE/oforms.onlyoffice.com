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

import { parse as parseCookie, serialize as serializeCookie } from "cookie";
import { useEffect } from "react";

export interface IConsentData {
  necessary: string;
  analytics_storage: string;
  ad_storage: string;
  ad_user_data: string;
  ad_personalization: string;
  security_storage: string;
  functionality_storage: string;
  personalization_storage: string;
}

const CONSENT_COOKIE = "cookie_preferences";

const UTM_KEYS = ["utm_term", "utm_source", "utm_campaign", "utm_content"];

export const DEFAULT_CONSENT = {
  necessary: "granted",
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  security_storage: "granted",
  functionality_storage: "denied",
  personalization_storage: "denied",
};

export const ALL_GRANTED = {
  necessary: "granted",
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  security_storage: "granted",
  functionality_storage: "denied",
  personalization_storage: "denied",
};

const EXPIRES_DAYS = 30;
type TUtmKey = (typeof UTM_KEYS)[number];
type TUtmData = Record<TUtmKey, string>;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = serializeCookie(name, value, {
    expires,
    path: "/",
  });
}

export function setConsentCookie(data: IConsentData) {
  document.cookie =
    CONSENT_COOKIE +
    "=" +
    encodeURIComponent(JSON.stringify(data)) +
    "; path=/; max-age=31536000; SameSite=Lax";

  applyConsent(data);
}

declare global {
  interface Window {
    dataLayer: Array<Array<string | object | number>>;
    gtag: (command: string, action: string, params: IConsentData) => void;
  }
}

export function applyConsent(data: IConsentData) {
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    window.gtag = function (command, action, params) {
      window.dataLayer.push([command, action, params]);
    };
  }

  window.gtag("consent", "update", data);
}

function getCookie(name: string) {
  const cookies = parseCookie(document.cookie);
  return cookies[name];
}

export const useUtmCookies = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmData: Partial<TUtmData> = {};

    UTM_KEYS.forEach((key) => {
      const paramValue = urlParams.get(key);
      const existingCookie = getCookie(key);

      if (paramValue) {
        setCookie(key, paramValue, EXPIRES_DAYS);
        utmData[key] = paramValue;
      } else if (existingCookie) {
        utmData[key] = existingCookie;
      }
    });

    const consentFromCookie = getCookie(CONSENT_COOKIE);
    if (consentFromCookie) {
      try {
        const parsedConsent = JSON.parse(decodeURIComponent(consentFromCookie));
        applyConsent(parsedConsent);
      } catch (e) {
        console.error("Invalid consent cookie", e);
      }
    }
  }, []);
};
