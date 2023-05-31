import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const MenuIcon = (props) => {
    const {size, color, ...otherProps} = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            viewBox="0 0 20 14"
            fill="none"
            color={color || ICON_DEFAULT_COLOR}
            {...otherProps}
        >
            <rect width="20" height="2" fill="currentColor"/>
            <rect y="6" width="20" height="2" fill="currentColor"/>
            <rect y="12" width="20" height="2" fill="currentColor"/>
        </svg>
    )
}


MenuIcon.propTypes = ICON_PROP_TYPES;