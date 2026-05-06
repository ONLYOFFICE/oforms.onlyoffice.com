import { useId, useState } from "react";
import StyledFilterAccordion from "./styled-filter-accordion";

const FilterAccordion = ({ title, children, defaultOpen = false, level = 1, selectedCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <StyledFilterAccordion $level={level}>
      <button
        type="button"
        className="accordion-header"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="accordion-title-wrap">
          <span className="accordion-title">{title}</span>
          {selectedCount > 0 && (
            <span className="accordion-badge" aria-label={`${selectedCount} selected`}>
              {selectedCount}
            </span>
          )}
        </span>
        <span className={`accordion-arrow ${isOpen ? "open" : ""}`} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        className={`accordion-content ${isOpen ? "open" : ""}`}
        role="region"
      >
        <div className="accordion-body">{children}</div>
      </div>
    </StyledFilterAccordion>
  );
};

export default FilterAccordion;
