import { type TTemplate } from "./components/TemplateModal";
import type { Locale } from "../locale";

export interface ITemplate {
  id: number;
  documentId: string;
  name_form: string;
  description_card: string;
  url: string;
  popular_template: boolean | null;
  createdAt: string;
  card_prewiew: {
    id: number;
    documentId: string;
    url: string;
    width: number;
    height: number;
  };
  file_oform: {
    id: number;
    documentId: string;
    name: string;
    ext: string;
    size: number;
    url: string;
  }[];
  form_exts: {
    id: number;
    documentId: string;
    ext: "docx" | "xlsx" | "pptx" | "pdf";
  }[];
  countries: {
    id: number;
    documentId: string;
    name: string;
    code: string;
    createdAt: string;
  }[];
  subcategories: {
    id: number;
    documentId: string;
    name: string;
    urlReq: string;
    createdAt: string;
    parent_categories: {
      id: number;
      documentId: string;
      name: string;
      urlReq: string;
      createdAt: string;
      purpose: {
        id: number;
        documentId: string;
        name: string;
        key: string;
        createdAt: string;
      };
    }[];
  }[];
}

export interface ITemplateData {
  data: TTemplate[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface IEmbedApp {
  locale: Locale;
  data: ITemplateData;
  onLocaleChange: (shortKey: string) => void;
  onEdit: (template: TTemplate) => void;
}
