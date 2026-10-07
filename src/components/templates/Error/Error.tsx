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
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { Button } from "@src/components/ui/Button";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { ErrorSearchInput } from "./sub-components/ErrorSearchInput";
import styles from "./Error.module.scss";

const ErrorTemplate = () => {
  const { t } = useTranslation("error");

  return (
    <Section
      className={styles["error"]}
      desktopSpacing={["160px", "160px"]}
      tabletSpacing={["112px", "112px"]}
      tabletSmallSpacing={["112px", "112px"]}
      mobileSpacing={["48px", "48px"]}
    >
      <Container maxWidth="1452px">
        <div className={styles["error-wrapper"]}>
          <div
            className={styles["error-img-wrapper"]}
            style={
              {
                "--error-img": `url(${getAssetUrl("/images/templates/error/not-found-404.png")})`,
              } as React.CSSProperties
            }
          >
            <div className={styles["error-img"]}></div>
          </div>
          <div>
            <div className={styles["error-label"]}>404</div>
            <Heading
              className={styles["error-heading"]}
              color="var(--error-heading-color)"
            >
              {t("PageNotFound")}
            </Heading>
            <div className={styles["error-text-wrapper"]}>
              <Text size={2} color="var(--error-text-color)">
                {t("ThePageYouAreLookingFor")}
              </Text>
              <Text
                className={styles["error-subtext"]}
                size={3}
                color="var(--error-subtext-color)"
              >
                {t("CheckTheURLOrReturnToASafeLocation")}
              </Text>
            </div>
            <Button
              className={styles["error-btn"]}
              as="a"
              href="/"
              variant="secondary-dark"
            >
              {t("GoToHomepage")}
            </Button>

            <ErrorSearchInput />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export { ErrorTemplate };
