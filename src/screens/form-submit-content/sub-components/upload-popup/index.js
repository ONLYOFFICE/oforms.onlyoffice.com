import StyledUploadPopup from "./styled-upload-popup";
import Heading from "@common/heading";
import Button from "@common/button";
import Text from "@common/text";

const UploadPopup = ({ t, file, uploadPopup, fileName, setUploadPopup, clearForm }) => {
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
              <span className="upload-name-file">{file !== undefined ? fileName : ""}<span>.docxf</span></span>
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

            <Button onClick={e => closePopup(e)} className="popup-btn" label={t("OK")} />
          </div>
        </div>
      </div>
    </StyledUploadPopup>
  );
};

export default UploadPopup;