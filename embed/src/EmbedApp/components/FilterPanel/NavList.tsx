import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { AllTemplatesIcon, RecentIcon, StarIcon } from "../../ui";
import type { TView } from "../../usePanelState";
import styles from "./NavList.module.scss";

interface INavList {
  view: TView;
  onChange: (view: TView) => void;
}

const ITEMS: { view: TView; labelKey: string; Icon: typeof RecentIcon }[] = [
  { view: "all", labelKey: "AllTemplates", Icon: AllTemplatesIcon },
  { view: "recent", labelKey: "Recent", Icon: RecentIcon },
  { view: "favorites", labelKey: "Favorites", Icon: StarIcon },
];

/**
 * Figma "Menu item" list: 36px rows on a 40px step, 24px icon at 8px, label at
 * 40px, active row filled with background/pane.
 */
const NavList = ({ view, onChange }: INavList) => {
  const { t } = useTranslation("EmbedPanel");

  return (
    <nav className={styles["nav-list"]}>
      {ITEMS.map(({ view: item, labelKey, Icon }) => (
        <button
          key={item}
          type="button"
          className={clsx(
            styles["nav-item"],
            view === item && styles["nav-item-active"],
          )}
          aria-current={view === item ? "page" : undefined}
          onClick={() => onChange(item)}
        >
          <Icon className={styles["nav-item-icon"]} aria-hidden="true" />
          <span className={styles["nav-item-label"]}>{t(labelKey)}</span>
        </button>
      ))}
    </nav>
  );
};

export { NavList };
