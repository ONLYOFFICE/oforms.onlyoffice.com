import React from "react";
import Config from "../../static/data/config.json";

import Text from "../text";
import Button from "../button";
import Box from "../box";
import StyledCard from "./styled-card";
import Link from "./sub-components/link";
import Image from "./sub-components/image";

const Card = ({ t, callback, arrayItems, currentLanguage, ...rest }) => {
  const { file_formats_download, file_image, name, description_card } =
    arrayItems;

  const linkFillForm = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();
  const pathName =
    currentLanguage === "en"
      ? `/${linkFillForm}`
      : `/${currentLanguage}/${linkFillForm}`;
  const ImageSrc = `/images/oforms/en/card/${file_image}`;
  const QueryLink = `/editor?fillform=${linkFillForm}`;
  const DWNLINK = file_formats_download.filter((it) => !it.indexOf("oform"));
  const dwnFile = DWNLINK[0][1];

  return (
    <StyledCard {...rest}>
      <Link href={pathName}>
        <Image className="image-template" src={ImageSrc} />
      </Link>
      <Box
        className="card-template"
        flexDirection="column"
        alignItems="stretch"
      >
        <Link
          className="title-template text-overflow-templapte"
          title={name}
          href={pathName}
          label={name}
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
        <Link href={dwnFile} download>
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
