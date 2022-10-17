import React from "react";
import PropTypes from "prop-types";
import StyledBtnMenu from "./styled-btn-menu";

const BtnMenu = ({ className, callbackItem, array, selected, ...rest }) => {
  return (
    <StyledBtnMenu {...rest}>
      {array.map((item, index) => (
        <a target="_blank"
          key={index}
          href={item.href}
          className={`dropdownItem ${
            selected === item?.title ? "selected" : ""
          }`}
          download
        >
          {item.title}
        </a>
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
