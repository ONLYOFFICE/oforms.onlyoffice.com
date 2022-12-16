import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledIconButton from "./styled-icon-button";

import { ReactSVG } from "react-svg";

function IconButton({
  className,
  size,
  isDisabled,
  isClickable,
  id,
  style,
  grayed,
  background,
  title,
  clickColor,
  color,
  hoverColor,
  iconHoverName,
  iconName,
  defaultIcon,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  iconClickName,
  onMouseUp,
  onClick,
  ...rest
}) {
  const [state, setState] = useState({
    currentIconName: iconName,
  });

  const onError = () => {
    return <ReactSVG src={defaultIcon} />;
  };

  const onMouseEnterHandler = (e) => {
    if (isDisabled || defaultIcon) return;

    setState({
      currentIconName: !("ontouchstart" in document.documentElement)
        ? iconHoverName || iconName
        : iconName,
    });

    onMouseEnter && onMouseEnter(e);
  };

  const onMouseLeaveHandler = (e) => {
    if (isDisabled || defaultIcon) return;

    setState({
      currentIconName: iconName,
    });

    onMouseLeave && onMouseLeave(e);
  };

  const onMouseDownHandler = (e) => {
    if (isDisabled || defaultIcon) return;

    setState({
      currentIconName: !("ontouchstart" in document.documentElement)
        ? iconClickName || iconName
        : iconName,
    });

    onMouseDown && onMouseDown(e);
  };

  const onMouseUpHandler = (e) => {
    if (isDisabled || defaultIcon) return;

    switch (e.nativeEvent.which) {
      case 1: //Left click
        setState({
          currentIconName: !("ontouchstart" in document.documentElement)
            ? iconHoverName || iconName
            : iconName,
          currentIconColor: iconHoverName || color,
        });

        onMouseUp && onMouseUp(e);
        break;
      case 3: //Right click
        onMouseUp && onMouseUp(e);
        break;
      default:
        break;
    }
  };

  const classNameSVG = `icon-button_svg ${color && "user-color"} ${
    clickColor && "user-click-color"
  } ${hoverColor && "user-hover-color"} `;

  const onClickHandler = (e) => {
    onClick && onClick(e);
  };

  return (
    <StyledIconButton
      id={id}
      onClick={onClickHandler}
      className={className}
      size={size}
      isDisabled={isDisabled}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      isClickable={typeof onClick === "function" || isClickable}
      style={style}
      color={color}
      clickColor={clickColor}
      hoverColor={hoverColor}
      background={background}
      grayed={grayed}
      title={title}
      {...rest}
    >
      <img
        className={classNameSVG}
        src={state.currentIconName}
        fallback={defaultIcon ? onError : null}
        {...rest}
      />
    </StyledIconButton>
  );
}

IconButton.propTypes = {
  /** Set component class */
  className: PropTypes.string,
  /** Icon color */
  color: PropTypes.string,
  /** Icon color on click action */
  clickColor: PropTypes.string,
  /** Icon color on hover action */
  hoverColor: PropTypes.string,
  /** Takes the path to the icon (the icon must be located in a static folder) */
  iconName: PropTypes.string,
  /** Takes the path to the icon (the icon must be located in a static folder) */
  defaultIcon: PropTypes.string,
  /** Icon name on click action */
  iconClickName: PropTypes.string,
  /** Icon name on hover action */
  iconHoverName: PropTypes.string,
  /** Set component id */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Tells when the button should present a disabled state */
  isDisabled: PropTypes.bool,
  /** Set cursor value */
  isClickable: PropTypes.bool,
  /** Set grayed styling */
  grayed: PropTypes.bool,
  /** What the button will trigger when clicked  */
  onClick: PropTypes.func,
  /** If no image is found  */
  onError: PropTypes.func,
  /** What the button will trigger when cursor down */
  onMouseDown: PropTypes.func,
  /** What the button will trigger when cursor enter */
  onMouseEnter: PropTypes.func,
  /** What the button will trigger when cursor leave icon */
  onMouseLeave: PropTypes.func,
  /** What the button will trigger when cursor up */
  onMouseUp: PropTypes.func,
  /** Accepts css style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Set title */
  title: PropTypes.string,
  /** Button height and width value */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

IconButton.defaultProps = {
  //iconName: "/static/images/social_icons/facebook.react.svg",
  isClickable: false,
  isDisabled: false,
  size: 24,
};

export default IconButton;
