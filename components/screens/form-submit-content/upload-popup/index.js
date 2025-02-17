import StyledUploadPopup from "./styled-upload-popup";
import Heading from "@components/common/heading";
import Button from "@components/common/button";
import Text from "@components/common/text";

const UploadPopup = ({ t, uploadPopup, fileName, setUploadPopup, clearForm }) => {
  const closePopup = (e) => {
    if (!e.target.closest(".popup-wrapper") || e.target.closest(".popup-btn-close") || e.target.closest(".popup-btn")) {
      setUploadPopup(false);
      clearForm();
    };
  };

  return (
    <StyledUploadPopup onClick={e => closePopup(e)} className={`upload-popup ${uploadPopup ? "open" : ""}`}>
      <div className="popup-container">
        <div className="popup-wrapper">
          <div className="popup-top">
            <Heading className="popup-title" level={4}>{t("File upload")}</Heading>
            <div onClick={e => closePopup(e)} className="popup-btn-close"></div>
          </div>
          <div>
            <div className="upload-name">
              <span className={`upload-name-file ${fileName?.match(/\.(\w+)$/)?.[1]}`}>{fileName.substring(0, fileName.length - fileName?.match(/\.(\w+)$/)?.[0].length)}<span>{fileName?.match(/\.(\w+)$/)?.[0]}</span></span>
            </div>

            <div className="upload-descr">
              <Text className="upload-text">{t("After these steps are completed, you can work with your document.")}</Text>
              <div className="upload-descr-item">
                <Text className="upload-descr-title">2. {t("Conversion.")}</Text>
                <Text className="upload-text">{t("The file is converted to PDF and OFORM so that you can edit it.")}</Text>
              </div>
              <div className="upload-descr-item">
                <Text className="upload-descr-title">3. {t("Loading editor scripts.")}</Text>
                <Text className="upload-text">{t("They are loaded only once, they will be cached on your computer.")}</Text>
              </div>
            </div>

            <Button onClick={e => closePopup(e)} id="upload-popup-btn" className="popup-btn" label={t("OK")} />
          </div>
        </div>
      </div>
    </StyledUploadPopup>
  );
};

export default UploadPopup;