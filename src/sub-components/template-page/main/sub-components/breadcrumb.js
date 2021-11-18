import React from "react";
import styled from "styled-components";

import Box from "../../../../../components/box";
import Link from "../../../../../components/internal-link";
import Text from "../../../../../components/text";

const StyledBreadcrumb = styled(Box)`
gap: 10px;
padding-top: 15px;
font-size: 12px;
color: #444444;

.breadcrumb-links {
    color: #444444;
    text-decoration: none;
    font-size: 12px;
}

.breadcrumb-items {
    font-size: 12px;
}

.breadcrumb-items-name {
    color: #808080;
    font-size: 12px;
}
`;

const Breadcrumb = ({
    name,
    categories
}) => {

    return (
        <StyledBreadcrumb>
            <Link className="breadcrumb-links" href="/" label={"Forms"} />
            <Text className="breadcrumb-items" label={">"} />
            <Text className="breadcrumb-items" label={categories} />
            <Text className="breadcrumb-items" label={">"} />
            <Text className="breadcrumb-items-name" label={name} />
        </StyledBreadcrumb>
    );
};

Breadcrumb.propTypes = {};

export default Breadcrumb;