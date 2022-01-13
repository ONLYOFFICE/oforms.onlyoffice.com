import React, { useState } from "react";
import TextInput from "../../../components/text-input";
import EmailInput from "../../../components/email-input";
import Button from "../../../components/button";
import axios from "axios";
const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  const APIrequest = "https://www.onlyoffice.com/post.ashx";
  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    console.log(formData)
    fetch(APIrequest, {
      method: "POST",
    //   mode: "no-cors",
      body: `type=sendsubscription&firstName=${firstName}&email=${email}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response)
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        value={firstName}
        onChange={(e) => updateFormData(e)}
        placeholder="First name"
        type="text"
        name="firstName"
        required
      />
      <input
        value={email}
        onChange={(e) => updateFormData(e)}
        placeholder="Email address"
        type="email"
        name="email"
        required
      />

      <Button type="submit" label="Submit" />
    </form>
  );
};

export default Form;
