import styled from "styled-components";
import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import Box from "@components/common/box";
import Text from "@components/common/text";
import IconButton from "@components/common/icon-button";

const StyledShareButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
  .share-text {
    margin-right: 7px;
  }
  img {
    width: 20px;
    margin: auto;
  }
`;

const ShareButtonsGroup = ({ t, name, baseURL }) => {
  return (
    <Box className="file-main-iconbuttons">
      <Text isBold color="#AAAAAA" className="share-text">
        {t("Share")}:{" "}
      </Text>
      <TwitterShareButton title={name} url={baseURL}>
        <StyledShareButton iconName="https://static-oforms.onlyoffice.com/images/social-icons/twitter.react.svg" />
      </TwitterShareButton>
      <EmailShareButton title={name} url={baseURL}>
        <StyledShareButton iconName="https://static-oforms.onlyoffice.com/images/social-icons/mail.react.svg" />
      </EmailShareButton>
      <LinkedinShareButton title={name} url={baseURL}>
        <StyledShareButton iconName="https://static-oforms.onlyoffice.com/images/social-icons/linkedin.react.svg" />
      </LinkedinShareButton>
    </Box>
  );
};

export default ShareButtonsGroup;
