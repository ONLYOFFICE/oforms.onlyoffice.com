import xlsxIcon from "@public/icons/templates/xlsx.png";
import xlsxHoverIcon from "@public/icons/templates/xlsx_hover.png";
import pdfIcon from "@public/icons/templates/pdf.png";
import pdfHoverIcon from "@public/icons/templates/pdf_hover.png";
import docxIcon from "@public/icons/templates/docx.png";
import docxHoverIcon from "@public/icons/templates/docx_hover.png";
import pptxIcon from "@public/icons/templates/pptx.png";
import pptxHoverIcon from "@public/icons/templates/pptx_hover.png";
import previewXlsx from "@public/icons/templates/preview_default_xlsx.svg";
import previewPdf from "@public/icons/templates/preview_default_pdf.svg";
import previewDocx from "@public/icons/templates/preview_default_docx.svg";
import previewPptx from "@public/icons/templates/preview_default_pptx.svg";
import StyledTemplateCard from "./styled-template-card";

const FORMAT_ASSETS = {
  xlsx: { icon: xlsxIcon, iconHover: xlsxHoverIcon, preview: previewXlsx },
  pdf: { icon: pdfIcon, iconHover: pdfHoverIcon, preview: previewPdf },
  docx: { icon: docxIcon, iconHover: docxHoverIcon, preview: previewDocx },
  pptx: { icon: pptxIcon, iconHover: pptxHoverIcon, preview: previewPptx },
};

const TemplateCard = ({ template }) => {
  const { format, name, description } = template;
  const assets = FORMAT_ASSETS[format];

  if (!assets) return null;

  return (
    <StyledTemplateCard $format={format}>
      <div className="card-preview">
        <div
          className="preview-thumb"
          style={{ backgroundImage: `url(${assets.preview.src})` }}
        />
        <img
          className="format-badge format-badge--default"
          src={assets.icon.src}
          alt={format}
        />
        <img
          className="format-badge format-badge--hover"
          src={assets.iconHover.src}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </StyledTemplateCard>
  );
};

export default TemplateCard;
