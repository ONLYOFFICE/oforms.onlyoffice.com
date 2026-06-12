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

import { useState } from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/pt";
import "dayjs/locale/it";
import "dayjs/locale/ja";
import "dayjs/locale/zh";
import "dayjs/locale/ar";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Link } from "@src/components/ui/Link";
import { Button } from "@src/components/ui/Button";
import { Modal } from "@src/components/ui/Modal";
import { DownloadAs } from "./sub-components/DownloadAs";
import { Share } from "./sub-components/Share";
import { DownloadModal } from "./sub-components/DownloadModal";
import { scriptProtocolCheck } from "@src/components/templates/Form/Form.utils";
import { IHero } from "./Hero.types";
import styles from "./Hero.module.scss";

const Hero = ({
  name_form,
  template_desc,
  file_pages,
  file_oform,
  template_image,
  linkPdfEditor,
}: IHero) => {
  const { t } = useTranslation("form");
  const [isOpen, setIsOpen] = useState(false);
  const { name, size, updatedAt, url } = file_oform.data[0].attributes;
  const pdfFile = file_oform?.data?.filter(
    (it) => it?.attributes.name.split(".").pop() === "pdf",
  );

  const handleButtonClick = () => {
    scriptProtocolCheck(
      `oo-office://open|f|n|${name}|${url}`,
      () => setIsOpen(true),
      () => setIsOpen(false),
      () => setIsOpen(true),
    );
  };

  return (
    <Section
      desktopSpacing={["0", "0"]}
      tabletSpacing={["0", "0"]}
      tabletSmallSpacing={["0", "0"]}
      mobileSpacing={["0", "0"]}
    >
      <Container maxWidth="1452px">
        <div className={styles["hero-wrapper"]}>
          <div className={styles["hero-container"]}>
            <Heading className={styles["hero-heading"]} level={1}>
              {name_form}
            </Heading>
            <div className={styles["hero-labels"]}>
              {pdfFile[0]?.attributes.url && (
                <span className={styles["hero-label"]}>
                  {t("FillableForm")}
                </span>
              )}
              <span
                className={clsx(
                  styles["hero-label"],
                  styles["hero-label-applications"],
                )}
              >
                {t("EditableTemplate")}
              </span>
            </div>
            {template_desc?.split("\n").map((text, id) => (
              <p className={styles["hero-description"]} key={id}>
                {text}
              </p>
            ))}

            <div className={styles["hero-info"]}>
              <div className={styles["hero-info-row"]}>
                <div className={styles["hero-info-item"]}>
                  <span className={styles["hero-info-label"]}>
                    {t("LastUpdated")}
                  </span>
                  <span className={styles["hero-info-value"]}>
                    {dayjs(updatedAt).format("D MMMM YYYY")}
                  </span>
                </div>

                <Link
                  href={`mailto:marketing@onlyoffice.com?subject=${t("SuggestingChangesLink", { name: name_form })}&body=${t("SuggestingChangesLink", { name: name_form })}.`}
                  color="#3541F5"
                  hover="underline"
                >
                  {t("SuggestChanges")}
                </Link>
              </div>
              <div className={clsx(styles["hero-info-row"])}>
                <div
                  className={clsx(
                    styles["hero-info-item"],
                    styles["hero-info-item-size"],
                  )}
                >
                  <span className={styles["hero-info-label"]}>
                    {t("FileSize")}
                  </span>
                  <span className={styles["hero-info-value"]}>
                    {size < 1024
                      ? `${size.toFixed(0)} kb`
                      : `${(size / 1024).toFixed(0)} mb`}
                  </span>
                </div>

                {file_pages && (
                  <div className={styles["hero-info-item"]}>
                    <span className={styles["hero-info-label"]}>
                      {t("Pages")}
                    </span>
                    <span className={styles["hero-info-value"]}>
                      {file_pages}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <DownloadAs
              className={styles["hero-download-as"]}
              file_oform={file_oform}
            />

            <div className={styles["hero-buttons"]}>
              {pdfFile[0]?.attributes.hash && (
                <Button
                  className={styles["hero-button"]}
                  as="a"
                  target="_blank"
                  href={linkPdfEditor}
                >
                  {t("FillOutPDFForm")}
                </Button>
              )}

              <Button onClick={handleButtonClick} variant="secondary">
                {t("EditTemplate")}
              </Button>
            </div>

            <Share />
          </div>

          <div className={styles["hero-image-wrapper"]}>
            <img
              className={styles["hero-image"]}
              src={template_image.data.attributes.url}
              alt={name_form}
            />
          </div>
        </div>
      </Container>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="736px"
        withCloseBtn
      >
        <DownloadModal />
      </Modal>
    </Section>
  );
};

export { Hero };
