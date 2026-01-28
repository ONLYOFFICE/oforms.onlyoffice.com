import StyledAccordion from "./styled-accordion";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useRef, useState } from "react";
import Heading from "@components/common/heading";

const Accordion = ({ locale, items }) => {
  const [activeIndexes, setActiveIndexes] = useState(Array(items.length).fill(false));
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndexes((prevActiveIndexes) => {
      const newActiveIndexes = [...prevActiveIndexes];
      newActiveIndexes[index] = !prevActiveIndexes[index];
      return newActiveIndexes;
    });
  };

  return (
    <StyledAccordion $locale={locale}>
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <button
            onClick={() => toggleAccordion(index)}
            className="accordion-header"
            type="button"
            aria-hidden={activeIndexes[index] ? true : false}
          >
            <span className={`accordion-icon ${activeIndexes[index] ? "minus" : "plus"}`}></span>
            <Heading as="span" className="accordion-heading" size={4} label={item.title} />
          </button>
          <div
            ref={(ref) => (contentRefs.current[index] = ref)}
            className={`accordion-content ${activeIndexes[index] ? "active" : ""}`}
            style={{
              maxHeight: activeIndexes[index] ? `${contentRefs.current[index]?.scrollHeight}px` : "0px"
            }}
            aria-hidden={activeIndexes[index] ? false : true}
          >
            <div className="accordion-text">{parse(item.content)}</div>
          </div>
        </div>
      ))}
    </StyledAccordion>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }))
};

export default Accordion;
