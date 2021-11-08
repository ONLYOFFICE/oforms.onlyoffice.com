import React from "react";
import Scrollbar from "../scrollbar";

class CustomScrollbars extends React.Component {
  refSetter = (scrollbarsRef, forwardedRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  };

  render() {
    const {
      onScroll,
      forwardedRef,
      style,
      children,
      className,
      stype,
    } = this.props;

    return (
      <Scrollbar
        ref={(scrollbarsRef) =>
          this.refSetter.bind(this, scrollbarsRef, forwardedRef)
        }
        style={{ ...style, overflow: "hidden" }}
        onScroll={onScroll}
        stype={stype}
        className={className}
      >
        {children}
      </Scrollbar>
    );
  }
}

CustomScrollbars.defaultProps = {
  stype: "smallBlack",
};

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

export default CustomScrollbarsVirtualList;