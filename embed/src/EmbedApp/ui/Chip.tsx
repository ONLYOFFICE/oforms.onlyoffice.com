import clsx from "clsx";
import styles from "./Chip.module.scss";

interface IChip {
  label: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Figma `Tag` -- 30px pill, 12px side padding, count trailing the label by 6px.
 * Unselected: transparent on a 1px border/tabbar hairline.
 * Selected: highlight/button-hover fill, no border (the 1px is kept as a
 * transparent border so the box size does not shift between states).
 */
const Chip = ({ label, count, selected, onClick }: IChip) => (
  <button
    type="button"
    className={clsx(styles.chip, selected && styles["chip-selected"])}
    aria-pressed={selected}
    onClick={onClick}
  >
    <span className={styles["chip-label"]}>{label}</span>
    {count !== undefined && (
      <span className={styles["chip-count"]}>{count}</span>
    )}
  </button>
);

export { Chip };
