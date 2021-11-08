import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types";
import StyledInternalLink from "./styled-internal-link";

const InternalLink = ({
  to,
  className,
  children,
  label,
  ...rest
}) => { const ClassNameInternalLink = className ?
    className + "-internal-link"
    : "internal-link";

  return (
    <StyledInternalLink
        as={Link}
        to={to}
        className={ClassNameInternalLink}
        {...rest}
        >
            {children || label}
    </StyledInternalLink>
  );
}

InternalLink.propTypes = {
  /** Link text */
  label: PropTypes.string,
  /** Link text color */
  color: PropTypes.string,
  /** Link text font-size */
  fontSize: PropTypes.string,
  /** Link text font-weight */
  fontWeight: PropTypes.string,
  /** Link text text-transform */
  textTransform: PropTypes.string,
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
  /** Used as HTML 'href' property */
  to: PropTypes.string,
  /** Used as HTML 'title' property */
  title: PropTypes.string,
  /** Link text-decoration */
  textDecoration: PropTypes.string,
  /** Link hover text-decoration  */
  hoverTextDecoration: PropTypes.string,
  /** What the link will trigger when clicked */
  onClick: PropTypes.func,
  /** Link tab index */
  tabIndex: PropTypes.number,
  /** The target attribute specifies where the linked document will open when the link is clicked */
  target: PropTypes.oneOf(["_blank", "_self", "_parent", "_top"]),
  /** Attribute defines the relationship between a linked resource and the current document */
  rel: PropTypes.string,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
}

InternalLink.defaultProps = {
  label: undefined,
  to: undefined,
  title: undefined,
  rel: "noopener noreferrer",
  isInline: true,
  isHoverText: true,
  isItalic: false,
  isBold: false,
  truncate: false,
  tabIndex: -1,
  target: "_blank",
}


export default InternalLink;