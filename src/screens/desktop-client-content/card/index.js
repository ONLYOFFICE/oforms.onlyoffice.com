import StyledCard from "./styled-card";
import Heading from "@common/heading";

const Card = ({ data, handleCardData, theme }) => {
  return (
    <StyledCard onClick={() => handleCardData(data)} theme={theme}>
      <img className="card-img" src={data.attributes.card_prewiew?.data?.attributes?.url} alt={data.attributes.name_form} />
      <Heading className="card-title" level={4} label={data.attributes.name_form} />
    </StyledCard>
  );
};

export default Card;
