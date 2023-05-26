import { useState } from "react";

import { StyledMailForm } from "./styled-mail-popup";
import { FOOTER_FORM_URL } from "@utils/constants";
import TextInput from "@common/text-input";
import Button from "@common/button";
import Text from "@common/text";

const Form = ({ setFormComplete, t }) => {
  const [formEmail, setFormEmail] = useState("");
  const [formName, setFormName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [validFormEmail, setValidFormEmail] = useState(false);
  const [validFormName, setValidFormName] = useState(false);

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const nameIsValid = (name) => {
    return name.length >= 0;
  };

  const handleEmailInput = (e) => {
    setFormEmail(e.target.value);
    setValidFormEmail(emailIsValid(formEmail));
  };

  const handleNameInput = (e) => {
    setFormName(e.target.value);
    setValidFormName(nameIsValid(formName));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const queryParams = `?type=sendsubscription&firstName=${formName}&email=${formEmail}&subscr_type=Common`;
    const urlFetch = FOOTER_FORM_URL + queryParams;
    setEmailError(!validFormEmail);
    setNameError(!validFormName);

    if (!formName) {
      setNameError(true);
    }

    if (!formEmail) {
      setEmailError(true);
    }

    if (validFormName && validFormEmail) {
      fetch(urlFetch, {
        method: "POST",
        mode: "no-cors",
      })
        .then(function () {
          setFormComplete(true);
        })
        .catch(function (error) {
          console.error(error.message);
        });
    }
  };

  return (
    <StyledMailForm className="dataForm">
      <Text className="captchaDescription">
        {t("Get the latest ONLYOFFICE news delivered to your inbox")}
      </Text>
      <form onSubmit={handleFormSubmit} className="formItemsSend">
        <TextInput
          className="form-text"
          value={formName}
          onChange={handleNameInput}
          label={t("First name")}
          name="firstName"
          errorText={t("First name is empty")}
          isError={nameError}
        />
        <TextInput
          className="form-text"
          value={formEmail}
          onChange={handleEmailInput}
          label={t("Email address")}
          name="email"
          type="email"
          isError={emailError}
          errorText={t("Email is incorrect")}
        />
        <Button
          type="submit"
          label={t("Subscribe")}
          className="form-button-app"
        />
      </form>
    </StyledMailForm>
  );
};

export default Form;
