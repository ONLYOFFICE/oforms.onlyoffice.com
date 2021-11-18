import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import Config from "../../../../config.json";

import Link from "../../../../components/link";
import Button from "../../../../components/button";
import ButtonSelector from "../../../../components/button-selector";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";

import StyledMainInfo from "./styled-main";

import Breadcrumb from "./sub-components/breadcrumb";
import ShareButton from "./sub-components/icon-buttons";
import Image from "./sub-components/image";

import Oform from "../../../../static/icons/oform.svg";


// TO DO: simplifying
const MainInfo = ({
    t,
    language,
    data,
    pathName,
    ...rest
}) => {

    const array = [
        { title: "Download as DOCXF", href: "/404" },
        { title: "Download as OFORM", href: "/401" },
      ]

    const [typeFile, setTypeFile] = useState(0);
    const onChangeFile = () => {
        setTypeFile()
    }

    const {
        categories,
        description,
        image_src,
        type_access,
        last_update,
        name,
        count_pages,
        file_size,
        file_type,
    } = data;

    const IMAGE_SRC = Config.IMGSRC + image_src;
    const SVG_FILE_TYPE = typeFile ? Oform : Oform; // added docx

    return (
        <StyledMainInfo
            maxWidth="1200px"
            background="#F9F9F9"
            {...rest}
        >
            <div className="template-main-info">
                <Breadcrumb categories={categories} name={name} />
                <Heading className="main-info-heading">{name}</Heading>
                <Text
                    isBold
                    className="main-info-type-item"
                    label={type_access[typeFile]}
                />
                <Box className="main-info-box">
                    <div>
                        <Text className="main-info-text">{t("Last update")}: </Text>
                        <Text isBold className="main-info-text">{last_update}</Text>
                    </div>
                    <Link href="#">{"Suggest_chages"}</Link>
                </Box>
            </div>
            <div className="template-main-img">
                <Image src={IMAGE_SRC} />
            </div>
            <div className="template-main-description">
                <div className="file-description">
                    {
                        description.map((text, id) =>
                            <Text
                                className="main-info-description"
                                label={text}
                                key={`text-description-${id}`}
                            />
                        )
                    }
                </div>
                <Box className="file-info">
                    <div style={{ display: "flex" }}>
                        <Text isBold color="#AAAAAA">{t("File type")}: </Text>
                        <ReactSVG className="template-image-file-type" src={SVG_FILE_TYPE} />
                        <Text isBold> {file_type[typeFile]} </Text>
                    </div>
                    <div>
                        <Text isBold color="#AAAAAA">{t("File size")}: </Text>
                        <Text isBold>{file_size[typeFile]}</Text>
                    </div>
                    <div>
                        <Text isBold color="#AAAAAA">{t("Pages")}: </Text>
                        <Text isBold>{count_pages[typeFile]}</Text>
                    </div>
                </Box>
                <Box className="file-main-buttons">
                    <Button isScale label={t("Download")} />
                    <ButtonSelector isScale array={array} defaultVal={t("Download as")}  />
                </Box>
                <Box className="file-main-iconbuttons">
                    <Text isBold color="#AAAAAA">{t("Share")}: </Text>
                    <ShareButton iconName="/images/social-icons/twitter.react.svg" />
                    <ShareButton iconName="/images/social-icons/mail.react.svg" />
                    <ShareButton iconName="/images/social-icons/linkedin.react.svg" />
                </Box>
            </div>
        </StyledMainInfo>
    );
};

export default MainInfo;