import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const Triangle = (props) => {
    const {size, color, ...otherProps} = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            color={color || ICON_DEFAULT_COLOR}
            viewBox="0 0 7 5"
            fill="none"
            {...otherProps}
        >
            <path d="M3.45482 5L0.384602 0.499999L6.52504 0.5L3.45482 5Z" fill="currentColor"/>
        </svg>

    )
}


Triangle.propTypes = ICON_PROP_TYPES;