import StyledErrorPopup from "./styled-error-popup";
import Heading from "@components/common/heading";
import Text from "@components/common/text";

const ErrorPopup = ({ t, onClick, fileName, text }) => {
  return (
    <StyledErrorPopup className="popup">
      <div className="popup-top">
        <Heading className="popup-title" level={4}>{t("File upload error")}</Heading>
        <div onClick={onClick} className="popup-close-btn"></div>
      </div>
      {fileName &&
        <div className="upload-name">
          <span className="upload-name-file">{fileName.match(/(\S+)\.(?!.*\.)/)?.[1]}<span>{fileName?.match(/\.(\w+)$/)?.[0]}</span></span>
        </div>
      }

      <Text className="popup-text">{text}</Text>
    </StyledErrorPopup>
  );
};

export default ErrorPopup;
