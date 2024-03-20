import StyledErrorContent from "./styled-404-page";
import Text from "@common/text";
import InternalLink from "@common/internal-link";
import Heading from "@common/heading";

const Error404 = ({ t, heading, text, isDesktopClient, theme }) => {
  return (
    <StyledErrorContent className={isDesktopClient ? "is-desktop-client" : ""} theme={theme}>
      {isDesktopClient ?
        <div className="error-desktop-content">
          <div className="error-desktop-image"></div>
          <div>
            <Heading className="error-desktop-title" level={4} label={t("Nothing-found")} />
            <InternalLink className="error-desktop-link" href={`/?desktop=true${theme ? `&theme=${theme}` : ""}`} label={t("GoToHomePage")} />
          </div>
        </div>
      :
        <>
          <div className="error-image"></div>
          <div className="error-container">
            <Heading className="error-heading" level={1} label={heading} />
            <Text className="error-description" label={text} />
            <InternalLink className="error-btn" href="/" label={t("GoToHomePage")} />
          </div>
        </>
      }
    </StyledErrorContent>
  );
};

export default Error404;

