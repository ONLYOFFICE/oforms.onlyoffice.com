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
import { useTranslation, Trans } from "next-i18next";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { Button } from "@src/components/ui/Button";
import { SubmittedSuccessfullyItem } from "./sub-components";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { steps } from "./SubmittedSuccessfully.data";
import { ISubmittedSuccessfully } from "./SubmittedSuccessfully.types";
import styles from "./SubmittedSuccessfully.module.scss";

const SubmittedSuccessfully = ({
  setSubmitted,
  file,
}: ISubmittedSuccessfully) => {
  const { t } = useTranslation("form-submit");

  return (
    <div className={styles["submitted-successfully"]}>
      <Heading
        className={styles["submitted-successfully-heading"]}
        level={2}
        color="var(--form-submit-submitted-successfully-heading-color)"
        textAlign="center"
        style={
          {
            "--submitted-successfully-heading-icon": `url(${getAssetUrl("/images/templates/form-submit/icons-submitted.svg")})`,
          } as React.CSSProperties
        }
      >
        {t("TemplateSubmittedSuccessfully")}
      </Heading>

      <div className={styles["submitted-successfully-block"]}>
        <Text
          size={2}
          color="var(--form-submit-submitted-successfully-block-text-color)"
        >
          <Trans
            t={t}
            i18nKey="YourTemplateHasBeenReceivedAndSentForReview"
            values={{ name_form: file?.name ?? "" }}
            components={[
              <Text
                className={styles["submitted-successfully-block-text"]}
                key={0}
                as="b"
                color="var(--form-submit-submitted-successfully-heading-color)"
              />,
            ]}
          />
        </Text>
      </div>

      <div
        className={clsx(
          styles["submitted-successfully-block"],
          styles["submitted-successfully-block-steps"],
        )}
      >
        <Heading
          className={styles["submitted-successfully-steps-heading"]}
          level={3}
          size={4}
          color="var(--form-submit-submitted-successfully-heading-color)"
          textAlign="center"
        >
          {t("WhatHappensNext")}
        </Heading>

        <ul className={styles["submitted-successfully-steps"]}>
          {steps.map((step) => (
            <li
              className={styles["submitted-successfully-step"]}
              key={step.heading}
            >
              <SubmittedSuccessfullyItem
                icon={{
                  ...step.icon,
                  url: getAssetUrl(step.icon.url),
                }}
                heading={t(step.heading)}
                text={t(step.text)}
                variant={step.variant}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles["submitted-successfully-btns"]}>
        <Button onClick={() => setSubmitted(false)} variant="secondary-dark">
          {t("SubmitAnotherTemplate")}
        </Button>
        <Button as="a" href="/" variant="tertiary-dark">
          {t("BackToTemplateGallery")}
        </Button>
      </div>
    </div>
  );
};

export { SubmittedSuccessfully };
