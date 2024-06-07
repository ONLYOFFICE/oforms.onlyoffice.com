import StyledExternalLink from "./styled-external-link";
import PropTypes from "prop-types";

const ExternalLink = ({
    children,
    label,
    id,
    className,
    href,
    target,
    rel,
    tabIndex,
    title,
    download,
    onClick
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
  onClick: PropTypes.func
};

ExternalLink.defaultProps = {
  href: "/",
  rel: "noopener noreferrer",
  target: "_blank"
};

export default ExternalLink;
