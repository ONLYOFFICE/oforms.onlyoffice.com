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

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CrossIcon } from "../icons";
import { previewUrl } from "../../data";
import type { ITemplate } from "../../types";
import styles from "./TemplateModal.module.scss";

interface ITemplateModalProps {
  template: ITemplate | null;
  onClose: () => void;
  onUse: (template: ITemplate) => void;
}

/** CMS reports sizes in KB. */
function formatSize(size: number | undefined): string | null {
  if (typeof size !== "number" || !Number.isFinite(size)) return null;
  return size >= 1024
    ? `${(size / 1024).toFixed(1)} MB`
    : `${Math.round(size)} KB`;
}

const TemplateModal = ({ template, onClose, onUse }: ITemplateModalProps) => {
  const { t } = useTranslation("TemplateModal");

  useEffect(() => {
    if (!template) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [template, onClose]);

  if (!template) return null;

  // Optional-chain the element, not just the array: a template with an empty
  // file_oform / form_exts must not throw here.
  const size = formatSize(template.file_oform?.[0]?.size);
  const ext = template.form_exts?.[0]?.ext;
  const preview = previewUrl(template);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} role="presentation" />

      <div className={styles.modal} role="dialog" aria-modal="true">
        <button
          type="button"
          className={styles["modal-close"]}
          onClick={onClose}
          aria-label={t("Cancel")}
        >
          <CrossIcon />
        </button>

        <div className={styles["modal-body"]}>
          {preview && (
            <div className={styles["modal-preview"]}>
              <img src={preview} alt="" loading="lazy" />
            </div>
          )}

          <div className={styles["modal-content"]}>
            <h2 className={styles["modal-heading"]}>{template.name_form}</h2>

            <span className={styles["modal-tag"]}>{t("Free")}</span>

            <p className={styles["modal-text"]}>{template.description_card}</p>

            <dl className={styles["modal-meta"]}>
              {ext && (
                <div className={styles["modal-meta-row"]}>
                  <dt>{t("FileType")}</dt>
                  <dd>{ext.toUpperCase()}</dd>
                </div>
              )}
              {size && (
                <div className={styles["modal-meta-row"]}>
                  <dt>{t("FileSize")}</dt>
                  <dd>{size}</dd>
                </div>
              )}
            </dl>

            <div className={styles["modal-actions"]}>
              <button
                type="button"
                className={styles["modal-btn-primary"]}
                onClick={() => onUse(template)}
              >
                {t("UseThisTemplate")}
              </button>
              <button
                type="button"
                className={styles["modal-btn-secondary"]}
                onClick={onClose}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TemplateModal };
