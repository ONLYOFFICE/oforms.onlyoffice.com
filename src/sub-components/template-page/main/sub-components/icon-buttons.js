import React from "react";
import styled from "styled-components";

import IconButton from "../../../../../components/icon-button";

const StyledShareButton = styled(IconButton)``;

const ShareButton = (props) => {
    return (
        <StyledShareButton {...props} />
    );
};

export default ShareButton;