import Box from "@components/common/box";
import StyledShortCard from "./styled-short-carousel";
import Link from "@components/common/card/card/sub-components/link";

const ShortCard = ({ t, callback, arrayItems, currentLanguage, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, card_prewiew, categories, url } = attributes;
  const imgUrlCard = card_prewiew?.data?.attributes?.url;

  const category = categories?.data[0]?.attributes?.urlReq;
  const pathName =
    currentLanguage === "en"
      ? `/form/${category}/${url}`
      : `/${currentLanguage}/form/${category}/${url}`;

  return (
    <StyledShortCard {...rest}>
      <Link href={pathName} className="image-boxshadow-template">
        <img className="card-image" src={imgUrlCard} />
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
      </Box>
    </StyledShortCard>
  );
};

export default ShortCard;
