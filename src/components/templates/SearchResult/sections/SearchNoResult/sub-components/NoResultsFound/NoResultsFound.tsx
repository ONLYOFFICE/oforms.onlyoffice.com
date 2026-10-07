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

import { useTranslation } from "next-i18next";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import styles from "./NoResultsFound.module.scss";

const NoResultsFound = () => {
  const { t } = useTranslation("searchresult");

  return (
    <div className={styles["no-results-found"]}>
      <div className={styles["no-results-found-img-wrapper"]}>
        <div
          className={styles["no-results-found-img"]}
          style={
            {
              "--no-results-found-img": `url(${getAssetUrl("/images/templates/searchresult/no-results-found.png")})`,
            } as React.CSSProperties
          }
        ></div>
      </div>
      <div>
        <Heading
          className={styles["no-results-found-heading"]}
          level={2}
          color="var(--search-result-heading-color)"
        >
          {t("NoResultsFound")}
        </Heading>
        <Text
          className={styles["no-results-found-text"]}
          size={2}
          color="var(--search-result-no-results-found-text-color)"
        >
          {t("WeCouldntFindAnythingMatchingYourSearch")}
        </Text>
        <Text
          className={styles["no-results-found-subtext"]}
          size={3}
          color="var(--search-result-no-results-found-subtext-color)"
        >
          {t("TryAdjustingYourKeywords")}
        </Text>
      </div>
    </div>
  );
};

export { NoResultsFound };
