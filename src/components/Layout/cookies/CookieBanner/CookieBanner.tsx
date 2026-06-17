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

import { Trans, useTranslation } from "next-i18next";
import { Button } from "@src/components/ui/Button";
import { Link } from "@src/components/ui/Link";
import { Heading } from "@src/components/ui/Heading";
import { useState, useEffect, useRef } from "react";
import { CookieSettings } from "../CookieSettings";
import {
  setConsentCookie,
  DEFAULT_CONSENT,
  ALL_GRANTED,
  useUtmCookies,
  IConsentData,
} from "@src/components/Layout/cookies/utils/useUtmCookies";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import styles from "./CookieBanner.module.scss";

function getConsentCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/cookie_preferences=([^;]*)/);
  return match ? JSON.parse(decodeURIComponent(match[1])) : null;
}

const CookieBanner = () => {
  const { t } = useTranslation("common");
  const fabRef = useRef(null);
  const bannerRef = useRef(null);
  const [consent, setConsent] = useState<IConsentData | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullGDPR, setIsFullGDPR] = useState(true);
  const scrolledRef = useRef(false);
  const [IPGeolocationInfo, setIPGeolocationInfo] = useState<{
    country?: string;
  } | null>(null);
  const IPGeolocationCountry = IPGeolocationInfo?.country;
  useUtmCookies();

  useEffect(() => {
    (async () => {
      const cachedData = sessionStorage.getItem("IPGeolocationInfo");
      if (cachedData) {
        setIPGeolocationInfo(JSON.parse(cachedData));
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN}/api/ip-geolocation`,
      );
      const data = await res.json();

      if (!res.ok || !data) return;

      setIPGeolocationInfo(data);
      sessionStorage.setItem("IPGeolocationInfo", JSON.stringify(data));
    })();
  }, []);

  useEffect(() => {
    let gdpr = true;

    if (!IPGeolocationCountry) {
      const lang = navigator.language.slice(0, 2).toLowerCase();
      // prettier-ignore
      const GDPR_LANGS = [
        "de", "fr", "it", "es", "nl", "pl", "fi", "sv", "da", "hu", "el", "cs", "pt", "ro", "sk",
        "sl", "hr", "et", "lv", "lt", "mt", "ga", "is", "no", "nb", "nn", "lb", "bg", "tr",
        "ca", "eu", "gl", "rm", "en"
      ];

      if (!GDPR_LANGS.includes(lang)) {
        gdpr = false;
      }
    } else {
      // prettier-ignore
      const ALL_COUNTRIES = [
        "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
        "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
        "NO", "IS", "LI", "CH", "GB",
        "CN", "SG", "ZA", "NG", "KE"
      ];
      if (!ALL_COUNTRIES.includes(IPGeolocationCountry)) {
        gdpr = false;
      }
    }

    setIsFullGDPR(gdpr);
  }, [IPGeolocationCountry]);

  useEffect(() => {
    const consentFromCookie = getConsentCookie();

    if (consentFromCookie) {
      setConsent(consentFromCookie);
      setShowBanner(false);
      setShowFab(true);
    } else {
      if (!isFullGDPR) {
        const sameOrigin =
          document.referrer &&
          location.hostname === new URL(document.referrer).hostname;

        if (sameOrigin) {
          setConsent(ALL_GRANTED);
          setConsentCookie(ALL_GRANTED);
          setShowBanner(false);
          setShowFab(true);
        } else {
          setShowFab(false);
          setShowBanner(true);
        }
      } else {
        setShowFab(false);
        setShowBanner(true);
      }
    }

    const handleScroll = () => {
      if (!isFullGDPR && !scrolledRef.current && !getConsentCookie()) {
        const top = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;

        const scrollPercent = (top + winHeight) / docHeight;

        if (scrollPercent >= 0.2) {
          scrolledRef.current = true;
          setConsent(ALL_GRANTED);
          setConsentCookie(ALL_GRANTED);
        }
      }
    };

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (!isFullGDPR && !getConsentCookie()) {
      timeoutId = setTimeout(() => {
        if (!getConsentCookie()) {
          setConsent(ALL_GRANTED);
          setConsentCookie(ALL_GRANTED);
        }
      }, 15000);
    }

    if (isFullGDPR === false && !getConsentCookie()) {
      setConsentCookie(ALL_GRANTED);
      setConsent(ALL_GRANTED);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isFullGDPR]);

  const handleAcceptAll = () => {
    setConsentCookie(ALL_GRANTED);
    setConsent(ALL_GRANTED);
    setShowBanner(false);
    setShowFab(true);
  };

  const handleDeclineAll = () => {
    setConsentCookie(DEFAULT_CONSENT);
    setConsent(DEFAULT_CONSENT);
    setShowBanner(false);
    setShowFab(true);
  };

  const handleSettings = () => {
    if (showSettings) {
      setShowSettings(false);
      setShowFab(true);
    } else {
      setShowBanner(false);
      setShowFab(false);
      setShowSettings(true);
    }
  };

  const handleBanner = () => {
    setShowBanner(true);
    setShowFab(false);
    setShowSettings(false);
  };

  const handleCross = () => {
    setConsentCookie(ALL_GRANTED);
    setConsent(ALL_GRANTED);
    setShowBanner(false);
    setShowFab(true);
  };

  return (
    <>
      {showFab && (
        <button
          ref={fabRef}
          id="cookieBanner"
          className={styles["cookie-fab"]}
          onClick={handleBanner}
          type="button"
          style={
            {
              "--cookie-fab-background-image": `url(${getAssetUrl("/images/cookie.svg")})`,
            } as React.CSSProperties
          }
        />
      )}
      {showBanner && (
        <div ref={bannerRef} className={styles["cookie-banner"]}>
          <div className={styles["cookie-banner-header"]}>
            <Heading
              as="div"
              size={4}
              className={styles["cookie-banner-heading"]}
              style={
                {
                  "--cookie-banner-heading-background-image": `url(${getAssetUrl("/images/cookie.svg")})`,
                } as React.CSSProperties
              }
            >
              {t("HarmonyInYourCookies")}
            </Heading>
            {!isFullGDPR && (
              <button
                id="cookie-banner-close"
                className={styles.cross}
                onClick={handleCross}
                type="button"
                style={
                  {
                    "--cross-background-image": `url(${getAssetUrl("/images/cross.svg")})`,
                  } as React.CSSProperties
                }
              />
            )}
          </div>
          <p className={styles["cookie-banner-text"]}>
            <Trans
              t={t}
              i18nKey="CookieText"
              components={[
                <Link
                  color="#ff6f3d"
                  textUnderline
                  key={0}
                  href="https://help.onlyoffice.co/products/files/doceditor.aspx?fileid=5048502&doc=SXhWMEVzSEYxNlVVaXJJeUVtS0kyYk14YWdXTEFUQmRWL250NllHNUFGbz0_IjUwNDg1MDIi0&_ga=2.239950403.1196593722.1525950411-169631771.1404734630"
                  target="_blank"
                />,
              ]}
            />
          </p>
          <div className={styles["buttons-area"]}>
            <Button
              id="decline-all"
              onClick={handleDeclineAll}
              variant="primary-2"
            >
              {t("Deny")}
            </Button>
            <Button id="settings" onClick={handleSettings} variant="primary-2">
              {t("Customize")}
            </Button>
            <Button
              id="accept-all"
              onClick={handleAcceptAll}
              variant="primary-2"
            >
              {t("AcceptAll")}
            </Button>
          </div>
        </div>
      )}
      {showSettings && (
        <CookieSettings
          setShowSettings={handleSettings}
          consent={consent ? consent : DEFAULT_CONSENT}
          setShowFab={setShowFab}
          setConsent={setConsent}
        />
      )}
    </>
  );
};

export { CookieBanner };
