import { useState } from "react";
import { SectionHeader } from "../../ui";
import { ChipGroup, type IChipOption } from "./ChipGroup";
import styles from "./CategoryGroup.module.scss";

interface ICategoryGroup {
  label: string;
  options: IChipOption[];
  selected: string[];
  onToggle: (value: string) => void;
  /** Figma shows the first groups expanded and the rest collapsed. */
  defaultCollapsed?: boolean;
}

/**
 * Nested Category group (CONTRACTS & LEGAL, FINANCE, ...): 36px uppercase
 * header with its own 16px chevron, chips 4px below.
 */
const CategoryGroup = ({
  label,
  options,
  selected,
  onToggle,
  defaultCollapsed,
}: ICategoryGroup) => {
  const [collapsed, setCollapsed] = useState(!!defaultCollapsed);

  return (
    <div className={styles["category-group"]}>
      <SectionHeader
        label={label}
        variant="group"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      {!collapsed && (
        <ChipGroup options={options} selected={selected} onToggle={onToggle} />
      )}
    </div>
  );
};

export { CategoryGroup };
