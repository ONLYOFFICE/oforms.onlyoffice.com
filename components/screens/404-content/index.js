import StyledError404 from "./styled-404-content";
import Text from "@components/common/text";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";

const ErrorContent = ({ t, heading, text, isDesktopClient, theme }) => {
  return (
    <StyledError404 className={isDesktopClient ? "is-desktop-client" : ""} theme={theme}>
      {isDesktopClient ? (
        <div className="error-desktop-content">
          <div className="error-desktop-image"></div>
          <div>
            <Heading className="error-desktop-title" level={4} label={t("Nothing found")} />
            <InternalLink className="error-desktop-link" href={`/?desktop=true${theme ? `&theme=${theme}` : ""}`} label={t("GoToHomePage")} />
          </div>
        </div>
      ) : (
        <>
          <div className="error-image"></div>
          <div className="error-container">
            <Heading className="error-heading" level={1} label={heading} />
            <Text className="error-description" label={text} />
            <InternalLink className="error-btn" href="/" label={t("Go to home page")} />
          </div>
        </>
      )}
    </StyledError404>
  );
};

export default ErrorContent;

