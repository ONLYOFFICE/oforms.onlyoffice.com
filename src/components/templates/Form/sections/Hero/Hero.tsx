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
import { Text } from "@src/components/ui/Text";
import { Link } from "@src/components/ui/Link";
import { DownloadAs } from "./sub-components/DownloadAs";
import { Share } from "./sub-components/Share";
import { Slider } from "./sub-components/Slider";
import { TemplateButtons } from "./sub-components/TemplateButtons";
import { IHero } from "./Hero.types";
import styles from "./Hero.module.scss";

const Hero = ({
  name_form,
  template_desc,
  file_pages,
  file_oform,
  page_screens,
  linkEditor,
  suggestChangesLink,
}: IHero) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("form");
  const { name, size, updatedAt, url } = file_oform?.[0] ?? {};
  const pdfFile = file_oform?.filter(
    (it) => it?.name.split(".").pop() === "pdf",
  );

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
            <Heading className={styles["hero-heading"]} level={1} size={2}>
              {name_form}
            </Heading>
            <div className={styles["hero-labels"]}>
              {pdfFile?.[0]?.url && (
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
            <div className={styles["hero-description"]}>
              {template_desc?.split("\n").map((text, id) => (
                <Text as="p" size={2} key={id}>
                  {text}
                </Text>
              ))}
            </div>

            <div className={styles["hero-info"]}>
              <div className={styles["hero-info-row"]}>
                <div className={styles["hero-info-item"]}>
                  <Text
                    as="span"
                    size={5}
                    className={styles["hero-info-label"]}
                  >
                    {t("LastUpdated")}
                  </Text>
                  <Text
                    as="span"
                    size={5}
                    className={styles["hero-info-value"]}
                  >
                    {dayjs(updatedAt)
                      .locale(language)
                      .format(
                        {
                          ja: "YYYY年MM月DD日",
                          zh: "YYYY年MM月DD日",
                        }[language] ?? "D MMMM YYYY",
                      )}
                  </Text>
                </div>

                <Link
                  size={5}
                  href={suggestChangesLink}
                  color="var(--form-hero-link-color)"
                  hover="underline"
                >
                  {t("SuggestChanges")}
                </Link>
              </div>
              <div className={clsx(styles["hero-info-row"])}>
                {size != null && (
                  <div
                    className={clsx(
                      styles["hero-info-item"],
                      styles["hero-info-item-size"],
                    )}
                  >
                    <Text
                      as="span"
                      size={5}
                      className={styles["hero-info-label"]}
                    >
                      {t("FileSize")}
                    </Text>
                    <Text
                      as="span"
                      size={5}
                      className={styles["hero-info-value"]}
                      dir="ltr"
                    >
                      {size < 1024
                        ? `${size.toFixed(0)} kb`
                        : `${(size / 1024).toFixed(0)} mb`}
                    </Text>
                  </div>
                )}
                {file_pages && (
                  <div className={styles["hero-info-item"]}>
                    <Text
                      as="span"
                      size={5}
                      className={styles["hero-info-label"]}
                    >
                      {t("Pages")}
                    </Text>
                    <Text
                      as="span"
                      size={5}
                      className={styles["hero-info-value"]}
                    >
                      {file_pages}
                    </Text>
                  </div>
                )}
              </div>
            </div>

            {file_oform?.length > 0 && (
              <DownloadAs
                className={styles["hero-download-as"]}
                file_oform={file_oform}
              />
            )}

            <TemplateButtons
              className={styles["hero-buttons"]}
              buttonClassName={styles["hero-button"]}
              name={name}
              url={url}
              linkEditor={linkEditor}
              hasPdfForm={!!pdfFile?.[0]?.hash}
            />

            <Share />
          </div>

          <Slider page_screens={page_screens} name_form={name_form} />
        </div>
      </Container>
    </Section>
  );
};

export { Hero };
