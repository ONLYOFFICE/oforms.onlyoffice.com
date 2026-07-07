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
import { useState } from "react";
import { Modal } from "@src/components/ui/Modal";
import { Heading } from "@src/components/ui/Heading";
import { Checkbox } from "@src/components/ui/Checkbox";
import { Text } from "@src/components/ui/Text";
import { Button } from "@src/components/ui/Button/Button";
import {
  setConsentCookie,
  IConsentData,
} from "@src/components/Layout/cookies/utils/useUtmCookies";
import { ICookieSettings } from "./CookieSettings.types";
import styles from "./CookieSettings.module.scss";

const CookieSettings = ({
  showSettings,
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
    <Modal
      isOpen={showSettings}
      onClose={() => setShowSettings(false)}
      maxWidth="600px"
      bgColor="transparent"
      lockScroll={false}
    >
      <div id="cookie-settings" className={styles["cookie-settings"]}>
        <Heading as="div" size={5} color="#333333">
          {t("CookieSettings")}
        </Heading>
        <div className={styles["cookie-settings-checkboxes"]}>
          <Checkbox
            className={styles["cookie-settings-checkbox"]}
            label={
              <>
                <Heading
                  className={styles["cookie-settings-checkbox-heading"]}
                  as="div"
                  size={5}
                >
                  {t("Technical")}
                </Heading>
                <Text size={4} color="#494B5B">
                  {t("TechnicalDescription")}
                </Text>
              </>
            }
            checked={checkedItems.necessary === "granted"}
            onChange={() => {}}
            tabIndex={-1}
          />
          <Checkbox
            label={
              <>
                <Heading
                  className={styles["cookie-settings-checkbox-heading"]}
                  as="div"
                  size={5}
                >
                  {t("Analytical")}
                </Heading>
                <Text size={4} color="#494B5B">
                  {t("AnalyticalDescription")}
                </Text>
              </>
            }
            checked={checkedItems.analytics_storage === "granted"}
            onChange={() => handleChange("analytics_storage")}
          />
          <Checkbox
            label={
              <>
                <Heading
                  className={styles["cookie-settings-checkbox-heading"]}
                  as="div"
                  size={5}
                >
                  {t("Marketing")}
                </Heading>
                <Text size={4} color="#494B5B">
                  {t("MarketingDescription")}
                </Text>
              </>
            }
            checked={checkedItems.ad_storage === "granted"}
            onChange={handleMarketingChange}
          />
        </div>
        <div className={styles["cookie-settings-wrapper-button"]}>
          <Button
            id="confirm-cookie"
            onClick={confirmChanges}
            variant="tertiary-dark"
            size={3}
          >
            {t("ConfirmMyChoices")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { CookieSettings };
