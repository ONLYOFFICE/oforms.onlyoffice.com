import PropTypes from "prop-types";

export const ICON_DEFAULT_SIZE = 23;
export const ICON_DEFAULT_COLOR = '#444444';

export const ICON_PROP_TYPES = {
    className: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    onClick: PropTypes.func,
}