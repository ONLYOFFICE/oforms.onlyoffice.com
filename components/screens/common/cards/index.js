import { useState } from "react";
import { Img } from "@components/common/image";
import Text from "@components/common/text";
import { Card } from "@components/common/card";
import StyledCards from "./styled-cards";

const Cards = ({
  t,
  data,
  typeSortData,
  currentLanguage,
  groupCheckboxIsOpen,
  isDesktopClient,
  handlerSetModal,
  handlerCardData,
  searchResults,
  ...rest
}) => {
  const [allItems, setAllItems] = useState(data);

  return (
    <div className={`tempalates-cards-items ${data?.length === undefined || 0 ? "no-more-result-items": ""}`} {...rest}>
      <StyledCards className="cards" groupCheckboxIsOpen={groupCheckboxIsOpen}>
        {
          data?.length > 0 ? (
            data?.map((it, id) => (
              <Card
                className="card"
                key={id}
                arrayItems={it}
                t={t}
                currentLanguage={currentLanguage}
                isDesktopClient={isDesktopClient}
                handlerSetModal={handlerSetModal}
                handlerCardData={handlerCardData}
              />
            ))
          ) : data?.length === 0 ? (
            <div className="no-more-result-block">
              <Img
                src="https://static-oforms.teamlab.info/icons/bg-errors.svg"
                className="no-more-result-image"
                alt="No more results"
              />
              <Text className="no-more-result-heading" label={t("No more results...")} />
            </div>
          ) : (
            allItems?.map((it, id) => (
              <Card
                className="card"
                key={id}
                arrayItems={it}
                t={t}
                currentLanguage={currentLanguage}
                isDesktopClient={isDesktopClient}
                handlerSetModal={handlerSetModal}
                handlerCardData={handlerCardData}
              />
            ))
          )
        }
      </StyledCards>
    </div>
  );
};

export default Cards;
