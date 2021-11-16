import React from "react";
import PropTypes from "prop-types";

import Heading from "../heading";
import Text from "../text";
import Button from "../button/";
import Box from "../box/";
import Link from "../link";

import StyledBanner from "./styled-banner";

const Banner = ({ 
    header, 
    description, 
    button_primary_label, 
    button_secondary_label, 
    button_primary_url, 
    button_secondary_url, 
    ...rest 
}) => {
    return (
        <StyledBanner {...rest}>
            <Box flexDirection="column" justifyContent="center">
                <Heading as="h3" fontSize="24px" textAlign="center">
                    {header}
                </Heading>
                <Text className="description" textAlign="center" isInline={false} display="block">
                    {description}
                </Text>
            </Box>
            <Box className="banner_buttons " justifyContent="center">
                <Link className="link" href="/123">
                    <Button
                        className="buttons"
                        label={button_primary_label}
                    />
                </Link>
                <Link className="link " href="/123">
                    <Button
                        className="buttons"
                        label={button_secondary_label}
                        typeButton="transparent"
                    />
                </Link>
            </Box>

        </StyledBanner>
    );
};

Banner.propTypes = {
    /** Header text */
    header: PropTypes.string,
    /** Description text */
    description: PropTypes.string,
    /** Primary Button text */
    button_primary_label: PropTypes.string,
    /** Secondary Button text */
    button_secondary_label: PropTypes.string,
    /** Primary Button url */
    button_primary_url: PropTypes.string,
    /** Secondary Button url */
    button_secondary_url: PropTypes.string,
}


export default Banner;