import clsx from "clsx";
import styles from "./SegmentedControl.module.scss";

interface ISegment<T extends string> {
  value: T;
  label: string;
}

interface ISegmentedControl<T extends string> {
  options: ISegment<T>[];
  value: T | null;
  onChange: (value: T) => void;
  /** Figma has a variant where the two segments split the 324px row evenly. */
  fullWidth?: boolean;
}

/**
 * Figma Purpose control (Business / Personal). Not a chip group: the segments
 * are 30px pills with 16px side padding, Body type and a 4px gap, wrapped in a
 * 40px row.
 */
const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  fullWidth,
}: ISegmentedControl<T>) => (
  <div
    className={clsx(
      styles["segmented-control"],
      fullWidth && styles["segmented-control-full"],
    )}
    role="group"
  >
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={clsx(
          styles.segment,
          value === option.value && styles["segment-selected"],
        )}
        aria-pressed={value === option.value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export { SegmentedControl };
