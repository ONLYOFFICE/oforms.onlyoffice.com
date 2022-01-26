import React, { useRef } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import StyledFooterItem from "./styled-footer-item";
import Heading from "../../../../components/heading";

const FooterItem = ({ dis, children, className, heading, ...rest }) => {
  const content = useRef();
  const [isOpen, setIsOpen] = React.useState(false);

  const onHandleClick = (e) => {
    e.preventDefault();
    window.innerWidth <= 1024 && setIsOpen(!isOpen);
  };

  const footerItemClassName = className
    ? `footer-item-${className}`
    : `footer-item`;

  return (
    <StyledFooterItem isOpen={isOpen} className={footerItemClassName} {...rest}>
      <Heading
        className="footer-item-heading"
        level={6}
        onClick={dis && onHandleClick}
        label={heading}
      />
      <ReactSVG
        className={"footer-item-heading-arrow " + (isOpen ? "up" : "")}
        src="/icons/chevron-down.react.svg"
        height="24px"
        width="24px"
      />
      <div
        ref={content}
        style={{
          maxHeight: `${
            isOpen ? `${content.current.scrollHeight + 40}px` : ""
          }`,
        }}
        className="footer-items-group"
      >
        {children}
      </div>
    </StyledFooterItem>
  );
};

FooterItem.propTypes = {
  heading: PropTypes.string,
  className: PropTypes.string,
};

export default FooterItem;
