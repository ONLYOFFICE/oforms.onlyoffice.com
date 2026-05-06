import { useState } from "react";
import StyledFilterAccordion from "./styled-filter-accordion";

const FilterAccordion = ({ title, children, defaultOpen = false, level = 1, selectedCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <StyledFilterAccordion $level={level}>
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        <span className="accordion-title-wrap">
          <span className="accordion-title">{title}</span>
          {selectedCount > 0 && (
            <span className="accordion-badge">{selectedCount}</span>
          )}
        </span>
        <span className={`accordion-arrow ${isOpen ? "open" : ""}`} />
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-body">{children}</div>
      </div>
    </StyledFilterAccordion>
  );
};

export default FilterAccordion;
