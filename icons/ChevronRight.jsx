import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const ChevronRight = (props) => {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5436 11.9975L9.29363 16.2574C8.90355 16.6483 8.90192 17.2838 9.28998 17.6768L9.31705 17.7042C9.70511 18.0972 10.3359 18.0988 10.726 17.7078L15.7058 12.7165C15.9258 12.496 16.0223 12.1977 15.9949 11.909C15.9768 11.6784 15.8799 11.4531 15.7044 11.2772L10.731 6.2923C10.3409 5.90132 9.71014 5.90294 9.32208 6.29591L9.29502 6.32332C8.90696 6.71629 8.90859 7.3518 9.29866 7.74277L13.5436 11.9975Z"
                fill={color || ICON_DEFAULT_COLOR}
            />
        </svg>
    )
}


ChevronRight.propTypes = ICON_PROP_TYPES;