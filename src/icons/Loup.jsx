import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const Loup = (props) => {
    const {size, color, ...otherProps} = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            viewBox="0 0 24 24"
            fill="none"
            color={color || ICON_DEFAULT_COLOR}
            {...otherProps}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.9629 10.0682C21.5588 14.1003 17.9565 17.0419 13.917 16.6385C13.0387 16.5508 12.2121 16.3122 11.4603 15.951C11.042 15.75 10.5339 15.8015 10.2051 16.1292L5.01805 21.2983C4.62849 21.6865 3.99857 21.6873 3.60805 21.3001L2.71433 20.4139C2.32051 20.0234 2.31971 19.387 2.71256 18.9955L7.87817 13.8477C8.21112 13.5159 8.26119 12.9999 8.0529 12.5786C7.46469 11.3886 7.19255 10.025 7.33465 8.60736C7.73881 4.57526 11.3411 1.6336 15.3806 2.03699C19.4201 2.44039 22.3671 6.03607 21.9629 10.0682ZM19.8732 9.85949C19.5845 12.7396 17.0114 14.8407 14.1261 14.5526C11.2407 14.2645 9.13571 11.6961 9.4244 8.81605C9.71309 5.93598 12.2862 3.83479 15.1715 4.12293C18.0569 4.41107 20.1619 6.97941 19.8732 9.85949Z"
                fill="currentColor"
            />
        </svg>
    )
}


Loup.propTypes = ICON_PROP_TYPES;