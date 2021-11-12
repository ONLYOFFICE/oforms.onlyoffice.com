import React, {useEffect, useRef} from "react";
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

    return (
      <StyledAccordionItem>
        <div className="accordion">
          <div className={`${isCollapsed ? "accordion__icon" : "accordion__icon rotate" }`} >+</div>
          <Heading
            onClick={onClick}
            level={level}
            style={{cursor: "pointer"}}
          >{heading}
          </Heading>
        </div>
        <div 
          ref={content}
          style={{ maxHeight: `${!isCollapsed ? `${content.current.scrollHeight}px` : "0px"}` }}
          className="accordion__content"
        >
          <div className="accordion__text">{children}</div>
        </div>
      </StyledAccordionItem>
    );
  };

  AccordionItem.propTypes = {

  };
  
  AccordionItem.defaultProps = {

  };
  
  export default AccordionItem;