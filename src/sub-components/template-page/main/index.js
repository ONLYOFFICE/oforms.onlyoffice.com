import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import Config from "../../../../static/data/config.json";

import Link from "../../../../components/link";
import Button from "../../../../components/button";
import ButtonSelector from "../../../../components/button-selector";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";

import StyledMainInfo from "./styled-main";

import Breadcrumb from "./sub-components/breadcrumb";
import ShareButtonsGroup from "./sub-components/icon-buttons";
import Image from "./sub-components/image";

import Oform from "../../../../static/icons/oform.svg";

const MainInfo = ({ t, language, data, config, pathName, ...rest }) => {
  const {
    jsonId,
    name,
    file_categories,
    file_description,
    file_image,
    file_type_access,
    description_card,
    file_last_update,
    file_pages,
    file_size,
    file_formats_download,
  } = data;

  let tt1 = `Download as ${file_formats_download[0][0].toUpperCase()}`;
  let tt2 = `Download as ${file_formats_download[1][0].toUpperCase()}`;
  let tt3 = `Download as ${file_formats_download[2][0].toUpperCase()}`;
  const array = [
    { title: tt1, href: file_formats_download[0][1] },
    { title: tt2, href: file_formats_download[1][1] },
    { title: tt3, href: file_formats_download[2][1] },
  ];

  const IMAGE_SRC = Config.IMGSRC + "test_tmp.png"; //file_image;
  const SVG_FILE_TYPE = Oform;
  const linkFillForm = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();
  const baseURL = typeof window !== "undefined" ? window.location.href : null;
  const linkSuggestChanges = `mailto:marketing@onlyoffice.com?subject=Suggesting changes for Form ${name}&body=Suggesting changes for Form ${name}.`;

  const [oformFill, setOformFill] = useState(false);

  // const onClickOformFill = () => {
  //   setOformFill(true);
  // };
  return (
    <StyledMainInfo maxWidth="1200px" background="#F9F9F9" {...rest}>
      <div className="template-main-info">
        <Breadcrumb categories={file_categories} name={name} />
        <Heading className="main-info-heading" label={name} />
        <Text isBold className="main-info-type-item" label={file_type_access} />
        <Box className="main-info-box">
          <div>
            <Text
              className="main-info-text"
              color="#AAAAAA"
              fontSize="14px"
              fontWeight="bold"
            >
              {t("Last update")}:{" "}
            </Text>
            <Text isBold className="main-info-text">
              {file_last_update}
            </Text>
          </div>
          <Link href={linkSuggestChanges} label={t("Suggest changes")} />
        </Box>
      </div>
      <div className="template-main-img">
        <Image src={IMAGE_SRC} />
      </div>
      <div className="template-main-description">
        <div className="file-description">
          {file_description.map((text, id) => (
            <Text
              className="main-info-description"
              label={text}
              key={`text-description-${id}`}
            />
          ))}
        </div>
        <Box className="file-info">
          <div style={{ display: "flex" }}>
            <Text isBold color="#AAAAAA">
              {t("File type")}:{" "}
            </Text>
            <ReactSVG
              className="template-image-file-type"
              src={SVG_FILE_TYPE}
            />
          </div>
          <div>
            <Text isBold color="#AAAAAA">
              {t("File size")}:{" "}
            </Text>
            <Text isBold className="file-size-text">
              {file_size}
            </Text>
          </div>
          <div>
            <Text isBold color="#AAAAAA">
              {t("Pages")}:{" "}
            </Text>
            <Text isBold className="file-pages-text">
              {file_pages}
            </Text>
          </div>
        </Box>
        <Box className="file-main-buttons">
          <Link
            target="_blank"
            style={{ width: "100%" }}
            href={`/editor?fillform=${linkFillForm}`}
          >
            <Button isScale label={t("Open and Fill")} />
          </Link>
          <ButtonSelector
            isScale
            array={array}
            defaultVal={t("Download as")}
            className="file-download-button"
          />
        </Box>
        <ShareButtonsGroup name={name} baseURL={baseURL} t={t} />
      </div>
    </StyledMainInfo>
  );
};

export default MainInfo;
