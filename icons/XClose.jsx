import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const XClose = (props) => {
    const {size, color, ...otherProps} = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            viewBox="0 0 24 24"
            fill="none"
            {...otherProps}
        >
            <path
                d="M8 8L15 15M15 8L8 15"
                stroke={color || ICON_DEFAULT_COLOR}
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}


XClose.propTypes = ICON_PROP_TYPES;