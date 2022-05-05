import React from "react";
import PropTypes from "prop-types";
import StyledBox from "./styled-box";

const Box = ({ as, className, children, ...rest }) => {
  const ClassNameBox = className ? `${className} box` : `box`;

  return (
    <StyledBox as={as} className={ClassNameBox} {...rest}>
      {children}
    </StyledBox>
  );
};

Box.propTypes = {
  /** Set background for box */
  background: PropTypes.string,
  /** Set border for box */
  border: PropTypes.string,
  /** Set justifyContent for box */
  justifyContent: PropTypes.string,
  /** Set alignItems for box */
  alignItems: PropTypes.string,
  /** Set flexWrap for box */
  flexWrap: PropTypes.string,
  /** Set flexDirection for box */
  flexDirection: PropTypes.string,
  /** Set alignContent for box */
  alignContent: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
  /** Accepts id */
  id: PropTypes.string,
  /** Link tab index */
  tabIndex: PropTypes.number,
  /** Accepts css style  */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Box.defaultProps = {
  background: "unset",
  border: "none",
  justifyContent: "start",
  alignItems: "center",
  flexWrap: "nowrap",
  flexDirection: "row",
  alignContent: "flex-start",
  tabIndex: -1,
};

export default Box;
