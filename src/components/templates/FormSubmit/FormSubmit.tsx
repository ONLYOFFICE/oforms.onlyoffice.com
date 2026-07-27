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
