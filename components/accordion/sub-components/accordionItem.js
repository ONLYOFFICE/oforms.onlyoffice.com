import React, { useEffect, useRef, useState } from "react";
import Heading from "../../heading";
import StyledAccordionItem from "./styled-accordionItem";

const AccordionItem = ({
  heading,
  level,
  children,
  isCollapsed,
  onClick,
  ...rest

}) => {

  const content = useRef();
  const [active, setActive] = useState(false);

  return (
    <StyledAccordionItem {...rest}>
      <div className="accordion">
        <div className={`${active ? "accordion__icon" : "accordion__icon rotate"}`} >+</div>
        <Heading
          onClick={()=>setActive(!active)}
          level={level}
          style={{ cursor: "pointer" }}
        >{heading}
        </Heading>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${active ? `${content.current.scrollHeight}px` : "0px"}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{children}</div>
      </div>
    </StyledAccordionItem>
  );
};

AccordionItem.propTypes = {};

AccordionItem.defaultProps = {};

export default AccordionItem;