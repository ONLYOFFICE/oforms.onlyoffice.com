import React from "react";
import PropTypes from "prop-types";
import StyledBtnMenu from "./styled-btn-menu";


const BtnMenu = ({ className, callbackItem, array, selected, ...rest }) => {
    return (
<StyledBtnMenu {...rest}>
          {array.map((item, index) => (
            <div
              key={index} 
              onClick={()=>callbackItem(item)}
              className={"dropdownItem " + (selected === item.title
              ? "selected"
              : "")}
            >
              {item.title}
            </div>
    ))}
</StyledBtnMenu>
    );
};

BtnMenu.propTypes = {
    /** Image tab index */
    tabIndex: PropTypes.number,
    /** Accepts id */
    id: PropTypes.string,
    /** Accepts class */
    className: PropTypes.string,
  };
  
  BtnMenu.defaultProps = {
    tabIndex: -1,
};
  
  export default BtnMenu;