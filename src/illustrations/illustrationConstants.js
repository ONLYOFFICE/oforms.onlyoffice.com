import PropTypes from "prop-types";

export const ILLUSTRATION_DEFAULT_SIZE = 100;

export const ILLUSTRATION_PROP_TYPES = {
    className: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
}