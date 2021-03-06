import React from "react";

import Box from "../../box";
import Text from "../../text";
import Button from "../../button";
import Link from "./sub-components/link";
import StyledCard from "./styled-card";
// import { NImage } from "../../image";

const Card = ({ t, callback, arrayItems, currentLanguage, ...rest }) => {
  const { attributes } = arrayItems;
  const {
    name_form,
    description_card,
    card_prewiew,
    file_oform,
    categories,
    url,
  } = attributes;
  const imgUrlCard = card_prewiew?.data?.attributes?.url;
  let oformFile = file_oform?.data?.filter((it) => {
    let checkFormatFile = it?.attributes.name.split(".")[1] === "oform";
    return checkFormatFile ? it?.attributes?.url : null;
  });
  let urlOform = oformFile[0]?.attributes?.url;

  const pathName =
    currentLanguage === "en"
      ? `/${url}`
      : `/${currentLanguage}/${url}`;

  const localeLinkEditor = 
      currentLanguage === "en"
      ? ""
      : currentLanguage;

  const fillForm = `${oformFile[0]?.attributes?.hash}.oform`;
  const linkOformEditor = `${localeLinkEditor}/editor/?filename=${url}&fillform=${fillForm}`;

  return (
    <StyledCard {...rest}>
      <Link href={pathName} className="image-boxshadow-template">
        <img
          className="card-image"
          src={imgUrlCard}
          alt={name_form}
          style={{ width: "100%", height: "100%" }}
        />
      </Link>
      <Box
        className="card-template"
        flexDirection="column"
        alignItems="stretch"
      >
        <Link
          className="title-template title-overflow-templapte"
          title={name_form}
          href={pathName}
          label={name_form}
        />
        <Text
          className="subtitle-template text-overflow-templapte"
          label={description_card}
        />
        <Box className="btn-container" justifyContent="space-between">
          <Link
            target="_blank"
            href={linkOformEditor}
            className="btn-container-link"
          >
            <Button
              isScale
              typeButton="primary"
              className="redactor-btn-template"
              label={t("FillOut")}
            />
          </Link>
          <Link href={urlOform} download className="btn-container-link">
            <Button
              isScale
              className="download-btn-template"
              typeButton="transparent"
              label={t("Download")}
            />
          </Link>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default Card;
