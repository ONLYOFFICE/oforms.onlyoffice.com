import React from "react";
import PropTypes from "prop-types";
import StyledScrollbar from "./styled-scrollbar";

const scrollbarType = {
  smallWhite: {
    thumbV: {
      width: "2px",
      marginLeft: "2px",
      borderRadius: "inherit",
    },
    thumbH: {
      height: "2px",
      marginTop: "2px",
      borderRadius: "inherit",
    },
    view: { outline: "none", WebkitOverflowScrolling: "auto" },
  },
  smallBlack: {
    thumbV: {
      width: "3px",
      marginLeft: "2px",
      borderRadius: "inherit",
    },
    thumbH: {
      height: "3px",
      marginTop: "2px",
      borderRadius: "inherit",
    },
    view: { outline: "none", WebkitOverflowScrolling: "auto" },
  },
  mediumBlack: {
    thumbV: {
      width: "8px",
      borderRadius: "inherit",
    },
    thumbH: {
      height: "8px",
      borderRadius: "inherit",
    },
    view: {
      outline: "none",
      WebkitOverflowScrolling: "auto",
    },
  },
  preMediumBlack: {
    thumbV: {
      width: "5px",
      borderRadius: "inherit",
      cursor: "default",
    },
    thumbH: {
      height: "5px",
      borderRadius: "inherit",
      cursor: "default",
    },
    view: { outline: "none", WebkitOverflowScrolling: "auto" },
  },
};

const Scrollbar = React.forwardRef((props, ref) => {
  const stype = scrollbarType[props.stype];

  const thumbV = stype ? stype.thumbV : {};
  const thumbH = stype ? stype.thumbH : {};
  const view = stype ? stype.view : {};

  const universalRef = React.useRef(true);

  const renderNavThumbVertical = ({ style, ...props }) => (
    <div
      {...props}
      className="nav-thumb-vertical"
      style={{ ...style, ...thumbV }}
    />
  );

  const renderNavThumbHorizontal = ({ style, ...props }) => (
    <div
      className="nav-thumb-horizontal"
      {...props}
      style={{ ...style, ...thumbH }}
    />
  );

  const renderView = ({ style, ...props }) => (
    <div
      {...props}
      style={{ ...style, ...view }}
      tabIndex={-1}
      className={"scroll-body"}
    />
  );

  return (
    <StyledScrollbar
      renderView={renderView}
      renderThumbVertical={renderNavThumbVertical}
      renderThumbHorizontal={renderNavThumbHorizontal}
      universal={universalRef.current}
      {...props}
      ref={ref}
    />
  );
});

Scrollbar.propTypes = {
  /** Scrollbar style type */
  stype: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
  /** Accepts id  */
  id: PropTypes.string,
  /** Accepts css style  */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Scrollbar.defaultProps = {
  stype: "mediumBlack",
};

Scrollbar.displayName = "Scrollbar";

export default Scrollbar;
