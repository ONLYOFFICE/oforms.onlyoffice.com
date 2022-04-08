import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledBtnSelector from "./styled-btn-selector";
import BtnMenu from "./sub-components/btn-menu";
import onClickOutSide from "react-onclickoutside";
import { ReactSVG } from "react-svg";
import Link from "../link";

const ButtonSelector = ({
  isScale,
  label,
  array,
  children,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(array[0].title);
  const [href, setHref] = useState(array[0].href);
  ButtonSelector.handleClickOutside = () => setIsActive(false);

  return (
    <StyledBtnSelector {...rest} isScale={isScale}>
      <Link
        className="placeholder"
        typeButton="secondary"
        label={selected}
        href={href}
        download
      />
      <div
        className="indicatorContainer"
        onMouseEnter={(e) => setIsActive(true)}
      >
        <span className="indicatorSeparator"></span>
        <ReactSVG
          className={"chevronContainer " + (isActive ? "up" : "")}
          src="/icons/chevron-down.react.svg"
          height="24px"
          width="24px"
        />
      </div>

      {isActive && (
        <BtnMenu
          callbackItem={(item) => {
            setSelected(item.title);
            setHref(item.href);
            setIsActive(false);
          }}
          onMouseLeave={(e) => setIsActive(!isActive)}
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
};

export default onClickOutSide(ButtonSelector, clickOutsideConfig);
