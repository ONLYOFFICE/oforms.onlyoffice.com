import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.scss";

interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Figma boxes: 24x24 for chevrons/more/star, 20x20 in the template window. */
  size?: 16 | 20 | 24;
  active?: boolean;
}

const IconButton = ({
  children,
  size = 24,
  active,
  className,
  ...props
}: IIconButton) => (
  <button
    type="button"
    className={clsx(
      styles["icon-button"],
      styles[`icon-button-${size}`],
      active && styles["icon-button-active"],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export { IconButton };
