import { useTranslation } from "react-i18next";
import {
  CloudIcon,
  FormatIcon,
  IconButton,
  LocalIcon,
  StarIcon,
} from "../../ui";
import type { TTemplate } from "../../EmbedApp.types";
import styles from "./TemplateCard.module.scss";

interface ITemplateCard {
  template: TTemplate;
  isFavorite: boolean;
  onOpen: (template: TTemplate) => void;
  onToggleFavorite: (url: string) => void;
}

/**
 * Figma `template-item`: 226x190 (min) with a 140px preview on
 * background/pane and a 48px footer carrying the format glyph and the name.
 * The favourite star overlays the preview at 4,4.
 *
 * Figma draws a "..." button at the trailing edge of the footer; that menu was
 * never specified and the feature was dropped, so the slot now carries a
 * read-only indicator of where the template comes from -- this device or the
 * ONLYOFFICE library.
 */
const TemplateCard = ({
  template,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: ITemplateCard) => {
  const { t } = useTranslation("EmbedPanel");

  const ext = template.form_exts?.[0]?.ext;
  // Set by localSdk.ts for templates AscDesktopEditor reports off the machine.
  const isLocal = !!template.__local;

  return (
    <div className={styles["template-card"]}>
      {/* The whole preview is the primary hit area for opening the template. */}
      <button
        type="button"
        className={styles["template-card-preview"]}
        onClick={() => onOpen(template)}
      >
        {template.card_prewiew?.url && (
          <img
            className={styles["template-card-image"]}
            src={template.card_prewiew.url}
            alt={template.name_form}
            loading="lazy"
          />
        )}
      </button>

      <IconButton
        className={styles["template-card-star"]}
        active={isFavorite}
        aria-label={t(isFavorite ? "RemoveFromFavorites" : "AddToFavorites")}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(template.url)}
      >
        <StarIcon filled={isFavorite} aria-hidden="true" />
      </IconButton>

      <div className={styles["template-card-footer"]}>
        <FormatIcon className={styles["template-card-format"]} format={ext} />
        <span
          className={styles["template-card-name"]}
          title={template.name_form}
        >
          {template.name_form}
        </span>
        <span
          className={styles["template-card-source"]}
          role="img"
          aria-label={t(isLocal ? "LocalTemplate" : "CloudTemplate")}
          title={t(isLocal ? "LocalTemplate" : "CloudTemplate")}
        >
          {isLocal ? <LocalIcon /> : <CloudIcon />}
        </span>
      </div>
    </div>
  );
};

export { TemplateCard };
