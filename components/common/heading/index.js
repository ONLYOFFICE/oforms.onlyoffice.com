import React from "react";
import PropTypes from "prop-types";
import StyledHeading from "./styled-heading";

const Heading = ({ label, level, children, ...rest }) => {
  return (
    <StyledHeading as={`h${level}`} level={level} {...rest}>
      {label || children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  label: PropTypes.string,
  /** The heading level */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Text display */
  display: PropTypes.string,
  /** Text color */
  color: PropTypes.string,
  /** Text font-size */
  fontSize: PropTypes.string,
  /** Text font-weight */
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Text line height */
  lineHeight: PropTypes.string,
  /** Text-transform*/
  textTransform: PropTypes.string,
  /** Text decoration */
  textDecoration: PropTypes.string,
  /** Text align */
  textAlign: PropTypes.string,
  /** Text padding */
  padding: PropTypes.string,
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

Heading.defaultProps = {
  level: 1,
  tabIndex: -1,
};

export default Heading;
