import BannerOforms from "@common/banner";
import StyledBanner from "./styled-banner";

const Banner = ({ currentLanguage }) => {
  return (
    <StyledBanner
      background="#333333"
      padding="112px 0"
      tabletPadding="80px 0"
      mobileLPadding="48px 0"
    >
      <BannerOforms currentLanguage={currentLanguage} />
      <div id="forms"></div>
    </StyledBanner>
  );
};

export default Banner;
