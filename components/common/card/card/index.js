import React from "react";

import Box from "../../box";
import Text from "../../text";
import Button from "../../button";
import Link from "./sub-components/link";
import StyledCard from "./styled-card";
import {NImage} from "../../image";
// TODO: FIXME:

const Card = ({ t, callback, arrayItems, currentLanguage, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, description_card, card_prewiew, file_oform } = attributes;
  const imgUrlCard = card_prewiew.data?.attributes?.url;
  let oformFile = file_oform?.data?.filter((it) => {
    let checkFormatFile = it?.attributes.name.split(".")[1] === "oform";
    return checkFormatFile ? it?.attributes?.url : null;
  });
  let urlOform = oformFile[0]?.attributes?.url;

  const linkFillForm = name_form
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .replace("/", "-")
    .toLowerCase();
  const pathName =
    currentLanguage === "en"
      ? `/${linkFillForm}`
      : `/${currentLanguage}/${linkFillForm}`;
  const QueryLink = `/editor?fillform=${linkFillForm}`;

  return (
    <StyledCard {...rest}>
      <Link href={pathName}>
        <img className="card-image" src={imgUrlCard} />
      </Link>
      <Box
        className="card-template"
        flexDirection="column"
        alignItems="stretch"
      >
        <Link
          className="title-template text-overflow-templapte"
          title={name_form}
          href={pathName}
          label={name_form}
        />
        <Text
          className="subtitle-template text-overflow-templapte"
          label={description_card}
        />
        <Box className="btn-container" justifyContent="space-between">
          <Link target="_blank" href={QueryLink} className="btn-container-link">
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
