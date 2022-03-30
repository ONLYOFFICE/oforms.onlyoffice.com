import React from "react";
import PropTypes from "prop-types";
import StyledAccordion from "./styled-accordion";
import AccordionItem from "./sub-components/accordionItem";

const Accordion = ({ children, level }) => {
  const items = children.filter(item => item.type.name === 'AccordionItem');
  return (
    <StyledAccordion className="accordion__section">
      {items.map(({ props }, index) => (
        <AccordionItem
          key={index}
          heading={props.heading}
          level={level}
        >
          {props.children}
        </AccordionItem>
      ))}
    </StyledAccordion>
  );
};

Accordion.propTypes = {
  // /** The heading level */
  // level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

Accordion.defaultProps = {
  level: 4,
  tabIndex: -1,
};

export default Accordion;
