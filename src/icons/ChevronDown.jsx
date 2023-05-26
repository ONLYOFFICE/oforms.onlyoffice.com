import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const ChevronDown = (props) => {
    const {size, color, ...otherProps} = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            viewBox="0 0 22 23"
            fill="none"
            {...otherProps}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0022 12.915L7.10991 9.03167C6.74462 8.66721 6.15085 8.66569 5.78369 9.02826C5.41653 9.39084 5.41501 9.98021 5.78031 10.3447L10.3307 14.8846C10.5368 15.0903 10.8158 15.1804 11.0857 15.1546C11.3007 15.1375 11.511 15.047 11.6751 14.8833L16.2196 10.3493C16.5848 9.98482 16.5833 9.39545 16.2162 9.03288C15.849 8.6703 15.2552 8.67182 14.8899 9.03628L11.0022 12.915Z"
                fill={color || ICON_DEFAULT_COLOR}
            />
        </svg>
    )
}


ChevronDown.propTypes = ICON_PROP_TYPES;