import { Trans, useTranslation } from "next-i18next";
import {
  StyledCookieFab,
  StyledCookieBannerHeading,
  StyledCookieBanner,
  ButtonsArea,
  StyledCookieBannerHeader,
  StyledCross,
} from "./styled-cookie-banner";
import Text from "@components/common/text";
import Button from "@components/common/button";
import Link from "@components/common/external-link";
import { useState, useEffect, useRef } from "react";
import CookieSettings from "../settings";
import {
  setConsentCookie,
  DEFAULT_CONSENT,
  ALL_GRANTED,
} from "@lib/cookies/use-utm-cookies";
import { useUtmCookies } from "@lib/cookies/use-utm-cookies";

function getConsentCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/cookie_preferences=([^;]*)/);
  return match ? JSON.parse(decodeURIComponent(match[1])) : null;
}

const CookieBanner = () => {
  const { t } = useTranslation("common");
  const fabRef = useRef(null);
  const bannerRef = useRef(null);
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullGDPR, setIsFullGDPR] = useState(true);
  const scrolledRef = useRef(false);
  const [IPGeolocationInfo, setIPGeolocationInfo] = useState();
  const IPGeolocationCountry = IPGeolocationInfo?.country;
  useUtmCookies();

useEffect(() => {
  (async () => {
    const cachedData = sessionStorage.getItem("IPGeolocationInfo");
    if (cachedData) {
      setIPGeolocationInfo(JSON.parse(cachedData));
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN}/api/ip-geolocation`);
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
          setConsentCookie(ALL_GRANTED);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    setShowBanner(false);
    setShowFab(true);
  };

  return (
    <>
      {showFab && (
        <StyledCookieFab
          ref={fabRef}
          id="cookieBanner"
          onClick={handleBanner}
        />
      )}
      {showBanner && (
        <StyledCookieBanner ref={bannerRef}>
          <StyledCookieBannerHeader>
            <StyledCookieBannerHeading
              label={t("HarmonyInYourCookies")}
              level={4}
            />
            {!isFullGDPR && (
              <StyledCross id="cookie-banner-close" onClick={handleCross} />
            )}
          </StyledCookieBannerHeader>
          <Text fontSize="14px">
            <Trans
              t={t}
              i18nKey="CookieText"
              components={[
                <Link
                  color="#ff6f3d"
                  textDecoration="underline"
                  key={0}
                  href="https://help.onlyoffice.co/products/files/doceditor.aspx?fileid=5048502&doc=SXhWMEVzSEYxNlVVaXJJeUVtS0kyYk14YWdXTEFUQmRWL250NllHNUFGbz0_IjUwNDg1MDIi0&_ga=2.239950403.1196593722.1525950411-169631771.1404734630"
                />,
              ]}
            />
          </Text>
          <ButtonsArea>
            <Button
              id="decline-all"
              label={t("Deny")}
              onClick={handleDeclineAll}
            />
            <Button
              id="settings"
              label={t("Customize")}
              onClick={handleSettings}
            />
            <Button
              id="accept-all"
              label={t("AcceptAll")}
              onClick={handleAcceptAll}
            />
          </ButtonsArea>
        </StyledCookieBanner>
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

export default CookieBanner;
