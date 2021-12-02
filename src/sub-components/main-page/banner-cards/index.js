import React from "react";

import Section from "../../section";

import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Button from "../../../../components/button";
import Box from "../../../../components/box";
import Link from "../../../../components/link";

import StyledBanner from "./styled-banner";

const Banner = ({ t, ...rest }) => {
    return (
        <Section
            background="#F5F5F5"
            padding="130px 0"
            tabletPadding="80px 0 100px"
            mobileLPadding="48px 0 70px"
        >
            <StyledBanner {...rest}>
                <Box flexDirection="column" justifyContent="center">
                    <Heading as="h3" fontSize="24px" lineHeight="1.33em" textAlign="center" className="banner_heading">
                        {t("Build your own forms")}
                    </Heading>
                    <Text className="description" textAlign="center" isInline={false} display="block">
                        {t("Create model documents, agreements, and contracts for any purpose with ONLYOFFICE Docs")}
                    </Text>
                </Box>
                <Box className="banner_buttons " justifyContent="center">
                    <Link className="link" href="https://www.onlyoffice.com/registration.aspx">
                        <Button
                            className="buttons"
                            label={("Use in the cloud")}
                        />
                    </Link>
                    <Link className="link " href="https://www.onlyoffice.com/download-desktop.aspx#desktop">
                        <Button
                            className="buttons"
                            label={("Download desktop app")}
                            typeButton="transparent"
                        />
                    </Link>
                </Box>
            </StyledBanner>
        </Section>
    );
};

export default Banner;