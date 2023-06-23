import Box from "@common/box";
import Heading from "@common/heading";
import StyledInfoContent from "./styled";
import {useTranslation} from "next-i18next";

const InfoContent = ({ query }) => {
 const { t } = useTranslation('common')
  return (
    <StyledInfoContent>
      <Box
        className="category-box"
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
      >
        <Heading className="category-heading" level={1} label={query ? `${t("Search results for")} '${query}'` : t("Search results")} />
      </Box>
    </StyledInfoContent>
  );
};

export default InfoContent;
