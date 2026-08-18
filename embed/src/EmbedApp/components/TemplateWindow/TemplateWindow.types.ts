import type { TTemplate } from "../../EmbedApp.types";

export interface ITemplateWindow {
  selected: TTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (template: TTemplate) => void;
  isFavorite: boolean;
  onToggleFavorite: (url: string) => void;
}
