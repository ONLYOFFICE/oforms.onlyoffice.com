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

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ReactHCaptcha from "@hcaptcha/react-hcaptcha";
import { Heading } from "@src/components/ui/Heading";
import { Input } from "@src/components/ui/Input";
import { TextArea } from "@src/components/ui/TextArea";
import { Text } from "@src/components/ui/Text";
import { Badge } from "@src/components/ui/Badge";
import { Button } from "@src/components/ui/Button";
import { HCaptcha } from "@src/components/ui/HCaptcha";
import {
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "../../FormSubmit.constants";
import { IInfo } from "./Info.types";
import styles from "./Info.module.scss";

const Info = ({
  countries,
  purposeWithCategories,
  onSuccess,
  file,
  isUploading,
  queryIndexData,
}: IInfo) => {
  const { t } = useTranslation("form-submit");
  const router = useRouter();
  const captchaRef = useRef<ReactHCaptcha>(null);

  const [values, setValues] = useState<{
    name: string;
    description: string;
    countries: string[];
    purpose: string;
    category: string;
    subcategories: string[];
  }>({
    name: queryIndexData?.formName ?? "",
    description: "",
    countries: [],
    purpose: purposeWithCategories.data[0]?.documentId ?? "",
    category: "",
    subcategories: [],
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

  const selectedPurpose =
    purposeWithCategories.data.find(
      (purpose) => purpose.documentId === values.purpose,
    ) ?? purposeWithCategories.data[0];

  const selectedCategory = selectedPurpose?.parent_categories.find(
    (category) => category.documentId === values.category,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      countries: checked
        ? [...prev.countries, value]
        : prev.countries.filter((item) => item !== value),
    }));
  };

  const handlePurposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      purpose: value,
      category: "",
      subcategories: [],
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((prev) => ({
      ...prev,
      category: prev.category === value ? "" : value,
      subcategories: [],
    }));
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      subcategories: checked
        ? [...prev.subcategories, value]
        : prev.subcategories.filter((item) => item !== value),
    }));
  };

  const subcategoriesRequired =
    !!selectedCategory && selectedCategory.subcategories.length > 0;

  const isValid =
    (queryIndexData ? !!queryIndexData.fileUrl : !!file) &&
    !isUploading &&
    values.name.trim().length > 0 &&
    values.description.trim().length > 0 &&
    values.countries.length > 0 &&
    values.purpose.length > 0 &&
    values.category.length > 0 &&
    (!subcategoriesRequired || values.subcategories.length > 0);

  const clearCaptchaData = () => {
    captchaRef.current?.resetCaptcha();
    setFormStatus("default");
  };

  const handleOnSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
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

    if (captchaRef.current?.isReady()) {
      captchaRef.current.execute();
    }
  };

  const handleHCaptchaChange = (token: string | null) => {
    if (token) {
      onSubmit(token);
    } else {
      clearCaptchaData();
    }
  };

  const onSubmit = async (captchaToken?: string) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("description", values.description.trim());
      values.countries.forEach((country) =>
        formData.append("countries", country),
      );
      values.subcategories.forEach((subcategory) =>
        formData.append("subcategories", subcategory),
      );
      if (captchaToken) {
        formData.append("captchaToken", captchaToken);
      }
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
        throw new Error(`Create template failed: ${response.status}`);
      }

      onSuccess();
    } catch (error) {
      console.error("[Info] submit:", error);
      captchaRef.current?.resetCaptcha();
      setFormStatus("error");
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
            {t("TemplateCountry")}{" "}
            <span className={styles["info-item-required-mark"]}>*</span>
          </Text>
          <div className={styles["info-items"]}>
            {countries.data.map((country) => (
              <Badge
                key={country.documentId}
                size="large"
                name="country"
                value={country.documentId}
                checked={values.countries.includes(country.documentId)}
                onChange={handleCountryChange}
              >
                {country.name}
              </Badge>
            ))}
          </div>
        </div>

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
            {purposeWithCategories.data.map((purpose) => (
              <Badge
                key={purpose.documentId}
                size="large"
                name="purpose"
                type="radio"
                value={purpose.documentId}
                checked={values.purpose === purpose.documentId}
                onChange={handlePurposeChange}
              >
                {purpose.name}
              </Badge>
            ))}
          </div>
        </div>

        {selectedPurpose && selectedPurpose.parent_categories.length > 0 && (
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
              {selectedPurpose.parent_categories.map((category) => (
                <Badge
                  key={category.documentId}
                  size="large"
                  name="category"
                  value={category.documentId}
                  checked={values.category === category.documentId}
                  onChange={handleCategoryChange}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && selectedCategory.subcategories.length > 0 && (
          <div>
            <Text
              className={styles["info-item-heading"]}
              size={4}
              color="var(--form-submit-info-item-heading-color)"
              fontWeight={600}
            >
              {t("SubCategories")}{" "}
              <span className={styles["info-item-required-mark"]}>*</span>
            </Text>
            <div className={styles["info-items"]}>
              {selectedCategory.subcategories.map((subcategory) => (
                <Badge
                  key={subcategory.documentId}
                  size="large"
                  name="subcategory"
                  value={subcategory.documentId}
                  checked={values.subcategories.includes(
                    subcategory.documentId,
                  )}
                  onChange={handleSubcategoryChange}
                >
                  {subcategory.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles["info-nav"]}>
        <div className={styles["info-captcha"]}>
          <HCaptcha
            ref={captchaRef}
            onVerify={handleHCaptchaChange}
            onExpire={() => handleHCaptchaChange(null)}
            onClose={clearCaptchaData}
          />
        </div>

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
      </div>
    </form>
  );
};

export { Info };
