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

import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useTranslation, Trans } from "next-i18next";
import clsx from "clsx";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import {
  DEFAULT_ACCEPT,
  MAX_UPLOAD_FILE_SIZE,
  ALLOWED_FORMATS,
} from "@src/utils/formSubmit";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IUploadFile, IUploadFileRef } from "./UploadFile.types";
import styles from "./UploadFile.module.scss";

const UploadFile = forwardRef<IUploadFileRef, IUploadFile>(
  (
    { fileName, setFileName, previewUrl, setPreviewUrl, onChange, onError },
    ref,
  ) => {
    const { t } = useTranslation("form-submit");
    const inputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showEmptyError, setShowEmptyError] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);

    const resetInput = () => {
      if (inputRef.current) inputRef.current.value = "";
    };

    useImperativeHandle(ref, () => ({
      reset() {
        abortControllerRef.current?.abort();
        setFileName("");
        setPreviewUrl("");
        setPreviewLoading(false);
        setIsLoading(false);
        setShowEmptyError(false);
        resetInput();
      },
    }));

    const handleError = (message: string) => {
      setFileName("");
      setPreviewUrl("");
      setPreviewLoading(false);
      resetInput();
      onError?.(message);
    };

    const handleFile = async (selectedFile: File | undefined | null) => {
      if (!selectedFile) return;

      setShowEmptyError(false);

      const extension =
        selectedFile.name.match(/\.(\w+)$/)?.[1]?.toLowerCase() ?? "";
      const isValidFormat =
        ALLOWED_FORMATS.includes(selectedFile.type) ||
        ALLOWED_TYPES.includes(extension);

      if (!isValidFormat) {
        handleError(t("InvalidFileFormat"));
        return;
      }

      if (selectedFile.size === 0) {
        handleError(t("InvalidFileSize"));
        return;
      }

      if (selectedFile.size > MAX_UPLOAD_FILE_SIZE) {
        handleError(t("YourFileIsTooBig"));
        return;
      }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setPreviewLoading(true);
      setFileName(selectedFile.name);
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/file-upload", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        if (!res.ok) {
          handleError(t("PageTimedOut"));
          return;
        }

        const data = await res.json().catch(() => null);
        if (controller.signal.aborted) return;

        if (!data?.templateImage) {
          handleError(t("PageTimedOut"));
          return;
        }

        setPreviewUrl(data.templateImage);
        onChange?.({
          file: selectedFile,
          templateImage: data.templateImage,
          fileSize: selectedFile.size,
          pageCount: data.pageCount,
          fileOrientation: data.fileOrientation,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        handleError(t("PageTimedOut"));
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0]);
      resetInput();
    };

    const handleFileChange = () => {
      inputRef.current?.click();
    };

    const handleFileRemove = () => {
      abortControllerRef.current?.abort();
      setFileName("");
      setPreviewUrl("");
      setPreviewLoading(false);
      setIsLoading(false);
      setShowEmptyError(true);
      resetInput();
      onChange?.(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      handleFile(e.dataTransfer.files?.[0]);
    };

    return (
      <div>
        <div
          className={clsx(
            styles["upload-file-wrapper"],
            previewUrl && styles["upload-file-wrapper-with-file"],
          )}
        >
          <label
            className={clsx(
              styles["upload-file"],
              isDragActive && styles["upload-file-active"],
              previewUrl && styles["upload-file-with-file"],
            )}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              className={styles["upload-file-input"]}
              onChange={handleInputChange}
              name="file"
              type="file"
              accept={DEFAULT_ACCEPT}
            />
            {previewLoading ? (
              <div>
                {isLoading ? (
                  <div className={styles["upload-file-loader"]}></div>
                ) : (
                  <img
                    className={styles["upload-file-img"]}
                    src={previewUrl}
                    alt={fileName}
                  />
                )}
              </div>
            ) : (
              <div className={styles["upload-file-content"]}>
                <div
                  className={styles["upload-file-icon"]}
                  style={
                    {
                      "--upload-file-plus-icon": `url(${getAssetUrl("/images/templates/form-submit/plus.svg")})`,
                    } as React.CSSProperties
                  }
                ></div>
                <Heading as="div" size={4} color="#21222b">
                  <Trans
                    t={t}
                    i18nKey="UploadOrDragAndDropItHere"
                    components={[
                      <Text
                        key={0}
                        as="span"
                        color="#3541f5"
                        textDecoration="underline"
                      />,
                    ]}
                  />
                </Heading>
                <Text size={4} color="#9092a6">
                  {t("Max10MB")}
                </Text>
              </div>
            )}
          </label>
        </div>
        <div>
          {previewUrl && (
            <div className={styles["upload-file-btns"]}>
              <button
                onClick={handleFileChange}
                className={clsx(
                  styles["upload-file-btn"],
                  styles["upload-change-btn"],
                )}
                data-title={t("Change")}
                type="button"
                style={
                  {
                    "--upload-file-change-icon": `url(${getAssetUrl("/images/templates/form-submit/change.svg")})`,
                  } as React.CSSProperties
                }
              ></button>
              <button
                onClick={handleFileRemove}
                className={clsx(
                  styles["upload-file-btn"],
                  styles["upload-delete-btn"],
                )}
                data-title={t("Remove")}
                type="button"
                style={
                  {
                    "--upload-file-delete-icon": `url(${getAssetUrl("/images/templates/form-submit/delete.svg")})`,
                  } as React.CSSProperties
                }
              ></button>
            </div>
          )}
          {showEmptyError && (
            <Text
              className={styles["upload-file-error"]}
              size={5}
              color="#cb0000"
              textAlign="center"
            >
              {t("FileIsEmpty")}
            </Text>
          )}
        </div>
      </div>
    );
  },
);

UploadFile.displayName = "UploadFile";

export { UploadFile };
