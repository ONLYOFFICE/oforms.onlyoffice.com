import React from "react";

import Section from "../../section";
import BannerOforms from "../../../../components/banners";

const Banner = ({ t }) => {
    return (
        <Section
            background="#333333"
            padding="130px 0"
            tabletPadding="80px 0 100px"
            mobileLPadding="48px 0 70px"
        >
            <BannerOforms t={t} />
        </Section>
    );
};

export default Banner;