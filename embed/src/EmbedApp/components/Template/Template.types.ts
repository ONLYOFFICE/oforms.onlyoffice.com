import { ITemplateData } from "../../EmbedApp.types";

export interface ITemplate {
  data: ITemplateData;
  isEmbed: boolean;
  searchQuery?: string;
}
