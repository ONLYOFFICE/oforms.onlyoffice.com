import type { usePanelState } from "../../usePanelState";
import type { TTemplate } from "../../EmbedApp.types";

export interface ITemplateList {
  state: ReturnType<typeof usePanelState>;
  onOpen: (template: TTemplate) => void;
  /**
   * Supplied only at narrow widths, where the filter panel is a drawer.
   * Undefined means the panel is on screen and needs no trigger.
   */
  onOpenFilters?: () => void;
}
