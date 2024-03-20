import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {InputIcon, InputLabel, InputStyled, InputWrapper} from "./input.styled.js";
import {XClose} from "@icons";

const InputIconComponent = (props) => {
    const {value, icon, isClearable, onClear, onIconClick, clearIcon} = props;
    if (isClearable && value) {
        return (
            clearIcon ??
            <InputIcon className="input-component__clear-icon" onClick={onIconClick}>
                <XClose size="30px" onClick={onClear}/>
            </InputIcon>
        )
    }

    return icon && <InputIcon className="input-component__icon">{icon}</InputIcon>
}

export const Input = (props) => {
    const {
        defaultValue,
        value,
        onChange,
        label,
        className,
        width,
        icon,
        autoFocus = false,
        isClearable = false,
        onClear,
        onKeyPress,
        onIconClick,
        clearIcon,
        ...otherProps
    } = props;
    const [inFocus, setInFocus] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    const isControlled = value !== undefined

    useEffect(() => {
        setInputValue(() => defaultValue || '')

        if(inputRef) {
            if(autoFocus || inputValue || value || defaultValue) {
                inputRef.current.focus()
            }
        }
    }, [value, inputValue])

    const handleKeyPress = (e) => {
        onKeyPress && onKeyPress(e)
    }
    const handleInput = (e) => {
        if (!isControlled) {
            setInputValue(e.target.value)
        }
        onChange !== undefined && onChange(e)
    }

    const handleFocus = (key) => {
        if (key === 'focus') {
            setInFocus(true)
        } else if ('blur') {
            if (isControlled) {
                value || setInFocus(false)
            } else {
                inputValue || setInFocus(false)
            }
        }
    }

    const handleClear = () => {
        if (!isControlled) {
            setInputValue('')
        }

        onClear !== undefined && onClear()
    }

    return (
        <InputWrapper
            className={`input-component ${className} ${inFocus ? "focus" : ""}`}
            width={width}
        >
            <InputStyled
                value={isControlled ? value : inputValue}
                onChange={handleInput}
                className="input-component__input"
                onFocus={() => handleFocus('focus')}
                onBlur={() => handleFocus('blur')}
                inFocus={inFocus}
                ref={inputRef}
                onKeyPress={handleKeyPress}
                {...otherProps}
            />
            {
                label !== undefined && <InputLabel className="input-component__label">{label}</InputLabel>
            }
            <InputIconComponent
                value={isControlled ? value : inputValue}
                onClear={handleClear}
                isClearable={isClearable}
                icon={icon}
                onIconClick={onIconClick}
                clearIcon={clearIcon}
            />
        </InputWrapper>
    )
}

Input.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.element,
    autoFocus: PropTypes.bool,
    isClearable: PropTypes.bool,
    onClear: PropTypes.func,
    onKeyPress: PropTypes.func,
    onIconClick: PropTypes.func,
    clearIcon: PropTypes.element,
}