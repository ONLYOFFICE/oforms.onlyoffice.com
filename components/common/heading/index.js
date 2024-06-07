import StyledHeading from "./styled-heading";
import PropTypes from "prop-types";

const Heading = ({
    label,
    children,
    level,
    className,
    dangerouslySetInnerHTML,
    onClick
  }) => {

  return (
    <StyledHeading
      as={`h${level}`}
      level={level}
      className={className}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      onClick={onClick}
    >
      {label || children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  dangerouslySetInnerHTML: PropTypes.shape({ __html: PropTypes.string})
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
