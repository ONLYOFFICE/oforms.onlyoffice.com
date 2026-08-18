import clsx from "clsx";
import styles from "./Separator.module.scss";

interface ISeparator {
  /**
   * `inset` -- Figma 328x9 (4px + 1px rule + 4px), sits inside the panel's
   * 16px padding.
   * `bleed` -- Figma 360x1, spans the full panel width above the footer.
   */
  variant?: "inset" | "bleed";
}

const Separator = ({ variant = "inset" }: ISeparator) => (
  <div
    className={clsx(styles.separator, styles[`separator-${variant}`])}
    role="separator"
  />
);

export { Separator };
