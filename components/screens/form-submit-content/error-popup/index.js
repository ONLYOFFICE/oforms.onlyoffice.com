import StyledErrorPopup from "./styled-error-popup";
import Heading from "@components/common/heading";
import Text from "@components/common/text";

const ErrorPopup = ({ t, onClick, fileName, text }) => {
  return (
    <StyledErrorPopup className="popup">
      <div className="popup-top">
        <Heading as="div" className="popup-title" size={4}>{t("File upload error")}</Heading>
        <button onClick={onClick} className="popup-close-btn" type="button"></button>
      </div>
      {fileName &&
        <div className="upload-name">
          <span className="upload-name-file">{fileName.substring(0, fileName.length - fileName?.match(/\.(\w+)$/)?.[0].length)}<span>{fileName?.match(/\.(\w+)$/)?.[0]}</span></span>
        </div>
      }

      <Text className="popup-text">{text}</Text>
    </StyledErrorPopup>
  );
};

export default ErrorPopup;
