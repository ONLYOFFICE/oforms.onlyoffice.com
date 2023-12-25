import Box from "../../box";
import StyledShortCard from "./styled-short-carousel";
import Link from "../../card/card/sub-components/link";
import Text from "../../text";
import {LoupIconWrapper} from "../../card/card/styled-card";
import {Loup} from "../../../icons";
import {useTranslation} from "next-i18next";

const ShortCard = ({ callback, arrayItems, currentLanguage, description, ...rest }) => {
  const { attributes } = arrayItems;
  const { name_form, card_prewiew, url, description_card, locale } = attributes;
  const imgUrlCard = card_prewiew?.data?.attributes?.url;
  const { t } = useTranslation('common')

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
        style={{
            width: '100%'
        }}
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
