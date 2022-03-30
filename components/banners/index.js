import React from "react";
import { ReactSVG } from "react-svg";

import StyledBanners from "./styled-banners";

import Box from "../box";
import Link from "../link";
import Text from "../text";
import Button from "../button";
import Heading from "../heading";

const BannerOforms = ({ t, currentLanguage }) => {
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
            {t("BannerBuildYourOwnForms")}
          </Heading>
        </Box>
        <Text
          color="#fff"
          isInline={false}
          display="block"
          className="text-banner"
          fontSize="16px"
        >
          {t("BannerUseToCreate")}
        </Text>
      </Box>
      <Box className="banner_buttons " justifyContent="center">
        <Link
          className="link"
          href={`https://www.onlyoffice.com/${currentLanguage}/registration.aspx`}
        >
          <Button className="buttons" label={t("UseInTheCloud")} />
        </Link>
        <Link
          className="link "
          href={`https://www.onlyoffice.com/${currentLanguage}/download-desktop.aspx#desktop`}
        >
          <Button
            className="buttons"
            id="btn-type"
            label={t("DownloadDesktopApp")}
            typeButton="transparent"
          />
        </Link>
      </Box>
    </StyledBanners>
  );
};

export default BannerOforms;
