import React from "react";
import PropTypes from "prop-types";
import StyledText from "./styled-text";

const Text = ({
  as,
  label,
  children,
  ...rest
}) => {
  return (
    <StyledText as={as ? as : "span"} {...rest}>
      {label || children}
    </StyledText>
  );
}

Text.propTypes = {
  /** Text height */
  height: PropTypes.string,
  /** Text width */
  width: PropTypes.string,
  /** Text padding */
  padding: PropTypes.string,
  /** Text margin */
  margin: PropTypes.string,
  /** Text color */
  color: PropTypes.string,
  /** Text font-size */
  fontSize: PropTypes.string,
  /** Text font-weight */
  fontWeight: PropTypes.number,
  /** Text font-style */
  fontStyle: PropTypes.string,
  /** Text line-height */
  lineHeight: PropTypes.string,
  /** Text-align */
  textAlign: PropTypes.string,
  /** Text-transform */
  textTransform: PropTypes.string,
  /** Text-decoration */
  textDecoration: PropTypes.string,
  /** Text-shadow */
  textShadow: PropTypes.string,
  /** Text-overflow */
  textOverflow: PropTypes.string,
  /** overflow */
  overflow: PropTypes.string,
  /** Text cursor */
  cursor: PropTypes.string,
  /** Disables word wrapping */
  truncate: PropTypes.bool,
  /** Sets font weight value ​​to bold */
  isBold: PropTypes.bool,
  /** Sets the 'display: inline-block' property */
  isInline: PropTypes.bool,
  /** Sets the font style */
  isItalic: PropTypes.bool,
  /** Sets the 'display' property */
  display: PropTypes.string,
  /** Text is hover  */
  isHoverText: PropTypes.bool,
  /** Text hover color */
  hoverColor: PropTypes.string,
  /** Text hover transform */
  hoverTextTransform: PropTypes.string,
  /** Text hover shadow */
  hoverTextShadow: PropTypes.string,
  /** Text hover decoration */
  hoverTextDecoration: PropTypes.string,
  /** Text hover cursor */
  hoverCursor: PropTypes.string,
  /** Change `html` tag */
  as: PropTypes.string,
  /** What the will trigger when clicked */
  onClick: PropTypes.func,
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
}

Text.defaultProps = {
  color: "#333333",
  fontSize: "14px",
  isInline: true,
  isHoverText: false,
  isItalic: false,
  isBold: false,
  truncate: false,
  tabIndex: -1,
};

export default Text;