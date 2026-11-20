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

import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Heading } from "@src/components/ui/Heading";
import { Input } from "@src/components/ui/Input";
import { TextArea } from "@src/components/ui/TextArea";
import { Text } from "@src/components/ui/Text";
import { Badge } from "@src/components/ui/Badge";
import { Button } from "@src/components/ui/Button";
import {
  DEFAULT_PURPOSE_KEY,
  PURPOSE_BY_CATEGORY,
  PURPOSE_ORDER,
} from "@src/utils/purposes";
import {
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "../../FormSubmit.constants";
import { IInfo } from "./Info.types";
import styles from "./Info.module.scss";

const CATEGORIES = Object.keys(PURPOSE_BY_CATEGORY);

const Info = ({
  onSuccess,
  file,
  isUploading,
  queryIndexData,
  requestCaptchaToken,
  resetCaptcha,
}: IInfo) => {
  const {
    t,
    i18n: { language },
  } = useTranslation(["form-submit", "embed"]);
  const router = useRouter();

  const [values, setValues] = useState<{
    name: string;
    description: string;
    purpose: string;
    category: string;
  }>({
    name: queryIndexData?.formName ?? "",
    description: "",
    purpose: DEFAULT_PURPOSE_KEY,
    category: "",
  });
  const [errors, setErrors] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "error">(
    "default",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errorMessages: Record<"name" | "description", string> = {
    name: t("TemplateNameIsRequested"),
    description: t("TemplateDescriptionIsRequested"),
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    if (name !== "name" && name !== "description") return;
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : errorMessages[name],
    }));
  };

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = event.target;
    if (name !== "name" && name !== "description") return;
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const availableCategories = useMemo(() => {
    const collator = new Intl.Collator(language);
    return CATEGORIES.filter(
      (slug) => PURPOSE_BY_CATEGORY[slug] === values.purpose,
    )
      .map((slug) => ({ slug, name: t(`embed:CategoryNames.${slug}`) }))
      .sort((a, b) => collator.compare(a.name, b.name));
  }, [language, t, values.purpose]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePurposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      purpose: value,
      category: "",
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      category: prev.category === value ? "" : value,
    }));
  };

  const isValid =
    (queryIndexData ? !!queryIndexData.fileUrl : !!file) &&
    !isUploading &&
    values.name.trim().length > 0 &&
    values.description.trim().length > 0 &&
    values.category.length > 0;

  const clearCaptchaData = () => {
    resetCaptcha();
    setFormStatus("default");
    setSubmitError(null);
  };

  const fail = (message: string) => {
    setSubmitError(message);
    setFormStatus("error");
  };

  const handleOnSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formStatus === "loading") {
      return;
    }

    if (formStatus === "error") {
      clearCaptchaData();
      return;
    }

    if (!isValid) return;

    setFormStatus("loading");

    const captchaToken = await requestCaptchaToken();

    if (!captchaToken) {
      fail(t("CaptchaVerificationFailed"));
      return;
    }

    await onSubmit(captchaToken);
  };

  const onSubmit = async (captchaToken: string) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("description", values.description.trim());
      formData.append("category", values.category);
      formData.append("captchaToken", captchaToken);
      if (router.locale) {
        formData.append("languageKey", router.locale);
      }
      if (queryIndexData?.fileUrl) {
        formData.append("fileUrl", queryIndexData.fileUrl);
      } else if (file) {
        formData.append("file", file);
      }

      const endpoint = queryIndexData?.fileUrl
        ? "/api/form-upload-submission"
        : "/api/form-submission";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("[Info] submit:", `failed with ${response.status}`);
        fail(
          response.status === 429
            ? t("TooManyRequestsPleaseTryAgainLater")
            : t("WeAreSorryButAnErrorOccurredTryAgainLater"),
        );
        return;
      }

      onSuccess();
    } catch (error) {
      console.error("[Info] submit:", error);
      fail(t("WeAreSorryButAnErrorOccurredTryAgainLater"));
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={styles["info"]}>
        <Heading className={styles["info-heading"]} level={2} size={4}>
          {t("TemplateInformation")}
        </Heading>

        <Input
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={values.name}
          name="name"
          heading={t("TemplateName")}
          placeholder={t("EnterTemplateName")}
          autoComplete="off"
          maxLength={NAME_MAX_LENGTH}
          requiredMark
          status={errors.name ? "error" : "default"}
          error={errors.name}
        />
        <TextArea
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={values.description}
          name="description"
          heading={t("TemplateDescription")}
          placeholder={t("DescribeThePurposeAndUsageOfThisTemplate")}
          maxLength={DESCRIPTION_MAX_LENGTH}
          showCounter
          requiredMark
          status={errors.description ? "error" : "default"}
          error={errors.description}
        />

        <div>
          <Text
            className={styles["info-item-heading"]}
            size={4}
            color="var(--form-submit-info-item-heading-color)"
            fontWeight={600}
          >
            {t("TemplatePurpose")}{" "}
            <span className={styles["info-item-required-mark"]}>*</span>
          </Text>
          <div className={styles["info-items"]}>
            {PURPOSE_ORDER.map((purpose) => (
              <Badge
                key={purpose}
                size="large"
                name="purpose"
                type="radio"
                value={purpose}
                checked={values.purpose === purpose}
                onChange={handlePurposeChange}
              >
                {t(`embed:PurposeNames.${purpose}`)}
              </Badge>
            ))}
          </div>
        </div>

        {availableCategories.length > 0 && (
          <div>
            <Text
              className={styles["info-item-heading"]}
              size={4}
              color="var(--form-submit-info-item-heading-color)"
              fontWeight={600}
            >
              {t("TemplateCategories")}{" "}
              <span className={styles["info-item-required-mark"]}>*</span>
            </Text>
            <div className={styles["info-items"]}>
              {availableCategories.map((category) => (
                <Badge
                  key={category.slug}
                  size="large"
                  name="category"
                  value={category.slug}
                  checked={values.category === category.slug}
                  onChange={handleCategoryChange}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles["info-nav"]}>
        <div className={styles["info-buttons"]}>
          <Button as="a" href="/" variant="tertiary-dark" size={2}>
            {t("Cancel")}
          </Button>
          <Button
            variant="secondary-dark"
            size={2}
            disabled={!isValid || formStatus === "loading"}
            type="submit"
            status={formStatus === "loading" ? "loading" : undefined}
          >
            {t("UploadTemplate")}
          </Button>
        </div>

        {submitError && (
          <Text
            className={styles["info-error"]}
            size={4}
            color="var(--form-submit-file-upload-error-color)"
          >
            {submitError}
          </Text>
        )}
      </div>
    </form>
  );
};

export { Info };
