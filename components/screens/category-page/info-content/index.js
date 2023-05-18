import Box from "@components/common/box";
import Text from "@components/common/text";
import Heading from "@components/common/heading";
import StyledInfoContent from "./styled";

const InfoContent = ({ t, category, header }) => {
 
  return (
    <StyledInfoContent
        padding="56px 0 90px"
        tabletPadding="46px 0 70px"
        mobileLPadding="36px 0 50px"
    >
      <Box
        className="category-box"
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
      >
        <Heading className="category-heading" level={1} label={category} />
          { header ? (
            <Text
            className="category-description"
            label={header}
            id="forms"
            />
            ) : (
            <Text
            className="category-description"
            label={t("SubHeadingCategoryPage")}
            id="forms"
            />
            )            
          }          
      </Box>
    </StyledInfoContent>
  );
};

export default InfoContent;
