import React from "react";
import Input from "@components/input";
import PropTypes from "prop-types";
import {TextInputWrapper} from "@common/textInput/textInput.styled";

export const TextInput = (props) => {
    return (
        <TextInputWrapper>
            <Input {...props}/>
        </TextInputWrapper>
    )
}

TextInput.propTypes = {
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