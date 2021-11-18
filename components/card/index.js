import React, { useState } from "react";
import Config from "../../config.json";

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
        categories,
        last_update,
        description,
        id,
        image_src,
        name,
        link_dwn,
        link_redactor
    } = arrayItems;

    // Set type file to info and download
    const [typeFile, setTypeFile] = useState(true);
    const handleChangeTypeFile = () => {
        setTypeFile(!typeFile);
    };

    // TO DO: fix pathNAme
    const pathName = `/${name.replace(/\s/g, "-").replace(/[{()}]/g, '').toLowerCase()}`;

    const IMAGE_SRC = Config.IMGSRC + image_src;
    // TO DO: delete dwn
    const DWN = `/static/08679248ecde06598a96a895bc766a78/ONLYOFFICE_Sample_Document.docx`;

    return (
        <StyledCard {...rest}>
            <Image className="image-template" src={IMAGE_SRC} />
            <Box
                className="card-template"
                flexDirection="column"
                alignItems="stretch"
            >
                <ELink className="title-template" href={pathName} label={name} />
                <Text className="subtitle-template" label={description[0]} />
                <Link href={link_redactor}>
                    <Button
                        isScale
                        typeButton="transparent"
                        className="redactor-btn-template"
                        label={("open")}
                    />
                </Link>
                 <a href={DWN} download>
                    <Button
                        isScale
                        className="download-btn-template"
                        typeButton="white"
                        label={("download as")}
                    />
                </a> 
            </Box>
        </StyledCard>
    );
};

export default Card;