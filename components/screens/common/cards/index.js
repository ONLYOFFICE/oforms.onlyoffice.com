import { useState } from "react";

import { Card } from "@components/common/card";
import StyledCards from "./styled-cards";

const Cards = ({
  t,
  data,
  typeSortData,
  currentLanguage,
  groupCheckboxIsOpen,
  ...rest
}) => {
  const [allItems, setAllItems] = useState(data);

  return (
    <div className="tempalates-cards-items" {...rest}>
      <StyledCards groupCheckboxIsOpen={groupCheckboxIsOpen}>
        {allItems?.map((it, id) => (
          <Card
            key={id}
            arrayItems={it}
            t={t}
            currentLanguage={currentLanguage}
          />
        ))}
      </StyledCards>
    </div>
  );
};

export default Cards;
