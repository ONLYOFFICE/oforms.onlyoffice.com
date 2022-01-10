import React from "react";
import PropTypes from "prop-types";

import StyledShortCard from "./styled-short-card";

import Text from "../../../../../components/text";
import Link from "../../../../../components/link";
import Button from "../../../../../components/button";

const ShortCard = ({ title, subtitle, linkUrl, hrefButtom, t }) => {
  return (
    <StyledShortCard>
      <Text className="card-title" label={title} />
      <Text className="card-subtitle" label={subtitle} />
      <Link className="card-link" label={t("Learn more")} href={linkUrl} />
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
  /**Array item */
  array: PropTypes.array,
  /** Link tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

export default ShortCard;
