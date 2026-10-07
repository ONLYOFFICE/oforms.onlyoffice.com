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
