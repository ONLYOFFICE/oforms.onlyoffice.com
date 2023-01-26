import Box from "@components/common/box";
import Heading from "@components/common/heading";
import StyledInfoContent from "./styled";

const InfoContent = ({ t, query }) => {
 
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
