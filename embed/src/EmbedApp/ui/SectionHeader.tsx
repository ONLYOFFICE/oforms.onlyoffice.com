import clsx from "clsx";
import { ChevronIcon } from "./icons";
import { CountBadge } from "./CountBadge";
import styles from "./SectionHeader.module.scss";

interface ISectionHeader {
  label: string;
  /** Active-filter count shown in the `.mini` badge. */
  count?: number;
  collapsed?: boolean;
  onToggle?: () => void;
  /**
   * `filter` -- top-level section (Type, Country, Purpose, Category,
   * Last opened): 32px tall, Normal type, 24px chevron 8px from the edge.
   * `group`  -- nested Category group (CONTRACTS & LEGAL): 36px tall,
   * uppercase secondary type, 16px chevron 24px from the edge.
   */
  variant?: "filter" | "group";
  /** Figma gives the first section in the panel a 40px box, the rest 32px. */
  tall?: boolean;
}

const SectionHeader = ({
  label,
  count,
  collapsed,
  onToggle,
  variant = "filter",
  tall,
}: ISectionHeader) => (
  <button
    type="button"
    className={clsx(
      styles["section-header"],
      styles[`section-header-${variant}`],
      tall && styles["section-header-tall"],
    )}
    aria-expanded={!collapsed}
    onClick={onToggle}
  >
    <span className={styles["section-header-label"]}>{label}</span>
    {variant === "filter" && count !== undefined && (
      <CountBadge count={count} />
    )}
    <ChevronIcon
      className={styles["section-header-chevron"]}
      direction={collapsed ? "down" : "up"}
      size={variant === "group" ? 16 : 24}
      aria-hidden="true"
    />
  </button>
);

export { SectionHeader };
