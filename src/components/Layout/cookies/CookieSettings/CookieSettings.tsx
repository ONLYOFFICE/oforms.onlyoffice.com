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

import { useTranslation } from "next-i18next";
import { Checkbox } from "@src/components/ui/Checkbox/Checkbox";
import { useState } from "react";
import { Heading } from "@src/components/ui/Heading/Heading";
import { Button } from "@src/components/ui/Button/Button";
import { Text } from "@src/components/ui/Text";
import {
  setConsentCookie,
  IConsentData,
} from "@src/components/Layout/cookies/utils/useUtmCookies";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { ICookieSettings } from "./CookieSettings.types";
import styles from "./CookieSettings.module.scss";

const CookieSettings = ({
  setShowSettings,
  consent,
  setShowFab,
  setConsent,
}: ICookieSettings) => {
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

  const handleChange = (key: keyof IConsentData) => {
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
    <div id="cookie-settings" className={styles["cookie-settings"]}>
      <div className={styles["cookie-settings-header"]}>
        <Heading as="div" size={4}>
          {t("CookieSettings")}
        </Heading>
        <button
          id="cookie-settings-close"
          className={styles.cross}
          onClick={() => setShowSettings(false)}
          type="button"
          style={
            {
              "--cross-background-image": `url(${getAssetUrl("/images/cross.svg")})`,
            } as React.CSSProperties
          }
        />
      </div>
      <div className={styles.checkboxes}>
        <Checkbox
          label={
            <div className={styles["check-text"]}>
              <Heading as="div" size={4} className={styles["check-heading"]}>
                {t("Technical")}
              </Heading>
              <Text fontSize="14px">{t("TechnicalDescription")}</Text>
            </div>
          }
          checked={checkedItems.necessary === "granted"}
          disabled={true}
          onChange={() => {}}
        />
        <Checkbox
          label={
            <div className={styles["check-text"]}>
              <Heading as="div" size={4} className={styles["check-heading"]}>
                {t("Analytical")}
              </Heading>
              <Text fontSize="14px">{t("AnalyticalDescription")}</Text>
            </div>
          }
          checked={checkedItems.analytics_storage === "granted"}
          onChange={() => handleChange("analytics_storage")}
        />
        <Checkbox
          label={
            <div className={styles["check-text"]}>
              <Heading as="div" size={4} className={styles["check-heading"]}>
                {t("Marketing")}
              </Heading>
              <Text fontSize="14px">{t("MarketingDescription")}</Text>
            </div>
          }
          checked={checkedItems.ad_storage === "granted"}
          onChange={handleMarketingChange}
        />
      </div>
      <Button id="confirm-cookie" onClick={confirmChanges} variant="primary-2">
        {t("ConfirmMyChoices")}
      </Button>
    </div>
  );
};

export { CookieSettings };
