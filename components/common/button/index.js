import StyledButton from "./styled-button";
import PropTypes from "prop-types";

const Button = ({
    label,
    children,
    className,
    typeButton,
    type,
    isDisabled,
    onClick
  }) => {

  return (
    <StyledButton
      className={className}
      typeButton={typeButton}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label || children}
    </StyledButton>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  typeButton: PropTypes.oneOf(["primary", "secondary"]),
  type: PropTypes.oneOf(["submit", "button"]),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  typeButton: "primary",
  type: "button"
};

export default Button;
