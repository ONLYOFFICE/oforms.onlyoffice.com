import React, { useRef, useState } from "react";
import Heading from "../../heading";
import StyledAccordionItem from "./styled-accordionItem";

const AccordionItem = ({
  heading,
  children,
  isCollapsed,
  onClick,
  ...rest
}) => {
  const content = useRef();
  const [active, setActive] = useState(false);

  return (
    <StyledAccordionItem {...rest} onClick={() => setActive(!active)}>
      <div className="accordion">
        <div className="accordion-icon">{!active ? "+" : "−"}</div>
        <Heading
          level={5}
          style={{ cursor: "pointer" }}
          className="accordion-heading"
        >
          {heading}
        </Heading>
      </div>
      <div
        ref={content}
        style={{
          maxHeight: `${active ? `${content.current.scrollHeight}px` : "0px"}`,
        }}
        className="accordion-content"
      >
        <div className="accordion-text">{children}</div>
      </div>
    </StyledAccordionItem>
  );
};

export default AccordionItem;
