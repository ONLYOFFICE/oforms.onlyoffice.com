import { CrossIcon } from "./icons";
import styles from "./TextButton.module.scss";

interface ITextButton {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Figma "Clear all filters" link -- Body type, text/link colour, underlined,
 * with an 8x8 cross 4px after the label.
 */
const TextButton = ({ label, onClick, disabled }: ITextButton) => (
  <button
    type="button"
    className={styles["text-button"]}
    onClick={onClick}
    disabled={disabled}
  >
    <span className={styles["text-button-label"]}>{label}</span>
    <CrossIcon className={styles["text-button-icon"]} aria-hidden="true" />
  </button>
);

export { TextButton };
