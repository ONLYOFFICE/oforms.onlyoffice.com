/*
 * File-format glyph in the card footer. 24x30 in Figma and the only icon in the
 * panel that is not monochrome, so it ships as real multi-colour SVG markup
 * rather than a currentColor path.
 *
 * The files are the designer's Figma exports; they are inlined with `?raw` so
 * they land in the single-file bundle instead of becoming a CDN request that
 * would 404 inside the Desktop tab.
 */
import docx from "../../icons/format-docx.svg?raw";
import pdf from "../../icons/format-pdf.svg?raw";
import pptx from "../../icons/format-pptx.svg?raw";
import xlsx from "../../icons/format-xlsx.svg?raw";
import styles from "./FormatIcon.module.scss";

type TFormat = "docx" | "xlsx" | "pptx" | "pdf";

const MARKUP: Record<TFormat, string> = { docx, xlsx, pptx, pdf };

interface IFormatIcon {
  format?: string;
  className?: string;
}

const normalize = (format?: string): TFormat => {
  const ext = String(format ?? "").toLowerCase();
  if (ext.includes("xls")) return "xlsx";
  if (ext.includes("ppt")) return "pptx";
  if (ext.includes("pdf")) return "pdf";
  return "docx";
};

const FormatIcon = ({ format, className }: IFormatIcon) => {
  const kind = normalize(format);

  return (
    <span
      className={[styles["format-icon"], className].filter(Boolean).join(" ")}
      role="img"
      aria-label={kind}
      // The markup is a build-time import of a file in this repo, not user or
      // CMS input.
      dangerouslySetInnerHTML={{ __html: MARKUP[kind] }}
    />
  );
};

export { FormatIcon };
export type { TFormat };
