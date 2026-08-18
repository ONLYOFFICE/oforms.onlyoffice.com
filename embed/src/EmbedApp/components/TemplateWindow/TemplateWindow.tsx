import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CrossIcon, IconButton, StarIcon } from "../../ui";
import type { ITemplateWindow } from "./TemplateWindow.types";
import styles from "./TemplateWindow.module.scss";

/**
 * Format a CMS `file_oform[].size`, which is reported in kilobytes.
 * Returns null when the catalogue entry carries no file (local templates do
 * not always) so the row can be dropped instead of printing "NaN kb".
 */
const formatSize = (size?: number): string | null => {
  if (typeof size !== "number" || !Number.isFinite(size)) return null;
  return size < 1024
    ? `${size.toFixed(0)} kb`
    : `${(size / 1024).toFixed(0)} mb`;
};

/**
 * Figma "Window": 799x393 with a 48px title bar and a workzone holding a
 * 456x320 preview and a 279px info column.
 *
 * The "AI actions" control next to Open is deliberately not implemented.
 */
const TemplateWindow = ({
  selected,
  isOpen,
  onClose,
  onEdit,
  isFavorite,
  onToggleFavorite,
}: ITemplateWindow) => {
  const { t } = useTranslation("TemplateModal");
  const { t: tPanel } = useTranslation("EmbedPanel");
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !selected) return null;

  const { card_prewiew, file_oform, form_exts, name_form, description_card } =
    selected;
  // Both arrays can be empty for desktop-shipped local templates.
  const size = formatSize(file_oform?.[0]?.size);
  const ext = form_exts?.[0]?.ext;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (!dialog.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={dialog}
        className={styles.window}
        role="dialog"
        aria-modal="true"
        aria-label={name_form}
      >
        <div className={styles.header}>
          <span className={styles["header-title"]}>{name_form}</span>
          <IconButton
            className={styles["header-close"]}
            aria-label={t("Cancel")}
            onClick={onClose}
          >
            <CrossIcon aria-hidden="true" />
          </IconButton>
        </div>

        <div className={styles.workzone}>
          <div className={styles.preview}>
            {card_prewiew?.url && (
              <img
                className={styles["preview-image"]}
                src={card_prewiew.url}
                alt={name_form}
              />
            )}
          </div>

          <div className={styles.info}>
            <div className={styles["info-top"]}>
              <div className={styles["info-title-row"]}>
                <h2 className={styles["info-title"]}>{name_form}</h2>
                <IconButton
                  size={20}
                  active={isFavorite}
                  aria-label={tPanel(
                    isFavorite ? "RemoveFromFavorites" : "AddToFavorites",
                  )}
                  aria-pressed={isFavorite}
                  onClick={() => onToggleFavorite(selected.url)}
                >
                  <StarIcon
                    width={20}
                    height={20}
                    filled={isFavorite}
                    aria-hidden="true"
                  />
                </IconButton>
              </div>

              <p className={styles["info-free"]}>{t("Free")}</p>
              <p className={styles["info-description"]}>{description_card}</p>
            </div>

            <div className={styles["info-bottom"]}>
              <div className={styles["info-files"]}>
                {size && (
                  <p className={styles["info-file"]}>
                    <span className={styles["info-file-label"]}>
                      {t("FileSize")}
                    </span>
                    <b className={styles["info-file-value"]} dir="ltr">
                      {size}
                    </b>
                  </p>
                )}
                {ext && (
                  <p className={styles["info-file"]}>
                    <span className={styles["info-file-label"]}>
                      {t("FileType")}
                    </span>
                    <b className={styles["info-file-value"]}>{ext}</b>
                  </p>
                )}
              </div>

              <div className={styles["info-actions"]}>
                {/* No "AI actions" control -- out of scope for this build. */}
                <button
                  type="button"
                  className={styles["info-open"]}
                  onClick={() => onEdit(selected)}
                >
                  {tPanel("Open")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TemplateWindow };
