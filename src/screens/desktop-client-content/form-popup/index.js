import { PopupGlobalStyles, StyledFormPopup } from "./styled-form-popup";
import { useEffect } from "react";
import Heading from "@common/heading";
import Text from "@common/text";
import Button from "@common/button";
import { ReactSVG } from "react-svg";

const FormPopup = ({ t, data, modalActive, setModalActive, theme }) => {
  const docxfFile = data?.attributes.file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "docxf");
  const fileSize = docxfFile?.[0]?.attributes.size;

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

  return (
    <StyledFormPopup onClick={() => setModalActive(false)} theme={theme} className={`modal-with-scroll ${modalActive ? "active" : ""}`}>
      {modalActive &&
        <PopupGlobalStyles />
      }
      <div className="popup-wrapper">
        <div onClick={(e) => e.stopPropagation()} className="popup-content">
          <div className="popup-header">
            <div className="popup-title">{t("Form description")}</div>
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
                    <span className="form-info-label">{t("FileSize")}:</span>
                    <span className="form-info-value">{fileSize < 1024 ? `${fileSize.toFixed(0)} kb` : `${(fileSize / 1024).toFixed(0)} mb`}</span>
                  </div>
                  <div className="form-info-item">
                    <span className="form-info-label">{t("Pages")}:</span>
                    <span className="form-info-value">{data?.attributes.file_pages}</span>
                  </div>
                </div>
                <div className="form-info-item">
                  <span className="form-info-label">{t("FileType")}:</span>
                  <span className="form-info-value">docxf</span>
                </div>
              </div>
              <Button
                onClick={() => window.AscDesktopEditor.openTemplate(docxfFile[0]?.attributes?.url, `${data?.attributes.name_form}.docxf`)}
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
