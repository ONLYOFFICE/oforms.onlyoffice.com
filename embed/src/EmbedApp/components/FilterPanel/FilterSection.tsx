import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { SectionHeader } from "../../ui";
import styles from "./FilterSection.module.scss";

interface IFilterSection {
  label: string;
  /** Active-filter count for the `.mini` badge; omit to hide the badge. */
  count?: number;
  children: ReactNode;
  /** Figma gives the panel's first section a 40px header box. */
  tall?: boolean;
  /**
   * 4px between the header and the content instead of 8px. Purpose is the one
   * top-level section Figma tightens this way.
   */
  tight?: boolean;
}

/** Collapsible top-level filter section: Type, Country, Purpose, Category. */
const FilterSection = ({
  label,
  count,
  children,
  tall,
  tight,
}: IFilterSection) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section
      className={clsx(
        styles["filter-section"],
        tight && styles["filter-section-tight"],
      )}
    >
      <SectionHeader
        label={label}
        count={count}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        tall={tall}
      />
      {!collapsed && (
        <div className={styles["filter-section-body"]}>{children}</div>
      )}
    </section>
  );
};

export { FilterSection };
