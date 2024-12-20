import StyledAccordion from "./styled-accordion";
import PropTypes from "prop-types";
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
    <StyledAccordion locale={locale}>
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <button className="accordion-header" onClick={() => toggleAccordion(index)}>
            <div className={`accordion-icon ${activeIndexes[index] ? "minus" : "plus"}`}></div>
            <Heading className="accordion-heading" level={4} label={item.title} />
          </button>
          <div
            ref={(ref) => (contentRefs.current[index] = ref)}
            className="accordion-content"
            style={{
              maxHeight: activeIndexes[index] ? `${contentRefs.current[index]?.scrollHeight}px` : "0px"
            }}
          >
            <div
              className="accordion-text"
              dangerouslySetInnerHTML={{ __html: item.content }}
              suppressHydrationWarning
            ></div>
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
