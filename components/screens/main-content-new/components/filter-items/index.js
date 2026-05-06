import { useState } from "react";
import StyledFilterItems from "./styled-filter-items";

const DEFAULT_VISIBLE = 4;

const FilterItems = ({ items = [], activeItems = [], onToggle, variant = "badge", level = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSwitch = variant === "switch";
  const visibleItems = isSwitch || isExpanded ? items : items.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = items.length - DEFAULT_VISIBLE;

  return (
    <StyledFilterItems className={`variant-${variant}`} $level={level}>
      <ul className="pills-wrap">
        {visibleItems.map((item) => {
          const isActive = activeItems.includes(item.value);
          return (
            <li key={item.value} className="pills-wrap__item">
              <button
                type="button"
                className={`pill ${isActive ? "active" : ""}`}
                aria-pressed={isSwitch ? undefined : isActive}
                onClick={() => onToggle?.(item.value)}
              >
                <span className="pill-label">{item.label}</span>
                {!isSwitch && <span className="pill-count">{item.count}</span>}
              </button>
            </li>
          );
        })}

        {!isSwitch && !isExpanded && hiddenCount > 0 && (
          <li className="pills-wrap__item">
            <button
              type="button"
              className="pill pill-more"
              onClick={() => setIsExpanded(true)}
              aria-label={`Show ${hiddenCount} more filters`}
            >
              +{hiddenCount}
            </button>
          </li>
        )}
      </ul>

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
