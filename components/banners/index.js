import React from "react";
import { ReactSVG } from "react-svg";

import StyledBanners from "./styled-banners";

import Box from "../box";
import Link from "../link";
import Text from "../text";
import Button from "../button";
import Heading from "../heading";

const BannerOforms = ({ t }) => {
  return (
    <StyledBanners>
      <Box
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        className="box-banner"
      >
        <Box className="box-banner-sec">
          <ReactSVG src="/images/banners/oforms-banner.svg" />
          <Heading
            color="#fff"
            as="h3"
            fontSize="24px"
            lineHeight="1.33em"
            className="banner_heading"
          >
            {t("Build your own forms")}
          </Heading>
        </Box>
        <Text
          color="#fff"
          isInline={false}
          display="block"
          className="text-banner"
          fontSize="16px"
        >
          {t(
            "Use ONLYOFFICE to create document forms for any purpose and instantly share them with other users"
          )}
        </Text>
      </Box>
      <Box className="banner_buttons " justifyContent="center">
        <Link
          className="link"
          href="https://www.onlyoffice.com/registration.aspx"
        >
          <Button className="buttons" label={"Use in the cloud"} />
        </Link>
        <Link
          className="link "
          href="https://www.onlyoffice.com/download-desktop.aspx#desktop"
        >
          <Button
            className="buttons"
            id="btn-type"
            label={"Download desktop app"}
            typeButton="transparent"
          />
        </Link>
      </Box>
    </StyledBanners>
  );
};

export default BannerOforms;
