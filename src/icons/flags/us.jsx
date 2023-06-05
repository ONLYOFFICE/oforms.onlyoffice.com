import React from "react";
import {ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "../iconConstants";

export const US = (props) => {
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
            <path d="M20 8H5V9H20V8Z" fill="#F5F5F5"/>
            <path d="M20 6H6V7H20V6Z" fill="#F5F5F5"/>
            <path d="M20 10H6V11H20V10Z" fill="#F5F5F5"/>
            <path d="M20 12H4V13H20V12Z" fill="#F5F5F5"/>
            <path d="M20 14H4V15H20V14Z" fill="#F5F5F5"/>
            <path d="M20 16H4V17H20V16Z" fill="#F5F5F5"/>
            <path d="M20 9H4V10H20V9Z" fill="#FF4B55"/>
            <path d="M20 7H4V8H20V7Z" fill="#FF4B55"/>
            <path d="M4 11V12H9.2H11V11H4Z" fill="#FF4B55"/>
            <path d="M20 13H4V14H20V13Z" fill="#FF4B55"/>
            <path d="M20 15H4V16H20V15Z" fill="#FF4B55"/>
            <path d="M20 17H4V18H20V17Z" fill="#FF4B55"/>
            <path d="M20 11H4V12H20V11Z" fill="#FF4B55"/>
            <path d="M13 12H12H4V6H13V11V12Z" fill="#41479B"/>
            <path d="M6 6H5V7H6V6Z" fill="white"/>
            <path d="M8 6H7V7H8V6Z" fill="white"/>
            <path d="M10 6H9V7H10V6Z" fill="white"/>
            <path d="M12 6H11V7H12V6Z" fill="white"/>
            <path d="M12 8H11V9H12V8Z" fill="white"/>
            <path d="M10 8H9V9H10V8Z" fill="white"/>
            <path d="M8 8H7V9H8V8Z" fill="white"/>
            <path d="M6 8H5V9H6V8Z" fill="white"/>
            <path d="M6 10H5V11H6V10Z" fill="white"/>
            <path d="M8 10H7V11H8V10Z" fill="white"/>
            <path d="M10 10H9V11H10V10Z" fill="white"/>
            <path d="M12 10H11V11H12V10Z" fill="white"/>
            <path d="M20 6V18H4V6H20ZM20 5H4C3.4 5 3 5.4 3 6V18C3 18.6 3.4 19 4 19H20C20.6 19 21 18.6 21 18V6C21 5.4 20.6 5 20 5Z" fill="#B5B5B5"/>
        </svg>
    )
}


US.propTypes = ICON_PROP_TYPES;