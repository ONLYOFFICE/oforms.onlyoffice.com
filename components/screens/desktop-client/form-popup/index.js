import { PopupGlobalStyles, StyledFormPopup } from "./styled-form-popup";
import { useEffect } from "react";
import { getUA } from "react-device-detect";
import { ReactSVG } from "react-svg";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import Button from "@components/common/button";

const FormPopup = ({ t, locale, data, modalActive, setModalActive, theme }) => {
  const desktopEditorsVersion = getUA.match(/AscDesktopEditor\/([\d.]+)/);
  const pdfFile = data?.attributes.file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "pdf");
  const docxFile = data?.attributes.file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "docx");
  const docxfFile = data?.attributes.file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "docxf");
  const pptxFile = data?.attributes.file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "pptx");
  const xlsxFile = data?.attributes.file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "xlsx");
  const fileSize = pdfFile?.[0]?.attributes.size || docxFile?.[0]?.attributes.size || pptxFile?.[0]?.attributes.size || xlsxFile?.[0]?.attributes.size;

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setModalActive(false);
    }
  };

  useEffect(() => {
    if (modalActive) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalActive, handleEscapeKey]);

  const compareDesktopEditorVersions = (v1, v2) => {
    const v1parts = v1.split('.').map(Number);
    const v2parts = v2.split('.').map(Number);
    const len = Math.max(v1parts.length, v2parts.length);

    for (let i = 0; i < len; i++) {
      const num1 = v1parts[i] || 0;
      const num2 = v2parts[i] || 0;
      if (num1 > num2) return true;
      if (num1 < num2) return false;
    }

    return true;
  };

  const openTemplate = () => {
    if (docxFile?.[0]) {
      window.AscDesktopEditor.openTemplate(docxFile[0].attributes.url, `${data?.attributes.name_form}.docx`);
    } else if (pptxFile?.[0]) {
      window.AscDesktopEditor.openTemplate(pptxFile[0].attributes.url, `${data?.attributes.name_form}.pptx`);
    } else if (xlsxFile?.[0]) {
      window.AscDesktopEditor.openTemplate(xlsxFile[0].attributes.url, `${data?.attributes.name_form}.xlsx`);
    } else if (getUA.includes("AscDesktopEditor")) {
      if (compareDesktopEditorVersions(desktopEditorsVersion[1], "8.1")) {
        window.AscDesktopEditor.openTemplate(pdfFile[0].attributes.url, `${data?.attributes.name_form}.pdf`);
      } else {
        window.AscDesktopEditor.openTemplate(docxfFile[0].attributes.url, `${data?.attributes.name_form}.docxf`);
      }
    } else {
      window.AscDesktopEditor.openTemplate(pdfFile[0].attributes.url, `${data?.attributes.name_form}.pdf`);
    }
  };

  return (
    <StyledFormPopup onClick={() => setModalActive(false)} theme={theme} className={`modal-with-scroll ${modalActive ? "active" : ""}`}>
      {modalActive &&
        <PopupGlobalStyles />
      }
      <div className={`popup-wrapper ${locale === "ar" && "ar"}`}>
        <div onClick={(e) => e.stopPropagation()} className="popup-content">
          <div className="popup-header">
            <div className="popup-title">{t("Template description")}</div>
            <button onClick={() => setModalActive(false)} className="popup-close-btn"><ReactSVG src="/icons/desktop-cross.svg" /></button>
          </div>
          <div className="popup-body">
            <div className="form-img">
              <img src={data?.attributes.card_prewiew?.data?.attributes?.url} alt={data?.attributes.name_form} />
            </div>
            <div className="form-wrapper">
              <div className="form-content">
                <Heading className="form-title" level={4} label={data?.attributes.name_form} />
                <div className="form-label">{t("Free")}</div>
                {data?.attributes.template_desc?.split("\n").map((text, id) => (
                  <Text className="form-description" label={text} key={id} />
                ))}
              </div>
              <div className="form-info">
                <div className="form-info-block">
                  <div className="form-info-item">
                    <span className="form-info-label">{t("File size")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</span>
                    <span className="form-info-value">{fileSize < 1024 ? `${fileSize.toFixed(0)} kb` : `${(fileSize / 1024).toFixed(0)} mb`}</span>
                  </div>
                </div>
                <div className="form-info-item">
                  <span className="form-info-label">{t("File type")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</span>
                  <span className="form-info-value">
                    {
                      docxFile?.[0]?.attributes.ext === ".docx" ? "docx" :
                      pptxFile?.[0]?.attributes.ext === ".pptx" ? "pptx" :
                      xlsxFile?.[0]?.attributes.ext === ".xlsx" ? "xlsx" :
                      getUA.includes("AscDesktopEditor") ? compareDesktopEditorVersions(desktopEditorsVersion[1], "8.1") ? "pdf" : "docxf" : "pdf"
                    }
                  </span>
                </div>
              </div>
              <Button
                onClick={openTemplate}
                className="form-btn"
                label={t("Open")}
              />
            </div>
          </div>
        </div>
      </div>
    </StyledFormPopup>
  );
};

export default FormPopup;
