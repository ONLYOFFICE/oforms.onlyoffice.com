import Text from "@common/text";
import Button from "@common/button";
import { Img } from "@common/image";
import InternalLink from "@common/internal-link";

import Styled404 from "./styled";

const Error404 = ({ t }) => {
  return (
    <Styled404>
      <Img
        src="https://static-oforms.onlyoffice.com/icons/bg-errors.svg"
        className="page-error-404-image"
        alt="page-error-404"
      />
      <div className="page-error-404-container">
        <Text className="page-error-404-heading" label={t("404Error!")} />
        <Text
          className="page-error-404-description"
          label={t("404Descdription")}
        />
        <InternalLink className="page-error-404-btn" href="/" color="red">
          <Button label={t("GoToHomePage")} />
        </InternalLink>
      </div>
    </Styled404>
  );
};

export default Error404;
