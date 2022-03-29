import React from "react";
import { ReactSVG } from "react-svg";

import Link from "../../../../components/link";
import Button from "../../../../components/button";
import ButtonSelector from "../../../../components/button-selector";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";

import StyledMainInfo from "./styled-main";
import Breadcrumb from "./sub-components/breadcrumb";
import ShareButtonsGroup from "./sub-components/icon-buttons";
import { GbImage } from "./sub-components/image";

// type access text
import Oform from "../../../../static/icons/oform.svg";

const MainInfo = ({ t, language, data, config, pathName, ...rest }) => {
  const { attributes } = data;
  const {
    name_form,
    template_desc,
    template_image,
    file_oform,
    file_last_update,
    file_pages,
    file_size,
  } = attributes;

  const imgUrlCard = template_image.data?.attributes?.url;
  let oformFile, docxfFile, pdfFile;

  oformFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "oform";
  });
  pdfFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "pdf";
  });
  docxfFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "docxf";
  });

  const file_description = template_desc?.split("\n");

  let dwnAs = t("DownloadAs");
  const array = [
    { title: `${dwnAs} OFORM`, href: oformFile[0]?.attributes?.url },
    { title: `${dwnAs} DOCXF`, href: docxfFile[0]?.attributes?.url },
    { title: `${dwnAs} PDF`, href: pdfFile[0]?.attributes?.url },
  ];

  const SVG_FILE_TYPE = Oform;
  const linkFillForm = name_form
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();
  const baseURL = typeof window !== "undefined" ? window.location.href : null;
  const imgTemp = typeof window !== "undefined";
  const linkSuggestChanges = `mailto:marketing@onlyoffice.com?subject=Suggesting changes for Form ${name_form}&body=Suggesting changes for Form ${name_form}.`;

  return (
    <StyledMainInfo maxWidth="1200px" background="#F9F9F9" {...rest}>
      <div className="template-main-info">
        <Breadcrumb language={language} name={name_form} t={t}/>
        <Heading className="main-info-heading" label={name_form} />
        <Text isBold className="main-info-type-item" label={t("Free")} />
        <Box className="main-info-box">
          <div className="main-info-box-tt">
            <Text
              className="main-info-text"
              color="#AAAAAA"
              fontSize="14px"
              fontWeight="bold"
            >
              {t("LastUpdate")}:{" "}
            </Text>
            <Text isBold className="main-info-text">
              {file_last_update}
            </Text>
          </div>
          <Link href={linkSuggestChanges} label={t("SuggestChanges")} />
        </Box>
      </div>
      <div className="template-main-img">
        {imgTemp && (
          <GbImage
            className="template-image"
            urlForm={imgUrlCard}
            idForm={data.id}
          />
        )}
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
              {t("FileType")}:{" "}
            </Text>
            <ReactSVG
              className="template-image-file-type"
              src={SVG_FILE_TYPE}
            />
          </div>
          <div>
            <Text isBold color="#AAAAAA">
              {t("FileSize")}:{" "}
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
            <Button isScale label={t("OpenAndFill")} />
          </Link>
          <ButtonSelector
            isScale
            array={array}
            defaultVal={t("DownloadAs")}
            className="file-download-button"
          />
        </Box>
        <ShareButtonsGroup name={name_form} baseURL={baseURL} t={t} />
      </div>
    </StyledMainInfo>
  );
};

export default MainInfo;
