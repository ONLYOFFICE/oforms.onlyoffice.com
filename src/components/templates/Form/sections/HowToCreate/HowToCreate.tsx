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

import { Trans, useTranslation } from "next-i18next";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Button } from "@src/components/ui/Button";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IHowToCreate } from "./HowToCreate.types";
import styles from "./HowToCreate.module.scss";

const HowToCreate = ({ name_form, linkEditor }: IHowToCreate) => {
  const { t } = useTranslation("form");

  return (
    <Section
      desktopSpacing={["0", "0"]}
      tabletSpacing={["0", "0"]}
      tabletSmallSpacing={["0", "0"]}
      mobileSpacing={["0", "34px"]}
    >
      <Container maxWidth="1452px">
        <div className={styles["how-to-create"]}>
          <Heading
            className={styles["how-to-create-heading"]}
            level={2}
            size={3}
            style={
              {
                "--how-to-create-heading-icon": `url(${getAssetUrl(
                  `/images/templates/form/how-to-create/pencil.svg`,
                )})`,
              } as React.CSSProperties
            }
          >
            <Trans
              t={t}
              i18nKey="HowToCreateHeading"
              values={{ name_form }}
              components={[<span key={0} />]}
            />
          </Heading>

          <ol className={styles["how-to-create-list"]}>
            <li>{t("ClickFillOutToLaunchTheFormEditorOnline")}</li>
            <li>{t("FillInTheNecessaryInformationInTheEmptyFields")}</li>
            <li>{t("DownloadTheReadyDocumentFromTheEditor")}</li>
          </ol>

          <Button
            className={styles["how-to-create-button"]}
            as="a"
            href={linkEditor}
            variant="secondary-dark"
          >
            {t("FillOut")}
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export { HowToCreate };
