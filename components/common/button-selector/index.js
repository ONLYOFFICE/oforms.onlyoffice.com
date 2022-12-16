import React, { useState } from "react";
import onClickOutSide from "react-onclickoutside";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import StyledBtnSelector from "./styled-btn-selector";
import BtnMenu from "./sub-components/btn-menu";

const ButtonSelector = ({
  isScale,
  label,
  array,
  children,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const [href, setHref] = useState();

  ButtonSelector.handleClickOutside = () => setIsActive(false);

  const onSetIsActive = (e) => {
    setIsActive(!isActive);
  };

  const classNameIndicator = `chevronContainer ${isActive ? "up" : ""}`;
  return (
    <StyledBtnSelector {...rest} isScale={isScale} isActive={isActive} onClick={onSetIsActive}>
      <div className="placeholder" download >
        {label}
      </div>
      <div className="indicatorContainer">
        <span className="indicatorSeparator" />
        <ReactSVG
          className={classNameIndicator}
          src="https://static-oforms.teamlab.info/icons/chevron-down.react.svg"
          height="24px"
          width="24px"
        />
      </div>
      {isActive && (
        <BtnMenu
          callbackItem={(item) => {
            setHref(item.href);
            setIsActive(false);
          }}
          array={array}
        />
      )}
    </StyledBtnSelector>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => ButtonSelector.handleClickOutside,
};

ButtonSelector.propTypes = {
  /** Set array for export list */
  array: PropTypes.array,
  /** Set default value for select item */
  defaultVal: PropTypes.string,
};

ButtonSelector.defaultProps = {
  array: [
    { title: "Download as DOCXF", href: "/404" },
    { title: "Download as OFORM", href: "/401" },
  ],
  defaultVal: "Download as",
};

export default onClickOutSide(ButtonSelector, clickOutsideConfig);
