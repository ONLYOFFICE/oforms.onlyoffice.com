import type { ReactNode } from "react";
import type { usePanelState } from "../../usePanelState";

export interface IFilterPanel {
  state: ReturnType<typeof usePanelState>;
  /** Trailing content in the header row, beside the "Templates" title. */
  headerAction?: ReactNode;
}
