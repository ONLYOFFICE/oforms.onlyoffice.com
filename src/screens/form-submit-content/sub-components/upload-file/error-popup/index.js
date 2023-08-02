import StyledErrorPopup from "./styled-error-popup";
import Text from "@common/text";

const ErrorPopup = ({ onClick, title, text }) => {
  return (
    <StyledErrorPopup className="error-popup">
      <div onClick={onClick} className="error-popup-close-btn"></div>
      <div className="error-popup-wrapper">
        <Text className="error-popup-title">{title}</Text>
        <Text className="error-popup-text">{text}</Text>
      </div>
    </StyledErrorPopup>
  );
};

export default ErrorPopup;
