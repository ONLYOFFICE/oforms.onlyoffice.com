import React from "react";

import Text from "../text";
import Link from "../link";
import Button from "../button";
import Dropdown from "../dropdown";
import Box from "../box";

import StyledCard from "./styled-card";

import ELink from "./sub-components/link";
import Image from "./sub-components/image";

const Card = ({
    t,
    arrayItems,
    ...rest
}) => {

    const {
        image_src,
        pathName,
        title,
        subtitle,
        linkRedactor,
        linkDocx,
        linkOform
    } = arrayItems;

    return (
        <StyledCard {...rest}>
            <Image className="image-template" src={image_src} />
            <Box
                className="card-template"
                flexDirection="column"
                alignItems="stretch"
            >
                <ELink className="title-template" href={pathName} label={title} />
                <Text className="subtitle-template" label={subtitle} />
                <Link href={linkRedactor}>
                    <Button
                        isScale
                        typeButton="transparent"
                        className="redactor-btn-template"
                        label={("open")}
                    />
                </Link>
                <Button
                    className="download-btn-template"
                    typeButton="white"
                    label={("download as")}
                />
            </Box>
        </StyledCard>
    );
};

export default Card;