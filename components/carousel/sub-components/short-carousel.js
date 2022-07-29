import React from "react";

import Box from "../../box";
import StyledShortCard from "./styled-short-carousel";
import Link from "../../card/sub-components/link";
import { GbImage } from "../../card/sub-components/image";

const ShortCard = ({ t, callback, arrayItems, currentLanguage, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, card_prewiew, file_oform } = attributes;
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
    .replace("/", "-")
    .toLowerCase();
  const pathName =
    currentLanguage === "en"
      ? `/${linkFillForm}`
      : `/${currentLanguage}/${linkFillForm}`;
  const QueryLink = `/editor?fillform=${linkFillForm}`;

  return (
    <StyledShortCard {...rest}>
      <Link href={pathName} className="image-boxshadow-template">
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
      </Box>
    </StyledShortCard>
  );
};

export default ShortCard;
