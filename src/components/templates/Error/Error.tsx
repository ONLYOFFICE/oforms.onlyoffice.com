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
