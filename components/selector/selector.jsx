import React, {useState} from "react";
import {StyledSelector, StyledSelectorDropdown} from "./styledSelector";
import Text from "../common/text";
import PropTypes from "prop-types";
import {ChevronDown} from "../../icons";

export const Selector = (props) => {
    const {
        label,
        value,
        children,
        isOpen,
        onVisibilityChange,
        className = '',
    } = props;

    const [open, setOpen] = useState(false);

    const isControlled = isOpen !== undefined;

    const onCLick = () => {
        if(isControlled) {
            onVisibilityChange && onVisibilityChange(true)
        } else {
            setOpen(true)
        }
    }

    const onMouseLeave = () => {
        if(isControlled) {
            onVisibilityChange && onVisibilityChange(false)
        } else {
            setOpen(false)
        }
    }

    return (
        <StyledSelector
            className={`selector ${isControlled ? (isOpen ? 'open' : '') : (open ? 'open' : '')} ${className}`}
            onClick={onCLick}
            onMouseLeave={onMouseLeave}
        >
            <Text className="selector__label">{label}</Text>
            <Text className="selector__value">{value}</Text>
            <ChevronDown className="selector__icon" size={18} />
            <StyledSelectorDropdown
                className={`selector__dropdown`}
                isOpen={isControlled ? isOpen : open}
            >
                {children}
            </StyledSelectorDropdown>
        </StyledSelector>
    )
}

Selector.propType = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    children: PropTypes.element,
    isOpen: PropTypes.bool,
    onVisibilityChange: PropTypes.func,
    className: PropTypes.string,
}