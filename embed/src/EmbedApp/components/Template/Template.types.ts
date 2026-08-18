import type { ReactNode } from "react";
import type { usePanelState } from "../../usePanelState";
import type { TTemplate } from "../../EmbedApp.types";

export interface ITemplate {
  state: ReturnType<typeof usePanelState>;
  onOpen: (template: TTemplate) => void;
  /** Rendered at the trailing edge of the filter panel's header row. */
  headerAction?: ReactNode;
}
