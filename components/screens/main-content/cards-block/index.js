import StyledCardsBlock from "./styled-cards-block";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";
import Card from "@components/screens/common/card";

const CardsBlock = ({ className, t, title, linkUrl, data }) => {
  return (
    <StyledCardsBlock className={`cards-block ${className ? className : ""}`}>
      <div className="cards-block-top">
        <Heading className="cards-block-title" level={3} label={title} />
        <InternalLink className="cards-block-link" href={linkUrl} label={t("Show all")} />
      </div>
      
      <div className="cards-block-list">
        {data.data.map((data, index) => (
          <Card t={t} data={data} key={index} />
        ))}
      </div>
    </StyledCardsBlock>
  );
};

export default CardsBlock;