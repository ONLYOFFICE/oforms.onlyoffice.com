import React, { useEffect, useState } from "react";

import TextInput from "../../text-input";
import EmailInput from "../../email-input";
import PasswordInput from "../../password-input";

const FormTextInput = (props) => {
  const { item, isPanel } = props;
  const { type, inputType, buttonClick, withButton, callback, ...rest } = item;

  const [withButtonCheck, setWidthButton] = useState(false);

  useEffect(() => {
    window && item.isSubmit && window.addEventListener("resize", checkingBtn);
    return () =>
      window &&
      item.isSubmit &&
      window.removeEventListener("resize", checkingBtn);
  });

  useEffect(() => {
    item.isSubmit && checkingBtn();
  });

  const checkingBtn = () => {
    window && window.innerWidth >= 592
      ? setWidthButton(withButton)
      : setWidthButton(false);
  };

  const classNameButton = `button-in-input ${
    item.isSubmit ? "in-input-submit-btn" : ""
  }`;

  switch (inputType) {
    case "text":
      return (
        <TextInput
          className="form-input form-text"
          {...rest}
          buttonClick={buttonClick}
          classNameButton={classNameButton}
          withButton={withButtonCheck}
          onChange={callback}
          backgroundColor={isPanel && "#f9f9f9"}
        />
      );
    case "email":
      return (
        <EmailInput
          className="form-input form-email"
          {...rest}
          buttonClick={buttonClick}
          classNameButton={classNameButton}
          withButton={withButtonCheck}
          onChange={callback}
          backgroundColor={isPanel && "#f9f9f9"}
        />
      );
    case "password":
      return (
        <PasswordInput
          className="form-input form-password"
          {...rest}
          buttonClick={buttonClick}
          classNameButton={classNameButton}
          withButton={withButtonCheck}
          onChange={callback}
          backgroundColor={isPanel && "#f9f9f9"}
        />
      );
    default:
      return null;
  }
};

export default FormTextInput;
