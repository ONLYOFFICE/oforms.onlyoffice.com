import React from "react";
import PropTypes from "prop-types";

import Text from "../../text";
import Link from "../../link";
import Button from "../../button";
import StyledShortCard from "./styled-short-card";

const ShortCard = ({ title, subtitle, linkUrl, hrefButtom, t }) => {
  return (
    <StyledShortCard>
      <Text className="card-title" label={title} />
      <Text className="card-subtitle" label={subtitle} />
      <Link
        className="card-link"
        target="_self"
        label={t("LearnMore")}
        href={linkUrl}
      />
      <Link href={`/editor?fillform=${hrefButtom}`}>
        <Button
          className="card-button"
          label={t("Open")}
          typeButton="transparent"
          isScale
        />
      </Link>
    </StyledShortCard>
  );
};

ShortCard.propTypes = {
  /** Array items */
  array: PropTypes.array,
  /** Link tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

export default ShortCard;
