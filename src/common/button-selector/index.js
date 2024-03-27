import PropTypes from "prop-types";
import StyledBtnSelector from "./styled-btn-selector";
import { useState, useEffect } from "react";
import BtnMenu from "./sub-components/btn-menu";
import { ChevronDown } from "../../icons";

const ButtonSelector = ({ label, children, array, ...rest }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isActive && !event.target.closest(".btn-selector")) {
        setIsActive(false);
      }

      console.log(1)
    };

    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <StyledBtnSelector className="btn-selector" onClick={() => setIsActive(!isActive)} isActive={isActive} {...rest}>
      <div className="btn-selector-label">
        <div className="placeholder">
          {label}
        </div>
        <div className="indicator-container">
          <ChevronDown className="chevron-down" />
        </div>
      </div>

      {isActive && (
        <BtnMenu array={array} />
      )}
    </StyledBtnSelector>
  );
};

ButtonSelector.propTypes = {
  /** Set array for export list */
  array: PropTypes.array,
  /** Set default value for select item */
  defaultVal: PropTypes.string,
  typeButton: PropTypes.oneOf(["primary", "secondary"]),
};

ButtonSelector.defaultProps = {
  typeButton: "primary"
};

export default ButtonSelector;
