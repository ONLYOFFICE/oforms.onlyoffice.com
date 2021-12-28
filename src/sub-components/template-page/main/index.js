import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

import Config from "../../../../config.json";
// import DocEditor from "../../../api/docEditor";

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

import { getConfig } from "../../../api/index";
import axios from "axios";

// TO DO: simplifying
const MainInfo = ({ t, language, data, config, pathName, ...rest }) => {
  const DWN = `/static/08679248ecde06598a96a895bc766a78/ONLYOFFICE_Sample_Document.docx`;

  const array = [
    { title: "Download as DOCXF", href: DWN },
    { title: "Download as OFORM", href: DWN },
  ];

  const [typeFile, setTypeFile] = useState(0);
  const onChangeFile = () => {
    setTypeFile();
  };

  const {
    //jsonId,
    name,
    file_categories,
    file_description,
    file_image,
    file_type_access,
    file_last_update,
    file_pages,
    file_size,
    file_formats_download,
    link_oform_filling_file,
    file_link_changelog,
  } = data;

  const IMAGE_SRC = Config.IMGSRC + file_image;
  const SVG_FILE_TYPE = typeFile ? Oform : Oform; // added docx

  const baseURL = typeof window !== "undefined" ? window.location.href : null;

  const [oformFill, setOformFill] = useState(false);

  const onClickOformFill = () => {
    setOformFill(true);
  };
  return (
    <>
      {/* <DocEditor
        name={name}
        link_oform_filling_file={link_oform_filling_file}
        check={oformFill}
        id={id_item}
        config={config}
      /> */}
      <StyledMainInfo maxWidth="1200px" background="#F9F9F9" {...rest}>
        <div className="template-main-info">
          <Breadcrumb categories={file_categories} name={name} />
          <Heading className="main-info-heading" label={name} />
          <Text
            isBold
            className="main-info-type-item"
            label={file_type_access}
          />
          <Box className="main-info-box">
            <div>
              <Text className="main-info-text">{t("Last update")}: </Text>
              <Text isBold className="main-info-text">
                {file_last_update}
              </Text>
            </div>
            <Link href="#">{"Suggest_chages"}</Link>
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
              {/* <Text isBold> {file_type[typeFile]} </Text> */}
            </div>
            <div>
              <Text isBold color="#AAAAAA">
                {t("File size")}:{" "}
              </Text>
              <Text isBold>{file_size}</Text>
            </div>
            <div>
              <Text isBold color="#AAAAAA">
                {t("Pages")}:{" "}
              </Text>
              <Text isBold>{file_pages}</Text>
            </div>
          </Box>
          <Box className="file-main-buttons">
            <Button
              isScale
              label={t("Open and Fill")}
              onClick={onClickOformFill}
            />

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
    </>
  );
};

export default MainInfo;
