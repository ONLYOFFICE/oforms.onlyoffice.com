import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CardMenu.module.scss";

interface ICardMenu {
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
  onClose: () => void;
}

/**
 * Popup behind the card's "..." button.
 *
 * TODO(design): the mockups expose the button but never the open menu, so the
 * item list is a stand-in — Open plus the favourite toggle. Confirm the real
 * set with the designer before release.
 */
const CardMenu = ({
  isFavorite,
  onOpen,
  onToggleFavorite,
  onClose,
}: ICardMenu) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const { t } = useTranslation("EmbedPanel");

  return (
    <div ref={ref} className={styles["card-menu"]} role="menu">
      <button
        type="button"
        role="menuitem"
        className={styles["card-menu-item"]}
        onClick={onOpen}
      >
        {t("Open")}
      </button>
      <button
        type="button"
        role="menuitem"
        className={styles["card-menu-item"]}
        onClick={onToggleFavorite}
      >
        {t(isFavorite ? "RemoveFromFavorites" : "AddToFavorites")}
      </button>
    </div>
  );
};

export { CardMenu };
