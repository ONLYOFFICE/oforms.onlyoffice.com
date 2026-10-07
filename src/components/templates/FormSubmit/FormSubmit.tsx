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

import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { Breadcrumbs } from "@src/components/widgets/Breadcrumbs";
import { File } from "./sub-components/File";
import { Info } from "./sub-components/Info";
import { SubmittedSuccessfully } from "./sub-components/SubmittedSuccessfully";
import { IFormSubmitTemplate } from "./FormSubmit.types";
import styles from "./FormSubmit.module.scss";

const FormSubmitTemplate = ({
  countries,
  purposeWithCategories,
  queryIndexData,
}: IFormSubmitTemplate) => {
  const { t } = useTranslation("form-submit");
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Section
      desktopSpacing={["64px", "140px"]}
      tabletSpacing={["48px", "88px"]}
      tabletSmallSpacing={["48px", "88px"]}
      mobileSpacing={["28px", "48px"]}
    >
      <Container maxWidth="1452px">
        <Breadcrumbs
          className={clsx(styles["form-submit-breadcrumbs"], {
            [styles["form-submit-breadcrumbs-submitted"]]: submitted,
          })}
          items={[
            { label: t("MainTemplates"), href: "/" },
            { label: t("UploadTemplate") },
          ]}
        />

        {submitted ? (
          <SubmittedSuccessfully setSubmitted={setSubmitted} file={file} />
        ) : (
          <>
            <Heading
              className={styles["form-submit-heading"]}
              level={1}
              size={2}
              color="var(--form-submit-heading-color)"
            >
              {t("UploadTemplate")}
            </Heading>
            <Text
              className={styles["form-submit-text"]}
              size={2}
              color="var(--form-submit-text-color)"
            >
              {t("AddANewTemplateToTheDocumentLibrary")}
            </Text>
            <div className={styles["form-submit-wrapper"]}>
              <File
                file={file}
                setFile={setFile}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
                queryIndexData={queryIndexData}
              />
              <Info
                countries={countries}
                purposeWithCategories={purposeWithCategories}
                onSuccess={() => setSubmitted(true)}
                file={file}
                isUploading={isUploading}
                queryIndexData={queryIndexData}
              />
            </div>
          </>
        )}
      </Container>
    </Section>
  );
};

export { FormSubmitTemplate };
