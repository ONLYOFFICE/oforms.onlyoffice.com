import clsx from "clsx";
import styles from "./Separator.module.scss";

interface ISeparator {
  /**
   * `inset` -- Figma 328x9 (4px + 1px rule + 4px), sits inside the panel's
   * 16px padding.
   * `bleed` -- Figma 360x1, spans the full panel width above the footer.
   */
  variant?: "inset" | "bleed";
  /**
   * Drops the 4px above the rule. Figma's first separator lives inside the
   * nav group's 4px-gap auto-layout, so it sits 8px under the last nav item
   * where every later rule sits 12px under its neighbour.
   */
  tightAbove?: boolean;
}

const Separator = ({ variant = "inset", tightAbove }: ISeparator) => (
  <div
    className={clsx(
      styles.separator,
      styles[`separator-${variant}`],
      tightAbove && styles["separator-tight-above"],
    )}
    role="separator"
  />
);

export { Separator };
