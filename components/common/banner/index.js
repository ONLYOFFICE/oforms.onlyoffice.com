import React from "react";

import Box from "../box";
import Link from "../link";
import Text from "../text";
import Button from "../button";
import Heading from "../heading";
import { Img } from "../image";

import StyledBanners from "./styled-banners";

const BannerOforms = ({ t, currentLanguage }) => {
  const linkReg = `https://www.onlyoffice.com/${currentLanguage}/registration.aspx`;
  const linkDesktop = `https://www.onlyoffice.com/${currentLanguage}/download-desktop.aspx#desktop`;

  return (
    <StyledBanners>
      <Box
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        className="box-banner"
      >
        <Box className="box-banner-sec">
          <Img src="/images/banners/oforms-banner.svg" width="36" height="48" />
          <Heading level={3} className="banner_heading">
            {t("BannerBuildYourOwnForms")}
          </Heading>
        </Box>
        <Text isInline={false} className="text-banner">
          {t("BannerUseToCreate")}
        </Text>
      </Box>
      <Box className="banner_buttons" justifyContent="center">
        <Link className="link" href={linkReg}>
          <Button className="buttons" label={t("UseInTheCloud")} />
        </Link>
        <Link className="link" href={linkDesktop}>
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
