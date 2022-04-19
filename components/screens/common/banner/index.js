import React from "react";

import BannerOforms from "@components/common/banner";
import StyledBanner from "./styled-banner";

const Banner = ({ t, currentLanguage }) => {
  return (
    <StyledBanner
      background="#333333"
      padding="131px 0 111px"
      tabletPadding="112px 0 109px"
      mobileLPadding="48px 0 72px"
    >
      <BannerOforms t={t} currentLanguage={currentLanguage} />
    </StyledBanner>
  );
};

export default Banner;
