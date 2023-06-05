import React from "react";
import {ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "../iconConstants";

export const FR = (props) => {
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
            <path d="M8.99998 18H3.89998C3.69998 18 3.59998 17.9 3.59998 17.7V6.3C3.59998 6.1 3.69998 6 3.89998 6H8.99998V18Z" fill="#41479B"/>
            <path d="M15 6H9V18H15V6Z" fill="#F5F5F5"/>
            <path d="M19.7 18H15V6H19.7C19.9 6 20 6.1 20 6.3V17.7C20 17.9 19.9 18 19.7 18Z" fill="#FF4B55"/>
            <path d="M20 6V18H4V6H20ZM20 5H4C3.4 5 3 5.4 3 6V18C3 18.6 3.4 19 4 19H20C20.6 19 21 18.6 21 18V6C21 5.4 20.6 5 20 5Z" fill="#B5B5B5"/>
        </svg>
    )
}


FR.propTypes = ICON_PROP_TYPES;
