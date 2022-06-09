import React from "react";
import PropTypes from "prop-types";
import StyledSeparator from "./styled-separator";
import Text from "../text";

const Separator = ({ fontSize, fontWeight, children, ...rest }) => {
  return (
    <StyledSeparator {...rest}>
      <div />
      <Text as="span" fontSize={fontSize} fontWeight={fontWeight}>
        {children}
      </Text>
      <div />
    </StyledSeparator>
  );
};

Separator.propTypes = {
  /**   Separator color */
  color: PropTypes.string,
  /**   Separator height */
  height: PropTypes.string,
  /**   Separator text padding */
  padding: PropTypes.string,
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**  Accepts tab Index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
  /** To set font-size */
  fontSize: PropTypes.string,
  /** To set font-weight */
  fontWeight: PropTypes.string,
};

Separator.defaultProps = {
  height: "1px",
  tabIndex: -1,
};

export default Separator;
