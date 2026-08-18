import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Chip } from "../../ui";
import styles from "./ChipGroup.module.scss";

interface IChipOption {
  value: string;
  label: string;
  count?: number;
}

interface IChipGroup {
  options: IChipOption[];
  selected: string[];
  onToggle: (value: string) => void;
  /**
   * Show only the first N options behind a "+N" chip. Figma uses this for
   * Country (6 chips, then "+64"); every other group shows all of its chips.
   */
  limit?: number;
}

/** Figma chip row: wrap, 4px column gap, 6px row gap, leading-aligned. */
const ChipGroup = ({ options, selected, onToggle, limit }: IChipGroup) => {
  const { t } = useTranslation("EmbedPanel");
  const [expanded, setExpanded] = useState(false);

  // A selected chip must stay visible even if it sits past the limit,
  // otherwise the filter is active with nothing on screen to switch it off.
  const collapsed =
    limit !== undefined && !expanded && options.length > limit
      ? options.filter(
          (option, index) => index < limit || selected.includes(option.value),
        )
      : options;
  const hiddenCount = options.length - collapsed.length;

  return (
    <div className={styles["chip-group"]}>
      {collapsed.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          count={option.count}
          selected={selected.includes(option.value)}
          onClick={() => onToggle(option.value)}
        />
      ))}
      {hiddenCount > 0 && (
        <Chip
          label={t("ShowMore", { count: hiddenCount })}
          onClick={() => setExpanded(true)}
        />
      )}
    </div>
  );
};

export { ChipGroup };
export type { IChipOption };
