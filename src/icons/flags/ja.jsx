import React from "react";
import {ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "../iconConstants";

export const JA = (props) => {
    const {size, ...otherProps} = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            viewBox="0 0 24 24"
            fill="none"
            {...otherProps}
        >
            <path d="M20 18H4C4 18 4.00002 17.9 4.00002 17.7L4.00002 6L20 6.00002L20 17.7C20 17.9 20 18 20 18Z" fill="#F5F5F5"/>
            <path d="M20 6V18H4V6H20ZM20 5H4C3.4 5 3 5.4 3 6V18C3 18.6 3.4 19 4 19H20C20.6 19 21 18.6 21 18V6C21 5.4 20.6 5 20 5Z" fill="#B5B5B5"/>
            <circle cx="12" cy="12" r="3" fill="#FF4B55"/>
        </svg>
    )
}


JA.propTypes = ICON_PROP_TYPES;
