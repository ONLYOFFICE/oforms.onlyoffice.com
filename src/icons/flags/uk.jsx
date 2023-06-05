import React from "react";
import {ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "../iconConstants";

export const UK = (props) => {
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
            <path d="M19.8 5H3.80005C3.20005 5 2.80005 5.4 2.80005 6V18C2.80005 18.6 3.20005 19 3.80005 19H19.8C20.4 19 20.8 18.6 20.8 18V6C20.8 5.4 20.4 5 19.8 5Z" fill="#B5B5B5"/>
            <path d="M19.5 18H4.10005C3.90005 18 3.80005 17.9 3.80005 17.7V6.29999C3.80005 6.09999 3.90005 6 4.10005 6H19.5C19.7 6 19.8 6.09999 19.8 6.29999V17.7C19.8 17.9 19.7 18 19.5 18Z" fill="#41479B"/>
            <path d="M19.8 6.29999C19.8 6.09999 19.8 6 19.8 6H16.8L13.8 9V6H9.80005V9L6.80005 6H4.10005C3.90005 6 3.80005 6.09999 3.80005 6.29999V7L6.80005 10H3.80005V14H6.80005L3.80005 17V17.7C3.80005 17.9 3.90005 18 4.10005 18H6.80005L9.80005 15V18H13.8V14L17.8 18H19.8V17.7V17L16.8 14H19.8V10H16.8L19.8 7V6.29999Z" fill="#F5F5F5"/>
            <path d="M19.8 11H12.8V6H10.8V11H3.80005V13H10.8V18H12.8V13H19.8V11Z" fill="#FF4B55"/>
            <path d="M16.8 18L13.8 15V14H14.8L17.8 17L18.8 18H16.8Z" fill="#FF4B55"/>
            <path d="M4.80005 6L8.80005 10H9.80005V9L6.80005 6H4.80005Z" fill="#FF4B55"/>
            <path d="M4.80005 18L8.80005 14H7.80005H6.80005L3.80005 17V18H4.80005Z" fill="#FF4B55"/>
            <path d="M18.8 6L14.8 10H15.8H16.8L19.8 7V6H18.8Z" fill="#FF4B55"/>
        </svg>
    )
}


UK.propTypes = ICON_PROP_TYPES;