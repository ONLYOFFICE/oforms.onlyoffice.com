import StyledFormDownload from "./styled-form-download";
import { Tooltip } from "react-tooltip";
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
                <button id="form-docx-tooltip" data-tooltip-id="docx-tooltip">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7ZM11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11Z" fill="#444444"/>
                  </svg>
                </button>
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
                <button id="form-xlsx-tooltip" data-tooltip-id="xlsx-tooltip">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7ZM11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11Z" fill="#444444"/>
                  </svg>
                </button>
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
                <button id="form-pptx-tooltip" data-tooltip-id="pptx-tooltip">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7ZM11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11Z" fill="#444444"/>
                  </svg>
                </button>
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