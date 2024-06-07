import StyledMailPopup from "./styled-mail-popup";
import { useState } from "react";
import Text from "@components/common/text";
import Button from "@components/common/button";
import TextInput from "@components/common/text-input";

const MailPopup = ({ t, locale, active, setActive, submitForm, ...rest }) => {
  const [formComplete, setFormComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(t("Email is empty"));

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const nameIsValid = (name) => {
    return name.length > 0;
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setValidEmail(emailIsValid(e.target.value));
  };

  const handleNameInput = (e) => {
    const name = e.target.value;
    setFirstName(name);
    setValidFirstName(nameIsValid(name));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const queryParams = `?type=sendsubscription&firstName=${firstName}&email=${email}&subscr_type=Common`;
    const urlFetch = "https://www.onlyoffice.com/post.ashx" + queryParams;
    setEmailError(!validEmail);
    setFirstNameError(!validFirstName);

    if (!firstName) {
      setFirstNameError(true);
    };

    if (!email) {
      setEmailError(true);
    };

    setEmailErrorText(email.length === 0 ? t("Email is empty") : t("Email is incorrect"));

    if (validFirstName && validEmail) {
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

  const handleCloseForm = () => {
    if (formComplete === true) {
      setFormComplete(false);
    };

    setValidEmail(false);
    setValidFirstName(false);
    setActive(false); 
    setEmail("");
    setFirstName("");
    setEmailError(false);
    setFirstNameError(false);
  };

  return (
    <StyledMailPopup onClick={() => handleCloseForm()} className={active ? "show" : ""} {...rest}>
      <div className="mail-popup-container">
        <div className="mail-popup-wrapper">
          <div onClick={(e) => e.stopPropagation()} className="mail-popup-body">
            <div className="mail-popup-header">
              <Text className="mail-popup-title" label={t("Don't Miss an Update!")} />
              <button onClick={() => handleCloseForm()} className="mail-popup-close-btn"></button>
            </div>
            {!formComplete ? (
              <div className="mail-popup-form">
                <Text className="mail-popup-text" label={t("Get the latest ONLYOFFICE news delivered to your inbox")} />
                <form onSubmit={handleFormSubmit} className="mail-popup-inputs">
                  <TextInput
                    className="mail-popup-input"
                    value={firstName}
                    onChange={handleNameInput}
                    placeholder={t("First name")}
                    name="firstName"
                    errorText={t("First name is empty")}
                    isError={firstNameError}
                  />
                  <TextInput
                    className="mail-popup-input"
                    value={email}
                    onChange={handleEmailInput}
                    placeholder={t("Your email")}
                    name="email"
                    isError={emailError}
                    errorText={emailErrorText}
                  />
                  <Button className="mail-popup-btn" type="submit" label={t("Subscribe")} />
                </form>
              </div>
            ) : (
              <div className="mail-popup-success">
                <div className="mail-popup-success-text">
                  {t("We sent an email message with confirmation to your email address.")}
                </div>
                <Button
                  onClick={() => handleCloseForm()}
                  typeButton="secondary"
                  type="submit"
                  className="button gray"
                  label={t("OK")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledMailPopup>
  );
};

export default MailPopup;