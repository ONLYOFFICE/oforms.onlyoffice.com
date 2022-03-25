import React from "react";

import Text from "../text";
import Button from "../button";
import Box from "../box";
import StyledCard from "./styled-card";
import Link from "./sub-components/link";
import { GbImage } from "./sub-components/image";

const Card = ({ t, callback, arrayItems, currentLanguage, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, description_card, card_prewiew, file_oform } = attributes;
  const imgUrlCard = card_prewiew.data?.attributes?.url;
  let oformFile = file_oform?.data?.filter((it) => {
    let checkFormatFile = it?.attributes.name.split(".")[1] === "oform";
    return checkFormatFile ? it?.attributes?.url : null;
  });
  let urlOform = oformFile[0]?.attributes?.url;
  const imgTemp = typeof window !== "undefined";

  const linkFillForm = name_form
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();
  const pathName =
    currentLanguage === "en"
      ? `/${linkFillForm}`
      : `/${currentLanguage}/${linkFillForm}`;
  const QueryLink = `/editor?fillform=${linkFillForm}`;

  return (
    <StyledCard {...rest}>
      <Link href={pathName}>
        {imgTemp && <GbImage className="card-image" urlForm={imgUrlCard} />}
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
        <Link target="_blank" href={QueryLink}>
          <Button
            isScale
            typeButton="transparent"
            className="redactor-btn-template"
            label={t("FillOut")}
          />
        </Link>
        <Link href={urlOform} download>
          <Button
            isScale
            className="download-btn-template"
            typeButton="transparent"
            borderColor="transparent"
            borderColorHover="transparent"
            label={t("Download")}
          />
        </Link>
      </Box>
    </StyledCard>
  );
};

export default Card;
