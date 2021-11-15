import React from "react";
import PropTypes from "prop-types";
import StyledDropdownMenu from "./styled-dropdown-menu";


const DropdownMenu = ({ className, callbackItem, array, selected, ...rest }) => {
    return (
<StyledDropdownMenu>
          {array.map((item, index) => (
            <div
              key={index} 
              onClick={()=>callbackItem(item)}
              className={"dropdownItem " + (selected === item
              ? "selected"
              : null)}
            >
              {item}
            </div>
    ))}
</StyledDropdownMenu>
    );
};

DropdownMenu.propTypes = {
    /** Image tab index */
    tabIndex: PropTypes.number,
    /** Accepts id */
    id: PropTypes.string,
    /** Accepts class */
    className: PropTypes.string,
  };
  
DropdownMenu.defaultProps = {
    tabIndex: -1,
};
  
  export default DropdownMenu;