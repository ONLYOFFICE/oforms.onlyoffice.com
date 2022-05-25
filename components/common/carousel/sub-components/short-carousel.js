import Box from "@components/common/box";
import StyledShortCard from "./styled-short-carousel";
import Link from "@components/common/card/card/sub-components/link";
import Text from "@components/common/text";

const ShortCard = ({ t, callback, arrayItems, currentLanguage, description, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, card_prewiew, categories, url, description_card } = attributes;
  const imgUrlCard = card_prewiew?.data?.attributes?.url;

  const category = categories?.data[0]?.attributes?.urlReq;
  const pathName =
    currentLanguage === "en"
      ? `/form/${category}/${url}`
      : `/${currentLanguage}/form/${category}/${url}`;
  const CardDescription = () => {
    return description && (
        <Text
          className="subtitle-template text-overflow-templapte"
          label={description_card}
        />
    );
  };
  return (
    <StyledShortCard {...rest}>
      <Link href={pathName} className="image-boxshadow-template">
        <img className="card-image" src={imgUrlCard} alt={name_form} />
      </Link>
      <Box
        className="card-template"
        flexDirection="column"
        alignItems="stretch"
      >
        <Link
          className="title-template text-overflow-templapte"
          title={name_form}
          href={pathName}
          label={name_form}
        />
        {CardDescription()}
      </Box>
    </StyledShortCard>
  );
};

export default ShortCard;
