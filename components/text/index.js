import React from "react";
import PropTypes from "prop-types";
import StyledText from "./text-styled";

const Text = ({
    as,
    label,
    children,
    ...rest
}) => {
    return (
        <StyledText as={as ? as : "span"} {...rest}>
            {label || children}
        </StyledText>
    );
}

Text.propTypes = {
    /** Accepts CSS style */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    /** Tab index */
    tabIndex: PropTypes.number,
    /** Accepts id */
    id: PropTypes.string,
    /** Accepts class */
    className: PropTypes.string,
}

Text.defaultProps = {
};

export default Text;