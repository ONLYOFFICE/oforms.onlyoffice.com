import React from "react";

import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";

import StyledInfoContent from "./styled-content";
import ShortCard from "./short-card";
import array_item from "./card";

const InfoContent = ({
    t,
    ...rest
}) => {
    return (
        <StyledInfoContent
            background="#333333"
            padding="46px 0 74px 0"
            tabletPadding="46px 0 47px 0"
            mobileLPadding="55px 0 72px 0"
            {...rest}
        >
            <Heading className="heading-info-content">
                <span style={{ color: "#FF6F3D" }}>OFORMS</span>{t(", ready-to-fill out online document forms")}
            </Heading>
            <Text
                className="description-info-content"
                label={t("Fill out the forms online in one click or download and open them them in ONLYOFFICE editors")}

            />
            <Heading
                className="subheading-info-content"
                level={5}
                label={t("Featured templates")}
            />
            <div>
            <Box justifyContent="space-between" className="box-info-content">
                {
                    array_item.map((it, idx) =>
                        <ShortCard
                            t={t}
                            key={idx}
                            title={it.title}
                            subtitle={it.subtitle}
                            linkUrl={it.linkUrl}
                            hrefButtom={it.hrefButtom}

                        />)
                }
            </Box>
            </div>
        </StyledInfoContent>
    );
};

export default InfoContent;