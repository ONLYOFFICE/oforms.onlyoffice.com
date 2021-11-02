import React from "react";
import PropTypes from "prop-types";
import { CloseButton, StyledPopup } from "./styled-popup";
import Portal from "../portal";

const Popup = ({
  active,
  setActive,
  children,
  ...rest
}) => {

  return (
    <Portal>
      <StyledPopup
        active={active}
        onClick={() => setActive(false)}
        {...rest}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="popup-content"
        >
          {children}
          <CloseButton onClick={() => setActive(false)} />
        </div>
      </StyledPopup>
    </Portal>
  );
}

Popup.propTypes = {
  /** */
  active: PropTypes.bool,
  /** */
  setActive: PropTypes.func,
  /** What the will trigger when clicked */
  onClick: PropTypes.func,
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
}

Popup.defaultProps = {

};

export default Popup;