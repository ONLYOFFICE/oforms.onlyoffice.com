import StyledInternalLink from "./styled-internal-link";
import PropTypes from "prop-types";

const InternalLink = ({
    children,
    label,
    id,
    className,
    href,
    target,
    tabIndex,
    title,
    locale,
    onClick
  }) => {

  return (
    <StyledInternalLink
      id={id}
      className={`internal-link ${className ? className : ""}`}
      href={href}
      target={target}
      tabIndex={tabIndex}
      title={title}
      locale={locale}
      onClick={onClick}
    >
      {children || label}
    </StyledInternalLink>
  );
};

InternalLink.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.oneOf(["_blank", "_self", "_parent", "_top"]),
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  locale: PropTypes.string,
  onClick: PropTypes.func
};

InternalLink.defaultProps = {
  href: "/",
};

export default InternalLink;
