import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyleGroupInput from "./styled-group";
import StyledTextInput from "./styled-text-input";
import StyledButtonInput from "./styled-button-input";
import StyledInput from "./styled-input";
import Label from "./styled-label";
import Text from "../text";

const TextInput = ({
  className,
  id,
  type,
  placeholder,
  labelColor,
  colorHover,
  onChange,
  defaultInput,
  isDisabled,
  isDisabledButton,
  isAutoFocussed,
  isSuccess,
  isError,
  withButton,
  idButton,
  classNameButton,
  typeButton,
  styleButton,
  squareButton,
  labelButton,
  iconButton,
  isSubmit,
  backgroundColor,
  buttonClick,
  autoComplete,
  tabIndexProp,
  errorText,
  ...rest
}) => {
  const inputTextRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const onChangeHandler = (e) => {
    setIsEmpty(!e.target.value.trim());
    onChange && onChange(e);
  };

  useEffect(() => {
    if (isAutoFocussed) inputTextRef.current.focus();
  }, [isAutoFocussed]);

  return (
    <StyleGroupInput {...rest}>
      <StyledInput labelColor={labelColor} colorHover={colorHover} {...rest}>
        <StyledTextInput
          type={type}
          className={className}
          disabled={isDisabled}
          isAutoFocussed={isAutoFocussed}
          defaultInput={defaultInput}
          isSuccess={isSuccess}
          isError={isError}
          isDisabled={isDisabled}
          onChange={onChangeHandler}
          ref={inputTextRef}
          withButton={withButton}
          isPlaceholder={!!placeholder}
          backgroundColor={backgroundColor}
          autoComplete={autoComplete}
          {...rest}
          tabIndex={tabIndexProp}
        />
        <Label
          defaultChecked={rest.value !== ""}
          defaultInput={defaultInput}
          isSuccess={isSuccess}
          isError={isError}
          isEmpty={isEmpty}
          labelColor={labelColor}
          className="input-label"
        >
          {placeholder}
        </Label>
        {isError && errorText && (
          <Text className="error-text" fontSize="13px" color="#CB0000">
            {errorText}
          </Text>
        )}
      </StyledInput>
      {Boolean(withButton) && (
        <StyledButtonInput
          id={idButton}
          className={classNameButton}
          typeButton={typeButton}
          label={labelButton}
          isDisabled={isDisabledButton}
          isAutoFocussed={isAutoFocussed}
          isSuccess={isSuccess}
          isError={isError}
          onClick={buttonClick}
          height={rest.height}
          style={styleButton}
          icon={iconButton}
          squareButton={squareButton}
          isSubmit={isSubmit}
          minwidth="149px"
          fontSize="14px"
          fontWeight="bold"
          lineHeight="16px"
          tabIndex={tabIndexProp}
        />
      )}
    </StyleGroupInput>
  );
};

TextInput.propTypes = {
  /** padding text input */
  padding: PropTypes.string,
  /**  width text input */
  width: PropTypes.string,
  /**  height text input*/
  height: PropTypes.string,
  /** color text input */
  color: PropTypes.string,
  /** color label to text input */
  labelColor: PropTypes.string,
  /** color hover text input */
  colorHover: PropTypes.string,
  /** font-size text input */
  fontSize: PropTypes.string,
  /** font-weight text input*/
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Value of the input */
  value: PropTypes.string.isRequired,
  /** label text in input */
  placeholder: PropTypes.string,
  /** Name text in button */
  labelButton: PropTypes.string,
  /** Supported type of the input fields */
  type: PropTypes.oneOf(["email", "password", "text"]),
  /** Type of the button */
  typeButton: PropTypes.oneOf(["primary", "secondary", "transparent"]),
  /** Used as HTML name property */
  name: PropTypes.string,
  /** Default input color*/
  defaultInput: PropTypes.bool,
  /** Indicates that the field cannot be used */
  isDisabled: PropTypes.bool,
  /** Focus the input field on initial render */
  isAutoFocussed: PropTypes.bool,
  /** Indicates the input field has an success*/
  isSuccess: PropTypes.bool,
  /** Indicates the input field has an error */
  isError: PropTypes.bool,
  /** square button type */
  squareButton: PropTypes.bool,
  /** enable  button*/
  withButton: PropTypes.bool,
  /** Set to true if the button should submit the form  */
  isSubmit: PropTypes.bool,
  /**Called with the new value. Required when input is not read only. Parent should pass it back as value */
  onChange: PropTypes.func,
  /** What the button will trigger when clicked */
  buttonClick: PropTypes.func,
  /** Text input tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
  /** Accepts button id */
  idButton: PropTypes.string,
  /** Accepts button class */
  classNameButton: PropTypes.string,
  /** Custom background color */
  backgroundColor: PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: "",
  type: "text",
  value: "",
  isDisabled: false,
  isAutoFocussed: false,
  isSuccess: false,
  isError: false,
  withButton: false,
  squareButton: false,
  tabIndex: -1,
  autoComplete: "off",
};

export default TextInput;
