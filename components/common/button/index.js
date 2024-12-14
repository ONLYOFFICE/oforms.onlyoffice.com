import StyledButton from "./styled-button";
import PropTypes from "prop-types";

const Button = ({
    label,
    children,
    id,
    className,
    typeButton,
    type,
    isDisabled,
    onClick
  }) => {

  return (
    <StyledButton
      id={id}
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
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  typeButton: "primary",
  type: "button"
};

export default Button;
