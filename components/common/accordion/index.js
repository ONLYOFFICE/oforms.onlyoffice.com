import StyledAccordion from "./styled-accordion";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Heading from "@components/common/heading";
import { useRouter } from 'next/router'

const Accordion = ({ items }) => {
  const [activeIndexes, setActiveIndexes] = useState(Array(items.length).fill(false));
  const contentRefs = useRef([]);
  const router = useRouter()
  const locale = router.locale

  const toggleAccordion = (index) => {
    setActiveIndexes((prevActiveIndexes) => {
      const newActiveIndexes = [...prevActiveIndexes];
      newActiveIndexes[index] = !prevActiveIndexes[index];
      return newActiveIndexes;
    });
  };

  return (
    <StyledAccordion>
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <button className="accordion-header" onClick={() => toggleAccordion(index)}>
            <div className={`accordion-icon ${activeIndexes[index] ? "minus" : "plus"} ${locale === "ar" ? "ar" : ""}`}></div>
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
              className={`accordion-text ${locale === "ar" ? "ar" : ""}`}
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
