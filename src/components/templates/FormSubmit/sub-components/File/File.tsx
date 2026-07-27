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
import { useRef, useState } from "react";
import { useTranslation, Trans } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { ChevronDownIcon } from "@src/components/icons";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { DEFAULT_ACCEPT, MAX_UPLOAD_FILE_SIZE } from "@src/utils/formSubmit";
import { IFile } from "./File.types";
import styles from "./File.module.scss";

const SWIPER_MODULES = [Navigation];
const FADE_EFFECT = { crossFade: true };
const NAVIGATION = {
  prevEl: ".file-upload-preview-button-prev",
  nextEl: ".file-upload-preview-button-next",
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const File = ({
  file,
  setFile,
  isUploading,
  setIsUploading,
  queryIndexData,
}: IFile) => {
  const { t } = useTranslation("form-submit");
  const [templateImages, setTemplateImages] = useState<string[] | null>(
    queryIndexData?.templateImages ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.size > MAX_UPLOAD_FILE_SIZE) {
      setTemplateImages(null);
      setError(t("FileIsTooBig"));
      event.target.value = "";
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsUploading(true);

    try {
      const response = await fetch("/api/file-upload", {
        method: "POST",
        body: formData,
        signal: abortController.signal,
      });

      if (!response.ok) {
        setTemplateImages(null);
        setError(t("FileUploadError"));
        return;
      }

      const data = await response.json();

      setTemplateImages(data.templateImages);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setTemplateImages(null);
      setError(t("FileUploadError"));
    } finally {
      if (abortControllerRef.current === abortController) {
        setIsUploading(false);
        abortControllerRef.current = null;
      }
      event.target.value = "";
    }
  };

  const fileName = file?.name ?? queryIndexData?.fileName ?? "";
  const rawFileSize = file?.size ?? queryIndexData?.fileSize ?? null;
  const fileSize = rawFileSize !== null ? formatFileSize(rawFileSize) : "";
  const fileFormat = fileName.split(".").pop()?.toLowerCase() ?? "";
  const fileNameWithoutFormat = fileName.replace(/\.[^./]+$/, "");

  return (
    <div className={styles["file"]}>
      <Heading
        className={styles["file-main-heading"]}
        level={2}
        size={4}
        color="var(--form-submit-heading-color)"
      >
        {t("TemplateFile")}
      </Heading>

      {!isUploading && !templateImages && !error && (
        <label className={styles["file-wrapper"]}>
          <div className={styles["file-content"]}>
            <input
              className={styles["file-input"]}
              onChange={handleChange}
              name="file"
              type="file"
              accept={DEFAULT_ACCEPT}
              disabled={isUploading}
            />
            <div
              className={styles["file-icon"]}
              style={
                {
                  "--file-icon": `url(${getAssetUrl("/images/templates/form-submit/upload.svg")})`,
                } as React.CSSProperties
              }
            ></div>
            <div>
              <Text
                className={styles["file-heading"]}
                size={3}
                fontWeight={600}
                color="var(--form-submit-heading-color)"
              >
                {t("DragAndDropYourTemplate")}
              </Text>
              <div className={styles["file-text"]}>
                <Trans
                  t={t}
                  i18nKey="OrClickToBrowseFiles"
                  components={[
                    <Text
                      key={0}
                      as="span"
                      color="var(--form-submit-file-accent-text-color)"
                      textDecoration="underline"
                    />,
                  ]}
                />
              </div>
            </div>
            <ul className={styles["file-list"]}>
              <li>PDF</li>
              <li>DOCX</li>
              <li>XLSX</li>
              <li>PPTX</li>
            </ul>
            <Text size={5} color="var(--form-submit-file-text-color)">
              {t("MaximumFileSize50MB")}
            </Text>
          </div>
        </label>
      )}

      {(isUploading || templateImages || error) && (
        <div className={styles["file-upload"]}>
          {!isUploading && (
            <div
              className={clsx(styles["file-upload-info"], {
                [styles["file-upload-info-error"]]: error,
              })}
            >
              <div
                className={clsx(
                  styles["file-upload-icon"],
                  error
                    ? styles[`file-upload-icon-error`]
                    : styles[`file-upload-icon-${fileFormat}`],
                )}
                style={
                  {
                    "--file-upload-icon": `url(${getAssetUrl("/images/templates/form-submit/icons-upload.svg")})`,
                  } as React.CSSProperties
                }
              ></div>
              <div className={styles["file-upload-body"]}>
                <div className={styles["file-upload-heading"]}>{fileName}</div>
                <div>
                  <span className={styles["file-upload-size"]}>{fileSize}</span>
                  {!error && (
                    <span className={styles["file-upload-label"]}>
                      {t("Uploaded")}
                    </span>
                  )}
                </div>
              </div>
              {!error && (
                <button
                  onClick={() => {
                    setFile(null);
                    setTemplateImages(null);
                  }}
                  className={styles["file-upload-cross-btn"]}
                  type="button"
                  style={
                    {
                      "--file-upload-cross-btn-icon": `url(${getAssetUrl("/images/templates/form-submit/cross-red.svg")})`,
                    } as React.CSSProperties
                  }
                ></button>
              )}
            </div>
          )}
          {error && (
            <Text size={4} color="var(--form-submit-file-upload-error-color)">
              {error}
            </Text>
          )}

          {(isUploading || templateImages) && (
            <div className={styles["file-upload-preview"]}>
              {!isUploading && templateImages && (
                <div className={styles["file-upload-preview-slider-wrapper"]}>
                  <Swiper
                    className={styles["file-upload-preview-slider"]}
                    modules={SWIPER_MODULES}
                    spaceBetween={16}
                    effect="fade"
                    fadeEffect={FADE_EFFECT}
                    autoHeight={true}
                    navigation={NAVIGATION}
                  >
                    {templateImages.map((templateImage, index) => (
                      <SwiperSlide key={templateImage}>
                        <div className={styles["file-upload-preview-img"]}>
                          <img
                            src={templateImage}
                            alt={`${fileNameWithoutFormat} (${index + 1})`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {templateImages.length > 1 && (
                    <div className={styles["file-upload-preview-navigation"]}>
                      <button
                        className="file-upload-preview-button-prev"
                        type="button"
                      >
                        <ChevronDownIcon />
                      </button>
                      <button
                        className="file-upload-preview-button-next"
                        type="button"
                      >
                        <ChevronDownIcon />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {isUploading && (
                <div className={styles["file-upload-loader"]}>
                  <div
                    className={styles["file-upload-loader-text"]}
                    style={
                      {
                        "--file-upload-loader-icon": `url(${getAssetUrl("/images/templates/form-submit/preview-generating.svg")})`,
                      } as React.CSSProperties
                    }
                  >
                    {t("PreviewGenerating")}
                  </div>
                </div>
              )}
              <div className={styles["file-upload-preview-info"]}>
                <Text size={5} color="var(--form-submit-file-text-color)">
                  {t("TemplatePreview")}
                </Text>
                <div className={styles["file-upload-preview-label"]}>
                  {t("AutoGenerated")}
                </div>
              </div>
            </div>
          )}
          <label
            className={styles["file-upload-btn"]}
            style={
              {
                "--file-upload-btn-icon": `url(${getAssetUrl("/images/templates/form-submit/replace.svg")})`,
              } as React.CSSProperties
            }
          >
            <input
              className={styles["file-input"]}
              onChange={handleChange}
              name="file"
              type="file"
              accept={DEFAULT_ACCEPT}
            />
            {t("ReplaceWithADifferentFile")}
          </label>
        </div>
      )}
    </div>
  );
};

export { File };
