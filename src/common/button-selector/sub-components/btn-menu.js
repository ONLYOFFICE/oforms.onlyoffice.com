import React from "react";
import PropTypes from "prop-types";
import StyledBtnMenu from "./styled-btn-menu";

const BtnMenu = ({ className, callbackItem, array, ...rest }) => {
  return (
    <StyledBtnMenu {...rest}>
      {array.map((item, index) => (
        item.href ?
          <a key={index} href={item.href} className="dropdown-item" download={item.download} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        :
          <button key={index} onClick={item.onClick} className="dropdown-item">
            {item.title}
          </button>
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

export default BtnMenu;
