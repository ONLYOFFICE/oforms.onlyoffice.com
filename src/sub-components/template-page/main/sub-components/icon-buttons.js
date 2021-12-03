import React from "react";
import styled from "styled-components";
import {
    EmailShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "react-share";

import IconButton from "../../../../../components/icon-button";
import Box from "../../../../../components/box";
import Text from "../../../../../components/text";

const StyledShareButton = styled(IconButton)`
width: 40px;
height: 40px;
background-color: #ffffff;
border-radius: 3px;
display: flex;
flex-direction: column;
align-content: center;
justify-content: center;
filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));

&:hover{
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
}
`;

const ShareButtonsGroup = ({ t, name, baseURL }) => {
    return (
        <Box className="file-main-iconbuttons">
            <Text isBold color="#AAAAAA">{t("Share")}: </Text>
            <TwitterShareButton title={name} url={baseURL}>
                <StyledShareButton iconName="/images/social-icons/twitter.react.svg" />
            </TwitterShareButton>
            <EmailShareButton title={name} url={baseURL}>
                <StyledShareButton iconName="/images/social-icons/mail.react.svg" />
            </EmailShareButton>
            <LinkedinShareButton title={name} url={baseURL}>
                <StyledShareButton iconName="/images/social-icons/linkedin.react.svg" />
            </LinkedinShareButton>
        </Box>
    );
};

export default ShareButtonsGroup;