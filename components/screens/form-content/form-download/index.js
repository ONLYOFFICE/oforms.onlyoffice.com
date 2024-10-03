import StyledFormDownload from "./styled-form-download";
import { Tooltip } from "react-tooltip";
import { ReactSVG } from "react-svg";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";

const FormDownload = ({ t, pdfFile, docxFile, pptxFile, xlsxFile }) => {
  return (
    <StyledFormDownload className="form-download">
      <Heading
        className="form-download-title"
        level={6}
        label={t("Download as")}
      />

      <ul className="form-download-list">
        {pdfFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink id="form-download-pdf-link" className="form-download-link pdf" label="PDF" download href={pdfFile[0]?.attributes?.url} />
            </span>
          </li>
        }
        {docxFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink id="form-download-docx-link" className="form-download-link docx" label="DOCX" download href={docxFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button id="form-docx-tooltip" data-tooltip-id="docx-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="docx-tooltip" place="bottom-start">
                  {t("Download a DOCX document if you need an editable text without fields.")}
                </Tooltip>
              </span>
            </span>
          </li>
        }
        {xlsxFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink id="form-download-xlsx-link" className="form-download-link xlsx" label="XLSX" download href={xlsxFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button id="form-xlsx-tooltip" data-tooltip-id="xlsx-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="xlsx-tooltip" place="bottom-start">
                  {t("Download a XLSX document if you need an editable text without fields.")}
                </Tooltip>
              </span>
            </span>
          </li>
        }
        {pptxFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink id="form-download-pptx-link" className="form-download-link pptx" label="PPTX" download href={pptxFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button id="form-pptx-tooltip" data-tooltip-id="pptx-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="pptx-tooltip" place="bottom-start">
                  {t("Download a PPTX document if you need an editable text without fields.")}
                </Tooltip>
              </span>
            </span>
          </li>
        }
      </ul>
    </StyledFormDownload>
  );
};

export default FormDownload;