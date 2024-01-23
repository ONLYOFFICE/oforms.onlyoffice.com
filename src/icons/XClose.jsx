import React from "react";
import {ICON_DEFAULT_COLOR, ICON_DEFAULT_SIZE, ICON_PROP_TYPES} from "./iconConstants";

export const XClose = (props) => {
    const {size, color, ...otherProps} = props;
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={size || ICON_DEFAULT_SIZE}
            height={size || ICON_DEFAULT_SIZE}
            viewBox='0 0 24 24'
            fill='none'
            color={color || ICON_DEFAULT_COLOR}
            {...props}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.294 5.294a1.004 1.004 0 00-.003 1.418L10.578 12l-5.287 5.287a1.004 1.004 0 001.421 1.422L12 13.421l5.288 5.288a1.004 1.004 0 001.421-1.422L13.422 12l5.287-5.288a1.004 1.004 0 00-1.421-1.421L12 10.578 6.712 5.291a1.004 1.004 0 00-1.418.003z'
                fill='currentColor'
            />
        </svg>
    )
}


XClose.propTypes = ICON_PROP_TYPES;
