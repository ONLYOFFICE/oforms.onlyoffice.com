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
              <ExternalLink className="form-download-link pdf" label="PDF" download href={pdfFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button data-tooltip-id="pdf-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="pdf-tooltip" place="bottom-start">
                  {t("Download a PDF document if you need an editable text without fields.")}
                </Tooltip>
              </span>
            </span>
          </li>
        }
        {docxFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink className="form-download-link doc" label="DOCX" download href={docxFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button data-tooltip-id="doc-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="doc-tooltip" place="bottom-start">
                  {t("Download a DOCX document if you need an editable text without fields.")}
                </Tooltip>
              </span>
            </span>
          </li>
        }
        {xlsxFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink className="form-download-link tab" label="XLSX" download href={xlsxFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button data-tooltip-id="tab-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="tab-tooltip" place="bottom-start">
                  {t("Download a XLSX document if you need an editable text without fields.")}
                </Tooltip>
              </span>
            </span>
          </li>
        }
        {pptxFile[0]?.attributes?.url &&
          <li>
            <span className="form-download-item">
              <ExternalLink className="form-download-link pres" label="PPTX" download href={pptxFile[0]?.attributes?.url} />
              <span className="form-download-tooltip">
                <button data-tooltip-id="pres-tooltip"><ReactSVG src="/icons/info.svg" /></button>
                <Tooltip id="pres-tooltip" place="bottom-start">
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