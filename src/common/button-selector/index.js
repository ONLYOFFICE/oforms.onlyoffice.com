import PropTypes from "prop-types";
import StyledBtnSelector from "./styled-btn-selector";
import { useState, useEffect, useRef } from "react";
import BtnMenu from "./sub-components/btn-menu";
import { ChevronDown } from "../../icons";

const ButtonSelector = ({ label, children, array, ...rest }) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  const onSetIsActive = (e) => {
    setIsActive(!isActive);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <StyledBtnSelector className="btn-selector" onClick={onSetIsActive} ref={dropdownRef} isActive={isActive} {...rest}>
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
