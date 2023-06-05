import React from "react";
import PropTypes from "prop-types";
import StyledButton from "./styled-button";

const Button = ({
  label,
  isDisabled,
  themeButton,
  isSubmit,
  isScale,
  ...rest
}) => {
  return (
    <StyledButton
      disabled={isDisabled}
      type={isSubmit ? "submit" : undefined}
      isScale={isScale ? isScale : undefined}
      {...rest}
    >
      {label}
    </StyledButton>
  );
};

Button.propTypes = {
  /** Button text */
  label: PropTypes.string,
  /** Tells type of button style */
  typeButton: PropTypes.oneOf(["primary", "secondary", "transparent", "white"]),
  /** Tells when the button should present a disabled state */
  isDisabled: PropTypes.bool,
  /** Width of button */
  width: PropTypes.string,
  /** Height of button */
  height: PropTypes.string,
  /** Scale width of button to 100% */
  isScale: PropTypes.bool,
  /** Propority button hover */
  isHover: PropTypes.bool,
  /** Takes the path to the icon (the icon must be located in a static folder)  */
  icon: PropTypes.string,
  /** Button tab index */
  tabIndex: PropTypes.number,
  /** Accepts class */
  className: PropTypes.string,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Sets the nim width of the button */
  minwidth: PropTypes.string,
  /** What the button will trigger when clicked */
  onClick: PropTypes.func,
  /** If the button should submit the form */
  isSubmit: PropTypes.bool,
};

Button.defaultProps = {
  label: "",
  typeButton: "primary",
  width: "auto",
  height: "56px",
  icon: null,
  tabIndex: -1,
  minwidth: "unset",
  isDisabled: false,
};

export default Button;
