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

import { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";
import clsx from "clsx";
import ReactCaptcha from "@hcaptcha/react-hcaptcha";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Breadcrumbs } from "@src/components/widgets/Breadcrumbs";
import { UploadFile } from "./sub-components/UploadFile";
import { ErrorModal } from "./sub-components/ErrorModal";
import { FileUploadModal } from "./sub-components/FileUploadModal";
import {
  IUploadFileData,
  IUploadFileRef,
} from "./sub-components/UploadFile/UploadFile.types";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { Input } from "@src/components/ui/Input";
import { TextArea } from "@src/components/ui/TextArea";
import { Select } from "@src/components/ui/Select";
import { HCaptcha } from "@src/components/ui/HCaptcha";
import { Button } from "@src/components/ui/Button";
import {
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  CATEGORY_MAX_LENGTH,
  LANGUAGE_DATA,
} from "./FormSubmit.constants";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IFormSubmitTemplate } from "./FormSubmit.types";
import styles from "./FormSubmit.module.scss";

const FormSubmitTemplate = ({
  categories,
  formExts,
  queryIndexData,
}: IFormSubmitTemplate) => {
  const { t } = useTranslation("form-submit");
  const router = useRouter();
  const pageLocale = router.locale ?? "en";
  const hCaptchaRef = useRef<ReactCaptcha | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uploadRef = useRef<IUploadFileRef | null>(null);
  const categoriesAbortRef = useRef<AbortController | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: [] as string[],
    language: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    language: "",
  });
  const [fileInfo, setFileInfo] = useState<IUploadFileData | null>(null);
  const [submittedFile, setSubmittedFile] = useState({ name: "", type: "" });
  const [error, setError] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState(categories?.data ?? []);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileType = fileName.match(/\.(\w+)$/)?.[1]?.toLowerCase();

  useEffect(() => {
    if (queryIndexData) {
      setForm((prev) => ({ ...prev, name: queryIndexData[4] }));
      setFileName(queryIndexData[2]);
      setPreviewUrl(queryIndexData[0]);
      setFileInfo({
        file: undefined,
        templateImage: queryIndexData[0],
        fileSize: Number(queryIndexData[3]),
        pageCount: Number(queryIndexData[1]),
        fileOrientation: queryIndexData[6],
        queryUrl: queryIndexData[5],
      });
    }
  }, [queryIndexData]);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      categoriesAbortRef.current?.abort();
    };
  }, []);

  const handleError = (message: string) => {
    setError(message);
    setIsErrorOpen(true);

    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setIsErrorOpen(false), 10000);
  };

  const handleErrorClose = () => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setIsErrorOpen(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} b`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kb`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} mb`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "name" || name === "description") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    if (value.length > 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name:
          value.length === 0
            ? "TemplateNameIsEmpty"
            : value.length > NAME_MAX_LENGTH
              ? "YouAreLimitedTo100Characters"
              : "",
      }));
      return;
    }

    if (name === "description") {
      setErrors((prev) => ({
        ...prev,
        description:
          value.length === 0
            ? "TemplateDescriptionIsEmpty"
            : value.length > DESCRIPTION_MAX_LENGTH
              ? "YouAreLimitedTo300Characters"
              : "",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: value.length === 0 ? "empty" : "",
    }));
  };

  const handleCategoryChange = (value: string[]) => {
    setForm((prev) => ({ ...prev, category: value }));
    setErrors((prev) => ({
      ...prev,
      category: value.length > CATEGORY_MAX_LENGTH ? "maximum5" : "",
    }));
  };

  const handleCategoryBlur = () => {
    setErrors((prev) => ({
      ...prev,
      category:
        form.category.length > CATEGORY_MAX_LENGTH
          ? "maximum5"
          : form.category.length === 0
            ? "TemplateCategoryIsEmpty"
            : "",
    }));
  };

  const handleCategoryFocus = () => {
    setErrors((prev) => ({
      ...prev,
      category: form.category.length > CATEGORY_MAX_LENGTH ? "maximum5" : "",
    }));
  };

  const handleLanguageChange = (value: string) => {
    if (value === form.language) return;
    if (value === pageLocale) {
      categoriesAbortRef.current?.abort();
      setForm((prev) => ({ ...prev, language: value }));
      setCategoriesData(categories?.data ?? []);
      return;
    }
    setForm((prev) => ({ ...prev, language: value, category: [] }));
    fetchCategories(value);
  };

  const handleLanguageBlur = () => {
    setErrors((prev) => ({
      ...prev,
      language: form.language.length === 0 ? "LanguageIsEmpty" : "",
    }));
  };

  const handleLanguageFocus = () => {
    setErrors((prev) => ({ ...prev, language: "" }));
  };

  const categoryOptions = categoriesData.map((category) => ({
    value: category.categorie,
    label: category.categorie,
  }));

  const languageOptions = LANGUAGE_DATA.map((item) => ({
    value: item.key,
    label: t(item.title),
  }));

  const isFormValid =
    fileInfo !== null &&
    form.name.trim().length > 0 &&
    form.name.length <= NAME_MAX_LENGTH &&
    form.description.trim().length > 0 &&
    form.description.length <= DESCRIPTION_MAX_LENGTH &&
    form.category.length > 0 &&
    form.category.length <= CATEGORY_MAX_LENGTH &&
    form.language.length > 0;

  const fetchCategories = async (locale: string) => {
    categoriesAbortRef.current?.abort();
    const controller = new AbortController();
    categoriesAbortRef.current = controller;

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
        signal: controller.signal,
      });
      if (!res.ok) return;
      const data = await res.json();
      setCategoriesData(data.categories?.data ?? []);
    } catch {}
  };

  const resetForm = () => {
    categoriesAbortRef.current?.abort();
    setForm({ name: "", description: "", category: [], language: "" });
    setErrors({ name: "", description: "", category: "", language: "" });
    setFileInfo(null);
    setCategoriesData(categories?.data ?? []);
    uploadRef.current?.reset();
  };

  const handleCaptchaReset = () => {
    hCaptchaRef.current?.resetCaptcha();
    setIsLoading(false);
  };

  const sendForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fileInfo || isLoading) return;

    const categoryId = categoriesData
      .filter((category) => form.category.includes(category.categorie))
      .map((category) => category.documentId)
      .join(",");

    const formExt = formExts?.data?.find(
      (item) => item.ext === fileType,
    )?.documentId;

    setIsLoading(true);

    let captchaToken: string;
    try {
      const result = await hCaptchaRef.current?.execute({ async: true });
      if (!result?.response) throw new Error("captcha");
      captchaToken = result.response;
    } catch {
      hCaptchaRef.current?.resetCaptcha();
      handleError(t("PageTimedOut"));
      setIsLoading(false);
      return;
    }

    const hasFile = fileInfo.file !== undefined;
    const endpoint = hasFile
      ? "/api/form-submission"
      : "/api/form-upload-submission";

    const formData = new FormData();
    if (hasFile) {
      formData.append("file", fileInfo.file as File);
    } else {
      formData.append("queryUrl", fileInfo.queryUrl ?? "");
      formData.append("fileName", fileName);
    }
    formData.append("templateImage", fileInfo.templateImage);
    formData.append("fileOrientation", fileInfo.fileOrientation);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("categoryId", categoryId);
    formData.append("languageKey", form.language);
    formData.append("captchaToken", captchaToken);
    if (formExt !== undefined) formData.append("formExt", String(formExt));

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (data?.error === "name_form") {
        setErrors((prev) => ({ ...prev, name: "DuplicateFileName" }));
        return;
      }

      if (!res.ok || data?.error) {
        handleError(t("PageTimedOut"));
        return;
      }

      setSubmittedFile({
        name: fileName.replace(/\.[^.]+$/, ""),
        type: fileType ?? "",
      });
      setIsUploadModalOpen(true);
      resetForm();
    } catch {
      handleError(t("PageTimedOut"));
    } finally {
      hCaptchaRef.current?.resetCaptcha();
      setIsLoading(false);
    }
  };

  return (
    <Section
      desktopSpacing={["64px", "112px"]}
      tabletSpacing={["48px", "48px"]}
      tabletSmallSpacing={["48px", "48px"]}
      mobileSpacing={["28px", "48px"]}
    >
      <Container maxWidth="1364px">
        <Breadcrumbs
          items={[
            { label: t("Templates"), href: "/" },
            { label: t("LoadingYourTemplate") },
          ]}
        />

        <div className={styles["form-submit-wrapper"]}>
          <UploadFile
            ref={uploadRef}
            fileName={fileName}
            setFileName={setFileName}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            onChange={setFileInfo}
            onError={handleError}
          />

          <form onSubmit={sendForm} className={styles["form-submit-content"]}>
            <div className={styles["form-submit-block"]}>
              <Heading
                className={styles["form-submit-heading"]}
                level={1}
                size={2}
                color="var(--form-submit-heading-color)"
              >
                {t("UploadingYourTemplate")}
              </Heading>
              <Text
                as="p"
                size={2}
                color="var(--form-submit-description-color)"
              >
                {t("PleaseFillOutAllTheFieldsBeforeSendingTheTemplate")}
              </Text>
            </div>
            <div
              className={clsx(
                styles["form-submit-block"],
                styles["form-submit-block-wrapper"],
              )}
            >
              <Input
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={form.name}
                name="name"
                heading={t("TemplateName")}
                placeholder={t("EnterName")}
                autoComplete="off"
                status={errors.name ? "error" : "default"}
                error={errors.name ? t(errors.name) : ""}
              />
              <TextArea
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={form.description}
                name="description"
                heading={t("TemplateDescription")}
                placeholder={t("GiveMoreDetailsAboutYourTemplate")}
                status={errors.description ? "error" : "default"}
                error={errors.description ? t(errors.description) : ""}
              />
              <Select
                onChange={handleCategoryChange}
                onBlur={handleCategoryBlur}
                onFocus={handleCategoryFocus}
                className={styles["form-submit-select"]}
                multiple
                name="category"
                value={form.category}
                options={categoryOptions}
                status={errors.category ? "error" : "default"}
                heading={
                  <Trans
                    t={t}
                    i18nKey="TemplateCategory"
                    components={[
                      <Text
                        key={0}
                        as="span"
                        color="var(--form-submit-category-label-color)"
                      />,
                    ]}
                  />
                }
                label={t("EnterCategoryOrChoose")}
                counter={true}
                searchable={true}
                placeholder={t("Choose")}
                resetLabel={t("Reset")}
                error={errors.category ? t(errors.category) : ""}
              />
              <Select
                onChange={handleLanguageChange}
                onBlur={handleLanguageBlur}
                onFocus={handleLanguageFocus}
                className={styles["form-submit-select"]}
                name="language"
                value={form.language}
                options={languageOptions}
                status={errors.language ? "error" : "default"}
                heading={t("Language")}
                label={t("PleaseSelectALanguage")}
                placeholder={t("Choose")}
                resetLabel={t("Reset")}
                error={errors.language ? t(errors.language) : ""}
              />
            </div>
            <div className={styles["form-submit-block"]}>
              <div className={styles["form-submit-info"]}>
                <div className={styles["form-submit-info-item"]}>
                  <Text
                    className={styles["form-submit-info-label"]}
                    as="span"
                    size={5}
                    color="var(--form-submit-info-label-color)"
                  >
                    {t("FileType")}
                  </Text>
                  {fileType && (
                    <Text
                      className={styles["form-submit-info-format"]}
                      as="span"
                      size={5}
                      color="var(--form-submit-info-value-color)"
                      style={
                        {
                          "--form-submit-info-format": `url(${getAssetUrl(`/images/templates/form-submit/${fileType}.svg`)})`,
                        } as React.CSSProperties
                      }
                    >
                      {`.${fileType}`}
                    </Text>
                  )}
                </div>
                <div className={styles["form-submit-info-item"]}>
                  <Text
                    className={styles["form-submit-info-label"]}
                    as="span"
                    size={5}
                    color="var(--form-submit-info-label-color)"
                  >
                    {t("FileSize")}
                  </Text>
                  {fileInfo?.fileSize != null && (
                    <Text
                      as="span"
                      size={5}
                      color="var(--form-submit-info-value-color)"
                      dir="ltr"
                    >
                      {formatFileSize(fileInfo.fileSize)}
                    </Text>
                  )}
                </div>
                <div className={styles["form-submit-info-item"]}>
                  <Text
                    className={styles["form-submit-info-label"]}
                    as="span"
                    size={5}
                    color="var(--form-submit-info-label-color)"
                  >
                    {t("Pages")}
                  </Text>
                  {fileInfo?.pageCount != null && (
                    <Text
                      as="span"
                      size={5}
                      color="var(--form-submit-info-value-color)"
                    >
                      {fileInfo.pageCount}
                    </Text>
                  )}
                </div>
              </div>
            </div>
            <div className={styles["form-submit-nav"]}>
              <HCaptcha
                ref={hCaptchaRef}
                onExpire={handleCaptchaReset}
                onClose={handleCaptchaReset}
              />
              <Button
                className={styles["form-submit-button"]}
                variant="secondary-dark"
                type="submit"
                disabled={!isFormValid || isLoading}
                isLoading={isLoading}
              >
                {t("Send")}
              </Button>
            </div>
          </form>
        </div>
      </Container>

      <ErrorModal isOpen={isErrorOpen} onClose={handleErrorClose}>
        {error}
      </ErrorModal>
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        fileName={submittedFile.name}
        fileType={submittedFile.type}
      />
    </Section>
  );
};

export { FormSubmitTemplate };
