import { useState } from "react";

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
  ...rest
}) => {
  const [allItems, setAllItems] = useState(data);

  return (
    <div className="tempalates-cards-items" {...rest}>
      <StyledCards className="cards" groupCheckboxIsOpen={groupCheckboxIsOpen}>
        {allItems?.map((it, id) => (
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
        ))}
      </StyledCards>
    </div>
  );
};

export default Cards;
