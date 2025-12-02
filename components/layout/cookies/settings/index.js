import { useTranslation } from "next-i18next";

import {
  StyledCookieSettings,
  StyledCookieSettingsHeader,
  StyledCross,
  StyledCheckboxes,
  StyledCheckText,
} from "./styled-cookie-settings";
import Checkbox from "@components/common/checkbox";
import { useState } from "react";
import Heading from "@components/common/heading";
import Button from "@components/common/button";
import Text from "@components/common/text";
import { setConsentCookie } from "@lib/cookies/use-utm-cookies";

const CookieSettings = ({
  setShowSettings,
  consent,
  setShowFab,
  setConsent,
}) => {
  const { t } = useTranslation("common");
  const [checkedItems, setCheckedItems] = useState(consent);

  const handleMarketingChange = () => {
    const newValue =
      checkedItems.ad_storage === "granted" ? "denied" : "granted";

    setCheckedItems((prev) => ({
      ...prev,
      ad_storage: newValue,
      ad_user_data: newValue,
      ad_personalization: newValue,
    }));
  };

  const handleChange = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: prev[key] === "granted" ? "denied" : "granted",
    }));
  };

  const confirmChanges = () => {
    setConsentCookie(checkedItems);
    setConsent(checkedItems);
    setShowSettings(false);
    setShowFab(true);
  };

  return (
    <StyledCookieSettings id="cookie-settings">
      <StyledCookieSettingsHeader>
        <Heading label={t("CookieSettings")} level={4} />
        <StyledCross
          id="cookie-settings-close"
          onClick={() => setShowSettings(false)}
        />
      </StyledCookieSettingsHeader>
      <StyledCheckboxes>
        <Checkbox
          label={
            <StyledCheckText>
              <Heading level={4}>{t("Technical")}</Heading>
              <Text fontSize="14px">{t("TechnicalDescription")}</Text>
            </StyledCheckText>
          }
          checked={checkedItems.necessary === "granted"}
          disabled={true}
          onChange={() => {}}
        />
        <Checkbox
          label={
            <StyledCheckText>
              <Heading level={4}>{t("Analytical")}</Heading>
              <Text fontSize="14px">{t("AnalyticalDescription")}</Text>
            </StyledCheckText>
          }
          checked={checkedItems.analytics_storage === "granted"}
          onChange={() => handleChange("analytics_storage")}
        />
        <Checkbox
          label={
            <StyledCheckText>
              <Heading level={4}>{t("Marketing")}</Heading>
              <Text fontSize="14px">{t("MarketingDescription")}</Text>
            </StyledCheckText>
          }
          checked={checkedItems.ad_storage === "granted"}
          onChange={handleMarketingChange}
        />
      </StyledCheckboxes>
      <Button
        id="confirm-cookie"
        label={t("ConfirmMyChoices")}
        onClick={confirmChanges}
      />
    </StyledCookieSettings>
  );
};

export default CookieSettings;