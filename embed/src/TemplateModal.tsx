import { useEffect, useMemo } from "react";
import styles from "./TemplateModal.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Template = any;

// Same token names as Card.module.scss, so overriding a format color updates
// both the catalog card badge and this popup's badge together.
const FORMAT_COLOR: Record<string, string> = {
  docx: "var(--desktop-embed-card-format-docx-background-color, #305cc4)",
  xlsx: "var(--desktop-embed-card-format-xlsx-background-color, #41b338)",
  pptx: "var(--desktop-embed-card-format-pptx-background-color, #ff6c00)",
  pdf: "var(--desktop-embed-card-format-pdf-background-color, #d10f33)",
};

const MAX_TAGS = 4;

/** "Planning Templates" -> "Planning" — subcategory names double as tags. */
const tagLabel = (name: string) => name.replace(/\s*Templates?$/i, "").trim();

/** file_oform[].size is in KB (matches the legacy desktop-client popup). */
function formatFileSize(kb: number | undefined): string | null {
  if (!kb && kb !== 0) return null;
  return kb < 1024 ? `${kb.toFixed(0)} kb` : `${(kb / 1024).toFixed(0)} mb`;
}

interface Props {
  template: Template;
  editLabel: string;
  cancelLabel: string;
  onEdit: (template: Template) => void;
  onClose: () => void;
}

export function TemplateModal({ template, editLabel, cancelLabel, onEdit, onClose }: Props) {
  const ext: string | undefined = template?.form_exts?.[0]?.ext;
  const preview: string | undefined = template?.card_prewiew?.url;
  const name: string = template?.name_form ?? "";
  const description: string = template?.description_card ?? "";

  const tags = useMemo(() => {
    const names: string[] = (template?.subcategories ?? []).map(
      (s: { name?: string }) => s?.name,
    );
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const raw of names) {
      const label = tagLabel(String(raw ?? ""));
      if (label && !seen.has(label)) {
        seen.add(label);
        unique.push(label);
      }
    }
    return unique.slice(0, MAX_TAGS);
  }, [template]);

  const file = useMemo(() => {
    const files: { ext?: string; size?: number }[] = template?.file_oform ?? [];
    const match = files.find(
      (f) => String(f?.ext ?? "").replace(/^\./, "").toLowerCase() === ext,
    );
    return match ?? files[0];
  }, [template, ext]);
  const fileSize = formatFileSize(file?.size);

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
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.previewWrap}>
              <div
                className={styles.preview}
                style={preview ? { backgroundImage: `url(${preview})` } : undefined}
              />
            </div>
            {ext && (
              <span
                className={styles.badge}
                style={{
                  backgroundColor:
                    FORMAT_COLOR[ext] ??
                    "var(--desktop-embed-card-format-unknown-background-color, #888)",
                }}
              >
                {ext}
              </span>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.info}>
              <h2 className={styles.name}>{name}</h2>

              {tags.length > 0 && (
                <div className={styles.tags}>
                  {tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className={styles.free}>Free</p>

              {description && <p className={styles.description}>{description}</p>}
            </div>

            <div className={styles.divider} />

            <div className={styles.fileInfo}>
              {fileSize && (
                <span>
                  <span className={styles.fileInfoLabel}>File size: </span>
                  <span className={styles.fileInfoValue}>{fileSize}</span>
                </span>
              )}
              {ext && (
                <span>
                  <span className={styles.fileInfoLabel}>File type: </span>
                  <span className={styles.fileInfoValue}>{ext}</span>
                </span>
              )}
            </div>

            <div className={styles.buttons}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                {cancelLabel}
              </button>
              <button type="button" className={styles.editBtn} onClick={() => onEdit(template)}>
                {editLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
