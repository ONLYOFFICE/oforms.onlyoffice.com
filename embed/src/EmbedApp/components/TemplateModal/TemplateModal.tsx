import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Modal } from "@src/components/ui/Modal";
import type { ITemplateModal } from "./TemplateModal.types";
import styles from "./TemplateModal.module.scss";

const TemplateModal = ({
  selected,
  isOpen,
  onClose,
  onEdit,
}: ITemplateModal) => {
  const { t } = useTranslation("TemplateModal");
  const {
    file_oform,
    card_prewiew,
    form_exts,
    name_form,
    description_card,
    subcategories,
  } = selected ?? {};
  const size = file_oform?.[0].size;
  const ext = form_exts?.[0].ext;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles["template-modal"]}
      maxWidth="800px"
    >
      <div className={styles["template-modal-wrapper"]}>
        <div className={styles["template-modal-preview"]}>
          <img
            className={styles["template-modal-img"]}
            src={card_prewiew?.url}
            alt={name_form}
          />
          <span
            className={clsx(
              styles["template-modal-format"],
              styles[`template-modal-format-${ext}`],
            )}
          >
            {ext}
          </span>
        </div>

        <div className={styles["template-modal-content"]}>
          <div className={styles["template-modal-body"]}>
            <div className={styles["template-modal-wrap"]}>
              <h1 className={styles["template-modal-heading"]}>{name_form}</h1>
              {!!subcategories?.length && (
                <ul className={styles["template-modal-tags"]}>
                  {subcategories.map(({ id, name }) => (
                    <li key={id} className={styles["template-modal-tag"]}>
                      {name}
                    </li>
                  ))}
                </ul>
              )}
              <div className={styles["template-modal-label"]}>{t("Free")}</div>
              <p className={styles["template-modal-text"]}>
                {description_card}
              </p>
            </div>
            <div className={styles["template-modal-file-info"]}>
              <div className={styles["template-modal-file-item"]}>
                <span className={styles["template-modal-file-label"]}>
                  {t("FileSize")}
                </span>
                <b className={styles["template-modal-file-value"]} dir="ltr">
                  {size < 1024
                    ? `${size.toFixed(0)} kb`
                    : `${(size / 1024).toFixed(0)} mb`}
                </b>
              </div>
              <div className={styles["template-modal-file-item"]}>
                <span className={styles["template-modal-file-label"]}>
                  {t("FileType")}
                </span>
                <b className={styles["template-modal-file-value"]}>{ext}</b>
              </div>
            </div>
          </div>
          <div className={styles["template-modal-btns"]}>
            <button
              onClick={onClose}
              className={clsx(
                styles["template-modal-btn"],
                styles["template-modal-btn-variant-secondary"],
              )}
              type="button"
            >
              {t("Cancel")}
            </button>
            <button
              onClick={() => selected && onEdit(selected)}
              className={clsx(
                styles["template-modal-btn"],
                styles["template-modal-btn-variant-primary"],
              )}
              type="button"
            >
              {t("UseThisTemplate")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { TemplateModal };
