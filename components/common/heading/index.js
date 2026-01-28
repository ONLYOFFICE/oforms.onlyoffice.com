import StyledHeading from "./styled-heading";
import PropTypes from "prop-types";

const Heading = ({
    as,
    label,
    children,
    level = 1,
    size,
    className,
  }) => {

  return (
    <StyledHeading
      as={as || `h${level}`}
      $size={size ? size : level}
      className={className}
    >
      {label || children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  as: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
};

export default Heading;
