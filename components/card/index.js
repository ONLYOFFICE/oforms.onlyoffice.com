import React, { useState } from "react";

import DocEditorAPI from "../../src/api/docEditor";
import Config from "../../static/data/config.json";

import Text from "../text";
import Link from "../link";
import Button from "../button";
import ILink from "../internal-link";
import Dropdown from "../dropdown";
import Box from "../box";

import StyledCard from "./styled-card";

import ELink from "./sub-components/link";
import ENLink from "../internal-link";
import Image from "./sub-components/image";

const Card = ({ t, callback, arrayItems, ...rest }) => {
  const {
    jsonId,
    file_categories,
    file_last_update,
    file_description,
    file_formats_download,
    file_image,
    name,
    link_oform_filling_file,
  } = arrayItems;

  //console.log("jsonId = ", jsonId);
  const IdForm = jsonId === null && name !== undefined ? 0 : jsonId;
  // Set type file to info and download
  const [typeFile, setTypeFile] = useState(true);
  const handleChangeTypeFile = () => {
    setTypeFile(!typeFile);
  };

  // TO DO: fix pathNAme
  const pathName = `/${name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase()}`;

  const IMAGE_SRC = Config.IMGSRC + file_image;
  // TO DO: delete dwn
  const DWN = `https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.oform`;

  const [oformFill, setOformFill] = useState(false);
  const onClickOformFill = (e) => {
    e.preventDefault();
    //console.log("onCLick");
    setOformFill(true);
  };

  return (
    <>
      {/* <DocEditorAPI
        id={id_item}
        name={name}
        link_oform_filling_file={link_oform_filling_file}
        check={oformFill}
      /> */}
      <StyledCard {...rest}>
        <Image className="image-template" src={IMAGE_SRC} />
        <Box
          className="card-template"
          flexDirection="column"
          alignItems="stretch"
        >
          <ELink className="title-template" href={pathName} label={name} />
          <Text className="subtitle-template" label={file_description[0]} />
          <Link target="_blank" href={`/editor?custom=${IdForm}`}>
            <Button
              isScale
              typeButton="transparent"
              className="redactor-btn-template"
              // onClick={onClickOformFill}
              label={"open"}
            />
          </Link>
          <a href={DWN} download>
            <Button
              isScale
              className="download-btn-template"
              typeButton="white"
              label={"download as"}
            />
          </a>
        </Box>
      </StyledCard>
    </>
  );
};

export default Card;
