import {useState, useEffect} from "react";
import Text from "@common/text";
import Button from "@common/button";
import {CloseButton, StyledFilePopup} from "./styled-file-popup";
import {ChevronDown} from "@icons";
import {useTranslation} from "next-i18next";

const FilePopup = ({currentLanguage, modalActive, setModalActive, cardData, ...rest}) => {
    const docxfFile = cardData?.file_oform?.data?.filter((it) => {
        return it?.attributes.name.split(".")[1] === "docxf";
    })[0]?.attributes?.url
    const oformFile = cardData?.file_oform?.data?.filter((it) => {
        return it?.attributes.name.split(".")[1] === "oform";
    })[0]?.attributes?.url
    const pdfFile = cardData?.file_oform?.data?.filter((it) => {
        return it?.attributes.name.split(".")[1] === "pdf";
    })[0]?.attributes?.url

    const [fileTypeData, setFileTypeData] = useState("docxf");
    const [isOpenType, setIsOpenType] = useState(false);
    const [href, setHref] = useState(docxfFile);
    const {t} = useTranslation('common')

    useEffect(() => {
        setHref(docxfFile);
        setFileTypeData("docxf");
    }, [modalActive])


    const fileDescription = cardData.template_desc?.split("\n");

    const array = [
        {title: `${currentLanguage == "ja" ? `docxf` : `docxf`}`, href: docxfFile},
        {title: `${currentLanguage == "ja" ? `oform` : `oform`}`, href: oformFile},
        {title: `${currentLanguage == "ja" ? `pdf` : `pdf`}`, href: pdfFile},
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
        <StyledFilePopup onClick={() => setModalActive(false)} className={modalActive ? "open" : ""} {...rest}>
            <div className="popup-wrapper">
                <div onClick={(e) => e.stopPropagation()} className="popup-content">
                    <div className="popup-header">
                        <div className="popup-title">
                            {t("Form description")}
                        </div>
                        <CloseButton onClick={() => setModalActive(false)}/>
                    </div>
                    <div className="popup-body">
                        <div className="file-img">
                            <img
                                src={modalActive ? cardData.card_prewiew?.data?.attributes?.formats?.medium?.url : ""}
                                alt={cardData.name_form}
                                style={{width: "424px", height: "600px"}}
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
                                        <div className="file-info-value">{cardData.file_size}</div>
                                    </div>
                                    <div className="file-info-item">
                                        <div><span className="file-info-label">{t("Pages")}:</span>{" "}</div>
                                        <div className="file-info-value">{cardData.file_pages}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="file-info-item file-info-item__selector">
                                        <div><span className="file-info-label">{t("FileType")}:</span>{" "}</div>
                                        <div className="file-select">
                                            <div
                                                className={"file-select-placeholder" + (isOpenType ? " open" : "")}
                                                onClick={openTypeDropdown}
                                            >
                                                <div className="file-select-title">{fileTypeData}</div>
                                                <ChevronDown
                                                    size="16px"
                                                    className="file-select-icon"
                                                />
                                            </div>
                                            <div className="file-dropdown" onMouseLeave={closeTypeDropdown}>
                                                {array.map((item, index) => (
                                                    <div
                                                        onClick={() => {
                                                            setHref(item.href);
                                                            onChangeSelectFileType(item.title)
                                                        }}
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
                            <Button className="file-button" label={t("Open")}
                                    onClick={() => window.AscDesktopEditor.openTemplate(href, `${cardData.name_form}.${fileTypeData}`)}/>
                        </div>
                    </div>
                </div>
            </div>
        </StyledFilePopup>
    )
};

export default FilePopup;
