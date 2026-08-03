import { ITemplate } from "../../EmbedApp.types";

export type TTemplate = ITemplate;

export interface ITemplateModal {
  selected: ITemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (template: ITemplate) => void;
}
