import React, {useState} from "react";
import {
    StyledSelector,
    StyledSelectorDropdown,
} from "./styledSelector";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Header, HeaderValue, HeaderIcon, HeaderLabel } from "./index";

const Selector = (props) => {
    const {
        label,
        value,
        children,
        isOpen,
        onVisibilityChange,
        className,
        headerRender,
        trigger = 'click',
    } = props;

    const [open, setOpen] = useState(false);

    const isControlled = isOpen !== undefined;

    const selectorClassName = classNames('selector', className, {'open': isControlled ? isOpen : open})

    const onCLick = () => {
        if (isControlled) {
            onVisibilityChange && onVisibilityChange(true)
        } else {
            setOpen(true)
        }
    }

    const onMouseLeave = () => {
        if (isControlled) {
            onVisibilityChange && onVisibilityChange(false)
        } else {
            setOpen(false)
        }
    }

    const onMouseOver = () => {
        if (isControlled) {
            onVisibilityChange && onVisibilityChange(true)
        } else {
            setOpen(true)
        }
    }

    return (
        <>
            <StyledSelector
                className={selectorClassName}
                onMouseLeave={trigger === 'hover' ? onMouseLeave : undefined}
                onMouseOver={trigger === 'hover' ? onMouseOver: undefined}
            >
                {
                    headerRender !== undefined ? headerRender(label, value, isControlled ? isOpen : open) :
                        <Header className="selector__header" onClick={onCLick}>
                            <HeaderLabel className="selector__label">{label}</HeaderLabel>
                            <HeaderValue className="selector__value">{value}</HeaderValue>
                            <HeaderIcon
                                className="selector__icon"
                                size={18}
                            />
                        </Header>
                }
                <StyledSelectorDropdown
                    className={`selector__dropdown`}
                    isOpen={isControlled ? isOpen : open}
                >
                    {children}
                </StyledSelectorDropdown>
            </StyledSelector>
        </>
    )
}

Selector.propType = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    children: PropTypes.element,
    isOpen: PropTypes.bool,
    onVisibilityChange: PropTypes.func,
    className: PropTypes.string,
    headerRender: PropTypes.func,
    trigger: PropTypes.oneOf(['click', 'hover'])
}

export default Selector;