import React from "react";

import StyledBanner from "./styled-banner";
import BannerOforms from "../../../../components/banners";

const Banner = ({ t }) => {
    return (
        <StyledBanner
            background="#333333"
            padding="112px 0"
            tabletPadding="112px 0 109px"
            mobileLPadding="48px 0 72px"
        >
            <BannerOforms t={t} />
        </StyledBanner>
    );
};

export default Banner;