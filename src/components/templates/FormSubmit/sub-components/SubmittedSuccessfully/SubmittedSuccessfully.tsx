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
