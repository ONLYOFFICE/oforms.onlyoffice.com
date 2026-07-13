import { useEffect } from "react";
import clsx from "clsx";
import styles from "./TemplateModal.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Template = any;

const FORMAT_COLOR: Record<string, string> = {
  docx: "#305cc4",
  xlsx: "#41b338",
  pptx: "#ff6c00",
  pdf: "#d10f33",
};

interface Props {
  template: Template;
  editLabel: string;
  onEdit: (template: Template) => void;
  onClose: () => void;
}

export function TemplateModal({ template, editLabel, onEdit, onClose }: Props) {
  const ext: string | undefined = template?.form_exts?.[0]?.ext;
  const preview: string | undefined = template?.card_prewiew?.url;
  const name: string = template?.name_form ?? "";
  const description: string = template?.description_card ?? "";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className={styles.body}>
          <div className={styles.previewWrap}>
            <div
              className={styles.preview}
              style={preview ? { backgroundImage: `url(${preview})` } : undefined}
            />
            {ext && (
              <span
                className={styles.badge}
                style={{ backgroundColor: FORMAT_COLOR[ext] ?? "#888" }}
              >
                {ext}
              </span>
            )}
          </div>

          <div className={styles.info}>
            <h2 className={styles.name}>{name}</h2>
            {description && <p className={styles.description}>{description}</p>}
            <button
              type="button"
              className={clsx(styles.editBtn)}
              onClick={() => onEdit(template)}
            >
              {editLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
