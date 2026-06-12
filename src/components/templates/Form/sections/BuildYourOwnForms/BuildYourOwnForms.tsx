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
import { useRouter } from "next/router";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Button } from "@src/components/ui/Button";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import styles from "./BuildYourOwnForms.module.scss";

const BuildYourOwnForms = () => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const { locale } = router;

  return (
    <Section background="#000122" desktopSpacing={["112px", "112px"]}>
      <Container maxWidth="1452px">
        <div className={styles["build-your-own-forms"]}>
          <div className={styles["build-your-own-forms-body"]}>
            <Heading
              className={styles["build-your-own-forms-heading"]}
              level={2}
              color="#ffffff"
              style={
                {
                  "--build-your-own-forms-heading-icon": `url(${getAssetUrl("/images/templates/form/build-your-own-forms/pdf.svg")})`,
                } as React.CSSProperties
              }
            >
              {t("BuildYourOwnForms")}
            </Heading>
            <p className={styles["build-your-own-forms-text"]}>
              {t("CreateModelDocumentsAgreementsAndContracts")}
            </p>
          </div>
          <Button
            as="a"
            href={`${process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN}${locale === "en" || locale === "ar" ? "" : `/${locale}`}/docspace-registration?utm_source=oforms&utm_medium=top_banner&utm_campaign=registration_docspace&utm_content=use_in_the_cloud`}
            variant="tertiary"
          >
            {t("GetItNow")}
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export { BuildYourOwnForms };
