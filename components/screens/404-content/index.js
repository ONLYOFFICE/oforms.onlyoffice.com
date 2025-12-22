import StyledError404 from "./styled-404-content";
import Text from "@components/common/text";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";

const ErrorContent = ({ t, heading, text }) => {
  return (
    <StyledError404>
      <div className="error-image"></div>
      <div className="error-container">
        <Heading className="error-heading" level={1} label={heading} />
        <Text className="error-description" label={text} />
        <InternalLink id="error-btn" className="error-btn" href="/" label={t("Go to home page")} />
      </div>
    </StyledError404>
  );
};

export default ErrorContent;

