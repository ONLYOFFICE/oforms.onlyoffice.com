import React from "react";

import Box from "@components/common/box";
import Link from "@components/common/link";
import Text from "@components/common/text";
import Button from "@components/common/button";
import Heading from "@components/common/heading";
import { Img } from "@components/common/image";

import StyledBanners from "./styled-banners";

const BannerOforms = ({ t, currentLanguage }) => {
  const linkReg = `https://www.onlyoffice.com/${currentLanguage}/docspace-registration.aspx?utm_source=oforms&utm_medium=top_banner&utm_campaign=registration_docspace&utm_content=use_in_the_cloud`;
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
          <Img src="https://static-oforms.onlyoffice.com/images/banners/oforms-banner.svg" width="36" height="48" />
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
