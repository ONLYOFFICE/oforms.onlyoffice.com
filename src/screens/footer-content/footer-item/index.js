import StyledFooterItem from "./styled-footer-item";
import { useState, useRef } from "react";
import Heading from "@common/heading";
import InternalLink from "@common/internal-link";

const FooterItem = ({ children, className, heading, href }) => {
  const content = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const onHandleClick = () => {
    window.innerWidth <= 600 && setIsOpen(!isOpen);
  };

  return (
    <StyledFooterItem isOpen={isOpen} className={className ? `footer-item-${className}` : `footer-item`}>
      {href ?
        <Heading
          className="footer-item-heading footer-item-heading-link"
          level={6}
          onClick={onHandleClick}
        >
          <InternalLink href={href} label={heading} />
        </Heading>
      :
        <Heading
          className="footer-item-heading"
          level={6}
          onClick={onHandleClick}
          label={heading}
        />
      }
      <span className={`footer-item-heading-arrow ${isOpen ? "up" : ""}`}/>
      <div ref={content} className="footer-items-group">{children}</div>
    </StyledFooterItem>
  );
};

export default FooterItem;