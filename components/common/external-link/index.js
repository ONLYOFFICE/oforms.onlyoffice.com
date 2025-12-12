import StyledExternalLink from "./styled-external-link";
import PropTypes from "prop-types";

const ExternalLink = ({
    children,
    label,
    id,
    className,
    href = "/",
    target = "_blank",
    rel = "noopener noreferrer",
    tabIndex,
    title,
    download,
    onClick,
    color = "inherit",
    textDecoration = "none"
  }) => {

  return (
    <StyledExternalLink
      id={id}
      className={className ? `external-link ${className}` : "external-link"}
      href={href}
      target={target}
      rel={rel}
      tabIndex={tabIndex}
      title={title}
      download={download}
      onClick={onClick}
      $color={color}
      $textDecoration={textDecoration}
    >
      {children || label}
    </StyledExternalLink>
  );
};

ExternalLink.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.oneOf(["_blank", "_self", "_parent", "_top"]),
  rel: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  download: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  textDecoration: PropTypes.string
};

export default ExternalLink;
