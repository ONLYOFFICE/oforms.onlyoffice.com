import { Img } from "@common/image";
import Text from "@common/text";
import { Card } from "@common/card";
import StyledCards from "./styled-cards";
import { useRouter } from "next/router";

const Cards = ({ t, data, currentLanguage, groupCheckboxIsOpen, handlerSetModal, handlerCardData, searchResults, ...rest }) => {
  const router = useRouter()
  const isDesktopClient = router.query.desktop;

  return (
    <div className={`tempalates-cards-items ${data?.length === undefined || 0 ? "no-more-result-items" : ""}`} {...rest}>
      <StyledCards className="cards" groupCheckboxIsOpen={groupCheckboxIsOpen}>
        {
          data?.length > 0 ? (
            data?.map((it, id) => (
              <Card
                className="card"
                key={id}
                arrayItems={it}
                currentLanguage={currentLanguage}
                isDesktopClient={isDesktopClient}
                handlerSetModal={handlerSetModal}
                handlerCardData={handlerCardData}
              />
            ))
          ) : data?.length === 0 ? (
            <div className="no-more-result-block">
              <Img
                src="https://static-oforms.onlyoffice.com/icons/bg-errors.react.svg"
                className="no-more-result-image"
                alt="No more results"
              />
              <Text className="no-more-result-heading" label={t("No more results...")} />
            </div>
          ) : (
            data.data?.map((it, id) => (
              <Card
                className="card"
                key={id}
                arrayItems={it}
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
