import { useEffect, useState } from "react";
import clsx from "clsx";
import { FilterPanel } from "../FilterPanel";
import { TemplateList } from "../TemplateList";
import type { ITemplate } from "./Template.types";
import styles from "./Template.module.scss";

/** Below this width the fixed 360px panel starves the list, so it becomes a drawer. */
const DRAWER_QUERY = "(max-width: 720px)";

/**
 * The panel body: Figma's "Second panel" (360px filters) beside the
 * "File list" column. The editor chrome around it -- the tab strip and the
 * 62px left navigation -- belongs to the host, not to us.
 */
const Template = ({ state, onOpen, headerAction }: ITemplate) => {
  const [isNarrow, setIsNarrow] = useState(
    () => window.matchMedia?.(DRAWER_QUERY).matches ?? false,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.(DRAWER_QUERY);
    if (!mql) return;
    const onChange = () => setIsNarrow(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Widening past the breakpoint must not leave a stale open drawer behind.
  useEffect(() => {
    if (!isNarrow) setDrawerOpen(false);
  }, [isNarrow]);

  return (
    <div
      className={clsx(styles.template, isNarrow && styles["template-narrow"])}
    >
      {isNarrow && drawerOpen && (
        <div
          className={styles["template-backdrop"]}
          onMouseDown={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={clsx(
          styles["template-panel"],
          isNarrow && drawerOpen && styles["template-panel-open"],
        )}
        // Keep the collapsed drawer out of the tab order and the a11y tree.
        aria-hidden={isNarrow && !drawerOpen}
      >
        <FilterPanel state={state} headerAction={headerAction} />
      </div>

      <TemplateList
        state={state}
        onOpen={onOpen}
        onOpenFilters={isNarrow ? () => setDrawerOpen(true) : undefined}
      />
    </div>
  );
};

export { Template };
