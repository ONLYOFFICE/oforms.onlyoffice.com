import React from "react";
import Config from "../../static/data/config.json";

import Text from "../text";
import Button from "../button";
import Box from "../box";

import StyledCard from "./styled-card";
import ELink from "./sub-components/link";
import Image from "./sub-components/image";

const Card = ({ t, callback, arrayItems, ...rest }) => {
  const { file_description, file_formats_download, file_image, name } =
    arrayItems;

  const pathName = `/${name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase()}`;
  const IMAGE_SRC = Config.IMGSRC + file_image;
  const DWNLINK = file_formats_download.filter((it) => !it.indexOf("oform"));
  const DWN = DWNLINK[0][1];

  const linkFillForm = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();

  return (
    <StyledCard {...rest}>
      <Image className="image-template" src={IMAGE_SRC} />
      <Box
        className="card-template"
        flexDirection="column"
        alignItems="stretch"
      >
        <ELink
          className="title-template text-overflow-templapte"
          href={pathName}
          label={name}
        />
        <Text
          className="subtitle-template text-overflow-templapte"
          label={file_description[0]}
        />
        <ELink target="_blank" href={`/editor?fillform=${linkFillForm}`}>
          <Button
            isScale
            typeButton="transparent"
            className="redactor-btn-template"
            label={"fill out"}
          />
        </ELink>
        <ELink href={DWN} download>
          <Button
            isScale
            className="download-btn-template"
            typeButton="white"
            label={"download"}
          />
        </ELink>
      </Box>
    </StyledCard>
  );
};

export default Card;
