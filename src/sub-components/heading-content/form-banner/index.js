import React from "react";
import { ReactSVG } from "react-svg";
import { Trans } from "gatsby-plugin-react-i18next";

import StyledFormBanner from "./styled-form-banner";

import Box from "../../../../components/box";
import Heading from "../../../../components/heading";
import Button from "../../../../components/button";
import Text from "../../../../components/text";
import Link from "../../../../components/link";

const FormBanner = ({ t, labelPrice, labelName, link }) => {
  const price = labelPrice.toLowerCase();
  const HeadingBanner = (
    <Heading className="header" fontSize="24px" fontWeight="700" level={3}>
      {t("HowToCreateATemplate", { price, labelName })}
    </Heading>
  );
  return (
    <StyledFormBanner>
      <Box
        className="conteiner"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flexDirection="column" alignItems="flex-start">
          <Box className="banner_title">
            <ReactSVG
              src="/icons/pensil-icon.react.svg"
              height="33px"
              width="33px"
            />
            {HeadingBanner}
          </Box>
          <Box
            className="box-items"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Text className="item_text">
              <span style={{ fontWeight: "700" }}>1.</span> {t("ClickFillOut")}{" "}
            </Text>
            <Text className="item_text">
              <span style={{ fontWeight: "700" }}>2.</span>{" "}
              {t("FillInTheNecessary")}{" "}
            </Text>
            <Text className="item_text">
              <span style={{ fontWeight: "700" }}>3.</span>{" "}
              {t("DownloadTheReadyDoc")}{" "}
            </Text>
          </Box>
        </Box>
        <Link href={link} className="box-button">
          <Button label={t("FillOut")} width="164px" height="56px" />
        </Link>
      </Box>
    </StyledFormBanner>
  );
};

export default FormBanner;
