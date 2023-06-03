import React from "react";
import {ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "../iconConstants";

export const IT = (props) => {
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
            <path d="M9 18H4.3C4.1 18 4 17.9 4 17.7V6.3C4 6.1 4.1 6 4.3 6H9V18Z" fill="#73AF00"/>
            <path d="M15 6H9.30005V18H15V6Z" fill="#F5F5F5"/>
            <path d="M20.1 18H15V6H20.1C20.3 6 20.4 6.1 20.4 6.3V17.7C20.3 17.9 20.2 18 20.1 18Z" fill="#FF4B55"/>
            <path d="M20 6V18H4V6H20ZM20 5H4C3.4 5 3 5.4 3 6V18C3 18.6 3.4 19 4 19H20C20.6 19 21 18.6 21 18V6C21 5.4 20.6 5 20 5Z" fill="#B5B5B5"/>
        </svg>
    )
}


IT.propTypes = ICON_PROP_TYPES;