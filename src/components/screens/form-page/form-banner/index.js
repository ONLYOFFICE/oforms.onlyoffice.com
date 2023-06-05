import Box from "@common/box";
import Text from "@common/text";
import Link from "@common/link";
import Button from "@common/button";
import Heading from "@common/heading";
import StyledFormBanner from "./styled-form-banner";
import {useTranslation} from "next-i18next";

const FormBanner = ({ labelName, link }) => {
  const { t } = useTranslation('common')
  const HeadingBanner = (
    <Heading className="header" fontSize="24px" fontWeight="700" level={3}>
      {t("HowToCreateATemplate", { labelName })}
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
            {/*eslint-disable*/}
            <img
              src="https://static-oforms.onlyoffice.com/icons/pensil-icon.svg"
              height="33px"
              width="33px"
            />
            {/*eslint-enable*/}
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
