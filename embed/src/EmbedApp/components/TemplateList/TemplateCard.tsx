import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { FormatIcon, IconButton, MoreIcon, StarIcon } from "../../ui";
import { CardMenu } from "./CardMenu";
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
 * background/pane and a 48px footer carrying the format glyph, the name and a
 * "..." button. The favourite star overlays the preview at 4,4.
 */
const TemplateCard = ({
  template,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: ITemplateCard) => {
  const { t } = useTranslation("EmbedPanel");
  const [menuOpen, setMenuOpen] = useState(false);

  const ext = template.form_exts?.[0]?.ext;

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
        <FormatIcon
          className={styles["template-card-format"]}
          format={ext}
        />
        <span
          className={styles["template-card-name"]}
          title={template.name_form}
        >
          {template.name_form}
        </span>
        <IconButton
          className={clsx(
            styles["template-card-more"],
            menuOpen && styles["template-card-more-open"],
          )}
          aria-label={t("MoreActions")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MoreIcon aria-hidden="true" />
        </IconButton>

        {menuOpen && (
          <CardMenu
            isFavorite={isFavorite}
            onOpen={() => {
              setMenuOpen(false);
              onOpen(template);
            }}
            onToggleFavorite={() => {
              setMenuOpen(false);
              onToggleFavorite(template.url);
            }}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export { TemplateCard };
