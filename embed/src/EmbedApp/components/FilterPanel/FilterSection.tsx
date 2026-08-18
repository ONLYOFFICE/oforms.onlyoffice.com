import { useState, type ReactNode } from "react";
import { SectionHeader } from "../../ui";
import styles from "./FilterSection.module.scss";

interface IFilterSection {
  label: string;
  /** Active-filter count for the `.mini` badge; omit to hide the badge. */
  count?: number;
  children: ReactNode;
  /** Figma gives the panel's first section a 40px header box. */
  tall?: boolean;
}

/** Collapsible top-level filter section: Type, Country, Purpose, Category. */
const FilterSection = ({ label, count, children, tall }: IFilterSection) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className={styles["filter-section"]}>
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
