import React, { useState } from "react";
import StyledDropdown from "./styled-dropdown"
import PropTypes from "prop-types";
import Label from "./sub-components/label";
import DropdownMenu from "./sub-components/dropdown-menu"
import onClickOutSide from 'react-onclickoutside'

function Dropdown({
  defaultVal,
  label,
  level,
  array,
  ...rest
}) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(defaultVal);
  //console.log(selected);
  Dropdown.handleClickOutside = () => setIsActive(false);
  return (
    <StyledDropdown {...rest}>
      <Label
        onClick={(e) => setIsActive(!isActive)}
        selected={selected}
        level={level}
      />
      {isActive && (
        <DropdownMenu
          callbackItem={(item) => { setSelected(item); setIsActive(false); }}
          array={array}
        />
      )}
    </StyledDropdown>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

Dropdown.propTypes = {
  /** Set array for export list */
  array: PropTypes.array,
  /** Set label before dropdown */
  label: PropTypes.string,
  /** Set default value for select item */
  defaultVal: PropTypes.string,
  /** The heading level */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** External link tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  array: [
    'All',
    'Plugins',
    'Apps',
  ],
  defaultVal: 'All',
  level: 2,
  lineHeight: "133%"
};

export default onClickOutSide(Dropdown, clickOutsideConfig);
