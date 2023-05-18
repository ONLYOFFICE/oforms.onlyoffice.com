import Box from "@components/common/box";
import StyledShortCard from "./styled-short-carousel";
import Link from "@components/common/card/card/sub-components/link";
import Text from "@components/common/text";
import {LoupIconWrapper} from "@components/common/card/card/styled-card";
import {Loup} from "../../../../icons";

const ShortCard = ({ t, callback, arrayItems, currentLanguage, description, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, card_prewiew, url, description_card, locale } = attributes;
  const imgUrlCard = card_prewiew?.data?.attributes?.url;

  const pathName =
      currentLanguage === "en" && locale === "en"
      ? `/${url}`
      : locale === "en"
      ? `/${url}`
      : `/${locale}/${url}`;
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
          <LoupIconWrapper className="card-image__icon">
              <Loup size="24px" color="#FFF" />
          </LoupIconWrapper>
      </Link>
      <Box
        className="card-template"
        flexDirection="column"
        alignItems="stretch"
      >
        <Link
          className="title-template title-overflow-templapte"
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
