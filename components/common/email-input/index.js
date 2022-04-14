import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import StyledEmailInput from "./email-input-styled";
import TextInput from "../text-input";
import emailAddresses from "email-addresses";

const EmailInput = ({
  isError,
  isSuccess,
  defaultInput,
  value,
  errorText,
  disabledValidation,
  onChange,
  type,
  autoComplete,
  offValidation,
  ...rest
}) => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState("");
  const [emailDefault, setEmailDefault] = useState(true);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const Validate = (email) => {
    //rfc6532 - Enable rfc6532 support (unicode in email addresses). Default: false.
    //strict - Turn off features of RFC 5322 marked "Obsolete". Default: false.
    //partial - Allow a failed parse to return the AST it managed to produce so far. Default: false.
    //simple - Return just the address or addresses parsed. Default: false.

    let emailValid = emailAddresses.parseOneAddress({
      input: email,
      options: {
        rfc6532: true,
        strict: true,
        partial: true,
        simple: true,
        rejectTLD: true,
      },
    });

    let isValid = emailValid === null ? false : true;

    return isValid;
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const email = e.target.value;
    let emailValid;
    email.trim() && (emailValid = Validate(email));
    setEmail(email);
    setValid(emailValid);
    onChange && onChange(e, emailValid);
  };

  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      !email.trim() ? setEmailDefault(true) : setEmailDefault(false);
      !valid && !!email && setEmailError(true);
    }
  };

  const onFocus = useCallback(() => {
    if (valid) {
      setEmailDefault(false);
      setEmailSuccess(true);
    } else {
      setEmailDefault(true);
      setEmailError(false);
      setEmailSuccess(false);
    }
  }, [valid]);

  useEffect(() => {
    onFocus(valid, email);
  }, [valid, email, onFocus]);

  return (
    <StyledEmailInput {...rest} onBlur={onBlur} onFocus={onFocus}>
      <TextInput
        type="email"
        defaultInput={emailDefault}
        isSuccess={emailSuccess}
        isError={emailError || isError}
        value={email}
        onChange={onChangeHandler}
        autoComplete={autoComplete}
        errorText={errorText}
        {...rest}
      />
    </StyledEmailInput>
  );
};

EmailInput.propTypes = {
  /** padding text input */
  padding: PropTypes.string,
  /**  width text input */
  width: PropTypes.string,
  /**  height text input*/
  height: PropTypes.string,
  /** color text input */
  color: PropTypes.string,
  /** color hover text input */
  colorHover: PropTypes.string,
  /** font-size text input */
  fontSize: PropTypes.string,
  /** font-weight text input*/
  fontWeight: PropTypes.string,
  /** Value of the input */
  value: PropTypes.string.isRequired,
  /** Text placeholder in input */
  placeholder: PropTypes.string,
  /** Name text in button */
  labelButton: PropTypes.string,
  /** Error text */
  errorText: PropTypes.string,
  /** Supported type of the input fields */
  type: PropTypes.oneOf(["email", "password", "text"]),
  /** Type of the button */
  typeButton: PropTypes.oneOf(["primary", "secondary", "transparent"]),
  /** Used as HTML name property */
  name: PropTypes.string,
  /** Indicates that the field cannot be used */
  isDisabled: PropTypes.bool,
  /** Focus the input field on initial render */
  isAutoFocussed: PropTypes.bool,
  /** Indicates the input field has an success*/
  isSuccess: PropTypes.bool,
  /** Indicates the input field has an error */
  isError: PropTypes.bool,
  /** Disabled validation*/
  disabledValidation: PropTypes.bool,
  /** square button type */
  squareButton: PropTypes.bool,
  /** enable  button*/
  withButton: PropTypes.bool,
  /**Called with the new value. Required when input is not read only. Parent should pass it back as value. Returns the current value and the flag of validity */
  onChange: PropTypes.func,
  /** What the button will trigger when clicked */
  buttonClick: PropTypes.func,
  /** onBlur func */
  onBlur: PropTypes.func,
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
};

EmailInput.defaultProps = {
  disabledValidation: false,
};

export default EmailInput;
