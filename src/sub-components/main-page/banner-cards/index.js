import React from "react";

import StyledBanner from "./styled-banner";
import Section from "../../section";

import BannerOforms from "../../../../components/banners";

const Banner = ({ t }) => {
  return (
    <StyledBanner>
      <Section
        background="#333333"
        padding="131px 0 111px"
        tabletPadding="112px 0 109px"
        mobileLPadding="48px 0 72px"
      >
        <BannerOforms t={t} />
      </Section>
    </StyledBanner>
  );
};

export default Banner;
