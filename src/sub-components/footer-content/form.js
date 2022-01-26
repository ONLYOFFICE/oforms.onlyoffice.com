import React, { useState } from "react";
import Button from "../../../components/button";
import Text from "../../../components/text";

import { StyledMailForm } from "./sub-components/styled-mail-popup";

const Form = ({ setFormComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  const APIrequest = "https://www.onlyoffice.com/post.ashx";
  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function nameIsValid(name) {
    return name.length > 0;
  }

  const updateFormData = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const { firstName, email } = formData;

  const [emailError, setEmailError] = useState();
  const [nameError, setNameError] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const BODYrequest = `type=sendsubscription&firstName=${firstName}&email=${email}&subscr_type=Common`;
    const ap = APIrequest + "?" + BODYrequest;
    setEmailError(!emailIsValid(email));
    setNameError(!nameIsValid(firstName));
    if (!emailError && !nameError) {
      fetch(ap, {
        method: "POST",
        mode: "no-cors",
        //   body: JSON.stringify({
        //     type: "sendsubscription",
        //     firstName: firstName,
        //     email: email,
        //     subscr_type: "Common"
        //   }),
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
      })
        .then(function (response) {
          // console.log(response);
          setFormComplete(true);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };

  return (
    <StyledMailForm className="dataForm">
      <Text className="captchaDescription">
        Get the latest ONLYOFFICE news delivered to your inbox
      </Text>
      <form onSubmit={handleFormSubmit} className="formItemsSend">
        <input
          className="form-text"
          value={firstName}
          onChange={(e) => updateFormData(e)}
          placeholder="First name"
          type="text"
          name="firstName"
          //   required
        />
        {nameError && (
          <Text height="12px" className="errorNameText">
            First name is empty
          </Text>
        )}
        <input
          className="form-text"
          value={email}
          onChange={(e) => updateFormData(e)}
          placeholder="Email address"
          type="email"
          name="email"
          //   required
        />
        {emailError && (
          <Text height="12px" className="errorMailText">
            Email is incorrect
          </Text>
        )}
        <Button type="submit" label="Subscribe" className="form-button-app" />
      </form>
    </StyledMailForm>
  );
};

export default Form;
