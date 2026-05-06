import { useState } from "react";
import StyledFilterItems from "./styled-filter-items";

const DEFAULT_VISIBLE = 4;

const FilterItems = ({ items = [], activeItems = [], onToggle, variant = "badge" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSwitch = variant === "switch";
  const visibleItems = isSwitch || isExpanded ? items : items.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = items.length - DEFAULT_VISIBLE;

  return (
    <StyledFilterItems className={`variant-${variant}`}>
      <div className="pills-wrap">
        {visibleItems.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`pill ${activeItems.includes(item.value) ? "active" : ""}`}
            onClick={() => onToggle?.(item.value)}
          >
            <span className="pill-label">{item.label}</span>
            {!isSwitch && <span className="pill-count">{item.count}</span>}
          </button>
        ))}

        {!isSwitch && !isExpanded && hiddenCount > 0 && (
          <button
            type="button"
            className="pill pill-more"
            onClick={() => setIsExpanded(true)}
          >
            +{hiddenCount}
          </button>
        )}
      </div>

      {!isSwitch && isExpanded && hiddenCount > 0 && (
        <button
          type="button"
          className="show-less"
          onClick={() => setIsExpanded(false)}
        >
          Show less
        </button>
      )}
    </StyledFilterItems>
  );
};

export default FilterItems;
