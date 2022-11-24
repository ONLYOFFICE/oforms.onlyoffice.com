import { useState } from "react";
import Text from "@components/common/text";
import Button from "@components/common/button";
import { CloseButton, StyledFilePopup } from "./styled-file-popup";
import { ReactSVG } from "react-svg";

const FilePopup = ({ t, currentLanguage, modalActive, setModalActive, cardData, ...rest }) => {
  const docxfFile = cardData?.file_oform?.data?.filter((it)=> {return it?.attributes.name.split(".")[1] === "docxf";})[0]?.attributes?.url
  const oformFile = cardData?.file_oform?.data?.filter((it)=> {return it?.attributes.name.split(".")[1] === "oform";})[0]?.attributes?.url
  const pdfFile = cardData?.file_oform?.data?.filter((it)=> {return it?.attributes.name.split(".")[1] === "pdf";})[0]?.attributes?.url

  const [fileTypeData, setFileTypeData] = useState("docxf");
  const [isOpenType, setIsOpenType] = useState(false);
  const [href, setHref] = useState(docxfFile);
  const fileDescription = cardData.template_desc?.split("\n");

  const array = [
    { title: `${currentLanguage == "ja" ? `docxf` : `docxf`}`, href: pdfFile},
    { title: `${currentLanguage == "ja" ? `oform` : `oform`}`, href: oformFile},
    { title: `${currentLanguage == "ja" ? `pdf` : `pdf`}`, href: docxfFile},
  ];

  const openTypeDropdown = () => {
    setIsOpenType(true);
  };

  const closeTypeDropdown = () => {
    setIsOpenType(false);
  };

  const onChangeSelectFileType = (fileType) => {
    setFileTypeData(fileType);
    closeTypeDropdown();
  };

  return (
    <StyledFilePopup onClick={() => setModalActive(false)} className={modalActive ? "open": ""} {...rest}>
      <div className="popup-wrapper">
        <div onClick={(e) => e.stopPropagation()}  className="popup-content">
          <div className="popup-header">
            <div className="popup-title">
              {t("Form description")}
            </div>
            <CloseButton onClick={() => setModalActive(false)} />
          </div>
          <div className="popup-body">
            <div className="file-img">
              <img
                src={cardData.card_prewiew?.data?.attributes?.url}
                alt={cardData.name_form}
                style={{ width: "338px", height: "472px" }} 
              />
            </div>
            <div className="file-content">
              <div className="file-main-description">
                <h3 className="file-title">{cardData.name_form}</h3>
                <div className="file-info-type">{t("Free")}</div>
                {fileDescription?.map((text, id) => (
                  <Text
                    className="file-description"
                    label={text}
                    key={`text-description-${id}`}
                  />
                ))}
              </div>
              <div className="file-info">
                <div className="file-info-block">
                  <div className="file-info-item">
                    <div><span className="file-info-label">{t("FileSize")}:</span>{" "}</div>
                    <div>{cardData.file_size}</div>
                  </div>
                  <div className="file-info-item">
                    <div><span className="file-info-label">{t("Pages")}:</span>{" "}</div>
                    <div>{cardData.file_pages}</div>
                  </div>
                </div>
                <div>
                  <div className="file-info-item">
                    <div><span className="file-info-label">{t("FileType")}:</span>{" "}</div>
                    <div className="file-select">
                      <div 
                        className={"file-select-placeholder" + (isOpenType ? " open" : "")}
                        onClick={openTypeDropdown}
                      >
                        <div className="file-select-title">{fileTypeData}</div>
                        <ReactSVG
                          className="file-select-icon"
                          src="/icons/chevron-down.react.svg"
                          height="16px"
                          width="16px"
                        />
                      </div>
                      <div className="file-dropdown" onMouseLeave={closeTypeDropdown}>
                        {array.map((item, index) => (
                          <div 
                            onClick={() => {setHref(item.href); onChangeSelectFileType(item.title)}}
                            className={`file-dropdown-item ${fileTypeData === item?.title ? "selected" : ""}`}
                            key={index} 
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="file-button" label={t("Open")} />
            </div>
          </div>
        </div>
      </div>
    </StyledFilePopup>
  )
};

export default FilePopup;
